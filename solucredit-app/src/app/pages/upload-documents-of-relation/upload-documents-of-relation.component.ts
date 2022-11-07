import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SendEmailService } from '../../services/sendemail/send-email.service';
import { MysqlService } from '../../services/mysql/mysql.service';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthorizationService } from '../../services/authorization.service';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { SidebarNameService } from 'src/app/services/data/sidebar-name.service';
import { FilenameService } from 'src/app/services/data/filename.service';
import { DocumentmodalComponent } from 'src/app/component/modals/documentmodal/documentmodal.component';
import { HttpClient } from '@angular/common/http';
import { PlaceHoldersService } from 'src/app/services/place-holders.service';
import { ErrorMessagesService } from 'src/app/services/error-messages.service';
import { isNitValid } from 'src/app/Validators/NitValidator';
import { isDPIValid } from 'src/app/Validators/DPIValidator';
import { ConfirmAlertService } from 'src/app/services/alerts/confirm-alert.service';
import { BUCKET_NAME } from 'src/Utils/constants';
import { IntrojsService } from 'src/app/services/introjs/introjs.service';

@Component({
  selector: "app-upload-documents-of-relation",
  templateUrl: "./upload-documents-of-relation.component.html",
  styleUrls: ["./upload-documents-of-relation.component.scss"],
})
export class UploadDocumentsOfRelationComponent implements OnInit {
  @ViewChild(DocumentmodalComponent) viewDocumentModal: DocumentmodalComponent

  susciption: Subscription;


  user_id;
  url_letter = environment.urlDownletter;
  initialRelation;
  initialRelationList;
  imgsrcbase64;
  pdfsrcbase64;
  persons = [];
  dataUpdateFiducary;
  dataFiduciary;
  customer;
  dataCurrentSelected;
  datatypeSelected;
  datatypeDocSelected;
  disable = false;
  statusRechazado = false;
  statusAceptado = false;
  public showSidebar = false;
  idselected = "cotainercustomer";
  modeAfterUpdate = false;
  AvalMembers = [];
  AvalActualMembers = [];
  AvalActualRepresentatives = [];
  dataResponseSaveFiduciary;
  dataResponseAddRepresentative = [];
  warningLetter = false;
  lockowner = false;
  dataUpdateDownload;
  typeUpdateDownload;
  representativeArray = [];
  // Right panel vars
  uploadDocumentsUserData = {
    name: false,
    DPI_key: false as any,
    letter_of_consent_key: false as any,
    type: null,
    client_type: null,
    dpi_status: 0,
    letter_of_consent_status: 0
  }
  uploadDocumentsUserRecord;

  FormJuridicoMembers = new FormGroup({
    name1: new FormControl("", [Validators.required]),
    name2: new FormControl("", []),
    name3: new FormControl("", []),
    lastname1: new FormControl("", [Validators.required]),
    lastname2: new FormControl("", []),
    lastname3: new FormControl("", []),
    NIT: new FormControl("", [
      Validators.required,
      isNitValid
    ]),
    phone: new FormControl("", [
      Validators.required,
      Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)"),
      Validators.maxLength(8),
    ]),
    DPI: new FormControl("", [
      Validators.required,
      isDPIValid
    ]),
  });

  FormJuridicoRepresentatives = new FormGroup({
    name1: new FormControl("", [Validators.required]),
    name2: new FormControl(''),
    name3: new FormControl(""),
    lastname1: new FormControl('', [Validators.required]),
    lastname2: new FormControl(''),
    lastname3: new FormControl(''),
    NIT: new FormControl("", [
      Validators.required,
      isNitValid
    ]),
    phone: new FormControl("", [
      Validators.required,
      Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)"),
      Validators.maxLength(8),
    ]),
    DPI: new FormControl("", [
      Validators.required,
      isDPIValid
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
      isNitValid
    ]),
    phone: new FormControl("", [
      Validators.required,
      Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)"),
      Validators.maxLength(8),
    ]),
    DPI: new FormControl("", [
      Validators.required,
      isDPIValid
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
      isNitValid
    ]),
    phone: new FormControl("", [
      Validators.required,
      Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)"),
      Validators.maxLength(8),
    ]),
    DPI: new FormControl("", [
      Validators.required,
      isDPIValid
    ]),
  });

  formfiduciary = new FormGroup({
    type: new FormControl("0", [Validators.required]),
    // Fiduciary Types
    // 0: Aval individual (empresa)
    // 1: Aval jurídico (individual)
    // 2: Representante aval
    // 3: socio aval
    name1: new FormControl("", [Validators.required]),
    name2: new FormControl("", []),
    name3: new FormControl(''),
    lastname1: new FormControl("", [Validators.required]),
    lastname2: new FormControl("", []),
    lastname3: new FormControl(""),
    businessname: new FormControl("", [Validators.required]),
    businessnit: new FormControl("", [
      Validators.required,
      isNitValid
    ]),
    businessnumber: new FormControl("", [
      Validators.required,
      Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)"),
    ]),
    DPI: new FormControl("", [
      Validators.required,
      isDPIValid
    ]),
    nit: new FormControl("", [
      Validators.required,
      isNitValid
    ]),
  });

  formrepresentative = new FormGroup({
    first_name: new FormControl(null, [Validators.required]),
    name2: new FormControl(''),
    name3: new FormControl(''),
    last_name: new FormControl(null, [Validators.required]),
    lastname2: new FormControl(''),
    lastname3: new FormControl(''),
    gender: new FormControl("", [Validators.required]),
    birthdate: new FormControl(null, []),
    email: new FormControl(null, [Validators.required, Validators.email]),
    mobile_phone: new FormControl(null, [
      Validators.required,
      Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)"),
    ]),
    home_phone: new FormControl("", [
      Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)"),
    ]),
    office_home: new FormControl("", [
      Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)"),
    ]),
    address: new FormControl(null, []),
    DPI: new FormControl(null, [
      Validators.required,
      isDPIValid
    ]),

    associate: new FormControl(null),
  })

  formletter = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    name2: new FormControl(''),
    name3: new FormControl(''),
    lastname2: new FormControl(''),
    lastname3: new FormControl(''),
    last_name: new FormControl('', [Validators.required]),
    DPI: new FormControl(null, [
      isDPIValid,
      Validators.required,
    ]),
    businessname: new FormControl(null, [Validators.required]),
    nit: new FormControl(null, [
      isNitValid,
      Validators.required,
    ]),
    showBusinessName: new FormControl(null, []),
    businessnit: new FormControl({ disabled: true }, [
      isNitValid,
      Validators.required,
    ]),
    representative: new FormControl([Validators.required]),
    branchoffice: new FormControl(),
    branchofficecode: new FormControl(),
    phone: new FormControl(""),
    address1: new FormControl(""),
    address2: new FormControl(""),
    amount_interests: new FormControl(""),
    currency: new FormControl(""),
    department: new FormControl(""),
    municipality: new FormControl(""),
    country: new FormControl("")
  });
  showtutorial = true
  constructor(
    private mysqlService: MysqlService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private sanitizer: DomSanitizer,
    private _sendemail: SendEmailService,
    private authorization: AuthorizationService,
    private sidebarName: SidebarNameService,
    private filenameS: FilenameService,
    private http: HttpClient,
    public placeHolders: PlaceHoldersService,
    public errorMessages: ErrorMessagesService,
    private confirmAlertService: ConfirmAlertService,
    private introJs: IntrojsService,
  ) { }

  async ngOnInit() {
    this.spinner.show();

    this.susciption = this.authorization.authotizationState$.subscribe(
      async (x) => {

        //this.user_id = atob(String(this.activatedRoute.snapshot.params.id));
        this.user_id = this.authorization.getUserid();
        await this.getDataCurrentCostumer();
        await this.getDataPersonCurrentCostumer();
        await this.chageTypeWarranties();
        this.contactHaveRepresentative();
        this.createRepresentativeArray();
        if (this.persons.length == 0 || this.showtutorial)
          this.introJs.customerUploadDocuments(true);
        this.showtutorial = false
        console.log(this.initialRelation)
        console.log(this.statusRechazado)
        this.spinner.hide();
      });
    // this.spinner.hide("cargandoinfo");

    this.defaultSidebar = this.options.sidebartype;

    this.handleSidebar();
  }
  contactHaveRepresentative() {
    if (this.customer.is_Contact == 1) {
      //Revisar si tiene Representantes
      if (this.persons.length > 0) {
        this.lockowner = false;
        return
      }
    } else {
      this.lockowner = false;
      return
    }
    this.lockowner = true;
  }
  mobileSidebar() {
    this.showSidebar = !this.showSidebar;
  }

  //($event,'formularios','feic','s3')"

  async showPreviewImage(event, locationd, documenttype) {
    if (event.target.files && event.target.files[0]) {
      //CAMBIAR EL NOMBRE el id de la persona + el tipo de documento para no repetir
      const named = this.filenameS.generateName() + "_" + event.target.files[0].name;
      const typed = event.target.files[0].type;
      this.spinner.show();
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
            //console.log("res", response);
            this.saveDocuments(
              response.data.Key,
              documenttype,
              locationd,
              named
            );
            event.srcElement.value = null;
          })
          .catch((error) => {
            this.spinner.hide();
            this.toastr.error("Problemas con guardar la imagen", "Oops!");
          });
      };

      await reader.readAsDataURL(event.target.files[0]);
      event.srcElement.value = null;
    }
  }

  async showPreviewImageJuridico(event, locationd, documenttype, person) {
    if (event.target.files && event.target.files[0]) {
      const named = this.filenameS.generateName() + "_" + event.target.files[0].name;
      const typed = event.target.files[0].type;
      this.spinner.show();
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
            //console.log("res", response);
            if (documenttype == 'DPI') {
              this.uploadDocumentsUserData.dpi_status = 0;
            } else if (documenttype == 'CartaConsetimiento') {
              this.uploadDocumentsUserData.letter_of_consent_status = 0;
            }
            this.saveDocumentsPerson(
              response.data.Key,
              documenttype,
              locationd,
              named,
              person.id,

            );
            event.srcElement.value = null;
          })
          .catch((error) => {
            this.spinner.hide();
            this.toastr.error("Problemas con guardar la imagen", "Oops!");
          });
      };

      await reader.readAsDataURL(event.target.files[0]);
      event.srcElement.value = null;
    }
  }

  async saveDocuments(
    documentkey: string,
    documenttype: string,
    type: string,
    named: string
  ) {
    debugger
    let data = {};

    if (documenttype === "DPI") {
      data = {
        DPI_key: BUCKET_NAME + '/' + documentkey.substring(0, documentkey.lastIndexOf('/') + 0),
        DPI_name: named,
        person_id: 0,
        dpi_status: 0,
        status_doc_comment: null,
      };
    } else if (documenttype === "CartaConsetimiento") {
      data = {
        letter_of_consent_key: BUCKET_NAME + '/' + documentkey.substring(0, documentkey.lastIndexOf('/') + 0),
        letter_of_consent_name: named,
        person_id: 0,
        letter_of_consent_status: 0,
        status_doc_comment: null,
      };
    }
    this.spinner.show();
    await this.mysqlService
      .UpdateIRelation(data, this.user_id)
      .toPromise()
      .then((res) => {
        this.toastr.success(
          "El documento fue guardado.",
          "Documento Guardado!"
        );
        this.modalService.dismissAll();
        this.spinner.hide();
        this.getDataCurrentCostumer();
        this.getDataPersonCurrentCostumer();
        // set the button as success
        if (documenttype === 'DPI') {
          this.uploadDocumentsUserData.DPI_key = documentkey;
        } else if (documenttype === "CartaConsetimiento") {
          this.uploadDocumentsUserData.letter_of_consent_key = documentkey;
        }
      })
      .catch((err) => {
        this.toastr.error("Problemas con el servidor", "Oops!");
        this.spinner.hide();
      });
  }

  async saveDocumentsPerson(
    documentkey: string,
    documenttype: string,
    type: string,
    named: string,
    id_relation: number
  ) {
    debugger
    let data = {};

    if (documenttype === "DPI") {
      data = {
        DPI_key: BUCKET_NAME + '/' + documentkey.substring(0, documentkey.lastIndexOf('/') + 0),
        DPI_name: named,
        dpi_status: 0,
        status_doc_comment: null,
      };
    } else if (documenttype === "CartaConsetimiento") {
      data = {
        letter_of_consent_key: BUCKET_NAME + '/' + documentkey.substring(0, documentkey.lastIndexOf('/') + 0),
        letter_of_consent_name: named,
        letter_of_consent_status: 0,
        status_doc_comment: null,
      };
    }
    this.spinner.show();
    await this.mysqlService
      .UpdateIRelationJuridica(data, id_relation)
      .toPromise()
      .then((res) => {
        this.toastr.success(
          "El documento fue guardado.",
          "Documento Guardado!"
        );
        this.modalService.dismissAll();
        this.spinner.hide();
        this.getDataCurrentCostumer();
        this.getDataPersonCurrentCostumer();
        this.chageTypeWarranties();
        // set the button as success
        if (documenttype === 'DPI') {
          this.uploadDocumentsUserData.DPI_key = documentkey;
        } else if (documenttype === "CartaConsetimiento") {
          this.uploadDocumentsUserData.letter_of_consent_key = documentkey;
        }
      })
      .catch((err) => {
        this.toastr.error("Problemas con el servidor", "Oops!");
        this.spinner.hide();
      });
  }

  async showPreviewImageFiduciario(event, locationd, documenttype, fiduciary) {
    if (event.target.files && event.target.files[0]) {
      const named = this.filenameS.generateName() + "_" + event.target.files[0].name;
      const typed = event.target.files[0].type;
      this.spinner.show();
      var reader = new FileReader();
      reader.onload = async (event: any) => {
        await this.mysqlService
          .UploadFileDocuments({
            customer_id: fiduciary.id_fiduciary,
            document: event.target.result,
            locationdoc: locationd,
            name: named,
            type: typed,
          })
          .toPromise()
          .then((response) => {
            //console.log("res", response);
            this.saveDocumentsFiduciary(
              response.data.Key,
              documenttype,
              locationd,
              named,
              fiduciary.id_fiduciary
            );
            event.srcElement.value = null;
          })
          .catch((error) => {
            this.spinner.hide();
            this.toastr.error("Problemas con guardar la imagen", "Oops!");
          });
      };

      await reader.readAsDataURL(event.target.files[0]);
      event.srcElement.value = null;
    }
  }

  async saveDocumentsFiduciary(
    documentkey: string,
    documenttype: string,
    type: string,
    named: string,
    id_fidu: number
  ) {
    let data = {};

    if (documenttype === "DPI") {
      data = {
        DPI_key: BUCKET_NAME + '/' + documentkey.substring(0, documentkey.lastIndexOf('/') + 0),
        DPI_name: named,
        dpi_status: 0,
        status_doc_comment: null,
      };
    } else if (documenttype === "CartaConsetimiento") {
      data = {
        letter_of_consent_key: BUCKET_NAME + '/' + documentkey.substring(0, documentkey.lastIndexOf('/') + 0),
        letter_of_consent_name: named,
        letter_of_consent_status: 0,
        status_doc_comment: null,
      };
    }
    this.spinner.show();
    await this.mysqlService
      .UpdateIRelationFiduciary(data, id_fidu)
      .toPromise()
      .then((res) => {
        if (documenttype == 'DPI') {
          this.uploadDocumentsUserData.dpi_status = 0;
        } else if (documenttype == 'CartaConsetimiento') {
          this.uploadDocumentsUserData.letter_of_consent_status = 0;
        }
        this.toastr.success(
          "El documento fue guardado.",
          "Documento Guardado!"
        );
        this.modalService.dismissAll();
        this.spinner.hide();
        this.getDataCurrentCostumer();
        this.getDataPersonCurrentCostumer();
        // set the button as success
        if (documenttype === 'DPI') {
          this.uploadDocumentsUserData.DPI_key = documentkey;
        } else if (documenttype === "CartaConsetimiento") {
          this.uploadDocumentsUserData.letter_of_consent_key = documentkey;
        }
      })
      .catch((err) => {
        this.toastr.error("Problemas con el servidor", "Oops!");
        this.spinner.hide();
      });
  }

  async getDataCurrentCostumer() {
    // const onepersons ;
    const res = this.mysqlService
      .GetOneCustomer(this.user_id)
      .toPromise()
      .then((response) => {
        this.initialRelation = response.data.relation[0];
        this.customer = response.data.customer;
        
        this.dataFiduciary = response.data.fiduciaries;

        //console.log("initial", response);
        this.spinner.hide();
        console.log("fiduciari", this.dataFiduciary);
      })
      .catch((error) => {
        this.spinner.hide();
        this.toastr.error("Problemas con el servidor", "Oops!");
      });
    return res;
  }

  async getDataPersonCurrentCostumer() {
    const res = this.mysqlService
      //.getCustomerRepresentatiave(this.user_id)
      .getCustomerRepMem(this.user_id)
      .toPromise()
      .then((response) => {
        //this.initialRelation = response.data.relation[0];

        console.log("representantes", response.data);
        this.persons = response.data;
        //console.log("persons", this.persons);
        if (this.persons.length == 0) {
          this.statusRechazado = false;
          this.statusAceptado = false;
          this.disable = true;
        } else {
          this.statusRechazado = false;
          this.statusAceptado = false;
          this.disable = false;
        }
        debugger
        //tenemos que ver si el usuario tiene avales y se quita eso
        if(this.dataFiduciary.length > 0){
          this.disable = false;
        }
        debugger
        //console.log("antes", this.disable);
        this.persons.map((item) => {
          debugger
          if (this.disable === true) {
            if (
              (item.status_doc === 0 &&
                item.DPI_key !== null &&
                item.letter_of_consent_key !== null) ||
              item.status_doc === 1 ||
              (item.status_doc === 3 && item.DPI_key !== null)
            ) {
              this.disable = false;
              // console.log("durante", this.disable);
            }
          }

          if (item.DPI_key === null || item.letter_of_consent_key === null) {
            this.disable = true;
          }

          if (this.statusRechazado == false) {
            if (item.status_doc === 3) {
              this.statusAceptado = true;
            }
          }

          if (item.status_doc === 1) {
            this.statusRechazado = true;
            this.statusAceptado = false;
          }
        });
        //console.log("disable", this.disable);
        //console.log("rechazo", this.statusRechazado);
        //console.log("accept", this.statusAceptado);
        //console.log("person", response);
        //this.spinner.hide();
        // console.log(response);
      })
      .catch((error) => {
        this.spinner.hide();
        this.toastr.error("Problemas con el servidor", "Oops!");
      });
    return res;
  }

  async ViewDocu(modal, type, dockey, relation_id) {
    this.spinner.show();
    //console.log(dockey);
    await this.mysqlService
      .GetOneDocument({
        type: type,
        id: relation_id,
        document_key: dockey,
      })
      .toPromise()
      .then((response) => {
        //console.log("view", response);
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

  async ViewDocuFidu(modal, type, dockey, relation_id) {
    this.spinner.show();
    //console.log(dockey);
    await this.mysqlService
      .GetOneDocument({
        type: type,
        id: relation_id,
        document_key: dockey,
      })
      .toPromise()
      .then((response) => {

        //console.log("view", response);
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
  SaveRepresentative() {
    this.spinner.show()
    if (!this.formrepresentative.value.birthdate) {
      delete this.formrepresentative.value.birthdate;
    }
    if (!this.formrepresentative.value.email) {
      delete this.formrepresentative.value.email;
    }
    if (!this.formrepresentative.value.mobile_phone) {
      delete this.formrepresentative.value.mobile_phone;
    }
    if (!this.formrepresentative.value.home_phone) {
      delete this.formrepresentative.value.home_phone;
    }
    if (!this.formrepresentative.value.office_home) {
      delete this.formrepresentative.value.office_home;
    }
    if (!this.formrepresentative.value.address) {
      delete this.formrepresentative.value.address;
    }
    if (!this.formrepresentative.value.DPI) {
      delete this.formrepresentative.value.DPI;
    }
    this.mysqlService.CreatePerson(this.formrepresentative.value).subscribe(
      (response) => {
        let data = {
          customer_id: this.user_id,
          person_id: response.data.person_id,
          status_id: 1
        };
        if (this.formrepresentative.get('associate').value == 1) {
          //@ts-ignore
          data = { ...data, ismember: true };
        }
        this.mysqlService
          .CreateCustomerRepresentative(data)
          .subscribe((response2) => {
            this.modalService.dismissAll()
            this.toastr.success(
              "El Representante fue creado con éxito.",
              "Creado!"
            );
            this.formrepresentative.reset({});
            this.spinner.hide();
            this.ngOnInit();

          })

      },
      (error) => {
        this.toastr.error("Verificar información del formulario.", "Oops!");
        console.log("error")
      }
    )
  }
  async CompleteDoc() {
    this.spinner.show("enviandoinfo");
    this._sendemail
      .sendEmail({
        Subject:
          "[Solucredit App] - Respuesta de solicitud de inicio de relación",
        To: this.initialRelation.employee_email,
        template_id: 6,
        customer_id: this.user_id,
      })
      .subscribe(
        async (response) => {
          this.toastr.success(
            "Se envio la información al agente asignado.",
            "Enviado!"
          );

          this.persons.map(async (item) => {
            if (item.status_doc !== 2) {
              await this.mysqlService
                .UpdateIRelation(
                  {
                    status_doc: 3,
                    modification_date: new Date(),
                    employee_email: localStorage.getItem("email"),
                    person_id: item.id,
                  },
                  this.user_id
                )
                .toPromise();
            }
          });

          await this.mysqlService
            .UpdateIRelation(
              {
                status_doc: this.initialRelation.status_doc === 2 ? 2 : 3,
                modification_date: new Date(),
                employee_email: localStorage.getItem("email"),
                person_id: 0,
              },
              this.user_id
            )
            .toPromise()
            .then((res) => {
              this.toastr.success(
                "Los documentos seran verificados.",
                "Documentos enviados!"
              );
              this.modalService.dismissAll();
              this.router.navigate(["/my-profile"]);
            })
            .catch((err) => {
              this.toastr.error("Problemas con el servidor", "Oops!");
              this.spinner.hide();
            });

          this.getDataCurrentCostumer();
          this.getDataPersonCurrentCostumer();
          this.spinner.hide("enviandoinfo");
        },
        (error) => {
          this.toastr.error(
            "Problemas con el servidor, intente de nuevo.",
            "Oops!"
          );
          this.spinner.hide("enviandoinfo");
        }
      );
  }

  closeBtnClick() {
    //console.log('Se va a cerrar el modal');
    this.modalService.dismissAll();
  }

  async dowloadLetter() {
    await this.mysqlService
      .Downletter("individual", "test", "123123123312", null, null)
      .toPromise()
      .then((response) => {
        console.log("exito");
      })
      .catch((err) => {
        this.toastr.error("Problemas con el servidor", "Oops!");
        this.spinner.hide();
      });
  }

  openModaViewEditDoc(targetModal, type, typedoc, data) {
    this.dataCurrentSelected = data;
    this.datatypeSelected = type;
    this.datatypeDocSelected = typedoc;
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: "static",
      keyboard: false,
      size: "xl",
      windowClass: 'my-modal'
    });
  }

  openModalSR(targetModal) {

    this.formfiduciary.patchValue({
      type: '0',
      name: 'Nombre completo',
      businessname: "Nombre comercial",
      businessnit: "11111111",
      businessnumber: "55245454",
      DPI: "1234567891234",
      nit: "11111111"

    });
    this.chageTypeWarranties();
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: "static",
      keyboard: false,
      size: "xl",
      windowClass: 'my-modal'
    });
  }
  openModalRepresentative(targetModal) {
    this.formrepresentative.reset({})
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: "static",
      keyboard: false,
      size: 'xl',
      windowClass: 'my-modal'
    })
  }
  openModalLegal(targetModal, data) {
    this.dataUpdateFiducary = data;
    this.formfiduciary.patchValue({
      type: 1,
      businessname: data.businessname,
      businessnit: data.businessnit,
      businessnumber: data.businessnumber,
    });
    this.dataResponseSaveFiduciary = { data: data };
    this.chageTypeWarranties();
    this.dataResponseAddRepresentative = [];
    this.AvalActualMembers = [];
    this.dataFiduciary.forEach((element) => {
      if (element.type == 2) {
        if (data.id_fiduciary == element.id_father) {
          this.dataResponseAddRepresentative.push(element);
        }
      } else if (element.type == 3) {
        if (data.id_fiduciary == element.id_father) {
          this.AvalActualMembers.push(element);
        }
      }
    });
    //console.log('current data', this.dataFiduciary)
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: "static",
      keyboard: false,
      size: "xl",
    });
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
      nit: this.dataUpdateFiducary.nit,
    });
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
  async CheckCreateCustomerFiducaryWaranty() {
    let hasDefaultValues = false;

    // Checking if the form has default values
    if (this.formfiduciary.value.type == 0) {
      // individual
      if (this.formfiduciary.value.name1 == 'Nombre' || this.formfiduciary.value.DPI == '1234567891234'
        || this.formfiduciary.value.nit == '11111111') {
        hasDefaultValues = true;
      }
    } else {
      // juridico 
      if (this.formfiduciary.value.businessname == 'Nombre' || this.formfiduciary.value.businessnit == '11111111'
        || this.formfiduciary.value.businessnumber == '55245454') {
        hasDefaultValues = true;
      }
    }

    if (hasDefaultValues) {
      const modalRef = this.modalService.open(ConfirmationModalComponent);
      modalRef.componentInstance.confirmationBoxTitle = '¿Está seguro de continuar?';
      modalRef.componentInstance.confirmationMessage = 'El formulario aún contiene datos de prueba, por favor asegurese de actualizarlos posteriormente.';

      modalRef.result.then((userResponse) => {
        if (userResponse) {
          this.CreateCustomerFiducaryWaranty();
        } else {
          return false;
        }
      });
    } else {
      this.CreateCustomerFiducaryWaranty();
    }
  }
  createRepresentativeArray() {
    //CREAMOS EL ARREGLO DE TODOS LOS REPRESENTANTES
    console.log(this.customer)
    console.log(this.persons)

    this.representativeArray = this.persons.map((item, i) => (
      {
        value: i,
        text: item.name,
        first_name: item.first_name,
        name2: item.name2,
        name3: item.name3,
        last_name: item.last_name,
        lastname2: item.lastname2,
        lastname3: item.lastname3,
        DPI: item.DPI,
        nit: item.nit
      }
    ))
    console.log(this.persons)
  }

  onChangeSelector(target: number) {
    //Agregamos los datos al formulario
    console.log(target)
    const item = this.representativeArray[target]
    console.log(item)
    this.formletter.controls['first_name'].setValue(item.first_name)
    this.formletter.controls['name2'].setValue(item.name2)
    this.formletter.controls['name3'].setValue(item.name3)
    this.formletter.controls['last_name'].setValue(item.last_name)
    this.formletter.controls['lastname2'].setValue(item.lastname2)
    this.formletter.controls['lastname3'].setValue(item.lastname3)
    this.formletter.controls['DPI'].setValue(item.DPI)
    this.formletter.controls['nit'].setValue(item.nit)
    /*
    this.formletter.controls['branchoffice'].setValue(item.branchoffice)
    this.formletter.controls['branchofficecode'].setValue(item.branchofficecode)
    this.formletter.controls['phone'].setValue(item.phone)
    this.formletter.controls['address1'].setValue(item.address1)
    this.formletter.controls['address2'].setValue(item.address2)
    this.formletter.controls['amount_interests'].setValue(item.amount_interests)
    this.formletter.controls['currency'].setValue(item.currency)
    this.formletter.controls['department'].setValue(item.department)
    this.formletter.controls['municipality'].setValue(item.municipality)
    this.formletter.controls['country'].setValue(item.country)
  */
  }
  async CreateCustomerFiducaryWaranty() {
    this.spinner.show();
    //this.formfiduciary.value.request_id = this.requestIdSelected;
    this.formfiduciary.value.customer_id = this.user_id;

    if (this.formfiduciary.value.type == 1) {
      delete this.formfiduciary.value.name1;
      delete this.formfiduciary.value.name2;
      delete this.formfiduciary.value.name3;
      delete this.formfiduciary.value.lastname1;
      delete this.formfiduciary.value.lastname2;
      delete this.formfiduciary.value.lastname3;
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
        //await this.selectRequest();
        if (this.formfiduciary.value.type == 1) {
          this.dataResponseSaveFiduciary = response;
          console.log("response save", this.dataResponseSaveFiduciary);
        } else {
          //this.formfiduciary.reset({});
          this.modalService.dismissAll();
        }
        this.toastr.success(
          "Se agrego correctamente.",
          "Información Guardada!"
        );
        //this.formfiduciary.reset({})
        this.spinner.hide();
        this.ngOnInit();
      })
      .catch((error) => {
        //console.log("asdf", error);
        this.toastr.error("Problemas con el servidor.", "Oops!");
        this.spinner.hide();
      });
  }

  async UpdateFiducaryWaranty() {
    this.spinner.show();
    //this.formfiduciary.value.request_id = this.requestIdSelected;
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
        //await this.selectRequest();
        this.modalService.dismissAll();
        this.toastr.success(
          "Se modifico correctamente.",
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

  chageTypeWarranties() {
    if (this.formfiduciary.value.type == 1) {
      this.formfiduciary.controls.businessname.enable();
      this.formfiduciary.controls.businessnit.enable();
      this.formfiduciary.controls.businessnumber.enable();
      this.formfiduciary.controls.name1.disable()
      this.formfiduciary.controls.name2.disable()
      this.formfiduciary.controls.name3.disable()
      this.formfiduciary.controls.lastname1.disable()
      this.formfiduciary.controls.lastname2.disable()
      this.formfiduciary.controls.lastname3.disable()
      this.formfiduciary.controls.DPI.disable()
      this.formfiduciary.controls.nit.disable()
    } else {
      this.formfiduciary.controls.businessname.disable();
      this.formfiduciary.controls.businessnit.disable();
      this.formfiduciary.controls.businessnumber.disable();
      this.formfiduciary.controls.name1.enable()
      this.formfiduciary.controls.name2.enable()
      this.formfiduciary.controls.name3.enable()
      this.formfiduciary.controls.lastname2.enable()
      this.formfiduciary.controls.lastname3.enable()
      this.formfiduciary.controls.lastname1.enable()
      this.formfiduciary.controls.DPI.enable()
      this.formfiduciary.controls.nit.enable()
    }
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
  onSelect(type: any, id: number) {
    if (type == "customer") {
      this.idselected = "cotainercustomer";
    } else if (type == "person") {
      this.idselected = "cotainerp" + id;
    } else if (type == "fiduciary") {
      this.idselected = "cotainerf" + id;
    }
    //console.log("cotinarer", this.idselected);
  }
  public findInvalidControls() {
    const invalid = [];
    const controls = this.formletter.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    console.log(invalid)
    return invalid;
  }
  openModalDowloandLetter(targetModal, type, data) {
    debugger
    this.formletter.reset({})
    console.log('ESTA ES LA DATA')
    console.log(data);
    console.log(type)
    this.dataUpdateDownload = data;
    this.typeUpdateDownload = type;
    debugger
    if (type == "representante") {
      // person
      this.formletter.controls["showBusinessName"].disable();
      this.formletter.controls["businessname"].disable();
      this.formletter.controls["nit"].enable();
      this.formletter.controls["businessnit"].disable();
      this.formletter.controls['representative'].disable();
      this.formletter.patchValue({
        first_name: data.first_name,
        last_name: data.last_name,
        name2: data.name2,
        name3: data.name3,
        lastname2: data.lastname2,
        lastname3: data.lastname3,
        DPI: data.DPI,
        //businessname: this.customer.businessname,
        nit: data.nit,
      });
      if (
        data.first_name == "Nombre Representante" &&
        data.DPI == "1234567891234",
        this.warningLetter = true
      ) {
        this.warningLetter = false;
      }
    } else if (type == "cliente") {
      this.createRepresentativeArray()
      if (this.uploadDocumentsUserRecord.type == 0) {
        // Para cliente individual
        this.formletter.controls["businessnit"].disable();
        this.formletter.controls['showBusinessName'].disable();
        this.formletter.controls["businessname"].disable();
        this.formletter.controls["nit"].enable();
        this.formletter.controls['representative'].enable();
        this.createRepresentativeArray()
        console.log('Cliente Individual');

        this.formletter.patchValue({
          first_name: this.customer.name1,
          name2: this.customer.name2,
          name3: this.customer.name3,
          last_name: this.customer.lastname1,
          lastname2: this.customer.lastname2,
          lastname3: this.customer.lastname3,
          DPI: this.customer.DPI,
          // nit: this.customer.nit,
          branchoffice: this.customer.branchoffice,
          branchofficecode: this.customer.branchofficecode,
          phone: this.customer.phone,
          address1: this.customer.address1,
          address2: this.customer.address2,
          amount_interests: this.customer.amount_interests,
          currency: this.customer.currency,
          department: this.customer.department,
          municipality: this.customer.municipality,
          country: this.customer.country
        });
      } else if (this.uploadDocumentsUserRecord.type == 1) {
        // Para cliente juridico
        this.formletter.controls["businessnit"].disable();
        this.formletter.controls['showBusinessName'].enable();
        this.formletter.controls["businessname"].enable();
        this.formletter.controls["nit"].enable();
        this.formletter.controls['representative'].enable();
        console.log('Cliente Jurídico');
        this.formletter.patchValue({
          businessname: this.customer.businessname,
          // first_name: this.customer.name1,
          // name2: this.customer.name2,
          // name3: this.customer.name3,
          // last_name: this.customer.lastname1,
          // lastname2: this.customer.lastname2,
          // lastname3: this.customer.lastname3,
          DPI: this.customer.DPI,
          //nit: this.customer.nit,
          branchoffice: this.customer.branchoffice,
          branchofficecode: this.customer.branchofficecode,
          phone: this.customer.phone,
          address1: this.customer.address1,
          address2: this.customer.address2,
          amount_interests: this.customer.amount_interests,
          currency: this.customer.currency,
          department: this.customer.department,
          municipality: this.customer.municipality,
          country: this.customer.country
        });
      }
    } else if (type == "fiduciario") {

      this.formletter.controls['showBusinessName'].disable();
      this.formletter.controls['representative'].disable();
      //IDENTIFICAR SI ES UN AVAL O UNICAMENTE UN FIDUCIARIO

      if (data.type == 1) {
        this.formletter.controls["businessname"].enable();
        this.formletter.controls["nit"].enable();
        this.formletter.controls["businessnit"].disable();
        this.formletter.controls['representative'].enable();
        this.formletter.patchValue({
          first_name: data.name1,
          name2: this.customer.name2,
          name3: this.customer.name3,
          last_name: data.lastname1,
          lastname2: this.customer.lastname2,
          lastname3: this.customer.lastname3,
          DPI: data.DPI,
          businessname: this.customer.businessname,
          nit: this.customer.nit,
        });
      } else if (data.type == 0 || data.type == 3||data.type==2) {
        this.formletter.controls["nit"].enable();
        this.formletter.controls["businessname"].disable();
        this.formletter.controls["businessnit"].disable();
        this.formletter.controls['representative'].disable();
        //this.formletter.controls["nit"].disable();

        this.formletter.patchValue({
          first_name: data.name1,
          name2: data.name2,
          name3: data.name3,
          lastname2: data.lastname2,
          lastname3: data.lastname3,
          last_name: data.lastname1,
          DPI: data.DPI,
          nit: data.nit,
        });
        if (
          data.name == "Nombre de socio" &&
          data.DPI == "1234567891234",
          this.warningLetter = true
        ) {
          this.warningLetter = false;
        }
      } else if (data.type == 2) {
        //AVAL JURIDICO 
        //VAL DE UN AVAL JURIDICO
        this.formletter.controls["nit"].disable();
        this.formletter.controls["businessnit"].enable();

        this.formletter.patchValue({
          first_name: data.name1,
          name2: data.name2,
          name3: data.name3,
          lastname2: data.lastname2,
          lastname3: data.lastname3,
          last_name: data.lastname1,
          DPI: data.DPI,
          businessname: data.businessname,
          businessnit: data.businessnit,
        });
        if (
          data.name == "Nombre de representante" &&
          data.DPI == "1234567891234",
          this.warningLetter = true
        ) {
          this.warningLetter = false;
        }
      }
    } else if (type == 'avalJuridico') {
      this.formletter.controls['showBusinessName'].enable();
      this.formletter.controls["businessname"].enable();
      this.formletter.controls["businessnit"].disable();
      this.formletter.controls['representative'].enable();

      this.representativeArray = this.getChilds(this.dataFiduciary, data.id_fiduciary).map((item, i) => (
        {
          value: i,
          text: item.name,
          first_name: item.name1,
          name2: item.name2,
          name3: item.name3,
          last_name: item.lastname1,
          lastname2: item.lastname2,
          lastname3: item.lastname3,
          id_fiduciary: item.id_fiduciary,
          DPI: item.DPI
        }
      ))
      if (data.type == 1) {
        this.formletter.controls["nit"].enable();
        this.formletter.controls["businessnit"].disable();

        this.formletter.patchValue({
          name: data.name,
          DPI: data.DPI,
          businessname: data.businessname,
          nit: data.businessnit,
        });
      } else if (data.type == 0 || data.type == 3) {
        this.formletter.controls["nit"].enable();
        this.formletter.controls["businessnit"].disable();
        this.formletter.patchValue({
          first_name: this.customer.name1,
          name2: this.customer.name2,
          name3: this.customer.name3,
          last_name: this.customer.lastname1,
          lastname2: this.customer.lastname2,
          lastname3: this.customer.lastname3,
          DPI: data.DPI,
          nit: data.nit,
        });
        if (
          data.name == "Nombre de socio" &&
          data.DPI == "1234567891234",
          this.warningLetter = true
        ) {
          this.warningLetter = false;
        }
      } else if (data.type == 2) {
        this.formletter.controls["businessnit"].enable();
        this.formletter.controls["nit"].disable();
        this.formletter.patchValue({
          name: data.name,
          DPI: data.DPI,
          businessname: data.businessname,
          nit: data.businessnit,
        });
        if (
          data.name == "Nombre de representante" &&
          data.DPI == "1234567891234",
          this.warningLetter = true
        ) {
          this.warningLetter = false;
        }
      }
    }
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: "static",
      keyboard: false,
      //size: "xl",
      windowClass: 'my-modal'
    });
  }
  allDocumentsAreCorrect() {
    //Los de la empresa
    debugger
    if (this.initialRelation.DPI_key != null && this.initialRelation.letter_of_consent_key != null) {
      //Los de los representantes
      let representative = true;
      console.log(this.persons)
      let docs_missing = this.persons.find((item) => (
        item.letter_of_consent_key == null || item.DPI_key == null
      ))
      representative = docs_missing != null ? false : true;
      let members = true;
      let docs_members_missing = this.getChilds(this.dataFiduciary, null).find((item) => (
        item.DPI_key == null || item.letter_of_consent_key == null
      ))
      members = docs_members_missing != null ? false : true;
      let members_of_members = true;
      this.getChilds(this.dataFiduciary, null).forEach((fiduciary) => {
        let docs = this.getChilds(this.dataFiduciary, fiduciary.id_fiduciary).find((item) => (
          item.DPI_key == null || item.letter_of_consent_key == null
        ))
        if (docs) {
          members_of_members = false
        }
      })
      return representative && members_of_members && members
    }
    return false
  }
  async DowloadLetterform() {
    //this.dataUpdateDownload = data;
    console.log('este es el tipo ->')
    console.log(this.typeUpdateDownload);
    console.log(this.dataUpdateDownload)
    //Confirmar descarga
    let check = await this.confirmAlertService.confirmDownloadLetterData()


    if (check.confirmed) {
      this.spinner.show();
      if (this.typeUpdateDownload == "fiduciario") {
        //TENEMOS QUE IDENTIFICAR SI ES UN FIDUCIARO NORMAL O CORRESPONDE A UN AVAL JURIDICO
        /**
         * REGLAS 
         * 2---- REPRESENTANTE LEGAL DE UN AVAL JURIDICO
         * */
        let form = { ...this.formletter.value };
        if (this.dataUpdateDownload.type == 2 || this.dataUpdateDownload.type == 0 || this.dataUpdateDownload.type == 3) {
          form.name1 = this.formletter.controls['first_name'].value
          form.name2 = this.formletter.controls['name2'].value
          form.name3 = this.formletter.controls['name3'].value
          form.lastname2 = this.formletter.controls['lastname2'].value
          form.lastname3 = this.formletter.controls['lastname3'].value
          form.lastname1 = this.formletter.controls['last_name'].value
        }
        await this.mysqlService
          .UpdateFiducaryWarrantyCustomer(
            form,
            this.dataUpdateDownload.id_fiduciary
          )
          .toPromise()
          .then(async (response) => {
            console.log(response);
            this.modalService.dismissAll();
            this.toastr.success(
              "Se modifico correctamente.",
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
      } else if (this.typeUpdateDownload == 'avalJuridico') {
        let form = { ...this.formletter.value };
        // form['name'] = form['businessname'];
        form['businessnit'] = form['nit'];
        form.name1 = this.formletter.controls['first_name'].value
        form.name2 = this.formletter.controls['name2'].value
        form.name3 = this.formletter.controls['name3'].value
        form.lastname2 = this.formletter.controls['lastname2'].value
        form.lastname3 = this.formletter.controls['lastname3'].value
        form.lastname1 = this.formletter.controls['last_name'].value

        // return true;

        await this.mysqlService
          .UpdateFiducaryWarrantyCustomer(
            form,
            this.dataUpdateDownload.id_fiduciary
          )
          .toPromise()
          .then(async (response) => {
            this.modalService.dismissAll();
            this.toastr.success(
              "Se modifico correctamente.",
              "Información Guardada!"
            );
            //MODIFICAR EL AVAL SELECCIONADO
            let index = this.formletter.controls['representative'].value;
            const person = this.representativeArray[index];
            await this.mysqlService
              .UpdateFiducaryWarrantyCustomer(
                form,
                person.id_fiduciary
              )
              .toPromise()
              .catch((error) => {
                //console.log("asdf", error);
                this.toastr.error("Problemas con el servidor.", "Oops!");
                this.spinner.hide();
              });
            // update businessname of childs
            for (let i = 0; i < this.dataFiduciary.length; i++) {
              const element = this.dataFiduciary[i];
              if (element.id_father == this.dataUpdateDownload.id_fiduciary) {
                console.log('se editara child', element);

                await this.mysqlService
                  .UpdateFiducaryWarrantyCustomer(
                    { businessname: form['businessname'] },
                    element.id_fiduciary
                  )
                  .toPromise()
                  .then(async (response) => {
                    console.log(response);
                    this.modalService.dismissAll();
                    // this.toastr.success(
                    //   "Se modifico correctamente.",
                    //   "Información Guardada!"
                    // );
                    // this.spinner.hide();
                    // this.ngOnInit();
                  })
                  .catch((error) => {
                    // this.toastr.error("Problemas con el servidor.", "Oops!");
                    this.spinner.hide();
                  });
              }
            }

            this.spinner.hide();
            this.ngOnInit();
          })
          .catch((error) => {
            console.log("asdf", error);
            this.toastr.error("Problemas con el servidor.", "Oops!");
            this.spinner.hide();
          });
      } else if (this.typeUpdateDownload == 'cliente') {
        //Al modificar el cliente se debe de actualizar los datos del representantes
        //Estos cambian cuando el cliente tiene nombre de la empresa
        let form = {
          ...this.formletter.value
        }
        form.name1 = this.formletter.controls['first_name'].value
        form.name2 = this.formletter.controls['name2'].value
        form.name3 = this.formletter.controls['name3'].value
        form.lastname2 = this.formletter.controls['lastname2'].value
        form.lastname3 = this.formletter.controls['lastname3'].value
        form.lastname1 = this.formletter.controls['last_name'].value
        console.log('ESTE ES EL FORMULARIOS');
        console.log(form)
        await this.mysqlService
          .UpdateCustomer(
            form,
            this.dataUpdateDownload.customer_id
          )
          .toPromise()
          .then(async (response) => {
            if (!this.formletter.controls['showBusinessName'].disabled) {
              //Actualizar el nombre
              this.sidebarName.name$.emit(this.formletter.controls['businessname'].value);
              console.log('actualizando nombre')
              //Actualizar representante
              let index = this.formletter.controls['representative'].value;
              const person = this.persons[index];
              console.log(person)
              await this.mysqlService
                .UpdatePerson(
                  this.formletter.value,
                  person.person_id,
                )
                .toPromise()
                .catch((error) => {
                  this.toastr.error("Problemas con el servidor.", "Oops!");
                  //this.spinner.hide();
                });
              console.log('PERSONA ACTUALIZADA')
            }
            this.modalService.dismissAll();
            this.toastr.success(
              "Se modifico correctamente.",
              "Información Guardada!"
            );
            this.spinner.hide();
            this.ngOnInit();
          })
          .catch((error) => {
            this.toastr.error("Problemas con el servidor.", "Oops!");
            this.spinner.hide();
          });
      } else if (this.typeUpdateDownload == 'representante') {
        console.log('el socio se actualizara', this.dataUpdateDownload);
        await this.mysqlService
          .UpdatePerson(
            this.formletter.value,
            this.dataUpdateDownload.person_id
          )
          .toPromise()
          .then(async (response) => {
            this.modalService.dismissAll();
            this.toastr.success(
              "Se modifico correctamente.",
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




      let nit = this.formletter.value.nit ? this.formletter.value.nit : this.formletter.value.businessnit

      let downloadIndividual = this.formletter.value.businessname == null || this.formletter.value.businessname == "";

      if (this.uploadDocumentsUserData.type == 'client') {
        downloadIndividual = this.uploadDocumentsUserData.client_type == 0
      }
      let name = ''
      let name1: string = this.formletter.value.first_name;
      let name2: string = this.formletter.value.name2;
      let name3: string = this.formletter.value.name3;
      let lastName1 = this.formletter.value.last_name;
      let lastName2 = this.formletter.value.lastname2;
      let lastName3 = this.formletter.value.lastname3;
      name = name1.trim()
      name += name2 != '' ? ` ${name2.trim()}` : ''
      name += name3 != '' ? ` ${name3.trim()}` : ''
      name += ` ${lastName1.trim()}`
      name += lastName2 != '' ? ` ${lastName2.trim()}` : ''
      name += lastName3 != '' ? ` ${lastName3.trim()}` : ''

      if (downloadIndividual) {
        this.downloadLetter(name, this.formletter.value.DPI, nit, 'individual')
        // window.open(
        //   `${this.url_letter}?type=individual&name=${name}&dpi=${this.formletter.value.DPI}&nit=${nit}`,
        //   "_blank"
        // );
      } else {
        this.downloadLetter(name, this.formletter.value.DPI, nit, 'juridico', this.formletter.value.businessname, this.dataUpdateDownload.nit);
        // window.open(
        //   `${this.url_letter}?type=juridico&name=${name}&dpi=${this.formletter.value.DPI}&bussines=${this.formletter.value.businessname}&nit=${nit}`,
        //   "_blank"
        // );
      }
    }
    //
  }
  private downloadLetter(name: string, dpi: string, nit: string, type: string, business?: string, business_nit?: string) {
    let url = `${this.url_letter}?type=${type}&name=${name}&dpi=${dpi}&nit=${nit}`
    if (business) {
      url += `&bussines=${business}&business_nit=${business_nit}`
    }
    this.http.get(url, { responseType: "blob" as "json" }).subscribe((response: any) => {
      let dataType = response.type;
      let binaryData = [];
      binaryData.push(response);
      let downloadLink = document.createElement("a");
      downloadLink.href = window.URL.createObjectURL(
        new Blob(binaryData, { type: dataType })
      );
      downloadLink.setAttribute("download", "carta-consentimiento.pdf");
      document.body.appendChild(downloadLink);
      downloadLink.click();
    })
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
    this.formfiduciary.value.lastname3 = this.FormUpdateJuridicoMembers.controls.lastname3.value;
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
          "Se elimino correcatamente",
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

  actionEditDocuments(user, type = 'client') {
    console.log("PERSONA")
    console.log(user)
    function getClientName(user) {
      if (user.type == 0) {
        return user.name;
      } else if (user.type == 1) {
        return user.businessname;
      }
    }
    function getFiduciaryName(user) {
      if (user.type == 0) {
        return user.name;
      } else if (user.type == 1) {
        return user.businessname;
      } else if (user.type == 2 || user.type == 3) {
        return user.name;
      }
    }
    function getPersonName(user) {
      return `${user.first_name} ${user.last_name}`;
    }

    let userData;
    console.log(type);

    switch (type) {

      case 'client':
        userData = {
          name: getClientName(user),
          type: 'client',
          client_type: user.type,
          DPI_key: user.DPI_key,
          letter_of_consent_key: user.letter_of_consent_key,
          dpi_status: user.dpi_status,
          letter_of_consent_status: user.letter_of_consent_status
        }
        break;
      case 'fiduciary':
        userData = {
          name: getFiduciaryName(user),
          type: 'fiduciary',
          businessname: user.businessname,
          DPI_key: user.DPI_key,
          letter_of_consent_key: user.letter_of_consent_key,
          fiduciary_type: user.type,
          dpi_status: user.dpi_status,
          letter_of_consent_status: user.letter_of_consent_status
        }
        break;
      case 'person':
        userData = {
          name: getPersonName(user),
          type: 'person',
          DPI_key: user.DPI_key,
          letter_of_consent_key: user.letter_of_consent_key,
          dpi_status: user.dpi_status,
          letter_of_consent_status: user.letter_of_consent_status
        }
        break;
      default:
        break;
    }

    this.uploadDocumentsUserData = userData;
    this.uploadDocumentsUserRecord = user;

    console.log(this.uploadDocumentsUserRecord);

    this.showSettings = !this.showSettings;

  }

  public config: PerfectScrollbarConfigInterface = {};

  tabStatus = 'justified';

  public isCollapsed = false;

  public innerWidth: any;
  public defaultSidebar: any;
  public showSettings = false;
  public showMobileMenu = false;
  public expandLogo = false;

  options = {
    theme: 'light', // two possible values: light, dark
    dir: 'ltr', // two possible values: ltr, rtl
    layout: 'horizontal', // fixed value. shouldn't be changed.
    sidebartype: 'full', // four possible values: full, iconbar, overlay, mini-sidebar
    sidebarpos: 'absolute', // two possible values: fixed, absolute
    headerpos: 'absolute', // two possible values: fixed, absolute
    boxed: 'boxed', // two possible values: full, boxed
    navbarbg: 'skin1', // six possible values: skin(1/2/3/4/5/6)
    sidebarbg: 'skin6', // six possible values: skin(1/2/3/4/5/6)
  };

  Logo() {
    this.expandLogo = !this.expandLogo;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.handleSidebar();
  }

  handleSidebar() {
    this.innerWidth = window.innerWidth;
    switch (this.defaultSidebar) {
      case 'full':
      case 'iconbar':
        if (this.innerWidth < 1170) {
          this.options.sidebartype = 'mini-sidebar';
        } else {
          this.options.sidebartype = this.defaultSidebar;
        }
        break;

      case 'overlay':
        if (this.innerWidth < 767) {
          this.options.sidebartype = 'mini-sidebar';
        } else {
          this.options.sidebartype = this.defaultSidebar;
        }
        break;

      default:
    }
  }

  toggleSidebarType() {
    switch (this.options.sidebartype) {
      case 'full':
      case 'iconbar':
        this.options.sidebartype = 'mini-sidebar';
        break;

      case 'overlay':
        this.showMobileMenu = !this.showMobileMenu;
        break;

      case 'mini-sidebar':
        if (this.defaultSidebar === 'mini-sidebar') {
          this.options.sidebartype = 'full';
        } else {
          this.options.sidebartype = this.defaultSidebar;
        }
        break;

      default:
    }
  }

  getChilds(dataFiduciary, id_fiduciary) {
    // filtro usado para la pestaña VER REQUISITOS
    
    if (dataFiduciary) {
      return dataFiduciary.filter(s => s.id_father == id_fiduciary);
    } else {
      return []
    }
  }
  anyDeclined(data: any) {
    
    if (data.dpi_status == -1 || data.letter_of_consent_status == -1) {
      return true
    }
    return false
  }
  getErrorMessage() {

    if (this.initialRelation.status_doc_comment && this.initialRelation.status_doc === 1 &&
      (this.initialRelation.dpi_status == -1 || this.initialRelation.letter_of_consent_status == -1)
    ) {
      return this.initialRelation.status_doc_comment
    }
    for (let i = 0; i < this.persons.length; i++) {
      if (this.persons[i].dpi_status==-1||this.persons[i].letter_of_consent_status==-1) {
        return this.persons[i].status_doc_comment
      }
    }
    for (let i = 0; i < this.dataFiduciary.length; i++) {
      if (this.dataFiduciary[i].dpi_status==-1||this.dataFiduciary[i].letter_of_consent_status==-1) {
        return this.dataFiduciary[i].status_doc_comment
      }
    }
    return 'Los documentos fueron rechazados, porfavor vuelva a subir nuevos documentos.'
  }
  getShowError() {
    if (
      (this.initialRelation && this.initialRelation.status_doc === 1)

    ) {
      return true
    } else {
      this.dataFiduciary.forEach(item => {

        if (item.status_doc === 1) {
          this.statusRechazado = true
          this.statusAceptado = false
        }
      })
      return this.statusRechazado
    }
  }
}
