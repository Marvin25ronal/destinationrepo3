import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, RoutesRecognized, NavigationEnd } from '@angular/router';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { MysqlService } from '../../services/mysql/mysql.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { SendEmailService } from '../../services/sendemail/send-email.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map, catchError } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthorizationService } from '../../services/authorization.service';
import { filter, pairwise } from 'rxjs/operators';
import { FilenameService } from 'src/app/services/data/filename.service';
import { TerritorialcoverageService } from 'src/app/services/Maintenance/territorialcoverage.service';
import { WarrantytypeService } from 'src/app/services/Maintenance/warrantytype.service';
import { ButtonsService } from 'src/app/services/fdt/buttons.service';
import { SysLink } from 'src/app/models/syslink.model';
import { SyslinkService } from 'src/app/services/Maintenance/syslink.service';
import { DocumentmodalComponent } from 'src/app/component/modals/documentmodal/documentmodal.component';
import { isNitValid } from 'src/app/Validators/NitValidator';
import { isDPIValid } from 'src/app/Validators/DPIValidator';
import { PlaceHoldersService } from 'src/app/services/place-holders.service';
import { ErrorMessagesService } from 'src/app/services/error-messages.service';


interface checkForm {
  value: boolean;
  data: {
    name: string;
    key: number;
  };
}

@Component({
  selector: "app-cutomer",
  templateUrl: "./cutomer.component.html",
  styleUrls: ["./cutomer.component.css"],
})
export class CutomerComponent implements AfterViewInit {

  @ViewChild(DocumentmodalComponent) viewDocumentModal: DocumentmodalComponent

  Avals = [];
  internetFiles = [];
  infornetFiles = [];
  pageName = "step1";
  flagPushPreviousFiduciary = false;
  flagPushInitMember = false;
  modeAfterUpdate = false;
  InitMembers = [];
  AvalMembers = [];
  AvalActualMembers = [];
  ActualAval;
  InitRepresentatives = [];
  AvalRepresentatives = [];
  AvalActualRepresentatives = [];
  dataUpdateFiducary;
  dataResponseSaveFiduciary;
  dataResponseAddRepresentative = [];
  FiduciaryinOnu = [];
  links: SysLink[] = []
  optionsWaranty = [
  ];

  RequestDelete;

  RequestMetaData;
  RequestActual;
  AvalClienteMetaData;
  territorialCoverage = [];

  optionsAval1_4 = [
    { id: 2, name: "Juridico" },
    { id: 3, name: "Empresa individual" },
    { id: 4, name: "Personal" },
  ];

  optionsAval5_8 = [
    { id: 6, name: "Juridico" },
    { id: 7, name: "Empresa individual" },
    { id: 8, name: "Personal" },
  ];

  optionsAval13_15 = [
    { id: 13, name: "Juridico" },
    { id: 14, name: "Empresa individual" },
    { id: 15, name: "Personal" },
  ];

  optionsAval17_19 = [
    { id: 17, name: "Juridico" },
    { id: 18, name: "Empresa individual" },
    { id: 19, name: "Personal" },
  ];

  FormInfornetFile = new FormGroup({
    mesage: new FormControl("", [Validators.required])

  });

  FormInitSolicitud = new FormGroup({
    type: new FormControl("", [Validators.required]),
    warranty: new FormControl("", [Validators.required]),
    location: new FormControl("", [Validators.required]),
    time_in_months: new FormControl("", [Validators.required]),
    destination: new FormControl("", [Validators.required]),
  });

  FormInitSolicitudStep2 = new FormGroup({
    doc_type: new FormControl("", [Validators.required]),
  });

  FormAvalPersonaIndividual = new FormGroup({
    name: new FormControl("", [Validators.required]),
    NIT: new FormControl("", [
      Validators.required,
      isNitValid,
    ]),
    phone: new FormControl("", [
      Validators.required,
      Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)"),
    ]),
  });

  FormJuridicoMembers = new FormGroup({
    name1: new FormControl("", [Validators.required]),
    name2: new FormControl("", []),
    name3: new FormControl("", []),
    name: new FormControl("", []),
    lastname1: new FormControl("", [Validators.required]),
    lastname2: new FormControl("", []),
    lastname3: new FormControl("", []),
    NIT: new FormControl("", [
      Validators.required,
      isNitValid,
    ]),
    phone: new FormControl("", [
      Validators.required,
      Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)"),
    ]),
    DPI: new FormControl("", [
      Validators.required,
      isDPIValid,
    ]),
  });

  FormJuridicoRepresentatives = new FormGroup({
    name1: new FormControl("", [Validators.required]),
    name2: new FormControl("", []),
    name3: new FormControl("", []),
    name: new FormControl("", []),
    lastname1: new FormControl("", [Validators.required]),
    lastname2: new FormControl("", []),
    lastname3: new FormControl("", []),
    NIT: new FormControl("", [
      Validators.required,
      isNitValid,
    ]),
    phone: new FormControl("", [
      Validators.required,
      Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)"),
    ]),
    DPI: new FormControl("", [
      Validators.required,
      isDPIValid,
    ]),
  });

  FormUpdateJuridicoMembers = new FormGroup({
    name1: new FormControl("", [Validators.required]),
    name2: new FormControl(''),
    name3: new FormControl(""),
    lastname1: new FormControl('', [Validators.required]),
    lastname2: new FormControl(''),
    lastname3: new FormControl(''),
    NIT: new FormControl("", [
      Validators.required,
      isNitValid,
    ]),
    phone: new FormControl("", [
      Validators.required,
      Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)"),
    ]),
    DPI: new FormControl("", [
      Validators.required,
      isDPIValid,
    ]),
  });

  FormUpdateJuridicoRepresentatives = new FormGroup({
    name1: new FormControl("", [Validators.required]),
    name2: new FormControl(''),
    name3: new FormControl(""),
    lastname1: new FormControl('', [Validators.required]),
    lastname2: new FormControl(''),
    lastname3: new FormControl(''),
    NIT: new FormControl("", [
      Validators.required,
      isNitValid,
    ]),
    phone: new FormControl("", [
      Validators.required,
      Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)"),
    ]),
    DPI: new FormControl("", [
      Validators.required,
      isDPIValid,
    ]),
  });

  FormInitMembers = new FormGroup({
    name: new FormControl("", [Validators.required]),
    NIT: new FormControl("", [
      Validators.required,
      isNitValid,
    ]),
    phone: new FormControl("", [
      Validators.required,
      Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)"),
    ]),
  });

  FormAval = new FormGroup({
    aval_type: new FormControl("", [Validators.required]),
  });

  FormAvalActual = new FormGroup({
    i: new FormControl(-1),
    type: new FormControl("", [Validators.required]),
  });

  FormAvalSubject = new FormGroup({
    name: new FormControl("", [Validators.required]),
    NIT: new FormControl("", [
      Validators.required,
      isNitValid,
    ]),
    phone: new FormControl("", [
      Validators.required,
      Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)"),
    ]),
  });

  ActualMember = new FormGroup({
    i: new FormControl(-1),
    name: new FormControl("", [Validators.required]),
    NIT: new FormControl("", [
      Validators.required,
      isNitValid,
    ]),
    phone: new FormControl("", [
      Validators.required,
      Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)"),
    ]),
  });

  ActualRepresentative = new FormGroup({
    i: new FormControl(-1),
    name: new FormControl("", [Validators.required]),
    NIT: new FormControl("", [
      Validators.required,
      isNitValid,
    ]),
    phone: new FormControl("", [
      Validators.required,
      Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)"),
    ]),
  });

  formfiduciary = new FormGroup({
    type: new FormControl("0", [Validators.required]),
    name1: new FormControl("Nombre", [Validators.required]),
    name2: new FormControl("", []),
    name3: new FormControl(''),
    lastname1: new FormControl("Apellido", [Validators.required]),
    lastname2: new FormControl("", []),
    lastname3: new FormControl(""),
    //name: new FormControl("", [Validators.required]),
    //name2: new FormControl("Segundo Nombre", [Validators.required]),
    //name3: new FormControl(null),
    //lastname1: new FormControl("Primer Apellido", [Validators.required]),
    //lastname2: new FormControl("Segundo Apellido", [Validators.required]),
    //lastname3: new FormControl(""),
    businessname: new FormControl(null, [Validators.required]),
    businessnit: new FormControl('', [
      Validators.required,
      isNitValid,
    ]),
    businessnumber: new FormControl(null, [Validators.required]),
    DPI: new FormControl("", [
      Validators.required,
      isDPIValid
    ]),
    nit: new FormControl("", [
      Validators.required,
      isNitValid
    ]),
  });

  modeActualRepresentativeModal;
  modeActualMembersModal;

  sub: Subscription;
  //--------COSAS PARA LOS FORMULARIOS DE UNA SOLICITUD--------------------
  isAllChecked: boolean;
  formsCheckBoxes: FormArray;
  formsCheckBoxesData: Array<checkForm>;
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

  //----------------TERMINA COSAS PARA LOS FORMULARIOS DE UNA SOLICITUD----------------------------------
  currentJustify = "fill";
  filterClient;
  dataPersons: any = [];
  dataMembers: any = [];
  optionsTypeRequest = [];
  currentOrientation = "horizontal";
  dataCustomer;
  initialRelation;
  loginitialRelation;
  documentCostumer;
  dataFiduciary;
  statusdocumentsCustomer;
  verificationsCustomer;
  warrantiesCustomer;
  visitDetails;
  dataCurrentuser;
  dataRequest: any = [];
  personsdata;
  logdataRequest;
  lastrequest;
  lastlogrequest;
  aditionalrequest;
  user_id;
  statusRelation;
  statusadicionaldoctument;
  statusdocinitialrelationjuridico;
  idadocinitialrelationjuridico;
  Docs = new FormArray([]);
  Docss = [];
  savedDocs;
  viewModalIdAdicionalDocument;
  idadicionaldoctument;
  subjectadicionaldocument;
  requestIdSelected;
  page = 1;
  pageSize = 10;
  usersolucredit = false;
  requestSelected = false;
  imgsrcbase64;
  pdfsrcbase64;
  seleccionType;
  countadicionaldocumentinitial = 0;
  completeadicionaldocinitial = 0;
  completdocinitial = 0;
  typeAdicionalDoc = true;
  RelacionStatus = false;
  typedocUpdatefiduciary;
  deletepersonid: any;
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
  declineChecks: { value: number, id: number, name: string, disabled: boolean }[] = [

  ]

  formrelacion = new FormGroup({
    date_of_visit: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required]),
    message: new FormControl("", [Validators.required]),
    description: new FormControl("", []),
    name: new FormControl(""),
  });

  solicituddocadicionalesf = new FormGroup({
    subject: new FormControl("", [Validators.required]),
    details: new FormControl("", [Validators.required]),
    representative_id: new FormControl(""),
    customer_fiduciary_id: new FormControl(""),
    typeselecadicional: new FormControl("0", [Validators.required]),
  });

  typeadicionalDoc = new FormGroup({
    typeadicional: new FormControl("0", [Validators.required]),
  });

  referencesForm = new FormGroup({
    has: new FormControl("", [Validators.required]),
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
  InitRepresentative: any;

  public beforeChange($event: NgbTabChangeEvent) {
    if ($event.nextId === "tab-preventchange2") {
      $event.preventDefault();
    }
  }
  constructor(
    private mysqlService: MysqlService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private _sendemail: SendEmailService,
    private modalService: NgbModal,
    private sanitizer: DomSanitizer,
    private autorization: AuthorizationService,
    private filenameS: FilenameService,
    private _territorial: TerritorialcoverageService,
    private _warranty: WarrantytypeService,
    private _wfService: ButtonsService,
    private _sysLinkService: SyslinkService,
    public placeHolders: PlaceHoldersService,
    public errorMessages: ErrorMessagesService,
  ) { }

  //wizard

  //SIGUIENTE PARA AVANZAR EN EL MODAL DE CREACION
  async getActivityWorkFlow(id) {
    console.log('YYYY')
    const res = await this._wfService.getActivity(id).toPromise()
      .then((response) => {

        console.log('KKKKKKKKKKKK')
        console.log(response)
        return response
      })
      .catch((error) => {
        console.log(error)
      })
    return res
  }
  getSizeAvals() {
    const fatherFiduciary = this.dataFiduciary.filter(item => item.id_father == null);
    return fatherFiduciary.length
  }
  getSizeRepresentatives() {
    return this.dataPersons.length;
  }
  getSizeMembers() {
    return this.dataMembers.length;
  }
  siguiente() {
    if (this.pageName == "step1") {
      this.pageName = "step2";
    } else if (this.pageName == "step2") {
      if (
        this.FormInitSolicitud.controls.warranty.value == 1 || //Hipotecaria
        this.FormInitSolicitud.controls.warranty.value == 2 || // Prendaria
        this.dataCustomer.type == 0
      ) {
        if (
          this.FormInitSolicitud.controls.warranty.value == 0 && //Fiduciaria
          this.flagPushPreviousFiduciary == false
        ) {
          let docType = this.FormInitSolicitudStep2.controls.doc_type.value; //PAGARE -> 0, REVOLVENTE -> 1

          const fatherFiduciary = this.dataFiduciary.filter(item => item.id_father == null);
          const SonFiduciary = this.dataFiduciary.filter(item => item.id_father !== null);

          fatherFiduciary.forEach((element) => {
            // element.type -->  1 = juridico ; 0 = individual ; 2 = empresa individual;
            console.log("docType", docType);
            //console.log("element", element);
            let name;

            name = element.name1;
            element.name2 !== null ? (name = name + " " + element.name2) : "";
            element.name3 !== null ? (name = name + " " + element.name3) : "";
            element.lastname1 !== null
              ? (name = name + " " + element.lastname1)
              : "";
            element.lastname2 !== null
              ? (name = name + " " + element.lastname2)
              : "";
            element.lastname3 !== null
              ? (name = name + " " + element.lastname3)
              : "";


            let representative_temp = [];
            let members_temp = [];


            if (element.type == 0 || element.type == 1 || element.type == 4) {
              let SubAval = {
                person_id: element.id_fiduciary,
                sys_subject_id:
                  docType == 0 && element.type == 1
                    ? 4
                    : docType == 0 && element.type == 4
                      ? 7
                      : docType == 0 && element.type == 0
                        ? 9
                        : docType == 1 && element.type == 1
                          ? 13
                          : docType == 1 && element.type == 4
                            ? 16
                            : docType == 1 && element.type == 0
                              ? 18
                              : docType == 5 && element.type == 1
                                ? 27
                                : docType == 5 && element.type == 4
                                  ? 30
                                  : docType == 5 && element.type == 0
                                    ? 32
                                    : docType == 6 && element.type == 1
                                      ? 35
                                      : docType == 6 && element.type == 4
                                        ? 38
                                        : docType == 6 && element.type == 0
                                          ? 40
                                          : "",
                name:
                  element.type == 0
                    ? element.name
                    : element.type == 1
                      ? element.businessname
                      : "",
                nit: element.nit,
                phone: element.phone,
              };

              if (element.type == 1) {
                SonFiduciary.forEach((item) => {
                  let nameSon;

                  nameSon = item.name1;
                  item.name2 !== null ? (nameSon = nameSon + " " + item.name2) : "";
                  item.name3 !== null ? (nameSon = nameSon + " " + item.name3) : "";
                  item.lastname1 !== null
                    ? (nameSon = nameSon + " " + item.lastname1)
                    : "";
                  item.lastname2 !== null
                    ? (nameSon = nameSon + " " + item.lastname2)
                    : "";
                  item.lastname3 !== null
                    ? (nameSon = nameSon + " " + item.lastname3)
                    : "";

                  if (element.id_fiduciary == item.id_father && item.type == 2) {


                    let rep = {
                      person_id: item.id_fiduciary,
                      sys_subject_id:
                        docType == 0
                          ? 5
                          : docType == 1
                            ? 14
                            : docType == 5
                              ? 28
                              : docType == 6
                                ? 36
                                : "",
                      name: item.name,
                      nit: item.nit,
                      phone: item.phone,
                    };

                    representative_temp.push(rep);

                  }

                  if (element.id_fiduciary == item.id_father && item.type == 3) {

                    let mem = {
                      person_id: item.id_fiduciary,
                      sys_subject_id:
                        docType == 0
                          ? 6
                          : docType == 1
                            ? 15
                            : docType == 5
                              ? 29
                              : docType == 6
                                ? 37
                                : "",
                      name: item.name,
                      nit: item.nit,
                      phone: item.phone,
                    };

                    members_temp.push(mem);

                  }


                });

              }
              let Aval = {
                person_id: element.id_fiduciary,
                sys_w_element_id:
                  docType == 0 && element.type == 1
                    ? 2
                    : docType == 0 && element.type == 4
                      ? 3
                      : docType == 0 && element.type == 0
                        ? 4
                        : docType == 1 && element.type == 1
                          ? 6
                          : docType == 1 && element.type == 4
                            ? 7
                            : docType == 1 && element.type == 0
                              ? 8
                              : docType == 5 && element.type == 1
                                ? 13
                                : docType == 5 && element.type == 4
                                  ? 14
                                  : docType == 5 && element.type == 0
                                    ? 15
                                    : docType == 6 && element.type == 1
                                      ? 17
                                      : docType == 6 && element.type == 4
                                        ? 18
                                        : docType == 6 && element.type == 0
                                          ? 19
                                          : "",
                type:
                  docType == 0 && element.type == 1
                    ? 2
                    : docType == 0 && element.type == 2
                      ? 3
                      : docType == 0 && element.type == 0
                        ? 4
                        : docType == 1 && element.type == 1
                          ? 6
                          : docType == 1 && element.type == 2
                            ? 7
                            : docType == 1 && element.type == 0
                              ? 8
                              : docType == 5 && element.type == 1
                                ? 13
                                : docType == 5 && element.type == 2
                                  ? 14
                                  : docType == 5 && element.type == 0
                                    ? 15
                                    : docType == 6 && element.type == 1
                                      ? 17
                                      : docType == 6 && element.type == 2
                                        ? 18
                                        : docType == 6 && element.type == 0
                                          ? 19
                                          : "",
                subjects_member: members_temp,
                subjects_aval: SubAval,
                subjects_representatives: representative_temp,
              };

              this.Avals.push(Aval);

            }





          });


          this.flagPushPreviousFiduciary = true;
        }

        this.pageName = "step4";
      } else {

        if (this.flagPushInitMember == false) {


          this.dataMembers.forEach(element => {
            if (element.representative_id === null) {
              console.log("element for InitMembers:: ");
              console.log(element);
              let member = {
                name: element.name,
                nit: '',
                phone: element.mobile_phone,
                person_id: element.person_id
              };

              this.InitMembers.push(member);

            }
          });
          this.InitRepresentative = []
          this.dataPersons.forEach(element => {
            let member = {
              name: element.name,
              nit: '',
              phone: element.mobile_phone,
              person_id: element.person_id
            }
            this.InitRepresentative.push(member)
          })
          this.flagPushInitMember = true;
        }


        this.pageName = "step3";
      }
    } else if (this.pageName == "step3") {

      if (
        this.FormInitSolicitud.controls.warranty.value == 0 &&
        this.flagPushPreviousFiduciary == false
      ) {
        let docType = this.FormInitSolicitudStep2.controls.doc_type.value; //PAGARE -> 0, REVOLVENTE -> 1

        const fatherFiduciary = this.dataFiduciary.filter(item => item.id_father == null);
        const SonFiduciary = this.dataFiduciary.filter(item => item.id_father !== null);

        fatherFiduciary.forEach((element) => {
          // element.type -->  1 = juridico ; 0 = individual ; 2 = empresa individual;
          console.log("docType", docType);
          console.log("element", element);
          let name;
          name = element.name1 ? element.name : (element.name ? element.name : '');
          element.name2 !== null ? (name = name + " " + element.name2) : "";
          element.name3 !== null ? (name = name + " " + element.name3) : "";
          element.lastname1 !== null
            ? (name = name + " " + element.lastname1)
            : "";
          element.lastname2 !== null
            ? (name = name + " " + element.lastname2)
            : "";
          element.lastname3 !== null
            ? (name = name + " " + element.lastname3)
            : "";


          let representative_temp = [];
          let members_temp = [];


          if (element.type == 0 || element.type == 1 || element.type == 4) {
            let SubAval = {
              person_id: element.id_fiduciary,
              sys_subject_id:
                docType == 0 && element.type == 1
                  ? 4
                  : docType == 0 && element.type == 4
                    ? 7
                    : docType == 0 && element.type == 0
                      ? 9
                      : docType == 1 && element.type == 1
                        ? 13
                        : docType == 1 && element.type == 4
                          ? 16
                          : docType == 1 && element.type == 0
                            ? 18
                            : docType == 5 && element.type == 1
                              ? 27
                              : docType == 5 && element.type == 4
                                ? 30
                                : docType == 5 && element.type == 0
                                  ? 32
                                  : docType == 6 && element.type == 1
                                    ? 35
                                    : docType == 6 && element.type == 4
                                      ? 38
                                      : docType == 6 && element.type == 0
                                        ? 40
                                        : "",
              name:
                element.type == 0
                  ? element.name
                  : element.type == 1
                    ? element.businessname
                    : "",
              nit: element.nit,
              phone: element.phone,
            };

            if (element.type == 1) {
              SonFiduciary.forEach((item) => {
                console.log("ITEM SonFiduciary");
                console.log(item);
                let nameSon;

                nameSon = item.name1 ? item.name1 : (item.name ? item.name : '');
                item.name2 !== null ? (nameSon = nameSon + " " + item.name2) : "";
                item.name3 !== null ? (nameSon = nameSon + " " + item.name3) : "";
                item.lastname1 !== null
                  ? (nameSon = nameSon + " " + item.lastname1)
                  : "";
                item.lastname2 !== null
                  ? (nameSon = nameSon + " " + item.lastname2)
                  : "";
                item.lastname3 !== null
                  ? (nameSon = nameSon + " " + item.lastname3)
                  : "";

                if (element.id_fiduciary == item.id_father && item.type == 2) {


                  let rep = {
                    person_id: item.id_fiduciary,
                    sys_subject_id:
                      docType == 0
                        ? 5
                        : docType == 1
                          ? 14
                          : docType == 5
                            ? 28
                            : docType == 6
                              ? 36
                              : "",
                    name: nameSon,
                    nit: item.nit,
                    phone: item.phone,
                  };

                  representative_temp.push(rep);

                }

                if (element.id_fiduciary == item.id_father && item.type == 3) {

                  let mem = {
                    person_id: item.id_fiduciary,
                    sys_subject_id:
                      docType == 0
                        ? 6
                        : docType == 1
                          ? 15
                          : docType == 5
                            ? 29
                            : docType == 6
                              ? 37
                              : "",
                    name: nameSon,
                    nit: item.nit,
                    phone: item.phone,
                  };

                  members_temp.push(mem);

                }


              });

            }

            let Aval = {
              person_id: element.id_fiduciary,
              sys_w_element_id:
                docType == 0 && element.type == 1
                  ? 2
                  : docType == 0 && element.type == 4
                    ? 3
                    : docType == 0 && element.type == 0
                      ? 4
                      : docType == 1 && element.type == 1
                        ? 6
                        : docType == 1 && element.type == 4
                          ? 7
                          : docType == 1 && element.type == 0
                            ? 8
                            : docType == 5 && element.type == 1
                              ? 13
                              : docType == 5 && element.type == 4
                                ? 14
                                : docType == 5 && element.type == 0
                                  ? 15
                                  : docType == 6 && element.type == 1
                                    ? 17
                                    : docType == 6 && element.type == 4
                                      ? 18
                                      : docType == 6 && element.type == 0
                                        ? 19
                                        : "",
              type:
                docType == 0 && element.type == 1
                  ? 2
                  : docType == 0 && element.type == 2
                    ? 3
                    : docType == 0 && element.type == 0
                      ? 4
                      : docType == 1 && element.type == 1
                        ? 6
                        : docType == 1 && element.type == 2
                          ? 7
                          : docType == 1 && element.type == 0
                            ? 8
                            : docType == 5 && element.type == 1
                              ? 13
                              : docType == 5 && element.type == 2
                                ? 14
                                : docType == 5 && element.type == 0
                                  ? 15
                                  : docType == 6 && element.type == 1
                                    ? 17
                                    : docType == 6 && element.type == 2
                                      ? 18
                                      : docType == 6 && element.type == 0
                                        ? 19
                                        : "",
              subjects_member: members_temp,
              subjects_aval: SubAval,
              subjects_representatives: representative_temp,
            };

            this.Avals.push(Aval);

          }





        });
        this.flagPushPreviousFiduciary = true;
      }

      this.pageName = "step4";
    } else {

      console.log(this.pageName);
    }
  }

  //ATRAS PARA RETROCEDER EN EL MODAL DE CREACION
  atras() {
    if (this.pageName == "step2") {
      this.pageName = "step1";
    } else if (this.pageName == "step3") {
      this.pageName = "step2";
    } else if (this.pageName == "step4") {
      if (
        this.FormInitSolicitud.controls.warranty.value == 1 ||
        this.FormInitSolicitud.controls.warranty.value == 2 ||
        this.dataCustomer.type == 0
      ) {
        this.pageName = "step2";
      } else {
        this.pageName = "step3";
      }
    } else {
      console.log(this.pageName);
    }
  }
  //METODOS PARA LOS BOTONES DE SUBMIT SE ABILITEN O NO
  isCorrect(): boolean {
    return !true;
  }
  isCorrect2(): boolean {
    return !true;
  }

  //ESTOS SON METODOS PARA EL TEMA DE LA VALIDACION DE LOS PERMISOS

  canInitRelation(): boolean {
    let resource = "CLIENT";
    return this.autorization.havePermission(resource, "INIT_RELATION");
  }
  canAddRepresentative(): boolean {
    let resource = "CLIENT";
    return this.autorization.havePermission(resource, "ADD_REPRESENTATIVE");
  }
  canAddAval(): boolean {
    let resource = 'CLIENT'
    return this.autorization.havePermission(resource, "ADD_AVAL")
  }
  canAddnewMember(): boolean {
    let resource = 'CLIENT'
    return this.autorization.havePermission(resource, "ADD_MEMBER")
  }
  canCreateRequest(): boolean {
    let resource = "REQUEST";
    let resp = this.autorization.havePermission(resource, "CREATE_REQUEST");
    //console.log(`En canCreateRequest ${resp}  usersolucredit = ${this.usersolucredit}`);
    return resp;
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
        //console.log('persons',this.dataPersons);
      });
    return res;
  }

  async getMembers() {
    const res = this.mysqlService
      .getCustomerMembers(this.user_id)
      .toPromise()
      .then((response) => {
        this.dataMembers = response.data;
        console.log("socios", this.dataMembers);
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

  //Searching Members..........
  _searchTermMember: string;
  get searchTermMember(): string {
    return this._searchTermMember;
  }
  set searchTermMember(val: string) {
    this._searchTerm = val;
    this.dataPersons = this.filter(val);
  }

  filterMember(v: string) {
    if (v !== "") {
      return this.dataMembers.filter(
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
      return this.getMembers();
    }
  }

  addnewPerson(id: string) {
    this.modalService.dismissAll();
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

  addnewMember() {
    this.modalService.dismissAll();
    if (this.activatedRoute.snapshot.url.length > 0) {
      console.log("entro");
      if (
        this.activatedRoute.snapshot.url[0].path !== undefined &&
        this.activatedRoute.snapshot.url[0].path === "cliente"
      ) {
        console.log("entro222");
        this.router.navigate([`/new-member/cliente/${this.user_id}`]);
      }
    } else {
      this.router.navigate([`/new-member`]);
    }
  }

  editPerson(id: string) {
    this.modalService.dismissAll();
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
    this.modalService.dismissAll();
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
    this.router.navigate([`/edit-customer/`, this.dataCustomer.customer_id]);
  }

  async ChangeStatusRequest(type, val) {
    let body = {};
    if (type === "verificaciones") {
      body = {
        verifications: val,
      };
    } else if (type === "garantia") {
      body = {
        warranties: val,
      };
    } else if (type === "formulario") {
      body = {
        documents: val,
      };
    }
    await this.mysqlService
      .UpdateRequestCustomer(body, this.requestIdSelected)
      .toPromise()
      .then((response) => {
        this.getAllCustomerRequest();
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
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
        console.log("Este es");
        console.log(response);
        this.dataCustomer = response.data.customer;
        this.getInternetFiles();
        this.initialRelation = response.data.relation[0];
        console.log("this.initialRelation: ", this.initialRelation);

        this.referencesForm.patchValue({
          has: String(this.initialRelation.has_internet_references),
        });

        this.loginitialRelation = response.data.logrelation;
        this.aditionalrequest = response.data.aditional;
        this.dataFiduciary = response.data.fiduciaries;
        console.log("dataFiduciary:: ");
        console.log(this.dataFiduciary);
        this.dataFiduciary.forEach((element) => {
          console.log(element);
          debugger
          if (element.in_onulist == 1) {
            this.FiduciaryinOnu.push(
              {
                name: `${element.name}`,
                business: element.businessname
              });
          }
        });
        //console.log("data", response);
        if (this.initialRelation) {
          /*if (
            this.initialRelation.DPI_key &&
            this.initialRelation.letter_of_consent_key
          ) {
            this.countadicionaldocumentinitial++;
          }*/

          if (this.initialRelation.status_doc == 2) {
            this.completdocinitial++;
          }
        }
        const currentDate = new Date();
        this.formrelacion.patchValue({
          date_of_visit: currentDate.toISOString().substring(0, 10),
          email: response.data.customer.email,
          message:
            "Por este medio Soluciones Crediticias, S.A., ha tomado en cuenta a su persona para ser partícipe de un producto financiero de nuestra empresa. ",
        });
        this.spinner.hide();
        // console.log(response);
      });
    return res;
  }

  async selectRequest(id_request) {
    this.router.navigate([
      `cumplimiento-cliente/${this.user_id}/${id_request}`,
    ]);
    /*this.requestIdSelected = id_request;
    this.spinner.show();
    await this.mysqlService
      .GetAllDataCustomerRequest(this.user_id, id_request)
      .toPromise()
      .then((response) => {
        //console.log('response',response);
        this.documentCostumer = response.data.documents;
        this.statusdocumentsCustomer = response.data.statusdocuments;
        this.verificationsCustomer = response.data.verifications;
        this.warrantiesCustomer = response.data.warranties;
        this.requestSelected = true;
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
        this.CheckDocumentStatus(this.statusdocumentsCustomer);
      })
      .catch((error) => {
        console.log(error);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
    this.initApplicationStuff();*/
  }

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
        this.imgsrcbase64 = null;
        this.pdfsrcbase64 = null;
        if (response.data.type === "image") {
          const urls =
            "data:image/jpg;base64;base64," +
            response.data.imgdata.document_name;
          this.imgsrcbase64 = this.sanitizer.bypassSecurityTrustResourceUrl(
            urls
          );
        } else if (response.data.type === "pdf") {
          const urls =
            "data:application/pdf;base64," +
            response.data.imgdata.document_name;
          this.pdfsrcbase64 = response.data.imgdata.document_name
        }
        this.spinner.hide();
      })
      .catch((error) => {
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
    this.viewDocumentModal.openModal()
  }

  async ViewDocuCustomer(modal, type, dockey, relation_id) {
    this.spinner.show();
    console.log(dockey);
    await this.mysqlService
      .GetOneDocument({
        type: type,
        id: relation_id,
        document_key: dockey,
      })
      .toPromise()
      .then((response) => {
        console.log("view", response);
        this.imgsrcbase64 = null;
        this.pdfsrcbase64 = null;
        if (response.data.type === "image") {
          const urls =
            "data:image/jpg;base64;base64," + response.data.relation.DPI_key;
          this.imgsrcbase64 = this.sanitizer.bypassSecurityTrustResourceUrl(
            urls
          );
        } else if (response.data.type === "pdf") {

          this.pdfsrcbase64 = response.data.relation.DPI_key
        }
        this.spinner.hide();
      })
      .catch((error) => {
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
    this.viewDocumentModal.openModal()
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
        console.log("view", response);
        this.imgsrcbase64 = null;
        this.pdfsrcbase64 = null;
        if (response.data.type === "image") {
          const urls =
            "data:image/jpg;base64;base64," + response.data.relation.DPI_key;
          this.imgsrcbase64 = this.sanitizer.bypassSecurityTrustResourceUrl(
            urls
          );
        } else if (response.data.type === "pdf") {

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
        await this.selectRequest(this.requestIdSelected);
        this.toastr.success("Se elimino el archivo.", "Archivo Eliminado!");
      })
      .catch((error) => {
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }

  async CheckDocumentStatus(data) {
    await data.forEach((element) => {
      //console.log(element);

      if (element.name == "solicitud" && element.status === 1) {
        this.StatusSolicitud = {
          status: "Completo",
          class: "label-success",
          check: true,
        };
      } else if (element.name == "perfil" && element.status === 1) {
        this.StatusPerfil = {
          status: "Completo",
          class: "label-success",
          check: true,
        };
      } else if (element.name == "feic" && element.status === 1) {
        this.StatusFeic = {
          status: "Completo",
          class: "label-success",
          check: true,
        };
      } else if (element.name == "iveproductos" && element.status === 1) {
        this.StatusIve = {
          status: "Completo",
          class: "label-success",
          check: true,
        };
      } else if (element.name == "cpe" && element.status === 1) {
        this.StatusCpe = {
          status: "Completo",
          class: "label-success",
          check: true,
        };
      } else if (element.name == "pep" && element.status === 1) {
        this.Statuspep = {
          status: "Completo",
          class: "label-success",
          check: true,
        };
      } else if (
        element.name == "autorizacionparaconsultas" &&
        element.status === 1
      ) {
        this.StatusAuto = {
          status: "Completo",
          class: "label-success",
          check: true,
        };
      } else if (
        element.name == "cartaparaelbancointernacional" &&
        element.status === 1
      ) {
        this.StatusCarta = {
          status: "Completo",
          class: "label-success",
          check: true,
        };
      } else if (element.name == "estadopatrimonial" && element.status === 1) {
        this.StatusEstado = {
          status: "Completo",
          class: "label-success",
          check: true,
        };
      } else if (element.name == "flujosdefondos" && element.status === 1) {
        this.StatusFlujos = {
          status: "Completo",
          class: "label-success",
          check: true,
        };
      } else if (
        element.name == "endeudamientobancario" &&
        element.status === 1
      ) {
        this.StatusEndeudamiento = {
          status: "Completo",
          class: "label-success",
          check: true,
        };
      } else if (
        element.name == "formatoparaintegraciones" &&
        element.status === 1
      ) {
        this.StatusFormato = {
          status: "Completo",
          class: "label-success",
          check: true,
        };
      } else if (element.name == "registrodedeudores" && element.status === 1) {
        this.StatusDeudores = {
          status: "Completo",
          class: "label-success",
          check: true,
        };
      } else if (element.name == "prendaria" && element.status === 1) {
        this.StatusPrendaria = {
          status: "Completo",
          class: "label-success",
          check: true,
        };
      } else if (element.name == "hipotecaria" && element.status === 1) {
        this.StatusHipotecaria = {
          status: "Completo",
          class: "label-success",
          check: true,
        };
      } else if (element.name == "fiduciaria" && element.status === 1) {
        this.StatusFiduciaria = {
          status: "Completo",
          class: "label-success",
          check: true,
        };
      } else if (element.name == "visitasinicial" && element.status === 1) {
        this.StatusVisitasInicial = {
          status: "Completo",
          class: "label-success",
          check: true,
        };
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
      } else if (element.name == "infornet" && element.status === 1) {
        this.StatusInfornet = {
          status: "Completo",
          class: "label-success",
          check: true,
        };
      } else if (element.name == "sat" && element.status === 1) {
        this.StatusSat = {
          status: "Completo",
          class: "label-success",
          check: true,
        };
      } else if (element.name == "declaraguate" && element.status === 1) {
        this.StatusDeclaraguate = {
          status: "Completo",
          class: "label-success",
          check: true,
        };
      }
    });
    this.spinner.hide();
  }

  async ngOnInit() {
    this.countadicionaldocumentinitial = 0;
    this.completeadicionaldocinitial = 0;
    this.completdocinitial = 0;
    this.spinner.show();
    this.sub = await this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        //console.log('prev de cutomer:', event.url);
        localStorage.setItem("cutomer-previous-url", event.url);
        let idUrl = event.url.split('/');
        let idUrlAux = idUrl[idUrl.length - 1];
        //console.log('current Customer ID:: ', idUrlAux);

        localStorage.setItem("previousClientID", idUrlAux);
        this.sub.unsubscribe();
      });
    //console.log(this.activatedRoute.snapshot);
    if (this.activatedRoute.snapshot.url.length > 0) {
      if (
        this.activatedRoute.snapshot.url[0].path !== undefined &&
        this.activatedRoute.snapshot.url[0].path === "cliente"
      ) {
        this.user_id = this.activatedRoute.snapshot.params.id;
        this.usersolucredit = true;
      }
    } else {
      if (this.activatedRoute.snapshot.params) {
        this.user_id = this.activatedRoute.snapshot.params.id;
      } else {
        this.dataCurrentuser = JSON.parse(localStorage.getItem("Usuario"));
        this.user_id = this.dataCurrentuser.customer_id;
      }
      this.usersolucredit = false;
      this.dataCurrentuser = JSON.parse(localStorage.getItem("Usuario"));
      console.log('EN EL ELSE PARA TRAER INFO DE LOCAL::: ');
      console.log(this.dataCurrentuser);
      if (this.dataCurrentuser) {
        this.user_id = this.dataCurrentuser.customer_id;
        this.usersolucredit = false;

      }
      else {
        this.user_id = localStorage.getItem('clientIDForFicha');
        this.router.navigate(['customer', 'cliente', this.user_id]);
      }

    }
    /*  this.usersolucredit = true; */
    await this.getPersons();
    await this.getMembers();
    await this.getAllCustomerRequest();
    await this.getDataCurrentCostumer();
    await this.getTypeRequest();
    await this.chageType();
    await this.chageTypeAdicionalDoc();
    await this.getDataPersonCurrentCostumer();
    //data territorial
    await this.getTerritorialCoverageData()
    await this.getWarrantyType();
    await this.getInfornetFiles()
    await this.getLinks()


  }
  getTypePerson(person) {
    let type = person.representative_id ? (person.member_id ? 'Representante y Socio' : 'Representante') : 'Socio'
    return type
  }
  getWarrantyType() {
    this._warranty.getWarrantyList(this.pageSize, 0, []).subscribe((coverage) => {
      this.optionsWaranty = coverage.warranty_type;
      console.log(this.optionsWaranty)
    })
  }
  getTerritorialCoverageData() {
    this._territorial.getCoverage(this.pageSize, 0, []).subscribe((coverage) => {
      this.territorialCoverage = coverage.territorial_coverage;
      console.log(this.territorialCoverage)
    })
  }

  async getAllCustomerRequest() {
    const res = this.mysqlService
      .GetCustomerRequest(this.user_id)
      .toPromise()
      .then(async (response) => {
        //console.log('data request: ',response);
        this.dataRequest = response.data.request;
        if (this.dataRequest) {
          this.lastrequest = response.data.request[this.dataRequest.length - 1];
          this.logdataRequest = response.data.logrequest;
        }
        for (let i = 0; i < this.dataRequest.length; i++) {

          this.dataRequest[i].aux = await this.getActivityWorkFlow(this.dataRequest[i].request_id)
        }
        console.log(this.dataRequest);

        this.CheckStatusRequest(this.dataRequest);
      })
      .catch((error) => {
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
    return res;
  }

  onCheckboxChange(e, locationd, documenttype, nspinner) {
    this.spinner.show(nspinner);
    console.log(e.target.value.toLowerCase());
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
          this.Statuspep.class = "label-success";
          this.Statuspep.status = "Completo";
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
        .then((response) => {
          this.StatusDeclaraguate.class = "label-success";
          this.StatusDeclaraguate.status = "Completo";
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
        .then((response) => {
          this.StatusDeclaraguate.class = "label-warning";
          this.StatusDeclaraguate.status = "Pendiente";
          this.spinner.hide(nspinner);
        })
        .catch((error) => {
          this.spinner.hide(nspinner);
          this.toastr.error("Problemas con el servidor.", "Oops!");
        });
    }
  }

  OpenVisita(modal) {
    this.modalService.open(modal, {
      centered: true,
      backdrop: "static",
      keyboard: false,
      size: "lg",
      windowClass: 'my-modal'
    });
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
          person_id: 0,
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
          let email_user = this.formrelacion.value.email;
          let name_employe = localStorage.getItem("name");
          this._sendemail
            .sendEmail({
              Subject:
                "[Solucredit App] - Revisión de solicitud de inicio de relación",
              To: localStorage.getItem("email"),
              template_id: 9,
              customer_id: this.user_id,
              employe: name_employe,
              type_user: this.dataCustomer.type,
            })
            .subscribe(
              (response) => {
                this.toastr.success(
                  "Se enviaron los requisitos al correo electronico.",
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
        } else if (this.statusRelation === 3) {
          this.toastr.success(
            "Se rechazaron los documentos.",
            "Cambio Exitoso!"
          );
          let email_user = this.formrelacion.value.email;
          this._sendemail
            .sendEmail({
              Subject:
                "[Solucredit App] - Rechazo de solicitud de inicio de relación",
              To: email_user,
              template_id: 8,
              customer_id: this.user_id,
              type_user: this.dataCustomer.type,
              description: this.cambiarEstadoRelacion.value.description
                .value,
            })
            .subscribe(
              (response) => {
                this.toastr.success(
                  "Se enviaron los requisitos al correo electronico.",
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

  async ChangeStatusAdicionalRequest() {
    this.spinner.show();
    await this.mysqlService
      .UpdateAditionalDocument(
        {
          status: this.statusadicionaldoctument,
          modification_date: new Date(),
          employee_email: localStorage.getItem("email"),
          description: this.cambiarEstadoRelacion.value.description,
          id_relation: this.initialRelation.id,
          subject: this.subjectadicionaldocument,
        },
        this.idadicionaldoctument
      )
      .toPromise()
      .then((res) => {
        if (this.statusadicionaldoctument === 2) {
          this.toastr.success(
            "Se acepto el documento adicional.",
            "Cambio Exitoso!"
          );
          this.getDataCurrentCostumer();
          let email_user = this.formrelacion.value.email;
          let name_employe = localStorage.getItem("name");
          /*this._sendemail
            .sendEmail({
              Subject:
                "[Solucredit App] - Revisión de solicitud de inicio de relación",
              To: localStorage.getItem("email"),
              template_id: 9,
              customer_id: this.user_id,
              employe: name_employe,
              type_user: this.dataCustomer.type,
            })
            .subscribe(
              (response) => {
                this.toastr.success(
                  "Se enviaron los requisitos al correo electronico.",
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
            );*/
        } else if (this.statusadicionaldoctument === 1) {
          this.toastr.success(
            "Se rechazaron los documentos.",
            "Cambio Exitoso!"
          );
          let email_user = this.formrelacion.value.email;
          /*this._sendemail
            .sendEmail({
              Subject:
                "[Solucredit App] - Rechazo de documentos adicionales",
              To: email_user,
              template_id: 8,
              customer_id: this.user_id,
              type_user: this.dataCustomer.type,
              description: this.cambiarEstadoRelacion.controls.description
                .value,
            })
            .subscribe(
              (response) => {
                this.toastr.success(
                  "Se enviaron los requisitos al correo electronico.",
                  "Enviado!"
                );
                this.spinner.hide();
              },
              (error) => {
                this.toastr.error(
                  "Verificar información del formulario.",
                  "Oops!"
                );
                this.spinner.hide();
              }
            );*/
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

  async RequestadditonalDocuments() {
    this.spinner.show();
    if (!this.solicituddocadicionalesf.value.representative_id) {
      delete this.solicituddocadicionalesf.value.representative_id;
    }
    if (!this.solicituddocadicionalesf.value.customer_fiduciary_id) {
      delete this.solicituddocadicionalesf.value.customer_fiduciary_id;
    }
    this.solicituddocadicionalesf.value.customer_id = this.user_id;
    await this.mysqlService
      .AditionalRequest(this.solicituddocadicionalesf.value)
      .toPromise()
      .then((res) => {
        this.spinner.hide();
        this.modalService.dismissAll();

        this.toastr.success(
          "La información fue enviada",
          "Información Enviada!"
        );
        let email_user = this.formrelacion.value.email;
        let email_employe = localStorage.getItem("email");
        debugger
        this._sendemail
          .sendEmail({
            Subject: "[Solucredit App] - Solicitud de documentos adicionales",
            To: email_user,
            template_id: 22,
            message: `<strong>${this.solicituddocadicionalesf.value.subject}</strong>-${this.solicituddocadicionalesf.value.details}`,
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
              this.solicituddocadicionalesf.reset({});
              this.ngOnInit();
            },
            (error) => {
              this.toastr.error(
                "Verificar información del formulario.",
                "Oops!"
              );
              this.spinner.hide();
            }
          )
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
          person_id: 0,
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
            Subject: "[Solucredit App] - Solicitud de inicio de relación",
            To: email_user,
            template_id: this.dataCustomer.type == 0 ? 5 : 7,
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
          person_id: 0,
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
            Subject: "[Solucredit App] - Solicitud de inicio de relación",
            To: email_user,
            template_id: this.dataCustomer.type == 0 ? 5 : 7,
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

  ngAfterViewInit(): void { }

  async showPreviewImage(event, locationd, documenttype, nspinner) {
    console.log("ENTRO A showPreviewImage");
    if (event.target.files && event.target.files[0]) {
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
          .then((response) => {
            console.log("res", response);
            this.saveDocuments(
              response.data.Key,
              documenttype,
              nspinner,
              locationd,
              named
            );
            event.srcElement.value = null;
          })
          .catch((error) => {
            this.spinner.hide(nspinner);
            this.toastr.error("Problemas con guardar la imagen", "Oops!");
          });
      };

      await reader.readAsDataURL(event.target.files[0]);
      event.srcElement.value = null;
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
    console.log("ENTRO A saveDocuments");
    if (type == "formularios") {
      console.log("ENTRO A FORMULARIOS");
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
          await this.selectRequest(this.requestIdSelected);
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
      console.log("ENTRO A GARANTIAS");
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
          await this.selectRequest(this.requestIdSelected);
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
      debugger
      console.log("ENTRO A VERIFICACIONES");
      console.log(this.Formvisitainicial);
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
          await this.selectRequest(this.requestIdSelected);
          this.spinner.hide(nspinner);
          this.Formvisitainicial;
          console.log(this.Formvisitainicial);
          this.toastr.success(
            "El documento fue guardado.",
            "Documento Guardado!"
          );
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
      //ESTO SE TIENE QUE AGREGAR PARA LA NUEVA VERSIOn
      warranty_type: 0,
      doc_type: 0,
      members: `[{"name":"string","phone":"string","email":"string","nit":"string","dpi":"string"},{"name":"string","phone":"string","email":"string","nit":"string","dpi":"string"}]`,
      avals: [
        {
          sys_w_element_id: 4,
          type: 4,
          subjects: [
            {
              sys_subject_id: 9,
              name: "NOMBRE PERSONA INDIVIDUAL",
              phone: "TELEFONO PERSONA INDIVIDUAL",
              email: "EMAIL PERSONA INDIVIDUAL",
              nit: "87878-i",
              dpi: "11111111",
              forms: null,
            },
          ],
        },
        {
          sys_w_element_id: 2,
          type: 4,
          subjects: [
            {
              sys_subject_id: 4,
              name: "NOMBRE AVAL JURIDICO",
              phone: "TELEFONO AVAL JURIDICO",
              email: "EMAIL AVAL JURIDICO",
              nit: "87878-i",
              dpi: "11111111",
              forms: null,
            },
            {
              sys_subject_id: 5,
              name: "NOMBRE REPRESENTANTE LEGAL AVAL JURIDICO",
              phone: "TELEFONO REPRESENTANTE LEGAL AVAL JURIDICO",
              email: "EMAIL REPRESENTANTE LEGAL AVAL JURIDICO",
              nit: "87878-h",
              dpi: "789696",
              forms: null,
            },
            {
              sys_subject_id: 6,
              name: "NOMBRE SOCIO AVAL JURIDICO",
              phone: "TELEFONO SOCIO AVAL JURIDICO",
              email: "EMAIL SOCIO AVAL JURIDICO",
              nit: "87878-q",
              dpi: "789696",
              forms: null,
            },
          ],
        },
      ],
    };
    await this.mysqlService
      .CreateCustomerRequest(body)
      .toPromise()
      .then((response) => {
        this.toastr.success(
          "La solicitud fue creada con éxito.",
          "Solicitud Creada!"
        );

        this._sendemail
          .sendEmail({
            Subject: "[Solucredit App] - Nueva solicitud de cliente",
            To: localStorage.getItem("email"),
            template_id: 10,
            message: this.formrelacion.value.message,
            customer_id: this.user_id,
            employe: localStorage.getItem("name"),
          })
          .subscribe(
            (response) => {
              this.toastr.success(
                "Se enviaron los requisitos al correo electronico.",
                "Enviado!"
              );
            },
            (error) => {
              this.toastr.error(
                "Verificar información del formulario.",
                "Oops!"
              );
            }
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
        this.optionsTypeRequest = response.data;
        //console.log("rest", response.data);
      });
    return res;
  }

  //-----LO DEL CORREO Y EL REQUERIMIENTO DE LOS FOMRULARIOS Y SOLICTUDES
  sendCustomerEmail(): void {
    this._sendemail
      .sendCustomerEmail(
        this.dataCustomer,
        this.formsCheckBoxes.getRawValue(),
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
  openModalXXL(targetModal) {
    this.chageTypeWarranties();
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: "static",
      keyboard: false,
      windowClass: "modal1",

    });
  }

  openModalSR(targetModal) {
    this.chageTypeWarranties();
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: "static",
      keyboard: false,
      size: 'xl',
      windowClass: 'my-modal'
    });
  }
  openModalSR2(targetModal) {
    this.chageTypeWarranties();
    this.formfiduciary.reset()
    this.dataResponseAddRepresentative = []
    this.formfiduciary.controls.type.setValue('0')
    this.AvalActualMembers = []
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: "static",
      keyboard: false,
      windowClass: 'modal1'
    });
  }
  async DeleteDocRelation() {
    try {
      this.spinner.show();
      const childs = this.dataFiduciary.filter((element) => (element.id_father === this.idadocinitialrelationjuridico))
      childs.forEach(async element => {
        await this.deleteFiduciary(element.id_fiduciary)
      });
      await this.deleteFiduciary(this.idadocinitialrelationjuridico)
      this.spinner.hide();
    } catch (err) {
      this.toastr.error(
        "Verificar información del formulario.",
        "Oops!"
      )
      this.spinner.hide()
    }
  }

  openModalDeleteMembers(targetModal, personid) {
    this.deletepersonid = personid
    console.log(personid)
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: "static",
      keyboard: false,
      windowClass: 'my-modal'
    });
  }

  openModalDeleteDoc(targetModal, statusRelation, personid, relationid) {
    this.cambiarEstadoRelacion.controls.description.reset();
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: "static",
      keyboard: false,
      windowClass: 'my-modal'
    });
    if (relationid == "fiduciary") {
      this.statusdocinitialrelationjuridico = statusRelation;
      this.idadocinitialrelationjuridico = personid;
      this.typedocUpdatefiduciary = true;
    } else {
      this.statusdocinitialrelationjuridico = statusRelation;
      this.idadocinitialrelationjuridico = personid;
      this.typedocUpdatefiduciary = false;
    }
    this.cambiarEstadoRelacion.controls.description.reset();
  }

  openModalDeleteRequest(targetModal, req) {
    this.RequestDelete = req;
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: "static",
      keyboard: false,
      windowClass: 'my-modal'
    });
  }

  openModalAval(targetModal) {
    this.FormAvalSubject.reset();
    this.FormAvalPersonaIndividual.reset();

    this.AvalMembers = [];
    this.AvalRepresentatives = [];
    this.modalService.open(targetModal, {
      centered: false,
      backdrop: "static",
      keyboard: false,
      size: "xl",
      windowClass: 'my-modal'
    });
  }

  openModalModificarAval(targetModal, request) {
    this.RequestActual = request;
    //this.FormAvalSubject.reset();
    //this.FormAvalPersonaIndividual.reset();

    //this.AvalMembers  = [];
    //this.AvalRepresentatives = [];
    this.getMetaDataRequest(request.request_id);

    this.modalService.open(targetModal, {
      centered: false,
      backdrop: "static",
      keyboard: false,
      size: "xl",
      windowClass: 'my-modal'
    });
  }

  openModalAvalEdit(targetModal, aval, index) {
    this.modeAfterUpdate = false;
    console.log("editar aval:", aval);
    this.AvalActualMembers = [];
    this.AvalActualRepresentatives = [];

    this.FormAvalActual.patchValue({
      i: index,
      type: aval.type,
    });

    this.FormAvalSubject.patchValue({
      name: aval.subjects_aval.name,
      NIT: aval.subjects_aval.nit,
      phone: aval.subjects_aval.phone,
    });

    if (
      aval.type == 3 ||
      aval.type == 7 ||
      aval.type == 14 ||
      aval.type == 18
    ) {
      this.FormAvalPersonaIndividual.patchValue({
        name: aval.subjects_single.name,
        NIT: aval.subjects_single.nit,
        phone: aval.subjects_single.phone,
      });
    } else {
      this.AvalActualMembers = aval.subjects_member.slice();
      this.AvalActualRepresentatives = aval.subjects_representatives.slice();
    }

    this.modalService.open(targetModal, {
      centered: false,
      backdrop: "static",
      keyboard: false,
      size: "xl",
      windowClass: 'my-modal'
    });
  }

  openModalAvalEditAfter(targetModal, aval, index) {
    //console.log('editar aval:', aval );
    this.modeAfterUpdate = true;

    this.AvalActualMembers = [];
    this.AvalActualRepresentatives = [];
    this.ActualAval = aval;

    if (this.AvalClienteMetaData.sys_w_element_id < 24) {
      let avalPrincipal = aval.subjects.filter(
        (element) =>
          element.sys_subject_id == 4 ||
          element.sys_subject_id == 1 ||
          element.sys_subject_id == 7 ||
          element.sys_subject_id == 9 ||
          element.sys_subject_id == 13 ||
          element.sys_subject_id == 16 ||
          element.sys_subject_id == 18 ||
          element.sys_subject_id == 27 ||
          element.sys_subject_id == 30 ||
          element.sys_subject_id == 18 ||
          element.sys_subject_id == 32 ||
          element.sys_subject_id == 35 ||
          element.sys_subject_id == 38 ||
          element.sys_subject_id == 40
      );
      let avalSingle = aval.subjects.filter(
        (element) =>
          element.sys_subject_id == 8 ||
          element.sys_subject_id == 17 ||
          element.sys_subject_id == 31 ||
          element.sys_subject_id == 39
      );

      this.FormAvalActual.patchValue({
        i: index,
        type: aval.sys_w_element_id,
      });

      this.FormAvalSubject.patchValue({
        name: avalPrincipal[0].name,
        NIT: avalPrincipal[0].nit,
        phone: avalPrincipal[0].phone,
      });

      if (
        aval.sys_w_element_id == 3 ||
        aval.sys_w_element_id == 7 ||
        aval.sys_w_element_id == 14 ||
        aval.sys_w_element_id == 18
      ) {
        this.FormAvalPersonaIndividual.patchValue({
          name: avalSingle[0].name,
          NIT: avalSingle[0].nit,
          phone: avalSingle[0].phone,
        });
      } else {
        let avalMembers = aval.subjects.filter(
          (element) =>
            element.sys_subject_id == 6 ||
            element.sys_subject_id == 15 ||
            element.sys_subject_id == 29 ||
            element.sys_subject_id == 37
        );
        let avalRepresentatives = aval.subjects.filter(
          (element) =>
            element.sys_subject_id == 5 ||
            element.sys_subject_id == 14 ||
            element.sys_subject_id == 28 ||
            element.sys_subject_id == 36
        );
        this.AvalActualMembers = avalMembers.slice();
        this.AvalActualRepresentatives = avalRepresentatives.slice();
      }
    }

    this.modalService.open(targetModal, {
      centered: false,
      backdrop: "static",
      keyboard: false,
      size: "xl",
      windowClass: 'my-modal'
    });
  }

  openModalSocio(targetModal, socio, step, index) {
    console.log(socio);
    console.log("mode", this.modeAfterUpdate);
    if (this.modeAfterUpdate == true) {
      console.log(socio.rsdet_id);
      this.ActualMember.patchValue({
        i: socio.rsdet_id,
        name: socio.name,
        NIT: socio.nit,
        phone: socio.phone,
      });
    } else {
      this.ActualMember.patchValue({
        i: index,
        name: socio.name,
        NIT: socio.nit,
        phone: socio.phone,
      });
    }

    this.modeActualMembersModal = step;
    this.modalService.open(targetModal, {
      centered: false,
      backdrop: "static",
      keyboard: false,
      size: "xl",
      windowClass: 'my-modal'
    });
  }

  openModalRepresentative(targetModal, rep, step, index) {
    console.log("open modal representative");
    console.log(rep);
    if (this.modeAfterUpdate == true) {
      this.ActualRepresentative.patchValue({
        i: rep.rsdet_id,
        name: rep.name,
        NIT: rep.nit,
        phone: rep.phone,
      });
    } else {
      this.ActualRepresentative.patchValue({
        i: index,
        name: rep.name,
        NIT: rep.nit,
        phone: rep.phone,
      });
    }

    this.modeActualRepresentativeModal = step;
    this.modalService.open(targetModal, {
      centered: false,
      backdrop: "static",
      keyboard: false,
      size: "xl",
      windowClass: 'my-modal'
    });
  }

  openNewModal(targetModal) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: "static",
      keyboard: false,
      size: "xl",
      windowClass: 'my-modal'
    });
  }

  openModal2(targetModal) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: "static",
      keyboard: false,
      windowClass: 'my-modal'
    });
  }

  openModalRelation(targetModal, statusRelation) {
    this.cambiarEstadoRelacion.reset({});
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: "static",
      keyboard: false,
      size: "lg",
      windowClass: 'my-modal'
    });
    this.statusRelation = statusRelation;
  }

  openModalAdicionalDoc(
    targetModal,
    statusRelation,
    idAditionalRequest,
    subject
  ) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: "static",
      keyboard: false,
      windowClass: 'my-modal'
    });
    this.cambiarEstadoRelacion.controls.description.reset();
    this.statusadicionaldoctument = statusRelation;
    this.idadicionaldoctument = idAditionalRequest;
    this.subjectadicionaldocument = subject;
  }

  openModalStatusDoc(targetModal, statusRelation, personid, relationid, documents?: [], mode?: 'decline' | 'accept', relation?: any) {
    debugger
    if (documents) {
      this.declineChecks = documents.map((item, i) => (
        {
          id: i,
          name: item,
          value: 0,
          disabled: false
        }
      ))
      if (mode === 'accept') {
        if (relation.dpi_status == 1) {
          this.declineChecks[0].value = 1
          this.declineChecks[0].disabled = true
        }
        if (relation.letter_of_consent_status == 1) {
          this.declineChecks[1].value = 1
          this.declineChecks[1].disabled = true
        }

      }
    }
    //Checkeamos si son 
    this.cambiarEstadoRelacion.controls.description.reset();
    if (relationid == "fiduciary") {
      this.statusdocinitialrelationjuridico = statusRelation;
      this.idadocinitialrelationjuridico = personid;
      this.typedocUpdatefiduciary = true;
    } else {
      this.statusdocinitialrelationjuridico = statusRelation;
      this.idadocinitialrelationjuridico = personid;
      this.typedocUpdatefiduciary = false;
    }
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: "static",
      keyboard: false,
      size: 'xl',
      windowClass: 'my-modal'
    });
  }

  closeBtnClick() {
    //console.log('Se va a cerrar el modal');
    this.modalService.dismissAll();
    this.cambiarEstadoRelacion.controls.description.reset();
  }

  closeRequestBtnClick() {
    //console.log('Se va a cerrar el modal');
    this.modalService.dismissAll();
    this.resetFormRequest();
    this.cambiarEstadoRelacion.controls.description.reset();
  }

  goToForm(val: number) {
    this.router.navigate([
      "/" + this.formsUrls[this.dataCustomer.type][val][0],
      this.requestIdSelected,
    ]);
  }
  initApplicationStuff(): void {
    this.isAllChecked = false;
    this.formsCheckBoxes = new FormArray([]);
    this.formsCheckBoxesData = new Array<checkForm>();
    for (let i = 0; i < this.formsNames.length; i++) {
      this.formsCheckBoxesData.push({
        value: false,
        data: {
          name: this.formsNames[i],
          key: i,
        },
      });
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
  onCheckChangeDeclineDocuments(event, index) {
    let finddocument = this.declineChecks[index]
    finddocument.value = event.target.checked
  }
  oneCheckedDelcineChecks() {
    let anycheck = this.declineChecks.find(item => item.value == 1)
    if (this.declineChecks.length > 0 && anycheck)
      return false
    if (this.declineChecks.length == 0)
      return false
    return true
  }

  calculateDiff(sentOn) {
    let todayDate = new Date();
    let sentOnDate = new Date(sentOn);
    sentOnDate.setDate(sentOnDate.getDate());
    let differenceInTime = todayDate.getTime() - sentOnDate.getTime();
    // To calculate the no. of days between two dates
    let differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays;
  }

  chageType() {
    if (this.solicituddocadicionalesf.value.typeselecadicional == 0) {
      this.solicituddocadicionalesf.controls["representative_id"].disable();
      this.solicituddocadicionalesf.controls['customer_fiduciary_id'].disable();
      this.solicituddocadicionalesf.patchValue({
        representative_id: "",
      });
    } else if (this.solicituddocadicionalesf.value.typeselecadicional == 1) {
      this.solicituddocadicionalesf.controls["representative_id"].enable();
      this.solicituddocadicionalesf.controls['customer_fiduciary_id'].disable();
    } else {
      this.solicituddocadicionalesf.controls['customer_fiduciary_id'].enable();

    }
  }


  chageTypeAdicionalDoc() {
    if (this.typeadicionalDoc.value.typeadicional == 0) {
      this.typeAdicionalDoc = true;
    } else {
      this.typeAdicionalDoc = false;
    }
  }

  async chageReferences() {
    //console.log(this.user_id);
    await this.mysqlService
      .UpdateIRelation(
        {
          person_id: 0,
          has_internet_references: this.referencesForm.value.has,
        },
        this.user_id
      )
      .toPromise()
      .then(async (res) => {
        this.initialRelation = res.data;
        //console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async getDataPersonCurrentCostumer() {
    const res = this.mysqlService
      //.getCustomerRepresentatiave(this.user_id)
      .getCustomerRepMem(this.user_id)
      .toPromise()
      .then((response) => {
        //this.initialRelation = response.data.relation[0];
        this.personsdata = response.data;
        //console.log("disable", this.disable);
        //console.log("person", response);
        if (this.personsdata.length > 0) {
          this.personsdata.forEach((element) => {
            if (
              element.DPI_key !== null &&
              element.letter_of_consent_key !== null
            ) {
              this.countadicionaldocumentinitial++;
            }

            if (element.status_doc == 2) {
              this.completeadicionaldocinitial++;
            }
          });
          //console.log("countdata", this.countadicionaldocumentinitial);
        }
        //this.spinner.hide();
        // console.log(response);
      })
      .catch((error) => {
        this.spinner.hide();
        this.toastr.error("Problemas con el servidor", "Oops!");
      });
    return res;
  }
  allDocumentsAccept(data: any) {
    if (data.dpi_status == 1 && data.letter_of_consent_status == 1) {
      return true
    }
    return false
  }
  anyDeclined(data: any) {
    if (data.dpi_status == -1 || data.letter_of_consent_status == -1) {
      return true
    }
    return false
  }
  async ChangeDocStatusRelation() {
    /*
      3 Revision
      2 Aceptado
      1 Rechazado
    */
    this.spinner.show();
    if (this.typedocUpdatefiduciary == false) {
      //Se tienen que poner los dos en estado check cuando ambos documentos se encuentren como check

      const sendinitialrelation: any = {
        status_doc: this.statusdocinitialrelationjuridico,
        modification_date: new Date(),
        employee_email: localStorage.getItem("email"),
        description: this.cambiarEstadoRelacion.value.description,
        status_doc_comment: this.cambiarEstadoRelacion.value.description,
        person_id: this.idadocinitialrelationjuridico,
      }
      //Verificamos si ambos estan en check
      if (this.statusdocinitialrelationjuridico == 2) {
        //Verificamos si los dos estan en check
        let notallcheck = this.declineChecks.find(item => item.value != 1)
        if (notallcheck) {
          //cambioamos a estado en proceso
          sendinitialrelation.status_doc = 3
        }
      }
      let checkdpi = this.declineChecks.find(item => item.value == 1 && (item.name == 'DPI' || item.name == 'Acta de Nombramiento'));
      let checkconent = this.declineChecks.find(item => item.value == 1 && (item.name == 'Carta de consentimiento'))
      if (this.statusdocinitialrelationjuridico == 2) {
        //Se aceptan
        if (checkdpi) {
          sendinitialrelation.dpi_status = 1
        }
        if (checkconent) {
          sendinitialrelation.letter_of_consent_status = 1
        }
      } else if (this.statusdocinitialrelationjuridico == 1) {
        //Se rechazan 

        if (checkdpi) {
          sendinitialrelation.dpi_status = -1
        }
        if (checkconent) {
          sendinitialrelation.letter_of_consent_status = -1
        }
      }
      await this.mysqlService
        .UpdateIRelation(
          sendinitialrelation,
          this.user_id
        )
        .toPromise()
        .then(async (res) => {
          if (this.statusdocinitialrelationjuridico === 2) {
            this.toastr.success(
              "Se aceptaron los documentos.",
              "Cambio Exitoso!"
            );

            let email_user = this.formrelacion.value.email;
            let name_employe = localStorage.getItem("name");
            /*this._sendemail
              .sendEmail({
                Subject:
                  "[Solucredit App] - Se Aceptaron los documentos adicionales",
                To: localStorage.getItem("email"),
                template_id: 14,
                customer_id: this.user_id,
                employe: name_employe,
                type_user: this.dataCustomer.type,
              })
              .subscribe(
                (response) => {
                  this.toastr.success(
                    "Se enviaron los requisitos al correo electronico.",
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
              );*/
            await this.getDataCurrentCostumer();
          } else if (this.statusdocinitialrelationjuridico === 1) {
            this.toastr.success(
              "Se rechazaron los documentos.",
              "Cambio Exitoso!"
            );

            let email_user = this.formrelacion.value.email;
            this._sendemail
              .sendEmail({
                Subject: "[Solucredit App] - Rechazo de documentos",
                To: email_user,
                template_id: 13,
                customer_id: this.user_id,
                type_user: this.dataCustomer.type,
                message: this.cambiarEstadoRelacion.controls.description
                  .value,
                documents: this.declineChecks.filter(item => item.value == 1)
              })
              .subscribe(
                (response) => {
                  this.toastr.success(
                    "Se enviaron los requisitos al correo electronico.",
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
            this.declineChecks = []
            await this.getDataCurrentCostumer();
          }
          this.spinner.hide();
          this.modalService.dismissAll();
          await this.ngOnInit();
        })
        .catch((err) => {
          this.spinner.hide();
          this.toastr.error("Problemas con el servidor", "Oops!");
          console.log(err)
        });
    } else if (this.typedocUpdatefiduciary == true) {
      const sendinitialrelation: any = {
        status_doc: this.statusdocinitialrelationjuridico,
        modification_date: new Date(),
        employee_email: localStorage.getItem("email"),
        description: this.cambiarEstadoRelacion.value.description,
        status_doc_comment: this.cambiarEstadoRelacion.value.description,
      }
      if (this.statusdocinitialrelationjuridico == 2) {
        //Verificamos si los dos estan en check
        let notallcheck = this.declineChecks.find(item => item.value != 1)
        if (notallcheck) {
          //cambioamos a estado en proceso
          sendinitialrelation.status_doc = 3
        }
      }
      if (this.statusdocinitialrelationjuridico == 2) {
        //Se aceptan los documentos entonces tenemos que actualizar los que marque per
        let checkdpi = this.declineChecks.find(item => item.value == 1 && (item.name == 'DPI' || item.name == 'Acta de Nombramiento'));
        let checkconent = this.declineChecks.find(item => item.value == 1 && (item.name == 'Carta de consentimiento'))
        if (checkdpi) {
          sendinitialrelation.dpi_status = 1
        }
        if (checkconent) {
          sendinitialrelation.letter_of_consent_status = 1
        }
      } else if (this.statusdocinitialrelationjuridico == 1) {
        //Se rechazan los documentos que se marcan
        //el de DPI pueden ser DPI O Acta de Nombramiento
        let checkdpi = this.declineChecks.find(item => item.value == 1 && (item.name == 'DPI' || item.name == 'Acta de Nombramiento'));
        let checkconent = this.declineChecks.find(item => item.value == 1 && (item.name == 'Carta de consentimiento'))
        if (checkdpi) {
          sendinitialrelation.dpi_status = -1
        }
        if (checkconent) {
          sendinitialrelation.letter_of_consent_status = -1
        }
      }
      await this.mysqlService
        .UpdateIRelationFiduciary(
          sendinitialrelation,
          this.idadocinitialrelationjuridico
        )
        .toPromise()
        .then(async (res) => {
          if (this.statusdocinitialrelationjuridico == 2) {
            this.toastr.success(
              "Se aceptaron los documentos.",
              "Cambio Exitoso!"
            );

            let email_user = this.formrelacion.value.email;
            let name_employe = localStorage.getItem("name");
            /*this._sendemail
              .sendEmail({
                Subject:
                  "[Solucredit App] - Se Aceptaron los documentos de aval",
                To: localStorage.getItem("email"),
                template_id: 14,
                customer_id: this.user_id,
                employe: name_employe,
                type_user: this.dataCustomer.type,
              })
              .subscribe(
                (response) => {
                  this.toastr.success("Correo enviado.", "Enviado!");
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
              );*/
            await this.getDataCurrentCostumer();
          } else if (this.statusdocinitialrelationjuridico == 1) {
            this.toastr.success(
              "Se rechazaron los documentos.",
              "Cambio Exitoso!"
            );

            let email_user = this.formrelacion.value.email;
            this._sendemail
              .sendEmail({
                Subject: "[Solucredit App] - Rechazo de documentos de aval",
                To: email_user,
                template_id: 13,
                customer_id: this.user_id,
                type_user: this.dataCustomer.type,
                message: this.cambiarEstadoRelacion.controls.description
                  .value,
                documents: this.declineChecks.filter((item) => item.value == 1)
              })
              .subscribe(
                (response) => {
                  this.toastr.success("Correo enviado.", "Enviado!");
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
            this.declineChecks = []
            await this.getDataCurrentCostumer();
          }
          this.spinner.hide();
          this.modalService.dismissAll();
          await this.ngOnInit();
        })
        .catch((err) => {
          this.spinner.hide();
          this.toastr.error("Problemas con el servidor", "Oops!");
          console.log(err)
        });
    }
  }

  async OpenAdicionalDocModal(modal, type, id_aditional_document) {
    this.viewModalIdAdicionalDocument = id_aditional_document;
    console.log("asdfasdf", id_aditional_document);
    this.do(this.viewModalIdAdicionalDocument);
    this.modalService.open(modal, {
      centered: false,
      backdrop: "static",
      keyboard: false,
      size: "lg",
      windowClass: 'my-modal'
    });
  }

  async ViewDocuAditional(modal, type, id_aditional_document) {
    this.spinner.show();
    console.log(id_aditional_document);
    await this.mysqlService
      .GetOneDocument({
        type: type,
        id: id_aditional_document,
      })
      .toPromise()
      .then((response) => {
        console.log("view", response);
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

          this.pdfsrcbase64 = response.data.aditional.document_name
        }
        this.spinner.hide();
      })
      .catch((error) => {
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });

    this.viewDocumentModal.openModal()
  }

  do(request) {
    this.Docs = new FormArray([]);
    this.spinner.show();
    this.mysqlService
      .GetAditionalDocument(request)
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
        console.log("doc", this.Docs);
        this.spinner.hide();
      })
      .catch((error) => {
        this.spinner.hide();
        this.toastr.error("Problemas con el servidor", "Oops!");
      });
  }

  async ViewDocuFidu(modal, type, dockey, relation_id) {
    this.spinner.show();
    console.log('Mandando Documento de Fiduciario');
    console.log(dockey);
    await this.mysqlService
      .GetOneDocument({
        type: type,
        id: relation_id,
        document_key: dockey,
      })
      .toPromise()
      .then((response) => {
        console.log("view", response);
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

  SaveVisitData() { }

  addMember() {
    let member = {
      name: this.FormInitMembers.controls.name.value,
      nit: this.FormInitMembers.controls.NIT.value,
      phone: this.FormInitMembers.controls.phone.value,
    };
    this.InitMembers.push(member);
    console.log(this.InitMembers);
    this.FormInitMembers.reset();
  }

  addMemberAval() {
    console.log(this.FormAval.controls.aval_type.value);
    let member = {
      sys_subject_id:
        this.FormAval.controls.aval_type.value == 2
          ? 6
          : this.FormAval.controls.aval_type.value == 6
            ? 15
            : this.FormAval.controls.aval_type.value == 13
              ? 29
              : this.FormAval.controls.aval_type.value == 17
                ? 37
                : "",
      name: this.FormJuridicoMembers.controls.name.value,
      nit: this.FormJuridicoMembers.controls.NIT.value,
      phone: this.FormJuridicoMembers.controls.phone.value,
    };

    this.AvalMembers.push(member);
    console.log(this.AvalMembers);

    this.FormJuridicoMembers.reset();
  }

  async addMemberActualAval() {
    //console.log("asd", this.dataResponseSaveFiduciary);
    this.formfiduciary.value.customer_id = this.user_id;
    this.formfiduciary.value.id_father = this.dataResponseSaveFiduciary.data.id_fiduciary;
    this.formfiduciary.value.type = 3;
    this.formfiduciary.value.name1 = this.FormJuridicoMembers.controls.name1.value;
    this.formfiduciary.value.name2 = this.FormJuridicoMembers.controls.name2.value;
    this.formfiduciary.value.name3 = this.FormJuridicoMembers.controls.name3.value;
    this.formfiduciary.value.lastname1 = this.FormJuridicoMembers.controls.lastname1.value;
    this.formfiduciary.value.lastname2 = this.FormJuridicoMembers.controls.lastname2.value;
    this.formfiduciary.value.lastname3 = this.FormJuridicoMembers.controls.lastname3.value;
    this.formfiduciary.value.nit = this.FormJuridicoMembers.controls.NIT.value;
    this.formfiduciary.value.phone = this.FormJuridicoMembers.controls.phone.value;
    this.formfiduciary.value.businessname = this.dataResponseSaveFiduciary.data.businessname;
    this.formfiduciary.value.businessnit = this.dataResponseSaveFiduciary.data.businessnit;
    this.formfiduciary.value.businessnumber = this.dataResponseSaveFiduciary.data.businessnumber;
    this.formfiduciary.value.DPI = this.FormJuridicoMembers.controls.DPI.value;

    // delete this.formfiduciary.value.name2;
    // delete this.formfiduciary.value.lastname1;
    // delete this.formfiduciary.value.lastname2;

    if (!this.formfiduciary.value.businessnumber) {
      delete this.formfiduciary.value.businessnumber;
    }
    if (!this.formfiduciary.value.businessnit) {
      delete this.formfiduciary.value.businessnit;
    }
    // if (!this.formfiduciary.value.name3) {
    //   delete this.formfiduciary.value.name3;
    // }
    // if (!this.formfiduciary.value.lastname3) {
    //   delete this.formfiduciary.value.lastname3;
    // }

    await this.mysqlService
      .CreateFiducaryWarrantyCustomer(this.formfiduciary.value)
      .toPromise()
      .then(async (response) => {
        //await this.selectRequest();
        this.AvalActualMembers.push(response.data);
        this.FormJuridicoMembers.reset({});
        //console.log("response save", this.AvalActualMembers);
        this.toastr.success(
          "Se agrego correctamente.",
          "Información Guardada!"
        );
        this.spinner.hide();
        this.ngOnInit();
      })
      .catch((error) => {
        //console.log("asdf", error);
        this.toastr.error("Problemas con el servidor.", "Oops!");
        this.spinner.hide();
      });
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
  addRepresentativeAval() {
    console.log(this.FormAval.controls.aval_type.value);
    let Representative = {
      sys_subject_id:
        this.FormAval.controls.aval_type.value == 2
          ? 5
          : this.FormAval.controls.aval_type.value == 6
            ? 14
            : this.FormAval.controls.aval_type.value == 13
              ? 28
              : this.FormAval.controls.aval_type.value == 17
                ? 36
                : "",
      name: this.FormJuridicoRepresentatives.controls.name.value,
      nit: this.FormJuridicoRepresentatives.controls.NIT.value,
      phone: this.FormJuridicoRepresentatives.controls.phone.value,
    };

    this.AvalRepresentatives.push(Representative);
    console.log(this.AvalRepresentatives);

    this.FormJuridicoRepresentatives.reset();
  }

  async addRepresentativeActualAval() {
    this.spinner.show();
    //this.formfiduciary.value.request_id = this.requestIdSelected;
    this.formfiduciary.value.customer_id = this.user_id;
    this.formfiduciary.value.id_father = this.dataResponseSaveFiduciary.data.id_fiduciary;
    this.formfiduciary.value.type = 2;
    this.formfiduciary.value.name1 = this.FormJuridicoRepresentatives.controls.name1.value;
    this.formfiduciary.value.name2 = this.FormJuridicoRepresentatives.controls.name2.value;
    this.formfiduciary.value.name3 = this.FormJuridicoRepresentatives.controls.name3.value;
    this.formfiduciary.value.lastname1 = this.FormJuridicoRepresentatives.controls.lastname1.value;
    this.formfiduciary.value.lastname2 = this.FormJuridicoRepresentatives.controls.lastname2.value;
    this.formfiduciary.value.lastname3 = this.FormJuridicoRepresentatives.controls.lastname3.value;
    this.formfiduciary.value.nit = this.FormJuridicoRepresentatives.controls.NIT.value;
    this.formfiduciary.value.phone = this.FormJuridicoRepresentatives.controls.phone.value;
    this.formfiduciary.value.businessname = this.dataResponseSaveFiduciary.data.businessname;
    this.formfiduciary.value.businessnit = this.dataResponseSaveFiduciary.data.businessnit;
    this.formfiduciary.value.businessnumber = this.dataResponseSaveFiduciary.data.businessnumber;
    this.formfiduciary.value.DPI = this.FormJuridicoRepresentatives.controls.DPI.value;

    // delete this.formfiduciary.value.name2;
    // delete this.formfiduciary.value.lastname1;
    // delete this.formfiduciary.value.lastname2;

    if (!this.formfiduciary.value.businessnumber) {
      delete this.formfiduciary.value.businessnumber;
    }
    if (!this.formfiduciary.value.businessnit) {
      delete this.formfiduciary.value.businessnit;
    }
    // if (!this.formfiduciary.value.name3) {
    //   delete this.formfiduciary.value.name3;
    // }
    // if (!this.formfiduciary.value.lastname3) {
    //   delete this.formfiduciary.value.lastname3;
    // }

    await this.mysqlService
      .CreateFiducaryWarrantyCustomer(this.formfiduciary.value)
      .toPromise()
      .then(async (response) => {
        //await this.selectRequest();
        this.dataResponseAddRepresentative.push(response.data);
        this.FormJuridicoRepresentatives.reset({});
        //console.log("response save", this.dataResponseAddRepresentative);
        this.toastr.success(
          "Se agrego correctamente.",
          "Información Guardada!"
        );
        this.spinner.hide();
        this.ngOnInit();
      })
      .catch((error) => {
        //console.log("asdf", error);
        this.toastr.error("Problemas con el servidor.", "Oops!");
        this.spinner.hide();
      });
  }

  deleteMember(index, mode) {
    if (mode == "step3") {
      this.InitMembers.splice(index, 1);
    } else if (mode == "aval") {
      this.AvalMembers.splice(index, 1);
    } else if (mode == "aval-edit") {
      this.AvalActualMembers.splice(index, 1);
    }
  }

  deleteInitAval(index, mode) {
    if (mode == "step4") {
      this.Avals.splice(index, 1);
    }
  }

  deleteRepresentatives(index, mode) {
    if (mode == "step3") {
      this.InitRepresentatives.splice(index, 1);
    } else if (mode == "aval") {
      console.log("delete aval");
      this.AvalRepresentatives.splice(index, 1);
    } else if (mode == "aval-edit") {
      console.log("delete aval");
      this.AvalActualRepresentatives.splice(index, 1);
    }
  }

  updateMember() {
    console.log("mode actual member", this.modeActualMembersModal);

    if (this.modeActualMembersModal == "step3") {
      console.log("1");
      let updatedMember = {
        sys_subject_id:
          this.FormAval.controls.aval_type.value == 2
            ? 6
            : this.FormAval.controls.aval_type.value == 6
              ? 15
              : this.FormAval.controls.aval_type.value == 13
                ? 29
                : this.FormAval.controls.aval_type.value == 17
                  ? 37
                  : "",
        name: this.ActualMember.controls.name.value,
        nit: this.ActualMember.controls.NIT.value,
        phone: this.ActualMember.controls.phone.value,
      };

      this.InitMembers[this.ActualMember.controls.i.value] = updatedMember;
    } else if (this.modeActualMembersModal == "editar aval") {
      let updatedMember = {
        sys_subject_id:
          this.FormAval.controls.aval_type.value == 2
            ? 6
            : this.FormAval.controls.aval_type.value == 6
              ? 15
              : this.FormAval.controls.aval_type.value == 13
                ? 29
                : this.FormAval.controls.aval_type.value == 17
                  ? 37
                  : "",
        name: this.ActualMember.controls.name.value,
        nit: this.ActualMember.controls.NIT.value,
        phone: this.ActualMember.controls.phone.value,
      };
      this.AvalMembers[this.ActualMember.controls.i.value] = updatedMember;
    } else if (this.modeActualMembersModal == "editar aval - after") {
      let updatedMember = {
        sys_subject_id:
          this.FormAvalActual.controls.type.value == 2
            ? 6
            : this.FormAvalActual.controls.type.value == 6
              ? 15
              : this.FormAvalActual.controls.type.value == 13
                ? 29
                : this.FormAvalActual.controls.type.value == 17
                  ? 37
                  : "",
        name: this.ActualMember.controls.name.value,
        nit: this.ActualMember.controls.NIT.value,
        phone: this.ActualMember.controls.phone.value,
      };

      this.AvalActualMembers[
        this.ActualMember.controls.i.value
      ] = updatedMember;
      console.log("3");
      console.log("actul member", this.AvalActualMembers);
      console.log("mode actual member", this.AvalMembers);
    }

    if (this.modeAfterUpdate == true) {
      this.updateSubjecMemberAfter();
    }

    let button = document.getElementById("updateMemberClose");
    button.click();
  }

  updateRepresentatives() {
    console.log("open modal representative update");

    if (this.modeActualRepresentativeModal == "step3") {
      let updatedRepresentative = {
        sys_subject_id:
          this.FormAval.controls.aval_type.value == 2
            ? 5
            : this.FormAval.controls.aval_type.value == 6
              ? 14
              : this.FormAval.controls.aval_type.value == 13
                ? 28
                : this.FormAval.controls.aval_type.value == 17
                  ? 36
                  : "",
        name: this.ActualRepresentative.controls.name.value,
        nit: this.ActualRepresentative.controls.NIT.value,
        phone: this.ActualRepresentative.controls.phone.value,
      };
      this.InitRepresentatives[
        this.ActualRepresentative.controls.i.value
      ] = updatedRepresentative;
    } else if (this.modeActualRepresentativeModal == "editar aval") {
      console.log("open modal representative editar");
      let updatedRepresentative = {
        sys_subject_id:
          this.FormAval.controls.aval_type.value == 2
            ? 5
            : this.FormAval.controls.aval_type.value == 6
              ? 14
              : this.FormAval.controls.aval_type.value == 13
                ? 28
                : this.FormAval.controls.aval_type.value == 17
                  ? 36
                  : "",
        name: this.ActualRepresentative.controls.name.value,
        nit: this.ActualRepresentative.controls.NIT.value,
        phone: this.ActualRepresentative.controls.phone.value,
      };
      this.AvalRepresentatives[
        this.ActualRepresentative.controls.i.value
      ] = updatedRepresentative;
    } else if (this.modeActualRepresentativeModal == "editar aval - after") {
      console.log("open modal representative editar");
      let updatedRepresentative = {
        sys_subject_id:
          this.FormAvalActual.controls.type.value == 2
            ? 5
            : this.FormAvalActual.controls.type.value == 6
              ? 14
              : this.FormAvalActual.controls.type.value == 13
                ? 28
                : this.FormAvalActual.controls.type.value == 17
                  ? 36
                  : "",
        name: this.ActualRepresentative.controls.name.value,
        nit: this.ActualRepresentative.controls.NIT.value,
        phone: this.ActualRepresentative.controls.phone.value,
      };
      this.AvalActualRepresentatives[
        this.ActualRepresentative.controls.i.value
      ] = updatedRepresentative;
    }

    if (this.modeAfterUpdate == true) {
      this.updateSubjecRepresentativesAfter();
    }

    console.log("form", this.FormAval.value);

    let button = document.getElementById("updateRepresentativeClose");
    button.click();
  }

  updateAval() {
    console.log(this.Avals);
    console.log(this.FormAvalActual.controls.i.value);
    console.log(this.FormAvalActual.controls.type.value);

    let SubAval = {
      sys_subject_id:
        this.FormAvalActual.controls.type.value == 2
          ? 4
          : this.FormAvalActual.controls.type.value == 3
            ? 7
            : this.FormAvalActual.controls.type.value == 4
              ? 9
              : this.FormAvalActual.controls.type.value == 6
                ? 13
                : this.FormAvalActual.controls.type.value == 7
                  ? 16
                  : this.FormAvalActual.controls.type.value == 8
                    ? 18
                    : this.FormAvalActual.controls.type.value == 13
                      ? 27
                      : this.FormAvalActual.controls.type.value == 14
                        ? 30
                        : this.FormAvalActual.controls.type.value == 15
                          ? 32
                          : this.FormAvalActual.controls.type.value == 17
                            ? 35
                            : this.FormAvalActual.controls.type.value == 18
                              ? 38
                              : this.FormAvalActual.controls.type.value == 19
                                ? 40
                                : "",
      name: this.FormAvalSubject.controls.name.value,
      nit: this.FormAvalSubject.controls.NIT.value,
      phone: this.FormAvalSubject.controls.phone.value,
    };

    if (
      this.FormAvalActual.controls.type.value == 3 ||
      this.FormAvalActual.controls.type.value == 7 ||
      this.FormAvalActual.controls.type.value == 14 ||
      this.FormAvalActual.controls.type.value == 18
    ) {
      let SubPersonaIndividual = {
        sys_subject_id:
          this.FormAvalActual.controls.type.value == 3
            ? 8
            : this.FormAvalActual.controls.type.value == 7
              ? 17
              : this.FormAvalActual.controls.type.value == 14
                ? 31
                : this.FormAvalActual.controls.type.value == 18
                  ? 39
                  : "",
        name: this.FormAvalPersonaIndividual.controls.name.value,
        nit: this.FormAvalPersonaIndividual.controls.NIT.value,
        phone: this.FormAvalPersonaIndividual.controls.phone.value,
      };

      let Aval = {
        sys_w_element_id: this.FormAvalActual.controls.type.value,
        type: this.FormAvalActual.controls.type.value,
        subjects_aval: SubAval,
        subjects_single: SubPersonaIndividual,
      };

      this.Avals[this.FormAvalActual.controls.i.value] = Aval;
    } else {
      let Aval = {
        sys_w_element_id: this.FormAvalActual.controls.type.value,
        type: this.FormAvalActual.controls.type.value,
        subjects_member: this.AvalActualMembers,
        subjects_aval: SubAval,
        subjects_representatives: this.AvalActualRepresentatives,
      };

      this.Avals[this.FormAvalActual.controls.i.value] = Aval;
    }

    let button = document.getElementById("updateAvalClose");
    button.click();

    console.log(this.Avals);
  }

  crearAval() {
    let SubAval = {
      sys_subject_id:
        this.FormAval.controls.aval_type.value == 2
          ? 4
          : this.FormAval.controls.aval_type.value == 3
            ? 7
            : this.FormAval.controls.aval_type.value == 4
              ? 9
              : this.FormAval.controls.aval_type.value == 6
                ? 13
                : this.FormAval.controls.aval_type.value == 7
                  ? 16
                  : this.FormAval.controls.aval_type.value == 8
                    ? 18
                    : this.FormAval.controls.aval_type.value == 13
                      ? 27
                      : this.FormAval.controls.aval_type.value == 14
                        ? 30
                        : this.FormAval.controls.aval_type.value == 15
                          ? 32
                          : this.FormAval.controls.aval_type.value == 17
                            ? 35
                            : this.FormAval.controls.aval_type.value == 18
                              ? 38
                              : this.FormAval.controls.aval_type.value == 19
                                ? 40
                                : "",
      name: this.FormAvalSubject.controls.name.value,
      nit: this.FormAvalSubject.controls.NIT.value,
      phone: this.FormAvalSubject.controls.phone.value,
    };

    //let subjects =  this.AvalRepresentatives.concat(this.AvalMembers);
    //subjects.push(SubAval);
    //console.log(subjects);

    if (
      this.FormAval.controls.aval_type.value == 3 ||
      this.FormAval.controls.aval_type.value == 7 ||
      this.FormAval.controls.aval_type.value == 14 ||
      this.FormAval.controls.aval_type.value == 18
    ) {
      let SubPersonaIndividual = {
        sys_subject_id:
          this.FormAval.controls.aval_type.value == 3
            ? 8
            : this.FormAval.controls.aval_type.value == 7
              ? 17
              : this.FormAval.controls.aval_type.value == 14
                ? 31
                : this.FormAval.controls.aval_type.value == 18
                  ? 39
                  : "",
        name: this.FormAvalPersonaIndividual.controls.name.value,
        nit: this.FormAvalPersonaIndividual.controls.NIT.value,
        phone: this.FormAvalPersonaIndividual.controls.phone.value,
      };

      let Aval = {
        sys_w_element_id: this.FormAval.controls.aval_type.value,
        type: this.FormAval.controls.aval_type.value,
        subjects_aval: SubAval,
        subjects_single: SubPersonaIndividual,
      };
      this.Avals.push(Aval);
    } else {
      let Aval = {
        sys_w_element_id: this.FormAval.controls.aval_type.value,
        type: this.FormAval.controls.aval_type.value,
        subjects_member: this.AvalMembers,
        subjects_aval: SubAval,
        subjects_representatives: this.AvalRepresentatives,
      };

      this.Avals.push(Aval);
    }

    let button = document.getElementById("crearAval");
    button.click();
  }

  async createSolicitud(spn) {
    this.spinner.show(spn);
    let req_avals = [];
    console.log('AVALS')
    console.log(this.Avals)

    this.Avals.forEach((element) => {
      if (
        element.type == 3 ||
        element.type == 7 ||
        element.type == 14 ||
        element.type == 18
      ) {
        let sub = [];
        sub.push(element.subjects_aval);
        sub.push(element.subjects_single);
        let restructAval = {
          sys_w_element_id: element.sys_w_element_id,
          type: element.type,
          subjects: sub,
        };
        req_avals.push(restructAval);
      } else {
        let restructAval = {
          sys_w_element_id: element.sys_w_element_id,
          type: element.type,
          subjects: element.subjects_member.concat(
            element.subjects_representatives,
            element.subjects_aval
          ),
        };
        req_avals.push(restructAval);
      }
    });
    const myDate = new Date();
    const request = {
      customer_id: this.user_id,
      documents: 0,
      verifications: 0,
      warranties: 0,
      status: 0,
      create_date: myDate,
      employee_email: localStorage.getItem("email"),
      type: this.FormInitSolicitud.controls.type.value,
      warranty_type: this.FormInitSolicitud.controls.warranty.value, //FIDUCIARIA -> 0, HIPOTECARIA -> 1, PRENDARIA -> 2
      location: this.FormInitSolicitud.controls.location.value,//0 -> LOCAL, 1-> INTERNACIONAL
      time_in_months: this.FormInitSolicitud.controls.time_in_months.value,
      destination: this.FormInitSolicitud.controls.destination.value,
      doc_type: this.FormInitSolicitudStep2.controls.doc_type.value, //PAGARE -> 0, REVOLVENTE -> 1
      members: JSON.stringify(this.InitMembers),
      avals: req_avals,
    };
    debugger
    console.log(request);

    await this.mysqlService
      .CreateCustomerRequest(request)
      .toPromise()
      .then((response) => {
        this.toastr.success(
          "La solicitud fue creada con éxito.",
          "Solicitud Creada!"
        );

        /*this._sendemail
        .sendEmail({
          Subject: "[Solucredit App] - Nueva solicitud de cliente",
          To: localStorage.getItem("email"),
          template_id: 10,
          message: this.formrelacion.value.message,
          customer_id: this.user_id,
          employe: localStorage.getItem("name"),
        })
        .subscribe(
          (response) => {
            this.toastr.success(
              "Se enviaron los requisitos al correo electronico.",
              "Enviado!"
            );
          },
          (error) => {
            this.toastr.error(
              "Verificar información del formulario.",
              "Oops!"
            );
          }
        );*/
        this.spinner.hide(spn);

        this.getAllCustomerRequest();
        this.modalService.dismissAll();
        this.resetFormRequest();
        //this.router.navigate([`/list-customer`]);
        //console.log("response", response);
      })
      .catch((error) => {
        this.toastr.error("La información fue guardad con exito.", "Opss!");
        console.log("error", error);
        this.spinner.hide(spn);
      });
  }

  eliminarSolicitud() {
    this.mysqlService
      .DeleteCustomerRequest(this.RequestDelete.request_id)
      .toPromise()
      .then((response) => {
        this.toastr.success("Se elimino la solicitud.", "Solicitud Eliminada!");
        this.getAllCustomerRequest();
        this.modalService.dismissAll();
      })
      .catch((error) => {
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }

  async addNewAval() {
    let sub = [];

    let SubAval = {
      sys_subject_id:
        this.FormAval.controls.aval_type.value == 2
          ? 4
          : this.FormAval.controls.aval_type.value == 3
            ? 7
            : this.FormAval.controls.aval_type.value == 4
              ? 9
              : this.FormAval.controls.aval_type.value == 6
                ? 13
                : this.FormAval.controls.aval_type.value == 7
                  ? 16
                  : this.FormAval.controls.aval_type.value == 8
                    ? 18
                    : this.FormAval.controls.aval_type.value == 13
                      ? 27
                      : this.FormAval.controls.aval_type.value == 14
                        ? 30
                        : this.FormAval.controls.aval_type.value == 15
                          ? 32
                          : this.FormAval.controls.aval_type.value == 17
                            ? 35
                            : this.FormAval.controls.aval_type.value == 18
                              ? 38
                              : this.FormAval.controls.aval_type.value == 19
                                ? 40
                                : "",
      name: this.FormAvalSubject.controls.name.value,
      nit: this.FormAvalSubject.controls.NIT.value,
      phone: this.FormAvalSubject.controls.phone.value,
    };

    sub.push(SubAval);

    //let subjects =  this.AvalRepresentatives.concat(this.AvalMembers);
    //subjects.push(SubAval);
    //console.log(subjects);

    if (
      this.FormAval.controls.aval_type.value == 3 ||
      this.FormAval.controls.aval_type.value == 7 ||
      this.FormAval.controls.aval_type.value == 14 ||
      this.FormAval.controls.aval_type.value == 18
    ) {
      let SubPersonaIndividual = {
        sys_subject_id:
          this.FormAval.controls.aval_type.value == 3
            ? 8
            : this.FormAval.controls.aval_type.value == 7
              ? 17
              : this.FormAval.controls.aval_type.value == 14
                ? 31
                : this.FormAval.controls.aval_type.value == 18
                  ? 39
                  : "",
        name: this.FormAvalPersonaIndividual.controls.name.value,
        nit: this.FormAvalPersonaIndividual.controls.NIT.value,
        phone: this.FormAvalPersonaIndividual.controls.phone.value,
      };

      sub = sub.concat(SubPersonaIndividual);

      /*let Aval = {
        sys_w_element_id:this.FormAval.controls.aval_type.value,
        type:this.FormAval.controls.aval_type.value,
        subjects_aval: SubAval,
        subjects_single: SubPersonaIndividual,
      }*/
      //this.Avals.push(Aval);
    } else {
      sub = sub.concat(this.AvalMembers, this.AvalRepresentatives);
      /*let Aval = {
        sys_w_element_id:this.FormAval.controls.aval_type.value,
        type: this.FormAval.controls.aval_type.value,
        subjects_member: this.AvalMembers,
        subjects_aval: SubAval,
        subjects_representatives: this.AvalRepresentatives,
      }*/

      //this.Avals.push(Aval);
    }

    /**
                   {
                  "sys_subject_id":9,
                  "name":"NOMBRE PERSONA INDIVIDUAL",
                  "phone":"TELEFONO PERSONA INDIVIDUAL",
                  "email":"EMAIL PERSONA INDIVIDUAL",
                  "nit":"87878-i",
                  "dpi":"11111111",
                  "forms":null
                      
              }
     */

    let request = {
      request_id: this.RequestActual.request_id,
      aval: {
        sys_w_element_id: this.FormAval.controls.aval_type.value,
        type: this.FormAval.controls.aval_type.value,
        subjects: sub,
      },
    };

    await this.mysqlService
      .addNewAval(request)
      .toPromise()
      .then((response) => {
        console.log(response);
        this.getMetaDataRequest(this.RequestActual.request_id);
      })
      .catch((error) => {
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });

    let button = document.getElementById("closeButtonNewAval");
    button.click();
  }

  deleteAval(id_aval) {
    //[rwedet_id]
    this.mysqlService
      .DeleteAval(id_aval)
      .toPromise()
      .then((response) => {
        this.toastr.success("Se elimino el aval.", "Aval Eliminado!");
        this.getMetaDataRequest(this.RequestActual.request_id);
        //this.modalService.dismissAll();
      })
      .catch((error) => {
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }

  deleteSubject(id_subject) {
    //Representante/Socio
    this.mysqlService
      .DeleteSubject(id_subject)
      .toPromise()
      .then(async (response) => {
        this.toastr.success("Se elimino el registro", "Registro Eliminado!");
        console.log("antes", this.ActualAval);
        await this.getMetaDataRequest(this.RequestActual.request_id);
        this.ActualAval = this.RequestMetaData.filter(
          (element) => element.rwedet_id == this.ActualAval.rwedet_id
        )[0];
        console.log("despues", this.ActualAval);
        let avalRepresentatives = this.ActualAval.subjects.filter(
          (element) =>
            element.sys_subject_id == 5 ||
            element.sys_subject_id == 14 ||
            element.sys_subject_id == 28 ||
            element.sys_subject_id == 36
        );
        let avalMembers = this.ActualAval.subjects.filter(
          (element) =>
            element.sys_subject_id == 6 ||
            element.sys_subject_id == 15 ||
            element.sys_subject_id == 29 ||
            element.sys_subject_id == 37
        );
        this.AvalActualRepresentatives = avalRepresentatives.slice();
        this.AvalActualMembers = avalMembers.slice();
        //this.modalService.dismissAll();
      })
      .catch((error) => {
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }

  async addSubjectMember() {
    //FormJuridicoMembers
    //console.log(this.FormAval.controls.aval_type.value);
    let member = {
      sys_subject_id:
        this.FormAvalActual.controls.type.value == 2
          ? 6
          : this.FormAvalActual.controls.type.value == 6
            ? 15
            : this.FormAvalActual.controls.type.value == 13
              ? 29
              : this.FormAvalActual.controls.type.value == 17
                ? 37
                : "",
      name: this.FormJuridicoMembers.controls.name.value,
      nit: this.FormJuridicoMembers.controls.NIT.value,
      phone: this.FormJuridicoMembers.controls.phone.value,
    };

    let body = {
      rwedet_id: this.ActualAval.rwedet_id,
      subjects: [member],
    };
    await this.mysqlService
      .addNewMember(body)
      .toPromise()
      .then((response) => {
        this.toastr.success("Se agrego el socio", "Socio agregado!");
        this.getMetaDataRequest(this.RequestActual.request_id);
        //let avalMembers = response.data.subjects.filter(element => element.sys_subject_id == 6 || element.sys_subject_id == 12 );
        let avalMembers = response.data.subjects.filter(
          (element) =>
            element.sys_subject_id == 6 ||
            element.sys_subject_id == 15 ||
            element.sys_subject_id == 29 ||
            element.sys_subject_id == 37
        );

        this.AvalActualMembers = avalMembers.slice();
        //console.log('despues', this.AvalActualMembers);
        //this.AvalActualRepresentatives = avalRepresentatives.slice();
        this.FormJuridicoMembers.reset();
        //this.modalService.dismissAll();
      })
      .catch((error) => {
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });

    //this.AvalMembers.push(member);
    console.log(this.AvalMembers);
  }

  addSubjectRep() {
    //FormJuridicoMembers
    //console.log(this.FormAval.controls.aval_type.value);

    let Representative = {
      sys_subject_id:
        this.FormAvalActual.controls.type.value == 2
          ? 5
          : this.FormAvalActual.controls.type.value == 6
            ? 14
            : this.FormAvalActual.controls.type.value == 13
              ? 28
              : this.FormAvalActual.controls.type.value == 17
                ? 36
                : "",
      name: this.FormJuridicoRepresentatives.controls.name.value,
      nit: this.FormJuridicoRepresentatives.controls.NIT.value,
      phone: this.FormJuridicoRepresentatives.controls.phone.value,
    };

    let body = {
      rwedet_id: this.ActualAval.rwedet_id,
      subjects: [Representative],
    };
    console.log("body", body);
    this.mysqlService
      .addNewMember(body)
      .toPromise()
      .then((response) => {
        this.toastr.success(
          "Se agrego el representante",
          "Representante agregado!"
        );
        this.getMetaDataRequest(this.RequestActual.request_id);
        let avalRepresentatives = response.data.subjects.filter(
          (element) =>
            element.sys_subject_id == 5 ||
            element.sys_subject_id == 14 ||
            element.sys_subject_id == 28 ||
            element.sys_subject_id == 36
        );
        this.AvalActualRepresentatives = avalRepresentatives.slice();
        this.FormJuridicoRepresentatives.reset();
        //this.modalService.dismissAll();
      })
      .catch((error) => {
        this.toastr.error("Problemas con el servidor.", "Oops!");
        console.log(error);
      });

    //this.AvalMembers.push(member);
    console.log(this.AvalMembers);

    this.FormJuridicoMembers.reset();
  }

  updateSubjectAfter() {
    let avalPrincipal = this.ActualAval.subjects.filter(
      (element) =>
        element.sys_subject_id == 4 ||
        element.sys_subject_id == 1 ||
        element.sys_subject_id == 7 ||
        element.sys_subject_id == 9 ||
        element.sys_subject_id == 13 ||
        element.sys_subject_id == 16 ||
        element.sys_subject_id == 18 ||
        element.sys_subject_id == 27 ||
        element.sys_subject_id == 30 ||
        element.sys_subject_id == 18 ||
        element.sys_subject_id == 32 ||
        element.sys_subject_id == 35 ||
        element.sys_subject_id == 38 ||
        element.sys_subject_id == 40
    );
    let body = {
      rsdet_id: avalPrincipal[0].rsdet_id,
      name: this.FormAvalSubject.controls.name.value,
      nit: this.FormAvalSubject.controls.NIT.value,
      phone: this.FormAvalSubject.controls.phone.value,
      forms: [],
    };

    this.mysqlService
      .UpdateSubject(body)
      .toPromise()
      .then((response) => {
        this.toastr.success("Se actualizo el aval", "Aval actualizado!");
        this.getMetaDataRequest(this.RequestActual.request_id);
        //this.modalService.dismissAll();
      })
      .catch((error) => {
        this.toastr.error("Problemas con el servidor.", "Oops!");
        console.log(error);
      });
  }

  updateSubjecSingletAfter() {
    //let avalPrincipal = this.ActualAval.subjects.filter(element => element.sys_subject_id == 4 || element.sys_subject_id == 1 || element.sys_subject_id == 7 || element.sys_subject_id == 9|| element.sys_subject_id == 13 || element.sys_subject_id == 16 || element.sys_subject_id == 18);
    let avalSingle = this.ActualAval.subjects.filter(
      (element) =>
        element.sys_subject_id == 8 ||
        element.sys_subject_id == 17 ||
        element.sys_subject_id == 31 ||
        element.sys_subject_id == 39
    );

    let body = {
      rsdet_id: avalSingle[0].rsdet_id,
      name: this.FormAvalPersonaIndividual.controls.name.value,
      nit: this.FormAvalPersonaIndividual.controls.NIT.value,
      phone: this.FormAvalPersonaIndividual.controls.phone.value,
      forms: [],
    };

    this.mysqlService
      .UpdateSubject(body)
      .toPromise()
      .then(async (response) => {
        this.toastr.success("Se actualizo el aval", "Aval actualizado!");
        this.getMetaDataRequest(this.RequestActual.request_id);
        await this.getMetaDataRequest(this.RequestActual.request_id);
        this.ActualAval = this.RequestMetaData.filter(
          (element) => element.rwedet_id == this.ActualAval.rwedet_id
        )[0];
        //this.modalService.dismissAll();
      })
      .catch((error) => {
        this.toastr.error("Problemas con el servidor.", "Oops!");
        console.log(error);
      });
  }

  updateSubjecRepresentativesAfter() {
    //let avalPrincipal = this.ActualAval.subjects.filter(element => element.sys_subject_id == 4 || element.sys_subject_id == 1 || element.sys_subject_id == 7 || element.sys_subject_id == 9|| element.sys_subject_id == 13 || element.sys_subject_id == 16 || element.sys_subject_id == 18);
    //let avalSingle = this.ActualAval.subjects.filter(element => element.sys_subject_id == 5 || element.sys_subject_id == 11);

    let body = {
      rsdet_id: this.ActualRepresentative.controls.i.value,
      name: this.ActualRepresentative.controls.name.value,
      nit: this.ActualRepresentative.controls.NIT.value,
      phone: this.ActualRepresentative.controls.phone.value,
      forms: [],
    };
    console.log("body", body);
    this.mysqlService
      .UpdateSubject(body)
      .toPromise()
      .then(async (response) => {
        this.toastr.success("Se actualizo el aval", "Aval actualizado!");
        this.getMetaDataRequest(this.RequestActual.request_id);
        await this.getMetaDataRequest(this.RequestActual.request_id);
        console.log("antes", this.ActualAval);
        this.ActualAval = this.RequestMetaData.filter(
          (element) => element.rwedet_id == this.ActualAval.rwedet_id
        )[0];
        console.log("despues", this.ActualAval);
        let avalRepresentatives = this.ActualAval.subjects.filter(
          (element) =>
            element.sys_subject_id == 5 ||
            element.sys_subject_id == 14 ||
            element.sys_subject_id == 28 ||
            element.sys_subject_id == 36
        );
        //let avalMembers = this.ActualAval.subjects.filter(element => element.sys_subject_id == 6 || element.sys_subject_id == 12);
        this.AvalActualRepresentatives = avalRepresentatives.slice();
        //this.AvalActualMembers  = avalMembers.slice();
        //this.modalService.dismissAll();
      })
      .catch((error) => {
        this.toastr.error("Problemas con el servidor.", "Oops!");
        console.log(error);
      });
  }

  updateSubjecMemberAfter() {
    //let avalPrincipal = this.ActualAval.subjects.filter(element => element.sys_subject_id == 4 || element.sys_subject_id == 1 || element.sys_subject_id == 7 || element.sys_subject_id == 9|| element.sys_subject_id == 13 || element.sys_subject_id == 16 || element.sys_subject_id == 18);
    //let avalSingle = this.ActualAval.subjects.filter(element => element.sys_subject_id == 5 || element.sys_subject_id == 11);

    let body = {
      rsdet_id: this.ActualMember.controls.i.value,
      name: this.ActualMember.controls.name.value,
      nit: this.ActualMember.controls.NIT.value,
      phone: this.ActualMember.controls.phone.value,
      forms: [],
    };
    console.log("body", body);
    this.mysqlService
      .UpdateSubject(body)
      .toPromise()
      .then(async (response) => {
        this.toastr.success("Se actualizo el aval", "Aval actualizado!");
        this.getMetaDataRequest(this.RequestActual.request_id);
        await this.getMetaDataRequest(this.RequestActual.request_id);
        console.log("antes", this.ActualAval);
        this.ActualAval = this.RequestMetaData.filter(
          (element) => element.rwedet_id == this.ActualAval.rwedet_id
        )[0];
        console.log("despues", this.ActualAval);
        //let avalRepresentatives = this.ActualAval.subjects.filter(element => element.sys_subject_id == 5 || element.sys_subject_id == 11);
        let avalMembers = this.ActualAval.subjects.filter(
          (element) =>
            element.sys_subject_id == 6 ||
            element.sys_subject_id == 15 ||
            element.sys_subject_id == 29 ||
            element.sys_subject_id == 37
        );
        //this.AvalActualRepresentatives = avalRepresentatives.slice();
        this.AvalActualMembers = avalMembers.slice();
        //this.modalService.dismissAll();
      })
      .catch((error) => {
        this.toastr.error("Problemas con el servidor.", "Oops!");
        console.log(error);
      });
  }

  async getMetaDataRequest(request) {
    await this.mysqlService
      .GetMetaDataRequest(request)
      .toPromise()
      .then((response) => {
        const result = response.data.filter(
          (element) => element.name == "CLIENTE"
        );
        const result2 = response.data.filter(
          (element) => element.name != "CLIENTE"
        );
        this.RequestMetaData = result2;
        this.AvalClienteMetaData = result[0];

      })
      .catch((error) => {
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
    //console.log(this.RequestMetaData);
  }

  nameAval(aval) {
    let result = aval.subjects.filter(
      (element) =>
        element.sys_subject_id == 1 ||
        element.sys_subject_id == 4 ||
        element.sys_subject_id == 7 ||
        element.sys_subject_id == 9 ||
        element.sys_subject_id == 13 ||
        element.sys_subject_id == 16 ||
        element.sys_subject_id == 18 ||
        element.sys_subject_id == 27 ||
        element.sys_subject_id == 30 ||
        element.sys_subject_id == 32 ||
        element.sys_subject_id == 35 ||
        element.sys_subject_id == 38 ||
        element.sys_subject_id == 40
    );
    //console.log(result);
    return result[0].name;
  }

  resetFormRequest() {
    this.FormInitSolicitud.reset();
    console.log("reset");
    this.FormInitMembers.reset();
    this.FormAval.reset();
    this.FormInitSolicitudStep2.reset();

    this.Avals = [];
    this.flagPushPreviousFiduciary = false;
    this.flagPushInitMember = false;
    this.pageName = "step1";
    this.modeAfterUpdate = false;
    this.InitMembers = [];
    this.AvalMembers = [];
  }

  async CreateCustomerFiducaryWaranty() {
    this.spinner.show();
    //this.formfiduciary.value.request_id = this.requestIdSelected;
    this.formfiduciary.value.customer_id = this.user_id;

    if (this.formfiduciary.value.type == 1) {
      delete this.formfiduciary.value.name1;
      delete this.formfiduciary.value.name2;
      delete this.formfiduciary.value.lastname1;
      delete this.formfiduciary.value.lastname2;
      delete this.formfiduciary.value.nit;
      delete this.formfiduciary.value.DPI;
    }

    // if (!this.formfiduciary.value.name3) {
    //   delete this.formfiduciary.value.name3;
    // }
    // if (!this.formfiduciary.value.lastname3) {
    //   delete this.formfiduciary.value.lastname3;
    // }

    await this.mysqlService
      .CreateFiducaryWarrantyCustomer(this.formfiduciary.value)
      .toPromise()
      .then(async (response) => {
        if (this.formfiduciary.value.type == 1) {
          this.dataResponseSaveFiduciary = response;
        } else {
          //this.formfiduciary.reset({});
          this.modalService.dismissAll();
        }
        //await this.selectRequest();
        this.toastr.success(
          "Se agrego correctamente.",
          "Información Guardada!"
        );
        this.spinner.hide();
        this.ngOnInit();
      })
      .catch((error) => {
        //console.log("asdf", error);
        this.toastr.error("Problemas con el servidor.", "Oops!");
        this.spinner.hide();
      });
    // this.formfiduciary.controls.type.setValue("0");
    // this.formfiduciary.controls.name1.setValue("Nombre");
    // this.formfiduciary.controls.lastname1.setValue("Apellido");
    // this.formfiduciary.controls.businessname.setValue("Nombre comercial");
    // this.formfiduciary.controls.businessnit.setValue("11111111");
    // this.formfiduciary.controls.businessnumber.setValue("55245454");
    // this.formfiduciary.controls.DPI.setValue("1234567891234");
    // this.formfiduciary.controls.nit.setValue("11111111");
  }

  chageTypeWarranties() {
    debugger
    if (this.formfiduciary.value.type == 1) {
      this.formfiduciary.controls.businessname.enable();
      this.formfiduciary.controls.businessnit.enable()
      this.formfiduciary.controls.businessnumber.enable()
      this.formfiduciary.controls.businessname.setValidators([Validators.required])
      this.formfiduciary.controls.businessnit.setValidators([Validators.required,
        isNitValid])
      this.formfiduciary.controls.businessnumber.setValidators([Validators.required])
      this.formfiduciary.controls.businessnit.updateValueAndValidity()
      this.formfiduciary.controls.businessname.updateValueAndValidity()
      this.formfiduciary.controls.businessnumber.updateValueAndValidity()

      this.formfiduciary.controls.name1.disable();
      this.formfiduciary.controls.name1.updateValueAndValidity();
      this.formfiduciary.controls.lastname1.disable();
      this.formfiduciary.controls.lastname1.updateValueAndValidity();
      this.formfiduciary.controls.DPI.disable()
      this.formfiduciary.controls.nit.disable()
    } else {
      this.formfiduciary.controls.businessname.disable();
      this.formfiduciary.controls.businessname.setValidators([])
      this.formfiduciary.controls.businessnit.setValidators([])
      this.formfiduciary.controls.businessnit.disable()
      this.formfiduciary.controls.businessnumber.setValidators([])
      this.formfiduciary.controls.businessnumber.disable()
      this.formfiduciary.controls.businessnit.updateValueAndValidity()
      this.formfiduciary.controls.businessname.updateValueAndValidity()
      this.formfiduciary.controls.businessnumber.updateValueAndValidity()
      this.formfiduciary.controls.name1.enable();
      this.formfiduciary.controls.name1.updateValueAndValidity();
      this.formfiduciary.controls.lastname1.enable();
      this.formfiduciary.controls.lastname1.updateValueAndValidity();
      this.formfiduciary.controls.DPI.enable()
      this.formfiduciary.controls.nit.enable()
    }
  }

  getInternetFiles() {
    let sub = this.mysqlService
      .getInternetFiles(this.dataCustomer.customer_id)
      .pipe(
        map((resp) => {

          this.internetFiles = resp.data;
        }),
        catchError((err) => {
          console.log(err);
          return of();
        })
      )
      .subscribe(() => sub.unsubscribe());
  }
  DownloadInternetFile(doc) {
    this.mysqlService.downloadInternetFile(
      doc.customer_internet_file_id,
      doc.name_s3
    );
  }
  DeleteInternetFile(doc) {
    this.internetFiles = this.internetFiles.filter(
      (f) => f.customer_internet_file_id != doc.customer_internet_file_id
    );
    this.mysqlService
      .deleteInternetFiles(doc.customer_internet_file_id)
      .toPromise()
      .then(async (response) => {
        this.toastr.success("Se elimino el archivo.", "Archivo Eliminado!");
      })
      .catch((error) => {
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }

  async uploadInternetImage(event, nspinner) {
    if (event.target.files && event.target.files[0]) {
      const named = this.filenameS.generateName() + "_" + event.target.files[0].name;
      const typed = event.target.files[0].type;
      //this.spinner.show(nspinner);
      var reader = new FileReader();
      reader.onload = async (event: any) => {
        let data = {
          document: event.target.result,
          name: named,
          type: typed,
          customer_id: this.dataCustomer.customer_id,
        };

        this.spinner.show(nspinner);
        this.mysqlService
          .uploadInternetFile(data)
          .pipe(
            map((data) => {
              console.log("response upload");
              console.log(data.data);
              this.internetFiles.push(data.data);
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
  async ViewReqDoc(modal, doc) {
    //this.spinner.show();
    await this.mysqlService
      .getInternetFile(doc.customer_internet_file_id)
      .toPromise()
      .then((response) => {
        console.log("view", response);
        this.imgsrcbase64 = null;
        this.pdfsrcbase64 = null;
        if (response.data.typed === "image") {
          const urls = "data:image/jpg;base64;base64," + response.data.url;
          this.imgsrcbase64 = this.sanitizer.bypassSecurityTrustResourceUrl(
            urls
          );
        } else if (response.data.typed === "pdf") {
          //const urls = "data:application/pdf;base64," + response.data.url;
          this.pdfsrcbase64 = response.data.url
        }
      })
      .catch((error) => {
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });

    this.viewDocumentModal.openModal()
  }

  openInfornetModal(modal) {
    this.FormInfornetFile.reset({})
    this.getInfornetFiles();
    this.modalService.open(modal, {
      centered: true,
      backdrop: "static",
      keyboard: false,
      size: "xl",
      windowClass: 'my-modal'
    });

  }

  getInfornetFiles() {
    let sub = this.mysqlService
      .getInfornetFiles(this.dataCustomer.customer_id)
      .pipe(
        map((resp) => {

          this.infornetFiles = resp.data;
        }),
        catchError((err) => {
          console.log(err);
          return of();
        })
      )
      .subscribe(() => sub.unsubscribe());
  }
  DownloadInfornetFile(doc) {
    this.mysqlService.downloadInfornetFile(
      doc.customer_infornet_file_id,
      doc.name_s3
    );
  }
  DeleteInfornetFile(doc) {
    this.infornetFiles = this.infornetFiles.filter(
      (f) => f.customer_infornet_file_id != doc.customer_infornet_file_id
    );
    this.mysqlService
      .deleteInfornetFiles(doc.customer_infornet_file_id)
      .toPromise()
      .then(async (response) => {
        this.toastr.success("Se elimino el archivo.", "Archivo Eliminado!");
      })
      .catch((error) => {
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }

  async uploadInfornetImage(event, nspinner) {
    if (event.target.files && event.target.files[0]) {
      const named = this.filenameS.generateName() + "_" + event.target.files[0].name;
      const typed = event.target.files[0].type;
      //this.spinner.show(nspinner);
      var reader = new FileReader();
      reader.onload = async (event: any) => {
        let data = {
          document: event.target.result,
          name: named,
          type: typed,
          customer_id: this.dataCustomer.customer_id,
          mesage: this.FormInfornetFile.get('mesage').value
        };

        this.spinner.show(nspinner);
        this.mysqlService
          .uploadInfornetFile(data)
          .pipe(
            map((data) => {
              console.log("response upload");
              console.log(data.data);
              this.infornetFiles.push(data.data);
              //console.log(this.currentAval.requirements.requirements[index].docs);
              this.FormInfornetFile.reset()
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
  async ViewReqDocInfornet(modal, doc) {
    //this.spinner.show();
    await this.mysqlService
      .getInfornetFile(doc.customer_infornet_file_id)
      .toPromise()
      .then((response) => {
        console.log("view", response);
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


  async UpdateRepresentativeActualAval() {
    this.spinner.show();
    this.formfiduciary.value.type = 2;
    this.formfiduciary.value.name1 = this.FormUpdateJuridicoRepresentatives.controls.name1.value;
    this.formfiduciary.value.name2 = this.FormUpdateJuridicoRepresentatives.controls.name2.value;
    this.formfiduciary.value.name3 = this.FormUpdateJuridicoRepresentatives.controls.name3.value;
    this.formfiduciary.value.lastname1 = this.FormUpdateJuridicoRepresentatives.controls.lastname1.value;
    this.formfiduciary.value.lastname2 = this.FormUpdateJuridicoRepresentatives.controls.lastname2.value;
    this.formfiduciary.value.lastname3 = this.FormUpdateJuridicoRepresentatives.controls.lastname3.value;
    this.formfiduciary.value.nit = this.FormUpdateJuridicoRepresentatives.controls.NIT.value;
    this.formfiduciary.value.phone = this.FormUpdateJuridicoRepresentatives.controls.phone.value;
    this.formfiduciary.value.DPI = this.FormUpdateJuridicoRepresentatives.controls.DPI.value;

    // delete this.formfiduciary.value.name2;
    // delete this.formfiduciary.value.lastname1;
    // delete this.formfiduciary.value.lastname2;

    if (!this.formfiduciary.value.businessnumber) {
      delete this.formfiduciary.value.businessnumber;
    }
    if (!this.formfiduciary.value.businessnit) {
      delete this.formfiduciary.value.businessnit;
    }
    // if (!this.formfiduciary.value.name3) {
    //   delete this.formfiduciary.value.name3;
    // }
    // if (!this.formfiduciary.value.lastname3) {
    //   delete this.formfiduciary.value.lastname3;
    // }

    await this.mysqlService
      .UpdateFiducaryWarrantyCustomer(
        this.formfiduciary.value,
        this.dataUpdateFiducary.id_fiduciary
      )
      .toPromise()
      .then(async (response) => {
        this.modalService.dismissAll();
        this.toastr.success(
          "Se agrego correctamente.",
          "Información Guardada!"
        );
        this.spinner.hide();
        this.ngOnInit();
      })
      .catch((error) => {
        //console.log("asdf", error);
        this.toastr.error("Problemas con el servidor.", "Oops!");
        this.spinner.hide();
      });
  }

  async UpdateMemberActualAval() {
    this.spinner.show();
    this.formfiduciary.value.type = 3;
    this.formfiduciary.value.name1 = this.FormUpdateJuridicoMembers.controls.name1.value;
    this.formfiduciary.value.name2 = this.FormUpdateJuridicoMembers.controls.name2.value;
    this.formfiduciary.value.name3 = this.FormUpdateJuridicoMembers.controls.name3.value;
    this.formfiduciary.value.lastname1 = this.FormUpdateJuridicoMembers.controls.lastname1.value;
    this.formfiduciary.value.lastname2 = this.FormUpdateJuridicoMembers.controls.lastname2.value;
    this.formfiduciary.value.lastname3 = this.FormUpdateJuridicoMembers.controls.lastname3.value
    this.formfiduciary.value.nit = this.FormUpdateJuridicoMembers.controls.NIT.value;
    this.formfiduciary.value.phone = this.FormUpdateJuridicoMembers.controls.phone.value;
    this.formfiduciary.value.DPI = this.FormUpdateJuridicoMembers.controls.DPI.value;

    // delete this.formfiduciary.value.name2;
    // delete this.formfiduciary.value.lastname1;
    // delete this.formfiduciary.value.lastname2;

    if (!this.formfiduciary.value.businessnumber) {
      delete this.formfiduciary.value.businessnumber;
    }
    if (!this.formfiduciary.value.businessnit) {
      delete this.formfiduciary.value.businessnit;
    }
    // if (!this.formfiduciary.value.name3) {
    //   delete this.formfiduciary.value.name3;
    // }
    // if (!this.formfiduciary.value.lastname3) {
    //   delete this.formfiduciary.value.lastname3;
    // }

    await this.mysqlService
      .UpdateFiducaryWarrantyCustomer(
        this.formfiduciary.value,
        this.dataUpdateFiducary.id_fiduciary
      )
      .toPromise()
      .then(async (response) => {
        this.modalService.dismissAll();
        this.toastr.success(
          "Se agrego correctamente.",
          "Información Guardada!"
        );
        this.spinner.hide();
        this.ngOnInit();
      })
      .catch((error) => {
        //console.log("asdf", error);
        this.toastr.error("Problemas con el servidor.", "Oops!");
        this.spinner.hide();
      });
  }

  async deleteFiduciary(id) {
    await this.mysqlService
      .DeleteFiducaryWarrantyCustomer(id)
      .toPromise()
      .then(async (response) => {
        this.modalService.dismissAll();
        this.toastr.success(
          "Se elimino correctamente",
          "Información Guardada!"
        );
        this.spinner.hide();
        this.ngOnInit();
      })
      .catch((error) => {
        //console.log("asdf", error);
        this.toastr.error("Problemas con el servidor.", "Oops!");
        this.spinner.hide();
      });
  }
  async DeleteMember() {
    this.spinner.show()
    if (this.deletepersonid.representative_id) {
      //Representante
      await this.mysqlService
        .deleteRepresentative(this.deletepersonid.representative_id)
        .toPromise()
        .then(async (response) => {
          this.modalService.dismissAll();
          this.toastr.success(
            "Se elimino correctamente",
            "Información Guardada!"
          );
          this.spinner.hide();
          this.ngOnInit();
        }).catch((error) => {
          this.toastr.error("Problemas con el servidor.", "Oops!");
          this.spinner.hide();
        });
    } else {
      await this.mysqlService
        .deleteMember(this.deletepersonid.member_id)
        .toPromise()
        .then(async (response) => {
          this.modalService.dismissAll();
          this.toastr.success(
            "Se elimino correctamente",
            "Información Guardada!"
          );
          this.spinner.hide();
          this.ngOnInit();
        })
        .catch((error) => {
          this.toastr.error("Problemas con el servidor.", "Oops!");
          this.spinner.hide();
        });
    }

  }

  openModalUpdateRepresentative(targetModal, data) {
    this.dataUpdateFiducary = data;
    this.FormUpdateJuridicoRepresentatives.patchValue({
      name1: data.name1,
      name2: data.name2,
      name3: data.name3,
      lastname1: data.lastname1,
      lastname2: data.lastname2,
      lastname3: data.lastname3,
      NIT: data.nit,
      phone: data.phone,
      DPI: data.DPI,
    });
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: "static",
      keyboard: false,
      size: "xl",
      windowClass: 'my-modal'
    });
  }

  openModalUpdateMember(targetModal, data) {
    this.dataUpdateFiducary = data;
    this.FormUpdateJuridicoMembers.patchValue({
      name1: data.name1,
      name2: data.name2,
      name3: data.name3,
      lastname1: data.lastname1,
      lastname2: data.lastname2,
      lastname3: data.lastname3,
      NIT: data.nit,
      phone: data.phone,
      DPI: data.DPI,
    });
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: "static",
      keyboard: false,
      size: "xl",
      windowClass: 'my-modal'
    });
  }

  getChilds(dataFiduciary, id_fiduciary) {
    // filtro usado para la pestaña VER REQUISITOS
    if (dataFiduciary) {
      return dataFiduciary.filter(s => s.id_father == id_fiduciary);
    } else {
      return [];
    }
  }
  getAvals() {
    const fatherFiduciary = this.dataFiduciary.filter(item => item.id_father == null);
    debugger
    return fatherFiduciary
  }
}
