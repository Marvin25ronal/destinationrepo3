import { OnInit, Component, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbTabChangeEvent, NgbTabset } from "@ng-bootstrap/ng-bootstrap";
import { MysqlService } from '../../services/mysql/mysql.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { SendEmailService } from "../../services/sendemail/send-email.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { map, catchError, filter } from 'rxjs/operators';
import { empty, of } from "rxjs";
import { DomSanitizer } from "@angular/platform-browser";
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthorizationService } from "../../services/authorization.service";
import { DownloadxlsService } from '../../pages/my-profile/service/downloadxls.service';
import { InspectionPlaceService } from '../../services/Maintenance/inspection-place.service'
import { DatePipe } from '@angular/common';
import { formMetadata, MyProfileReqSubjectResp, ReqSubjectResp, ReqFormResp, ReqFormDocResp, ReqRequirement, ReqRequirementDetail, ReqRequirementDoc } from '../../models/fomMetadata.model';
import { FormconfigService } from './service/formconfig.service'
import { MyprofileService } from "../my-profile/service/myprofile.service";
import { FilenameService } from "src/app/services/data/filename.service";
import { Supplier } from '../../models/supplier.model';
import { CurrencyService } from 'src/app/services/Maintenance/currency.service';
import { InspectionPlace } from "src/app/models/inspection-place.model";
import { UserService } from "../user/servicio/user.service";
import { CommercialanalysisService } from '../../services/analysis/commercialanalysis.service';
import { UploaddocumentscaService } from '../../services/analysis/uploaddocumentsca.service';
import { AnalysisType, CommercialAnalysis } from '../../models/commercialanalysis.model';
import { Analysis, BUCKET_NAME, Commercial_Manager_Authorization, country_list, Customer_Registration, Gerencial_Manager_Authorization, INPUT_TIPE_IMAGE, Tab_Authorizations, Tab_Configurations, Tab_Forms, Tab_Verifications } from 'src/Utils/constants';
import { PaginationTableData } from 'src/app/interfaces/ui/pagination-table.interface';
import { RequirementdocvwService } from '../../services/analysis/requirementdocvw.service';
import { FormdocvwService } from '../../services/analysis/formdocvw.service';
import { InitialrelationdocvwService } from '../../services/analysis/initialrelationdocvw.service';
import { VerificationdocvwService } from '../../services/analysis/verificationdocsvw.service';
import { ChecklistcommercialanalysisService } from '../../services/analysis/checklistcommercialanalysis.service';
import { CheckListCommercialAnalysis } from '../../models/checklistcommercialanalysis.model';
import { LegalAnalysisService } from "src/app/services/analysis/legal-analysis.service";
import { AdviserService } from "src/app/services/Maintenance/adviser.service";
import { AditionalRev } from "src/app/models/aditionalrev.model";
import { AditionalrevService } from "src/app/services/analysis/aditionalrev.service";
import { Adviser, AdviserAnalysis } from "src/app/models/adviser.model";
import { ComplianceVerificationService } from "src/app/services/analysis/compliance-verification.service";
import { AnalysisService } from "src/app/services/analysis/analysis.service";
import { CommercialManagerAuthorizationService } from "src/app/services/analysis/commercial-manager-authorization.service";
import { GerencialManagerAuthorizationService } from "src/app/services/analysis/gerencial-manager-authorization.service";
import { ExcelService } from "src/app/services/excel/excel.service";
import { CustomerRegistrationService } from "src/app/services/analysis/customer-registration.service";
import { ManagementActService } from 'src/app/services/analysis/management-act.service';
import { ConditionSheetService } from "src/app/services/analysis/condition-sheet.service";
import { RolService } from "../rol/services/rol.service";
import { ButtonModel, OptionsModel } from "src/app/models/Fdt.model";
import { ShowViewInterface } from "src/app/component/fdt/directive/directive.component";
import { WFActivityView } from "src/app/models/wf_document.model";
import { SyslinkService } from "src/app/services/Maintenance/syslink.service";
import { SysLink } from "src/app/models/syslink.model";
import { ValidatorFn } from "@iplab/ngx-file-upload";
import { DocumentmodalComponent } from "src/app/component/modals/documentmodal/documentmodal.component";
import { AnalysisTabComponent } from "src/app/component/analysis/analysis-tab/analysis-tab.component";
import { AllDataService } from 'src/app/services/allData/all-data.service';
import { RequirementObservationService } from "src/app/services/requirement/requirement-observation.service";
import { RequirementObservation } from "src/app/models/requirementObservation.model";

interface checkForm {
  value: boolean;
  data: {
    name: string;
    key: number;
  };
}
interface checkListForm {
  value: boolean;
  data: {
    name: string;
    key: number;
  };
}

// export enum AnalysisOption {
//   assigmentResponsable = 'Asignación de responsable',
//   report = 'Reporte',
//   form = 'Formulario'
// }
// export enum Analysis {
//   commercial_assistant_analysis = "Análisis de Asistente Comercial",
//   legal_analysis = "Análisis Legal",
//   compliance_verification = 'Verificación de Cumplimiento',
//   commercial_manager_authorization = 'Autorización Gerente Comercial',
//   gerencial_manager_authorization = 'Autorización Gerente General',
//   customer_registration = 'Alta del sistema'
// }
@Component({
  selector: "app-customer-compliance",
  templateUrl: "./customer-compliance.component.html",
  styleUrls: ["./customer-compliance.component.css"],
})

export class CustomerComplianceComponent implements OnInit {

  @ViewChild('ctdTabset') ctdTabset: NgbTabset;

  @ViewChild(AnalysisTabComponent) analysisTabs: AnalysisTabComponent

  @ViewChild(DocumentmodalComponent) viewDocumentModal: DocumentmodalComponent
  //BLOQUEAR TABS
  bloqTab1: boolean = false
  // myOptions:OptionsModel[]=[
  //   {
  //     id:1,
  //     text:'hola'
  //   }
  // ]
  country_lyst = country_list
  completeAllCurrentForms: boolean = false;
  //--COSAS PARA LA NUEVA VERSION-----
  requestAvalsInfo: MyProfileReqSubjectResp[] = [];
  currentAval: MyProfileReqSubjectResp = null;
  dataCurrency = [];
  //Analisis Comercial
  dataCommercialAnalysis = [];
  document_serie_id: number
  first_load = false
  links: SysLink[] = []
  // dataCA;
  // totalData;
  // actualCA;
  // actualCommercialA;
  // commercialA = 0;
  // analysis_type = Analysis;
  // analysis_option = AnalysisOption
  selectedTabName = ''
  //UploadDocumentsCA
  dataList: PaginationTableData = {
    metadata: [
      "Nombre",
      "Comentario",
      "Acciones"
    ],
    data: []
  }
  // editDefaultAdviser = null;
  // totalDataUDCA: number;
  selectUser;
  // dataUDCA;
  // actualcaUDCA = [];
  // dataUploadDocumentsCA = [];
  // dataAdviserType: any[]
  //Finaliza UploadDocumentsCA
  //RequisitosDoc
  DataReqDoc;
  DataReqDocs;
  dataRequestDocView = [];
  actualReqDoc = [];
  // //RequisitosDoc
  // localUrl: any[] | any;
  // onProcessCA;
  // //MandandoDescargaReq
  // dataDownReq;
  // //Descarga Requerimientos 
  // almacenaReq;
  // //DescargaFormularios
  // DataFormDoc;
  // DataFormDocs;
  // dataRequestFormView = [];
  // actualFormDoc = [];
  //Descarga Docs 
  almacenaDocs;
  //DescargaFormularios
  // DataIRDoc;
  // DataIRDocs;
  dataRequestIRView = [];
  actualIRDoc = [];
  //Descarga Docs 
  almacenaIR;
  //Verifications
  DataVerification;
  DataVerifications;
  dataVerificationView = [];
  actualVerificationsDoc = [];
  actualCheckState;
  arraymodals = [];
  dataList2: PaginationTableData = {
    metadata: [
      "Documento",
      "Verificado",
      "Observación",
      "Acciones",

    ],
    data: []
  }
  dataChecklistAnalysis: PaginationTableData = {
    metadata: [
      "Documento",
      "Verificado",
      "Observación",
      "Acciones",
    ],
    data: []
  }
  //Checklist
  checkListType;
  //CheckBox CheckList
  formCheckBox: Array<checkListForm>;
  dataDoc;
  //
  page = 1;
  pageSize = 2000;
  currentSubject: ReqSubjectResp = null;
  subjectsList: ReqSubjectResp[] = [];
  inputTipeImage = INPUT_TIPE_IMAGE
  subjectFormsCheckBoxes: FormArray;
  subjectFormsCheckBoxesData: Array<checkForm>;
  avalReqsCheckBoxes: FormArray;
  avalReqsCheckBoxesData: Array<checkForm>;
  formReqsCheckBoxes: FormArray;
  formReqsCheckBoxesData: Array<checkForm>;
  ownerFormsCheckBoxes: FormArray;
  ownerFormsCheckBoxesData: Array<checkForm>;
  //-----------
  //--------COSAS PARA LOS FORMULARIOS DE UNA SOLICITUD--------------------
  flagVisita: boolean = true;
  isAllChecked: boolean;
  formsCheckBoxes: FormArray;
  formsCheckBoxesData: Array<checkForm>;
  requirementObservation: RequirementObservation[] = []
  formsNames: string[] = [
    "Solicitud",
    "Perfil",
    "FEIC",
    "IVE Productos",
    "CPE",
    "PEP",
    "Autorización para Consultas",
    "Carta para el Banco Internacional",
    "Estado patrimonial",
    "Flujos de Fondos",
    "Endeudamiento Bancario",
    "Formato para integraciones",
    "Registro de Deudores",
  ];
  formsUrls = [
    [
      ["solicitud-individual", "Formulario de Solicitud"],
      ["perfil-individual", "Perfil de solicitante"],
      ["feic-individual", "FEIC"],
      ["ive-productos-individual", "IVE"],
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
      ["feic-empresa", "FEIC"],
      ["ive-", "IVE"],
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
  ];

  formStatusArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  formsMetadata: formMetadata[] = [];

  //----------------TERMINA COSAS PARA LOS FORMULARIOS DE UNA SOLICITUD----------------------------------
  dateNow;
  currentJustify = "fill";
  filterClient;
  dataPersons: any = [];
  optionsTypeRequest = [];
  currentOrientation = "horizontal";
  dataCustomer;
  initialRelation;
  loginitialRelation;
  documentCostumer;
  statusdocumentsCustomer;
  verificationsCustomer;
  warrantiesCustomer;
  fiduciarieswarrantiesCustomer;
  visitDetails;
  dataCurrentuser;
  dataRequest: any = [];
  CurrentCustomer;
  logdataRequest;
  lastrequest;
  user_id;
  statusRelation;
  requestIdSelected;
  usersolucredit = false;
  requestSelected = false;
  dataUpdateFiducary;
  imgsrcbase64;
  pdfsrcbase64;
  seleccionType;
  RelacionStatus = false;
  typechangerequest;
  valuechangerequest;
  userFormsListModalUsername;
  contWarranties = 0;
  contVerifications = 0;
  contforms = 0;
  contrecordcrediticio = 0;
  contguatecompras = 0;
  continfornet = 0;
  contsat = 0;
  contdeclaraguate = 0;
  contvisitainicial = 0;
  contfiduciaria = 0;
  conthipotecaria = 0;
  contprendaria = 0;
  contdeudores = 0;
  contformato = 0;
  contendeudamiento = 0;
  contflujos = 0;
  contestado = 0;
  contcarta = 0;
  contauto = 0;
  contpep = 0;
  contcpe = 0;
  contive = 0;
  contperfil = 0;
  contfeic = 0;
  contsolicitud = 0;
  verificationsSubject: any
  formsSubject: any
  nametmp = ''
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
  StatusPerfil = { status: "Pendiente", class: "label-warning", check: false };
  StatusFeic = { status: "Pendiente", class: "label-warning", check: false };
  StatusIve = { status: "Pendiente", class: "label-warning", check: false };
  StatusCpe = { status: "Pendiente", class: "label-warning", check: false };
  Statuspep = { status: "Pendiente", class: "label-warning", check: false };
  StatusAuto = { status: "Pendiente", class: "label-warning", check: false };
  StatusCarta = { status: "Pendiente", class: "label-warning", check: false };
  StatusEstado = { status: "Pendiente", class: "label-warning", check: false };
  StatusEndeudamiento = {
    status: "Pendiente",
    class: "label-warning",
    check: false,
  };
  StatusFlujos = { status: "Pendiente", class: "label-warning", check: false };
  StatusFormato = { status: "Pendiente", class: "label-warning", check: false };
  StatusDeudores = {
    status: "Pendiente",
    class: "label-warning",
    check: false,
  };
  StatusPrendaria = {
    status: "Pendiente",
    class: "label-warning",
    check: false,
  };
  StatusHipotecaria = {
    status: "Pendiente",
    class: "label-warning",
    check: false,
  };
  StatusFiduciaria = {
    status: "Pendiente",
    class: "label-warning",
    check: false,
  };
  StatusVisitasInicial = {
    status: "Pendiente",
    class: "label-warning",
    check: false,
  };
  StatusRecordCrediticio = {
    status: "Pendiente",
    class: "label-warning",
    check: false,
  };
  StatusGuatecompras = {
    status: "Pendiente",
    class: "label-warning",
    check: false,
  };
  StatusInfornet = {
    status: "Pendiente",
    class: "label-warning",
    check: false,
  };
  StatusSat = { status: "Pendiente", class: "label-warning", check: false };
  StatusDeclaraguate = {
    status: "Pendiente",
    class: "label-warning",
    check: false,
  };

  cambiarEstadoRelacion = new FormGroup({
    description: new FormControl("", [Validators.required]),
  });
  FormUpdateCompanys = new FormGroup({
    comercial_name: new FormControl("", [Validators.required]),
    relation: new FormControl("", [Validators.required]),
    sector: new FormControl("", [Validators.required]),
    nit: new FormControl("", [
      Validators.required,
      Validators.pattern("^[0-9]+(-?[0-9kK])?$"),
    ]),
    holding_name: new FormControl("", [Validators.required]),
    country: new FormControl("", [Validators.required]),
    comercial_activity: new FormControl("", [Validators.required]),
    company_type: new FormControl("", [Validators.required]),
  });
  requirementObservationForm = new FormGroup({
    comment: new FormControl("", [Validators.required]),
    title: new FormControl("", [Validators.required]),
  })
  FormCompanys = new FormGroup({
    holding: new FormControl('', [Validators.required]),
    comercial_name: new FormControl("", [Validators.required]),
    relation: new FormControl("", [Validators.required]),
    sector: new FormControl("", [Validators.required]),
    nit: new FormControl("", [
      Validators.required,
      Validators.pattern("^[0-9]+(-?[0-9kK])?$"),
    ]),
    holding_name: new FormControl("", [Validators.required]),
    country: new FormControl("", [Validators.required, this.selectNotDefault()]),
    comercial_activity: new FormControl("", [Validators.required]),
    company_type: new FormControl("", [Validators.required]),
  });
  selectNotDefault(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      //console.log('control:: '+control.value);
      if (control.value == -1 || control.value == '-1')
        return { 'no selected': true };
      else
        return null;
    }

  }

  dataInspectionPlace: InspectionPlace[];
  //Analisis 
  // pageAnalysis = [
  //   Analysis.commercial_assistant_analysis,
  //   Analysis.legal_analysis,
  //   Analysis.compliance_verification,
  //   Analysis.commercial_manager_authorization,
  //   Analysis.gerencial_manager_authorization,
  //   Analysis.customer_registration
  // ]
  // legal_analysis_docs_valid = 0
  // selectAnalysis: Analysis = null;
  // legalAnalysisDataList: PaginationTableData = {
  //   data: [],
  //   metadata: [
  //     'Nombre',
  //     'Comentario',
  //     'Acciones'
  //   ]
  // }
  // customerRegistrationDataList: PaginationTableData = {
  //   data: [],
  //   metadata: [
  //     'Nombre',
  //     'Comentario',
  //     'Acciones'
  //   ]
  // }
  // complianceVerificationDataList: PaginationTableData = {
  //   data: [],
  //   metadata: [
  //     'Documento',
  //     'Nombre',
  //     'Acciones'
  //   ]
  // }
  // complianceVerificationOnuList: PaginationTableData = {
  //   data: [],
  //   metadata: [
  //     'Listas',
  //     'Coincidencias',
  //     'Acciones'
  //   ]
  // }
  // commercialManagerAuthorizationList: PaginationTableData = {
  //   data: [],
  //   metadata: [
  //     'Documento',
  //     'Nombre',
  //     'Acciones',
  //   ]
  // }
  // gerencialManagerAuthorizationList: PaginationTableData = {
  //   data: [],
  //   metadata: [
  //     'Documento',
  //     'Nombre',
  //     'Acciones',
  //   ]
  // }

  // customer_registrationList: PaginationTableData = {
  //   data: [],
  //   metadata: [
  //     '#',
  //     'Tipo Informe',
  //     'Responsable',
  //     'Fecha de Aprobación',
  //     'Verificado',
  //     'Acciones'
  //   ]
  // }
  //MANEJADOR DE VISTAS
  // viewStack: { report: string, index: number }[] = []
  showViews: string[] = [] //en donde dice que vistas son disponibles
  TabAuthorization = Tab_Authorizations
  TabConfigurations = Tab_Configurations
  TabVerifications = Tab_Verifications
  TabForms = Tab_Forms
  //Ca
  initCommercialAnalysis = false;
  //legal analysis
  // initLegalAnalysis = false;
  // pageLeganAnalysis: number = 0
  // initLegalAnalysisForm = new FormGroup({
  //   id_adviser: new FormControl("", [Validators.required]),
  //   comment: new FormControl("", [Validators.required])
  // })
  // initCommercialAnalysisForm = new FormGroup({
  //   id_adviser: new FormControl("", [Validators.required]),
  //   comment: new FormControl("")
  // })
  // updateLegalAnalysisForm = new FormGroup({
  //   comment: new FormControl("", [Validators.required]),
  //   valid_documents: new FormControl("", [Validators.required])
  // })
  // updateComplianceVerificationForm = new FormGroup(
  //   {
  //     comment: new FormControl("", [Validators.required]),
  //     valid_documents: new FormControl("", [Validators.required])
  //   }
  // )
  // updateComercialManagerAuthorizationForm = new FormGroup({
  //   comment: new FormControl("", [Validators.required]),
  //   valid_documents: new FormControl("", [Validators.required])
  // })
  // updateGerencialManagerAuthorizationForm = new FormGroup({
  //   comment: new FormControl("", [Validators.required]),
  //   valid_documents: new FormControl("", [Validators.required])
  // })
  // updateCustomerRegistrationForm = new FormGroup({
  //   valid_documents: new FormControl("", [Validators.required]),
  //   comment: new FormControl("", [Validators.required])
  // })
  // initComplianceVerificationForm = new FormGroup(
  //   {
  //     id_adviser: new FormControl("", [Validators.required]),
  //     comment: new FormControl("", [Validators.required])
  //   }
  // )
  listlegaladviser: Adviser[] = []
  listcomplianceverificationadviser: Adviser[] = []
  responsibleLegalAnalysis: any;
  legalAnalysisSelected: CommercialAnalysis
  targetUploadDocuments: string;
  //VARIABLES VERIFICACION DE CUMPLIMIENTO
  initComplianceVerification = false;
  responsibleComplianceAnalysis: Adviser;
  compliance_verification_docs_valid: number = 0;
  complianceVerificationSelected: CommercialAnalysis;
  targetReport: any;
  onuListComplianceVerification: any[]
  selectedOnuList: any;
  //Comercial
  //CommercialAnalysisSelected: CommercialAnalysis
  listcommercialadviser: any
  responsibleCommercialAnalysis: any;
  pageCommercialAnalysis: number = 0
  pageComplianceVerification: number = 0
  //ANALISIS AUTORIZACIÓN GERENTE COMERCIAL
  pageCommercialManagerAuthorization: number = 0

  pageCustomerRegistration: number = 0
  commercialManagerAuthorizationSelected: CommercialAnalysis
  commercial_manager_authorization_dataList: PaginationTableData = {
    metadata: [
      '#',
      'Tipo de Informe',
      'Responsable',
      'Fecha de aprobación',
      'Verificado',
      'Acciones'
    ],
    data: []
  }
  // initCommercialManagerAuthorization = false;
  // //TODO: Eliminar
  // arrayCheckedReports = [
  //   {
  //     key: 'Cumplimiento',
  //     value: false
  //   },
  //   {
  //     key: 'Legal',
  //     value: false
  //   },
  //   {
  //     key: 'Comercial',
  //     value: false
  //   },
  //   {
  //     key: 'Autorización Gerente Comercial',
  //     value: false
  //   },
  //   {
  //     key: 'Autorización Gerente General',
  //     value: false
  //   }
  // ]
  // //Gerente General
  // gerencial_manager_authorization_dataList: PaginationTableData = {
  //   metadata: [
  //     '#',
  //     'Tipo de Informe',
  //     'Responsable',
  //     'Fecha de aprobación',
  //     'Verificado',
  //     'Acciones'
  //   ],
  //   data: []
  // }
  // initGerencialManagerAuthorization = false;
  // pageGerencialManagerAuthorization: number = 0;
  // commercial_manager_authorization_docs_valid = 0;
  // gerencial_manager_authorization_docs_valid = 0;
  // gerencialManagerAuthorizationSelected: CommercialAnalysis;

  //ALTA DE CLIENTE
  // previous_operation: boolean = false
  // customer_regitstration_docs_valid = 0;
  // initCustomerRegistration = false;
  // customerRegistrationSelected: CommercialAnalysis
  customer
  default_views: WFActivityView[];


  //Permisos Modales
  canList(): boolean {
    let resource = 'SUPPLIER';
    return this.autorization.havePermission(resource, 'LIST');
  }
  canCreate(): boolean {
    let resource = 'SUPPLIER';
    return this.autorization.havePermission(resource, 'CREATE');
  }


  canUpdate(): boolean {
    let resource = 'SUPPLIER';
    return this.autorization.havePermission(resource, 'UPDATE');
  }

  canDelete(): boolean {
    let resource = 'SUPPLIER';
    return this.autorization.havePermission(resource, 'DELETE');
  }
  ngOnDestroy(): void {
    if (this.modalService.hasOpenModals()) {
      this.modalService.dismissAll();
    }
  }
  //Formularios
  /*----FORMULARIO PARA EDITAR INFORMACIÓN DEL CLIENTE*/
  FormEditCustomer = new FormGroup({
    businessname: new FormControl(),
    branchoffice: new FormControl(),
    branchofficecode: new FormControl(),
    name: new FormControl(null),
    name2: new FormControl(null),
    name3: new FormControl(""),
    lastname1: new FormControl(null),
    lastname2: new FormControl(null),
    lastname3: new FormControl(""),
    phone: new FormControl(""),
    nit: new FormControl(""),
    address1: new FormControl(""),
    address2: new FormControl(""),
    zone: new FormControl(""),
    email: new FormControl(null, [Validators.email]),
    type: new FormControl("0"),
    DPI: new FormControl("", [
      Validators.pattern("^[0-9]{4}s?[0-9]{5}s?[0-9]{4}$"),
    ]),
    amount_interests: new FormControl("", [Validators.required]),
    currency: new FormControl("0", [Validators.required]),
    department: new FormControl(""),
    municipality: new FormControl(""),
    country: new FormControl(""),
    status_id: new FormControl(""),
    customer_id: new FormControl(""),
  })

  /*----FORMULARIO PARA ASISTENTE DE ANALISIS COMERCIAL*/
  FormCommercialAnalysis = new FormGroup({
    id_commercialanalysis: new FormControl(""),
    id_request: new FormControl(""),
    id_customer: new FormControl(""),
    commercialanalysis_comment: new FormControl("", [Validators.required])
  })
  /*---- FORMULARIO PARA DOCUMENTOS ANALISIS COMERCIAL ----*/
  FormUploadDocumentsCA = new FormGroup({
    uploaddocsca_comment: new FormControl("", [Validators.required]),
  });

  /*---- FORMULARIO PATRA CHECKLIST ----*/
  FormCheckListCA = new FormGroup({
    checklist_comment: new FormControl("", [Validators.required]),
  });
  /*---- FORMULARIO PATRA CHECKLIST ----*/
  FormCheckListRD = new FormGroup({
    checklist_comment: new FormControl("", [Validators.required]),
  });
  /*---- FORMULARIO PATRA CHECKLIST ----*/
  FormAditionalRev = new FormGroup({
    aditionalrev_comment: new FormControl("", [Validators.required]),
  });
  //Modales Análisis 
  /*----Modal Subida de Documentos----*/
  //Métodos CA
  // private getCommercialAnalysisResponsable() {
  //   let sub = this._CASevice.getResponsable(this.requestIdSelected).pipe(
  //     map((response) => {
  //       console.log(response)
  //       this.responsibleCommercialAnalysis = response
  //     }),
  //     catchError((err) => {
  //       this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
  //       return of();
  //     })
  //   ).subscribe(() => sub.unsubscribe())
  // }

  // getAllCommercialAnalysisInfo() {
  //   this.getDocs()

  // }
  // getInitCommercialAnalysis() {
  //   let sub = this._CASevice.getInitCommercialAnalysis(this.requestIdSelected).pipe(
  //     map((response) => {
  //       this.initCommercialAnalysis = response
  //       if (response == true) {
  //         //metodo
  //         this.getCommercialAnalysis()
  //       }
  //     }),
  //     catchError((err) => {
  //       this.toastr.error('Error', 'Ha ocurrido un problema' + err.message)
  //       return of()
  //     })
  //   ).subscribe(() => sub.unsubscribe())
  // }

  //METODOS LEGALANALYSIS
  // initLegalAnalysisMethod() {
  //   let value = this.initLegalAnalysisForm.value
  //   let reg: CommercialAnalysis = {
  //     id_request: this.requestIdSelected,
  //     id_customer: this.dataCustomer.customer_id,
  //     commercialanalysis_comment: value.comment,
  //   }
  //   console.log(value)
  //   if (this.initLegalAnalysis == false) {
  //     let sub = this._legalAnalysis.initLegalAnalysis(reg, value.id_adviser).pipe(
  //       map((response) => {
  //         this.toastr.success('Éxito', 'Se ha iniciado el análisis legal');

  //         let newadviser: AdviserAnalysis = {
  //           id_adviser: value.id_adviser,
  //           id_commercialanalysis: response.id_commercialanalysis,
  //           priority: 1
  //         }
  //         let subs = this._legalAnalysis.addAdviser(newadviser, value.id_adviser).pipe(
  //           map((resp) => {
  //             console.log(resp)
  //             this.initLegalAnalysis = true
  //             this.getAllLegalAnalysisInfo()
  //           }),
  //           catchError((err) => {
  //             this.toastr.error('error', 'Ocurrió un error');
  //             console.log(err);
  //             return of();
  //           })
  //         ).subscribe(() => subs.unsubscribe())
  //       }),
  //       catchError((err) => {
  //         //this.spinner.hide();
  //         this.toastr.error('error', 'Ocurrió un error');
  //         console.log(err);
  //         return of();
  //       })
  //     ).subscribe(() => sub.unsubscribe())
  //   } else {
  //     //asignamos de nuevo al responsable
  //     this._legalAnalysis.updateAdviser(parseInt(this.requestIdSelected), value.id_adviser, Analysis.legal_analysis, value.comment).toPromise().then(
  //       (response) => {
  //         this.toastr.success('Éxito', 'Se ha actualizado el analista de análisis legal');
  //         this.getAllLegalAnalysisInfo()
  //       })
  //       .catch((e) => {
  //         this.toastr.error('erro', 'Ocurrió un error')
  //         console.log(e)
  //       })
  //   }

  // }
  // getInitLegalAnalysis() {
  //   let sub = this._legalAnalysis.getInit(this.requestIdSelected).pipe(
  //     map((response) => {
  //       this.initLegalAnalysis = response
  //       if (response == true) {
  //         //tenemos que obtener la data necesaria para descargar el analysis legal
  //         //necesitamos saber el responsable
  //         this.getAllLegalAnalysisInfo()
  //         //
  //       }
  //     }),
  //     catchError((err) => {
  //       this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
  //       return of();
  //     })
  //   ).subscribe(() => sub.unsubscribe())
  // }
  // getAllDocumentsLegalAnalysis() {
  //   let sub = this._legalAnalysis.listLegalDocuments(this.legalAnalysisSelected.id_commercialanalysis).pipe(
  //     map((response) => {
  //       this.legalAnalysisDataList.data = response
  //     }),
  //     catchError((err) => {
  //       this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
  //       return of();
  //     })
  //   ).subscribe(() => sub.unsubscribe())
  // }
  // getAllLegalAnalysisInfo() {
  //   //Necesitamos saber el responsable
  //   //this.getLegalAnalysisResponsable()
  //   this.getLegalAnalysis()
  //   //this.getAllDocumentsLegalAnalysis()
  //   // console.log(this.legalAnalysisSelected)
  //   //this.legal_analysis_docs_valid = + this.legalAnalysisSelected.valid_documents
  // }
  // changeVerificationsDocsLegalAnalysis(event) {
  //   console.log(event)
  //   this.updateLegalAnalysisForm.controls['valid_documents'].setValue(event)

  // }
  // saveUpdateLegalAnalysisForm() {
  //   let data = this.updateLegalAnalysisForm.value
  //   let sub = this._legalAnalysis.updateAnalysis(this.legalAnalysisSelected.id_commercialanalysis, data.comment, data.valid_documents).pipe(
  //     map((response) => {
  //       this.legalAnalysisSelected = response
  //       this.toastr.success('Análisis Actualizado', 'Éxito')
  //     }),
  //     catchError((err) => {
  //       this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
  //       return of();
  //     })
  //   ).subscribe(() => sub.unsubscribe())
  //   console.log(data)
  // }

  // private getLegalAnalysis() {
  //   let sub = this._legalAnalysis.getAnalysis(this.requestIdSelected).pipe(
  //     map((response: CommercialAnalysis) => {
  //       console.log('EEE')
  //       console.log(response)
  //       this.legalAnalysisSelected = response
  //       this.legal_analysis_docs_valid = +response.valid_documents
  //       this.updateLegalAnalysisForm.controls['comment'].setValue(response.commercialanalysis_comment)
  //       this.getAllDocumentsLegalAnalysis()
  //       this.getLegalAnalysisResponsable()
  //     }),
  //     catchError((err) => {
  //       this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
  //       return of();
  //     })
  //   ).subscribe(() => sub.unsubscribe())
  // }
  // private getLegalAnalysisResponsable() {
  //   let sub = this._legalAnalysis.getResponsable(this.legalAnalysisSelected.id_commercialanalysis).pipe(
  //     map((response) => {
  //       console.log(response)
  //       this.responsibleLegalAnalysis = response
  //     }),
  //     catchError((err) => {
  //       this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
  //       return of();
  //     })
  //   ).subscribe(() => sub.unsubscribe())
  // }
  // downloadLegalAnalysisDocs() {
  //   this._legalAnalysis.downloadDocuments(this.legalAnalysisSelected.id_commercialanalysis)
  //   this.toastr.success('Éxito', 'Se han descargado los documentos')
  // }
  // openModalUploadLegalAnalysisDoc(targetModal) {
  //   this.targetUploadDocuments = 'Legal'
  //   console.log(this.targetUploadDocuments)
  //   this.FormUploadDocumentsCA.reset({});
  //   this.openModal(targetModal)

  // }
  // openModalUploadComplianceVerificationDoc(targetModal) {
  //   this.targetUploadDocuments = 'Cumplimiento'
  //   console.log(this.targetUploadDocuments)
  //   this.FormUploadDocumentsCA.reset({})
  //   this.openModal(targetModal)
  // }
  openModal(targetModal) {
    this.arraymodals.push(
      this.modalService.open(targetModal, {
        centered: true,
        backdrop: 'static',
        keyboard: false,
        size: 'xl',
        windowClass: 'my-modal',
      })
    )
  }
  // async reloadDataModalChecklist(target) {

  //   let sub;
  //   switch (target) {
  //     case 'Legal':
  //       sub = this._legalAnalysis.getCheckList(this.legalAnalysisSelected.id_commercialanalysis).toPromise().then(
  //         (response) => {
  //           this.dataChecklistAnalysis.data = response
  //         }
  //       )
  //       break
  //     case 'Cumplimiento':
  //       sub = this._complianceVerificationService.getCheckList(this.complianceVerificationSelected.id_commercialanalysis).toPromise().then(
  //         (response) => {
  //           this.dataChecklistAnalysis.data = response
  //         }
  //       )
  //       break
  //     case 'Comercial':
  //       sub = this._CASevice.getCheckList(this.dataCA.id_commercialanalysis).toPromise().then(
  //         (response) => {
  //           this.dataChecklistAnalysis.data = response
  //         }
  //       )
  //   }
  //   return sub;
  // }
  // async openChecklistModal(modal, target) {
  //   this.spinner.show()
  //   this.targetReport = target
  //   console.log(target);
  //   await this.reloadDataModalChecklist(target)
  //   this.openModal(modal)
  //   this.spinner.hide()
  // }
  // returnview() {
  //   //obtenemos los datos

  //   let last_view = this.removeLastView()
  //   if (!last_view) {
  //     switch (this.selectAnalysis) {
  //       case Analysis.legal_analysis:
  //         this.pageLeganAnalysis = 0
  //         break
  //       case Analysis.commercial_assistant_analysis:
  //         this.pageCommercialAnalysis = 0
  //         break
  //       case Analysis.compliance_verification:
  //         this.pageComplianceVerification = 0
  //         break
  //       case Analysis.commercial_manager_authorization:
  //         this.pageCommercialManagerAuthorization = 0
  //         break
  //       case Analysis.gerencial_manager_authorization:
  //         this.pageGerencialManagerAuthorization = 0
  //         break
  //       case Analysis.customer_registration:
  //         this.pageCustomerRegistration = 0
  //     }
  //   } else {
  //     if (last_view.report == 'Legal') {
  //       this.selectAnalysis = Analysis.legal_analysis
  //       this.pageLeganAnalysis = last_view.index
  //     } else if (last_view.report == 'Comercial') {
  //       this.selectAnalysis = Analysis.commercial_assistant_analysis
  //       this.pageCommercialAnalysis = last_view.index
  //     } else if (last_view.report == 'Cumplimiento') {
  //       this.selectAnalysis = Analysis.compliance_verification
  //       this.pageComplianceVerification = last_view.index
  //     } else if (last_view.report == 'Gerente Comercial') {
  //       this.selectAnalysis = Analysis.commercial_manager_authorization
  //       this.pageCommercialManagerAuthorization = last_view.index
  //     } else if (last_view.report == 'Alta Cliente') {
  //       this.selectAnalysis = Analysis.customer_registration
  //       this.pageCustomerRegistration = last_view.index
  //     } else if (last_view.report == 'Gerente General') {
  //       this.selectAnalysis = Analysis.gerencial_manager_authorization
  //       this.pageGerencialManagerAuthorization = last_view.index
  //     }
  //   }

  // }
  // openReportCustomerRegistration(target) {
  //   this.addLastView('Alta Cliente', this.pageCustomerRegistration)
  //   switch (target) {
  //     case 'Legal':
  //       this.selectAnalysis = Analysis.legal_analysis
  //       this.pageLeganAnalysis = 1
  //       break
  //     case 'Cumplimiento':
  //       this.selectAnalysis = Analysis.compliance_verification
  //       this.pageComplianceVerification = 1
  //       break
  //     case 'Comercial':
  //       this.selectAnalysis = Analysis.commercial_assistant_analysis
  //       this.pageCommercialAnalysis = 1
  //       break
  //     case 'Autorización Gerente Comercial':
  //       this.selectAnalysis = Analysis.commercial_manager_authorization
  //       this.pageCommercialManagerAuthorization = 3
  //       break
  //     case 'Autorización Gerente Gerencial':
  //       this.selectAnalysis = Analysis.gerencial_manager_authorization
  //       this.pageCommercialManagerAuthorization = 3
  //       break
  //   }
  // }
  // openReportCommercialManagerAuthorization(target) {
  //   //TODO:Eliminar
  //   this.addLastView('Gerente Comercial', this.pageCommercialManagerAuthorization)
  //   switch (target) {
  //     case 'Legal':
  //       this.selectAnalysis = Analysis.legal_analysis
  //       this.pageLeganAnalysis = 1
  //       break
  //     case 'Cumplimiento':
  //       this.selectAnalysis = Analysis.compliance_verification
  //       this.pageComplianceVerification = 1
  //       break
  //     case 'Comercial':
  //       this.selectAnalysis = Analysis.commercial_assistant_analysis
  //       this.pageCommercialAnalysis = 1
  //       break
  //   }
  // }
  // openReportGerencialManagerAuthorization(target) {
  //   this.addLastView('Gerente General', this.pageGerencialManagerAuthorization)
  //   switch (target) {
  //     case 'Legal':
  //       this.selectAnalysis = Analysis.legal_analysis
  //       this.pageLeganAnalysis = 1
  //       break
  //     case 'Cumplimiento':
  //       this.selectAnalysis = Analysis.compliance_verification
  //       this.pageComplianceVerification = 1
  //       break
  //     case 'Comercial':
  //       this.selectAnalysis = Analysis.commercial_assistant_analysis
  //       this.pageCommercialAnalysis = 1
  //       break
  //   }
  // }
  // openReport(target) {
  //   if (target == 'Legal') {
  //     //Buscamos la pagina actual del legal y le mandamos el indice
  //     this.addLastView(target, this.pageLeganAnalysis)
  //     this.pageLeganAnalysis = 1
  //     this.closeBtnClick()
  //   }
  //   else if (target == 'Cumplimiento') {
  //     this.addLastView(target, this.pageComplianceVerification)
  //     this.pageComplianceVerification = 1
  //     this.closeBtnClick()
  //   }
  //   else if (target == 'Comercial') {
  //     this.addLastView(target, this.pageCommercialAnalysis)
  //     console.log('Cambio de Pagina Comercial');
  //     this.pageCommercialAnalysis = 1
  //     this.closeBtnClick()
  //   }
  //   else if (target == 'Gerente Comercial') {
  //     this.addLastView(target, this.pageCommercialManagerAuthorization)
  //     this.pageCommercialManagerAuthorization = 2;
  //   }
  //   else if (target == 'Gerente General') {
  //     this.addLastView(target, this.pageGerencialManagerAuthorization)
  //     console.log('Cambio de Pagina Comercial');
  //     this.pageGerencialManagerAuthorization = 2
  //     this.closeBtnClick()
  //   }
  //   else if (target == 'Alta Cliente') {
  //     this.addLastView(target, this.pageCustomerRegistration)
  //     this.pageCustomerRegistration = 2;
  //   }
  // }
  // viewConditionSheetCustomerRegistration() {
  //   this.addLastView('Alta Cliente', this.pageCustomerRegistration)
  //   //no se hace nada
  // }
  // addLastView(name: string, page: number) {
  //   this.viewStack.push(
  //     {
  //       index: page,
  //       report: name
  //     }
  //   )
  // }

  // removeLastView() {
  //   return this.viewStack.pop()
  // }
  ////////////////////////////TERMINA LEGAL ANALYSIS
  // openModalSendMail(targetModal) {
  //   console.log('Abriendo Modal Revision Adicional');
  //   this.FormAditionalRev.reset({});
  //   this.openModal(targetModal)
  // }

  // openModalUploadDocCheck(targetModal, ver) {
  //   console.log('Modal Checklist');
  //   this.FormCheckListRD.reset({});
  //   this.dataDoc = ver;
  //   this.targetUploadDocuments = 'Comercial'

  //   this.openModal(targetModal)
  // }

  ///////////////////////////////////////////////////////////METODOS COMPLIANCEVERIFICATION
  // getInitComplianceVerification() {
  //   let sub = this._complianceVerificationService.getInit(this.requestIdSelected).pipe(
  //     map((response) => {
  //       this.initComplianceVerification = response
  //       if (response == true) {
  //         this.getAllComplianceVerificationInfo()
  //       }
  //     }),
  //     catchError((err) => {
  //       this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
  //       return of();
  //     })
  //   ).subscribe(() => sub.unsubscribe())
  // }
  // initComplianceVerificationMethod() {
  //   let value = this.initComplianceVerificationForm.value
  //   let reg: CommercialAnalysis = {
  //     id_request: this.requestIdSelected,
  //     id_customer: this.dataCustomer.customer_id,
  //     commercialanalysis_comment: value.comment
  //   }
  //   if (this.initComplianceVerification == false) {
  //     let sub = this._complianceVerificationService.initAnalysis(reg, value.id_adviser).pipe(
  //       map((response) => {
  //         this.toastr.success('Éxito', 'Se ha iniciado la Verificación de Cumplimiento legal');
  //         let newadviser: AdviserAnalysis = {
  //           id_adviser: value.id_adviser,
  //           id_commercialanalysis: response.id_commercialanalysis,
  //           priority: 1
  //         }
  //         let subs = this._legalAnalysis.addAdviser(newadviser, value.id_adviser).pipe(
  //           map((resp) => {
  //             console.log(resp)
  //             this.initComplianceVerification = true
  //             this.getAllComplianceVerificationInfo()

  //           }),
  //           catchError((err) => {
  //             this.toastr.error('error', 'Ocurrió un error');
  //             console.log(err);
  //             return of();
  //           })
  //         ).subscribe(() => subs.unsubscribe())
  //       }
  //       ),
  //       catchError((err) => {
  //         //this.spinner.hide();
  //         this.toastr.error('error', 'Ocurrió un error');
  //         console.log(err);
  //         return of();
  //       })
  //     ).subscribe(() => sub.unsubscribe())
  //   } else {
  //     //Reasignamos responsable
  //     this._legalAnalysis.updateAdviser(parseInt(this.requestIdSelected), value.id_adviser, Analysis.compliance_verification, value.comment)
  //       .toPromise()
  //       .then((response) => {
  //         this.toastr.success('Éxito', 'Se ha actualizado el analista de análisis cumplimiento');
  //         this.getAllComplianceVerificationInfo()
  //       })
  //   }

  // }
  // getAllComplianceVerificationInfo() {

  //   this.getComplianceVerification()
  //   this.getOnuListComplianceVerification()
  // }
  // private getComplianceVerificationResponsable() {
  //   let sub = this._complianceVerificationService.getResponsable(this.requestIdSelected).pipe(
  //     map((response) => {
  //       console.log(response)
  //       this.responsibleComplianceAnalysis = response
  //     }),
  //     catchError((err) => {
  //       this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
  //       return of();
  //     })
  //   ).subscribe(() => sub.unsubscribe())
  // }
  // private getComplianceVerification() {
  //   let sub = this._complianceVerificationService.getAnalysis(this.requestIdSelected).pipe(
  //     map((response: CommercialAnalysis) => {
  //       console.log('EEE')
  //       console.log(response)
  //       this.complianceVerificationSelected = response
  //       this.compliance_verification_docs_valid = +response.valid_documents
  //       this.updateComplianceVerificationForm.controls['comment'].setValue(response.commercialanalysis_comment)
  //       this.getAllDocumentsComplianceVerification()
  //       this.getComplianceVerificationResponsable()
  //     }),
  //     catchError((err) => {
  //       this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
  //       return of();
  //     })
  //   ).subscribe(() => sub.unsubscribe())
  // }
  // getOnuListComplianceVerification() {
  //   let sub = this.mysqlService.GetONUMatch().pipe(
  //     map((response) => {
  //       this.complianceVerificationOnuList.data = response.data
  //       this.complianceVerificationOnuList.data.filter(item => item.customer.customer_id == this.dataCustomer.customer_id)
  //       console.log('ONU')
  //       console.log(response.data)
  //     }),
  //     catchError((err) => {
  //       this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
  //       return of();
  //     })
  //   ).subscribe(() => sub.unsubscribe())
  //   let sub2 = this.mysqlService.GetONUList().pipe(
  //     map((response) => {
  //       console.log('ONULIST')
  //       console.log(response)
  //       this.onuListComplianceVerification = response.data
  //     }),
  //     catchError((err) => {
  //       this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
  //       return of();
  //     })
  //   ).subscribe(() => sub2.unsubscribe())
  // }
  // getONUListCumplianceVerification() {
  //   //objeto { key:'',values:[]}
  //   let newarray = []
  //   for (let i = 0; i < this.complianceVerificationOnuList.data.length; i++) {
  //     let key = this.complianceVerificationOnuList.data[i].onu.id_reference
  //     let name = this.getNameOnuLIST(this.complianceVerificationOnuList.data[i].onu.id_reference)
  //     let element = newarray.find(item => item.key == key)
  //     if (element) {
  //       element.values.push(this.complianceVerificationOnuList.data[i])
  //     } else {
  //       newarray.push({
  //         key: key,
  //         values: [this.complianceVerificationOnuList.data[i]],
  //         name
  //       })
  //     }
  //   }
  //   return newarray
  // }
  // getNameOnuLIST(id) {
  //   if (id) {
  //     let onu = this.onuListComplianceVerification.find(item => item.id == id);
  //     return onu ? onu.file_name : ''
  //   }
  //   return ''
  // }
  // openOnuListDetail(target, list) {
  //   this.selectedOnuList = list.values
  //   this.openModal(target)
  // }
  // saveUpdateComplianceVerificationForm() {
  //   let data = this.updateComplianceVerificationForm.value
  //   let sub = this._complianceVerificationService.updateAnalysis(this.complianceVerificationSelected.id_commercialanalysis, data.comment, data.valid_documents).pipe(
  //     map((response) => {
  //       this.complianceVerificationSelected = response
  //       this.toastr.success('Análisis Actualizado', 'Éxito')
  //     }),
  //     catchError((err) => {
  //       this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
  //       return of();
  //     })
  //   ).subscribe(() => sub.unsubscribe())
  //   console.log(data)
  // }
  // getAllDocumentsComplianceVerification() {
  //   let sub = this._complianceVerificationService.listComplianceDocuments(this.complianceVerificationSelected.id_commercialanalysis).pipe(
  //     map((response) => {
  //       this.complianceVerificationDataList.data = response
  //     }),
  //     catchError((err) => {
  //       this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
  //       return of();
  //     })
  //   ).subscribe(() => sub.unsubscribe())
  // }
  // //TERMINA CUMPLIMIENTO
  // //INICIA METODOS DE AUTORIZACION GERENTE COMERCIAL
  // changePageCommercialManager(id: number) {
  //   this.pageCommercialManagerAuthorization = id
  //   console.log('Cambiando PAGINA COMERCIAL');
  // }
  // getInitCommercialManagerAuthorization() {
  //   // debugger
  //   this._commercialManagerAuthorization.getInit(this.requestIdSelected).pipe(
  //     map((response) => {
  //       this.initCommercialManagerAuthorization = response
  //       if (response == true) {
  //         this.getAllCommercialManagerAuthorizationInfo()
  //       }
  //     }),
  //     catchError((err) => {
  //       this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
  //       return of();
  //     })

  //   ).subscribe()
  // }
  // async getAllCommercialManagerAuthorizationInfo() {
  //   await this.listAllReports()
  //   console.log('Esto se está ejecutando');
  //   await this.getCommercialManagerAuthorization()
  // }
  // async getCommercialManagerAuthorization() {
  //   const res = this._commercialManagerAuthorization.getAnalysis(this.requestIdSelected).toPromise().then(
  //     (response) => {
  //       console.log(response);
  //       //debugger
  //       //debugger
  //       this.commercialManagerAuthorizationSelected = response
  //       this.commercial_manager_authorization_docs_valid = +response.valid_documents
  //       this.updateComercialManagerAuthorizationForm.controls['comment'].setValue(response.commercialanalysis_comment)
  //       this.getAllDocumentsComercialManagerAuthorization()
  //     }
  //   )
  //   return res
  // }

  // async listAllReports() {
  //   //TODO: eliminar
  //   const res = this._commercialManagerAuthorization.listReporst(this.requestIdSelected).toPromise().then(
  //     async (response) => {
  //       console.log('REPORTS')
  //       console.log(response)
  //       this.commercial_manager_authorization_dataList.data = response
  //       for (let i = 0; i < response.length; i++) {
  //         let document = response[i]
  //         if (document.uploaddocsca_comment == Commercial_Manager_Authorization) {
  //           //Es el gerente comercial
  //           //Para este tengo que obtener el gerente comercial
  //           this._RolServise.getCommercialManager().toPromise().then(
  //             (response) => {
  //               if (response.length > 0) {

  //                 let responsable = new Adviser(0, '', '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 0)
  //                 responsable.firstname = response[0].firstname
  //                 responsable.lastname = response[0].lastname
  //                 this.commercial_manager_authorization_dataList.data[i].responsable = responsable
  //               } else {
  //                 let responsable = new Adviser(0, '', '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 0)
  //                 responsable.firstname = 'Sin Asignar'
  //                 responsable.lastname = ''
  //                 this.commercial_manager_authorization_dataList.data[i].responsable = responsable
  //               }
  //             }
  //           )
  //         } else if (document.uploaddocsca_comment == Gerencial_Manager_Authorization) {
  //           //El es gerente general
  //           //Para este tenemos que obtener el gerente general
  //           await this._RolServise.getGerencialManager().toPromise().then(
  //             (response) => {
  //               if (response.length > 0) {
  //                 let responsable = new Adviser(0, '', '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 0)
  //                 responsable.firstname = response[0].firstname
  //                 responsable.lastname = response[0].lastname
  //                 this.gerencial_manager_authorization_dataList.data[i].responsable = responsable
  //               } else {
  //                 let responsable = new Adviser(0, '', '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 0)
  //                 responsable.firstname = 'Sin Asignar'
  //                 responsable.lastname = ''
  //                 this.gerencial_manager_authorization_dataList.data[i].responsable = responsable
  //               }
  //             }
  //           )
  //         }
  //         else {
  //           await this._legalAnalysis.getResponsable(response[i].id_commercialanalisys).toPromise().then(
  //             (responsable) => {
  //               console.log('RESPONSABLE')
  //               console.log(responsable)
  //               this.commercial_manager_authorization_dataList.data[i].responsable = responsable
  //             }
  //           )
  //         }
  //       }
  //       //Un for extra para verificar cada uno de ellos y agregarlo como campo nuevo
  //     }
  //   )
  //   return res
  // }
  // filterShowDocumentsCommercialManagerAuthorization() {
  //   //TODO: Eliminar
  //   let array2 = ['Autorización Gerente Comercial', 'Autorización Gerente General']
  //   let filter = this.commercial_manager_authorization_dataList.data.filter((item) => !array2.includes(item.uploaddocsca_comment.toString()))
  //   return filter
  // }

  // getValueChecklist(name: string) {
  //   //TODO: eliminar
  //   let find = this.arrayCheckedReports.find(item => item.key == name)
  //   if (find)
  //     return find.value
  // }
  // downloadAllReports() {
  //   try {
  //     this._commercialManagerAuthorization.getAllReports(this.requestIdSelected)
  //     this.toastr.success('Se han descargado todos los informes', 'Éxito')
  //   }
  //   catch (error) {
  //     console.log(error);
  //   }
  // }
  // changeVerificationsDocsCommercialManagerAuthorization(event) {
  //   console.log(event)
  //   this.updateComercialManagerAuthorizationForm.controls['valid_documents'].setValue(event)
  // }
  // saveVerificationsDocsCommercialManagerAuthorizationForm() {
  //   let data = this.updateComercialManagerAuthorizationForm.value
  //   if (this.initGerencialManagerAuthorization == true) {
  //     //Existe una no tenemos que crearla
  //     let sub = this._commercialManagerAuthorization.updateAnalysis(this.commercialManagerAuthorizationSelected.id_commercialanalysis, data.comment, data.valid_documents).pipe(
  //       map((response) => {
  //         this.commercialManagerAuthorizationSelected = response
  //         this.toastr.success('Análisis Actualizado', 'Éxito')
  //       }),
  //       catchError((err) => {
  //         this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
  //         return of();
  //       })
  //     ).subscribe(() => sub.unsubscribe())
  //   } else {
  //     //Creamos una nueva
  //     let reg: CommercialAnalysis = {
  //       id_request: this.requestIdSelected,
  //       id_customer: this.dataCustomer.customer_id,
  //       commercialanalysis_comment: data.comment,
  //       valid_documents: data.valid_documents
  //     }
  //     let sub = this._commercialManagerAuthorization.initAnalysis(reg).pipe(
  //       map((resp) => {
  //         this.toastr.success('Éxito', 'Se ha iniciado una nueva Autorización Gerencia Comercial')
  //         this.initCommercialManagerAuthorization = true
  //         this.getAllCommercialManagerAuthorizationInfo()
  //         //Crear acta
  //         let s = this._managementActService.init(resp.id_commercialanalysis, this.dataCustomer.customer_id).toPromise().then(
  //           async (response) => {
  //             console.log('Se ha creado el Acta');
  //             console.log(response);
  //           }
  //         )
  //       }),
  //       catchError((err) => {
  //         this.toastr.error('error', 'Ocurrió un error');
  //         console.log(err);
  //         return of();
  //       })
  //     ).subscribe(() => sub.unsubscribe())
  //   }
  // }
  // getAllDocumentsComercialManagerAuthorization() {
  //   let sub = this._commercialManagerAuthorization.listDocuments(this.commercialManagerAuthorizationSelected.id_commercialanalysis).pipe(
  //     map((response) => {
  //       this.commercialManagerAuthorizationList.data = response
  //     }),
  //     catchError((err) => {
  //       this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
  //       return of();
  //     })
  //   ).subscribe(() => sub.unsubscribe())
  // }
  // openModalUploadlCommercialManagerAuthorization(targetModal) {
  //   this.targetUploadDocuments = 'Gerente Comercial'
  //   console.log(this.targetUploadDocuments)
  //   this.FormUploadDocumentsCA.reset({});
  //   this.openModal(targetModal)
  // }
  // closeConditionSheet(value: number) {
  //   this.pageCommercialManagerAuthorization = value
  // }
  // showConditionSheet() {
  //   this.addLastView('Alta Cliente', this.pageCustomerRegistration)
  //   this.selectAnalysis = Analysis.commercial_manager_authorization
  //   this.pageCommercialManagerAuthorization = 2
  // }

  downloadConditionSheet() {
    this.toastr.success('Éxito', 'Se han descargado los documentos')
    this._excelService.downloadExcel(this.commercialManagerAuthorizationSelected.id_commercialanalysis)
  }
  //TERMINA AUTORIZACION GERENTE COMERCIAL
  //INICIA AUTORIZACION GERENCIAL
  // changePageGerencialManager(id: number) {
  //   this.pageGerencialManagerAuthorization = id
  //   console.log('Cambiando PAGINA GERENCIAL');
  // }
  // closeGerencialManagement1(value: number) {
  //   console.log('Cierre de General');
  //   this.pageGerencialManagerAuthorization = value
  // }
  // getInitGerencialManagerAuthorization() {

  //   this._gerencialManagerAuthorization.getInit(this.requestIdSelected).pipe(
  //     map((response) => {
  //       this.initGerencialManagerAuthorization = response
  //       console.log(response);
  //       if (response == true) {
  //         this.getAllGerencialManagerAuthorizationInfo()
  //       }
  //     }),
  //     catchError((err) => {
  //       this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
  //       return of();
  //     })
  //   ).subscribe()
  // }

  // async getAllGerencialManagerAuthorizationInfo() {
  //   await this.listAllGReports()
  //   console.log('MANDANDO DATOS DE DOCUMENTOS GENERAL');
  //   await this.getAllGerencialManagerAuthorization()
  // }

  // async getAllGerencialManagerAuthorization() {
  //   const res = this._gerencialManagerAuthorization.getAnalysis(this.requestIdSelected).toPromise().then(
  //     (response) => {
  //       console.log(response);
  //       this.gerencialManagerAuthorizationSelected = response;
  //       this.gerencial_manager_authorization_docs_valid = +response.valid_documents;
  //       this.updateGerencialManagerAuthorizationForm.controls['comment'].setValue(response.commercialanalysis_comment)
  //       this.getAllDocumentsGerencialManagerAuthorization()
  //       console.log('MANDANDO INFORMACIÓN');
  //       console.log(this.gerencialManagerAuthorizationSelected);
  //     }
  //   )
  //   return res
  // }

  // async listAllGReports() {
  //   console.log('Listando Reportes Gerencial');
  //   const res = this._gerencialManagerAuthorization.listReporst(
  //     this.requestIdSelected).toPromise().then(
  //       async (response) => {
  //         console.log('Reportes Gerenciales');
  //         console.log(response);
  //         this.gerencial_manager_authorization_dataList.data = response;
  //         for (let i = 0; i < response.length; i++) {
  //           let document = response[i]
  //           if (document.uploaddocsca_comment == Commercial_Manager_Authorization) {
  //             //Es el gerente comercial
  //             //Para este tengo que obtener el gerente comercial
  //             this._RolServise.getCommercialManager().toPromise().then(
  //               (response) => {
  //                 if (response.length > 0) {

  //                   let responsable = new Adviser(0, '', '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 0)
  //                   responsable.firstname = response[0].firstname
  //                   responsable.lastname = response[0].lastname
  //                   this.gerencial_manager_authorization_dataList.data[i].responsable = responsable
  //                 } else {
  //                   let responsable = new Adviser(0, '', '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 0)
  //                   responsable.firstname = 'Sin Asignar'
  //                   responsable.lastname = ''
  //                   this.gerencial_manager_authorization_dataList.data[i].responsable = responsable
  //                 }
  //               }
  //             )
  //           } else if (document.uploaddocsca_comment == Gerencial_Manager_Authorization) {
  //             //El es gerente general
  //             //Para este tenemos que obtener el gerente general
  //             this._RolServise.getGerencialManager().toPromise().then(
  //               (response) => {
  //                 if (response.length > 0) {
  //                   let responsable = new Adviser(0, '', '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 0)
  //                   responsable.firstname = response[0].firstname
  //                   responsable.lastname = response[0].lastname
  //                   this.gerencial_manager_authorization_dataList.data[i].responsable = responsable
  //                 } else {
  //                   let responsable = new Adviser(0, '', '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 0)
  //                   responsable.firstname = 'Sin Asignar'
  //                   responsable.lastname = ''
  //                   this.gerencial_manager_authorization_dataList.data[i].responsable = responsable
  //                 }
  //               }
  //             )
  //           }
  //           else {
  //             await this._legalAnalysis.getResponsable(response[i].id_commercialanalisys)
  //               .toPromise()
  //               .then((responsable) => {
  //                 console.log('RESPONSABLE GERENCIAL');
  //                 console.log(responsable);
  //                 this.gerencial_manager_authorization_dataList.data[i].responsable = responsable;
  //               })
  //           }
  //         }
  //       }
  //     )
  //   return res;
  // }

  // getValueChecklistGerencial(name: string) {
  //   let find = this.arrayCheckedReports.find(item => item.key == name)
  //   if (find)
  //     return find.value
  // }

  downloadAllGReports() {
    try {
      this._gerencialManagerAuthorization.getAllReports(this.requestIdSelected)
      this.toastr.success('Se han descargado todos los informes', 'Éxito')
    }
    catch (error) {
      console.log(error);
    }
  }

  // changeVerificationsDocsGerencialMagerAuthorization(event) {
  //   console.log(event);
  //   this.updateGerencialManagerAuthorizationForm.controls['valid_documents'].setValue(event)
  // }

  // saveVerificationsDocsGerencialManagerAuthorizationForm() {

  //   console.log(this.initGerencialManagerAuthorization);
  //   let data = this.updateGerencialManagerAuthorizationForm.value
  //   if (this.initGerencialManagerAuthorization == true) {
  //     //Existe una no tenemos que crearla
  //     let sub = this._gerencialManagerAuthorization.updateAnalysis(this.gerencialManagerAuthorizationSelected.id_commercialanalysis, data.comment, data.valid_documents).pipe(
  //       map((response) => {
  //         this.commercialManagerAuthorizationSelected = response
  //         this.toastr.success('Análisis Actualizado', 'Éxito')
  //       }),
  //       catchError((err) => {
  //         this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
  //         return of();
  //       })
  //     ).subscribe(() => sub.unsubscribe())
  //   } else {
  //     //Creamos una nueva
  //     let reg: CommercialAnalysis = {
  //       id_request: this.requestIdSelected,
  //       id_customer: this.dataCustomer.customer_id,
  //       commercialanalysis_comment: data.comment,
  //       valid_documents: data.valid_documents
  //     }
  //     let sub = this._gerencialManagerAuthorization.initAnalysis(reg).pipe(
  //       map((resp) => {
  //         this.toastr.success('Éxito', 'Se ha iniciado una nueva Autorización Gerencia Gerencial')
  //         this.initGerencialManagerAuthorization = true
  //         this.getAllCommercialManagerAuthorizationInfo()
  //       }),
  //       catchError((err) => {
  //         this.toastr.error('error', 'Ocurrió un error');
  //         console.log(err);
  //         return of();
  //       })
  //     ).subscribe(() => sub.unsubscribe())
  //   }
  // }

  // getAllDocumentsGerencialManagerAuthorization() {

  //   let sub = this._gerencialManagerAuthorization.listDocuments(this.gerencialManagerAuthorizationSelected.id_commercialanalysis).pipe(
  //     map((response) => {
  //       this.gerencialManagerAuthorizationList.data = response
  //       console.log('Mandando Datos de Documentos Gerenciales');
  //       console.log(response);
  //     }),
  //     catchError((err) => {
  //       console.log(err);
  //       this.toastr.error('Error', 'Ha ocurrido un Problema');
  //       return of()
  //     })
  //   ).subscribe(() => sub.unsubscribe())
  // }

  // openModalUploadlGeneralManagerAuthorization(targetModal) {
  //   this.targetUploadDocuments = 'Gerente General'
  //   console.log(this.targetUploadDocuments)
  //   this.FormUploadDocumentsCA.reset({});
  //   this.openModal(targetModal)
  // }
  // //TERMINA AUTORIZACION GERENCIAL

  // //INICIA ALTA DE CLIENTE
  // changePageCustomerRegistration(id: number) {
  //   this.pageCustomerRegistration = id
  //   console.log('Cambiando');
  // }
  // getInitCustomerRegistration() {
  //   this._customerRegistrationService.getInit(this.requestIdSelected).pipe(
  //     map((response) => {
  //       this.initCustomerRegistration = response
  //       if (response == true) {
  //         this.getAllCustomerRegistrationInfo()
  //       }
  //     }),
  //     catchError((err) => {
  //       this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
  //       return of();
  //     })
  //   ).subscribe()
  // }
  // async getAllCustomerRegistrationInfo() {
  //   await this.getCustomerRegistration()

  // }
  // async getCustomerRegistration() {
  //   const res = this._customerRegistrationService.getAnalysis(this.requestIdSelected).toPromise().then(
  //     (response) => {
  //       console.log('sssss')
  //       console.log(response)
  //       this.customerRegistrationSelected = response
  //       this.customer_regitstration_docs_valid = +response.valid_documents
  //       this.updateCustomerRegistrationForm.controls['comment'].setValue(response.commercialanalysis_comment)
  //       this.getAllDocumentsCustomerRegistration()
  //     }
  //   )
  //   return res
  // }
  // saveCustomerRegistration() {
  //   let data = this.updateCustomerRegistrationForm.value
  //   if (this.initCustomerRegistration == true) {
  //     //Existe una no tenemos que crearla
  //     let sub = this._customerRegistrationService.updateAnalysis(this.customerRegistrationSelected.id_commercialanalysis, data.comment, data.valid_documents).pipe(
  //       map((response) => {
  //         this.customerRegistrationSelected = response
  //         this.toastr.success('Análisis Actualizado', 'Éxito')
  //       }),
  //       catchError((err) => {
  //         this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
  //         return of();
  //       })
  //     ).subscribe(() => sub.unsubscribe())
  //   } else {
  //     let reg: CommercialAnalysis = {
  //       id_request: this.requestIdSelected,
  //       id_customer: this.dataCustomer.customer_id,
  //       commercialanalysis_comment: data.comment,
  //       valid_documents: data.valid_documents
  //     }
  //     let sub = this._customerRegistrationService.initAnalyis(reg).pipe(
  //       map((resp) => {
  //         this.toastr.success('Éxito', 'Se ha iniciado una nueva Alta de cliente')
  //         this.initCustomerRegistration = true
  //         this.getAllCustomerRegistrationInfo()
  //       }),
  //       catchError((err) => {
  //         this.toastr.error('error', 'Ocurrió un error');
  //         console.log(err);
  //         return of();
  //       })
  //     ).subscribe(() => sub.unsubscribe())
  //   }
  // }
  // openModalUploadCustomerRegistration(targetModal) {
  //   this.targetUploadDocuments = 'Alta Cliente'
  //   this.FormUploadDocumentsCA.reset({})
  //   this.openModal(targetModal)
  // }
  // getAllDocumentsCustomerRegistration() {
  //   let sub = this._customerRegistrationService.listDocuments(this.customerRegistrationSelected.id_commercialanalysis).pipe(
  //     map((response) => {
  //       this.customerRegistrationDataList.data = response
  //     }),
  //     catchError((err) => {
  //       this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
  //       return of();
  //     })
  //   ).subscribe(() => sub.unsubscribe())
  // }
  // showCommercialManagerAuthorization() {
  //   //tenemos que mostrar la tab anterior
  //   //Cambiamos el analysis
  //   this.addLastView('Alta Cliente', this.pageCommercialManagerAuthorization)
  //   this.selectAnalysis = Analysis.commercial_manager_authorization
  //   this.pageCommercialManagerAuthorization = 2
  // }
  // showGerencialManagerAuthorization() {
  //   this.selectAnalysis = Analysis.gerencial_manager_authorization
  //   this.pageGerencialManagerAuthorization = 2
  // }
  //TERMINA ALTA DE CLIENTE

  openModalUploadDoc(targetModal) {
    console.log('Abriendo Modal Carga de Documentos');
    this.FormUploadDocumentsCA.reset({});
    this.targetUploadDocuments = 'Comercial'
    this.openModal(targetModal)
  }
  /*----Modal Revisión Detallada----*/
  openModalRevisionDetallada(targetModal) {
    console.log('Abriendo Modal Revisión Detallada');
    this.openModal(targetModal)
  }
  /*----Modal Revisión Adicional----*/
  openModalRevisionAdicional(targetModal) {
    console.log('Abriendo Modal Revisión Adicional');
    this.openModal(targetModal)
  }
  //Modal 1
  openModalC1(targetModal, data) {
    console.log('Mandando informacion de Customer');
    console.log(this.dataCustomer);
    this.FormEditCustomer.patchValue(
      {
        businessname: this.dataCustomer.businessname,
        name: this.dataCustomer.name,
        name2: this.dataCustomer.name2,
        name3: this.dataCustomer.name3,
        lastname1: this.dataCustomer.lastname1,
        lastname2: this.dataCustomer.lastname2,
        lastname3: this.dataCustomer.lastname3,
        email: this.dataCustomer.email,
        type: this.dataCustomer.type,
        currency: this.dataCustomer.currency,
        amount_interests: this.dataCustomer.amount_interests,
        DPI: this.dataCustomer.DPI,
        phone: this.dataCustomer.phone,
        nit: this.dataCustomer.nit,
        address1: this.dataCustomer.address1,
        address2: this.dataCustomer.address2,
        zone: this.dataCustomer.zone,
        country: this.dataCustomer.country,
        department: this.dataCustomer.department,
        municipality: this.dataCustomer.municipality,
        branchoffice: this.dataCustomer.branchoffice,
        branchofficecode: this.dataCustomer.branchofficecode,
        status_id: this.dataCustomer.status_id,
        customer_id: this.dataCustomer.customer_id
      }
    );
    console.log(this.FormEditCustomer);
    console.log('Abriendo Modal C1');
    this.openModal(targetModal)


  }
  //Modal 1
  openModalC2(targetModal, supplier: Supplier) {
    console.log('Abriendo Modal C2');
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      size: 'lg',
      windowClass: 'my-modal',
    });
  }
  //Modal 1
  openModalC3(targetModal, supplier: Supplier) {
    console.log('Abriendo Modal C3');
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      size: 'lg',
      windowClass: 'my-modal',
    });
  }
  //Modal 1
  openModalC4(targetModal, supplier: Supplier) {
    console.log('Abriendo Modal C4');
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      size: 'lg',
      windowClass: 'my-modal',
    });
  }

  formfiduciary = new FormGroup({
    type: new FormControl("0", [Validators.required]),
    name1: new FormControl(null, [Validators.required]),
    name2: new FormControl(null),
    name3: new FormControl(""),
    lastname1: new FormControl(null, [Validators.required]),
    lastname2: new FormControl(null, [Validators.required]),
    lastname3: new FormControl(""),
    businessname: new FormControl(null, [Validators.required]),
  });

  formrelacion = new FormGroup({
    date_of_visit: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required]),
    message: new FormControl("", [Validators.required]),
    description: new FormControl("", []),
  });

  formwarranties = new FormGroup({
    type: new FormControl("0", [Validators.required]),
    typecustomer: new FormControl("0", [Validators.required]),
  });

  Formvisitainicial = new FormGroup({
    date_of_visit: new FormControl("", [Validators.required]),
    business_address: new FormControl("", [Validators.required]),
    background: new FormControl("", [Validators.required]),
    participants: new FormArray([
      new FormGroup({
        name: new FormControl("", [Validators.required]),
        position: new FormControl("", [Validators.required]),
      }),
    ]),
    typeubicacion: new FormControl(),
  });

  createRequest = new FormGroup({
    inputTipoSolicitud: new FormControl("", [Validators.required]),
  });

  participants = this.Formvisitainicial.get("participants") as FormArray;
  flagDeVisita: boolean = false;

  closeEditDataMod(mod) {
    console.log('CloseEditDataMod::');
    mod.dismiss('cerrar');
  }
  DeleteReqDoc(req: ReqRequirementDetail, doc: ReqRequirementDoc) {
    this._service.DeleteReqDoc(doc).toPromise()
      .then(async (response) => {
        console.log('reqqqq::');
        console.log(req.docs);
        this.toastr.success("Se elimino el archivo.", "Archivo Eliminado!");
        req.docs = req.docs.filter(d => d.req_requi_doc != doc.req_requi_doc);
        console.log('---------------------');
        console.log(req.docs);

      })
      .catch((error) => {
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }

  DownloadReqDoc(doc: ReqRequirementDoc): void {
    this._service.DownloadReqDoc(doc);
  }
  /* goToEditForm() {
    console.log("this.dataCustomer");
    console.log(this.dataCustomer);
    let data = {
      request_id: this.lastrequest.request_id,
      form_id: this.currentSubject.form_id,
      metadata: this.currentSubject,
      dataRequest:this.lastrequest,
      customer:{amount_interests:this.dataCustomer.amount_interests,currency:this.dataCustomer.currency,type:this.dataCustomer.type}

    };
    localStorage.setItem("FormMetadata", JSON.stringify(data));
    this.activatedRoute.snapshot.url.push();
    this.router.navigate(["consolidado-de-informacion"]);
  } */
  goToEditFormOwner() {
    debugger
    let data = {
      request_id: this.lastrequest.request_id,
      form_id: this.currentSubject.owner.form_id,
      metadata: this.currentSubject.owner,
      dataRequest: this.lastrequest,
      customer: { amount_interests: this.dataCustomer.amount_interests, currency: this.dataCustomer.currency, type: this.dataCustomer.type }
    };
    localStorage.setItem("FormMetadata", JSON.stringify(data));
    this.setLocalStoragePersons();
    this.activatedRoute.snapshot.url.push();
    this.router.navigate(["formularios"]);
  }
  setLocalStoragePersons() {
    debugger
    let data = {
      persons: null,
      currentsubject: this.currentSubject
    }
    const persons = this.groupSubjectsList(this.subjectsList);
    data.persons = persons
    localStorage.setItem("persons_customer", JSON.stringify(data))
  }
  goToEditForm2() {
    debugger
    let data = {
      request_id: this.lastrequest.request_id,
      form_id: this.currentSubject.form_id,
      metadata: this.currentSubject,
      dataRequest: this.lastrequest,
      customer: { amount_interests: this.dataCustomer.amount_interests, currency: this.dataCustomer.currency, type: this.dataCustomer.type }

    };
    localStorage.setItem("FormMetadata", JSON.stringify(data));
    this.setLocalStoragePersons();
    this.activatedRoute.snapshot.url.push();
    this.router.navigate(["formularios"]);
  }

  async ViewReqDoc(modal, doc: ReqRequirementDoc) {
    this.spinner.show();
    await this._service.getreqDoc(doc).toPromise()
      .then((response) => {
        console.log("view", response);
        this.imgsrcbase64 = null;
        this.pdfsrcbase64 = null;
        if (response.data.typed === "image") {
          const urls =
            "data:image/jpg;base64;base64," + response.data.url;
          this.imgsrcbase64 = this.sanitizer.bypassSecurityTrustResourceUrl(
            urls
          );
        } else if (response.data.typed === "pdf") {
          const urls =
            "data:application/pdf;base64," + response.data.url;
          this.pdfsrcbase64 = response.data.url
        }
        this.spinner.hide()
      }).catch((error) => {
        this.spinner.hide();
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });

    this.viewDocumentModal.openModal()
  }

  async editCustomer1() {
    this.spinner.show();
    let formsend = null;
    formsend = this.FormEditCustomer;
    formsend = formsend.value;
    await this._AllDataService.updateCurrency(
      formsend
    ).subscribe((response) => {
      this.ngOnInit();
      this.toastr.success(
        "La información fue guardada con éxito",
        "Información Guardada"
      );
      this.modalService.dismissAll();
    },
      (error) => {
        this.toastr.error("Verificar Información del Formulario", "Oops!");
        console.log(error);
      }
    )
  }



  updateRequisitosEnabled(sp) {
    this.spinner.show(sp)
    let reqs = this.currentAval.requirements;
    let data: ReqRequirement = {
      req_requi_id: reqs.req_requi_id,
      rwedet_id: reqs.rwedet_id,
      sys_w_requirements_id: reqs.sys_w_requirements_id,
      requirements: reqs.requirements.map(r => ({
        req_requi_det_id: r.req_requi_det_id,
        req_requi_id: r.req_requi_id,
        enabled: this.avalReqsCheckBoxesData.find(a => a.data.key == r.req_requi_det_id).value ? 1 : 0
      })),
      state: reqs.state,
    }

    let sub = this._service.UpdateRequirementsEnabled(data)
      .subscribe(
        (response) => {
          this.toastr.success(
            "Se guardaron los cambios de los Requisitos",
            "cambios guardados!"
          );

          sub.unsubscribe();
          this.spinner.hide(sp);
          if (this.currentAval.requirements) {
            this.currentAval.requirements.update_date = response.body['data'].update_date
            this.avalReqsCheckBoxesData.forEach(a => {
              reqs.requirements.find(r => r.req_requi_det_id == a.data.key).enabled = a.value == true ? 1 : 0;
            })
          }

          this.closeBtnClick();


        },
        (error) => {
          this.toastr.error(
            "Error al guardar las configuraciones de los requisitos",
            "Oops!"
          );
          sub.unsubscribe();
          this.spinner.hide(sp);
        }
      );

  }

  updateRequisitosStatus(sp): void {
    this.spinner.show(sp);
    let reqs = this.currentAval.requirements;
    let data: ReqRequirement = {
      req_requi_id: reqs.req_requi_id,
      rwedet_id: reqs.rwedet_id,
      sys_w_requirements_id: reqs.sys_w_requirements_id,
      requirements: reqs.requirements.map(r => (r.enabled == 1 ? {
        req_requi_det_id: r.req_requi_det_id,
        req_requi_id: r.req_requi_id,
        enabled: r.enabled,
        state: this.formReqsCheckBoxesData.find(a => {
          console.log('KEY: ' + a.data.key);
          console.log('req_requi_det_id: ' + r.req_requi_det_id);
          return a.data.key == r.req_requi_det_id;
        }).value ? 1 : 0
      } : r)),
      state: reqs.state,
    }

    let sub = this._service.UpdateRequirementsState(data, false)
      .subscribe(
        (response) => {
          this.toastr.success(
            "Se guardaron los cambios de los Requisitos",
            "cambios guardados!"
          );

          sub.unsubscribe();
          this.spinner.hide(sp);
          this.formReqsCheckBoxesData.forEach(a => {
            reqs.requirements.find(r => r.req_requi_det_id == a.data.key).state = a.value == true ? 1 : 0;
            console.log('Aqui ando')
          })
          if (reqs.requirements.filter(r => r.enabled == 1 && (r.state == 0 || r.state == null)).length > 0) {
            this.currentAval.requirements.state = 0;
          }
          //this.closeBtnClick();


        },
        (error) => {
          this.toastr.error(
            "Error al guardar las configuraciones de los requisitos",
            "Oops!"
          );
          sub.unsubscribe();
          this.spinner.hide(sp);
        }
      );
  }

  updateRequisitosComplete(sp): void {
    this.spinner.show(sp);
    let sub = this._service.SetRequirementComplete(this.currentAval.requirements.req_requi_id, 1)
      .subscribe(
        (response) => {
          this.toastr.success(
            "Se guardaron los cambios de los Requisitos",
            "cambios guardados!"
          );

          sub.unsubscribe();
          this.spinner.hide(sp);
          this.currentAval.requirements.state = 1;
          this.closeBtnClick();


        },
        (error) => {
          this.toastr.error(
            "Error al guardar las configuraciones de los requisitos",
            "Oops!"
          );
          sub.unsubscribe();
          this.spinner.hide(sp);
        }
      );
  }

  isRequirementsComplete(): boolean {
    return this.currentAval.requirements.requirements.filter(r => r.enabled && r.state == 0).length == 0 ? true : false;
  }
  getRequisitosStateClass(rwedet_id: number): string {
    let aval = this.requestAvalsInfo.filter(av => av.rwedet_id == rwedet_id)[0];
    return aval.requirements.state == 1 ? 'label-success' : 'label-warning'
  }
  getRequistosStateText(rwedet_id: number): string {
    let aval = this.requestAvalsInfo.filter(av => av.rwedet_id == rwedet_id)[0];
    return aval.requirements.state == 1 ? 'Aprobado' : 'No aprobado'
  }
  getRequisitosInfo(rwedet_id: number): string {
    let aval = this.requestAvalsInfo.filter(av => av.rwedet_id == rwedet_id)[0];
    let currentReqs = aval.requirements.requirements.filter(req => req.enabled == 1).length;
    let readyReqs = aval.requirements.requirements.filter(req => req.enabled == 1 && req.state == 1).length;
    return `${readyReqs}/${currentReqs}`
  }
  haveRequirements(rwedet_id: number): boolean {
    //console.log('haveRequirements: '+rwedet_id);
    let aval = this.requestAvalsInfo.filter(av => av.rwedet_id == rwedet_id)[0];
    if (aval) {

      if (aval.requirements && aval.requirements.requirements.length > 0) {
        return true;
      }
    }
    return false;
  }
  resetAval(): void {
    console.log('resetAval:::');
    this.currentAval = null;

  }

  EditRequisitos(targetModal, aval) {
    console.log('rr')
    console.log(this.requestAvalsInfo)
    this.nametmp = aval.name
    this.initAvalsReqs(this.currentAval);
    this.openModal(targetModal)

  }

  OpenRequirements(rwedet_id: number, modal): void {
    this.currentAval = this.requestAvalsInfo.filter(av => av.rwedet_id == rwedet_id)[0];
    //buscamos los que son de este tipo
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
    this.initFormsReqs(this.currentAval);
    this.openModal(modal)
  }
  getAllAvalsCheck() {
    let notcheck = true;
    if (this.requestAvalsInfo.length == 0) {
      return false;
    }
    this.requestAvalsInfo.forEach((item) => {
      if (item.requirements) {
        let requirements = item.requirements.update_date;
        let subjects = item.subjects.find((item2) => item2.requirements_update_date == null);//Encontramos los que aun no 
        if (requirements == null || subjects) {
          notcheck = false
        }
      }

    })
    return notcheck;
  }


  public isAllSubjectComplete(): boolean {
    if (this.subjectsList && this.subjectsList.length > 0) {

      //console.log(a);    
      return this.subjectsList.filter(s => s.rsdet_id != null && (s.complete_status == null || s.complete_status == 0)).length == 0 && this.requestAvalsInfo.filter(aval => aval.requirements != null && (aval.requirements.state == 0 || aval.requirements.state == null)).length == 0


      //return true;
    }
    //console.log('JUMMMMM...');
    return false;
  }

  public changeAllCurrentForms(e, csallforms) {
    this.spinner.show(csallforms);
    let sub = this._service.ChangeFormCheckStatusAll(this.currentSubject.rsdet_id, e.target.checked)
      .subscribe(
        (response) => {

          this.toastr.success(
            "Se guardaron los cambios de los formularios",
            "cambios guardados!"
          );
          sub.unsubscribe();
          this.spinner.hide(csallforms);
          this.currentSubject.forms.forEach(f => f.check_status = e.target.checked == true ? 1 : 0)
          this.initFormsTabStuff(this.currentSubject);
          //this.completeAllCurrentForms = !this.completeAllCurrentForms;
        },
        (error) => {
          this.toastr.error(
            "Verificar información del formulario.",
            "Oops!"
          );
          sub.unsubscribe();
          this.spinner.hide(csallforms);
        }
      );
    if (this.currentSubject.owner != null && this.currentSubject.owner != undefined) {
      let sub2 = this._service.ChangeFormCheckStatusAll(this.currentSubject.owner.rsdet_id, e.target.checked)
        .subscribe(
          (response) => {
            this.toastr.success(
              "Se guardaron los cambios de los formularios",
              "cambios guardados!"
            );
            sub2.unsubscribe();
            this.currentSubject.owner.forms.forEach(f => f.check_status = e.target.checked == true ? 1 : 0)
            this.initFormsTabStuff(this.currentSubject);
          }
        )
    }

  }



  public changeFormCheckStatus(e, form: ReqFormResp, i: number, ns, subject): void {
    console.log('Aqui ando 1')

    console.log(e);
    this.spinner.show(ns);
    let val = this.formsCheckBoxesData[i].value;
    form.check_status = e.target.checked == true ? 1 : 0;
    let sub = this._service.ChangeFormCheckStatus(form)
      .subscribe(
        (response) => {
          this.toastr.success(
            "Se guardaron los cambios de los formularios",
            "cambios guardados!"
          );
          sub.unsubscribe();
          this.spinner.hide(ns);
          if (!e.target.checked) {
            subject.complete_status = 0;
          }
        },
        (error) => {
          this.toastr.error(
            "Verificar información del formulario.",
            "Oops!"
          );
          sub.unsubscribe();
          form.check_status = form.check_status == 1 ? 0 : 1;
          this.spinner.hide(ns);
        }
      );
  }

  public completeSubjectForms(subb: ReqSubjectResp): void {
    subb.complete_status = 1;
    let sub = this._service.CompleteSubjectForms(this.currentSubject)
      .subscribe(
        (response) => {
          this.toastr.success(
            "Se guardaron los cambios de los formularios",
            "cambios guardados!"
          );

          sub.unsubscribe();
          //this.spinner.hide(ns);
        },
        (error) => {
          this.toastr.error(
            "Verificar información del formulario.",
            "Oops!"
          );
          sub.unsubscribe();
          subb.complete_status = 0;
          //this.spinner.hide(ns);
        }
      );
    if (subb.owner != null && subb.owner != undefined) {
      subb.owner.complete_status = 1;
      let sub1 = this._service.CompleteSubjectForms(subb.owner)
        .subscribe((response) => {
          sub1.unsubscribe();
        },
          (error) => {
            this.toastr.error(
              "Verificar información del formulario.",
              "Oops!"
            );
            sub1.unsubscribe();
            subb.owner.complete_status = 0;
          })
    }
  }

  public incompleteSubjectForms(subb: ReqSubjectResp): void {
    subb.complete_status = 0;
    let sub = this._service.CompleteSubjectForms(this.currentSubject)
      .subscribe(
        (response) => {
          this.toastr.success(
            "Se guardaron los cambios de los formularios",
            "cambios guardados!"
          );

          sub.unsubscribe();
          //this.spinner.hide(ns);
        },
        (error) => {
          this.toastr.error(
            "Verificar información del formulario.",
            "Oops!"
          );
          sub.unsubscribe();
          subb.complete_status = 1;
          //this.spinner.hide(ns);
        }
      );
    if (subb.owner != null && subb.owner != undefined) {
      subb.owner.complete_status = 0;
      let sub1 = this._service.CompleteSubjectForms(subb.owner)
        .subscribe(
          (response) => {
            sub1.unsubscribe()
          }, (error) => {
            this.toastr.error(
              "Verificar información del formulario.",
              "Oops!"
            );
            sub1.unsubscribe();
            subb.owner.complete_status = 1;
          }
        )

    }
  }

  public checkForComplete(sub: ReqSubjectResp): boolean {
    if (sub.owner != null && sub.owner != undefined) {

      let res2 = (sub.owner.forms.filter(f => f.state == 1 && (f.check_status == 0 || f.check_status == null)).length > 0)
      let res1 = (sub.forms.filter(f => f.state == 1 && (f.check_status == 0 || f.check_status == null)).length > 0)
      //console.log("YAAAA", res1, res2)
      return res1 || res2
    }
    return sub.forms.filter(f => f.state == 1 && (f.check_status == 0 || f.check_status == null)).length > 0;
  }





  public onSelectSubject(sub: ReqSubjectResp) {
    //this.initAvalsTabStuff(sub);
    if (sub.rsdet_id != null) {
      this.initFormsTabStuff(sub);
      this.currentSubject = sub;
    }


  }

  async ViewFormDoc(modal, doc: ReqFormDocResp) {
    //this.spinner.show();
    await this._service.getFormDoc(doc).toPromise()
      .then((response) => {
        console.log("view", response);
        this.imgsrcbase64 = null;
        this.pdfsrcbase64 = null;
        if (response.data.typed === "image") {
          const urls =
            "data:image/jpg;base64;base64," + response.data.url;
          this.imgsrcbase64 = this.sanitizer.bypassSecurityTrustResourceUrl(
            urls
          );
        } else if (response.data.typed === "pdf") {
          const urls =
            "data:application/pdf;base64," + response.data.url;
          this.pdfsrcbase64 = response.data.url
        }
      }).catch((error) => {
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });

    this.viewDocumentModal.openModal()
  }

  DownloadFormDoc(form: ReqFormDocResp): void {
    this._service.DownloadFormDoc(form);
  }

  DownloadJson(form_id: number, subject: ReqSubjectResp) {
    this._service.DownloadJson(form_id, "" + subject.rsdet_id);
    console.log('currentSubject: ');
    console.log(this.currentSubject);
  }
  async DownloadOwnerForm(forname, sp) {
    this.spinner.show(sp);
    let name = this.currentSubject.name;
    let idForm = this.currentSubject.owner.form_id;
    console.log('form', idForm);
    let newName;

    newName = name.replace(/ /g, "_");
    newName = name.replace(/\./g, "");
    //newName = name.replace(/\./g, "");
    //console.log(newName);

    let date = new Date();
    let datestring = this.datepipe.transform(date, "yyyy-MM-dd HH:MM:ss");

    if (forname === "SOLICITUD JURÍDICA" || forname === "SOLICITUD JURIDICA") {
      console.log(forname);
      await this.DownloadxlsService.SolicitudJuridica(
        "FormularioSolicitud-" + newName + "-" + datestring,
        idForm,
        this.user_id
      );
      this.spinner.hide(sp);
    } else if (forname === "SOLICITUD INDIVIDUAL") {
      console.log(forname);
      await this.DownloadxlsService.SolicitudIndividual(
        "FormularioSolicitud-" + newName + "-" + datestring,
        idForm,
        this.user_id
      );
      this.spinner.hide(sp);
    } else if (forname === "PERFIL JURÍDICO" || forname === "PERFIL JURIDICO") {
      await this.DownloadxlsService.PerfilJuridico(
        "FormularioPerfil-" + newName + "-" + datestring,
        idForm,
        this.user_id
      );
      this.spinner.hide(sp);
    } else if (forname === "PERFIL INDIVIDUAL") {
      await this.DownloadxlsService.PerfilIndividual(
        "FormularioPerfil-" + newName + "-" + datestring,
        idForm,
        this.user_id
      );
      this.spinner.hide(sp);
    } else if (forname === "IVE 02" || forname === "IVE") {
      await this.DownloadxlsService.IveJuridico(
        "FormularioIVE-" + newName + "-" + datestring,
        idForm,
        this.user_id
      );
      this.spinner.hide(sp);
    } else if (forname === "ANEXO DE SERVICIOS") {
      await this.DownloadxlsService.AnexoProductosJuridico(
        "FormularioAnexoProducotsYServicios-" + newName + "-" + datestring,
        idForm,
        this.user_id,
        this.dataCustomer.type
      );
      this.spinner.hide(sp);
    } else if (forname === "ANEXO CPE" || forname === "ANEXO CPE (CONTRATISTA O PROVEEDOR DEL ESTADO") {
      await this.DownloadxlsService.CPEJuridico(
        "FormularioCPE-" + newName + "-" + datestring,
        idForm,
        this.user_id
      );
      this.spinner.hide(sp);
    } else if (forname === "CARTA DIRIGIDA A BANCO INTERNACIONAL") {
      await this.DownloadxlsService.CartaBancoJuridico(
        "CartaDirigidaBanco-" + newName + "-" + datestring + '.docx',
        idForm,
        this.user_id,
        this.dataCustomer.type
      );
      this.spinner.hide(sp);
    } else if (forname === "PUNTO DE ACTA") {
      await this.DownloadxlsService.PuntoActaJuridico(
        "MinutaPuntoActa-" + newName + "-" + datestring + '.docx',
        idForm,
        this.user_id
      );
      this.spinner.hide(sp);
    } else if (forname === "REGISTRO DE DEUDORES") {
      await this.DownloadxlsService.DeudoresJuridico(
        "RegistroDeDeudores-" + newName + "-" + datestring,
        idForm,
        this.user_id,
        this.dataCustomer.type
      );
      this.spinner.hide(sp);
    } else if (forname === "FEIC") {
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
      this.spinner.hide(sp);
    }
  }
  async DownloadForm(forname, sp) {
    /* console.log(this.currentSubject); */
    this.spinner.show(sp);
    let name = this.currentSubject.name;
    let idForm = this.currentSubject.form_id;
    console.log('form', idForm);
    let newName;

    newName = name.replace(/ /g, "_");
    newName = name.replace(/\./g, "");
    //newName = name.replace(/\./g, "");
    //console.log(newName);

    let date = new Date();
    let datestring = this.datepipe.transform(date, "yyyy-MM-dd HH:MM:ss");

    if (forname === "SOLICITUD JURÍDICA" || forname === "SOLICITUD JURIDICA") {
      console.log(forname);
      await this.DownloadxlsService.SolicitudJuridica(
        "FormularioSolicitud-" + newName + "-" + datestring,
        idForm,
        this.user_id
      );
      this.spinner.hide(sp);
    } else if (forname === "SOLICITUD INDIVIDUAL") {
      console.log(forname);
      await this.DownloadxlsService.SolicitudIndividual(
        "FormularioSolicitud-" + newName + "-" + datestring,
        idForm,
        this.user_id
      );
      this.spinner.hide(sp);
    } else if (forname === "PERFIL JURÍDICO" || forname === "PERFIL JURIDICO") {
      await this.DownloadxlsService.PerfilJuridico(
        "FormularioPerfil-" + newName + "-" + datestring,
        idForm,
        this.user_id
      );
      this.spinner.hide(sp);
    } else if (forname === "PERFIL INDIVIDUAL") {
      await this.DownloadxlsService.PerfilIndividual(
        "FormularioPerfil-" + newName + "-" + datestring,
        idForm,
        this.user_id
      );
      this.spinner.hide(sp);
    } else if (forname === "IVE 02" || forname === "IVE") {
      await this.DownloadxlsService.IveJuridico(
        "FormularioIVE-" + newName + "-" + datestring,
        idForm,
        this.user_id
      );
      this.spinner.hide(sp);
    } else if (forname === "ANEXO DE SERVICIOS") {
      await this.DownloadxlsService.AnexoProductosJuridico(
        "FormularioAnexoProducotsYServicios-" + newName + "-" + datestring,
        idForm,
        this.user_id,
        this.dataCustomer.type
      );
      this.spinner.hide(sp);
    } else if (forname === "ANEXO CPE" || forname === "ANEXO CPE (CONTRATISTA O PROVEEDOR DEL ESTADO") {
      await this.DownloadxlsService.CPEJuridico(
        "FormularioCPE-" + newName + "-" + datestring,
        idForm,
        this.user_id
      );
      this.spinner.hide(sp);
    } else if (forname === "CARTA DIRIGIDA A BANCO INTERNACIONAL") {
      await this.DownloadxlsService.CartaBancoJuridico(
        "CartaDirigidaBanco-" + newName + "-" + datestring + '.docx',
        idForm,
        this.user_id,
        this.dataCustomer.type
      );
      this.spinner.hide(sp);
    } else if (forname === "PUNTO DE ACTA") {
      await this.DownloadxlsService.PuntoActaJuridico(
        "MinutaPuntoActa-" + newName + "-" + datestring + '.docx',
        idForm,
        this.user_id
      );
      this.spinner.hide(sp);
    } else if (forname === "REGISTRO DE DEUDORES") {
      await this.DownloadxlsService.DeudoresJuridico(
        "RegistroDeDeudores-" + newName + "-" + datestring,
        idForm,
        this.user_id,
        this.dataCustomer.type
      );
      this.spinner.hide(sp);
    } else if (forname === "FEIC") {
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
      this.spinner.hide(sp);
    }

  }
  DeleteOwnerFormDoc(doc: ReqFormDocResp) {
    this._service.DeleteFormDoc(doc).toPromise()
      .then(async (response) => {
        let form = this.currentSubject.owner.forms.find(f => f.rsfdet_id == doc.rsfdet_id);
        form.docs = form.docs.filter(fd => fd.req_form_doc_id != doc.req_form_doc_id);
        this.toastr.success("Se elimino el archivo.", "Archivo Eliminado!");
      })
      .catch((error) => {
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }
  DeleteFormDoc(doc: ReqFormDocResp) {
    this._service.DeleteFormDoc(doc).toPromise()
      .then(async (response) => {
        let form = this.currentSubject.forms.find(f => f.rsfdet_id == doc.rsfdet_id);
        form.docs = form.docs.filter(fd => fd.req_form_doc_id != doc.req_form_doc_id);
        this.toastr.success("Se elimino el archivo.", "Archivo Eliminado!");
      })
      .catch((error) => {
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }

  public EditForms(sub: any, modal) {
    this.initAvalsTabStuff(sub);
    this.currentSubject = sub;

    this.modalService.open(modal, {
      centered: true,
      backdrop: "static",
      keyboard: false,
      /* windowClass: "my-class", */
      /* size: "lg", */
      windowClass: 'submodalclass'

    });
  }
  async saveOwnerFormsChanges() {
    console.log('Aqui ando')
    let arrdat = this.ownerFormsCheckBoxesData.map(it => it.value == true ? 1 : 0);
    let subject = this.currentSubject.owner
    for (let i = 0; i < subject.forms.length; i++) {
      subject.forms[i].state = arrdat[i];
    }
    let sub = this._service.ModifySubjectForms(subject)
      .subscribe(
        (response) => {
          //this.currentSubject = response;
          sub.unsubscribe();
          this.closeBtnClick();
          //this.currentSubject = null;
        }
      )
  }
  async saveSubFormsChanges(nspinner) {
    console.log('saveSubFormsChanges');
    //console.log(nspinner);
    this.spinner.show(nspinner);

    if (this.currentSubject.owner != null && this.currentSubject.owner != undefined) {
      await this.saveOwnerFormsChanges();
    }
    let arrdat = this.subjectFormsCheckBoxesData.map(it => it.value == true ? 1 : 0);
    for (let i = 0; i < this.currentSubject.forms.length; i++) {
      this.currentSubject.forms[i].state = arrdat[i];
    }
    let sub = this._service.ModifySubjectForms(this.currentSubject)
      .subscribe(
        (response) => {
          this.toastr.success(
            "Se guardaron los cambios de los formularios",
            "cambios guardados!"
          );
          if (this.currentSubject != null && response.requirements_update_date != null) {
            this.currentSubject.requirements_update_date = response.requirements_update_date;
          }
          this.currentSubject = response;
          sub.unsubscribe();
          this.closeBtnClick();
          //this.initAvalsTabStuff(response);
          this.currentSubject = null;

          //this.spinner.hide(nspinner);
        },
        (error) => {
          this.toastr.error(
            "Verificar información del formulario.",
            "Oops!"
          );
          sub.unsubscribe();
          //this.spinner.hide(nspinner);
        }
      );
  }

  initAvalsTabStuff(sub: ReqSubjectResp): void {
    console.log('initAvalsTabStuff::');
    console.log('YAA')
    console.log(sub)
    this.subjectFormsCheckBoxes = new FormArray([]);
    this.subjectFormsCheckBoxesData = new Array<checkForm>();

    if (sub) {
      console.log('ENTRO a "sub"');
      for (let i = 0; i < sub.forms.length; i++) {
        this.subjectFormsCheckBoxesData.push({
          value: sub.forms[i].state == 0 ? false : true,
          data: {
            name: sub.forms[i].name,
            key: i,
          },
        });
      }
    }
    if (sub.owner != null && sub.owner != undefined) {
      this.ownerFormsCheckBoxes = new FormArray([]);
      this.ownerFormsCheckBoxesData = new Array<checkForm>();
      for (let i = 0; i < sub.owner.forms.length; i++) {
        this.ownerFormsCheckBoxesData.push({
          value: sub.owner.forms[i].state == 0 ? false : true,
          data: {
            name: sub.owner.forms[i].name,
            key: i
          }
        })
      }
    }
    console.log(this.subjectFormsCheckBoxesData);

  }

  initFormsTabStuff(sub: ReqSubjectResp): void {//ESTE ES PARA LOS CHECKBOXES DE LA PESTANIA DE FORMULARIOS(PARA MARCAR COMO COMPLETADOS LOS FORMULARIOS)
    //console.log('this.initFormTabStuff()');
    this.isAllChecked = false;
    this.formsCheckBoxes = new FormArray([]);
    this.formsCheckBoxesData = new Array<checkForm>();
    this.ownerFormsCheckBoxes = new FormArray([]);
    this.ownerFormsCheckBoxesData = new Array<checkForm>();
    if (sub) {
      for (let i = 0; i < sub.forms.length; i++) {
        if (sub.forms[i].state == 1) {
          //console.log(sub.forms[i]);
          this.formsCheckBoxesData.push({
            value: sub.forms[i].check_status == 0 || sub.forms[i].check_status == null ? false : true,
            data: {
              name: sub.forms[i].name,
              key: i,
            },
          });
        }

      }
      if (sub.owner != null && sub.owner != undefined) {
        for (let i = 0; i < sub.owner.forms.length; i++) {
          if (sub.owner.forms[i].state == 1) {
            this.ownerFormsCheckBoxesData.push({
              value: sub.owner.forms[i].check_status == 0 || sub.owner.forms[i].check_status == null ? false : true,
              data: {
                name: sub.owner.forms[i].name,
                key: i
              }
            })
          }
        }
      }
    }


  }
  initAvalsReqs(aval: MyProfileReqSubjectResp): void {
    console.log('initAvalsReqs()');
    this.avalReqsCheckBoxes = new FormArray([]);
    this.avalReqsCheckBoxesData = new Array<checkForm>();
    for (let i = 0; i < aval.requirements.requirements.length; i++) {
      let req = aval.requirements.requirements[i];
      this.avalReqsCheckBoxesData.push({
        value: req.enabled == 0 || req.enabled == null ? false : true,
        data: {
          name: req.req_name,
          key: req.req_requi_det_id,
        },
      });

    }
  }

  initFormsReqs(aval: MyProfileReqSubjectResp): void {
    console.log('initFormsReqs()');
    this.formReqsCheckBoxesData = new Array<checkForm>();

    for (let i = 0; i < aval.requirements.requirements.length; i++) {
      let req = aval.requirements.requirements[i];
      console.log(req);
      if (req.enabled == 1) {


        this.formReqsCheckBoxesData.push({
          value: req.state && req.state == 1 ? true : false,
          data: {
            name: req.req_name,
            key: req.req_requi_det_id,
          },
        });
      }


    }
  }




  onCheckAllForms(e: any): void {
    this.formsCheckBoxes.clear();
    if (e.target.checked) {
      this.formsCheckBoxesData.forEach((item) => {
        item.value = true;
        this.formsCheckBoxes.push(new FormControl(item.data.key));
      });
    } else {
      this.formsCheckBoxesData.forEach((item) => {
        item.value = false;
      });
    }
  }
  checkFormState(data: formMetadata[]) {
    this.formsMetadata = data;
    data.forEach((item) => {
      //console.log(item);
      this.formsCheckBoxesData[item.numberForm].value =
        item.status == 0 ? false : true;
    });
    this.formsCheckBoxesData.forEach((item) => {
      if (item.value) {
        this.formsCheckBoxes.push(new FormControl(item.data.key));
      }
    });
  }

  onCheckChange(event) {
    /* Selected */
    if (event.target.checked) {
      // Add a new control in the arrayForm
      if (event.target.value != null) {
        //console.log('Checkiado'+event.target.value)
        this.formsCheckBoxes.push(new FormControl(event.target.value));
      }
    } else {
      /* unselected */
      // find the unselected element
      let i: number = 0;

      this.formsCheckBoxes.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value == event.target.value) {
          // Remove the unselected element from the arrayForm
          this.formsCheckBoxes.removeAt(i);
          return;
        }

        i++;
      });
    }
  }

  subjectFormChange(e) {
    console.log('cambio algo de los botones.. se deberia de habilitar un boton para cambiar el estado');
    //console.log(e);
    console.log(this.subjectFormsCheckBoxesData);
  }
  //-------------------------------
  public onSelectAval(aval: any) {
    //console.log(this.requestAvalsInfo)
    this.currentAval = aval;
  }



  public beforeChange(event: NgbTabChangeEvent) {
    console.log('beforeChange:: ');
    console.log(event);
    if (event.nextId === "tab-preventchange2") {
      event.preventDefault();
    }
  }
  constructor(
    private mysqlService: MysqlService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private _sendemail: SendEmailService,
    private modalService: NgbModal,
    private sanitizer: DomSanitizer,
    private autorization: AuthorizationService,
    private DownloadxlsService: DownloadxlsService,
    public datepipe: DatePipe,
    private _service: FormconfigService,
    private _myProfileService: MyprofileService,
    private filenameS: FilenameService,
    private _currency: CurrencyService,
    private _inspection_place: InspectionPlaceService,
    private _userService: UserService,
    private _CASevice: CommercialanalysisService,
    private _UPSevice: UploaddocumentscaService,
    private _ReqDocService: RequirementdocvwService,
    private _FormDocService: FormdocvwService,
    private _IRDocService: InitialrelationdocvwService,
    private _VerificationService: VerificationdocvwService,
    private _legalAnalysis: LegalAnalysisService,
    private _CheckCA: ChecklistcommercialanalysisService,
    private _adviserService: AdviserService,
    private _adrev: AditionalrevService,
    private _complianceVerificationService: ComplianceVerificationService,
    private _analysisService: AnalysisService,
    private _commercialManagerAuthorization: CommercialManagerAuthorizationService,
    private _gerencialManagerAuthorization: GerencialManagerAuthorizationService,
    private _customerRegistrationService: CustomerRegistrationService,
    private _excelService: ExcelService,
    private _managementActService: ManagementActService,
    private _RolServise: RolService,
    private _sysLinkService: SyslinkService,
    private _AllDataService: AllDataService,
    private _requirementObservationService: RequirementObservationService
  ) { }

  //ESTOS SON METODOS PARA EL TEMA DE LA VALIDACION DE LOS PERMISOS

  canInitRelation(): boolean {
    let resource = "CLIENT";
    return this.autorization.havePermission(resource, "INIT_RELATION");
  }
  canAddRepresentative(): boolean {
    let resource = "CLIENT";
    return this.autorization.havePermission(resource, "ADD_REPRESENTATIVE");
  }
  canCreateRequest(): boolean {
    let resource = "CLIENT";
    return this.autorization.havePermission(resource, "CREATE_REQUEST");
  }
  canCompleteChecks(): boolean {
    let resource = "REQUEST";
    return this.autorization.havePermission(resource, "COMPLETE_CHECKS");
  }
  canCompleteWarranties(): boolean {
    let resource = "REQUEST";
    return this.autorization.havePermission(resource, "COMPLETE_WARRANTIES");
  }
  canCompleteForms(): boolean {
    let resource = "REQUEST";
    return this.autorization.havePermission(resource, "COMPLETE_FORMS");
  }
  canRejectChecks(): boolean {
    let resource = "REQUEST";
    return this.autorization.havePermission(resource, "REJECT_VERIFICATIONS");
  }

  canSendForms(): boolean {
    let resource = "REQUEST";
    return this.autorization.havePermission(resource, "SEND_FORMS");
  }

  canRejectWarranties(): boolean {
    let resource = "REQUEST";
    return this.autorization.havePermission(resource, "REJECT_WARRANTIES");
  }

  canRejectForms(): boolean {
    let resource = "REQUEST";
    return this.autorization.havePermission(resource, "REJECT_FORMS");
  }
  canCompleteLegalAnalisis(): boolean {
    let resource = "REQUEST";
    return this.autorization.havePermission(
      resource,
      "COMPLETE_LEGAL_ANALISIS"
    );
  }
  canRejectLegalAnalisis(): boolean {
    let resource = "REQUEST";
    return this.autorization.havePermission(resource, "REJECT_LEGAL_ANALISIS");
  }
  canCompleteVisits(): boolean {
    let resource = "REQUEST";
    return this.autorization.havePermission(resource, "COMPLETE_VISITS");
  }
  canRejectVisits(): boolean {
    let resource = "REQUEST";
    return this.autorization.havePermission(resource, "REJECT_VISITS");
  }
  canCompleteComplianceAnalisis(): boolean {
    let resource = "REQUEST";
    return this.autorization.havePermission(
      resource,
      "COMPLETE_COMPLIANCE_ANALISIS"
    );
  }
  canRejectComplianceAnalisis(): boolean {
    let resource = "REQUEST";
    return this.autorization.havePermission(
      resource,
      "REJECT_COMPLIANCE_ANALISIS"
    );
  }
  canCompleteRecords(): boolean {
    let resource = "REQUEST";

    return this.autorization.havePermission(resource, "COMPLETE_RECORDS");;
  }
  canRejectRecords(): boolean {
    let resource = "REQUEST";

    return this.autorization.havePermission(resource, "REJECT_RECORDS");;
  }
  canCompleteCreditAprobations(): boolean {
    let resource = "REQUEST";
    return this.autorization.havePermission(
      resource,
      "COMPLETE_CREDIT_APROBATION"
    );
  }
  canRejectCreditAprobations(): boolean {
    let resource = "REQUEST";
    return this.autorization.havePermission(
      resource,
      "REJECT_CREDIT_APROBATION"
    );
  }

  canCompleteSendNegotiationReport(): boolean {
    let resource = "REQUEST";
    return this.autorization.havePermission(
      resource,
      "COMPLETE_SEND_NEGOTIATION_REPORT"
    );
  }
  canRejectSendNegotiationReport(): boolean {
    let resource = "REQUEST";
    return this.autorization.havePermission(
      resource,
      "REJECT_SEND_NEGOTIATION_REPORT"
    );
  }
  canConfirmNegotiation(): boolean {
    let resource = "REQUEST";
    return this.autorization.havePermission(
      resource,
      "NEGOTIATION_CONFIRMATION"
    );
  }
  canCompleteManagementAprobal(): boolean {
    let resource = "REQUEST";

    return this.autorization.havePermission(resource, "COMPLETE_MANAGEMENT_APROVAL");

  }
  canRejectManagementAprobal(): boolean {
    let resource = "REQUEST";
    return this.autorization.havePermission(resource, "REJECT_MANAGEMENT_APROVAL");
  }

  canCompleteActivateClient(): boolean {
    let resource = "REQUEST";
    return this.autorization.havePermission(
      resource,
      "COMPLETE_CLIENT_ACTIVATION"
    );
  }
  canRejectActivateClient(): boolean {
    let resource = "REQUEST";
    return this.autorization.havePermission(
      resource,
      "REJECT_CLIENT_ACTIVATION"
    );
  }

  //-----------------------------

  DeleteParticipant(i) {
    this.participants.removeAt(i);
  }

  AddParticipant() {
    const control = new FormGroup({
      name: new FormControl("", [Validators.required]),
      position: new FormControl("", [Validators.required]),
    });
    this.participants.push(control);
    //this.toastr.success('Agragado', 'Empresa agregada');
  }

  async getPersons() {
    const res = this.mysqlService
      .getCustomerRepresentatiave(this.user_id)
      .toPromise()
      .then((response) => {
        this.dataPersons = response.data;
      });
    return res;
  }

  //Searching..........
  _searchTerm: string;
  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(val: string) {
    this._searchTerm = val;
    this.dataPersons = this.filter(val);
  }

  filter(v: string) {

    if (v !== "") {
      return this.dataPersons.filter(
        (x) =>
          x.first_name.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
          x.last_name.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
          x.email.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
          x.mobile_phone.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
          x.address.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
          x.name2.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
          x.name3.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
          x.lastname2.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
          x.lastname3.toLowerCase().indexOf(v.toLowerCase()) !== -1
      );
    } else {
      return this.getPersons();
    }
  }

  addnewPerson(id: string) {
    if (this.activatedRoute.snapshot.url.length > 0) {
      if (
        this.activatedRoute.snapshot.url[0].path !== undefined &&
        this.activatedRoute.snapshot.url[0].path === "cliente"
      ) {
        this.router.navigate([`/new-person/cliente/${this.user_id}`]);
      }
    } else {
      this.router.navigate([`/new-person`]);
    }
  }

  editPerson(id: string) {
    if (this.activatedRoute.snapshot.url.length > 0) {
      if (
        this.activatedRoute.snapshot.url[0].path !== undefined &&
        this.activatedRoute.snapshot.url[0].path === "cliente"
      ) {
        this.router.navigate([
          `/edit-view-person/edit/${id}/cliente/${this.user_id}`,
        ]);
      }
    } else {
      this.router.navigate([`/edit-view-person/edit/${id}`]);
    }
  }

  viewPerson(id: string) {
    if (this.activatedRoute.snapshot.url.length > 0) {
      if (
        this.activatedRoute.snapshot.url[0].path !== undefined &&
        this.activatedRoute.snapshot.url[0].path === "cliente"
      ) {
        this.router.navigate([
          `/edit-view-person/view/${id}/cliente/${this.user_id}`,
        ]);
      }
    } else {
      this.router.navigate([`/edit-view-person/view/${id}`]);
    }
  }

  editCustomer() {
    this.router.navigate([`/edit-customer/`]);
  }

  async ChangeStatusRequest() {
    let type = this.typechangerequest;
    let val = this.valuechangerequest;
    let now = new Date();
    let body = {};
    if (type === "verificaciones") {
      body = {
        typecompliance: "verificaciones",
        verifications: val,
        description: this.cambiarEstadoRelacion.value.description,
        employee_email: localStorage.getItem("email"),
        last_date: now,
      };
    } else if (type === "garantia") {
      body = {
        typecompliance: "garantia",
        warranties: val,
        description: this.cambiarEstadoRelacion.value.description,
        employee_email: localStorage.getItem("email"),
        last_date: now,
      };
    } else if (type === "formulario") {
      body = {
        typecompliance: "formulario",
        documents: val,
        description: this.cambiarEstadoRelacion.value.description,
        employee_email: localStorage.getItem("email"),
        last_date: now,
      };
    } else if (type === "validarformc") {
      body = {
        message: "Validaciones de formularios aceptada ",
        description: this.cambiarEstadoRelacion.value.description,
        employee_email: localStorage.getItem("email"),
        last_date: now,
        status: val,
      };
    } else if (type === "validarformr") {
      body = {
        message: "Validaciones de formularios rechazada ",
        description: this.cambiarEstadoRelacion.value.description,
        employee_email: localStorage.getItem("email"),
        last_date: now,
        status: val,
      };
    } else if (type === "analisislegalc") {
      body = {
        message: "Análisis Legal completo",
        description: this.cambiarEstadoRelacion.value.description,
        employee_email: localStorage.getItem("email"),
        status: val,
        last_date: now,
      };
    } else if (type === "analisislegalr") {
      body = {
        message: "Análisis Legal rechazado",
        description: this.cambiarEstadoRelacion.value.description,
        employee_email: localStorage.getItem("email"),
        status: val,
        last_date: now,
      };
    } else if (type === "visitanegocioc") {
      body = {
        message: "Visitas de negocio aceptada",
        description: this.cambiarEstadoRelacion.value.description,
        employee_email: localStorage.getItem("email"),
        status: val,
        last_date: now,
      };
    } else if (type === "visitanegocior") {
      body = {
        message: "Visitas de negocio rechazada",
        description: this.cambiarEstadoRelacion.value.description,
        employee_email: localStorage.getItem("email"),
        status: val,
        last_date: now,
      };
    } else if (type === "cumplimientoc") {
      body = {
        message: "Análisis de cumplimiento aceptado",
        description: this.cambiarEstadoRelacion.value.description,
        employee_email: localStorage.getItem("email"),
        status: val,
        last_date: now,
      };
    } else if (type === "cumplimientor") {
      body = {
        message: "Análisis de cumplimiento rechazado",
        description: this.cambiarEstadoRelacion.value.description,
        employee_email: localStorage.getItem("email"),
        status: val,
        last_date: now,
      };
    } else if (type === "revexpedientec") {
      body = {
        message: "Revisión de Expediente aceptado",
        description: this.cambiarEstadoRelacion.value.description,
        employee_email: localStorage.getItem("email"),
        status: val,
        last_date: now,
      };
    } else if (type === "revexpedienter") {
      body = {
        message: "Revisión de Expediente rechazado",
        description: this.cambiarEstadoRelacion.value.description,
        employee_email: localStorage.getItem("email"),
        status: val,
        last_date: now,
      };
    } else if (type === "aprobcreditosc") {
      body = {
        message: "Aprobación Comité Créditos aceptado",
        description: this.cambiarEstadoRelacion.value.description,
        employee_email: localStorage.getItem("email"),
        status: val,
        last_date: now,
      };
    } else if (type === "aprobcreditosr") {
      body = {
        message: "Aprobación Comité Créditos rechazado",
        description: this.cambiarEstadoRelacion.value.description,
        employee_email: localStorage.getItem("email"),
        status: val,
        last_date: now,
      };
    } else if (type === "infonegocioc") {
      body = {
        message: "Envío de informe de negociación	aceptado",
        description: this.cambiarEstadoRelacion.value.description,
        employee_email: localStorage.getItem("email"),
        status: val,
        last_date: now,
      };
    } else if (type === "infonegocior") {
      body = {
        message: "Envío de informe de negociación	rechazado",
        description: this.cambiarEstadoRelacion.value.description,
        employee_email: localStorage.getItem("email"),
        status: val,
        last_date: now,
      };
    } else if (type === "aprobacionc") {
      body = {
        message: "Aprobación Gerencial aceptada",
        description: this.cambiarEstadoRelacion.value.description,
        employee_email: localStorage.getItem("email"),
        status: val,
        last_date: now,
      };
    } else if (type === "aprobacionr") {
      body = {
        message: "Aprobación Gerencial rechazada.",
        description: this.cambiarEstadoRelacion.value.description,
        employee_email: localStorage.getItem("email"),
        status: val,
        last_date: now,
      };
    } else if (type === "activacionc") {
      body = {
        message: "Activación de cliente aceptada",
        description: this.cambiarEstadoRelacion.value.description,
        employee_email: localStorage.getItem("email"),
        status: val,
        last_date: now,
      };
    } else if (type === "activacionr") {
      body = {
        message: "Activación de cliente rechazada",
        description: this.cambiarEstadoRelacion.value.description,
        employee_email: localStorage.getItem("email"),
        status: val,
        last_date: now,
      };
    }

    await this.mysqlService
      .UpdateRequestCustomer(body, this.requestIdSelected)
      .toPromise()
      .then((response) => {
        this.getAllCustomerRequest();
        this.toastr.success(
          "Se cambio el estado de la solicitud.",
          "Estado Cambio!"
        );
        this._sendemail
          .sendEmail({
            Subject:
              "[Solucredit App] - Actualización de solicitud de prospecto",
            To: localStorage.getItem("email"),
            template_id: 11,
            customer_id: this.user_id,
            employee_email: localStorage.getItem("email"),
          })
          .subscribe(
            (response) => {
              this.toastr.success(
                "Se enviaron los requisitos al correo electronico.",
                "Enviado!"
              );
              this.modalService.dismissAll();

            },
            (error) => {
              this.toastr.error(
                "Verificar información del formulario.",
                "Oops!"
              );
              this.spinner.hide();
            }
          );
        this.ngOnInit();
      })
      .catch((error) => {
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }

  async getDataCurrentCostumer() {
    // const onepersons ;
    const res = this.mysqlService
      .GetOneCustomer(this.user_id)
      .toPromise()
      .then((response) => {
        this.dataCustomer = response.data.customer;
        this.initialRelation = response.data.relation[0];
        this.loginitialRelation = response.data.logrelation;
        const currentDate = new Date();
        this.formrelacion.patchValue({
          date_of_visit: currentDate.toISOString().substring(0, 10),
          email: response.data.customer.email,
          message: "test test test test test",
        });
        // this.spinner.hide();
        // console.log(response);
      });
    return res;
  }
  switchNgBTab(id: string) {
    this.ctdTabset.select(id)
  }
  isDPI(name: string): boolean {
    return name.includes(`Documento de Identificación Personal DPI`)
  }

  async selectRequest() {
    //this.requestIdSelected = id_request;
    this.subjectsList = []
    let sub = await this._service.getAvalsInfo(this.requestIdSelected).toPromise().then(
      (response) => {
        //debugger

        this.requestAvalsInfo = response;
        for (let i = 0; i < this.requestAvalsInfo.length; i++) {
          this.subjectsList = [...this.subjectsList, { rsdet_id: null, subject_name: this.requestAvalsInfo[i].name, rwedet_id: this.requestAvalsInfo[i].rwedet_id }, ...this.requestAvalsInfo[i].subjects]
        }
        if (this.requestAvalsInfo.length > 0) {
          this.onSelectAval(this.requestAvalsInfo[0])
        }
        //console.log(this.subjectsList)
        //Este es el ultimo
        // this.spinner.hide()
        //Este es el metodo que mas se tarda, por lo cual vamos a mandar a llamar el cambio de pestaña.
        //this.autoMoveTab(this.selectedTabName)
        //obtener la informacion de quien firma los formularios y quien firma las verificaciones
        let subject1 = this.getVerificationsInfo('Verificaciones aceptadas')
        if (subject1 != null) {
          subject1 = subject1.employee_email
          this._userService.getUserByEmail(subject1).subscribe(
            (response) => {
              console.log('Response 1')
              console.log(response.data)
              let data = response.data
              this.verificationsSubject = data.firstname + ' ' + data.lastname
            }
          )
        }
        let subject2 = this.getVerificationsInfo('Formularios aceptados')
        if (subject2 != null) {
          subject2 = subject2.employee_email
          this._userService.getUserByEmail(subject2).subscribe(
            (response) => {
              console.log('Response 2')
              let data = response.data
              this.formsSubject = data.firstname + ' ' + data.lastname
            }
          )
        }
      },
      (error) => {
        console.log("error");
        console.log(error);
      }
    );

    await this.mysqlService
      .GetAllDataCustomerRequest(this.user_id, this.requestIdSelected)
      .toPromise()
      .then((response) => {
        //console.log('response select request',response);
        this.documentCostumer = response.data.documents;
        this.statusdocumentsCustomer = response.data.statusdocuments;
        this.verificationsCustomer = response.data.verifications;
        this.warrantiesCustomer = response.data.warranties;
        this.fiduciarieswarrantiesCustomer = response.data.fiduciaries;
        this.requestSelected = true;
        //console.log(response.data);
        if (response.data.visitdetail[0] != null) {
          this.visitDetails = JSON.parse(
            response.data.visitdetail[0].information
          );
          let newar = [];
          this.visitDetails.participants.forEach((element, index) => {
            newar.push(element);
            if (index > 0) {
              this.AddParticipant();
            }
          });
          this.participants.patchValue(newar);
        } else {
          this.visitDetails = {};
        }
        this.contvisitainicial = 0
        this.contrecordcrediticio = 0
        this.contguatecompras = 0
        this.continfornet = 0
        this.contsat = 0
        this.contdeclaraguate = 0
        this.conthipotecaria = 0
        this.contprendaria = 0
        this.contfiduciaria = 0
        this.contsolicitud = 0
        this.contperfil = 0
        this.contfeic = 0
        this.contive = 0
        this.contcpe = 0
        this.contpep = 0
        this.contauto = 0
        this.contcarta = 0
        this.contestado = 0
        this.contflujos = 0
        this.contendeudamiento = 0
        this.contformato = 0
        this.contdeudores = 0
        //contvi
        this.verificationsCustomer.forEach((element, index) => {
          if (element.name === "visitasinicial") {
            this.contvisitainicial++;
          }
          if (element.name === "recordcrediticio") {
            this.contrecordcrediticio++;
          }
          if (element.name === "guatecompras") {
            this.contguatecompras++;
          }
          if (element.name === "infornet") {
            this.continfornet++;
          }
          if (element.name === "sat") {
            this.contsat++;
          }
          if (element.name === "declaraguate") {
            this.contdeclaraguate++;
          }
        });
        this.warrantiesCustomer.forEach((element, index) => {
          if (element.name === "prendaria") {
            this.contprendaria++;
          }
          if (element.name === "hipotecaria") {
            this.conthipotecaria++;
          }
          if (element.name === "fiduciaria") {
            this.contfiduciaria++;
          }
        });
        this.documentCostumer.forEach((element, index) => {
          if (element.name === "solicitud") {
            this.contsolicitud++;
          }
          if (element.name === "perfil") {
            this.contperfil++;
          }
          if (element.name === "feic") {
            this.contfeic++;
          }
          if (element.name === "iveproductos") {
            this.contive++;
          }
          if (element.name === "cpe") {
            this.contcpe++;
          }
          if (element.name === "pep") {
            this.contpep++;
          }
          if (element.name === "autorizacionparaconsultas") {
            this.contauto++;
          }
          if (element.name === "cartaparaelbancointernacional") {
            this.contcarta++;
          }
          if (element.name === "estadopatrimonial") {
            this.contestado++;
          }
          if (element.name === "flujosdefondos") {
            this.contflujos++;
          }
          if (element.name === "endeudamientobancario") {
            this.contendeudamiento++;
          }
          if (element.name === "formatoparaintegraciones") {
            this.contformato++;
          }
          if (element.name === "registrodedeudores") {
            this.contdeudores++;
          }
        });
        this.CheckDocumentStatus(this.statusdocumentsCustomer);

      })
      .catch((error) => {
        console.log(error);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
    //this.spinner.hide()
  }

  async CheckStatusRequest(data) {
    await data.forEach((element) => {
      if (element.documents === 1) {
        this.statusbtnFormularios = {
          class: "btn-success",
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
  DownloadAnalysisDocument(doc) {
    console.log(doc)
    this._analysisService.downloadDocument(doc.id_uploaddocsca, doc.uploaddocsca_namedoc)
    this.toastr.success('Éxito', 'Se han descargado los documentos')
  }
  DownloadChecklistAnalysisDocument(doc) {
    this._analysisService.downloadDocumentChecklist(doc.id_checklist, doc.filename)
    this.toastr.success('Éxito', 'Se han descargado los documentos')
  }
  async ViewAnalysisDocumentChecklist(doc, modal) {
    this.spinner.show()
    console.log(doc)
    await this._analysisService.showDocumentChecklist(doc.id_checklist).toPromise()
      .then((response) => {
        this.imgsrcbase64 = null;
        this.pdfsrcbase64 = null;
        console.log(response)
        if (response.type === 'image') {
          let urls =
            "data:image/jpg;base64;base64," + response.url;
          this.imgsrcbase64 = this.sanitizer.bypassSecurityTrustResourceUrl(
            urls
          );
        } else if (response.type === 'pdf') {
          let urls =
            "data:application/pdf;base64," + response.url;
          this.pdfsrcbase64 = response.url
          console.log(urls);
        }
        this.spinner.hide()
        this.viewDocumentModal.openModal()
      }).catch((error) => {
        this.toastr.error("Problemas con el servidor.", "Oops!");
        this.spinner.hide()
        console.log(error)
      });
    this.spinner.hide()
  }
  async ViewAnalysisDocument(doc, modal) {
    this.spinner.show();
    //console.log(doc)
    await this._analysisService.showDocument(doc.id_uploaddocsca).toPromise()
      .then((response) => {
        this.imgsrcbase64 = null;
        this.pdfsrcbase64 = null;
        console.log(response)
        if (response.type === 'image') {
          let urls =
            "data:image/jpg;base64;base64," + response.url;
          this.imgsrcbase64 = this.sanitizer.bypassSecurityTrustResourceUrl(
            urls
          );
        } else if (response.type === 'pdf') {
          let urls =
            "data:application/pdf;base64," + response.url;
          this.pdfsrcbase64 = response.url
          console.log(urls);
        }
        this.spinner.hide()
        this.viewDocumentModal.openModal()
      }).catch((error) => {
        this.toastr.error("Problemas con el servidor.", "Oops!");
        this.spinner.hide()
        console.log(error)
      });

  }
  async ViewDocu(modal, type, dockey) {
    this.spinner.show();

    await this.mysqlService
      .GetOneDocument({
        type: type,
        id: this.user_id,
        request: this.requestIdSelected,
        document_key: dockey,
      })
      .toPromise()
      .then((response) => {
        debugger
        console.log('ViewDocu::');
        console.log(response);
        this.imgsrcbase64 = null;
        this.pdfsrcbase64 = null;
        if (response.data.type === "image") {

          const urls =
            "data:image/jpg;base64;base64," +
            response.data.imgdata.document_name;
          console.log(urls);
          this.imgsrcbase64 = this.sanitizer.bypassSecurityTrustResourceUrl(
            urls
          );
        } else if (response.data.type === "pdf") {
          const urls =
            "data:application/pdf;base64," +
            response.data.imgdata.document_name;
          console.log(urls);
          this.pdfsrcbase64 = response.data.imgdata.document_name
        }
        this.spinner.hide();
      })
      .catch((error) => {
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
    this.viewDocumentModal.openModal()
    return
  }

  async ViewDocuRelation(modal, type, dockey) {
    this.spinner.show();
    await this.mysqlService
      .GetOneDocument({
        type: type,
        id: this.user_id,
        document_key: dockey,
      })
      .toPromise()
      .then((response) => {
        console.log();
        console.log(response);
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
          this.pdfsrcbase64 = response.data.relation.DPI_key

        }
        this.spinner.hide();
      })
      .catch((error) => {
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
    this.viewDocumentModal.openModal()
  }

  async DeleteDocu(type, dockey) {
    await this.mysqlService
      .DeleteDocument({
        id: this.user_id,
        request: this.requestIdSelected,
        document_key: dockey,
      })
      .toPromise()
      .then(async (response) => {
        await this.selectRequest();
        this.spinner.hide()
        this.toastr.success("Se elimino el archivo.", "Archivo Eliminado!");
      })
      .catch((error) => {
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }

  async CheckDocumentStatus(data) {
    this.contforms = 0;
    this.contWarranties = 0;
    this.contVerifications = 0;

    await data.forEach((element) => {
      //console.log(element);

      if (element.name == "solicitud" && element.status === 1) {
        this.StatusSolicitud = {
          status: "Completo",
          class: "label-success",
          check: true,
        };
        this.contforms = this.contforms + 1;
      } else if (element.name == "perfil" && element.status === 1) {
        this.StatusPerfil = {
          status: "Completo",
          class: "label-success",
          check: true,
        };
        this.contforms = this.contforms + 1;
      } else if (element.name == "feic" && element.status === 1) {
        this.StatusFeic = {
          status: "Completo",
          class: "label-success",
          check: true,
        };
        this.contforms = this.contforms + 1;
      } else if (element.name == "iveproductos" && element.status === 1) {
        this.StatusIve = {
          status: "Completo",
          class: "label-success",
          check: true,
        };
        this.contforms = this.contforms + 1;
      } else if (element.name == "cpe" && element.status === 1) {
        this.StatusCpe = {
          status: "Completo",
          class: "label-success",
          check: true,
        };
        this.contforms = this.contforms + 1;
      } else if (element.name == "pep" && element.status === 1) {
        this.Statuspep = {
          status: "Completo",
          class: "label-success",
          check: true,
        };
        this.contforms = this.contforms + 1;
      } else if (
        element.name == "autorizacionparaconsultas" &&
        element.status === 1
      ) {
        this.StatusAuto = {
          status: "Completo",
          class: "label-success",
          check: true,
        };
        this.contforms = this.contforms + 1;
      } else if (
        element.name == "cartaparaelbancointernacional" &&
        element.status === 1
      ) {
        this.StatusCarta = {
          status: "Completo",
          class: "label-success",
          check: true,
        };
        this.contforms = this.contforms + 1;
      } else if (element.name == "estadopatrimonial" && element.status === 1) {
        this.StatusEstado = {
          status: "Completo",
          class: "label-success",
          check: true,
        };
        this.contforms = this.contforms + 1;
      } else if (element.name == "flujosdefondos" && element.status === 1) {
        this.StatusFlujos = {
          status: "Completo",
          class: "label-success",
          check: true,
        };
        this.contforms = this.contforms + 1;
      } else if (
        element.name == "endeudamientobancario" &&
        element.status === 1
      ) {
        this.StatusEndeudamiento = {
          status: "Completo",
          class: "label-success",
          check: true,
        };
        this.contforms = this.contforms + 1;
      } else if (
        element.name == "formatoparaintegraciones" &&
        element.status === 1
      ) {
        this.StatusFormato = {
          status: "Completo",
          class: "label-success",
          check: true,
        };
        this.contforms = this.contforms + 1;
      } else if (element.name == "registrodedeudores" && element.status === 1) {
        this.StatusDeudores = {
          status: "Completo",
          class: "label-success",
          check: true,
        };
        this.contforms = this.contforms + 1;
      } else if (element.name == "prendaria" && element.status === 1) {
        this.StatusPrendaria = {
          status: "Completo",
          class: "label-success",
          check: true,
        };
        this.contWarranties++;
      } else if (element.name == "hipotecaria" && element.status === 1) {
        this.StatusHipotecaria = {
          status: "Completo",
          class: "label-success",
          check: true,
        };
        this.contWarranties++;
      } else if (element.name == "fiduciaria" && element.status === 1) {
        this.StatusFiduciaria = {
          status: "Completo",
          class: "label-success",
          check: true,
        };
        this.contWarranties++;
      } else if (element.name == "visitasinicial" && element.status === 1) {
        this.StatusVisitasInicial = {
          status: "Completo",
          class: "label-success",
          check: true,
        };
        this.contVerifications++;
      } else if (element.name == "recordcrediticio" && element.status === 1) {
        this.StatusRecordCrediticio = {
          status: "Completo",
          class: "label-success",
          check: true,
        };

      } else if (element.name == "guatecompras" && element.status === 1) {
        this.StatusGuatecompras = {
          status: "Completo",
          class: "label-success",
          check: true,
        };
        this.contVerifications++;
      } else if (element.name == "infornet" && element.status === 1) {
        this.StatusInfornet = {
          status: "Completo",
          class: "label-success",
          check: true,
        };
        this.contVerifications++;
      } else if (element.name == "sat" && element.status === 1) {
        this.StatusSat = {
          status: "Completo",
          class: "label-success",
          check: true,
        };
        this.contVerifications++;
      } else if (element.name == "declaraguate" && element.status === 1) {
        this.StatusDeclaraguate = {
          status: "Completo",
          class: "label-success",
          check: true,
        };
        this.contVerifications++;
      }
    });

  }



  async ngOnInit() {
    this.dateNow = new Date().toISOString().slice(0, 10);
    // this.selectAnalysis = this.pageAnalysis[0]
    //console.log(this.dateNow);
    this.spinner.show();
    //console.log(this.activatedRoute.snapshot);
    this.user_id = this.activatedRoute.snapshot.params.id;
    this.requestIdSelected = this.activatedRoute.snapshot.params.request;
    this.activatedRoute.snapshot.data.urls[1].url = `/customer/cliente/${this.user_id}`;
    this.usersolucredit = true;
    this.selectUser = "";
    //this.initApplicationStuff();
    await this.getLinks()
    await this.getTypeRequest();
    await this.getDataCurrentCostumer();
    await this.selectRequest();
    await this.getPersons();
    await this.getAllCustomerRequest();
    await this.chageTypeWarranties();
    await this.getCurrency();
    await this.getPlaces();
    //Requerimientos Docs
    await this.getRequirementDocVW();
    // await this.getReqDocView();
    //Descarga de DocsReq
    //FormDocs
    //Legal analisis
    // this.getInitCommercialAnalysis();
    // this.getInitLegalAnalysis();
    // this.getInitComplianceVerification();
    // this.getInitCommercialManagerAuthorization();
    // this.getInitGerencialManagerAuthorization()
    // this.getInitCustomerRegistration()
    // await this.listAllReports();
    // await this.listAllGReports();
    // await this.getFormDocVW();
    // await this.getFormDocView();
    // //Initial Relation Docs
    // await this.getIRDocVW();
    // await this.getIRDocView();
    // //Verifications
    // await this.getVerifications();
    //CheckList
    await this.getCheckList()
    // console.log(`Análisis Comercial ${this.dataCA?.id_commercialanalysis}`)
    // console.log('MANDANDO INFORMACIÓN GERENCIAL');
    // console.log(' ------------------------------------------------------- ');
    // console.log(this.gerencial_manager_authorization_dataList);
    // console.log('Mandando todo de autorizacion gerencial / / / / / / /  / / / / / /');
    // console.log(this.gerencialManagerAuthorizationSelected);
    // console.log('Mandando todo de autorizacion gerencial / / / / / / /  / / / / / /');
    // console.log(this.gerencial_manager_authorization_dataList);
    /*await this.mapdata()
    console.log(`Solicitud actual ${this.dataCA.id_request}`)
    console.log(`Análisis Comercial ${this.dataCA.id_commercialanalysis}`)
    console.log('dataCA')
    console.log(this.dataCA)
    console.log('dataCA ID ANALISIS COMERCIAL')
    console.log(this.dataCA.id_commercialanalysis)
    console.log('dataUDCA')
    console.log(this.dataUDCA)
    console.log('DataCommercialAnalysis')
    console.log(this.dataCommercialAnalysis)
    console.log('DataUpload')
    console.log(this.dataUploadDocumentsCA)
    console.log('actualacUDCA')
    console.log(this.actualcaUDCA)
    console.log('Data RequerimentDoc')
    console.log(this.DataReqDoc)
    console.log('Data RequerimentDoc Complete')
    console.log(this.DataReqDocs)
    console.log('Only DocsUpload')
    console.log(this.dataRequestDocView)
    console.log('Docs Actual Request')
    console.log(this.actualReqDoc)
    console.log('Recorrer Docs Actual Request')
    console.log(this.actualReqDoc[0].id_doc)
    console.log(this.actualReqDoc.length)
    console.log('----MANDAR A GETZIP')
    console.log(this.almacena)/*  
    //console.log(this.dataDownReq)

    /* this._sendemail
      .getFormsState(this.requestIdSelected)
      .subscribe((x) => this.checkFormState(x.body.data)); */

    //Llenado Formulario Análisis Comercial
    // if (this.dataCA) {
    //   this.FormCommercialAnalysis.controls['commercialanalysis_comment'].patchValue(this.dataCA.commercialanalysis_comment)
    //   this.FormCommercialAnalysis.controls['id_request'].patchValue(this.dataCA.id_request)
    //   this.FormCommercialAnalysis.controls['id_customer'].patchValue(this.dataCA.id_customer)
    //   this.FormCommercialAnalysis.controls['id_commercialanalysis'].patchValue(this.dataCA.id_commercialanalysis)
    // }
    this.FormEditCustomer.controls['phone'].setValue(this.dataCustomer.phone)
    this.FormEditCustomer.controls['address1'].setValue(this.dataCustomer.address1)
    this.FormEditCustomer.controls['address2'].setValue(this.dataCustomer.address2)
    this.FormEditCustomer.controls['nit'].setValue(this.dataCustomer.nit)
    this.FormEditCustomer.controls['zone'].setValue(this.dataCustomer.zone)
    this.FormEditCustomer.controls['country'].setValue(this.dataCustomer.country)
    this.FormEditCustomer.controls['department'].setValue(this.dataCustomer.department)
    this.FormEditCustomer.controls['municipality'].setValue(this.dataCustomer.municipality)
    this.FormEditCustomer.controls['branchoffice'].setValue(this.dataCustomer.branchoffice)
    this.FormEditCustomer.controls['branchofficecode'].setValue(this.dataCustomer.branchofficecode)
    console.log('Informacion de PERSON');
    console.log(this.dataPersons);
    // this.getLegalAdviser()
    // this.getComplianceVerificationAdviser()
    // await this.getProcessCommercialAnalysis();
    // this.autoMoveTab(this.TabForms)
    //this.ctdTabset.select(this.TabForms)
    await this.autoMove()
    this.spinner.hide()

  }



  getLinks() {
    this._sysLinkService.list(-1, -1, []).toPromise().then((response) => {
      this.links = response.data
    })
  }
  getLink(name) {
    let find = this.links.find(item => item.name == name)
    if (find) {
      return find.link
    }
    return ''
  }
  getCommercialAdviser() {
    let sub = this._adviserService.getCommercialAdviser().pipe(
      map((response) => {
        console.log('#####')
        console.log(response)
        this.listcommercialadviser = response
      }),
      catchError((err) => {
        this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
        return of();
      })
    ).subscribe(() => sub.unsubscribe())
  }
  // getLegalAdviser() {
  //   let sub = this._adviserService.getLegalAdviser().pipe(
  //     map((response) => {
  //       console.log('#####')
  //       console.log(response)
  //       this.listlegaladviser = response
  //       //buscar el responsable predeterminado
  //       for (let i = 0; i < this.listlegaladviser.length; i++) {
  //         if (this.listlegaladviser[i].is_default == 1) {
  //           this.initLegalAnalysisForm.controls['id_adviser'].setValue(this.listlegaladviser[i].id_adviser)
  //         }
  //       }
  //     }),
  //     catchError((err) => {
  //       this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
  //       return of();
  //     })
  //   ).subscribe(() => sub.unsubscribe())
  // }
  // getComplianceVerificationAdviser() {
  //   let sub = this._adviserService.getComplianceAdviser().pipe(
  //     map((response) => {
  //       this.listcomplianceverificationadviser = response
  //       for (let i = 0; i < this.listcomplianceverificationadviser.length; i++) {
  //         if (this.listcomplianceverificationadviser[i].is_default == 1) {
  //           this.initComplianceVerificationForm.controls['id_adviser'].setValue(this.listcomplianceverificationadviser[i].id_adviser)
  //         }
  //       }
  //     }), catchError((err) => {
  //       this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
  //       return of();
  //     })
  //   ).subscribe(() => sub.unsubscribe())
  // }

  // onCreate() {

  //   let aditionalrev: AditionalRev = {
  //     aditionalrev_comment: this.FormAditionalRev.controls.aditionalrev_comment.value,
  //     id_commercialanalysis: this.dataCA.id_commercialanalysis
  //   }
  //   console.log(aditionalrev)
  //   let subscription = this._adrev.saveAditionalRev(aditionalrev).pipe(map((resp) => {
  //     this.closeBtnClick();
  //     this.FormAditionalRev.reset({});
  //     this.toastr.success('Éxito', 'Se ha notificado sobre la revisión adicional');
  //     this.ngOnInit
  //   }),
  //     catchError((err) => {
  //       this.toastr.error('Error', 'Problemas con el Servidor');
  //       return of();
  //     })
  //   ).subscribe(() => subscription.unsubscribe());
  // }

  async uploadDocCheckList(event, ver, doc) {
    if (event.target.files && event.target.files[0]) {

      let id = this.dataDoc.id_checklist;
      let idca = this.dataDoc.id_commercialanalysis;
      const named = this.filenameS.generateName() + "_" + event.target.files[0].name;
      const typed = event.target.files[0].type;
      var reader = new FileReader();
      reader.onload = async (event: any) => {
        let data = {
          document: event.target.result,
          namedoc: named,
          type: typed,
          id_checklist: id,
          id_commercialanalysis: idca,
          checklist_comment: this.FormCheckListCA.get('checklist_comment').value
        };
        console.log(data)
        this._CheckCA
          .uploadDocsC(data)
          .pipe(
            map((data) => {
              console.log('Documento Subido');
              this.toastr.success('Éxito', 'Se ha agregado el documento correctamente.');
              console.log('Documento Subido')
              console.log(data)
              this.FormCheckListCA.reset();
              //this.ngOnInit()
              // this.reloadDataModal()
              this.closeBtnClick()
            }),
            catchError((err) => {
              this.toastr.error(
                'Error',
                'Ha ocurrido un problema con la conexión ' + err
              );
              console.log(err);
              return of();
            })
          )
          .subscribe((data) => { });
      };
      await reader.readAsDataURL(event.target.files[0]);
      event.srcElement.value = null;
      console.log('Aqui pasa directamente')
    }
  }

  // onChangeStatusCheckListNo(doc) {
  //   //Verificar Existencia Documento
  //   //debugger
  //   let id = doc.id;
  //   let docname = doc.doc_type;
  //   let verifica = doc.verification
  //   console.log(doc)
  //   this._VerificationService.getCheck(id, docname, doc.id_commercialanalysis).subscribe((c) => {
  //     console.log(c)
  //     if (c === true) {
  //       console.log('Documento existente')
  //       //Actualizar Estado
  //       if (doc.TYPE === 'INITIALRELATION') {
  //         this.checkListType = 1;
  //       }
  //       else if (doc.TYPE === 'FORM') {
  //         this.checkListType = 2;
  //       }
  //       else if (doc.TYPE === 'REQUIREMENT') {
  //         this.checkListType = 3;
  //       }
  //       if (verifica === 1) {
  //         let data: CheckListCommercialAnalysis = {
  //           id_checklist: doc.id_checklist,
  //           id_commercialanalysis: doc.id_commercialanalysis,
  //           checklist_typedoc: this.checkListType,
  //           checklist_verification: 0
  //         }
  //         this._CheckCA
  //           .updateCheck(data)
  //           .pipe(
  //             map((data) => {
  //               this.toastr.success('Se ha cambiado el estado', `Verificado`)
  //               // this.reloadDataModalChecklist(this.targetReport)
  //               this.reloadDataModal()
  //             }),
  //             catchError((err) => {
  //               this.toastr.error(
  //                 'Error',
  //                 'Ha ocurrido un problema con la conexión ' + err
  //               );
  //               console.log(err);
  //               return of();
  //             })
  //           ).subscribe((data) => { });
  //       }
  //       else {
  //         let data: CheckListCommercialAnalysis = {
  //           id_checklist: doc.id_checklist,
  //           id_commercialanalysis: doc.id_commercialanalysis,
  //           checklist_typedoc: this.checkListType,
  //           checklist_verification: 1
  //         }
  //         this._CheckCA
  //           .updateCheck(data)
  //           .pipe(
  //             map((data) => {
  //               this.toastr.success('Se ha cambiado el estado', `No Verificado`)
  //               //this.reloadDataModalChecklist(this.targetReport)
  //               this.reloadDataModal()
  //             }),
  //             catchError((err) => {
  //               this.toastr.error(
  //                 'Error',
  //                 'Ha ocurrido un problema con la conexión ' + err
  //               );
  //               console.log(err);
  //               return of();
  //             })
  //           ).subscribe((data) => { });
  //       }
  //     }
  //     else {
  //       //Actualiza estado en CheckList
  //       if (doc.TYPE === 'INITIALRELATION') {
  //         this.checkListType = 1;
  //         console.log(this.checkListType)
  //       }
  //       else if (doc.TYPE === 'FORM') {
  //         this.checkListType = 2;
  //         console.log(this.checkListType)
  //       }
  //       else if (doc.TYPE === 'REQUIREMENT') {
  //         this.checkListType = 3;
  //         console.log(this.checkListType)
  //       }
  //       console.log(this.checkListType)
  //       //Crear en CheckListCA
  //       let newDoc: CheckListCommercialAnalysis = {
  //         id_doc: doc.id,
  //         id_commercialanalysis: doc.id_commercialanalysis,
  //         checklist_typedoc: this.checkListType,
  //         checklist_docname: doc.doc_type,
  //         checklist_verification: 0
  //       }
  //       console.log(newDoc)
  //       let susbscription = this._CheckCA.saveCheck(
  //         newDoc).pipe(
  //           map((resp) => {
  //             this.toastr.success('Verificado', 'Se ha cambiado el estado')
  //             //this.reloadDataModalChecklist(this.targetReport)
  //             this.reloadDataModal()
  //           })
  //         ).subscribe(() => susbscription.unsubscribe())
  //     }
  //   })
  // }

  // onChangeStatusCheckList(doc) {
  //   //Verificar Existencia Documento

  //   let id = doc.id;
  //   let docname = doc.doc_type;
  //   let verifica = doc.verification
  //   console.log(doc)
  //   this._VerificationService.getCheck(id, docname, doc.id_commercialanalysis).subscribe((c) => {
  //     console.log(c)
  //     if (c === true) {
  //       console.log('Documento existente')
  //       //Actualizar Estado
  //       if (doc.TYPE === 'INITIALRELATION') {
  //         this.checkListType = 1;
  //       }
  //       else if (doc.TYPE === 'FORM') {
  //         this.checkListType = 2;
  //       }
  //       else if (doc.TYPE === 'REQUIREMENT') {
  //         this.checkListType = 3;
  //       }
  //       if (verifica === 0) {
  //         let data: CheckListCommercialAnalysis = {
  //           id_checklist: doc.id_checklist,
  //           id_commercialanalysis: doc.id_commercialanalysis,
  //           checklist_typedoc: this.checkListType,
  //           checklist_verification: 1
  //         }
  //         this._CheckCA
  //           .updateCheck(data)
  //           .pipe(
  //             map((data) => {
  //               this.toastr.success('Se ha cambiado el estado', `Verificado`)
  //               // this.reloadDataModalChecklist(this.targetReport)
  //               this.reloadDataModal()

  //             }),
  //             catchError((err) => {
  //               this.toastr.error(
  //                 'Error',
  //                 'Ha ocurrido un problema con la conexión ' + err
  //               );
  //               console.log(err);
  //               return of();
  //             })
  //           ).subscribe((data) => { });
  //       }
  //       else {
  //         let data: CheckListCommercialAnalysis = {
  //           id_checklist: doc.id_checklist,
  //           id_commercialanalysis: doc.id_commercialanalysis,
  //           checklist_typedoc: this.checkListType,
  //           checklist_verification: 0
  //         }
  //         this._CheckCA
  //           .updateCheck(data)
  //           .pipe(
  //             map((data) => {
  //               this.toastr.success('Se ha cambiado el estado', `No Verificado`)
  //               //this.reloadDataModalChecklist(this.targetReport)
  //               this.reloadDataModal()
  //             }),
  //             catchError((err) => {
  //               this.toastr.error(
  //                 'Error',
  //                 'Ha ocurrido un problema con la conexión ' + err
  //               );
  //               console.log(err);
  //               return of();
  //             })
  //           ).subscribe((data) => { });
  //       }
  //     }
  //     else {
  //       //Actualiza estado en CheckList
  //       if (doc.TYPE === 'INITIALRELATION') {
  //         this.checkListType = 1;
  //         console.log(this.checkListType)
  //       }
  //       else if (doc.TYPE === 'FORM') {
  //         this.checkListType = 2;
  //         console.log(this.checkListType)
  //       }
  //       else if (doc.TYPE === 'REQUIREMENT') {
  //         this.checkListType = 3;
  //         console.log(this.checkListType)
  //       }
  //       console.log(this.checkListType)
  //       //Crear en CheckListCA
  //       let newDoc: CheckListCommercialAnalysis = {
  //         id_doc: doc.id,
  //         id_commercialanalysis: doc.id_commercialanalysis,
  //         checklist_typedoc: this.checkListType,
  //         checklist_docname: doc.doc_type,
  //         checklist_verification: 1
  //       }
  //       console.log(newDoc)
  //       let susbscription = this._CheckCA.saveCheck(
  //         newDoc).pipe(
  //           map((resp) => {
  //             this.toastr.success('Verificado', 'Se ha cambiado el estado')
  //             //this.reloadDataModalChecklist(this.targetReport)
  //             this.reloadDataModal()
  //           })
  //         ).subscribe(() => susbscription.unsubscribe())
  //     }
  //   })
  // }

  getCheckList() {
    this._CheckCA.getCheckList(this.pageSize, 0, []).subscribe((c) => {
      console.log(c)
    })
  }

  // getVerifications() {
  //   this._VerificationService.getVerifications(-1, -1, []).subscribe((c) => {
  //     this.DataVerification = c
  //     this.dataVerificationView = this.DataVerification.docs
  //     if (this.dataCA)
  //       this.actualVerificationsDoc = this.dataVerificationView.filter(e => e.id_commercialanalysis == this.dataCA.id_commercialanalysis && e.type_analysis == 'COMERCIAL')
  //   })
  // }

  // getIRDocView() {
  //   this._IRDocService.getDocs(this.requestIdSelected, 'Comercial').subscribe((c) => {
  //     this.DataIRDocs = c
  //     this.dataRequestIRView = this.DataIRDocs
  //     if (this.dataCA)
  //       this.actualIRDoc = this.dataRequestIRView.filter(e => e.id_commercialanalysis === this.dataCA.id_commercialanalysis)
  //   })
  // }
  // getIRDocVW() {
  //   let actualRequest = this.requestIdSelected
  //   this._IRDocService.getIRDoc(actualRequest).subscribe((c) => {
  //     this.DataIRDoc = c
  //   })
  // }

  // getFormDocView() {
  //   try {
  //     this._FormDocService.getDocs(this.requestIdSelected, 'Comercial').subscribe((c) => {
  //       this.DataFormDocs = c
  //       this.dataRequestFormView = this.DataFormDocs
  //       console.log('Mandando documentos de Formularios');
  //       console.log(this.dataRequestFormView)
  //       if (this.dataCA)
  //         this.actualFormDoc = this.dataRequestFormView.filter(e => e.id_commercialanalysis === this.dataCA.id_commercialanalysis)
  //     })
  //   }
  //   catch (err) {
  //     this.toastr.error("No existen Formularios")
  //     console.log(err)
  //     throw err
  //   }
  // }
  // getFormDocVW() {
  //   let actualRequest = this.requestIdSelected
  //   this._FormDocService.getFormDoc(actualRequest).subscribe((c) => {
  //     this.DataFormDoc = c
  //   })
  // }
  // //Trae los Requisitos y rutas desde el view
  // getReqDocView() {
  //   try {
  //     this._ReqDocService.getDocs(this.requestIdSelected).subscribe((c) => {
  //       this.DataReqDocs = c
  //       this.dataRequestDocView = this.DataReqDocs
  //       console.log('Mandando Documentos Requisitos');
  //       console.log(this.dataRequestDocView);
  //       if (this.dataCA)
  //         this.actualReqDoc = this.dataRequestDocView.filter(e => e.id_request === this.dataCA.id_request)
  //     })
  //   }
  //   catch (err) {
  //     console.log(err)
  //     this.toastr.error("No existen Formularios")
  //     throw err
  //   }
  // }
  //Llamar datos desde ReqDocVW
  getRequirementDocVW() {
    let actualRequest = this.requestIdSelected
    this._ReqDocService.getReqDoc(actualRequest).subscribe((c) => {
      this.DataReqDoc = c
    })
  }
  downloadDocIR() {
    this.almacenaIR = this.actualIRDoc.map(e => { return { key: e.s3key, document_name: e.filename } })
    console.log(this.almacenaIR)
    this.mysqlService
      .downloadDocIR(this.dataCustomer.customer_id, this.requestIdSelected)
    this.toastr.success('Éxito', 'Se han descargado los documentos')
  }
  // downloadDocForms() {
  //   this.almacenaDocs = this.actualFormDoc.map(e => { return { key: e.s3key, document_name: e.filename } })
  //   this.mysqlService
  //     .downloadDocForm(this.almacenaDocs)
  //   this.toastr.success('Éxito', 'Se han descargado los documentos')
  // }
  // downloadDocRequirements() {
  //   this.almacenaReq = this.actualReqDoc.map(e => { return { key: e.s3key, document_name: e.filename } })
  //   console.log(this.almacenaReq)
  //   this.mysqlService
  //     .downloadDocReq(this.almacenaReq)
  //   this.toastr.success('Éxito', 'Se han descargado los documentos')
  // }
  // //Guardar cambios de Análisis Comercial
  // saveChangesCA() {
  //   this._CASevice.updateCA(this.FormCommercialAnalysis.value).pipe(
  //     map((resp) => {
  //       this.toastr.success('Éxito', 'Se ha actualizado el Análisis Comercial');
  //       this.getCA(this.dataCA.id_commercialanalysis)
  //     }),
  //     catchError((err) => {
  //       this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
  //       return of();
  //     })
  //   ).subscribe()
  // }
  // getActualCommercialAnalysis() {
  //   let id = this.requestIdSelected
  //   this._CASevice.getOneCA(id).subscribe((c) => {
  //     this.dataCA = c
  //     if (this.disableView(AnalysisOption.form)) {
  //       this.commercialA = 0
  //     } else {
  //       this.commercialA = 1
  //     }

  //     console.log(this.commercialA)
  //     console.log(this.dataCA = c)
  //   }),
  //     catchError((error) => {
  //       this.commercialA = 0
  //       this.toastr.error('AnalisisComercial no Iniciado' + error.message)
  //       return of();
  //     })
  // }
  // //UploadFiles
  // deleteDocCA(doc, target = '') {
  //   this.targetUploadDocuments = target
  //   this.dataUploadDocumentsCA = this.dataUploadDocumentsCA.filter(
  //     (f) => f.id_uploaddocsca != doc.id_uploaddocsca
  //   );
  //   this.mysqlService
  //     .deleteDocsCA(doc.id_uploaddocsca)
  //     .toPromise()
  //     .then(async (response) => {
  //       this.toastr.success("Se ha eliminado el Documento", "Documento Eliminado!")
  //       // this.ngOnInit();
  //       this.reloadDataModal()
  //       this.reloadAnalyisis()

  //     })
  //     .catch((error) => {
  //       this.toastr.error("Problemas con el servidor.", "Ha ocurrido un error")
  //       console.log(error)
  //     })
  // }
  // getidanalysis() {
  //   switch (this.targetUploadDocuments) {
  //     case 'Comercial':
  //       return this.dataCA.id_commercialanalysis
  //     case 'Legal':
  //       return this.legalAnalysisSelected.id_commercialanalysis
  //     case 'Cumplimiento':
  //       return this.complianceVerificationSelected.id_commercialanalysis
  //     case 'Gerente Comercial':
  //       return this.commercialManagerAuthorizationSelected.id_commercialanalysis
  //     case 'Gerente General':
  //       return this.gerencialManagerAuthorizationSelected.id_commercialanalysis
  //     case 'Alta Cliente':
  //       return this.customerRegistrationSelected.id_commercialanalysis
  //   }
  // }
  // reloadAnalyisis() {
  //   switch (this.targetUploadDocuments) {
  //     case 'Legal':
  //       this.getAllLegalAnalysisInfo();
  //       break
  //     case 'Cumplimiento':
  //       this.getAllComplianceVerificationInfo();
  //       break
  //     case 'Comercial':
  //       this.getAllCommercialAnalysisInfo()
  //       break
  //     case 'Gerente Comercial':
  //       this.getAllCommercialManagerAuthorizationInfo();
  //       break
  //     case 'Gerente General':
  //       this.getAllGerencialManagerAuthorizationInfo();
  //       break
  //     case 'Alta Cliente':
  //       this.getAllCustomerRegistrationInfo();
  //     //Metodo de informacion comercial
  //   }
  // }
  // async uploadDocsCA(event, nspinner) {

  //   if (event.target.files && event.target.files[0]) {
  //     const named = this.filenameS.generateName() + "_" + event.target.files[0].name;
  //     const typed = event.target.files[0].type;
  //     var reader = new FileReader();
  //     reader.onload = async (event: any) => {
  //       let data =
  //       {
  //         document: event.target.result,
  //         namedoc: named,
  //         type: typed,
  //         id_commercialanalisys: this.getidanalysis(),
  //         comment: this.FormUploadDocumentsCA.get('uploaddocsca_comment').value
  //       };
  //       this.spinner.show(nspinner);

  //       this.mysqlService
  //         .uploadDocsCA(data)
  //         .pipe(
  //           map((data) => {
  //             console.log('Documento Subido');
  //             this.toastr.success('Éxito', 'Se ha agregado el documento correctamente.');
  //             console.log(data.data);
  //             this.FormUploadDocumentsCA.reset();
  //             this.spinner.hide(nspinner);
  //             this.closeBtnClick();
  //             //this.ngOnInit();
  //             this.reloadAnalyisis()
  //           }),
  //           catchError((err) => {
  //             this.toastr.error(
  //               'Error',
  //               'Ha ocurrido un problema con la conexión ' + err
  //             );
  //             console.log(err);
  //             this.spinner.hide(nspinner);
  //             return of();
  //           })
  //         )
  //         .subscribe((data) => { });
  //     };
  //     await reader.readAsDataURL(event.target.files[0]);
  //     event.srcElement.value = null;
  //   }
  // }

  canListDoc(): boolean {
    let resource = 'CLIENT';
    return this.autorization.havePermission(resource, 'LIST_DEB');
  }
  // getDocsU(searchItem) {
  //   this._UPSevice.getUploadDocuments(this.pageSize, (this.page - 1) * this.pageSize, searchItem).pipe(
  //     map((udca) => {
  //       this.dataList.data = udca.uploaddocumentsca;
  //       this.totalDataUDCA = udca.count;
  //     }),
  //     catchError((err) => {
  //       console.log(err)
  //       return of();
  //     })
  //   ).subscribe();
  // }

  // getDocs() {
  //   this._UPSevice.getUploadDocuments(this.pageSize, 0, this.selectUser).subscribe((uploaddocumentsca) => {
  //     this.dataUDCA = uploaddocumentsca
  //     this.dataUploadDocumentsCA = this.dataUDCA.uploaddca
  //     if (this.dataCA)
  //       this.actualcaUDCA = this.dataUploadDocumentsCA.filter(e => e.id_commercialanalisys === this.dataCA.id_commercialanalysis)
  //   })
  // }
  //Muestra analisis comercial según solicitud 
  //dataCA almacena el vector y actualCA unicamente la solucitud
  getCA(searchItem) {
    this._CASevice.getCA(this.pageSize, (this.page - 1) * this.pageSize, searchItem).pipe(
      map((ca) => {

      }),
      catchError((err) => {
        console.log(err)
        return of();
      })
    ).subscribe();
  }
  // getProcessCommercialAnalysis() {
  //   let actualRequest = this.requestIdSelected
  //   let ca = this.dataCommercialAnalysis
  //   this.onProcessCA = ca.indexOf(actualRequest)
  // }
  // getCommercialAnalysis() {
  //   this._CASevice.getCA(this.pageSize, 0, []).subscribe((c) => {
  //     this.dataCommercialAnalysis = c.commercialanalysis;
  //   })
  // }
  // createCommercialAnalysis() {
  //   let value = this.initCommercialAnalysisForm.value
  //   let newCommercialAnalysis: CommercialAnalysis = {
  //     id_request: this.requestIdSelected,
  //     id_customer: this.dataCustomer.customer_id,
  //     analysis_type: 1,
  //     analysis_status_id: 1
  //   };
  //   console.log(value)
  //   if (this.initCommercialAnalysis == false) {
  //     let subscription = this._CASevice.saveCA(newCommercialAnalysis).pipe(
  //       map((resp) => {
  //         console.log(resp)
  //         let newadviser: AdviserAnalysis = {
  //           id_adviser: value.id_adviser,
  //           id_commercialanalysis: resp.id_commercialanalysis,
  //           priority: 1
  //         }
  //         this.closeBtnClick();
  //         this.toastr.success('Éxito', 'Se ha iniciado el análisis comercial');
  //         this.initCommercialAnalysis == true;
  //         let sub = this._legalAnalysis.addAdviser(newadviser, value.id_adviser).pipe(
  //           map((response) => {
  //             console.log(response)
  //             this.toastr.success(`Ha sido asignado el asesor`, 'Éxito');
  //             this.ngOnInit()
  //           }),
  //           catchError((error) => {
  //             this.toastr.error('Error', 'No se ha podido asignar el asesor');
  //             console.log(error)
  //             return of();
  //           })
  //         ).subscribe(() => sub.unsubscribe())
  //       }),
  //       catchError((err) => {
  //         //this.spinner.hide();
  //         this.toastr.error('error', 'Ocurrió un error');
  //         console.log(err);
  //         return of();
  //       })
  //     ).subscribe(() => subscription.unsubscribe());
  //   } else {
  //     //si ya existe reasignamos
  //     let subscription = this._legalAnalysis.updateAdviser(parseInt(this.requestIdSelected), value.id_adviser, Analysis.commercial_assistant_analysis, '').pipe(
  //       map((resp) => {
  //         this.toastr.success(`Ha sido asignado el asesor`, 'Éxito')
  //         this.ngOnInit()
  //       }),
  //       catchError((error) => {
  //         this.toastr.error('Error', 'No se ha podido asignar el asesor');
  //         console.log(error)
  //         return of();
  //       })
  //     ).subscribe(() => subscription.unsubscribe())
  //   }

  // }
  getPlaces() {
    this._inspection_place.getList(-1, 0, []).subscribe((c) => {
      this.dataInspectionPlace = c.inspection_place;
    })
  }
  getCurrency() {
    this._currency.getCurrency(this.pageSize, 0, []).subscribe((c) => {
      this.dataCurrency = c.currency;
    })
  }

  async getAllCustomerRequest() {
    const res = this.mysqlService
      .GetCustomerRequest(this.user_id)
      .toPromise()
      .then(async (response) => {
        this.dataRequest = response.data.request;
        if (this.dataRequest) {
          this.lastrequest = response.data.request[this.dataRequest.length - 1];
          console.log('Mandando Informacion de la ultima solicitud');
          console.log(this.lastrequest);
          this.logdataRequest = response.data.logrequest;
        }

        await this.CheckStatusRequest(this.dataRequest);
        // this.spinner.hide()
      })
      .catch((error) => {
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
    return res;
  }

  async onCheckboxChange(e, locationd, documenttype, nspinner) {
    this.spinner.show(nspinner);
    console.log(e.target.value.toLowerCase() + " " + e.target.checked);
    e.target.checked == true ? this.contVerifications++ : this.contVerifications--;

    if (
      e.target.value.toLowerCase() == "solicitud" &&
      e.target.checked == true
    ) {
      this.mysqlService
        .CreateStatusDocument({
          customer_id: this.user_id,
          name: "solicitud",
          status: 1,
          request_id: this.requestIdSelected,
        })
        .toPromise()
        .then((response) => {
          this.StatusSolicitud.class = "label-success";
          this.StatusSolicitud.status = "Completo";
          this.StatusSolicitud.check = true;
          this.spinner.hide(nspinner);
        })
        .catch((error) => {
          this.spinner.hide(nspinner);
          this.toastr.error("Problemas con el servidor.", "Oops!");
        });
    } else if (e.target.value.toLowerCase() == "solicitud") {
      this.mysqlService
        .CreateStatusDocument({
          customer_id: this.user_id,
          name: "solicitud",
          status: 0,
          request_id: this.requestIdSelected,
        })
        .toPromise()
        .then((response) => {
          this.StatusSolicitud.class = "label-warning";
          this.StatusSolicitud.status = "Pendiente";
          this.StatusSolicitud.check = false;
          this.spinner.hide(nspinner);
        })
        .catch((error) => {
          this.spinner.hide(nspinner);
          this.toastr.error("Problemas con el servidor.", "Oops!");
        });
    }

    if (e.target.value.toLowerCase() == "perfil" && e.target.checked == true) {
      this.mysqlService
        .CreateStatusDocument({
          customer_id: this.user_id,
          name: "perfil",
          status: 1,
          request_id: this.requestIdSelected,
        })
        .toPromise()
        .then((response) => {
          this.StatusPerfil.class = "label-success";
          this.StatusPerfil.status = "Completo";
          this.StatusPerfil.check = true;
          this.spinner.hide(nspinner);
        })
        .catch((error) => {
          this.spinner.hide(nspinner);
          this.toastr.error("Problemas con el servidor.", "Oops!");
        });
    } else if (e.target.value.toLowerCase() == "perfil") {
      this.mysqlService
        .CreateStatusDocument({
          customer_id: this.user_id,
          name: "perfil",
          status: 0,
          request_id: this.requestIdSelected,
        })
        .toPromise()
        .then((response) => {
          this.StatusPerfil.class = "label-warning";
          this.StatusPerfil.status = "Pendiente";
          this.StatusPerfil.check = false;
          this.spinner.hide(nspinner);
        })
        .catch((error) => {
          this.spinner.hide(nspinner);
          this.toastr.error("Problemas con el servidor.", "Oops!");
        });
    }

    if (e.target.value.toLowerCase() == "feic" && e.target.checked == true) {
      this.mysqlService
        .CreateStatusDocument({
          customer_id: this.user_id,
          name: "feic",
          status: 1,
          request_id: this.requestIdSelected,
        })
        .toPromise()
        .then((response) => {
          this.StatusFeic.class = "label-success";
          this.StatusFeic.status = "Completo";
          this.StatusFeic.check = true;
          this.spinner.hide(nspinner);
        })
        .catch((error) => {
          this.spinner.hide(nspinner);
          this.toastr.error("Problemas con el servidor.", "Oops!");
        });
    } else if (e.target.value.toLowerCase() == "feic") {
      this.mysqlService
        .CreateStatusDocument({
          customer_id: this.user_id,
          name: "feic",
          status: 0,
          request_id: this.requestIdSelected,
        })
        .toPromise()
        .then((response) => {
          this.StatusFeic.class = "label-warning";
          this.StatusFeic.status = "Pendiente";
          this.StatusFeic.check = false;
          this.spinner.hide(nspinner);
        })
        .catch((error) => {
          this.spinner.hide(nspinner);
          this.toastr.error("Problemas con el servidor.", "Oops!");
        });
    }

    if (
      e.target.value.toLowerCase() == "iveproductos" &&
      e.target.checked == true
    ) {
      this.mysqlService
        .CreateStatusDocument({
          customer_id: this.user_id,
          name: "iveproductos",
          status: 1,
          request_id: this.requestIdSelected,
        })
        .toPromise()
        .then((response) => {
          this.StatusIve.class = "label-success";
          this.StatusIve.status = "Completo";
          this.StatusIve.check = true;
          this.spinner.hide(nspinner);
        })
        .catch((error) => {
          this.spinner.hide(nspinner);
          this.toastr.error("Problemas con el servidor.", "Oops!");
        });
    } else if (e.target.value.toLowerCase() == "iveproductos") {
      this.mysqlService
        .CreateStatusDocument({
          customer_id: this.user_id,
          name: "iveproductos",
          status: 0,
          request_id: this.requestIdSelected,
        })
        .toPromise()
        .then((response) => {
          this.StatusIve.class = "label-warning";
          this.StatusIve.status = "Pendiente";
          this.StatusIve.check = false;
          this.spinner.hide(nspinner);
        })
        .catch((error) => {
          this.spinner.hide(nspinner);
          this.toastr.error("Problemas con el servidor.", "Oops!");
        });
    }

    if (e.target.value.toLowerCase() == "cpe" && e.target.checked == true) {
      this.mysqlService
        .CreateStatusDocument({
          customer_id: this.user_id,
          name: "cpe",
          status: 1,
          request_id: this.requestIdSelected,
        })
        .toPromise()
        .then((response) => {
          this.StatusCpe.class = "label-success";
          this.StatusCpe.status = "Completo";
          this.StatusCpe.check = true;
          this.spinner.hide(nspinner);
        })
        .catch((error) => {
          this.spinner.hide(nspinner);
          this.toastr.error("Problemas con el servidor.", "Oops!");
        });
    } else if (e.target.value.toLowerCase() == "cpe") {
      this.mysqlService
        .CreateStatusDocument({
          customer_id: this.user_id,
          name: "cpe",
          status: 0,
          request_id: this.requestIdSelected,
        })
        .toPromise()
        .then((response) => {
          this.StatusCpe.class = "label-warning";
          this.StatusCpe.status = "Pendiente";
          this.StatusCpe.check = false;
          this.spinner.hide(nspinner);
        })
        .catch((error) => {
          this.spinner.hide(nspinner);
          this.toastr.error("Problemas con el servidor.", "Oops!");
        });
    }

    if (e.target.value.toLowerCase() == "pep" && e.target.checked == true) {
      this.mysqlService
        .CreateStatusDocument({
          customer_id: this.user_id,
          name: "pep",
          status: 1,
          request_id: this.requestIdSelected,
        })
        .toPromise()
        .then((response) => {
          console.log("entre", response);
          this.Statuspep.class = "label-success";
          this.Statuspep.status = "Completo";
          this.Statuspep.check = true;
          this.spinner.hide(nspinner);
        })
        .catch((error) => {
          this.spinner.hide(nspinner);
          this.toastr.error("Problemas con el servidor.", "Oops!");
        });
    } else if (e.target.value.toLowerCase() == "pep") {
      this.mysqlService
        .CreateStatusDocument({
          customer_id: this.user_id,
          name: "pep",
          status: 0,
          request_id: this.requestIdSelected,
        })
        .toPromise()
        .then((response) => {
          this.Statuspep.class = "label-warning";
          this.Statuspep.status = "Pendiente";
          this.Statuspep.check = false;
          this.spinner.hide(nspinner);
        })
        .catch((error) => {
          this.spinner.hide(nspinner);
          this.toastr.error("Problemas con el servidor.", "Oops!");
        });
    }

    if (
      e.target.value.toLowerCase() == "autorizacionparaconsultas" &&
      e.target.checked == true
    ) {
      this.mysqlService
        .CreateStatusDocument({
          customer_id: this.user_id,
          name: "autorizacionparaconsultas",
          status: 1,
          request_id: this.requestIdSelected,
        })
        .toPromise()
        .then((response) => {
          this.StatusAuto.class = "label-success";
          this.StatusAuto.status = "Completo";
          this.StatusAuto.check = true;
          this.spinner.hide(nspinner);
        })
        .catch((error) => {
          this.spinner.hide(nspinner);
          this.toastr.error("Problemas con el servidor.", "Oops!");
        });
    } else if (e.target.value.toLowerCase() == "autorizacionparaconsultas") {
      this.mysqlService
        .CreateStatusDocument({
          customer_id: this.user_id,
          name: "autorizacionparaconsultas",
          status: 0,
          request_id: this.requestIdSelected,
        })
        .toPromise()
        .then((response) => {
          this.StatusAuto.class = "label-warning";
          this.StatusAuto.status = "Pendiente";
          this.StatusAuto.check = false;
          this.spinner.hide(nspinner);
        })
        .catch((error) => {
          this.spinner.hide(nspinner);
          this.toastr.error("Problemas con el servidor.", "Oops!");
        });
    }

    if (
      e.target.value.toLowerCase() == "cartaparaelbancointernacional" &&
      e.target.checked == true
    ) {
      this.mysqlService
        .CreateStatusDocument({
          customer_id: this.user_id,
          name: "cartaparaelbancointernacional",
          status: 1,
          request_id: this.requestIdSelected,
        })
        .toPromise()
        .then((response) => {
          this.StatusCarta.class = "label-success";
          this.StatusCarta.status = "Completo";
          this.StatusCarta.check = true;
          this.spinner.hide(nspinner);
        })
        .catch((error) => {
          this.spinner.hide(nspinner);
          this.toastr.error("Problemas con el servidor.", "Oops!");
        });
    } else if (
      e.target.value.toLowerCase() == "cartaparaelbancointernacional"
    ) {
      this.mysqlService
        .CreateStatusDocument({
          customer_id: this.user_id,
          name: "cartaparaelbancointernacional",
          status: 0,
          request_id: this.requestIdSelected,
        })
        .toPromise()
        .then((response) => {
          this.StatusCarta.class = "label-warning";
          this.StatusCarta.status = "Pendiente";
          this.StatusCarta.check = false;
          this.spinner.hide(nspinner);
        })
        .catch((error) => {
          this.spinner.hide(nspinner);
          this.toastr.error("Problemas con el servidor.", "Oops!");
        });
    }

    if (
      e.target.value.toLowerCase() == "estadopatrimonial" &&
      e.target.checked == true
    ) {
      this.mysqlService
        .CreateStatusDocument({
          customer_id: this.user_id,
          name: "estadopatrimonial",
          status: 1,
          request_id: this.requestIdSelected,
        })
        .toPromise()
        .then((response) => {
          this.StatusEstado.class = "label-success";
          this.StatusEstado.status = "Completo";
          this.StatusEstado.check = true;
          this.spinner.hide(nspinner);
        })
        .catch((error) => {
          this.spinner.hide(nspinner);
          this.toastr.error("Problemas con el servidor.", "Oops!");
        });
    } else if (e.target.value.toLowerCase() == "estadopatrimonial") {
      this.mysqlService
        .CreateStatusDocument({
          customer_id: this.user_id,
          name: "estadopatrimonial",
          status: 0,
          request_id: this.requestIdSelected,
        })
        .toPromise()
        .then((response) => {
          this.StatusEstado.class = "label-warning";
          this.StatusEstado.status = "Pendiente";
          this.StatusEstado.check = false;
          this.spinner.hide(nspinner);
        })
        .catch((error) => {
          this.spinner.hide(nspinner);
          this.toastr.error("Problemas con el servidor.", "Oops!");
        });
    }

    if (
      e.target.value.toLowerCase() == "flujosdefondos" &&
      e.target.checked == true
    ) {
      this.mysqlService
        .CreateStatusDocument({
          customer_id: this.user_id,
          name: "flujosdefondos",
          status: 1,
          request_id: this.requestIdSelected,
        })
        .toPromise()
        .then((response) => {
          this.StatusFlujos.class = "label-success";
          this.StatusFlujos.status = "Completo";
          this.StatusFlujos.check = true;
          this.spinner.hide(nspinner);
        })
        .catch((error) => {
          this.spinner.hide(nspinner);
          this.toastr.error("Problemas con el servidor.", "Oops!");
        });
    } else if (e.target.value.toLowerCase() == "flujosdefondos") {
      this.mysqlService
        .CreateStatusDocument({
          customer_id: this.user_id,
          name: "flujosdefondos",
          status: 0,
          request_id: this.requestIdSelected,
        })
        .toPromise()
        .then((response) => {
          this.StatusFlujos.class = "label-warning";
          this.StatusFlujos.status = "Pendiente";
          this.StatusFlujos.check = false;
          this.spinner.hide(nspinner);
        })
        .catch((error) => {
          this.spinner.hide(nspinner);
          this.toastr.error("Problemas con el servidor.", "Oops!");
        });
    }

    if (
      e.target.value.toLowerCase() == "endeudamientobancario" &&
      e.target.checked == true
    ) {
      this.mysqlService
        .CreateStatusDocument({
          customer_id: this.user_id,
          name: "endeudamientobancario",
          status: 1,
          request_id: this.requestIdSelected,
        })
        .toPromise()
        .then((response) => {
          this.StatusEndeudamiento.class = "label-success";
          this.StatusEndeudamiento.status = "Completo";
          this.StatusEndeudamiento.check = true;
          this.spinner.hide(nspinner);
        })
        .catch((error) => {
          this.spinner.hide(nspinner);
          this.toastr.error("Problemas con el servidor.", "Oops!");
        });
    } else if (e.target.value.toLowerCase() == "endeudamientobancario") {
      this.mysqlService
        .CreateStatusDocument({
          customer_id: this.user_id,
          name: "endeudamientobancario",
          status: 0,
          request_id: this.requestIdSelected,
        })
        .toPromise()
        .then((response) => {
          this.StatusEndeudamiento.class = "label-warning";
          this.StatusEndeudamiento.status = "Pendiente";
          this.StatusEndeudamiento.check = false;
          this.spinner.hide(nspinner);
        })
        .catch((error) => {
          this.spinner.hide(nspinner);
          this.toastr.error("Problemas con el servidor.", "Oops!");
        });
    }

    if (
      e.target.value.toLowerCase() == "formatoparaintegraciones" &&
      e.target.checked == true
    ) {
      this.mysqlService
        .CreateStatusDocument({
          customer_id: this.user_id,
          name: "formatoparaintegraciones",
          status: 1,
          request_id: this.requestIdSelected,
        })
        .toPromise()
        .then((response) => {
          this.StatusFormato.class = "label-success";
          this.StatusFormato.status = "Completo";
          this.StatusFormato.check = true;
          this.spinner.hide(nspinner);
        })
        .catch((error) => {
          this.spinner.hide(nspinner);
          this.toastr.error("Problemas con el servidor.", "Oops!");
        });
    } else if (e.target.value.toLowerCase() == "formatoparaintegraciones") {
      this.mysqlService
        .CreateStatusDocument({
          customer_id: this.user_id,
          name: "formatoparaintegraciones",
          status: 0,
          request_id: this.requestIdSelected,
        })
        .toPromise()
        .then((response) => {
          this.StatusFormato.class = "label-warning";
          this.StatusFormato.status = "Pendiente";
          this.StatusFormato.check = false;
          this.spinner.hide(nspinner);
        })
        .catch((error) => {
          this.spinner.hide(nspinner);
          this.toastr.error("Problemas con el servidor.", "Oops!");
        });
    }

    if (
      e.target.value.toLowerCase() == "registrodedeudores" &&
      e.target.checked == true
    ) {
      this.mysqlService
        .CreateStatusDocument({
          customer_id: this.user_id,
          name: "registrodedeudores",
          status: 1,
          request_id: this.requestIdSelected,
        })
        .toPromise()
        .then((response) => {
          this.StatusDeudores.class = "label-success";
          this.StatusDeudores.status = "Completo";
          this.StatusDeudores.check = true;
          this.spinner.hide(nspinner);
        })
        .catch((error) => {
          this.spinner.hide(nspinner);
          this.toastr.error("Problemas con el servidor.", "Oops!");
        });
    } else if (e.target.value.toLowerCase() == "registrodedeudores") {
      this.mysqlService
        .CreateStatusDocument({
          customer_id: this.user_id,
          name: "registrodedeudores",
          status: 0,
          request_id: this.requestIdSelected,
        })
        .toPromise()
        .then((response) => {
          this.StatusDeudores.class = "label-warning";
          this.StatusDeudores.status = "Pendiente";
          this.StatusDeudores.check = false;
          this.spinner.hide(nspinner);
        })
        .catch((error) => {
          this.spinner.hide(nspinner);
          this.toastr.error("Problemas con el servidor.", "Oops!");
        });
    }

    if (
      e.target.value.toLowerCase() == "prendaria" &&
      e.target.checked == true
    ) {
      this.mysqlService
        .CreateStatusDocument({
          customer_id: this.user_id,
          name: "prendaria",
          status: 1,
          request_id: this.requestIdSelected,
        })
        .toPromise()
        .then((response) => {
          this.StatusPrendaria.class = "label-success";
          this.StatusPrendaria.status = "Completo";
          this.StatusPrendaria.check = true;
          this.spinner.hide(nspinner);
        })
        .catch((error) => {
          this.spinner.hide(nspinner);
          this.toastr.error("Problemas con el servidor.", "Oops!");
        });
    } else if (e.target.value.toLowerCase() == "prendaria") {
      this.mysqlService
        .CreateStatusDocument({
          customer_id: this.user_id,
          name: "prendaria",
          status: 0,
          request_id: this.requestIdSelected,
        })
        .toPromise()
        .then((response) => {
          this.StatusPrendaria.class = "label-warning";
          this.StatusPrendaria.status = "Pendiente";
          this.StatusPrendaria.check = false;
          this.spinner.hide(nspinner);
        })
        .catch((error) => {
          this.spinner.hide(nspinner);
          this.toastr.error("Problemas con el servidor.", "Oops!");
        });
    }

    if (
      e.target.value.toLowerCase() == "hipotecaria" &&
      e.target.checked == true
    ) {
      this.mysqlService
        .CreateStatusDocument({
          customer_id: this.user_id,
          name: "hipotecaria",
          status: 1,
          request_id: this.requestIdSelected,
        })
        .toPromise()
        .then((response) => {
          this.StatusHipotecaria.class = "label-success";
          this.StatusHipotecaria.status = "Completo";
          this.StatusHipotecaria.check = true;
          this.spinner.hide(nspinner);
        })
        .catch((error) => {
          this.spinner.hide(nspinner);
          this.toastr.error("Problemas con el servidor.", "Oops!");
        });
    } else if (e.target.value.toLowerCase() == "hipotecaria") {
      this.mysqlService
        .CreateStatusDocument({
          customer_id: this.user_id,
          name: "hipotecaria",
          status: 0,
          request_id: this.requestIdSelected,
        })
        .toPromise()
        .then((response) => {
          this.StatusHipotecaria.class = "label-warning";
          this.StatusHipotecaria.status = "Pendiente";
          this.StatusHipotecaria.check = false;
          this.spinner.hide(nspinner);
        })
        .catch((error) => {
          this.spinner.hide(nspinner);
          this.toastr.error("Problemas con el servidor.", "Oops!");
        });
    }

    if (
      e.target.value.toLowerCase() == "fiduciaria" &&
      e.target.checked == true
    ) {
      this.mysqlService
        .CreateStatusDocument({
          customer_id: this.user_id,
          name: "fiduciaria",
          status: 1,
          request_id: this.requestIdSelected,
        })
        .toPromise()
        .then((response) => {
          this.StatusFiduciaria.class = "label-success";
          this.StatusFiduciaria.status = "Completo";
          this.StatusFiduciaria.check = true;
          this.spinner.hide(nspinner);
        })
        .catch((error) => {
          this.spinner.hide(nspinner);
          this.toastr.error("Problemas con el servidor.", "Oops!");
        });
    } else if (e.target.value.toLowerCase() == "fiduciaria") {
      this.mysqlService
        .CreateStatusDocument({
          customer_id: this.user_id,
          name: "fiduciaria",
          status: 0,
          request_id: this.requestIdSelected,
        })
        .toPromise()
        .then((response) => {
          this.StatusFiduciaria.class = "label-warning";
          this.StatusFiduciaria.status = "Pendiente";
          this.StatusFiduciaria.check = false;
          this.spinner.hide(nspinner);
        })
        .catch((error) => {
          this.spinner.hide(nspinner);
          this.toastr.error("Problemas con el servidor.", "Oops!");
        });
    }

    if (
      e.target.value.toLowerCase() == "visitasinicial" &&
      e.target.checked == true
    ) {
      this.mysqlService
        .CreateStatusDocument({
          customer_id: this.user_id,
          name: "visitasinicial",
          status: 1,
          request_id: this.requestIdSelected,
        })
        .toPromise()
        .then((response) => {
          this.StatusVisitasInicial.class = "label-success";
          this.StatusVisitasInicial.status = "Completo";
          this.StatusVisitasInicial.check = true;
          this.spinner.hide(nspinner);
        })
        .catch((error) => {
          this.spinner.hide(nspinner);
          this.toastr.error("Problemas con el servidor.", "Oops!");
        });
    } else if (e.target.value.toLowerCase() == "visitasinicial") {
      this.mysqlService
        .CreateStatusDocument({
          customer_id: this.user_id,
          name: "visitasinicial",
          status: 0,
          request_id: this.requestIdSelected,
        })
        .toPromise()
        .then((response) => {
          this.StatusVisitasInicial.class = "label-warning";
          this.StatusVisitasInicial.status = "Pendiente";
          this.StatusVisitasInicial.check = false;
          this.spinner.hide(nspinner);
        })
        .catch((error) => {
          this.spinner.hide(nspinner);
          this.toastr.error("Problemas con el servidor.", "Oops!");
        });
    }

    if (
      e.target.value.toLowerCase() == "recordcrediticio" &&
      e.target.checked == true
    ) {
      this.mysqlService
        .CreateStatusDocument({
          customer_id: this.user_id,
          name: "recordcrediticio",
          status: 1,
          request_id: this.requestIdSelected,
        })
        .toPromise()
        .then((response) => {
          this.StatusRecordCrediticio.class = "label-success";
          this.StatusRecordCrediticio.status = "Completo";
          this.StatusRecordCrediticio.check = true;
          this.spinner.hide(nspinner);
        })
        .catch((error) => {
          this.spinner.hide(nspinner);
          this.toastr.error("Problemas con el servidor.", "Oops!");
        });
    } else if (e.target.value.toLowerCase() == "recordcrediticio") {
      this.mysqlService
        .CreateStatusDocument({
          customer_id: this.user_id,
          name: "recordcrediticio",
          status: 0,
          request_id: this.requestIdSelected,
        })
        .toPromise()
        .then((response) => {
          this.StatusRecordCrediticio.class = "label-warning";
          this.StatusRecordCrediticio.status = "Pendiente";
          this.StatusRecordCrediticio.check = false;
          this.spinner.hide(nspinner);
        })
        .catch((error) => {
          this.spinner.hide(nspinner);
          this.toastr.error("Problemas con el servidor.", "Oops!");
        });
    }

    if (
      e.target.value.toLowerCase() == "guatecompras" &&
      e.target.checked == true
    ) {
      this.mysqlService
        .CreateStatusDocument({
          customer_id: this.user_id,
          name: "guatecompras",
          status: 1,
          request_id: this.requestIdSelected,
        })
        .toPromise()
        .then((response) => {
          this.StatusGuatecompras.class = "label-success";
          this.StatusGuatecompras.status = "Completo";
          this.StatusGuatecompras.check = true;
          this.spinner.hide(nspinner);
        })
        .catch((error) => {
          this.spinner.hide(nspinner);
          this.toastr.error("Problemas con el servidor.", "Oops!");
        });
    } else if (e.target.value.toLowerCase() == "guatecompras") {
      this.mysqlService
        .CreateStatusDocument({
          customer_id: this.user_id,
          name: "guatecompras",
          status: 0,
          request_id: this.requestIdSelected,
        })
        .toPromise()
        .then((response) => {
          this.StatusGuatecompras.class = "label-warning";
          this.StatusGuatecompras.status = "Pendiente";
          this.StatusGuatecompras.check = false;
          this.spinner.hide(nspinner);
        })
        .catch((error) => {
          this.spinner.hide(nspinner);
          this.toastr.error("Problemas con el servidor.", "Oops!");
        });
    }

    if (
      e.target.value.toLowerCase() == "infornet" &&
      e.target.checked == true
    ) {
      this.mysqlService
        .CreateStatusDocument({
          customer_id: this.user_id,
          name: "infornet",
          status: 1,
          request_id: this.requestIdSelected,
        })
        .toPromise()
        .then((response) => {
          this.StatusInfornet.class = "label-success";
          this.StatusInfornet.status = "Completo";
          this.StatusInfornet.check = true;
          this.spinner.hide(nspinner);
        })
        .catch((error) => {
          this.spinner.hide(nspinner);
          this.toastr.error("Problemas con el servidor.", "Oops!");
        });
    } else if (e.target.value.toLowerCase() == "infornet") {
      this.mysqlService
        .CreateStatusDocument({
          customer_id: this.user_id,
          name: "infornet",
          status: 0,
          request_id: this.requestIdSelected,
        })
        .toPromise()
        .then((response) => {
          this.StatusInfornet.class = "label-warning";
          this.StatusInfornet.status = "Pendiente";
          this.StatusInfornet.check = false;
          this.spinner.hide(nspinner);
        })
        .catch((error) => {
          this.spinner.hide(nspinner);
          this.toastr.error("Problemas con el servidor.", "Oops!");
        });
    }

    if (e.target.value.toLowerCase() == "sat" && e.target.checked == true) {
      this.mysqlService
        .CreateStatusDocument({
          customer_id: this.user_id,
          name: "sat",
          status: 1,
          request_id: this.requestIdSelected,
        })
        .toPromise()
        .then((response) => {
          this.StatusSat.class = "label-success";
          this.StatusSat.status = "Completo";
          this.StatusSat.check = true;
          this.spinner.hide(nspinner);
        })
        .catch((error) => {
          this.spinner.hide(nspinner);
          this.toastr.error("Problemas con el servidor.", "Oops!");
        });
    } else if (e.target.value.toLowerCase() == "sat") {
      this.mysqlService
        .CreateStatusDocument({
          customer_id: this.user_id,
          name: "sat",
          status: 0,
          request_id: this.requestIdSelected,
        })
        .toPromise()
        .then((response) => {
          this.StatusSat.class = "label-warning";
          this.StatusSat.status = "Pendiente";
          this.StatusSat.check = false;
          this.spinner.hide(nspinner);
        })
        .catch((error) => {
          this.spinner.hide(nspinner);
          this.toastr.error("Problemas con el servidor.", "Oops!");
        });
    }

    if (
      e.target.value.toLowerCase() == "declaraguate" &&
      e.target.checked == true
    ) {
      this.mysqlService
        .CreateStatusDocument({
          customer_id: this.user_id,
          name: "declaraguate",
          status: 1,
          request_id: this.requestIdSelected,
        })
        .toPromise()
        .then(async (response) => {

          this.StatusDeclaraguate.class = "label-success";
          this.StatusDeclaraguate.status = "Completo";
          this.StatusDeclaraguate.check = true;
          //await this.selectRequest();
          this.spinner.hide(nspinner);
        })
        .catch((error) => {
          this.spinner.hide(nspinner);
          this.toastr.error("Problemas con el servidor.", "Oops!");
        });
    } else if (e.target.value.toLowerCase() == "declaraguate") {
      this.mysqlService
        .CreateStatusDocument({
          customer_id: this.user_id,
          name: "declaraguate",
          status: 0,
          request_id: this.requestIdSelected,
        })
        .toPromise()
        .then(async (response) => {

          this.StatusDeclaraguate.class = "label-warning";
          this.StatusDeclaraguate.status = "Pendiente";
          this.StatusDeclaraguate.check = false;
          //await this.selectRequest();
          this.spinner.hide(nspinner);
        })
        .catch((error) => {
          this.spinner.hide(nspinner);
          this.toastr.error("Problemas con el servidor.", "Oops!");
        });
    }

  }
  radioholding
  dataCompanies
  OpenVisita(modal) {
    //this.Formvisitainicial.reset({})
    //this.participants.clear()
    ///tenemos que buscar el id del form, obtener el campo y la informacion
    //Obteniendo el id
    let data = this.groupSubjectsList(this.subjectsList)
    let client = data.find(item => item.subject_name == 'CLIENTE')
    let person = client.childs.find(item => item.person_id == null)
    //con esto buscamos el formulario
    this.spinner.show()
    //Mandar a traer el listado 
    let form = person.form_id ? person.form_id : -1
    this.mysqlService.GetGeneralData(form).toPromise().then((response) => {
      if (response.data != null) {
        var holding = response.data.holding
        if (String(response.data.holding)) {
          this.FormCompanys.patchValue({
            holding: String(response.data.holding),
          });
        }
        this.dataCompanies = response.data.companys
      }

      if (holding == 1) {

        //Se muestra el formulario
        this.FormCompanys.controls["comercial_name"].enable();
        this.FormCompanys.controls["relation"].enable();
        this.FormCompanys.controls["sector"].enable();
        this.FormCompanys.controls["nit"].enable();
        this.FormCompanys.controls["holding_name"].enable();
        this.FormCompanys.controls["country"].enable();
        this.FormCompanys.controls["comercial_activity"].enable();
        this.FormCompanys.controls["company_type"].enable();
        // this.FormCompanys.controls['holding'].setValue('1')

        this.radioholding = 1
      } else {
        this.FormCompanys.controls["comercial_name"].disable();
        this.FormCompanys.controls["relation"].disable();
        this.FormCompanys.controls["sector"].disable();
        this.FormCompanys.controls["nit"].disable();
        this.FormCompanys.controls["holding_name"].disable();
        this.FormCompanys.controls["country"].disable();
        this.FormCompanys.controls["comercial_activity"].disable();
        this.FormCompanys.controls["company_type"].disable();


      }
      this.flagDeVisita = true;
      this.spinner.hide()
      this.modalService.open(modal, {
        centered: true,
        backdrop: "static",
        keyboard: false,
        size: "xl",
        windowClass: 'my-modal'
      });
    })
    //Luego buscamos el que tenga person_id==null

  }
  CurrentCompanies
  openModalCompanies(targetModal, index, id) {
    this.CurrentCompanies = id;
    this.FormUpdateCompanys.patchValue({
      comercial_name: this.dataCompanies[index].comercial_name,
      relation: this.dataCompanies[index].relation,
      sector: this.dataCompanies[index].sector,
      nit: this.dataCompanies[index].nit,
      holding_name: this.dataCompanies[index].holding_name,
      country: this.dataCompanies[index].country,
      comercial_activity: this.dataCompanies[index].comercial_activity
    })
    this.openModal(targetModal)
  }
  async DeleteSomeData(id, resource: string) {
    await this.mysqlService
      .DeleteSomeGeneralData(id, resource)
      .toPromise()
      .then(async (res) => {
        this.closeBtnClick()
        this.toastr.success("Se elimino el registro.", "Eliminación Correcta!");
        //console.log("res", res);
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas al eliminar la información.", "Oops!");
      });
  }
  async UpdateCompanys() {
    let arrayinfo = []
    this.FormUpdateCompanys.value.company_id = this.CurrentCompanies;
    let data = this.groupSubjectsList(this.subjectsList)
    let client = data.find(item => item.subject_name == 'CLIENTE')
    let person = client.childs.find(item => item.person_id == null)
    arrayinfo.push(this.FormUpdateCompanys.value)
    await this.mysqlService
      .CreateGeneralData({
        request_id: this.requestIdSelected,
        form_id: person.form_id,
        form: { companys: arrayinfo },
      })
      .toPromise()
      .then(async (res) => {
        //console.log("res", res);
        //this.FormUpdateCompanys.reset({});
        this.modalService.dismissAll();
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        await this.closeBtnClick();
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }
  async SaveCompanys() {
    let arrayinfo = []
    let data = this.groupSubjectsList(this.subjectsList)
    let client = data.find(item => item.subject_name == 'CLIENTE')
    let person = client.childs.find(item => item.person_id == null)
    arrayinfo.push(this.FormCompanys.value)
    await this.mysqlService
      .CreateGeneralData({
        request_id: this.requestIdSelected,
        form_id: person.form_id,

        form: { companys: arrayinfo },
      })
      .toPromise()
      .then(async (res) => {
        //console.log("res", res);
        this.FormCompanys.reset({});
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");

        await this.closeBtnClick();
        this.mysqlService.GetGeneralData(person.form_id).toPromise().then((response) => {
          var holding = response.data.holding
          if (String(response.data.holding)) {
            this.FormCompanys.patchValue({
              holding: String(response.data.holding),
            });
          }
          this.dataCompanies = response.data.companys
          if (holding == 1) {

            //Se muestra el formulario
            this.FormCompanys.controls["comercial_name"].enable();
            this.FormCompanys.controls["relation"].enable();
            this.FormCompanys.controls["sector"].enable();
            this.FormCompanys.controls["nit"].enable();
            this.FormCompanys.controls["holding_name"].enable();
            this.FormCompanys.controls["country"].enable();
            this.FormCompanys.controls["comercial_activity"].enable();
            this.FormCompanys.controls['company_type'].enable();
            // this.FormCompanys.controls['holding'].setValue('1')

            this.radioholding = 1
          } else {
            this.FormCompanys.controls["comercial_name"].disable();
            this.FormCompanys.controls["relation"].disable();
            this.FormCompanys.controls["sector"].disable();
            this.FormCompanys.controls["nit"].disable();
            this.FormCompanys.controls["holding_name"].disable();
            this.FormCompanys.controls["country"].disable();
            this.FormCompanys.controls["comercial_activity"].disable();
            this.FormCompanys.controls['company_type'].disable();

          }
          this.flagDeVisita = true;
          this.spinner.hide()

        })
        //this.ChangeForm("7");
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }
  async changeHasBussiness() {
    //al cambio tenemos que cambiarlo a nivel de base de datos en el form
    this.spinner.show()
    let data = this.groupSubjectsList(this.subjectsList)
    let client = data.find(item => item.subject_name == 'CLIENTE')
    let person = client.childs.find(item => item.person_id == null)
    await this.mysqlService
      .CreateGeneralData({
        request_id: this.requestIdSelected,
        form_id: person.form_id ? person.form_id : null,
        rsdet_id: person.rsdet_id,
        form: { holding: this.FormCompanys.value.holding }
      })
      .toPromise().then(() => {
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        this.selectRequest()
        if (this.FormCompanys.value.holding == 1) {
          this.FormCompanys.controls["comercial_name"].enable();
          this.FormCompanys.controls["relation"].enable();
          this.FormCompanys.controls["sector"].enable();
          this.FormCompanys.controls["nit"].enable();
          this.FormCompanys.controls["holding_name"].enable();
          this.FormCompanys.controls["country"].enable();
          this.FormCompanys.controls["comercial_activity"].enable();
          this.FormCompanys.controls['company_type'].enable();
          //this.Form_other_data.value.isr_percentage.enable();
        } else {
          this.FormCompanys.controls["comercial_name"].disable();
          this.FormCompanys.controls["relation"].disable();
          this.FormCompanys.controls["sector"].disable();
          this.FormCompanys.controls["nit"].disable();
          this.FormCompanys.controls["holding_name"].disable();
          this.FormCompanys.controls["country"].disable();
          this.FormCompanys.controls["comercial_activity"].disable();
          this.FormCompanys.controls['company_type'].disable();
        }
        this.spinner.hide()
      })

    // const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    // let arrayinfo = [];
    // const dataholding = this.FormCompanys.value.holding;
    // delete this.FormCompanys.value.holding;
    // arrayinfo.push(this.FormCompanys.value);
    // await this.mysqlService
    //   .CreateGeneralData({
    //     request_id: datalocal.request_id,
    //     form_id: datalocal.form_id,
    //     rsdet_id: datalocal.metadata.rsdet_id,
    //     form: { holding: dataholding },
    //   })
    //   .toPromise()
    //   .then(async (res) => {
    //     this.spinner.show();
    //     this.FormCompanys.reset({});
    //     //console.log("res", res);
    //     this.toastr.success("Se cambio el estado.", "Estado Cambio!");
    //     if (this.FormCompanys.value.holding == 1) {
    //       this.FormCompanys.controls["comercial_name"].enable();
    //       this.FormCompanys.controls["relation"].enable();
    //       this.FormCompanys.controls["sector"].enable();
    //       this.FormCompanys.controls["nit"].enable();
    //       this.FormCompanys.controls["holding_name"].enable();
    //       this.FormCompanys.controls["country"].enable();
    //       this.FormCompanys.controls["comercial_activity"].enable();
    //       //this.Form_other_data.value.isr_percentage.enable();
    //     } else {
    //       this.FormCompanys.controls["comercial_name"].disable();
    //       this.FormCompanys.controls["relation"].disable();
    //       this.FormCompanys.controls["sector"].disable();
    //       this.FormCompanys.controls["nit"].disable();
    //       this.FormCompanys.controls["holding_name"].disable();
    //       this.FormCompanys.controls["country"].disable();
    //       this.FormCompanys.controls["comercial_activity"].disable();
    //     }
    //     if (datalocal.form_id == null) {
    //       datalocal.form_id = res.data.form_id;
    //       localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
    //       const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
    //       //console.log("new data", newdata);
    //     }
    //     await this.ngOnInit();
    //     //this.accordion.toggle("static-6");
    //   })
    //   .catch((err) => {
    //     console.log("err", err);
    //     this.toastr.error("Problemas con el servidor.", "Oops!");
    //   });
  }

  async ChangeStatusRelation() {
    this.spinner.show();
    await this.mysqlService
      .UpdateIRelation(
        {
          status: this.statusRelation,
          modification_date: new Date(),
          employee_email: localStorage.getItem("email"),
          description: this.cambiarEstadoRelacion.value.description,
        },
        this.user_id
      )
      .toPromise()
      .then((res) => {
        if (this.statusRelation === 4) {
          this.toastr.success(
            "Se completo la relación con el cliente.",
            "Cambio Exitoso!"
          );
          this.getDataCurrentCostumer();
        } else if (this.statusRelation === 3) {
          this.toastr.success(
            "Se rechazaron los documentos.",
            "Cambio Exitoso!"
          );
        }
        this.spinner.hide();
        this.modalService.dismissAll();
        this.ngOnInit();
      })
      .catch((err) => {
        this.toastr.error("Problemas con el servidor", "Oops!");
        this.spinner.hide();
      });
  }

  async SaveInitialRelation(status) {
    this.spinner.show();
    await this.mysqlService
      .UpdateIRelation(
        {
          status: status,
          modification_date: new Date(),
          employee_email: localStorage.getItem("email"),
        },
        this.user_id
      )
      .toPromise()
      .then((res) => {
        this.toastr.success(
          "La información fue enviada",
          "Información Enviada!"
        );
        let email_user = this.formrelacion.value.email;
        let email_employe = localStorage.getItem("email");
        this._sendemail
          .sendEmail({
            Subject: "Inicio de Relación",
            To: email_user,
            template_id: 5,
            message: this.formrelacion.value.message,
            customer_id: this.user_id,
            cc: email_employe,
            type_user: this.dataCustomer.type,
          })
          .subscribe(
            (response) => {
              this.toastr.success(
                "Se enviaron los requisitos al correo electronico.",
                "Enviado!"
              );
              this.getDataCurrentCostumer();
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
        this.modalService.dismissAll();
      })
      .catch((err) => {
        this.toastr.error("Problemas con el servidor", "Oops!");
        this.spinner.hide();
      });
  }

  async SaveInitialRelationResend(status) {
    this.spinner.show();
    await this.mysqlService
      .UpdateIRelation(
        {
          status: status,
          modification_date: new Date(),
          employee_email: localStorage.getItem("email"),
          description: this.formrelacion.value.description,
          resend: true,
        },
        this.user_id
      )
      .toPromise()
      .then((res) => {
        this.toastr.success(
          "La información fue enviada",
          "Información Enviada!"
        );
        let email_user = this.formrelacion.value.email;
        let email_employe = localStorage.getItem("email");
        this._sendemail
          .sendEmail({
            Subject: "Inicio de Relación",
            To: email_user,
            template_id: 5,
            message: this.formrelacion.value.message,
            customer_id: this.user_id,
            cc: email_employe,
            type_user: this.dataCustomer.type,
          })
          .subscribe(
            (response) => {
              this.toastr.success(
                "Se enviaron los requisitos al correo electronico.",
                "Enviado!"
              );
              this.getDataCurrentCostumer();
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
        this.modalService.dismissAll();
      })
      .catch((err) => {
        this.toastr.error("Problemas con el servidor", "Oops!");
        this.spinner.hide();
      });
  }



  async showPreviewImage(event, locationd, documenttype, nspinner) {
    console.log("AHORITA SI???");

    if (event.target.files && event.target.files[0]) {
      let business_address = this.Formvisitainicial.controls['business_address'].value
      let date_visit = this.Formvisitainicial.controls['date_of_visit'].value
      let background = this.Formvisitainicial.controls['background'].value
      const named = this.filenameS.generateName() + "_" + event.target.files[0].name;
      const typed = event.target.files[0].type;
      this.spinner.show(nspinner);
      var reader = new FileReader();
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
          .then(async (response) => {
            //console.log("res", response);
            this.flagVisita = false;
            this.saveDocuments(
              `${BUCKET_NAME}/${response.data.Key.substring(0, response.data.Key.lastIndexOf('/') + 0)}`,
              documenttype,
              nspinner,
              locationd,
              named
            );
            event.srcElement.value = null;
            await this.ngOnInit()
            this.Formvisitainicial.controls['business_address'].setValue(business_address)
            this.Formvisitainicial.controls['date_of_visit'].setValue(date_visit)
            this.Formvisitainicial.controls['background'].setValue(background)
          })
          .catch((error) => {
            this.spinner.hide(nspinner);
            this.toastr.error("Problemas con guardar la imagen", "Oops!");
          });
      };

      await reader.readAsDataURL(event.target.files[0]);
      event.srcElement.value = null;
      return
    }
  }

  //Documentos
  async saveDocuments(
    documentkey: string,
    documenttype: string,
    nspinner: string,
    type: string,
    named: string
  ) {
    if (type == "formularios") {
      await this.mysqlService
        .CreateDocumentCustomer({
          customer_id: this.user_id,
          name: documenttype,
          document_key: documentkey,
          request_id: this.requestIdSelected,
          document_name: named,
        })
        .toPromise()
        .then(async (response) => {

          await this.selectRequest();
          this.spinner.hide(nspinner);
          this.toastr.success(
            "El documento fue guardado.",
            "Documento Guardado!"
          );
        })
        .catch((error) => {
          this.toastr.error("Problemas con guardar la imagen", "Oops!");
        });
    } else if (type == "garantias") {
      await this.mysqlService
        .CreateWarrantyCustomer({
          customer_id: this.user_id,
          name: documenttype,
          warranty_key: documentkey,
          request_id: this.requestIdSelected,
          document_name: named,
        })
        .toPromise()
        .then(async (response) => {
          await this.selectRequest();
          this.spinner.hide(nspinner);
          this.toastr.success(
            "El documento fue guardado.",
            "Documento Guardado!"
          );
        })
        .catch((error) => {
          this.toastr.error("Problemas con guardar la imagen", "Oops!");
        });
    } else if (type == "verificaciones") {
      //this.SaveVisitData(true)
      let values = this.Formvisitainicial
      console.log("ENTRO A VERIFICACIONES");
      await this.mysqlService
        .CreateVerificationCustomer({
          customer_id: this.user_id,
          name: documenttype,
          verification_key: documentkey,
          request_id: this.requestIdSelected,
          document_name: named,
          type: this.seleccionType,
        })
        .toPromise()
        .then(async (response) => {
          if (this.flagVisita || !this.flagDeVisita) {
            await this.selectRequest();
          }
          if (!this.flagVisita) {
            this.flagVisita = true;
          }

          this.spinner.hide(nspinner);
          // this.Formvisitainicial;
          this.toastr.success(
            "El documento fue guardado.",
            "Documento Guardado!"
          );
          this.Formvisitainicial = values
        })
        .catch((error) => {
          this.toastr.error("Problemas con guardar la imagen", "Oops!");
        });
    }
  }

  async CreateRequest() {
    const myDate = new Date();
    const body = {
      customer_id: this.user_id,
      documents: 0,
      verifications: 0,
      warranties: 0,
      status: 0,
      type: this.createRequest.value.inputTipoSolicitud,
      create_date: myDate,
      employee_email: localStorage.getItem("email"),
    };
    await this.mysqlService
      .CreateCustomerRequest(body)
      .toPromise()
      .then((response) => {
        this.toastr.success(
          "La solicitud fue creada con éxito.",
          "Solicitud Creada!"
        );
        this.getAllCustomerRequest();
        this.modalService.dismissAll();
        //this.router.navigate([`/list-customer`]);
        //console.log("response", response);
      })
      .catch((error) => {
        this.toastr.error("La información fue guardad con exito.", "Opss!");
        console.log("error", error);
      });
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

  //-----LO DEL CORREO Y EL REQUERIMIENTO DE LOS FOMRULARIOS Y SOLICTUDES
  sendCustomerEmail(): void {
    let lvals = this.formsCheckBoxes.getRawValue();
    for (let i = 0; i < lvals.length; i++) {
      this.formStatusArray[lvals[i]] = 1;
    }
    this._sendemail
      .sendCustomerEmail(
        this.dataCustomer,
        this.formStatusArray,
        this.requestIdSelected,
        {
          id_request: this.requestIdSelected,
          employee_email: localStorage.getItem("email"),
          description: this.cambiarEstadoRelacion.value.description,
        }
      )
      .pipe(
        map((resp) => {
          //console.log(resp);
          this.toastr.success("Correo Enviado", "Enviado!");

          this.closeBtnClick();
        }),
        catchError((err) => {
          this.toastr.error("Intentar de nuevo" + err.message, "Oops!");
          return of();
        })
      )
      .subscribe();
  }

  openModalSR(targetModal) {
    this.formfiduciary.reset({});
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: "static",
      keyboard: false,
      windowClass: "my-classmodal3"
    });
  }

  openModal2(targetModal) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: "static",
      keyboard: false,
    });
  }

  openModalSolicitud(targetModal, type, value) {
    this.cambiarEstadoRelacion.reset();
    this.typechangerequest = type;
    this.valuechangerequest = value;
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: "static",
      keyboard: false,
      size: "lg",
      windowClass: 'my-modal'
    });
  }

  openModalRelation(targetModal, statusRelation) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: "static",
      keyboard: false,
      windowClass: 'my-modal'
    });
    this.statusRelation = statusRelation;
  }

  openModalUpdateFiduciary(targetModal, dataFiduciary) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: "static",
      keyboard: false,
      size: "lg",
      windowClass: 'my-modal'
    });
    this.dataUpdateFiducary = dataFiduciary;
    this.chageTypeWarranties();
    this.formfiduciary.patchValue({
      type: String(this.dataUpdateFiducary.type),
      name1: this.dataUpdateFiducary.name1,
      name2: this.dataUpdateFiducary.name3,
      name3: this.dataUpdateFiducary.name2,
      lastname1: this.dataUpdateFiducary.lastname1,
      lastname2: this.dataUpdateFiducary.lastname2,
      lastname3: this.dataUpdateFiducary.lastname3,
      businessname: this.dataUpdateFiducary.businessname,
    });
  }

  closeBtnClick() {
    console.log('Se va a cerrar el modal');
    if (this.arraymodals.length > 0)
      this.arraymodals.pop().close()
    else
      this.modalService.dismissAll()
    this.flagDeVisita = false;
  }

  goToForm(val: number) {
    this.router.navigate([
      "/" + this.formsUrls[this.dataCustomer.type][val][0],
      this.requestIdSelected,
    ]);
  }



  async SaveVisitData(close?: boolean) {
    this.spinner.show();
    await this.mysqlService
      .InitialDetails(
        {
          request_id: this.requestIdSelected,
          information: JSON.stringify(this.Formvisitainicial.value),
        },
        this.requestIdSelected
      )
      .toPromise()
      .then(async (response) => {
        //console.log("asdf", response);
        await this.selectRequest();
        if (!close) {
          this.modalService.dismissAll();
        }
        this.toastr.success(
          "Se guardo la información de la visita.",
          "Información Guardad!"
        );
        this.ngOnInit()
        this.spinner.hide();
      })
      .catch((error) => {
        //console.log("asdf", error);
        this.toastr.error("Problemas con el servidor.", "Oops!");
        this.spinner.hide();
      });
  }

  chageTypeWarranties() {
    if (this.formfiduciary.controls.type.value == 1) {
      this.formfiduciary.controls.businessname.enable();
    } else {
      this.formfiduciary.controls.businessname.disable();
    }
  }

  async CreateCustomerFiducaryWaranty() {
    this.spinner.show();
    this.formfiduciary.value.request_id = this.requestIdSelected;
    this.formfiduciary.value.customer_id = this.user_id;

    if (!this.formfiduciary.value.name3) {
      delete this.formfiduciary.value.name3;
    }
    if (!this.formfiduciary.value.lastname3) {
      delete this.formfiduciary.value.lastname3;
    }

    await this.mysqlService
      .CreateFiducaryWarrantyCustomer(this.formfiduciary.value)
      .toPromise()
      .then(async (response) => {
        await this.selectRequest();
        this.formfiduciary.reset({});
        this.modalService.dismissAll();
        this.toastr.success(
          "Se agrego correctamente.",
          "Información Guardada!"
        );
        this.spinner.hide();
      })
      .catch((error) => {
        //console.log("asdf", error);
        this.toastr.error("Problemas con el servidor.", "Oops!");
        this.spinner.hide();
      });
  }

  async UpdateFiducaryWaranty() {
    this.spinner.show();
    this.formfiduciary.value.request_id = this.requestIdSelected;
    this.formfiduciary.value.customer_id = this.user_id;

    if (!this.formfiduciary.value.name3) {
      delete this.formfiduciary.value.name3;
    }
    if (!this.formfiduciary.value.lastname3) {
      delete this.formfiduciary.value.lastname3;
    }
    if (!this.formfiduciary.value.name2) {
      delete this.formfiduciary.value.name2;
    }

    await this.mysqlService
      .UpdateFiducaryWarrantyCustomer(
        this.formfiduciary.value,
        this.dataUpdateFiducary.id_fiduciary
      )
      .toPromise()
      .then(async (response) => {
        await this.selectRequest();
        this.modalService.dismissAll();
        this.toastr.success(
          "Se modifico correctamente.",
          "Información Guardada!"
        );
        this.spinner.hide();
      })
      .catch((error) => {
        //console.log("asdf", error);
        this.toastr.error("Problemas con el servidor.", "Oops!");
        this.spinner.hide();
      });
  }

  async UploadOwnerForm(event, form: ReqFormResp, nspinner) {
    if (event.target.files && event.target.files[0]) {
      //const named = event.target.files[0].name;
      const named = this.filenameS.generateName() + "_" + event.target.files[0].name;
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
        console.log("named::" + named);
        console.log("typed::" + typed);

        this.spinner.show(nspinner);
        this._myProfileService
          .uploadForm(data)
          .pipe(
            map((data) => {
              console.log(data);
              this.currentSubject.owner.forms.find(sf => sf.rsfdet_id == form.rsfdet_id).docs.push(data.data);
              this.spinner.hide(nspinner);
            }),
            catchError((err) => {
              this.toastr.error(
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
  async UploadForm(event, form: ReqFormResp, nspinner) {

    if (event.target.files && event.target.files[0]) {
      const named = this.filenameS.generateName() + "_" + event.target.files[0].name;
      //const named = event.target.files[0].name;
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
        console.log("named::" + named);
        console.log("typed::" + typed);

        this.spinner.show(nspinner);
        this._myProfileService
          .uploadForm(data)
          .pipe(
            map((data) => {
              console.log(data);
              this.currentSubject.forms.find(sf => sf.rsfdet_id == form.rsfdet_id).docs.push(data.data);
              this.spinner.hide(nspinner);
            }),
            catchError((err) => {
              this.toastr.error(
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

  async uploadReq(event, req, nspinner) {

    if (event.target.files && event.target.files[0]) {
      // const named = event.target.files[0].name;
      const named = this.filenameS.generateName() + "_" + event.target.files[0].name;
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
        this._myProfileService
          .uploadReq(data)
          .pipe(
            map((data) => {
              //console.log(data);

              req.docs.push(data.data);
              //console.log(this.currentAval.requirements.requirements[index].docs);
              this.spinner.hide(nspinner);
              // this.getForms(form.rsdet_id);

            }),
            catchError((err) => {
              this.toastr.error(
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
  TabChange(x): void {
    console.log('En TabChange::');
    console.log(x);
  }
  allFormsIsMarkedCurrentSubject() {
    let find = this.subjectFormsCheckBoxesData.find((item) => item.value == false)
    return find ? false : true;
  }
  allRequiremstMarkedCurrentSubject() {
    let find = this.avalReqsCheckBoxesData.find((item) => item.value == false);
    return find ? false : true;
  }
  changeAllRequirements() {
    if (this.allRequiremstMarkedCurrentSubject()) {
      this.avalReqsCheckBoxesData.forEach((item) => { if (!this.isDPI(item.data.name)) { item.value = false } })
    } else {
      this.avalReqsCheckBoxesData.forEach((item) => { if (!this.isDPI(item.data.name)) { item.value = true } })
    }
  }
  changeAllCheklistForms() {
    if (this.allFormsIsMarkedCurrentSubject()) {
      //desmarcar
      this.subjectFormsCheckBoxesData.forEach((item) => item.value = false)
    } else {
      this.subjectFormsCheckBoxesData.forEach((item) => item.value = true)
    }
  }
  openUserFormsListModal(targetModal, username) {

    /*Evaluar si todos los formularios estan completados para cambiar el mensaje*/
    //todos son validos
    this.completeAllCurrentForms = true
    this.currentSubject.forms.forEach((item) => {
      if (item.check_status == 0 || item.check_status == null) {
        this.completeAllCurrentForms = false;
      }
    })
    this.userFormsListModalUsername = username;
    this.openModal(targetModal)
  }


  getSubjectsFiltered(rsdet_null_value = true) {
    // filtro usado para la pestaña VER REQUISITOS
    if (rsdet_null_value) {
      return this.subjectsList.filter(s => s.rsdet_id == null);
    } else {
      return this.subjectsList.filter(s => s.rsdet_id != null);
    }
  }

  groupSubjectsList(subjectsList) {
    let newList = []

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
  getVerificationsInfo(name: string) {
    if (this.logdataRequest && this.logdataRequest.length > 0) {
      let find = this.logdataRequest.slice().reverse().find((item) => item.message == name)
      return find
    }
    return null
  }
  changeBlockTab1() {
    this.bloqTab1 = !this.bloqTab1
  }
  async autoMove() {
    //Tenemos que buscar la vista que tenga el define
    this.autoMoveTab(this.selectedTabName)
  }
  disabledTabVerifications: boolean = false
  disabledTabForms: boolean = false
  disabledTabConfigurations: boolean = false
  disabledTabAuthorizations: boolean = false
  getShowViews(arr: ShowViewInterface) {
    debugger
    this.showViews = arr.show_views
    console.log('EStas son mis vistas')
    this.selectedTabName = arr.selected_name

    console.log(this.showViews)
    this.default_views = arr.default_views
    this.document_serie_id = arr.document_serie_id
    //En esta parte vamos a bloquear o desbloquer los tabs
    this.disabledTabAuthorizations = this.disableView(this.TabAuthorization)
    this.disabledTabForms = this.disableView(this.TabForms)
    this.disabledTabVerifications = this.disableView(this.TabVerifications)
    this.disabledTabConfigurations = this.disableView(this.TabConfigurations)
    this.autoMoveTab(arr.selected_name)

  }
  // async onSelectAnalysis(process: Analysis) {
  //   //Tenemos que ver si se puede seleccionar el analisis
  //   this.selectAnalysis = process
  //   if (process == Analysis.commercial_manager_authorization || process == Analysis.gerencial_manager_authorization || process == Analysis.customer_registration) {
  //     //REFRESCAR INFORMACION
  //     await this.listAllReports()
  //     await this.listAllGReports()
  //     //Vamos a refrescar la informacion
  //     if (this.legalAnalysisSelected && this.legalAnalysisSelected.id_commercialanalysis)
  //       this._legalAnalysis.getCheckList(this.legalAnalysisSelected.id_commercialanalysis).toPromise().then(
  //         (response) => {
  //           let onenotchecked = response.filter(item => item.bit_value == "false" || item.bit_value == "0")
  //           if (onenotchecked.length > 0)
  //             this.arrayCheckedReports.find(item => item.key == 'Legal').value = false
  //           else
  //             this.arrayCheckedReports.find(item => item.key == 'Legal').value = true
  //         }
  //       )
  //     if (this.complianceVerificationSelected && this.complianceVerificationSelected.id_commercialanalysis)
  //       this._complianceVerificationService.getCheckList(this.complianceVerificationSelected.id_commercialanalysis).toPromise().then(
  //         (response) => {
  //           let onenotchecked = response.filter(item => item.bit_value == "false" || item.bit_value == "0")
  //           if (onenotchecked.length > 0)
  //             this.arrayCheckedReports.find(item => item.key == 'Cumplimiento').value = false
  //           else
  //             this.arrayCheckedReports.find(item => item.key == 'Cumplimiento').value = true
  //         }
  //       )
  //     if (this.dataCA && this.dataCA.id_commercialanalysis)
  //       this._CASevice.getCheckList(this.dataCA.id_commercialanalysis).toPromise().then(
  //         (response) => {
  //           //@ts-ignore
  //           let onenotchecked = response.filter(item => item.bit_value == "false" || item.bit_value == "0")
  //           if (onenotchecked.length > 0)
  //             this.arrayCheckedReports.find(item => item.key == 'Comercial').value = false
  //           else
  //             this.arrayCheckedReports.find(item => item.key == 'Comercial').value = true
  //         }
  //       )
  //     if (this.gerencialManagerAuthorizationSelected && this.gerencialManagerAuthorizationSelected.id_commercialanalysis && this.gerencialManagerAuthorizationSelected.approval_date != null) {
  //       this.arrayCheckedReports.find(item => item.key == 'Autorización Gerente Comercial').value = true
  //     }

  //   }
  // }
  move(selected: string) {
    if (selected == '') {
      //Seleccionamos la primera
      this.switchNgBTab(this.TabConfigurations)
    } else {
      //Tenemos que variar al momento que sea en autorizaciones
      if (this.TabAuthorization == selected || selected == Analysis.commercial_assistant_analysis
        || selected == Analysis.commercial_manager_authorization
        || selected == Analysis.compliance_verification
        || selected == Analysis.customer_registration
        || selected == Analysis.gerencial_manager_authorization
        || selected == Analysis.legal_analysis
        || selected == Analysis.operations_area_report
        || selected == Analysis.analysis_area_transfer
        || selected == Analysis.financial_analysis
        || selected == Analysis.council_approval
        || selected == Analysis.formalization
      ) {
        this.switchNgBTab(this.TabAuthorization)
        //tenemos que ver cual es la que tenemos que mover
        this.analysisTabs?.autoMove()

      } else {
        this.switchNgBTab(selected)
        //this.first_load=true
      }

    }
  }
  async autoMoveTab(selected: string) {
    debugger
    if (this.ctdTabset == undefined) {
      //Vamos a esperar 5 segundos
      setTimeout(() => this.move(selected), 5000)
    } else {
      this.move(selected)
    }

  }
  disableView(view: string) {
    let find = this.showViews.find(item => item == view)
    if (find)
      return false
    return true
  }
  getCountry() {
    return country_list
  }
  getCompanyType() {
    return [
      'Holding',
      'Casa Matríz',
      'Grupo de empresas'
    ]
  }
  openRequirementObservationModal(requirement, modal) {
    console.log(requirement)
    console.log(this.currentAval)
    this.requirementSelected = requirement
    this.requirementObservationForm.reset()
    let find = this.requirementObservation.find(item => item.request_id == this.currentAval.request_id
      && item.sys_w_element_id == this.currentAval.sys_w_element_id
      && item.rwedet_id == this.currentAval.rwedet_id
      && item.req_requi_id == requirement.sys_w_req_element_id
    )

    if (find) {
      this.requirementObservationForm.patchValue(
        find
      )
    }
    this.openModal(modal)
  }
  requirementSelected: any
  createObservation() {
    let data = {
      ...this.requirementObservationForm.value,
      request_id: this.currentAval.request_id,
      sys_w_element_id: this.currentAval.sys_w_element_id,
      rwedet_id: this.currentAval.rwedet_id,
      req_requi_id: this.requirementSelected.sys_w_req_element_id
    }
    debugger
    this._requirementObservationService.save(data).toPromise().then((response) => {
      this.closeBtnClick()
      this.requirementObservationForm.reset({})
      this.requirementObservation.push(response.body)
      this.toastr.success('Observación creada correctamente', 'Éxito')
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
    }).catch((error) => {
      this.toastr.error('Error al crear la observación', 'Error')
    })


  }
}


