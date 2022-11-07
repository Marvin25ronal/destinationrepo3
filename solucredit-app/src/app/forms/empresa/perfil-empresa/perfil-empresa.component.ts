import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MysqlService } from '../../../services/mysql/mysql.service';
import { Router, ActivatedRoute , ParamMap, RoutesRecognized, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map,catchError } from 'rxjs/operators';
import { PerfilService } from '../../../services/formularios/empresa/perfil.service';
import { filter, pairwise } from 'rxjs/operators';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormArray,
  NgForm,
} from '@angular/forms';
import { ProfileForm } from 'src/app/models/perfil-individual.model';
import { of, Observable, Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-perfil-empresa',
  templateUrl: './perfil-empresa.component.html',
  styleUrls: ['./perfil-empresa.component.css']
})
export class PerfilEmpresaComponent implements OnInit, AfterViewInit {
  previousUrl: string;
  sub: Subscription;
  constructor(
    private mysqlService: MysqlService,
    private toastr: ToastrService,
    private PerfilService: PerfilService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    //console.log('Constructor de Perfil-Empresa');
     /* this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        //console.log('prev:', event.url);
        //this.previousUrl = event.url;
        localStorage.setItem('cutomer-previous-url', event.url);
      }); */ 
    
    
  
   }


  //
  requestID: number;
  profileForm: ProfileForm = {};

  isforeign = [1, 0];
  isforeignpurchase = [1, 0];

  countryOperationCount: number = 0;
  companysCount: number = 0;
  associatesCount: number = 0;






  createProfile = new FormGroup({
    inputNombre: new FormControl(null, [Validators.required]),
    
    //inputNombrePropietario:new FormControl(),
    //inputCargoPropietario:new FormControl(),
    //inputNitPropietario:new FormControl(),


    Socios: new FormArray([
      new FormGroup({
        nombre: new FormControl(''),
        cargo: new FormControl(''),
        nit:new FormControl(''),
        porcentaje:new FormControl(''),
      })
    ]),
    EmpresasGrupo: new FormArray([
      new FormGroup({
        nombre: new FormControl(''),
        relacion: new FormControl(''),
        nit:new FormControl(''),
        pais:new FormControl(''),
        actividadComercial:new FormControl(''),
      })
    ]),

    inputGGNombre:new FormControl(),
    inputGGTiempolaboral:new FormControl(),
    inputGFNombre:new FormControl(),
    inputGFTiempolaboral:new FormControl(),
    inputGRNombre:new FormControl(),
    inputGRTiempolaboral:new FormControl(),
    inputGPNombre:new FormControl(),
    inputGPTiempolaboral:new FormControl(),
    inputGONombre:new FormControl(),
    inputGOTiempolaboral:new FormControl(),
    inputGVNombre:new FormControl(),
    inputGVTiempolaboral:new FormControl(),
    inputGCNombre:new FormControl(),
    inputGCTiempolaboral:new FormControl(),

    inputProducto:new FormControl(),
    inputMarca:new FormControl(),
    inputVentas1:new FormControl(),
    inputVentas2:new FormControl(),
    inputVentas3:new FormControl(),
    inputVentas4:new FormControl(),

    inputSegmentoProducto:new FormControl(),
    inputCompetidoresProducto:new FormControl(),
    inputCanalesProducto:new FormControl(),

    inputVentasContado:new FormControl(),
    inputVentasLocales:new FormControl(),
    inputVentasCredito:new FormControl(),
    inputVentasExportacion:new FormControl(),
    inputVentasDolaresEuros:new FormControl(),
    inputVentasDolaresEurosOrigen:new FormControl(),

    inputComprasContado:new FormControl(),
    inputComprasLocales:new FormControl(),
    inputComprasCredito:new FormControl(),
    inputComprasExportacion:new FormControl(),
    inputComprasMonedaExtranjera:new FormControl(),
    inputComprasMonedaExtranjeraPais:new FormControl(),


    PaisOpera: new FormArray([
      new FormGroup({
        pais: new FormControl(''),
        montoAnual: new FormControl(''),
      })
    ]),
  });

  EmpresasGrupo = this.createProfile.get('EmpresasGrupo') as FormArray;
  PaisOpera = this.createProfile.get('PaisOpera') as FormArray;
  Socios = this.createProfile.get('Socios') as FormArray;

/*   CreateProfile() {
    // console.log(this.createCustomer.value);
    this.mysqlService.CreateUser(this.createProfile.value).subscribe(
      (response) => {
        this.toastr.success('Correo Enviado', 'Enviado!');
        console.log('sucess');
        this.createProfile.reset({});
      },
      (error) => {
        this.toastr.error('Verificar información del formulario.', 'Oops!');
        console.log('error');
      }
    );
  } */

  onSubmit(){
    console.log(this.createProfile.value);

    let newform: ProfileForm = {
      form_type_id: 1,
      comercial_name: this.createProfile.controls.inputNombre.value,
      ceo_name: this.createProfile.controls.inputGGNombre.value,
      ceo_time: this.createProfile.controls.inputGGTiempolaboral.value,
      finance_ceo_name: this.createProfile.controls.inputGFNombre.value,
      finance_ceo_time: this.createProfile.controls.inputGFTiempolaboral.value,
      rh_ceo_name: this.createProfile.controls.inputGRNombre.value,
      rh_ceo_time: this.createProfile.controls.inputGRTiempolaboral.value,
      prod_ceo_name: this.createProfile.controls.inputGPNombre.value,
      prod_ceo_time: this.createProfile.controls.inputGPTiempolaboral.value,
      op_ceo_name: this.createProfile.controls.inputGONombre.value,
      op_ceo_time: this.createProfile.controls.inputGOTiempolaboral.value,
      sales_ceo_name: this.createProfile.controls.inputGVNombre.value,
      sales_ceo_time: this.createProfile.controls.inputGVTiempolaboral.value,
      credit_ceo_name: this.createProfile.controls.inputGCNombre.value,
      credit_ceo_time: this.createProfile.controls.inputGCTiempolaboral.value,
      productions_commerce: this.createProfile.controls.inputProducto.value,
      brands: this.createProfile.controls.inputMarca.value,
      first_quarter: this.createProfile.controls.inputVentas1.value,
      second_quarter: this.createProfile.controls.inputVentas2.value,
      third_quarter: this.createProfile.controls.inputVentas3.value,
      fourth_quarter: this.createProfile.controls.inputVentas4.value,
      product_segment: this.createProfile.controls.inputSegmentoProducto.value,
      competitors: this.createProfile.controls.inputCompetidoresProducto.value,
      distribution_channels: this.createProfile.controls.inputCanalesProducto.value,
      cash_sales: this.createProfile.controls.inputVentasContado.value,
      credit_sales: this.createProfile.controls.inputVentasCredito.value,
      local_sales: this.createProfile.controls.inputVentasLocales.value,
      exports_sales: this.createProfile.controls.inputVentasExportacion.value,
      sales_foreign_currency: this.createProfile.controls.inputVentasDolaresEuros.value,
      sales_foreign_currency_origin: this.createProfile.controls.inputVentasDolaresEurosOrigen.value,
      cash_purchases: this.createProfile.controls.inputComprasContado.value,
      credit_purchases: this.createProfile.controls.inputComprasCredito.value,
      local_purchases: this.createProfile.controls.inputComprasLocales.value,
      exports_purchases: this.createProfile.controls.inputComprasExportacion.value,
      purchases_foreign_currency: this.createProfile.controls.inputComprasMonedaExtranjera.value,
      purchases_foreign_currency_origin: this.createProfile.controls.inputComprasMonedaExtranjeraPais.value,
      associates: this.Socios.value,
      companies: this.EmpresasGrupo.value,
      country_operations: this.PaisOpera.value,

    }

    let suscription = this.PerfilService.saveForm(this.profileForm,this.requestID).pipe(
      map((resp) => {
        this.toastr.success('Guardar', 'Tu progreso fue guardado con éxito');
        this.profileForm = resp;
        //console.log(resp);
        if (!resp) {

          this.profileForm = {};
          this.profileForm.owner = {};

          this.profileForm.associates = [];
          this.profileForm.associates.push({});
          this.associatesCount = 1;

          this.profileForm.companies = [];
          this.profileForm.companies.push({});
          this.companysCount = 1;

          this.profileForm.country_operations = [];
          this.profileForm.country_operations.push({});
          this.countryOperationCount = 1;

          return;


        }
        if (this.profileForm.associates.length == 0) { this.profileForm.associates.push({}); }
        this.associatesCount = this.profileForm.associates.length;

        if (this.profileForm.companies.length == 0) { this.profileForm.companies.push({}); }
        this.companysCount = this.profileForm.companies.length;

        if (this.profileForm.country_operations.length == 0) { this.profileForm.country_operations.push({}); }
        this.countryOperationCount = this.profileForm.country_operations.length;



      }),
      catchError((err) => {
        //this.notifier.notify('error', 'Ocurrio un problema con la eliminacion' + err);
        this.toastr.error('error', 'Tu progreso no fue guardado');
        console.log(err);
        return of();
      })
    ).subscribe(() => suscription.unsubscribe());


  }

  onSubmitComplete() {
    this.profileForm.finish_date = new Date();
    let suscription = this.PerfilService.saveForm(this.profileForm, this.requestID).pipe(
      map((resp) => {
        this.toastr.success('Guardar', 'Tu progreso fue guardado con éxito');
        this.profileForm = resp;
        //console.log(resp);
        if (!resp) {

          this.profileForm = {};
          this.profileForm.owner = {};

          this.profileForm.associates = [];
          this.profileForm.associates.push({});
          this.associatesCount = 1;

          this.profileForm.companies = [];
          this.profileForm.companies.push({});
          this.companysCount = 1;

          this.profileForm.country_operations = [];
          this.profileForm.country_operations.push({});
          this.countryOperationCount = 1;

          return;


        }
        if (this.profileForm.associates.length == 0) { this.profileForm.associates.push({}); }
        this.associatesCount = this.profileForm.associates.length;

        if (this.profileForm.companies.length == 0) { this.profileForm.companies.push({}); }
        this.companysCount = this.profileForm.companies.length;

        if (this.profileForm.country_operations.length == 0) { this.profileForm.country_operations.push({}); }
        this.countryOperationCount = this.profileForm.country_operations.length;



      }),
      catchError((err) => {
        //this.notifier.notify('error', 'Ocurrio un problema con la eliminacion' + err);
        this.toastr.error('error', 'Tu progreso no fue guardado');
        console.log(err);
        return of();
      })
    ).subscribe(() => suscription.unsubscribe());
  }

  agregarEmpresa(){
    this.profileForm.companies.push({});
    this.companysCount++;
  }
  quitarEmpresa(i) {
    if (!this.profileForm.companies[i].company_id) {
      this.profileForm.companies = this.profileForm.companies.filter((_, k) => k != i);
    }
    else {
      this.profileForm.companies[i].remove = true;
    }
    this.companysCount--;
    if (this.companysCount == 0) { this.agregarEmpresa(); }
  }

  agregarSocio(){
    this.profileForm.associates.push({});
    this.associatesCount++;
  }
  quitarSocio(i) {
    if (!this.profileForm.associates[i].associate_id) {
      this.profileForm.associates = this.profileForm.associates.filter((_, k) => k != i);
    }
    else {
      this.profileForm.associates[i].remove = true;
    }
    this.associatesCount--;
    if (this.associatesCount == 0) { this.agregarSocio();}
  }
  

  agregarOperacion(){
    this.profileForm.country_operations.push({});
    this.countryOperationCount++;
  }

  

 

  quitarOperacion(i){
    if (!this.profileForm.country_operations[i].country_operation_id) {
      this.profileForm.country_operations = this.profileForm.country_operations.filter((_, k) => k != i);
    }
    else {
      this.profileForm.country_operations[i].remove = true;
    }
    this.countryOperationCount--;
    if (this.countryOperationCount == 0) { this.agregarOperacion(); }
  }

  ngOnInit(): void {
    this.previousUrl = localStorage.getItem('cutomer-previous-url');
    this.requestID = parseInt(this.route.snapshot.params.idsolicitud);
    /* this.sub = this.router.events
      .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
      .subscribe((events: RoutesRecognized[]) => {
        //console.log('previous url', events[0].urlAfterRedirects);
        this.previousUrl = events[0].urlAfterRedirects;
        console.log(this.previousUrl);
        //console.log('current url', events[1].urlAfterRedirects);
        this.sub.unsubscribe();
      }); */
    
    //console.log(this.route.snapshot.paramMap.get('requestIdSelected'));
    this.spinner.show();
    
    //console.log('PREVIUS URL:: '+this.previousUrl);
    this.PerfilService.getForm(this.requestID, 1).pipe(
      map((resp) => {
        this.profileForm = resp;
        //console.log(resp);
        if (!resp) {

          this.profileForm = {};
          this.profileForm.owner = {};

          this.profileForm.associates = [];
          this.profileForm.associates.push({});
          this.associatesCount = 1;

          this.profileForm.companies = [];
          this.profileForm.companies.push({});
          this.companysCount = 1;

          this.profileForm.country_operations = [];
          this.profileForm.country_operations.push({});
          this.countryOperationCount = 1;

          return;


        }
        if (this.profileForm.associates.length == 0) { this.profileForm.associates.push({}); }
        this.associatesCount = this.profileForm.associates.length;

        if (this.profileForm.companies.length == 0) { this.profileForm.companies.push({}); }
        this.companysCount = this.profileForm.companies.length;

        if (this.profileForm.country_operations.length == 0) { this.profileForm.country_operations.push({}); }
        this.countryOperationCount = this.profileForm.country_operations.length;



      }),
      catchError((err) => {
        //this.notifier.notify('error', 'Ocurrio un problema con la eliminacion' + err);
        console.log(err);
        return of();
      })
    ).subscribe(x => { this.spinner.hide(); });
    
  }

  ngAfterViewInit() {
    console.log('EL snapShot.url perfil::');
    console.log(this.route.snapshot.url);
   /*  this.route.snapshot.url[0].path = 'mi perfil';
    this.route.snapshot.data.urls[0].url = `my-profile`; */

    /* if (this.route.snapshot.url.length > 0) {
      
      if (
        this.route.snapshot.url[0].path !== undefined &&
        this.route.snapshot.url[0].path === "cliente"
      ) {
        //this.user_id = this.route.snapshot.params.id;
        this.route.snapshot.data.urls[1].url = `/customer/cliente/${100}`;
      }
    } else {
      console.log('EN EL ELSE DEL ngAfterViewInit');
      /* this.dataCurrentuser = JSON.parse(localStorage.getItem("Usuario"));
      this.user_id = this.dataCurrentuser.customer_id; 
    } */
  }



  
  returnPreviusPage(): void{
    console.log('RETURN:: ' + this.previousUrl);
    if (this.previousUrl)
      this.router.navigate([ this.previousUrl]);
  }

}
