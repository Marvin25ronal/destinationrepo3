import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MysqlService } from '../../../services/mysql/mysql.service';
import { ToastrService } from 'ngx-toastr';
import { map, catchError } from 'rxjs/operators';
import { SolicitudService } from '../../../services/formularios/individua/solicitud.service';
import { AuxService } from '../../../services/helper.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormArray,
  NgForm,
} from '@angular/forms';
import { Form } from 'src/app/models/solicitud-individual.model';
import { CountryInterface } from 'src/app/interfaces/coutry-interface';
import { of, Observable, Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbDateStruct, NgbCalendar, NgbDateAdapter, NgbDateNativeAdapter, NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-solicitud-empresa',
  templateUrl: './solicitud-empresa.component.html',
  styleUrls: ['./solicitud-empresa.component.css']
})
export class SolicitudEmpresaComponent implements OnInit {

  //
  requestID: number;
  requestForm: Form = {};
  valuesType = [1, 2, 3];
  valuesWarranty = [1, 2, 3];
  isIVA = [1, 0];
  isISR = [1, 0];


  companiesCount: number = 0;
  bank_accountCount: number = 0;
  bank_loansCount: number = 0;
  suppliersCount: number = 0;
  clientsCount: number = 0;
  factoringsCount: number = 0;
  membersCount: number = 0;
  directorsCount: number = 0;

  model: NgbDateStruct;
  date: { year: number; month: number };
  previousUrl: string;
  //-----------------
  constructor(
    private mysqlService: MysqlService,
    private toastr: ToastrService,
    private solicitudService: SolicitudService,
    private serviciosAuxiliares: AuxService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  countries: CountryInterface;
  myForm = new FormGroup({
    inputType: new FormControl(),
    inputMonto: new FormControl(),
    inputDestino: new FormControl(),
    inputPlazo: new FormControl(),
    inputGarantia: new FormControl(),
    inputRazonSocial: new FormControl(),
    inputNombreComercial: new FormControl(),
    inputNit: new FormControl(),
    inputSector: new FormControl(),
    inputDireccion: new FormControl(),
    inputTelefono: new FormControl(),
    inputNombreContacto: new FormControl(),
    inputCargoContacto: new FormControl(),
    inputEmailSolicitarInfo: new FormControl(),
    inputNombreSolicitarInfo: new FormControl(),
    inputTelefonoSolicitarInfo: new FormControl(),
    inputEmailContabilidad: new FormControl(),
    inputNombreContabilidad: new FormControl(),
    inputTelefonoContabilidad: new FormControl(),
    inputEmailCobros: new FormControl(),
    inputNombreCobros: new FormControl(),
    inputTelefonoCobros: new FormControl(),
    inputEmailFactura: new FormControl(),
    inputNombreFactura: new FormControl(),
    inputTelefonoFactura: new FormControl(),
    inputEmailRetencion: new FormControl(),
    inputNombreRetencion: new FormControl(),
    inputTelefonoRetencion: new FormControl(),
    inputActividadPrincipal: new FormControl(),
    inputTiempoMercado: new FormControl(),
    inputVentasAnuales: new FormControl(),
    inputAgenteIVA: new FormControl(),
    inputPorcentajeRetencionIVA: new FormControl(),
    inputAgenteISR: new FormControl(),
    inputPorcentajeRetencionISR: new FormControl(),
    inputWeb: new FormControl(),
    inputGroup: new FormControl(),

    inputNombreRepresentate: new FormControl(),
    nitRepresentante: new FormControl(),
    inputTelefonoRepresentante: new FormControl(),
    inputDireccionParticular: new FormControl(),
    inputFechaNacimiento: new FormControl(),
    inputProfesion: new FormControl(),
    inputDPI: new FormControl(),
    inputExtendido: new FormControl(),
    inputNacionalidadRepresentante: new FormControl(),
    inputEstadoCivil: new FormControl(),
    inputCargoRepresentante: new FormControl(),
    inputVigencia: new FormControl(),


    Directiva: new FormArray([
      new FormGroup({
        nombre: new FormControl(),
        cargo: new FormControl(),
        nit: new FormControl(),
        peps: new FormControl(),
      })
    ]),
    Socios: new FormArray([
      new FormGroup({
        nombre: new FormControl(),
        cargo: new FormControl(),
        nacionalidad: new FormControl(),
        nit: new FormControl(),
        porcentaje: new FormControl(),
      })
    ]),
    EmpresasGrupo: new FormArray([
      new FormGroup({
        nombre: new FormControl(),
        sector: new FormControl(),
        holdingPais: new FormControl(),
      })
    ]),
    Cuenta: new FormArray([
      new FormGroup({
        banco: new FormControl(),
        cuenta: new FormControl(),
        tipo: new FormControl(),
        moneda: new FormControl(),
        nombre: new FormControl(),
        promedioDeposito: new FormControl()
      })
    ]),
    Prestamos: new FormArray([
      new FormGroup({
        banco: new FormControl(),
        no: new FormControl(),
        garantia: new FormControl(),
        monto: new FormControl(),
        plazo: new FormControl(),
        saldo: new FormControl()
      })
    ]),
    Descuentos: new FormArray([
      new FormGroup({
        entidad: new FormControl(),
        garantia: new FormControl(),
        montoOtorgado: new FormControl(),
        montoUtilizado: new FormControl(),
        saldo: new FormControl()
      })
    ]),
    Proveedores: new FormArray([
      new FormGroup({
        nombre: new FormControl(),
        promedio: new FormControl(),
        montoMax: new FormControl(),
        pais: new FormControl(),
        contacto: new FormControl(),
        telefono: new FormControl()
      })
    ]),
    Clientes: new FormArray([
      new FormGroup({
        nombre: new FormControl(),
        promedio: new FormControl(),
        diasCredito: new FormControl(),
        formaPago: new FormControl(),
        tiempoRelacion: new FormControl(),
        productoServicio: new FormControl(),
        contacto: new FormControl(),
        telefono: new FormControl()
      })
    ]),


  });

  Directiva = this.myForm.get('Directiva') as FormArray;
  Socios = this.myForm.get('Socios') as FormArray;
  Cuenta = this.myForm.get('Cuenta') as FormArray;
  EmpresasGrupo = this.myForm.get('EmpresasGrupo') as FormArray;
  Prestamos = this.myForm.get('Prestamos') as FormArray;
  Descuentos = this.myForm.get('Descuentos') as FormArray;
  Proveedores = this.myForm.get('Proveedores') as FormArray;
  Clientes = this.myForm.get('Clientes') as FormArray;

  onSubmitComplete() { 
    if (this.model) {
      let fe = `${this.model.year}-${this.model.month}-${this.model.day}`
      console.log('FECHA ENTATIVA: ' + fe);
      this.requestForm.legal_representatives[0].date_of_birth = new Date(fe);
    }
    this.requestForm.finish_date = new Date();
    let suscription = this.solicitudService.saveForm(this.requestForm, this.requestID, 1).pipe(
      map((resp) => {
        //console.log(resp);
        this.spinner.hide();
        this.toastr.success('Guardar', 'Tu progreso fue guardado con éxito');
        if (!resp) {

          this.requestForm = {};

          this.requestForm.legal_representatives = [];
          this.requestForm.legal_representatives.push({});

          this.requestForm.members = [];
          this.requestForm.members.push({});
          this.membersCount = 1;

          this.requestForm.director_boards = [];
          this.requestForm.director_boards.push({});
          this.directorsCount = 1;

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

        if (this.requestForm.legal_representatives.length == 0) {
          this.requestForm.legal_representatives.push({});
        }
        else {
          if (this.requestForm.legal_representatives[0].date_of_birth) {

            this.requestForm.legal_representatives[0].date_of_birth = this.requestForm.legal_representatives[0].date_of_birth + '';
            let datestr = this.requestForm.legal_representatives[0].date_of_birth.substring(0, 10).split('-')
            datestr = datestr[1] + '-' + datestr[2] + '-' + datestr[0]
            this.requestForm.legal_representatives[0].date_of_birth = new Date(datestr);

            this.model = {

              year: this.requestForm.legal_representatives[0].date_of_birth.getFullYear(),
              month: this.requestForm.legal_representatives[0].date_of_birth.getMonth() + 1,
              day: this.requestForm.legal_representatives[0].date_of_birth.getDate()
            }
          }
        }



        if (this.requestForm.members.length == 0) { this.requestForm.members.push({}); }
        this.membersCount = this.requestForm.members.length;

        if (this.requestForm.director_boards.length == 0) { this.requestForm.director_boards.push({}); }
        this.directorsCount = this.requestForm.director_boards.length;

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
        console.log(err);
        return of();
      })
    ).subscribe(() => suscription.unsubscribe());


  }
  onSubmit() {
    // console.log(this.createCustomer.value);
    //this.toastr.success('Guardar', 'Hiciste click en guardar');
    console.log(this.myForm.value);
    console.log(this.model);
    console.log(this.date);

    //this.spinner.show();


    
    if (this.model) {
      let fe = `${this.model.year}-${this.model.month}-${this.model.day}`
      console.log('FECHA ENTATIVA: ' + fe);
      this.requestForm.legal_representatives[0].date_of_birth = new Date(fe);
    }
   let suscription = this.solicitudService.saveForm(this.requestForm,this.requestID,1).pipe(
      map((resp) => {
        //console.log(resp);
        this.spinner.hide();
        this.toastr.success('Guardar', 'Tu progreso fue guardado con éxito');
        if (!resp) {

          this.requestForm = {};

          this.requestForm.legal_representatives = [];
          this.requestForm.legal_representatives.push({});

          this.requestForm.members = [];
          this.requestForm.members.push({});
          this.membersCount = 1;

          this.requestForm.director_boards = [];
          this.requestForm.director_boards.push({});
          this.directorsCount = 1;

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

        if (this.requestForm.legal_representatives.length == 0) {
          this.requestForm.legal_representatives.push({});
        }
        else {
          if (this.requestForm.legal_representatives[0].date_of_birth) {

            this.requestForm.legal_representatives[0].date_of_birth = this.requestForm.legal_representatives[0].date_of_birth + '';
            let datestr = this.requestForm.legal_representatives[0].date_of_birth.substring(0, 10).split('-')
            datestr = datestr[1] + '-' + datestr[2] + '-' + datestr[0]
            this.requestForm.legal_representatives[0].date_of_birth = new Date(datestr);

            this.model = {

              year: this.requestForm.legal_representatives[0].date_of_birth.getFullYear(),
              month: this.requestForm.legal_representatives[0].date_of_birth.getMonth() + 1,
              day: this.requestForm.legal_representatives[0].date_of_birth.getDate()
            }
          }
        }



        if (this.requestForm.members.length == 0) { this.requestForm.members.push({}); }
        this.membersCount = this.requestForm.members.length;

        if (this.requestForm.director_boards.length == 0) { this.requestForm.director_boards.push({}); }
        this.directorsCount = this.requestForm.director_boards.length;

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
        console.log(err);
        return of();
      })
    ).subscribe(() => suscription.unsubscribe()); 



  }

  agregarDirectiva() {
    this.requestForm.director_boards.push({});
    this.directorsCount++;
  }
  

  quitarDirectiva(i) {
    //console.log('SE VA A QUITAR EL INDICE ' + i);
    if (!this.requestForm.director_boards[i].director_id) {
      //console.log('SE VA A QUITAR UNA COMPANIA QUE NO EXISTE EN BACKEND');
      this.requestForm.director_boards = this.requestForm.director_boards.filter((_, k) => k != i);


    }
    else {
      this.requestForm.director_boards[i].remove = true;
    }
    this.directorsCount--;
    if (this.directorsCount == 0) { this.agregarDirectiva(); }
    //console.log('QuitarEmpresa: '+this.companiesCount);
  }

  agregarSocio() {
    this.requestForm.members.push({});
    this.membersCount++;
  }
  quitarSocio(i) {
    //console.log('SE VA A QUITAR EL INDICE ' + i);
    if (!this.requestForm.members[i].member_id) {
      //console.log('SE VA A QUITAR UNA COMPANIA QUE NO EXISTE EN BACKEND');
      this.requestForm.members = this.requestForm.members.filter((_, k) => k != i);


    }
    else {
      this.requestForm.members[i].remove = true;
    }
    this.membersCount--;
    if (this.membersCount == 0) { this.agregarSocio(); }
    //console.log('QuitarEmpresa: '+this.companiesCount);
  }

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
    if (this.factoringsCount == 0) { this.agregarDescuento(); }

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
    if (this.suppliersCount == 0) { this.agregarProveedor(); }

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




  
  ngOnInit(): void {
    this.previousUrl = localStorage.getItem('cutomer-previous-url');
    this.getCountries();
    this.requestID = parseInt(this.route.snapshot.params.idsolicitud);
    //console.log(this.route.snapshot.paramMap.get('requestIdSelected'));
    this.spinner.show();
    this.solicitudService.getForm(this.requestID).pipe(
      map((resp) => {
        this.requestForm = resp;
        console.log(resp);
        if (!resp) {
          
          this.requestForm = {};

          this.requestForm.legal_representatives = [];
          this.requestForm.legal_representatives.push({});
          
          this.requestForm.members = [];
          this.requestForm.members.push({});
          this.membersCount = 1;

          this.requestForm.director_boards = [];
          this.requestForm.director_boards.push({});
          this.directorsCount = 1;

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
        

        if (this.requestForm.legal_representatives.length == 0) {
          this.requestForm.legal_representatives.push({});
        }
        else {
          if (this.requestForm.legal_representatives[0].date_of_birth) {
            
            this.requestForm.legal_representatives[0].date_of_birth = this.requestForm.legal_representatives[0].date_of_birth + '';
            let datestr = this.requestForm.legal_representatives[0].date_of_birth.substring(0, 10).split('-')
            datestr = datestr[1] + '-' + datestr[2] + '-' + datestr[0]
            this.requestForm.legal_representatives[0].date_of_birth = new Date(datestr);
            
            this.model = {

              year: this.requestForm.legal_representatives[0].date_of_birth.getFullYear(),
              month: this.requestForm.legal_representatives[0].date_of_birth.getMonth() + 1,
              day: this.requestForm.legal_representatives[0].date_of_birth.getDate()
            } 
          }
        }
        
        



        if (this.requestForm.members.length == 0) { this.requestForm.members.push({}); }
        this.membersCount = this.requestForm.members.length;

        if (this.requestForm.director_boards.length == 0) { this.requestForm.director_boards.push({}); }
        this.directorsCount = this.requestForm.director_boards.length;

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
    ).subscribe(x => { this.spinner.hide(); });
  }


  getCountries() {
    this.serviciosAuxiliares.getCountries().pipe(
      map((response) => {
        this.countries = response;
      }))
      .subscribe();
  }
  returnPreviusPage(): void {
    console.log('RETURN:: ' + this.previousUrl);
    if (this.previousUrl)
      this.router.navigate([this.previousUrl]);
  }

}
