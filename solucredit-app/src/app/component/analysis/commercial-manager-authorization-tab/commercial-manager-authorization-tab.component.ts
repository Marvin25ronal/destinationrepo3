import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PaginationTableData } from 'src/app/interfaces/ui/pagination-table.interface';
import { Adviser } from 'src/app/models/adviser.model';
import { CommercialAnalysis } from 'src/app/models/commercialanalysis.model';
import { ConditionSheet } from 'src/app/models/conditionSheet.model';
import { FormDocVW } from 'src/app/models/formdocvw.model';
import { InitialRelationDocVW } from 'src/app/models/initialrelationvw.model';
import { RequirementDocVW } from 'src/app/models/requirementdocvw.model';
import { RolService } from 'src/app/pages/rol/services/rol.service';
import { AnalysisService } from 'src/app/services/analysis/analysis.service';
import { CommercialManagerAuthorizationService } from 'src/app/services/analysis/commercial-manager-authorization.service';
import { CommercialanalysisService } from 'src/app/services/analysis/commercialanalysis.service';
import { ConditionSheetService } from 'src/app/services/analysis/condition-sheet.service';
import { FormdocvwService } from 'src/app/services/analysis/formdocvw.service';
import { InitialrelationdocvwService } from 'src/app/services/analysis/initialrelationdocvw.service';
import { ManagementActService } from 'src/app/services/analysis/management-act.service';
import { RequirementdocvwService } from 'src/app/services/analysis/requirementdocvw.service';
import { FilenameService } from 'src/app/services/data/filename.service';
import { ExcelService } from 'src/app/services/excel/excel.service';
import { MysqlService } from 'src/app/services/mysql/mysql.service';
import { Analysis, AnalysisOption } from 'src/Utils/constants';

@Component({
  selector: 'app-commercial-manager-authorization-tab',
  templateUrl: './commercial-manager-authorization-tab.component.html',
  styleUrls: ['./commercial-manager-authorization-tab.component.scss']
})
export class CommercialManagerAuthorizationTabComponent implements OnInit {
  //Variables
  analysis_option = AnalysisOption
  initCommercialManagerAuthorization = false;
  commercialManagerAuthorizationSelected: CommercialAnalysis
  arraymodals = []
  commercial_manager_authorization_docs_valid = 0;
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
  dataChecklistAnalysis: PaginationTableData = {
    metadata: [
      "Documento",
      "Verificado",
      "Observación",
      "Acciones",
    ],
    data: []
  }
  arrayCheckedReports = [
    {
      key: 'Cumplimiento',
      value: false
    },
    {
      key: 'Legal',
      value: false
    },
    {
      key: 'Comercial',
      value: false
    },
    {
      key: 'Autorización Gerente Comercial',
      value: false
    },
    {
      key: 'Autorización Gerente General',
      value: false
    }
  ]
  commercialManagerAuthorizationList: PaginationTableData = {
    data: [],
    metadata: [
      'Documento',
      'Nombre',
      'Acciones',
    ]
  }
  updateComercialManagerAuthorizationForm = new FormGroup({
    comment: new FormControl("", [Validators.required]),
    valid_documents: new FormControl("", [Validators.required])
  })
  updateLegalAnalysisForm = new FormGroup({
    comment: new FormControl("", [Validators.required]),
    valid_documents: new FormControl("", [Validators.required])
  })
  FormUploadDocumentsCA = new FormGroup({
    uploaddocsca_comment: new FormControl("", [Validators.required]),
  });
  // ENTRADAS Y SALIDAS


  @Input()
  showDeedButton?: boolean = false

  @Input()
  pageCommercialManagerAuthorization: number = 0

  @Input()
  dataCustomer

  @Input()
  lastRequest

  @Input()
  requestIdSelected = -1

  @Input()
  requestAvalsInfo


  @Input()
  groupSubjectList: any



  @Output()
  addLastView?= new EventEmitter<any>()

  @Output()
  returnview?= new EventEmitter<any>()

  @Output()
  changeAnalysis?= new EventEmitter<Analysis>()

  @Output()
  changeLegalPage?= new EventEmitter<number>()

  @Output()
  changeCommercialPage?= new EventEmitter<number>()

  @Output()
  changeComplianceVerification?= new EventEmitter<number>()

  @Output()
  changeCommercialAnalysis?= new EventEmitter<number>()

  @Output()
  downloadDocuments?= new EventEmitter<any>()

  @Output()
  showDocuments?= new EventEmitter<any>()

  @Output()
  changePage?= new EventEmitter<number>()
  almacenaIR: any;
  almacenaReq: any;

  reportlist = [
    'Legal',
    'Cumplimiento',
    'Comercial'
  ]
  conditionSheet:ConditionSheet;
  constructor(
    private _commercialManagerAuthorization: CommercialManagerAuthorizationService,
    private _RolServise: RolService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private _managementActService: ManagementActService,
    private filenameS: FilenameService,
    private mysqlService: MysqlService,
    private _CASevice: CommercialanalysisService,
    private _excelService: ExcelService,
    private _IRDocService: InitialrelationdocvwService,
    private _ReqDocService: RequirementdocvwService,
    private _FormDocService: FormdocvwService,
    private _analysis: AnalysisService,
    private _conditionSheetService: ConditionSheetService
  ) { }

  async ngOnInit() {
    this.spinner.show();
    await this.listAllReports();
    await this.getIRDocView()
    await this.getInitCommercialManagerAuthorization()
    await this.getReqDocView()
    await this.getFormDocView()
    await this.getConditionSheet()
    this.spinner.hide();

    console.log(this.groupSubjectList)
  }

  filterShowDocumentsCommercialManagerAuthorization() {
    let array2 = ['Autorización Gerente Comercial', 'Autorización Gerente General']
    let filter = this.commercial_manager_authorization_dataList.data.filter((item) => !array2.includes(item.uploaddocsca_comment.toString()))
    return filter
  }

  async listAllReports() {
    const res = this._analysis.listAllreports(this.requestIdSelected).toPromise().then((response) => {
      console.log(response)
      this.commercial_manager_authorization_dataList.data = response.filter(item => this.reportlist.includes(item.uploaddocsca_comment))
    })
    return res
  }
  getValueChecklist(name: string) {
    let find = this.arrayCheckedReports.find(item => item.key == name)
    if (find)
      return find.value
  }
  openReportCommercialManagerAuthorization(target) {
    this.addLastView.emit({ target: 'Gerente Comercial', page: this.pageCommercialManagerAuthorization })
    switch (target) {
      case 'Legal':
        this.changeAnalysis.emit(Analysis.legal_analysis)
        this.changeLegalPage.emit(2)
        break
      case 'Cumplimiento':
        this.changeAnalysis.emit(Analysis.compliance_verification)
        this.changeComplianceVerification.emit(2)
        break
      case 'Comercial':
        this.changeAnalysis.emit(Analysis.commercial_assistant_analysis)
        //this.changeCommercialAnalysis.emit(2)
        this.changeCommercialPage.emit(2)
        //TODO: AGREGAR A LA PARTE DE FERNANDO
        // this.pageCommercialAnalysis = 1
        break
    }
  }
  //Verificar si la hoja de condiciones existe
  async getConditionSheet() {
    debugger
    if (!this.commercialManagerAuthorizationSelected)
      return
    const res = await this._conditionSheetService.getConditionSheet(this.commercialManagerAuthorizationSelected.id_commercialanalysis).toPromise().then((response) => {
      if (response && response != null) {
        this.conditionSheet = response
      }
    }
    )
    return res
  }
  downloadDocument(doc) {
    this.downloadDocuments.emit(doc)
  }
  showDocument(doc) {
    this.showDocuments.emit(doc)
  }
  downloadAllReports() {
    try {
      this._commercialManagerAuthorization.getAllReports(this.requestIdSelected)
      this.toastr.success('Se han descargado todos los informes', 'Éxito')
    }
    catch (error) {
      console.log(error);
    }
  }
  changeView(input) {
    this.changePage.emit(input)
  }
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
  async saveVerificationsDocsCommercialManagerAuthorizationForm() {
    let data = this.updateComercialManagerAuthorizationForm.value
    if (this.initCommercialManagerAuthorization == true) {
      //Existe una no tenemos que crearla
      let sub = this._commercialManagerAuthorization.updateAnalysis(this.commercialManagerAuthorizationSelected.id_commercialanalysis, data.comment, data.valid_documents).toPromise().then(
        (response) => {
          this.commercialManagerAuthorizationSelected = response
          this.toastr.success('Análisis Actualizado', 'Éxito')
        }
      ).catch((err) => {
        this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
      })
      return sub
    } else {
      //Creamos una nueva
      let reg: CommercialAnalysis = {
        id_request: this.requestIdSelected,
        id_customer: this.dataCustomer.customer_id,
        commercialanalysis_comment: data.comment,
        valid_documents: data.valid_documents
      }
      let sub = this._commercialManagerAuthorization.initAnalysis(reg).toPromise().then(
        (resp) => {
          this.toastr.success('Éxito', 'Se ha iniciado una nueva Autorización Gerencia Comercial')
          this.initCommercialManagerAuthorization = true
          this.getAllCommercialManagerAuthorizationInfo()
          //Crear acta
          let s = this._managementActService.init(resp.id_commercialanalysis, this.dataCustomer.customer_id).toPromise().then(
            async (response) => {
              console.log('Se ha creado el Acta');
              console.log(response);
            }
          )

        }
      ).catch((err) => {
        this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
      })
      return sub
    }
  }
  getInitCommercialManagerAuthorization() {
    // debugger
    this._commercialManagerAuthorization.getInit(this.requestIdSelected).toPromise().then(
      (response) => {
        this.initCommercialManagerAuthorization = response
        if (response == true) {
          this.getAllCommercialManagerAuthorizationInfo()
        
        }
      }

    ).catch((err) => {
      this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
    })
  }
  async getAllCommercialManagerAuthorizationInfo() {
    await this.listAllReports()
    console.log('Esto se está ejecutando');
    await this.getCommercialManagerAuthorization()
  }
  async getCommercialManagerAuthorization() {
    const res = this._commercialManagerAuthorization.getAnalysis(this.requestIdSelected).toPromise().then(
      (response) => {
        console.log(response);
        //debugger
        //debugger
        this.commercialManagerAuthorizationSelected = response
        this.commercial_manager_authorization_docs_valid = +response.valid_documents
        this.updateComercialManagerAuthorizationForm.controls['comment'].setValue(response.commercialanalysis_comment)
        this.getAllDocumentsComercialManagerAuthorization()
        this.getConditionSheet()
      }
    )
    return res
  }
  async getAllDocumentsComercialManagerAuthorization() {
    let sub = this._commercialManagerAuthorization.listDocuments(this.commercialManagerAuthorizationSelected.id_commercialanalysis).toPromise().then(
      (response) => {
        this.commercialManagerAuthorizationList.data = response
      }
    ).catch((err) => {
      this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
    })
    return sub
  }
  changeVerificationsDocsLegalAnalysis(event) {
    console.log(event)
    this.updateLegalAnalysisForm.controls['valid_documents'].setValue(event)
  }
  openModalUploadlCommercialManagerAuthorization(targetModal) {
    this.FormUploadDocumentsCA.reset({});
    this.openModal(targetModal)
  }
  async uploadDocsCA(event, nspinner) {

    if (event.target.files && event.target.files[0]) {
      const named = this.filenameS.generateName() + "_" + event.target.files[0].name;
      const typed = event.target.files[0].type;
      var reader = new FileReader();
      reader.onload = async (event: any) => {
        let data =
        {
          document: event.target.result,
          namedoc: named,
          type: typed,
          id_commercialanalisys: this.commercialManagerAuthorizationSelected.id_commercialanalysis,
          comment: this.FormUploadDocumentsCA.get('uploaddocsca_comment').value
        };
        this.spinner.show(nspinner);

        this.mysqlService
          .uploadDocsCA(data)
          .pipe(
            map((data) => {
              console.log('Documento Subido');
              this.toastr.success('Éxito', 'Se ha agregado el documento correctamente.');
              console.log(data.data);
              this.FormUploadDocumentsCA.reset();
              this.spinner.hide(nspinner);
              this.closeBtnClick();
              //this.ngOnInit();
              this.getAllCommercialManagerAuthorizationInfo()
            }),
            catchError((err) => {
              this.toastr.error(
                'Error',
                'Ha ocurrido un problema con la conexión ' + err
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
  closeBtnClick() {
    console.log('Se va a cerrar el modal');
    if (this.arraymodals.length > 0)
      this.arraymodals.pop().close()
    else
      this.modalService.dismissAll()
  }
  deleteDocCA(doc) {
    this.mysqlService
      .deleteDocsCA(doc.id_uploaddocsca)
      .toPromise()
      .then(async (response) => {
        this.toastr.success("Se ha eliminado el Documento", "Documento Eliminado!")
        // this.ngOnInit();

        this.getAllCommercialManagerAuthorizationInfo()

      })
      .catch((error) => {
        this.toastr.error("Problemas con el servidor.", "Ha ocurrido un error")
        console.log(error)
      })
  }
  openReport() {
    let data = this.pageCommercialManagerAuthorization
    this.addLastView.emit({ target: 'Gerente Comercial', page: data })
    this.changePage.emit(2)
  }
  openDeedDocument() {
    this.addLastView.emit({ target: 'Gerente Comercial', page: this.pageCommercialManagerAuthorization })
    this.changePage.emit(4)
  }

  returnVIEW() {
    this.returnview.emit()
    this.ngOnInit()
  }
  openReportChecklist() {
    let data = this.pageCommercialManagerAuthorization
    this.addLastView.emit({ target: 'Gerente Comercial', page: data })
    this.changePage.emit(3)
  }
  downloadConditionSheet() {
    this.toastr.success('Éxito', 'Se han descargado los documentos')
    this._excelService.downloadExcel(this.commercialManagerAuthorizationSelected.id_commercialanalysis)
  }
  downloadDocIR() {
    this.almacenaIR = this.actualIRDoc.map(e => { return { key: e.s3key, document_name: e.filename } })
    console.log(this.almacenaIR)
    this.mysqlService
      .downloadDocIR(this.dataCustomer.customer_id,this.requestIdSelected)
    this.toastr.success('Éxito', 'Se han descargado los documentos')
  }
  actualIRDoc: any;
  DataIRDocs: InitialRelationDocVW;
  dataRequestIRView: InitialRelationDocVW;
  async getIRDocView() {
    this._IRDocService.getDocs(this.requestIdSelected, 'Cumplimiento').subscribe((c) => {
      this.DataIRDocs = c
      this.dataRequestIRView = this.DataIRDocs
      console.log('MANDANDO DOCUMENTOS DE INICIO DE RELACION');
      console.log(this.dataRequestIRView);
      if (this.dataCustomer)
        this.actualIRDoc = this.dataRequestIRView
      console.log('ActualIRDOC');
      console.log(this.actualIRDoc);
    })
  }
  actualReqDoc: any;
  downloadDocRequirements() {
    this.almacenaReq = this.actualReqDoc.map(e => { return { key: e.s3key, document_name: e.filename } })
    console.log(this.almacenaReq)
    this.mysqlService
      .downloadDocReq(this.dataCustomer.customer_id,this.requestIdSelected)
    this.toastr.success('Éxito', 'Se han descargado los documentos')
  }
  DataReqDocs: RequirementDocVW;
  ataRequestDocView: RequirementDocVW;
  dataRequestDocView: RequirementDocVW;
  async getReqDocView() {
    try {
      this._ReqDocService.getDocs(this.requestIdSelected).subscribe((c) => {
        this.DataReqDocs = c
        this.dataRequestDocView = this.DataReqDocs
        console.log('Mandando Documentos Requisitos');
        console.log(this.dataRequestDocView);
        if (this.dataCustomer)
          this.actualReqDoc = this.dataRequestDocView
      })
    }
    catch (err) {
      console.log(err)
      this.toastr.error("No existen Formularios")
      throw err
    }
  }
  almacenaDocs: any;
  actualFormDoc: any;
  downloadDocForms() {
   // this.almacenaDocs = this.actualFormDoc.map(e => { return { key: e.s3key, document_name: e.filename } })
    this.mysqlService
      .downloadDocForm(this.dataCustomer.customer_id,this.requestIdSelected)
    this.toastr.success('Éxito', 'Se han descargado los documentos')
  }
  DataFormDocs: FormDocVW;
  dataRequestFormView: FormDocVW;
  async getFormDocView() {
    try {
      debugger
      console.log('Ejecutando Form');
      this._FormDocService.getDocs(this.requestIdSelected, 'Autorización Gerente Comercial').subscribe((c) => {
        this.DataFormDocs = c
        this.dataRequestFormView = this.DataFormDocs
        console.log('Mandando documentos de Formularios');
        console.log(this.dataRequestFormView)
        if (this.dataCustomer)
          this.actualFormDoc = this.dataRequestFormView
        console.log('Filtro de Documentos Formularios');
        console.log(this.actualFormDoc);
      })
    }
    catch (err) {
      this.toastr.error("No existen Formularios")
      console.log(err)
      throw err
    }
  }
  loadingcomponent = false
  changeLoading() {
    this.loadingcomponent = true
  }
}
