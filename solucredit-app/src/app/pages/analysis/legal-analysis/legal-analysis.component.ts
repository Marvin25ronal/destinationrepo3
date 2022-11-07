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
import { CheckListCommercialAnalysis } from 'src/app/models/checklistcommercialanalysis.model';
import { CommercialAnalysis } from 'src/app/models/commercialanalysis.model';
import { AnalysisService } from 'src/app/services/analysis/analysis.service';
import { ChecklistcommercialanalysisService } from 'src/app/services/analysis/checklistcommercialanalysis.service';
import { LegalAnalysisService, LegalCheckListItem } from 'src/app/services/analysis/legal-analysis.service';
import { VerificationdocvwService } from 'src/app/services/analysis/verificationdocsvw.service';
import { FilenameService } from 'src/app/services/data/filename.service';
import { MysqlService } from 'src/app/services/mysql/mysql.service';

@Component({
  selector: 'app-legal-analysis',
  templateUrl: './legal-analysis.component.html',
  styleUrls: ['./legal-analysis.component.scss']
})
export class LegalAnalysisComponent implements OnInit {
  @ViewChild(DocumentmodalComponent) viewDocumentModal: DocumentmodalComponent

  updateLegalAnalysisForm = new FormGroup({
    comment: new FormControl("", [Validators.required]),
    valid_documents: new FormControl("", [Validators.required])
  })
  CreateVerificationForm = new FormGroup({
    comment: new FormControl("", [Validators.required]),
    verification: new FormControl(false, [Validators.required])
  })
  requestIdSelected: number
  analysisIdSelected: number
  legalAnalysisSelected: CommercialAnalysis;
  responsibleLegalAnalysis: any;
  legal_analysis_docs_valid = 0
  targetUploadDocuments: string;
  FormUploadDocumentsCA = new FormGroup({
    uploaddocsca_comment: new FormControl("", [Validators.required]),
  });
  legalAnalysisDataList: PaginationTableData = {
    data: [],
    metadata: [
      'Nombre',
      'Comentario',
      'Acciones'
    ]
  }
  targetReport: any;
  arraymodals: any = [];
  imgsrcbase64: any;
  pdfsrcbase64: any;
  FormCheckListRD = new FormGroup({
    checklist_comment: new FormControl("", [Validators.required]),
  });

  FormCheckListCA = new FormGroup({
    checklist_comment: new FormControl("", [Validators.required]),
  });
  pageLegalAnalysis: number = 0
  showViews: string[] = [] //en donde dice que vistas son disponibles
  customer_id: number = 0
  tabs: string[] = []
  selectedLegalItem: LegalCheckListItem

  showDescription = ''
  constructor(
    private _legalAnalysis: LegalAnalysisService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private filenameS: FilenameService,
    private mysqlService: MysqlService,
    private _analysisService: AnalysisService,
    private sanitizer: DomSanitizer,
    private _CheckCA: ChecklistcommercialanalysisService,
    private _VerificationService: VerificationdocvwService,
    private router: Router,
  ) { }

  async ngOnInit() {
    if (this.activatedRoute.snapshot.params) {
      this.spinner.show()
      let id = this.activatedRoute.snapshot.params.id
      this.analysisIdSelected = parseInt(id)
      let request = this.activatedRoute.snapshot.params.requestid
      this.customer_id = this.activatedRoute.snapshot.params.customerid
      this.requestIdSelected = parseInt(request)
      await this.getAllLegalAnalysisInfo()
      this.spinner.hide()
    }
  }
  downloadLegalAnalysisDocs() {
    this._legalAnalysis.downloadDocuments(this.requestIdSelected, this.customer_id)
  }
  DownloadAnalysisDocument(doc) {
    console.log(doc)
    this._analysisService.downloadDocument(doc.id_uploaddocsca, doc.uploaddocsca_namedoc)
  }
  deleteDocCA(doc, target = '') {
    this.targetUploadDocuments = target

    this.mysqlService
      .deleteDocsCA(doc.id_uploaddocsca)
      .toPromise()
      .then(async (response) => {
        this.toastr.success("Se ha eliminado el Documento", "Documento Eliminado!")
        // this.ngOnInit();
        this.getAllLegalAnalysisInfo()

      })
      .catch((error) => {
        this.toastr.error("Problemas con el servidor.", "Ha ocurrido un error")
        console.log(error)
      })
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
  saveUpdateLegalAnalysisForm() {
    let data = this.updateLegalAnalysisForm.value
    let sub = this._legalAnalysis.updateAnalysis(this.legalAnalysisSelected.id_commercialanalysis, data.comment, data.valid_documents).pipe(
      map((response) => {
        this.legalAnalysisSelected = response
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
  async showChecklistDocumentM(doc: LegalCheckListItem) {
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
  openModalUploadLegalAnalysisDoc(targetModal) {
    this.targetUploadDocuments = 'Legal'
    this.FormUploadDocumentsCA.reset({});
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
  dataChecklistAnalysis: PaginationTableData = {
    metadata: [
      "Documento",
      "Verificado",
      "Observación",
      "Acciones",
    ],
    data: []
  }
  async reloadDataModalChecklist(target) {
    let sub;
    switch (target) {
      case 'Legal':
        sub = this._legalAnalysis.getCheckList(this.requestIdSelected, this.customer_id).toPromise().then(
          (response) => {
            this.dataChecklistAnalysis.data = response
            this.tabs = [...new Set(response.map(item => item.document_type))]
          }
        )
        return sub
    }
  }
  async openChecklistModal(modal, target) {
    this.spinner.show()
    this.targetReport = target
    await this.reloadDataModalChecklist(target)
    this.openModal(modal)
    this.spinner.hide()
  }
  async getLegalAnalysisResponsable() {
    let sub = this._legalAnalysis.getResponsable(this.analysisIdSelected).toPromise().then(
      (response) => {
        console.log(response)
        this.responsibleLegalAnalysis = response
      }
    )
    return sub
  }
  async getLegalAnalysis() {
    let sub = this._legalAnalysis.getAnalysis(this.requestIdSelected).toPromise().then(
      (response: CommercialAnalysis) => {
        console.log('EEE')
        console.log(response)
        this.legalAnalysisSelected = response
        this.legal_analysis_docs_valid = +response.valid_documents
        this.updateLegalAnalysisForm.controls['comment'].setValue(response.commercialanalysis_comment)
        this.getAllDocumentsLegalAnalysis()
      },
    )
    return sub
  }
  async getAllLegalAnalysisInfo() {
    //Necesitamos saber el responsable
    await this.getLegalAnalysisResponsable()
    await this.getLegalAnalysis()
    //this.getAllDocumentsLegalAnalysis()
    // console.log(this.legalAnalysisSelected)
    //this.legal_analysis_docs_valid = + this.legalAnalysisSelected.valid_documents
  }
  getAllDocumentsLegalAnalysis() {
    let sub = this._legalAnalysis.listLegalDocuments(this.legalAnalysisSelected.id_commercialanalysis).pipe(
      map((response) => {
        this.legalAnalysisDataList.data = response
      }),
      catchError((err) => {
        this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
        return of();
      })
    ).subscribe(() => sub.unsubscribe())
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
          id_commercialanalisys: this.legalAnalysisSelected.id_commercialanalysis,
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
              this.getAllLegalAnalysisInfo()
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
  checkListType;
  dataDoc;
  openModalUploadDocCheck(targetModal, ver) {
    console.log('Modal Checklist');
    this.FormCheckListRD.reset({});
    this.dataDoc = ver;
    this.targetUploadDocuments = 'Legal'

    this.openModal(targetModal)
  }

  DownloadChecklistAnalysisDocument(doc) {
    this._analysisService.downloadAnyDocument(doc.document_name, doc.key)
  }
  deleteCheckDocs(ver) {

    let data = {
      id_checklist: ver.id_checklist
    }
    this._CheckCA.delDocs(data).toPromise()
      .then(async (response) => {
        this.toastr.success("Se ha eliminado el Documento", "Documento Eliminado!")
        //this.ngOnInit();
        this.reloadDataModalChecklist('Legal')
        this.getAllLegalAnalysisInfo()
      })
      .catch((err) => {
        this.toastr.error("Problemas con el servidor.", "Ha ocurrido un error")
        console.log(err)
      })
  }
  openReport() {
    this.router.navigate([`/analysis-report`, this.legalAnalysisSelected.id_commercialanalysis])
  }
  ngOnDestroy(): void {
    if (this.modalService.hasOpenModals()) {
      this.modalService.dismissAll();
      this.arraymodals = []
    }
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
              this.reloadDataModalChecklist('Legal')
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
                this.reloadDataModalChecklist('Legal')
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
                this.reloadDataModalChecklist('Legal')
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
              this.reloadDataModalChecklist('Legal')
            })
          ).subscribe(() => susbscription.unsubscribe())
      }
    })
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
                this.reloadDataModalChecklist('Legal')

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
                this.reloadDataModalChecklist('Legal')
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
              this.reloadDataModalChecklist('Legal')
            })
          ).subscribe(() => susbscription.unsubscribe())
      }
    })
  }
  changeViewReport(i: number) {
    this.pageLegalAnalysis = i
    this.closeBtnClick()
  }
  disableView() {
    let view1 = 'Formulario'
    let view2 = 'Análisis Legal'
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
      this.reloadDataModalChecklist('Legal')
      this.FormCheckListCA.reset({})
    })
  }
  groupData(tab) {
    return this.dataChecklistAnalysis.data.filter(item => item.document_type == tab)
  }
  showButton(value) {
    if (value != null) {
      if (value.includes('jpg') || value.includes('png') || value.includes('jpeg') || value.includes('pdf')) {
        return true
      }
      return false
    }
    return
  }
  openCreateVerification(targetModal, data: LegalCheckListItem) {
    this.selectedLegalItem = data
    this.CreateVerificationForm.controls['comment'].setValue(data.comment)
    this.CreateVerificationForm.controls['verification'].setValue(
      (data.verification == null || data.verification == 0) ? false : true
    )
    this.openModal(targetModal)
  }
  openShowDescription(modal, description) {
    this.showDescription = description
    this.openModal(modal)
  }
  checkSelectedLegalItem(val) {
    this.selectedLegalItem.verification = val
  }
  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  async saveVerification() {
    this._legalAnalysis.saveVerification(
      this.selectedLegalItem.id,
      '',
      '',
      this.selectedLegalItem.verification,
      this.CreateVerificationForm.controls['comment'].value,
      this.selectedLegalItem.document_type
    ).toPromise().then(
      (response) => {
        this.toastr.success('Éxito', 'Se ha guardado la verificación')
        this.getLegalAnalysis()
        this.closeBtnClick()
      }
    ).catch((err) => {
      console.log(err)
      this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
    })
  }
  async uploadVerificationDoc(event) {
    if (event.target.files && event.target.files[0]) {
      const named = this.filenameS.generateName() + "_" + event.target.files[0].name
      let base = await this.getBase64(event.target.files[0]);
      var reader = new FileReader();
      reader.onload = async (event: any) => {
        this.spinner.show()
        this._legalAnalysis.uploadVerificationDocument(base,
          this.selectedLegalItem.id, this.selectedLegalItem.document_type, this.customer_id, named)
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
  async showLegalVerificationDoc() {
    this.spinner.show();
    await this._analysisService.showLegalVerificationDocument(this.selectedLegalItem).toPromise()
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
    this._analysisService.downloadAnyDocument(this.selectedLegalItem.checklist_document_name,this.selectedLegalItem.checklist_document_key)
  }
}
