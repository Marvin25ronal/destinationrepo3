import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PaginationTableData } from 'src/app/interfaces/ui/pagination-table.interface';
import { Adviser, AdviserAnalysis } from 'src/app/models/adviser.model';
import { CheckListCommercialAnalysis } from 'src/app/models/checklistcommercialanalysis.model';
import { CommercialAnalysis } from 'src/app/models/commercialanalysis.model';
import { FormDocVW } from 'src/app/models/formdocvw.model';
import { InitialRelationDocVW } from 'src/app/models/initialrelationvw.model';
import { RequirementDocVW } from 'src/app/models/requirementdocvw.model';

import { ChecklistcommercialanalysisService } from 'src/app/services/analysis/checklistcommercialanalysis.service';
import { ComplianceCheckListItem, ComplianceVerificationService } from 'src/app/services/analysis/compliance-verification.service';
import { FormdocvwService } from 'src/app/services/analysis/formdocvw.service';
import { InitialrelationdocvwService } from 'src/app/services/analysis/initialrelationdocvw.service';
import { LegalAnalysisService } from 'src/app/services/analysis/legal-analysis.service';
import { RequirementdocvwService } from 'src/app/services/analysis/requirementdocvw.service';
import { VerificationdocvwService } from 'src/app/services/analysis/verificationdocsvw.service';
import { FilenameService } from 'src/app/services/data/filename.service';
import { AdviserService } from 'src/app/services/Maintenance/adviser.service';
import { MysqlService } from 'src/app/services/mysql/mysql.service';
import { Analysis, AnalysisOption } from 'src/Utils/constants';

@Component({
  selector: 'app-compliance-verification-tab',
  templateUrl: './compliance-verification-tab.component.html',
  styleUrls: ['./compliance-verification-tab.component.scss']
})
export class ComplianceVerificationTabComponent implements OnInit {
  //Variables
  analysis_option = AnalysisOption
  checkListType;
  showMoveToForm: boolean = false
  showMoveToAssigment: boolean = false
  initComplianceVerification = false;
  complianceVerificationSelected: CommercialAnalysis;
  compliance_verification_docs_valid: number = 0;
  onuListComplianceVerification: any[]
  responsibleComplianceAnalysis: Adviser;
  listcomplianceverificationadviser: Adviser[] = []
  almacenaIR;
  selectedOnuList: any;
  actualIRDoc: any = [];
  DataIRDocs: InitialRelationDocVW;
  arraymodals = []
  almacenaReq: any;
  dataRequestIRView: InitialRelationDocVW;
  actualReqDoc: any;
  almacenaDocs: any;
  DataFormDocs: FormDocVW;
  actualFormDoc: any;
  dataRequestFormView: FormDocVW;
  DataReqDocs: RequirementDocVW;
  dataRequestDocView: RequirementDocVW;
  FormCheckListRD = new FormGroup({
    checklist_comment: new FormControl("", [Validators.required]),
  });
  dataDoc;
  initComplianceVerificationForm = new FormGroup(
    {
      id_adviser: new FormControl("", [Validators.required]),
      comment: new FormControl("", [Validators.required])
    }
  )
  updateComplianceVerificationForm = new FormGroup(
    {
      comment: new FormControl("", [Validators.required]),
      valid_documents: new FormControl("", [Validators.required])
    }
  )
  complianceVerificationOnuList: PaginationTableData = {
    data: [],
    metadata: [
      'Listas',
      'Coincidencias',
      'Acciones'
    ]
  }
  complianceVerificationDataList: PaginationTableData = {
    data: [],
    metadata: [
      'Documento',
      'Nombre',
      'Acciones'
    ]
  }
  FormUploadDocumentsCA = new FormGroup({
    uploaddocsca_comment: new FormControl("", [Validators.required]),
  });
  dataChecklistAnalysis: PaginationTableData = {
    metadata: [
      "Documento",
      "Propietario",
      "Verificado",
      "Observación",
      "Acciones",
    ],
    data: []
  }
  FormCheckListCA = new FormGroup({
    checklist_comment: new FormControl("", [Validators.required]),
  });
  CreateVerificationForm = new FormGroup({
    comment: new FormControl("", [Validators.required]),
    verification: new FormControl(false, [Validators.required])
  })
  //Entradas y salidas
  @Input()
  showViews: string[] = []

  @Input()
  requestIdSelected = -1

  @Input()
  dataCustomer

  @Input()
  pageComplianceVerification: number = 0



  @Output()
  changePage?= new EventEmitter<number>()

  @Output()
  showDocuments?= new EventEmitter<any>()

  @Output()
  targetUploadDocuments?= new EventEmitter<string>()


  @Output()
  downloadDocuments?= new EventEmitter<any>()

  @Output()
  showChecklistDocument?= new EventEmitter<any>()

  @Output()
  downloadChecklistDocument?= new EventEmitter<any>()

  @Output()
  addLastView?= new EventEmitter<any>()

  @Output()
  returnview?= new EventEmitter<any>()

  @Output()
  showVerificationDocument?= new EventEmitter<ComplianceCheckListItem>()

  @Output()
  downloadVerificationDocument?= new EventEmitter<ComplianceCheckListItem>()


  selectedComplianceItem: ComplianceCheckListItem
  constructor(
    private _complianceVerificationService: ComplianceVerificationService,
    private _legalAnalysis: LegalAnalysisService,
    private toastr: ToastrService,
    private mysqlService: MysqlService,
    private _adviserService: AdviserService,
    private modalService: NgbModal,
    private filenameS: FilenameService,
    private spinner: NgxSpinnerService,
    private _VerificationService: VerificationdocvwService,
    private _CheckCA: ChecklistcommercialanalysisService,
    private _IRDocService: InitialrelationdocvwService,
    private _FormDocService: FormdocvwService,
    private _ReqDocService: RequirementdocvwService
  ) { }

  async ngOnInit() {
    this.spinner.show()
    await this.getInitComplianceVerification()
    await this.getComplianceVerificationAdviser()
    await this.loadConfigurations()
    await this.getIRDocView()
    await this.getFormDocView()
    await this.getReqDocView()
    this.spinner.hide()
  }
  async getIRDocView() {
    debugger
    this._IRDocService.getDocs(this.requestIdSelected, 'Cumplimiento').subscribe((c) => {
      this.DataIRDocs = c

      debugger
      this.dataRequestIRView = this.DataIRDocs
      console.log('MANDANDO DOCUMENTOS DE INICIO DE RELACION');
      console.log(this.dataRequestIRView);
      if (this.dataCustomer)
        this.actualIRDoc = this.dataRequestIRView
      console.log('ActualIRDOC');
      console.log(this.actualIRDoc);
    })
  }
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
  downloadDocRequirements() {
    this.almacenaReq = this.actualReqDoc.map(e => { return { key: e.s3key, document_name: e.filename } })
    console.log(this.almacenaReq)
    this.mysqlService
      .downloadDocReq(this.dataCustomer.customer_id, this.requestIdSelected)
    this.toastr.success('Éxito', 'Se han descargado los documentos')
    this.toastr.info('La descarga puede tardar un poco...', 'Descarga en Proceso')
  }
  loadConfigurations() {
    console.log('MIS VISTAS DE COMPLIANCE')
    console.log(this.showViews)

    let find1 = this.showViews.find((item) => item == this.analysis_option.assigmentResponsable)
    let find2 = this.showViews.find((item) => item == this.analysis_option.form)
    if (find1 && this.pageComplianceVerification < 2) {
      this.changePage.emit(0)
    }
    if (find2 && this.initComplianceVerification && this.pageComplianceVerification < 2) {
      this.changePage.emit(1)
    }
    if (find1 && find2) {
      this.showMoveToForm = true
      this.showMoveToAssigment = true
    }
  }
  disableView(view: string) {
    let find = this.showViews.find(item => item == view)
    if (find)
      return false
    return true
  }
  initComplianceVerificationMethod() {
    let value = this.initComplianceVerificationForm.value
    let reg: CommercialAnalysis = {
      id_request: this.requestIdSelected,
      id_customer: this.dataCustomer.customer_id,
      commercialanalysis_comment: value.comment
    }
    if (this.initComplianceVerification == false) {
      let sub = this._complianceVerificationService.initAnalysis(reg, value.id_adviser).pipe(
        map((response) => {
          this.toastr.success('Éxito', 'Se ha iniciado la Verificación de Cumplimiento legal');
          let newadviser: AdviserAnalysis = {
            id_adviser: value.id_adviser,
            id_commercialanalysis: response.id_commercialanalysis,
            priority: 1
          }
          let subs = this._legalAnalysis.addAdviser(newadviser, value.id_adviser).pipe(
            map((resp) => {
              console.log(resp)
              this.initComplianceVerification = true
              this.getAllComplianceVerificationInfo()

            }),
            catchError((err) => {
              this.toastr.error('error', 'Ocurrió un error');
              console.log(err);
              return of();
            })
          ).subscribe(() => subs.unsubscribe())
        }
        ),
        catchError((err) => {
          //this.spinner.hide();
          this.toastr.error('error', 'Ocurrió un error');
          console.log(err);
          return of();
        })
      ).subscribe(() => sub.unsubscribe())
    } else {
      //Reasignamos responsable
      this._legalAnalysis.updateAdviser(this.requestIdSelected, value.id_adviser, Analysis.compliance_verification, value.comment)
        .toPromise()
        .then((response) => {
          this.toastr.success('Éxito', 'Se ha actualizado el analista de análisis cumplimiento');
          this.getAllComplianceVerificationInfo()
        })
    }

  }
  getAllComplianceVerificationInfo() {
    this.getComplianceVerification()
    this.getOnuListComplianceVerification()
  }
  private getComplianceVerification() {
    let sub = this._complianceVerificationService.getAnalysis(this.requestIdSelected).pipe(
      map((response: CommercialAnalysis) => {
        console.log('EEE')
        console.log(response)
        this.complianceVerificationSelected = response
        this.compliance_verification_docs_valid = +response.valid_documents
        this.updateComplianceVerificationForm.controls['comment'].setValue(response.commercialanalysis_comment)
        this.getAllDocumentsComplianceVerification()
        this.getComplianceVerificationResponsable()
      }),
      catchError((err) => {
        this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
        return of();
      })
    ).subscribe(() => sub.unsubscribe())
  }
  getONUListCumplianceVerification() {
    //objeto { key:'',values:[]}
    let newarray = []
    for (let i = 0; i < this.complianceVerificationOnuList.data.length; i++) {
      let key = this.complianceVerificationOnuList.data[i].onu.id_reference
      let name = this.getNameOnuLIST(this.complianceVerificationOnuList.data[i].onu.id_reference)
      debugger
      let element = newarray.find(item => item.key == key)
      if (element) {
        if (this.complianceVerificationOnuList.data[i].customer.customer_id == this.dataCustomer.customer_id)
          element.values.push(this.complianceVerificationOnuList.data[i])
      } else {
        newarray.push({
          key: key,
          values: this.complianceVerificationOnuList.data[i].customer.customer_id == this.dataCustomer.customer_id ? [this.complianceVerificationOnuList.data[i]] : [],
          name
        })
      }
    }
    return newarray
  }
  getNameOnuLIST(id) {
    if (id) {
      let onu = this.onuListComplianceVerification.find(item => item.id == id);
      return onu ? onu.file_name : ''
    }
    return ''
  }
  getOnuListComplianceVerification() {
    let sub = this.mysqlService.GetONUMatch().pipe(
      map((response) => {
        this.complianceVerificationOnuList.data = response.data
        this.complianceVerificationOnuList.data.filter(item => item.customer.customer_id == this.dataCustomer.customer_id)
        console.log('ONU')
        console.log(response.data)
      }),
      catchError((err) => {
        this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
        return of();
      })
    ).subscribe(() => sub.unsubscribe())
    let sub2 = this.mysqlService.GetONUList().pipe(
      map((response) => {
        console.log('ONULIST')
        console.log(response)
        this.onuListComplianceVerification = response.data
      }),
      catchError((err) => {
        this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
        return of();
      })
    ).subscribe(() => sub2.unsubscribe())
  }
  getAllDocumentsComplianceVerification() {
    let sub = this._complianceVerificationService.listComplianceDocuments(this.complianceVerificationSelected.id_commercialanalysis).pipe(
      map((response) => {
        this.complianceVerificationDataList.data = response
      }),
      catchError((err) => {
        this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
        return of();
      })
    ).subscribe(() => sub.unsubscribe())
  }
  private getComplianceVerificationResponsable() {
    let sub = this._complianceVerificationService.getResponsable(this.requestIdSelected).pipe(
      map((response) => {
        console.log(response)
        this.responsibleComplianceAnalysis = response
      }),
      catchError((err) => {
        this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
        return of();
      })
    ).subscribe(() => sub.unsubscribe())
  }
  async getInitComplianceVerification() {
    let sub = this._complianceVerificationService.getInit(this.requestIdSelected).toPromise().then(
      (response) => {
        this.initComplianceVerification = response
        if (response == true) {
          this.getAllComplianceVerificationInfo()
        }
      }
    ).catch((err) => {
      this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
    })
    return sub
  }
  async getComplianceVerificationAdviser() {
    let sub = this._adviserService.getComplianceAdviser().toPromise().then(
      (response) => {
        this.listcomplianceverificationadviser = response
        for (let i = 0; i < this.listcomplianceverificationadviser.length; i++) {
          if (this.listcomplianceverificationadviser[i].is_default == 1) {
            this.initComplianceVerificationForm.controls['id_adviser'].setValue(this.listcomplianceverificationadviser[i].id_adviser)
          }
        }
      }
    ).catch((err) => {
      this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
    })
    return sub
  }
  changeView(input) {
    this.changePage.emit(input)
  }
  saveUpdateComplianceVerificationForm() {
    let data = this.updateComplianceVerificationForm.value
    let sub = this._complianceVerificationService.updateAnalysis(this.complianceVerificationSelected.id_commercialanalysis, data.comment, data.valid_documents).pipe(
      map((response) => {
        this.complianceVerificationSelected = response
        this.toastr.success('Análisis Actualizado', 'Éxito')
      }),
      catchError((err) => {
        this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
        return of();
      })
    ).subscribe(() => sub.unsubscribe())
    console.log(data)
  }
  openOnuListDetail(target, list) {
    this.selectedOnuList = list.values.filter(item => item.customer.customer_id == this.dataCustomer.customer_id)
    this.openModal(target)
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
  openModalUploadComplianceVerificationDoc(targetModal) {
    this.FormUploadDocumentsCA.reset({})
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
          id_commercialanalisys: this.complianceVerificationSelected.id_commercialanalysis,
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
              this.getAllComplianceVerificationInfo()
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
  showDocument(doc) {
    this.showDocuments.emit(doc)
  }
  downloadDocument(doc) {
    this.downloadDocuments.emit(doc)
  }
  showChecklistDocumentM(doc) {
    this.showChecklistDocument.emit(doc)
  }
  DownloadChecklistAnalysisDocument(doc) {
    this.downloadChecklistDocument.emit(doc)
  }
  deleteCheckDocs(ver) {
    let data = {
      id_checklist: ver.id_checklist
    }
    this._CheckCA.delDocs(data).toPromise()
      .then(async (response) => {
        this.toastr.success("Se ha eliminado el Documento", "Documento Eliminado!")
        //this.ngOnInit();
        this.reloadDataModal()
        this.getAllComplianceVerificationInfo()
      })
      .catch((err) => {
        this.toastr.error("Problemas con el servidor.", "Ha ocurrido un error")
        console.log(err)
      })
  }
  deleteDocCA(doc) {
    this.mysqlService
      .deleteDocsCA(doc.id_uploaddocsca)
      .toPromise()
      .then(async (response) => {
        this.toastr.success("Se ha eliminado el Documento", "Documento Eliminado!")
        // this.ngOnInit();
        this.reloadDataModal()
        this.getAllComplianceVerificationInfo()

      })
      .catch((error) => {
        this.toastr.error("Problemas con el servidor.", "Ha ocurrido un error")
        console.log(error)
      })
  }
  async reloadDataModal() {
    const sub = this._complianceVerificationService.getCheckList(this.dataCustomer.customer_id, this.requestIdSelected).toPromise().then(
      (response) => {
        this.dataChecklistAnalysis.data = response
      }
    )
    return sub
  }
  tabs: string[] = []
  async openChecklistModal(modal, target) {
    this.spinner.show()
    const sub = this._complianceVerificationService.getCheckList(this.dataCustomer.customer_id, this.requestIdSelected).toPromise().then(
      (response) => {
        this.dataChecklistAnalysis.data = response
        this.tabs = [...new Set(response.map(item => item.document_type))]
        this.openModal(modal)
      }
    )
    this.spinner.hide()
    return sub
  }
  onChangeStatusCheckList(doc) {
    //Verificar Existencia Documento

    let id = doc.id;
    let docname = doc.doc_type;
    let verifica = doc.verification
    console.log(doc)
    this._VerificationService.getCheck(id, docname, doc.id_commercialanalysis).subscribe((c) => {
      console.log(c)
      if (c === true) {
        console.log('Documento existente')
        //Actualizar Estado
        if (doc.TYPE === 'INITIALRELATION') {
          this.checkListType = 1;
        }
        else if (doc.TYPE === 'FORM') {
          this.checkListType = 2;
        }
        else if (doc.TYPE === 'REQUIREMENT') {
          this.checkListType = 3;
        }
        if (verifica === 0) {
          let data: CheckListCommercialAnalysis = {
            id_checklist: doc.id_checklist,
            id_commercialanalysis: doc.id_commercialanalysis,
            checklist_typedoc: this.checkListType,
            checklist_verification: 1
          }
          this._CheckCA
            .updateCheck(data)
            .pipe(
              map((data) => {
                this.toastr.success('Se ha cambiado el estado', `Verificado`)
                // this.reloadDataModalChecklist(this.targetReport)
                this.reloadDataModal()

              }),
              catchError((err) => {
                this.toastr.error(
                  'Error',
                  'Ha ocurrido un problema con la conexión ' + err
                );
                console.log(err);
                return of();
              })
            ).subscribe((data) => { });
        }
        else {
          let data: CheckListCommercialAnalysis = {
            id_checklist: doc.id_checklist,
            id_commercialanalysis: doc.id_commercialanalysis,
            checklist_typedoc: this.checkListType,
            checklist_verification: 0
          }
          this._CheckCA
            .updateCheck(data)
            .pipe(
              map((data) => {
                this.toastr.success('Se ha cambiado el estado', `No Verificado`)
                //this.reloadDataModalChecklist(this.targetReport)
                this.reloadDataModal()
              }),
              catchError((err) => {
                this.toastr.error(
                  'Error',
                  'Ha ocurrido un problema con la conexión ' + err
                );
                console.log(err);
                return of();
              })
            ).subscribe((data) => { });
        }
      }
      else {
        //Actualiza estado en CheckList
        if (doc.TYPE === 'INITIALRELATION') {
          this.checkListType = 1;
          console.log(this.checkListType)
        }
        else if (doc.TYPE === 'FORM') {
          this.checkListType = 2;
          console.log(this.checkListType)
        }
        else if (doc.TYPE === 'REQUIREMENT') {
          this.checkListType = 3;
          console.log(this.checkListType)
        }
        console.log(this.checkListType)
        //Crear en CheckListCA
        let newDoc: CheckListCommercialAnalysis = {
          id_doc: doc.id,
          id_commercialanalysis: doc.id_commercialanalysis,
          checklist_typedoc: this.checkListType,
          checklist_docname: doc.doc_type,
          checklist_verification: 1
        }
        console.log(newDoc)
        let susbscription = this._CheckCA.saveCheck(
          newDoc).pipe(
            map((resp) => {
              this.toastr.success('Verificado', 'Se ha cambiado el estado')
              //this.reloadDataModalChecklist(this.targetReport)
              this.reloadDataModal()
            })
          ).subscribe(() => susbscription.unsubscribe())
      }
    })
  }
  returnview2() {
    this.returnview.emit()
    this.ngOnInit()
  }
  openReport() {
    this.addLastView.emit({ target: 'Cumplimiento', page: this.pageComplianceVerification })
    this.changePage.emit(2)
    this.closeBtnClick()
  }
  downloadDocIR() {
    console.log(this.actualIRDoc);
    // this.almacenaIR = this.actualIRDoc.map(e => { return { key: e.s3key, document_name: e.filename } })
    console.log(this.actualIRDoc)
    debugger
    this.mysqlService
      .downloadDocIR(this.dataCustomer.customer_id, this.requestIdSelected)
    this.toastr.success('Éxito', 'Se han descargado los documentos')
    this.toastr.info('La descarga puede tardar un poco...', 'Descarga en Proceso')
  }
  downloadDocForms() {
    console.log('DESCARGA DE DOCUMENTOS');
    //  this.almacenaDocs = this.actualFormDoc.map(e => { return { key: e.s3key, document_name: e.filename } })
    this.mysqlService
      .downloadDocForm(this.dataCustomer.customer_id, this.requestIdSelected)
    this.toastr.success('Éxito', 'Se han descargado los documentos')
    this.toastr.info('La descarga puede tardar un poco...', 'Descarga en Proceso')
  }
  async getFormDocView() {
    try {
      debugger
      console.log('Ejecutando Form');
      this._FormDocService.getDocs(this.requestIdSelected, 'Cumplimiento').subscribe((c) => {
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
  saveComment() {
    this._CheckCA.updateComment(this.FormCheckListCA.controls['checklist_comment'].value, this.actualDocument.id_checklist).toPromise().then((response) => {
      this.toastr.success('Checklist Actualizado', 'Éxito')
      this.closeBtnClick()
      this.reloadDataModal()
      this.FormCheckListCA.reset({})
    })
  }
  actualDocument: any
  openModalComment(modal, object) {
    this.actualDocument = object
    console.log(object)
    this.FormCheckListCA.controls['checklist_comment'].setValue(object.comment == '0' ? '' : object.comment)
    this.openModal(modal)
  }

  openModalUploadDocCheck(targetModal, ver) {
    console.log('Modal Checklist');
    this.FormCheckListRD.reset({});
    this.dataDoc = ver;
    this.openModal(targetModal)
  }
  async uploadDocCheckList(event) {
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
              this.reloadDataModal()
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
  changeVerificationsDocsLegalAnalysis(event) {
    console.log(event)
    this.updateComplianceVerificationForm.controls['valid_documents'].setValue(event)
  }
  showButton(value) {
    if (value != null) {
      if (value.includes('jpg') || value.includes('png') || value.includes('jpeg') || value.includes('pdf')) {
        return true
      }
      return false
    }
    return false
  }
  groupData(tab) {
    return this.dataChecklistAnalysis.data.filter(item => item.document_type == tab)
  }
  showDescription = ''
  openShowDescription(modal, description) {
    this.showDescription = description
    this.openModal(modal)
  }

  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  async uploadVerificationDoc(event) {
    if (event.target.files && event.target.files[0]) {
      const named = this.filenameS.generateName() + "_" + event.target.files[0].name
      let base = await this.getBase64(event.target.files[0]);
      var reader = new FileReader();
      reader.onload = async (event: any) => {
        this.spinner.show()
        this._complianceVerificationService.uploadVerificationDocument(base,
          this.selectedComplianceItem.id, this.selectedComplianceItem.document_type, this.dataCustomer.customer_id, named)
          .pipe(
            map((data) => {
              this.toastr.success('Éxito', 'Se ha subido el documento')
              this.spinner.hide()
            }),
            catchError((err) => {
              this.spinner.hide()
              this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
              return of()
            })
          ).subscribe((data) => { });
      }
      await reader.readAsDataURL(event.target.files[0]);
    }
  }
  showVerificationDoc() {
    this.showVerificationDocument.emit(this.selectedComplianceItem)
  }
  openCreateVerification(targetModal, data: ComplianceCheckListItem) {
    this.selectedComplianceItem = data
    this.CreateVerificationForm.controls['comment'].setValue(data.comment)
    this.CreateVerificationForm.controls['verification'].setValue(
      (data.verification == null || data.verification == 0) ? false : true
    )
    this.openModal(targetModal)
  }
  async saveVerification() {
    this._complianceVerificationService.saveVerification(
      this.selectedComplianceItem.id,
      '',
      '',
      this.selectedComplianceItem.verification,
      this.CreateVerificationForm.controls['comment'].value,
      this.selectedComplianceItem.document_type
    ).toPromise().then(
      (response) => {
        this.toastr.success('Éxito', 'Se ha guardado la verificación')
        this.getComplianceVerification()
        this.closeBtnClick()
      }
    ).catch((err) => {
      console.log(err)
      this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
    })
  }
  downloadVerification() {
    this.downloadVerificationDocument.emit(this.selectedComplianceItem)
  }
  checkSelectedCommercialItem(val) {
    this.selectedComplianceItem.verification = val
  }
}
