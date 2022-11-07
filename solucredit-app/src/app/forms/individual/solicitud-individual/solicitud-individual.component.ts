import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MysqlService } from '../../../services/mysql/mysql.service';
import { ToastrService } from 'ngx-toastr';
import { SolicitudService } from '../../../services/formularios/individua/solicitud.service';
import { map, catchError } from 'rxjs/operators';

//import { AplicationFormDirectorBoard } from '../../models/solicitud-individual.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormArray,
  NgForm,
} from '@angular/forms';
import { Form } from 'src/app/models/solicitud-individual.model';
import { of, Observable, Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-solicitud-individual',
  templateUrl: './solicitud-individual.component.html',
  styleUrls: ['./solicitud-individual.component.css']
})
export class SolicitudIndividualComponent implements OnInit {

  //
  requestID: number;
  requestForm: Form = {};
  valuesType = [1,2,3];
  valuesWarranty = [1, 2, 3];
  isIVA = [1, 0];
  isISR = [1, 0];
  

  companiesCount: number = 0;
  bank_accountCount: number = 0;
  bank_loansCount: number = 0;
  suppliersCount: number = 0;
  clientsCount: number = 0;
  factoringsCount: number = 0;
  previousUrl: string;
  //-----------------
  constructor(
    private mysqlService: MysqlService,
    private toastr: ToastrService,
    private solicitudService: SolicitudService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  myForm = new FormGroup({
    inputType: new FormControl(null),
    inputMonto: new FormControl(null),
    inputDestino: new FormControl(null),
    inputPlazo: new FormControl(null),
    inputGarantia: new FormControl(null),
    inputNombrePropietario: new FormControl(null),
    inputNombreComercial: new FormControl(null),
    inputNit: new FormControl(null),
    inputSector: new FormControl(null),
    inputDireccion: new FormControl(null),
    inputTelefono: new FormControl(null),
    inputNombreContacto: new FormControl(null),
    inputCargoContacto: new FormControl(null),
    inputEmailSolicitarInfo: new FormControl(null),
    inputNombreSolicitarInfo: new FormControl(null),
    inputTelefonoSolicitarInfo: new FormControl(null),
    inputEmailContabilidad: new FormControl(null),
    inputNombreContabilidad: new FormControl(null),
    inputTelefonoContabilidad: new FormControl(null),
    inputEmailCobros: new FormControl(null),
    inputNombreCobros: new FormControl(null),
    inputTelefonoCobros: new FormControl(null),
    inputEmailFactura: new FormControl(null),
    inputNombreFactura: new FormControl(null),
    inputTelefonoFactura: new FormControl(null),
    inputEmailRetencion: new FormControl(null),
    inputNombreRetencion: new FormControl(null),
    inputTelefonoRetencion: new FormControl(null),
    inputActividadPrincipal: new FormControl(null),
    inputTiempoMercado: new FormControl(null),
    inputVentasAnuales: new FormControl(null),
    inputAgenteIVA: new FormControl(null),
    inputPorcentajeRetencionIVA: new FormControl(null),
    inputAgenteISR: new FormControl(null),
    inputPorcentajeRetencionISR: new FormControl(null),
    inputWeb: new FormControl(null),
    inputGroup: new FormControl(null),

    inputNombre: new FormControl(null, [Validators.required]),
    inputDireccion1: new FormControl(null, [Validators.required]),
    inputDireccion2: new FormControl(null, [Validators.required]),
    inputMunicipio: new FormControl(null, [Validators.required]),
    inputTipoNegocio: new FormControl(null, [Validators.required]),
    inputPais: new FormControl(null, [Validators.required]),
    inputDepartamento: new FormControl(null, [Validators.required]),

    /* EmpresasGrupo: new FormArray([
      new FormGroup({
        name: new FormControl(null),
        business: new FormControl(null),
        holding_name: new FormControl(null),
      })
    ]) */
    EmpresasGrupo: new FormArray([]),
    Cuenta: new FormArray([]),
    /* Cuenta: new FormArray([
      new FormGroup({
        bank: new FormControl(null),
        account_number: new FormControl(null),
        account_type: new FormControl(null),
        currency: new FormControl(null),
        name_account: new FormControl(null),
        monthly_average_deposit: new FormControl(null)
      })
    ]), */
    Prestamos: new FormArray([]),
    /* Prestamos: new FormArray([
      new FormGroup({
        bank: new FormControl(null),
        loan_number: new FormControl(null),
        warranty: new FormControl(null),
        amount_awarded: new FormControl(null),
        time: new FormControl(null),
        balance: new FormControl(null)
      })
    ]), */
    Descuentos: new FormArray([]),
    /* Descuentos: new FormArray([
      new FormGroup({
        entity: new FormControl(null),
        warranty: new FormControl(null),
        amount_awarded: new FormControl(null),
        amount_used: new FormControl(null),
        balance: new FormControl(null)
      })
    ]), */
    Proveedores: new FormArray([]),
    /* Proveedores: new FormArray([
      new FormGroup({
        name: new FormControl(null),
        average_monthly_purchase: new FormControl(null),
        max_credit: new FormControl(null),
        country_id: new FormControl(null),
        contact: new FormControl(null),
        phone: new FormControl(null)
      })
    ]), */
    Clientes: new FormArray([]),
    /* Clientes: new FormArray([
      new FormGroup({
        name: new FormControl(null),
        monthly_average: new FormControl(null),
        credit_days: new FormControl(null),
        pay_form: new FormControl(null),
        relation_time: new FormControl(null),
        product_service: new FormControl(null),
        contact: new FormControl(null),
        phone: new FormControl(null)
      })
    ]), */


  });


  Cuenta:FormArray = this.myForm.get('Cuenta') as FormArray;
  EmpresasGrupo:FormArray = this.myForm.get('EmpresasGrupo') as FormArray;
  Prestamos: FormArray = this.myForm.get('Prestamos') as FormArray;
  Descuentos: FormArray = this.myForm.get('Descuentos') as FormArray;
  Proveedores:FormArray = this.myForm.get('Proveedores') as FormArray;
  Clientes: FormArray = this.myForm.get('Clientes') as FormArray;


  



  agregarEmpresa() {
   
    this.requestForm.companys.push({});
    this.companiesCount++;
    //console.log('AgregarEmpresa: ' + this.companiesCount);
    
  }

  quitarEmpresa(i) {
   
    //console.log('SE VA A QUITAR EL INDICE ' + i);
    if (!this.requestForm.companys[i].company_id) {
      //console.log('SE VA A QUITAR UNA COMPANIA QUE NO EXISTE EN BACKEND');
      this.requestForm.companys = this.requestForm.companys.filter((_, k) => k != i);


    }
    else {
      this.requestForm.companys[i].remove = true;
    }
    this.companiesCount--;
    if (this.companiesCount == 0) { this.agregarEmpresa(); }
    //console.log('QuitarEmpresa: '+this.companiesCount);

  }


  
  
 

  agregarCuenta() {

    this.requestForm.bank_accounts.push({});
    this.bank_accountCount++;

  }

  quitarCuenta(i) {

    
    if (!this.requestForm.bank_accounts[i].account_id) {
      //console.log('SE VA A QUITAR UNA COMPANIA QUE NO EXISTE EN BACKEND');
      this.requestForm.bank_accounts = this.requestForm.bank_accounts.filter((_, k) => k != i);
    }
    else {
      this.requestForm.bank_accounts[i].remove = true;
    }
    this.bank_accountCount--;
    if (this.bank_accountCount == 0) { this.agregarCuenta(); }

  }

 
  agregarPrestamo() {

    this.requestForm.bank_loans.push({});
    this.bank_loansCount++;

  }

  quitarPrestamo(i) {


    if (!this.requestForm.bank_loans[i].loan_id) {
      //console.log('SE VA A QUITAR UNA COMPANIA QUE NO EXISTE EN BACKEND');
      this.requestForm.bank_loans = this.requestForm.bank_loans.filter((_, k) => k != i);
    }
    else {
      this.requestForm.bank_loans[i].remove = true;
    }
    this.bank_loansCount--;
    if (this.bank_loansCount == 0) { this.agregarPrestamo(); }

  }
  
  

  

  agregarDescuento() {

    this.requestForm.factorings.push({});
    this.factoringsCount++;

  }

  quitarDescuento(i) {


    if (!this.requestForm.factorings[i].factoring_id) {
      //console.log('SE VA A QUITAR UNA COMPANIA QUE NO EXISTE EN BACKEND');
      this.requestForm.factorings = this.requestForm.factorings.filter((_, k) => k != i);
    }
    else {
      this.requestForm.factorings[i].remove = true;
    }
    this.factoringsCount--;
    if (this.factoringsCount == 0) { this.agregarDescuento();}

  }
  
  
  

  agregarProveedor() {

    this.requestForm.suppliers.push({});
    this.suppliersCount++;

  }

  quitarProveedor(i) {


    if (!this.requestForm.suppliers[i].supplier_id) {
      //console.log('SE VA A QUITAR UNA COMPANIA QUE NO EXISTE EN BACKEND');
      this.requestForm.suppliers = this.requestForm.suppliers.filter((_, k) => k != i);
    }
    else {
      this.requestForm.suppliers[i].remove = true;
    }
    this.suppliersCount--;
    if (this.suppliersCount == 0) { this.agregarProveedor();}

  }
  
  
 

  agregarCliente() {

    this.requestForm.clients.push({});
    this.clientsCount++;

  }

  quitarCliente(i) {


    if (!this.requestForm.clients[i].client_id) {
      //console.log('SE VA A QUITAR UNA COMPANIA QUE NO EXISTE EN BACKEND');
      this.requestForm.clients = this.requestForm.clients.filter((_, k) => k != i);
    }
    else {
      this.requestForm.clients[i].remove = true;
    }
    this.clientsCount--;
    if (this.clientsCount == 0) { this.agregarCliente(); }

  }

  onSubmitComplete() {



    //console.log(newform);
    this.requestForm.finish_date = new Date();
    let suscription = this.solicitudService.saveForm(this.requestForm, this.requestID, 0).pipe(
      map((resp) => {
        //console.log(resp);
        this.spinner.hide();
        this.toastr.success('Guardar', 'Tu progreso fue guardado');
        this.requestForm = resp;
        if (!resp) {
          this.requestForm = {};
          this.requestForm.companys = [];

          this.requestForm.companys.push({});
          this.companiesCount = 1;

          this.requestForm.bank_accounts = [];
          this.requestForm.bank_accounts.push({});
          this.bank_accountCount = 1;

          this.requestForm.bank_loans = [];
          this.requestForm.bank_loans.push({});
          this.bank_loansCount = 1;

          this.requestForm.factorings = [];
          this.requestForm.factorings.push({});
          this.factoringsCount = 1;
          this.requestForm.suppliers = [];
          this.requestForm.suppliers.push({});
          this.suppliersCount = 1;

          this.requestForm.clients = [];
          this.requestForm.clients.push({});
          this.clientsCount = 1;


          return;
        }
        this.requestForm = resp;
        if (this.requestForm.companys.length == 0) { this.requestForm.companys.push({}); }
        this.companiesCount = this.requestForm.companys.length;

        if (this.requestForm.bank_accounts.length == 0) { this.requestForm.bank_accounts.push({}); }
        this.bank_accountCount = this.requestForm.bank_accounts.length;
        if (this.requestForm.bank_loans.length == 0) { this.requestForm.bank_loans.push({}); }
        this.bank_loansCount = this.requestForm.bank_loans.length;
        if (this.requestForm.factorings.length == 0) { this.requestForm.factorings.push({}); }
        this.factoringsCount = this.requestForm.factorings.length;
        if (this.requestForm.suppliers.length == 0) { this.requestForm.suppliers.push({}); }
        this.suppliersCount = this.requestForm.suppliers.length;
        if (this.requestForm.clients.length == 0) { this.requestForm.clients.push({}); }
        this.clientsCount = this.requestForm.clients.length;

      }),
      catchError((err) => {
        this.spinner.hide();
        this.toastr.error('error', 'Tu progreso no fue guardado');
        //console.log(err);
        return of();
      })
    ).subscribe(() => suscription.unsubscribe());


  }
  
  onSubmit() {



    //console.log(newform);
    let suscription = this.solicitudService.saveForm(this.requestForm, this.requestID,0).pipe(
      map((resp) => {
        //console.log(resp);
        this.spinner.hide();
        this.toastr.success('Guardar', 'Tu progreso fue guardado');
        this.requestForm = resp;
        if (!resp) {
          this.requestForm = {};
          this.requestForm.companys = [];

          this.requestForm.companys.push({});
          this.companiesCount = 1;

          this.requestForm.bank_accounts = [];
          this.requestForm.bank_accounts.push({});
          this.bank_accountCount = 1;

          this.requestForm.bank_loans = [];
          this.requestForm.bank_loans.push({});
          this.bank_loansCount = 1;

          this.requestForm.factorings = [];
          this.requestForm.factorings.push({});
          this.factoringsCount = 1;
          this.requestForm.suppliers = [];
          this.requestForm.suppliers.push({});
          this.suppliersCount = 1;

          this.requestForm.clients = [];
          this.requestForm.clients.push({});
          this.clientsCount = 1;


          return;
        }
        this.requestForm = resp;
        if (this.requestForm.companys.length == 0) { this.requestForm.companys.push({}); }
        this.companiesCount = this.requestForm.companys.length;

        if (this.requestForm.bank_accounts.length == 0) { this.requestForm.bank_accounts.push({}); }
        this.bank_accountCount = this.requestForm.bank_accounts.length;
        if (this.requestForm.bank_loans.length == 0) { this.requestForm.bank_loans.push({}); }
        this.bank_loansCount = this.requestForm.bank_loans.length;
        if (this.requestForm.factorings.length == 0) { this.requestForm.factorings.push({}); }
        this.factoringsCount = this.requestForm.factorings.length;
        if (this.requestForm.suppliers.length == 0) { this.requestForm.suppliers.push({}); }
        this.suppliersCount = this.requestForm.suppliers.length;
        if (this.requestForm.clients.length == 0) { this.requestForm.clients.push({}); }
        this.clientsCount = this.requestForm.clients.length;

      }),
      catchError((err) => {
        this.spinner.hide();
        this.toastr.error('error', 'Tu progreso no fue guardado');
        //console.log(err);
        return of();
      })
    ).subscribe(() => suscription.unsubscribe());


  }

  ngOnInit(): void {
    
    //console.log('EN EL INIT DEL FOMRULARIO SOLICITUD--------------');
    //console.log(this.route.snapshot.params);
    this.requestID = parseInt(this.route.snapshot.params.idsolicitud);
    this.previousUrl = localStorage.getItem('cutomer-previous-url');
    //console.log(this.route.snapshot.paramMap.get('requestIdSelected'));
    this.spinner.show();
    this.solicitudService.getForm(this.requestID).pipe(
      map((resp) => {
        //console.log(resp);
        if (!resp) {
          this.requestForm = {};
          this.requestForm.companys = [];
          
          this.requestForm.companys.push({});
          this.companiesCount = 1;
          
          this.requestForm.bank_accounts = [];
          this.requestForm.bank_accounts.push({});
          this.bank_accountCount = 1;
          
          this.requestForm.bank_loans = [];
          this.requestForm.bank_loans.push({});
          this.bank_loansCount = 1;
          
          this.requestForm.factorings = [];
          this.requestForm.factorings.push({});
          this.factoringsCount = 1;
          this.requestForm.suppliers = [];
          this.requestForm.suppliers.push({});
          this.suppliersCount = 1;
          
          this.requestForm.clients = [];
          this.requestForm.clients.push({});
          this.clientsCount = 1;
          

          return;
        }
        this.requestForm = resp;
        if (this.requestForm.companys.length == 0) { this.requestForm.companys.push({}); }
        this.companiesCount = this.requestForm.companys.length; 
       
        if (this.requestForm.bank_accounts.length == 0) { this.requestForm.bank_accounts.push({}); }
        this.bank_accountCount = this.requestForm.bank_accounts.length;
        if (this.requestForm.bank_loans.length == 0) { this.requestForm.bank_loans.push({}); }
        this.bank_loansCount = this.requestForm.bank_loans.length;
        if (this.requestForm.factorings.length == 0) { this.requestForm.factorings.push({}); }
        this.factoringsCount = this.requestForm.factorings.length;
        if (this.requestForm.suppliers.length == 0) { this.requestForm.suppliers.push({}); }
        this.suppliersCount = this.requestForm.suppliers.length;
        if (this.requestForm.clients.length == 0) { this.requestForm.clients.push({}); }
        this.clientsCount = this.requestForm.clients.length;
        
        
        
      }),
      catchError((err) => {
        //this.notifier.notify('error', 'Ocurrio un problema con la eliminacion' + err);
        console.log(err);
        return of();
      })
    ).subscribe(x => { this.spinner.hide();  });
  }
  returnPreviusPage(): void {
    //console.log('RETURN:: ' + this.previousUrl);
    if (this.previousUrl)
      this.router.navigate([this.previousUrl]);
  }

}
