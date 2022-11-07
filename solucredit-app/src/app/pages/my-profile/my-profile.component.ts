import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MysqlService } from 'src/app/services/mysql/mysql.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from "ngx-spinner";
import { FormArray, FormControl, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { AuthorizationService } from '../../services/authorization.service';
import { Subscription, of } from 'rxjs';
import { xml } from 'd3';
import { MyProfileReqSubjectResp, ReqSubjectResp, ReqFormResp, ReqRequirementDoc, ReqFormDocResp, ReqRequirementDetail } from '../../models/fomMetadata.model';
import { Router, ActivatedRoute, ParamMap, RoutesRecognized, NavigationEnd } from '@angular/router';
import { SendEmailService } from "../../services/sendemail/send-email.service";
import { filter, pairwise, map, catchError } from 'rxjs/operators';
import { HttpResponseBase } from '@angular/common/http';
import { MyprofileService } from './service/myprofile.service';
import { DownloadxlsService } from './service/downloadxls.service';
import { DatePipe } from '@angular/common';
import { NotifierService } from 'angular-notifier';
import { AuthService } from '@auth0/auth0-angular';
import { LogoutOptions } from '@auth0/auth0-spa-js';
import { environment } from '../../../environments/environment';
import { SidebarNameService } from 'src/app/services/data/sidebar-name.service';
import { ValidatePasswordAuth0Service } from 'src/app/services/auth0/validate-password-auth0.service';
import { ShowViewInterface } from 'src/app/component/fdt/directive/directive.component';
import { User_Forms, User_Documents, User_Requirements, User_Upload_Forms, BUCKET_NAME } from 'src/Utils/constants';
import { FilenameService } from 'src/app/services/data/filename.service';
import { DocumentmodalComponent } from 'src/app/component/modals/documentmodal/documentmodal.component';
import { isNitValid } from '../../Validators/NitValidator'
import { PlaceHoldersService } from 'src/app/services/place-holders.service';
import { ErrorMessagesService } from 'src/app/services/error-messages.service';
import { isDPIValid } from 'src/app/Validators/DPIValidator';
import { ItemStep } from 'src/app/component/stepper/stepper.component';
import { IntrojsService } from 'src/app/services/introjs/introjs.service';
import { RequirementObservation } from 'src/app/models/requirementObservation.model';
import { RequirementObservationService } from 'src/app/services/requirement/requirement-observation.service';
import { ValidationErrors } from '@iplab/ngx-file-upload';

@Component({
  selector: "app-my-profile",
  templateUrl: "./my-profile.component.html",
  styleUrls: ["./my-profile.component.css"],
})
export class MyProfileComponent implements OnInit {
  //-------FORMS STUFF--------
  stepperConfiguration: ItemStep[] = [
    {
      title: 'Verficación de datos',
      message: 'Verifica que tus datos sean correctos',
      icon: 'pe-7s-user',
      state: 'none',
      id: 0,
      name: 'verificationstepperbutton'
    },
    {
      title: 'Documentación',
      message: 'Ingresa tus documentos: DPI y Carta de Consentimiento',
      icon: 'pe-7s-users',
      state: 'none',
      id: 1,
      name: 'documentstepperbutton'
    },
    {
      title: 'Ingreso de datos de formularios',
      message: 'Entra a cada formulario e ingresa los datos necesarios para completarlos.',
      icon: 'pe-7s-copy-file',
      state: 'none',
      id: 2,
      name: 'formstepperbutton'
    },
    {
      title: 'Ingreso de requisitos',
      message: 'Sube los archivo necesarios para completar cada requisito.',
      icon: 'pe-7s-id',
      state: 'none',
      id: 3,
      name: 'requirementstepperbutton'
    },
    {
      title: 'Subir formularios',
      message: 'Sube los formularios llenos y firmados',
      icon: 'pe-7s-pen',
      state: 'none',
      id: 4,
      name: 'uploadformstepperbutton'
    },
  ]

  formList: MyProfileReqSubjectResp[] = [];
  @ViewChild('formssections') formsSections: ElementRef;

  @ViewChild(DocumentmodalComponent) viewDocumentModal: DocumentmodalComponent
  currentForm: MyProfileReqSubjectResp = null;
  currentAval: MyProfileReqSubjectResp = null;
  editInformationMessage = 'Se debe validar y completar la información del perfil de usuario.'
  showAlertInformation = true
  formsUrls = [
    [
      ["solicitud-individual", "Formulario de Solicitud"],
      ["perfil-individual", "Perfil de solicitante"],
      ["ive-productos-individual", "IVE"],
      ["feic-individual", "FEIC"],
      ["cpe-individual", "CPE"],
      ["pep-individual", "PPE"],
      ["autorizacion-consulta-individual", "Autorización para consultas"],
      [
        "carta-banco-internacional-individual",
        "Carta para el Banco Internacional",
      ],
      ["estado-patrimonial-individual", "Estado Patrimonial"],
      ["flujo-fondos-individual", "Flujo de Fondos"],
      ["endeudamiento-bancario-individual", "Endeudamiento Bancario"],
      ["formato-integraciones-individual", "Formato de Integraciones"],
      ["registro-deudores-individual", "Registro de Deudores"],
    ],
    [
      ["solicitud-empresa", "Formulario de Solicitud"],
      ["perfil-empresa", "Perfil de solicitante"],
      ["ive-", "IVE"],
      ["anexo-servicios", "Anexo de productos y servicios"],
      ["cpe-individual", "Anexo CPE"],
      [
        "carta-banco-internacional-individual",
        "Carta para el Banco Internacional",
      ],
      ["punto-acta", "Punto de acta"],
      //["feic-empresa", "FEIC"],
      //["pep-individual", "PPE"],
      //["autorizacion-consulta-individual", "Autorización para consultas"],
      //["estado-patrimonial-individual", "Estado Patrimonial"],
      //["flujo-fondos-individual", "Flujo de Fondos"],
      //["endeudamiento-bancario-individual", "Endeudamiento Bancario"],
      //["formato-integraciones-individual", "Formato de Integraciones"],
      ["registro-deudores-individual", "Registro de Deudores"],
    ],
  ];
  sub: Subscription;
  //para la nueva version
  currentClient = -1;
  active = 0;
  //----------------------------------
  user_id;
  dataPersonsRepresentative: any = [];
  page = 1;
  pageSize = 10;
  dataRequest;
  lastrequest;
  logdataRequest;
  Countries = [];
  Departments = [];
  Municipalities = [];

  optionsCountries = [];
  optionsDepartments = [];
  optionsMunicipalities = [];

  selecionCountry: string[] = [];
  selecionDepartment: string[] = [];
  selecionMunicipality: string[] = [];
  actualRequest;
  dataFiduciary;
  statusRelation;
  statusadicionaldoctument;
  statusdocinitialrelationjuridico;
  idadocinitialrelationjuridico;
  currentProcessStep = 0;
  step1Done = false;
  step2Done = false;
  step3Done = false;
  step4Done = false;
  userInitialRelationStatusColor = 'info'
  userInitialRelationStatusName = '--'
  userRequestStatusColor = 'info'
  userRequestStatusName = '--'
  showViews: string[] = [] //en donde dice que vistas son disponibles
  //USER TABS
  User_Tab_Documents = User_Documents
  User_Forms = User_Forms
  User_Requirements = User_Requirements
  User_Upload_Forms = User_Upload_Forms
  // id: {'name', 'color'}
  userInitialRelationStatusDict = {
    0: { 'name': 'Sin Relación', 'color': 'danger' },
    1: { 'name': 'En Proceso', 'color': 'warning' },
    2: { 'name': 'Verificando Documentos', 'color': 'warning' },
    3: { 'name': 'Documentos rechazados', 'color': 'danger' },
    4: { 'name': 'Completa', 'color': 'success' },
  }
  userRequestStatusDict = {
    0: { 'name': 'Solicitud Creada', 'color': 'success' },
    1: { 'name': 'Validando verificaciones', 'color': 'danger' },
    2: { 'name': 'Validando garatías', 'color': 'danger' },
    3: { 'name': 'Enviando formularios', 'color': 'danger' },
    4: { 'name': 'Ingreso de datos a los formularios', 'color': 'danger' },
    5: { 'name': 'Validando formularios', 'color': 'danger' },
    6: { 'name': 'Análisis Legal', 'color': 'danger' },
    7: { 'name': 'Visitas de negocio', 'color': 'danger' },
    8: { 'name': 'Análisis de cumplimiento', 'color': 'danger' },
    9: { 'name': 'Revisión de Expediente', 'color': 'danger' },
    10: { 'name': 'Aprobación comité Créditos', 'color': 'danger' },
    11: { 'name': 'Envío de informe de negociación', 'color': 'danger' },
    12: { 'name': 'Aprobación Gerencial', 'color': 'danger' },
    13: { 'name': 'Activación de cliente', 'color': 'danger' },
    14: { 'name': 'Completa', 'color': 'success' },
  };

  notifications = {
    'aditional_documents': {
      'count': 0,
    }
  }
  @ViewChild("aditionalRequest") private aditionalRequest: TemplateRef<{}>;
  @ViewChild("showDoc") private showDoc: TemplateRef<{}>;
  persons;
  statusbtnFormularios = {
    class: "custom_add1",
    text: "Completar Formularios",
    value: 1,
    icon: "icon-check",
  };
  statusbtnVerificaciones = {
    class: "custom_add1",
    text: "Completar Verificaciones",
    value: 1,
    icon: "icon-check",
  };
  statusbtnGarantias = {
    class: "custom_add1",
    text: "Completar Garantias",
    value: 1,
    icon: "icon-check",
  };
  StatusSolicitud = {
    status: "Pendiente",
    class: "label-warning",
    check: false,
  };

  dataCustomer;
  initialRelation;
  loginitialRelation;
  optionsTypeRequest = [];
  imgsrcbase64;
  pdfsrcbase64;
  aditional;
  savedDocs;
  FiduciaryinOnu = false;

  FormRequest = new FormGroup({
    id: new FormControl(null),
    imgs: new FormArray([new FormControl(null)]),
  });

  editPassword = new FormGroup({
    newPassword: new FormControl(null, [Validators.required]),
    confirm: new FormControl(null, [Validators.required]),
  }, {
    validators: [this.forbiddenNameValidator()]
  });

  Docs = new FormArray([]);
  Docss = [];
  //--------
  currentJustify = "fill";

  updateCustomer = new FormGroup({
    businessname: new FormControl(null),
    branchoffice: new FormControl({ value: null },),
    branchofficecode: new FormControl({ value: null }),
    zone: new FormControl(null),
    // name: new FormControl(null, [Validators.required]),
    name1: new FormControl('', [Validators.required]),
    name2: new FormControl(''),
    name3: new FormControl(""),
    lastname1: new FormControl('', [Validators.required]),
    lastname2: new FormControl(''),
    lastname3: new FormControl(""),
    address1: new FormControl(null, [Validators.required]),
    address2: new FormControl(null, []),
    nit: new FormControl("", [
      Validators.required,
      isNitValid
    ]),
    DPI: new FormControl("", [
      Validators.required,
      isDPIValid
    ]),
    phone: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    municipality_id: new FormControl(null, []),
    inputPais: new FormControl("", [Validators.required]),
    inputDepartamento: new FormControl("", [Validators.required]),
    amount_interests: new FormControl(""),
    currency: new FormControl(""),
    //inputlogo: new FormControl("", []),
  });
  updateCustomer2 = new FormGroup({
    businessname: new FormControl(null, [Validators.required]),
    branchoffice: new FormControl({ value: null },),
    branchofficecode: new FormControl({ value: null }),
    zone: new FormControl(''),
    // name: new FormControl(null, [Validators.required]),
    name1: new FormControl('', [Validators.required]),
    name2: new FormControl(''),
    name3: new FormControl(''),
    lastname1: new FormControl('', [Validators.required]),
    lastname2: new FormControl('', []),
    lastname3: new FormControl(''),
    nit: new FormControl("", [
      Validators.required,
      isNitValid
    ]),
    DPI: new FormControl("", [
      Validators.required,
      isDPIValid
    ]),
    address1: new FormControl(''),
    address2: new FormControl(''),
    phone: new FormControl([
      Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)"),
    ]),
    email: new FormControl([Validators.email, Validators.required]),
    municipality_id: new FormControl(null, [Validators.required]),
    category_id: new FormControl("1"),
    type: new FormControl(0, [Validators.required]),
    inputPais: new FormControl("", []),
    inputDepartamento: new FormControl("", []),
    amount_interests: new FormControl(""),
    currency: new FormControl(""),
    commercialname: new FormControl(''),
  })


  filelogo;
  localUrl: any[];

  //SUSCRIPCION..
  susciption: Subscription;
  currentSubject: ReqSubjectResp;
  requirementObservation: RequirementObservation[] = []
  constructor(
    private mysqlService: MysqlService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private sanitizer: DomSanitizer,
    public spinner: NgxSpinnerService,
    private authorization: AuthorizationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _sendemail: SendEmailService,
    private myProfileService: MyprofileService,
    private DownloadxlsService: DownloadxlsService,
    public datepipe: DatePipe,
    private notifier: NotifierService,
    public auth: AuthService,
    private sidebarName: SidebarNameService,
    private validate_auth0: ValidatePasswordAuth0Service,
    private filenameS: FilenameService,
    public placeHolders: PlaceHoldersService,
    public errorMessages: ErrorMessagesService,
    private introJsService: IntrojsService,
    private _requirementObservationService: RequirementObservationService
  ) { }
  onMunicipalitySelected(value, update) {
    update.controls.municipality_id.setValue(parseInt(value));
    this.selecionMunicipality = value;
  }

  onCountrySelected(value: Number, update) {

    let country = this.Countries.find(item => { return item.id == value });

    //console.log(this.optionsDepartments)
    this.optionsDepartments = this.Departments.filter((item) => item.country == country.id);
    //si no hay departamentos ocultamos el campo
    const updateCustomer = this.dataCustomer.type == 1 ? this.updateCustomer2 : this.updateCustomer
    if (this.optionsDepartments.length == 0) {
      updateCustomer.controls.inputDepartamento.disable()
      updateCustomer.controls.municipality_id.disable()
      this.optionsMunicipalities = [];
      this.selecionMunicipality = null;
    } else {
      updateCustomer.controls.inputDepartamento.enable()
      updateCustomer.controls.municipality_id.enable()
      this.optionsMunicipalities = this.Municipalities
      this.optionsDepartments = this.Departments
    }


    update.controls.municipality_id.setValue(null);
  }
  async ngOnInit() {

    this.spinner.show();

    this.susciption = this.authorization.authotizationState$.subscribe(
      async (x) => {
        //console.log('DESDE subscribe....');
        //console.log(x)
        this.user_id = this.authorization.getUserid();
        //console.log(this.user_id);
        //this.user_id = 105;
        await this.getAllCustomerRequest();
        await this.getDataCurrentCostumer();
        await this.getTypeRequest();
        await this.getDataPersonCurrentCostumer();
        await this.getPersons();
        console.log(this.dataCustomer)
        console.log('MICUSTOMER')
        this.Countries = await this.getCountries();
        this.Departments = await this.getDepartments();
        this.Municipalities = await this.getMunicipalities();
        console.log(this.Countries)
        console.log(this.Departments)
        console.log(this.Municipalities)
        await this.getStepStatus();
        this.spinner.hide()
        this.introJsService.customerWalkthrough(true);
      }
    );


  }
  forbiddenNameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('newPassword')
      const confirmPassword = control.get('confirm')
      return password && confirmPassword && password.value !== confirmPassword.value ? {
        mismatch: true
      } : null
    };
  }
  ngAfterViewInit() {
    //console.log(this.activatedRoute.snapshot.url);
    this.sub = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        //console.log('prev de cutomer:', event.url);
        localStorage.setItem("cutomer-previous-url", "/my-profile");
        this.sub.unsubscribe();
      });

  }

  async getPersons() {
    const res = this.mysqlService
      .getCustomerRepresentatiave(this.user_id)
      .toPromise()
      .then((response) => {
        this.dataPersonsRepresentative = response.data;

      });
    return res;
  }

  async getDataCurrentCostumer() {
    // const onepersons ;

    const res = this.mysqlService
      .GetOneCustomer(this.user_id)
      .toPromise()
      .then((response) => {
        //console.log(response.data);
        this.dataCustomer = response.data.customer;
        this.showAlertInformation = response.data.customer.updated_information == 1 ? false : true
        if (this.dataCustomer && this.dataCustomer.businessname && this.dataCustomer.businessname !== "") {
          this.sidebarName.name$.emit(this.dataCustomer.businessname)
        } else {
          this.sidebarName.name$.emit(this.dataCustomer.name)
        }
        this.initialRelation = response.data.relation[0];


        this.dataFiduciary = response.data.fiduciaries;
        this.loginitialRelation = response.data.logrelation;
        this.aditional = response.data.aditional;
        this.notifications.aditional_documents.count = 0
        for (let i = 0; i < this.aditional.length; i++) {
          let doc = this.aditional[i]
          if (doc.status == 0) {
            this.notifications.aditional_documents.count++
          }
        }
        this.setInitialRelationStatusInfo()
        // console.log('add',this.aditional);
        //console.log(this.dataCustomer);
        this.dataFiduciary.forEach(element => {
          if (element.in_onulist == 1) {
            this.FiduciaryinOnu = true;
          }
        });
        const currentDate = new Date();
        //console.log(this.dataCustomer)


      });
    return res;
  }

  /**MY PROFILE COMPONENT */

  async getAllCustomerRequest() {
    const res = this.mysqlService
      .GetCustomerRequest(this.user_id)
      .toPromise()
      .then((response) => {
        this.dataRequest = response.data.request;
        if (this.dataRequest) {
          if (this.dataRequest.length > 0) {

            this.lastrequest = response.data.request[this.dataRequest.length - 1];
            this.setLastRequestStatusInfo();
            this.logdataRequest = response.data.logrequest;

            let sub2 = this.myProfileService
              .getFormsInfo(this.lastrequest.request_id)
              .subscribe((x) => {
                //console.log("data forms:: ");
                //console.log(x);

                this.formList = x;
                this.getStepStatus();
                sub2.unsubscribe();
              });
          } else {
            this.formList = [];
            this.getStepStatus();
          }
        }

        this.CheckStatusRequest(this.dataRequest);
      })
      .catch((error) => {
        this.toastr.error("Problemas con el servidor.", "Oops!");
        this.getStepStatus();
      });
    return res;
  }

  setLastRequestStatusInfo() {
    this.userRequestStatusColor = this.userRequestStatusDict[Number(this.lastrequest.status)]['color']
    this.userRequestStatusName = this.userRequestStatusDict[Number(this.lastrequest.status)]['name']
  }

  setInitialRelationStatusInfo() {
    this.userInitialRelationStatusColor = this.userInitialRelationStatusDict[Number(this.initialRelation.status)]['color']
    this.userInitialRelationStatusName = this.userInitialRelationStatusDict[Number(this.initialRelation.status)]['name']
  }

  async getTypeRequest() {
    const res = this.mysqlService
      .GetTypeRequest()
      .toPromise()
      .then((response) => {
        //console.log("rest", response);
        this.optionsTypeRequest = response.data;
      });
    return res;
  }

  //-----estado de la solicitud----
  async CheckStatusRequest(data) {
    await data.forEach((element) => {
      if (element.documents === 1) {
        this.statusbtnFormularios = {
          class: "btn-danger",
          text: "Formularios incompletos",
          value: 0,
          icon: "icon-close",
        };
      } else {
        this.statusbtnFormularios = {
          class: "custom_add1",
          text: "Completar Formularios",
          value: 1,
          icon: "icon-check",
        };
      }
      if (element.verifications === 1) {
        this.statusbtnVerificaciones = {
          class: "btn-danger",
          text: "Verificaciones incompletas",
          value: 0,
          icon: "icon-close",
        };
      } else {
        this.statusbtnVerificaciones = {
          class: "custom_add1",
          text: "Completar Verificaciones",
          value: 1,
          icon: "icon-check",
        };
      }
      if (element.warranties === 1) {
        this.statusbtnGarantias = {
          class: "btn-danger",
          text: "Garantias incompletas",
          value: 0,
          icon: "icon-close",
        };
      } else {
        this.statusbtnGarantias = {
          class: "custom_add1",
          text: "Completar Garantias",
          value: 1,
          icon: "icon-check",
        };
      }
    });
  }

  openModalSR(targetModal) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: "static",
      keyboard: false,
      size: "xl",
      windowClass: 'my-modal'
    });
  }
  openModalXXL(targetModal) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: "static",
      keyboard: false,
      windowClass: 'modal1',
    });
  }

  closeBtnClick() {
    //console.log('Se va a cerrar el modal');
    this.modalService.dismissAll();
    localStorage.removeItem("file-edit");
  }

  async ViewReqDoc(modal, doc: ReqRequirementDoc) {
    //this.spinner.show();
    await this.myProfileService
      .getreqDoc(doc)
      .toPromise()
      .then((response) => {

        this.imgsrcbase64 = null;
        this.pdfsrcbase64 = null;
        if (response.data.typed === "image") {
          const urls = "data:image/jpg;base64;base64," + response.data.url;
          this.imgsrcbase64 = this.sanitizer.bypassSecurityTrustResourceUrl(
            urls
          );
        } else if (response.data.typed === "pdf") {
          const urls = "data:application/pdf;base64," + response.data.url;
          this.pdfsrcbase64 = response.data.url
        }
      })
      .catch((error) => {
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });

    this.viewDocumentModal.openModal()
  }

  async ViewFormDoc(modal, doc: ReqFormDocResp) {
    //this.spinner.show();
    await this.myProfileService
      .getFormDoc(doc)
      .toPromise()
      .then((response) => {

        this.imgsrcbase64 = null;
        this.pdfsrcbase64 = null;
        if (response.data.typed === "image") {
          const urls = "data:image/jpg;base64;base64," + response.data.url;
          this.imgsrcbase64 = this.sanitizer.bypassSecurityTrustResourceUrl(
            urls
          );
        } else if (response.data.typed === "pdf") {
          const urls = "data:application/pdf;base64," + response.data.url;
          this.pdfsrcbase64 = response.data.url
        }
      })
      .catch((error) => {
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });

    this.viewDocumentModal.openModal()
  }

  DownloadReqDoc(doc: ReqRequirementDoc): void {
    this.myProfileService.DownloadReqDoc(doc);
  }

  DownloadFormDoc(doc: ReqFormDocResp): void {
    this.myProfileService.DownloadFormDoc(doc);
  }


  DeleteReqDoc(req: ReqRequirementDetail, doc: ReqRequirementDoc) {
    this.myProfileService.DeleteReqDoc(doc).toPromise()
      .then(async (response) => {

        this.toastr.success("Se elimino el archivo.", "Archivo Eliminado!");
        req.docs = req.docs.filter(d => d.req_requi_doc != doc.req_requi_doc);

      })
      .catch((error) => {
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }

  DeleteFormDoc(doc: ReqFormDocResp) {
    this.myProfileService
      .DeleteFormDoc(doc)
      .toPromise()
      .then(async (response) => {
        let form = this.currentSubject.forms.find(
          (f) => f.rsfdet_id == doc.rsfdet_id
        );
        form.docs = form.docs.filter(
          (fd) => fd.req_form_doc_id != doc.req_form_doc_id
        );
        this.toastr.success("Se elimino el archivo.", "Archivo Eliminado!");
      })
      .catch((error) => {
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }

  async ViewDocuRelation(modal, type, dockey) {
    this.spinner.show();
    await this.mysqlService
      .GetOneDocument({
        type: type,
        id: this.initialRelation.id,
        document_key: dockey,
      })
      .toPromise()
      .then((response) => {
        this.imgsrcbase64 = null;
        this.pdfsrcbase64 = null;
        if (response.data.type === "image") {
          const urls =
            "data:image/jpg;base64;base64," + response.data.relation.DPI_key;
          this.imgsrcbase64 = this.sanitizer.bypassSecurityTrustResourceUrl(
            urls
          );
        } else if (response.data.type === "pdf") {
          const urls =
            "data:application/pdf;base64," + response.data.relation.DPI_key;
          this.pdfsrcbase64 = response.data.relation.DPI_key;
        }
        this.spinner.hide();
      })
      .catch((error) => {
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
    this.viewDocumentModal.openModal()
  }

  async saveChanges(form) {
    console.log("EN SAVE CHANGES::");
    this.spinner.show()
    console.log(form.value);
    //console.log(this.localUrl);
    //console.log(this.user_id);
    this.user_id = this.authorization.getUserid();
    //console.log(this.user_id);
    const newfile = JSON.parse(localStorage.getItem("file-edit"));
    /*  if (newfile) {
       await this.mysqlService
         .UploadFile({ inputlogo: newfile, nit: this.updateCustomer.value.nit })
         .toPromise()
         .then((response) => {
           //console.log(response);
           this.updateCustomer.value.logotipo = response.data.key;
         })
         .catch((error) => {
           this.toastr.error("Problemas con guardar la imagen", "Oops!");
         });
     } */
    let data = form.value;
    if (newfile) {
      data = { ...data, inputlogo: newfile };
    }
    this.mysqlService
      .UpdateCustomer(data, this.user_id)
      .subscribe(
        (response) => {
          localStorage.removeItem("file-edit");
          this.toastr.success(
            "La información fue guardada con exito.",
            "Información Guardada!"
          );
          this.closeBtnClick();
          this.getPersons();
          this.getAllCustomerRequest();
          this.getDataCurrentCostumer();
          this.getTypeRequest();
          this.spinner.hide()
        },
        (error) => {
          this.toastr.error("Verificar información del formulario.", "Oops!");
          console.log(error);
          this.spinner.hide()
        }
      );
  }
  changePassword() {
    let suscription = this.myProfileService
      .changePasswordCustomer(
        this.dataCustomer.customer_id,
        this.editPassword.controls.newPassword.value
      )
      .pipe(
        map((resp) => {
          //console.log(resp);
          this.notifier.notify(
            "success",
            "Se cambio la contraseña satisfactoriamente"
          );
          this.closeBtnClick();
          this.logout();
        }),
        catchError((err) => {
          this.notifier.notify("error", "Ocurrio un problema" + err.message);
          console.log(err);
          return of();
        })
      )
      .subscribe(() => suscription.unsubscribe());
  }
  logout(): void {
    window.localStorage.clear();
    const options: LogoutOptions = {
      returnTo: environment.redirectUri,
    };

    this.auth.logout(options);
  }
  OpenChangePassword(targetModal) {
    //this.checkrules = this.getRules()
    this.validate_auth0.getNewRules()
    this.editPassword.reset({})
    this.modalService.open(targetModal, {
      centered: true,
      keyboard: false,
      size: "lg",
      windowClass: 'my-modal'
    });
  }
  async openEdit(targetModal) {
    console.log(this.dataCustomer);
    console.log('CUSTOMER')
    this.optionsCountries = await this.getCountries();
    this.optionsDepartments = await this.getDepartments();
    this.optionsMunicipalities = await this.getMunicipalities();
    const updateCustomer = this.dataCustomer.type == 1 ? this.updateCustomer2 : this.updateCustomer
    //updateCustomer.controls.name.setValue(this.dataCustomer.name);
    this.updateCustomer.reset()
    updateCustomer.controls.name1.setValue(this.dataCustomer.name1);
    updateCustomer.controls.name2.setValue(this.dataCustomer.name2);
    updateCustomer.controls.name3.setValue(this.dataCustomer.name3);
    updateCustomer.controls.lastname1.setValue(
      this.dataCustomer.lastname1
    );
    updateCustomer.controls.lastname2.setValue(
      this.dataCustomer.lastname2
    );
    updateCustomer.controls.lastname3.setValue(
      this.dataCustomer.lastname3
    );


    updateCustomer.controls.businessname.setValue(this.dataCustomer.businessname);
    updateCustomer.controls.branchoffice.setValue(this.dataCustomer.branchoffice);
    updateCustomer.controls.branchofficecode.setValue(this.dataCustomer.branchofficecode);

    updateCustomer.controls.zone.setValue(this.dataCustomer.zone);
    updateCustomer.controls.address1.setValue(this.dataCustomer.address1);
    updateCustomer.controls.address2.setValue(this.dataCustomer.address2);
    updateCustomer.controls.nit.setValue(this.dataCustomer.nit);
    updateCustomer.controls.DPI.setValue(this.dataCustomer.DPI);
    updateCustomer.controls.phone.setValue(this.dataCustomer.phone);
    updateCustomer.controls.email.setValue(this.dataCustomer.email);
    updateCustomer.controls.amount_interests.setValue(this.dataCustomer.amount_interests);
    updateCustomer.controls.currency.setValue(this.dataCustomer.currency);
    updateCustomer.controls.commercialname?.setValue(this.dataCustomer.commercialname)
    //FILTRAR EL DEPARTAMENTO EN DONDE LA MUNICIPALIDAD SEA EL ID
    const municipality = this.Municipalities.find((item) => item.id == this.dataCustomer.municipality_id)
    const department = this.Departments.find((item) => item.id == municipality.department)
    const country = this.Countries.find((item) => item.id == department.country)
    this.selecionMunicipality = (municipality.id)
    this.selecionDepartment = (department.id)
    this.selecionCountry = (country.id)





    this.modalService.open(targetModal, {
      centered: true,
      keyboard: false,
      backdrop: 'static',
      windowClass: 'my-modal-large',

    });
  }

  getCountries() {
    const countries = [];
    this.mysqlService.GetCountries().subscribe(
      (response) => {
        Object.keys(response.data).forEach(function (k) {
          countries.push({
            id: response.data[k].country_id,
            name: response.data[k].name,
          });
        });
      },
      (error) => {
        console.log("error");
      }
    );
    return countries;
  }

  getDepartments() {
    const departments = [];
    this.mysqlService.GetDepartments().subscribe(
      (response) => {
        Object.keys(response.data).forEach(function (k) {
          departments.push({
            id: response.data[k].department_id,
            name: response.data[k].name,
            country: response.data[k].country_id,
          });
        });
      },
      (error) => {
        console.log("error");
      }
    );
    return departments;
  }

  getMunicipalities() {
    const municipalities = [];
    this.mysqlService.GetMunicipalities().subscribe(
      (response) => {
        Object.keys(response.data).forEach(function (k) {
          municipalities.push({
            id: response.data[k].municipality_id,
            name: response.data[k].name,
            department: response.data[k].department_id,
          });
        });
      },
      (error) => {
        console.log("error");
      }
    );
    return municipalities;
  }

  onCountriSelected(value: string) {
    this.selecionDepartment = [];
    this.selecionMunicipality = [];
  }

  onDepartmentSelected(value: string, update) {
    let departamento = this.optionsDepartments.find(item => { return item.id == value });


    this.optionsMunicipalities = this.Municipalities.filter((item) => item.department == departamento.id);
    update.controls.municipality_id.setValue(null);

    /*
    this.selecionMunicipality = []; */
  }

  showPreviewImage(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.localUrl = event.target.result;
        localStorage.setItem("file-edit", JSON.stringify(event.target.result));
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  async uploadImage(event, req, nspinner) {

    if (event.target.files && event.target.files[0]) {
      const named = event.target.files[0].name;
      const typed = event.target.files[0].type;
      //this.spinner.show(nspinner);
      var reader = new FileReader();
      reader.onload = async (event: any) => {
        let data = {
          document: event.target.result,
          name: named,
          type: typed,
          req_requi_id: this.currentAval.requirements.req_requi_id,
          req_requi_det_id: req.req_requi_det_id,
        };

        this.spinner.show(nspinner);
        this.myProfileService
          .uploadReq(data)
          .pipe(
            map((data) => {
              //console.log(data);

              req.docs.push(data.data);
              //console.log(this.currentAval.requirements.requirements[index].docs);
              this.spinner.hide(nspinner);
              // this.getForms(form.rsdet_id);
              //tenemos que evaluar si todos estan subidos
              let allrequirements = true
              this.formList.forEach(dat => {
                dat.requirements.requirements.filter(r => r.enabled == 1 && r.state == 0).forEach(req => {

                  if (req.docs && req.docs.length == 0) {
                    allrequirements = false;
                  }
                });
              })
              if (allrequirements) {
                this.closeBtnClick()
                //hacemos un refresh
                this.ngOnInit()
              }
            }),
            catchError((err) => {
              this.notifier.notify(
                "error",
                "Ocurrio un problema con la conexion" + err
              );
              console.log(err);
              this.spinner.hide(nspinner);
              return of();
            })
          )
          .subscribe((data) => { });
      };
      await reader.readAsDataURL(event.target.files[0]);
      event.srcElement.value = null;
    }
  }
  //FORMS OWNER FEIC
  formsAvailable(avalnumber: number, subject: number) {
    let owner = this.formList[avalnumber].subjects[subject].owner
    return owner.forms.filter((f => f.state != 0)).length > 0
  }
  goToOwnerForm(avalnumber: number, subject: number) {
    let data = {
      request_id: this.lastrequest.request_id,
      form_id: this.formList[avalnumber].subjects[subject].owner.form_id,
      metadata: this.formList[avalnumber].subjects[subject].owner,
      dataRequest: this.lastrequest,
      customer: { amount_interests: this.dataCustomer.amount_interests, currency: this.dataCustomer.currency, type: this.dataCustomer.type }
    }
    let redirectData = {
      avalnumber: avalnumber,
      subject: subject,
      formList: this.formList,
      lastrequest: this.lastrequest,
      type: 'owner'
    }
    localStorage.setItem('RedirectData', JSON.stringify(redirectData))
    localStorage.setItem("FormMetadata", JSON.stringify(data));
    this.activatedRoute.snapshot.url.push();
    this.router.navigate(["formularios"]);
  }
  isDPI(name: string): boolean {
    return name.includes(`Documento de Identificación Personal DPI`)
  }
  //FORMS STRUF------------------
  goToForm(avalnumber: number, subject: number) {
    //console.log(`numberForm: ${numberForm} idRequest:${idRequest}`);
    //INGRESO A LOCALSTORAGE LA METADATA DEL FORM
    //data: FormRequest, formID: number, rsdet_id: number, request_id: number
    let data = {
      request_id: this.lastrequest.request_id,
      form_id: this.formList[avalnumber].subjects[subject].form_id,
      metadata: this.formList[avalnumber].subjects[subject],
      dataRequest: this.lastrequest,
      customer: { amount_interests: this.dataCustomer.amount_interests, currency: this.dataCustomer.currency, type: this.dataCustomer.type }
    };
    //VAMOS A GUARDAR EL INDICE QUE SE ESTA MARCANDO, TODOS LOS FORMULARIOS PORQUE NOS SIRVE PARA HACER EL REDIRECT, EL LAST REQUEST
    let redirectData = {
      avalnumber: avalnumber,
      subject: subject,
      formList: this.formList,
      lastrequest: this.lastrequest,
      type: 'form'
    }
    localStorage.setItem('RedirectData', JSON.stringify(redirectData))
    /* let data = {
      request_id: this.lastrequest.request_id,
      form_id: this.currentSubject.form_id,
      metadata: this.currentSubject,
      dataRequest:this.lastrequest,
      customer:{amount_interests:this.dataCustomer.amount_interests,currency:this.dataCustomer.currency,type:this.dataCustomer.type}

    }; */
    this.setLocalStoragePersons(this.formList[avalnumber].subjects[subject], this.formList[avalnumber].subjects)
    localStorage.setItem("FormMetadata", JSON.stringify(data));
    this.activatedRoute.snapshot.url.push();
    this.router.navigate(["formularios"]);
  }


  setLocalStoragePersons(subject: any, subjects: any) {
    debugger
    let data = {
      persons: null,
      currentsubject: subject
    }
    const persons = this.groupSubjectsList(subjects)
    data.persons = persons
    localStorage.setItem('persons_customer', JSON.stringify(data))
  }
  getSubjectName(subject) {
    if (subject.person) {
      if (subject.person.type == 1) {
        return subject.person.businessname
      } else {
        return subject.person.name
      }
    } else {
      return subject.name
    }
  }
  groupSubjectsList(subjectsList: any[]) {
    let newList = []
    debugger
    subjectsList.sort((a, b) => { return a.sys_subject_id - b.sys_subject_id })
    subjectsList.forEach(subject => {
      if (subject.rsdet_id == null) {
        // requirement
        subject['childs'] = [];
        newList.push(subject);
      } else {
        if (newList.length > 0) {
          newList[newList.length - 1]['childs'].push(subject);
        } else {
          subject['childs'] = [];
          newList.push(subject);
        }
      }
    });

    //console.log(newList);openModalC1

    return newList;

  }

  getStatusClass(status) {
    switch (status) {
      case 1:
        return "badge badge-pill badge-warning statebadge";
      case 2:
        return "badge badge-pill badge-success statebadge";
      case 0:
        return "badge badge-pill badge-danger statebadge";
    }
  }

  scroll() {
    this.formsSections.nativeElement.scrollIntoView();
  }

  getStatusText(status) {
    switch (status) {
      case 0:
        return "No iniciado";
      case 1:
        return "En proceso";
      case 2:
        return "Finalizado";
    }
  }

  openFormsModal(currentI, currentJ, modal) {
    this.currentClient = currentI;
    this.currentForm = this.formList[currentI];
    this.currentSubject = this.currentForm.subjects[currentJ];
    this.modalService.open(modal, {
      centered: true,
      backdrop: "static",
      keyboard: false,
      windowClass: "my-class",
      /*  windowClass: 'my-class'
       */
    });
  }

  async Download(forname, idForm, name, sp) {
    let newName;

    newName = name.replace(/ /g, "_");
    newName = name.replace(/\./g, "");
    //newName = name.replace(/\./g, "");
    //console.log(newName);

    let date = new Date();
    let datestring = this.datepipe.transform(date, "yyyy-MM-dd HH:MM:ss");

    if (
      forname === "SOLICITUD JURÍDICA" ||
      forname === "SOLICITUD JURIDICA"
    ) {
      await this.DownloadxlsService.SolicitudJuridica(
        "FormularioSolicitud-" + newName + "-" + datestring,
        idForm,
        this.user_id
      );
    } else if (forname === "SOLICITUD INDIVIDUAL") {
      await this.DownloadxlsService.SolicitudIndividual(
        "FormularioSolicitud-" + newName + "-" + datestring,
        idForm,
        this.user_id
      );
    } else if (
      forname === "PERFIL JURÍDICO" ||
      forname === "PERFIL JURIDICO"
    ) {
      await this.DownloadxlsService.PerfilJuridico(
        "FormularioPerfil-" + newName + "-" + datestring,
        idForm,
        this.user_id
      );
    } else if (forname === "PERFIL INDIVIDUAL") {
      await this.DownloadxlsService.PerfilIndividual(
        "FormularioPerfil-" + newName + "-" + datestring,
        idForm,
        this.user_id
      );
    }
    else if (forname === "IVE 02" || forname === "IVE") {
      await this.DownloadxlsService.IveJuridico(
        "FormularioIVE-" + newName + "-" + datestring,
        idForm,
        this.user_id
      );
    } else if (forname === "ANEXO DE SERVICIOS") {
      await this.DownloadxlsService.AnexoProductosJuridico(
        "FormularioAnexoProducotsYServicios-" + newName + "-" + datestring,
        idForm,
        this.user_id,
        this.dataCustomer.type
      );
    } else if (
      forname === "ANEXO CPE" ||
      forname === "ANEXO CPE (CONTRATISTA O PROVEEDOR DEL ESTADO"
    ) {
      await this.DownloadxlsService.CPEJuridico(
        "FormularioCPE-" + newName + "-" + datestring,
        idForm,
        this.user_id
      );
    } else if (forname === "CARTA DIRIGIDA A BANCO INTERNACIONAL") {
      await this.DownloadxlsService.CartaBancoJuridico(
        "CartaDirigidaBanco-" + newName + "-" + datestring,
        idForm,
        this.user_id,
        this.dataCustomer.type
      );
    } else if (forname === "PUNTO DE ACTA") {
      await this.DownloadxlsService.PuntoActaJuridico(
        "MinutaPuntoActa-" + newName + "-" + datestring,
        idForm,
        this.user_id
      );
    } else if (forname === "REGISTRO DE DEUDORES") {
      await this.DownloadxlsService.DeudoresJuridico(
        "RegistroDeDeudores-" + newName + "-" + datestring,
        idForm,
        this.user_id,
        this.dataCustomer.type
      );
    } else if (forname === "FEIC") {
      this.spinner.show(sp);
      this.DownloadxlsService.FEIC(
        "FEIC-" + newName + "-" + datestring,
        idForm,
        this.user_id
      ).pipe(
        map((response) => {
          //console.log(resp);
          let dataType = response.type;
          let binaryData = [];
          binaryData.push(response);
          let downloadLink = document.createElement("a");
          downloadLink.href = window.URL.createObjectURL(
            new Blob(binaryData, { type: dataType })
          );
          if ("FEIC-" + newName + "-" + datestring) downloadLink.setAttribute("download", "FEIC-" + newName + "-" + datestring);
          document.body.appendChild(downloadLink);
          downloadLink.click();
          this.spinner.hide(sp);
        }),
        catchError((err) => {
          this.spinner.hide(sp);
          console.log(err);
          return of();
        })
      )
        .subscribe();
    } else {
      console.log(`En Download: ${forname} ${idForm}`);
    }
  }

  //-----------------------

  async ViewDocu(modal, type, dockey, relation_id) {
    this.spinner.show();
    await this.mysqlService
      .GetOneDocument({
        type: type,
        id: relation_id,
        document_key: dockey,
      })
      .toPromise()
      .then((response) => {
        this.imgsrcbase64 = null;
        this.pdfsrcbase64 = null;
        if (response.data.type === "image") {
          const urls =
            "data:image/jpg;base64;base64," + response.data.relation.DPI_key;
          this.imgsrcbase64 = this.sanitizer.bypassSecurityTrustResourceUrl(
            urls
          );
        } else if (response.data.type === "pdf") {
          const urls =
            "data:application/pdf;base64," + response.data.relation.DPI_key;
          this.pdfsrcbase64 = response.data.relation.DPI_key;
        }
        this.spinner.hide();
      })
      .catch((error) => {
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
    this.viewDocumentModal.openModal()
  }

  async getDataPersonCurrentCostumer() {
    const res = this.mysqlService
      //.getCustomerRepresentatiave(this.user_id)
      .getCustomerRepMem(this.user_id)
      .toPromise()
      .then((response) => {
        //this.initialRelation = response.data.relation[0];
        this.persons = response.data;

      })
      .catch((error) => {
        this.spinner.hide();
        this.toastr.error("Problemas con el servidor", "Oops!");
      });
    return res;
  }

  do(request) {
    this.Docs = new FormArray([]);
    this.actualRequest = request;
    this.spinner.show();
    this.mysqlService
      .GetAditionalDocument(request.id_aditional_request)
      .toPromise()
      .then((response) => {
        this.Docss = response.data;
        let savedDocs = response.data;
        if (savedDocs.length == 0) {
          this.Docs.push(
            new FormGroup({
              scr: new FormControl(""),
              doc_key: new FormControl(""),
              id: new FormControl(""),
            })
          );
        } else {
          savedDocs.map((item) => {
            this.Docs.push(
              new FormGroup({
                scr: new FormControl(""),
                doc_key: new FormControl(item.document_key),
                id: new FormControl(item.id_aditional_document),
              })
            );
          });
        }

        this.spinner.hide();
      })
      .catch((error) => {
        this.spinner.hide();
        this.toastr.error("Problemas con el servidor", "Oops!");
      });

    this.openModalSR(this.aditionalRequest);
  }

  agregarRequest() {
    if (this.Docs.length < 5) {
      this.Docs.push(
        new FormGroup({
          scr: new FormControl(""),
          doc_key: new FormControl(""),
          id: new FormControl(""),
        })
      );
    }
  }

  async showPreviewImage3(event, locationd, id_doc) {
    if (event.target.files && event.target.files[0]) {
      const named = this.filenameS.generateName() + "_" + event.target.files[0].name;
      const typed = event.target.files[0].type;
      this.spinner.show();
      var reader = new FileReader();
      //console.log('dwwwww');
      reader.onload = async (event: any) => {
        await this.mysqlService
          .UploadFileDocuments({
            customer_id: this.user_id,
            document: event.target.result,
            locationdoc: locationd,
            name: named,
            type: typed,
          })
          .toPromise()
          .then((response) => {
            //console.log('dddd');
            //this.toastr.success("todo bien", "nitido");
            this.saveAditionalDocument(
              named,
              BUCKET_NAME + '/' + response.data.Key.substring(0, response.data.Key.lastIndexOf('/') + 0),
              this.actualRequest.id_aditional_request,
              id_doc
            );
          })
          .catch((error) => {
            this.spinner.hide();
            this.toastr.error("Problemas con guardar la imagen", "Oops!");
          });
        this.spinner.hide();
      };

      await reader.readAsDataURL(event.target.files[0]);
      event.srcElement.value = null;
    }
  }

  async saveAditionalDocument(name, key, id_aditional_request, id_doc) {
    await this.mysqlService
      .AditionalRequestDoc({
        id_aditional_request: id_aditional_request,
        document_name: name,
        document_key: key,
        id_doc: id_doc,
      })
      .toPromise()
      .then((response) => {
        this.toastr.success(
          "El documento fue guradado.",
          "Documento Guardado!"
        );

        this.mysqlService
          .GetAditionalDocument(this.actualRequest.id_aditional_request)
          .toPromise()
          .then((response) => {
            this.Docss = response.data;
            let savedDocs = response.data;
            this.Docs.controls = [];
            savedDocs.map((item) => {
              this.Docs.push(
                new FormGroup({
                  scr: new FormControl(""),
                  doc_key: new FormControl(item.document_key),
                  id: new FormControl(item.id_aditional_document),
                })
              );
            });
          })
          .catch((error) => {
            console.log("error al refrescar lista de documentos");
          });
      })
      .catch((error) => {
        this.spinner.hide();
        this.toastr.error("Problemas con guardar la imagen", "Oops!");
      });
  }

  openModalAditionDoc(modal) {
    this.modalService.open(modal, {
      centered: false,
      backdrop: "static",
      keyboard: false,
      size: "lg",
    });
  }

  async ViewDocuAditional(modal, type, id_aditional_document) {
    this.spinner.show();
    await this.mysqlService
      .GetOneDocument({
        type: type,
        id: id_aditional_document,
      })
      .toPromise()
      .then((response) => {
        this.imgsrcbase64 = null;
        this.pdfsrcbase64 = null;
        if (response.data.type === "image") {
          const urls =
            "data:image/jpg;base64;base64," +
            response.data.aditional.document_name;
          this.imgsrcbase64 = this.sanitizer.bypassSecurityTrustResourceUrl(
            urls
          );
        } else if (response.data.type === "pdf") {
          const urls =
            "data:application/pdf;base64," +
            response.data.aditional.document_name;
          this.pdfsrcbase64 = response.data.aditional.document_name;
        }
        this.spinner.hide();
      })
      .catch((error) => {
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });

    this.viewDocumentModal.openModal()
  }

  async completarReq() {
    this.actualRequest.status = 3;
    await this.mysqlService
      .UpdateAditionalDocument(
        {
          status: 3,
          modification_date: new Date(),
        },
        this.actualRequest.id_aditional_request
      )
      .toPromise()
      .then((res) => {
        this.toastr.success(
          "Tus documentos seran verificados por un agente de solucredit",
          "Completado"
        );
        this.notifications.aditional_documents.count = 0
        for (let i = 0; i < this.aditional.length; i++) {
          let doc = this.aditional[i]
          if (doc.status == 0) {
            this.notifications.aditional_documents.count++
          }
        }
        this._sendemail
          .sendEmail({
            Subject:
              "[Solucredit App] - Revisión de requerimientos adicionales.",
            template_id: 12,
            customer_id: this.user_id,
          })
          .subscribe(
            (response) => {
              this.toastr.success(
                "Se notifico al agente solucredit.",
                "Enviado!"
              );
              //this.getDataCurrentCostumer();
              this.spinner.hide();
            },
            (error) => {
              this.toastr.error(
                "Verificar información del formulario.",
                "Oops!"
              );
              this.spinner.hide();
            }
          );
      })
      .catch((err) => {
        this.toastr.error("Problemas con el servidor", "Oops!");
        this.spinner.hide();
      });
  }

  async ViewDocuFidu(modal, type, dockey, relation_id) {
    this.spinner.show();
    await this.mysqlService
      .GetOneDocument({
        type: type,
        id: relation_id,
        document_key: dockey,
      })
      .toPromise()
      .then((response) => {
        this.imgsrcbase64 = null;
        this.pdfsrcbase64 = null;
        if (response.data.type === "image") {
          const urls =
            "data:image/jpg;base64;base64," + response.data.fiduciary.DPI_key;
          this.imgsrcbase64 = this.sanitizer.bypassSecurityTrustResourceUrl(
            urls
          );
        } else if (response.data.type === "pdf") {
          const urls =
            "data:application/pdf;base64," + response.data.fiduciary.DPI_key;
          this.pdfsrcbase64 = response.data.fiduciary.DPI_key;
        }
        this.spinner.hide();
      })
      .catch((error) => {
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
    this.viewDocumentModal.openModal()
  }

  EditDoc() {
    this.router.navigate([`/subir-archivos/${btoa(String(this.user_id))}`]);
  }

  getForms(idSubject) {

  }

  EditRequisitos(targetModal, aval) {
    this.currentAval = aval;
    this._requirementObservationService.list(
      this.currentAval.request_id,
      this.currentAval.rwedet_id
    ).toPromise().then(
      (response) => {

        this.requirementObservation = response;
      }).catch(
        (error) => {
          console.log(error);
          this.toastr.error('Error al obtener las observaciones', 'Oops!');
        }
      )
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: "static",
      keyboard: false,
      windowClass: "my-class2",
    });
  }

  async UploadForm(event, form: ReqFormResp, nspinner) {
    if (event.target.files && event.target.files[0]) {
      const named = event.target.files[0].name;
      const typed = event.target.files[0].type;
      this.spinner.show(nspinner);
      var reader = new FileReader();
      reader.onload = async (event: any) => {
        let data = {
          rsdet_id: form.rsdet_id,
          nameform: named,
          rsfdet_id: form.rsfdet_id,
          document: event.target.result,
          name: named,
          type: typed,
        };


        this.spinner.show(nspinner);
        this.myProfileService
          .uploadForm(data)
          .pipe(
            map((data) => {
              this.currentSubject.forms
                .find((sf) => sf.rsfdet_id == form.rsfdet_id)
                .docs.push(data.data);
              this.spinner.hide(nspinner);
              /* this.getForms(form.rsdet_id);
              let sub2 = this.myProfileService
                .getFormsInfo(this.lastrequest.request_id)
                .subscribe((x) => {
                  console.log("data forms:: ");
                  console.log(x);
                  this.formList = x;

                  sub2.unsubscribe();
                }); */
            }),
            catchError((err) => {
              this.notifier.notify(
                "error",
                "Ocurrio un problema con la conexion" + err
              );
              console.log(err);
              this.spinner.hide(nspinner);
              return of();
            })
          )
          .subscribe((data) => { });
      };
      await reader.readAsDataURL(event.target.files[0]);
      event.srcElement.value = null;
    }
  }

  addnewPerson(id: string) {
    this.modalService.dismissAll();
    // console.log('asd',this.activatedRoute.snapshot.url);
    /*if (this.activatedRoute.snapshot.url.length > 0) {
      if (
        this.activatedRoute.snapshot.url[0].path !== undefined &&
        this.activatedRoute.snapshot.url[0].path === "my-profile"
      ) {*/
    this.router.navigate([`/new-person/cliente/${this.user_id}`]);
    /*}
  } else {
    this.router.navigate([`/new-person`]);
  }*/
  }

  changeStep(stepIndex) {
    // if (this.formList.length > 0) {
    this.currentProcessStep = stepIndex;
    //}
  }

  async getStepStatus() {
    ///el primero es ver si la informacion personal esta buena

    //Lo siguiente que tenemos que hacer es ver el de ingrso de datos
    //Se puede usar el que tenemos para validad
    this.step2Done = false;
    this.step3Done = false;
    let allfilled = true
    let doc = document.getElementById('directivebuttons')
    if (this.formList.length > 0) {
      this.currentProcessStep = 1;

      this.step2Done = true;
      this.step4Done = true;

      //PARA LA PARTE DE REQUISITOS VAMOS A PREGUNTAR SI TODOS LOS FORMS TIENEN EN PROCESO, SI ES ASI QUIERE DECIR QUE ESTAN LLENOS O TAMBIEN CUANDO ESTEN EN FINALIZADO

      this.formList.forEach(dat => {
        // check if it's completed
        dat.subjects.forEach(data => {
          if (data.forms.length > 0) {
            data.forms.filter(f => f.state == 1).forEach(form => {
              if (form.check_status != 1) {
                this.step2Done = false;
              }
              if (form.docs && form.docs.length == 0) {
                this.step4Done = false;
              }
            });
            let allrequirements = true
            dat.requirements.requirements.filter(r => r.enabled == 1 && r.state == 0).forEach(req => {

              if (req.docs && req.docs.length == 0) {
                allrequirements = false;
              }
            });

            if (allrequirements && this.step2Done == false && doc) {
              this.introJsService.showSendRequirements()
            }

          }
          if (data.status == 0) {
            allfilled = false
          }
        });

        // go to step 3
        if (this.step2Done) {
          this.currentProcessStep = 2;
        }
        // check if this step is completed
        if (dat.requirements && dat.requirements.requirements.length > 0) {
          this.step3Done = true;
          dat.requirements.requirements.filter(r => r.enabled == 1 && r.state == 0).forEach(req => {
            if (req.docs && req.docs.length == 0) {
              this.step3Done = false;
            }
          });
          if (this.step3Done && doc) {
            //Manamos a llamar el introjs
            this.introJsService.showSendRequirements()
          }
        }
        // go to step 4
        if (this.step3Done) {
          this.currentProcessStep = 3;
        }
      });

    } else {
      allfilled = false
    }

    this.stepperConfiguration.forEach((item) => item.state = 'none')
    let mark2step = this.currentProcessStep > 0
    let setstep = false

    if (this.showAlertInformation) {
      //Marcamos el paso uno como un el paso actual y necesario para llenar
      this.step1Done = true
      this.stepperConfiguration[0].state = 'inprocess'
      this.currentProcessStep = 0
      setstep = true
    } else {
      //Ya esta bien
      this.stepperConfiguration[0].state = 'completed'
    }
    if (mark2step) {
      this.stepperConfiguration[1].state = 'completed'
    } else {
      if (!setstep) {
        this.stepperConfiguration[1].state = 'inprocess'
        setstep = true
        this.currentProcessStep = 1
      }
    }
    if (allfilled) {
      //Si estan llenos el paso 2 se da como completado y se pasa al paso 3
      if (!setstep) {
        setstep = true
        this.currentProcessStep = 3
        this.stepperConfiguration[3].state = 'inprocess'
      }
    }
    if (this.step2Done) {
      //Quiere decir que ya esta las cartas
      this.stepperConfiguration[2].state = 'completed'

    } else {
      if (!setstep) {
        this.stepperConfiguration[2].state = 'inprocess'
        setstep = true
        this.currentProcessStep = 2
      }
      if (allfilled) {
        this.stepperConfiguration[2].state = 'inprocess'
      }
    }


    if (this.step3Done) {
      this.stepperConfiguration[3].state = 'completed'
    } else {
      if (!setstep) {
        this.stepperConfiguration[3].state = 'inprocess'
        this.currentProcessStep = 3
      }
    }


  }
  getShowViews(arr: ShowViewInterface) {
    this.showViews = arr.show_views
    console.log('EStas son mis vistas')
    // this.selectedTabName = arr.selected_name
    // this.autoMoveTab(arr.selected_name)
    console.log(this.showViews)
  }
  disableView(view: string) {

    let find = this.showViews.find(item => item == view)
    if (find)
      return false
    return true
  }
  configurateStep() {
    //Lo primero es que tenemos que ver si la información ya esta actualizada
  }
  getObservation(requirement) {

    let find = this.requirementObservation.find(item => item.request_id == this.currentAval.request_id
      && item.sys_w_element_id == this.currentAval.sys_w_element_id
      && item.rwedet_id == this.currentAval.rwedet_id
      && item.req_requi_id == requirement.sys_w_req_element_id
    )
    if (find) {
      return find
    }
    return null
  }
  getNameAditionalDocument(doc) {
    console.log(doc)

    console.log(this.dataPersonsRepresentative)
    console.log(this.dataFiduciary)
    if (doc.customer_fiduciary_id != null) {
      let find = this.dataFiduciary.find(item => item.id_fiduciary == doc.customer_fiduciary_id)
      return 'Aval' + '-' + find.name
    } else if (doc.representative_id != null) {
      let find = this.dataPersonsRepresentative.find(item => item.person_id == doc.representative_id)
      return 'Representante' + '-' + find.name
    } else {
      return 'Cliente'
    }

  }
}
