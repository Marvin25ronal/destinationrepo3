import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ShowViewInterface } from 'src/app/component/fdt/directive/directive.component';
import { DocumentmodalComponent } from 'src/app/component/modals/documentmodal/documentmodal.component';
import { PaginationTableData } from 'src/app/interfaces/ui/pagination-table.interface';
import { Adviser } from 'src/app/models/adviser.model';
import { CheckListCommercialAnalysis } from 'src/app/models/checklistcommercialanalysis.model';
import { CommercialAnalysis } from 'src/app/models/commercialanalysis.model';
import { AnalysisService } from 'src/app/services/analysis/analysis.service';
import { ChecklistcommercialanalysisService } from 'src/app/services/analysis/checklistcommercialanalysis.service';
import { ComplianceCheckListItem, ComplianceVerificationService } from 'src/app/services/analysis/compliance-verification.service';
import { FormdocvwService } from 'src/app/services/analysis/formdocvw.service';
import { InitialrelationdocvwService } from 'src/app/services/analysis/initialrelationdocvw.service';
import { LegalAnalysisService, LegalCheckListItem } from 'src/app/services/analysis/legal-analysis.service';
import { RequirementdocvwService } from 'src/app/services/analysis/requirementdocvw.service';
import { VerificationdocvwService } from 'src/app/services/analysis/verificationdocsvw.service';
import { FilenameService } from 'src/app/services/data/filename.service';
import { MysqlService } from 'src/app/services/mysql/mysql.service';

@Component({
  selector: 'app-compliance-verification',
  templateUrl: './compliance-verification.component.html',
  styleUrls: ['./compliance-verification.component.scss']
})
export class ComplianceVerificationComponent implements OnInit {
  @ViewChild(DocumentmodalComponent) viewDocumentModal: DocumentmodalComponent
  customer_id: number = 0
  responsibleComplianceAnalysis: Adviser;
  complianceVerificationSelected: CommercialAnalysis;
  pageCommercialAnalysis: number = 0
  showViews: string[] = [] //en donde dice que vistas son disponibles
  CreateVerificationForm = new FormGroup({
    comment: new FormControl("", [Validators.required]),
    verification: new FormControl(false, [Validators.required])
  })
  updateComplianceVerificationForm = new FormGroup(
    {
      comment: new FormControl("", [Validators.required]),
      valid_documents: new FormControl("", [Validators.required])
    }
  )
  updateLegalAnalysisForm = new FormGroup({
    comment: new FormControl("", [Validators.required]),
    valid_documents: new FormControl("", [Validators.required])
  })
  compliance_verification_docs_valid: number = 0;
  complianceVerificationOnuList: PaginationTableData = {
    data: [],
    metadata: [
      'Listas',
      'Coincidencias',
      'Acciones'
    ]
  }
  onuListComplianceVerification: any[]
  targetUploadDocuments: string;
  FormUploadDocumentsCA = new FormGroup({
    uploaddocsca_comment: new FormControl("", [Validators.required]),
  });
  complianceVerificationDataList: PaginationTableData = {
    data: [],
    metadata: [
      'Listas',
      'Coincidencias',
      'Acciones'
    ]
  }
  requestIdSelected: number;
  arraymodals: any = [];
  imgsrcbase64: any;
  pdfsrcbase64: any;
  dataChecklistAnalysis: PaginationTableData = {
    metadata: [
      "Documento",
      "Verificado",
      "Observación",
      "Acciones",
    ],
    data: []
  }
  FormCheckListCA = new FormGroup({
    checklist_comment: new FormControl("", [Validators.required]),
  });
  analysisID: number
  constructor(
    private toastr: ToastrService,
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private _complianceVerificationService: ComplianceVerificationService,
    private mysqlService: MysqlService,
    private filenameS: FilenameService,
    private _analysisService: AnalysisService,
    private sanitizer: DomSanitizer,
    private _VerificationService: VerificationdocvwService,
    private _CheckCA: ChecklistcommercialanalysisService,
    private router: Router,
    private _IRDocService: InitialrelationdocvwService,
    private _ReqDocService: RequirementdocvwService,
    private _FormDocService: FormdocvwService,
  ) { }

  async ngOnInit() {
    if (this.activatedRoute.snapshot.params) {
      this.spinner.show()
      let id = this.activatedRoute.snapshot.params.id
      this.analysisID = parseInt(id)
      let request = this.activatedRoute.snapshot.params.requestid
      this.requestIdSelected = parseInt(request)
      this.customer_id = this.activatedRoute.snapshot.params.customerid
      await this.getAllComplianceVerificationInfo()
      this.spinner.hide()
    }
  }
  almacenaIR;
  actualIRDoc = [];
  DataIRDocs;
  dataRequestIRView = [];
  actualReqDoc = [];
  getIRDocView() {
    this._IRDocService.getIRDocs(-1, -1, []).subscribe((c) => {
      this.DataIRDocs = c
      console.log(c)
      this.dataRequestIRView = this.DataIRDocs.rdvw
      this.actualIRDoc = this.dataRequestIRView.filter(e => e.id_commercialanalysis === this.complianceVerificationSelected.id_commercialanalysis)
    })
  }
  almacenaReq;
  downloadDocRequirements() {
    // this.almacenaReq = this.actualReqDoc.map(e => { return { key: e.s3key, document_name: e.filename } })
    console.log(this.almacenaReq)
    this.mysqlService
      .downloadDocReq(this.customer_id, this.requestIdSelected)
    this.toastr.success('Éxito', 'Se han descargado los documentos')
  }
  DataReqDocs;
  dataRequestDocView
  getReqDocView() {
    try {
      this._ReqDocService.getReqDocs(2000, 0, []).subscribe((c) => {
        this.DataReqDocs = c
        this.dataRequestDocView = this.DataReqDocs.rdvw
        this.actualReqDoc = this.dataRequestDocView.filter(e => e.id_request === this.complianceVerificationSelected.id_request)
      })
    }
    catch (err) {
      console.log(err)
      this.toastr.error("No existen Formularios")
      throw err
    }
  }
  downloadDocIR() {
    this.almacenaIR = this.actualIRDoc.map(e => { return { key: e.s3key, document_name: e.filename } })
    console.log(this.almacenaIR)
    this.mysqlService
      .downloadDocIR(this.customer_id, this.requestIdSelected)
    this.toastr.success('Éxito', 'Se han descargado los documentos')
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
  }
  ngOnDestroy(): void {
    if (this.modalService.hasOpenModals()) {
      this.modalService.dismissAll();
      this.arraymodals = []
    }
  }
  deleteDocCA(doc, target = '') {
    this.targetUploadDocuments = target

    this.mysqlService
      .deleteDocsCA(doc.id_uploaddocsca)
      .toPromise()
      .then(async (response) => {
        this.toastr.success("Se ha eliminado el Documento", "Documento Eliminado!")
        // this.ngOnInit();
        this.getAllComplianceVerificationInfo()

      })
      .catch((error) => {
        this.toastr.error("Problemas con el servidor.", "Ha ocurrido un error")
        console.log(error)
      })
  }
  getAllComplianceVerificationInfo() {
    this.getComplianceVerificationResponsable()
    this.getComplianceVerification()
    this.getOnuListComplianceVerification()
    this.getIRDocView()
    this.getReqDocView()
  }
  almacenaDocs;
  actualFormDoc = [];
  downloadDocForms() {
    this.almacenaDocs = this.actualFormDoc.map(e => { return { key: e.s3key, document_name: e.filename } })
    this.mysqlService
      .downloadDocForm(this.customer_id, this.requestIdSelected)
    this.toastr.success('Éxito', 'Se han descargado los documentos')
  }
  DataFormDocs
  dataRequestFormView = [];
  getFormDocView() {
    try {
      this._FormDocService.getFormDocs(20000, 0, []).subscribe((c) => {
        this.DataFormDocs = c
        this.dataRequestFormView = this.DataFormDocs.rdvw
        this.actualFormDoc = this.dataRequestFormView.filter(e => e.id_commercialanalysis === this.complianceVerificationSelected.id_commercialanalysis)
      })
    }
    catch (err) {
      this.toastr.error("No existen Formularios")
      console.log(err)
      throw err
    }
  }
  async showChecklistDocumentM(doc: ComplianceCheckListItem) {
    this.spinner.show()
    await this._analysisService.showAnyDocument(doc.key, doc.document_name).toPromise()
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
      })
  }
  selectedComplianceItem: ComplianceCheckListItem;
  openCreateVerification(targetModal, data: ComplianceCheckListItem) {
    this.selectedComplianceItem = data
    this.CreateVerificationForm.controls['comment'].setValue(data.comment)
    this.CreateVerificationForm.controls['verification'].setValue(
      (data.verification == null || data.verification == 0) ? false : true
    )
    this.openModal(targetModal)
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
  private getComplianceVerification() {
    let sub = this._complianceVerificationService.getAnalysis(this.requestIdSelected).pipe(
      map((response: CommercialAnalysis) => {
        console.log('EEE')
        console.log(response)
        this.complianceVerificationSelected = response
        this.compliance_verification_docs_valid = +response.valid_documents
        this.updateComplianceVerificationForm.controls['comment'].setValue(response.commercialanalysis_comment)
        this.getAllDocumentsComplianceVerification()
      }),
      catchError((err) => {
        this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
        return of();
      })
    ).subscribe(() => sub.unsubscribe())
  }

  getOnuListComplianceVerification() {
    let sub = this.mysqlService.GetONUMatch().pipe(
      map((response) => {
        this.complianceVerificationOnuList.data = response.data
        this.complianceVerificationOnuList.data.filter(item => item.customer.customer_id == this.complianceVerificationSelected.id_customer)
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
  changeVerificationsDocsLegalAnalysis(event) {
    console.log(event)
    this.updateLegalAnalysisForm.controls['valid_documents'].setValue(event)

  }
  openModalUploadComplianceVerificationDoc(targetModal) {
    this.targetUploadDocuments = 'Cumplimiento'
    this.FormUploadDocumentsCA.reset({})
    this.openModal(targetModal)
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
  showDescription = ''
  openShowDescription(modal, description) {
    this.showDescription = description
    this.openModal(modal)
  }
  targetReport: any;
  async openChecklistModal(modal, target) {
    this.spinner.show()
    this.targetReport = target
    await this.reloadDataModalChecklist(target)
    this.openModal(modal)
    this.spinner.hide()
  }
  tabs: string[] = []
  async reloadDataModalChecklist(target) {
    let sub;
    sub = this._complianceVerificationService.getCheckList(this.customer_id, this.requestIdSelected).toPromise().then(
      (response) => {
        this.dataChecklistAnalysis.data = response
        this.tabs = [...new Set(response.map(item => item.document_type))]


      }
    )
    return sub;
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
  DownloadAnalysisDocument(doc) {
    console.log(doc)
    this._analysisService.downloadDocument(doc.id_uploaddocsca, doc.uploaddocsca_namedoc)
  }
  selectedOnuList: any;
  openOnuListDetail(target, list) {
    this.selectedOnuList = list.values
    this.openModal(target)
  }
  dataDoc;
  openModalUploadDocCheck(targetModal, ver) {
    console.log('Modal Checklist');
    this.FormCheckListRD.reset({});
    this.dataDoc = ver;
    this.targetUploadDocuments = 'Cumplimiento'

    this.openModal(targetModal)
  }
  FormCheckListRD = new FormGroup({
    checklist_comment: new FormControl("", [Validators.required]),
  });
  getONUListCumplianceVerification() {
    //objeto { key:'',values:[]}
    let newarray = []
    for (let i = 0; i < this.complianceVerificationOnuList.data.length; i++) {
      let key = this.complianceVerificationOnuList.data[i].onu.id_reference
      let name = this.getNameOnuLIST(this.complianceVerificationOnuList.data[i].onu.id_reference)
      let element = newarray.find(item => item.key == key)
      if (element) {
        if (this.complianceVerificationOnuList.data[i].customer.customer_id == this.customer_id)
          element.values.push(this.complianceVerificationOnuList.data[i])
      } else {
        newarray.push({
          key: key,
          values: this.complianceVerificationOnuList.data[i].customer.customer_id == this.customer_id ? [this.complianceVerificationOnuList.data[i]] : [],
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
  onChangeStatusCheckListNo(doc) {
    //Verificar Existencia Documento
    //debugger
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
        if (verifica === 1) {
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
                this.toastr.success('Se ha cambiado el estado', `Verificado`)
                // this.reloadDataModalChecklist(this.targetReport)
                this.reloadDataModalChecklist('Cumplimiento')
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
            checklist_verification: 1
          }
          this._CheckCA
            .updateCheck(data)
            .pipe(
              map((data) => {
                this.toastr.success('Se ha cambiado el estado', `No Verificado`)
                //this.reloadDataModalChecklist(this.targetReport)
                this.reloadDataModalChecklist('Cumplimiento')
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
          checklist_verification: 0
        }
        console.log(newDoc)
        let susbscription = this._CheckCA.saveCheck(
          newDoc).pipe(
            map((resp) => {
              this.toastr.success('Verificado', 'Se ha cambiado el estado')
              //this.reloadDataModalChecklist(this.targetReport)
              this.reloadDataModalChecklist('Cumplimiento')
            })
          ).subscribe(() => susbscription.unsubscribe())
      }
    })
  }
  checkSelectedCommercialItem(val){
    this.selectedComplianceItem.verification = val;
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
        this.reloadDataModalChecklist('')
        this.closeBtnClick()
      }
    ).catch((err) => {
      console.log(err)
      this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
    })
  }
  checkListType;
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
  
  DownloadChecklistAnalysisDocument(doc) {
    this._analysisService.downloadDocumentChecklist(doc.id_checklist, doc.filename)
  }
  deleteCheckDocs(ver) {

    let data = {
      id_checklist: ver.id_checklist
    }
    this._CheckCA.delDocs(data).toPromise()
      .then(async (response) => {
        this.toastr.success("Se ha eliminado el Documento", "Documento Eliminado!")
        //this.ngOnInit();
        this.reloadDataModalChecklist('Cumplimiento')
        this.getAllComplianceVerificationInfo()
      })
      .catch((err) => {
        this.toastr.error("Problemas con el servidor.", "Ha ocurrido un error")
        console.log(err)
      })
  }
  openReport() {
    this.router.navigate([`/analysis-report`, this.complianceVerificationSelected.id_commercialanalysis])
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
                this.reloadDataModalChecklist('Cumplimiento')

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
                this.reloadDataModalChecklist('Cumplimiento')
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
              this.reloadDataModalChecklist('Cumplimiento')
            })
          ).subscribe(() => susbscription.unsubscribe())
      }
    })
  }
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
              this.reloadDataModalChecklist('Cumplimiento')
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
  changePageCompliance(i: number) {
    this.pageCommercialAnalysis = i
    this.closeBtnClick()
  }

  disableView() {
    let view1 = 'Formulario'
    let view2 = 'Verificación de Cumplimiento'
    let find = this.showViews.find(item => item == view1)
    let find2 = this.showViews.find(item => item == view2)
    if (find && find2)
      return false
    return true
  }
  getShowViews(arr: ShowViewInterface) {
    this.showViews = arr.show_views
    console.log('EStas son mis vistas')

    console.log(this.showViews)
  }
  actualDocument: any
  openModalComment(modal, object) {
    this.actualDocument = object
    console.log(object)
    this.FormCheckListCA.controls['checklist_comment'].setValue(object.comment == '0' ? '' : object.comment)
    this.openModal(modal)
  }
  saveComment() {
    this._CheckCA.updateComment(this.FormCheckListCA.controls['checklist_comment'].value, this.actualDocument.id_checklist).toPromise().then((response) => {
      this.toastr.success('Checklist Actualizado', 'Éxito')
      this.closeBtnClick()
      this.reloadDataModalChecklist('Cumplimiento')
      this.FormCheckListCA.reset({})
    })
  }
  async showLegalVerificationDoc() {
    this.spinner.show();
    await this._analysisService.showComplianceVerificationDocument(this.selectedComplianceItem).toPromise()
      .then((response) => {
        this.imgsrcbase64 = null;
        this.pdfsrcbase64 = null;
        if (response.type == 'image') {
          let urls =
            "data:image/jpg;base64;base64," + response.url;
          this.imgsrcbase64 = this.sanitizer.bypassSecurityTrustResourceUrl(
            urls
          );
        } else if (response.type === 'pdf') {
          let urls =
            response.url;
          this.pdfsrcbase64 = urls
          console.log(urls);
        }
        this.spinner.hide()
        this.viewDocumentModal.openModal()
      }).catch((error) => {
        this.toastr.error("Problemas con el servidor.", "Oops!");
        this.spinner.hide()
      })
  }
  async downloadVerification() {
    this._analysisService.downloadAnyDocument(this.selectedComplianceItem.checklist_document_name,this.selectedComplianceItem.checklist_document_key)
  }
  async uploadVerificationDoc(event) {
    if (event.target.files && event.target.files[0]) {
      const named = this.filenameS.generateName() + "_" + event.target.files[0].name
      let base = await this.getBase64(event.target.files[0]);
      var reader = new FileReader();
      reader.onload = async (event: any) => {
        this.spinner.show()
        this._complianceVerificationService.uploadVerificationDocument(base,
          this.selectedComplianceItem.id, this.selectedComplianceItem.document_type, this.customer_id, named)
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
  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
}
