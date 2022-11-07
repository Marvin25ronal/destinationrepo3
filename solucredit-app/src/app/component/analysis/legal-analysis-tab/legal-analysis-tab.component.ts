import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PaginationTableData } from 'src/app/interfaces/ui/pagination-table.interface';
import { Adviser, AdviserAnalysis } from 'src/app/models/adviser.model';
import { CheckListCommercialAnalysis } from 'src/app/models/checklistcommercialanalysis.model';
import { CommercialAnalysis } from 'src/app/models/commercialanalysis.model';
import { AnalysisService } from 'src/app/services/analysis/analysis.service';
import { ChecklistcommercialanalysisService } from 'src/app/services/analysis/checklistcommercialanalysis.service';
import { LegalAnalysisService, LegalCheckListItem } from 'src/app/services/analysis/legal-analysis.service';
import { VerificationdocvwService } from 'src/app/services/analysis/verificationdocsvw.service';
import { FilenameService } from 'src/app/services/data/filename.service';
import { AdviserService } from 'src/app/services/Maintenance/adviser.service';
import { MysqlService } from 'src/app/services/mysql/mysql.service';
import { Analysis, AnalysisOption } from 'src/Utils/constants';

@Component({
  selector: 'app-legal-analysis-tab',
  templateUrl: './legal-analysis-tab.component.html',
  styleUrls: ['./legal-analysis-tab.component.scss']
})
export class LegalAnalysisTabComponent implements OnInit {
  //Variables
  analysis_option = AnalysisOption
  listlegaladviser: Adviser[] = []
  showMoveToForm: boolean = false
  showMoveToAssigment: boolean = false
  initLegalAnalysis = false;
  legalAnalysisSelected: CommercialAnalysis
  legal_analysis_docs_valid = 0
  responsibleLegalAnalysis: any;
  arraymodals = []
  dataDoc;

  checkListType;
  selectedLegalItem: LegalCheckListItem

  legalAnalysisDataList: PaginationTableData = {
    data: [],
    metadata: [
      'Nombre',
      'Comentario',
      'Acciones'
    ]
  }
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

  //Entradas y salidas
  @Input()
  showViews: string[] = []

  @Input()
  pageLegalAnalysis: number = 0

  @Input()
  requestIdSelected = -1

  @Input()
  dataCustomer



  @Output()
  changePage?= new EventEmitter<number>()

  @Output()
  targetUploadDocuments?= new EventEmitter<string>()

  @Output()
  showDocuments?= new EventEmitter<any>()

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
  showLegalVerificationDocument?= new EventEmitter<LegalCheckListItem>()

  @Output()
  downloadVerificationDocument?= new EventEmitter<LegalCheckListItem>()


  showDescription = ''
  //FORMS
  initLegalAnalysisForm = new FormGroup({
    id_adviser: new FormControl("", [Validators.required]),
    comment: new FormControl("", [Validators.required])
  })
  updateLegalAnalysisForm = new FormGroup({
    comment: new FormControl("", [Validators.required]),
    valid_documents: new FormControl("", [Validators.required])
  })
  FormUploadDocumentsCA = new FormGroup({
    uploaddocsca_comment: new FormControl("", [Validators.required]),
  });
  FormCheckListCA = new FormGroup({
    checklist_comment: new FormControl("", [Validators.required]),
  });
  FormCheckListRD = new FormGroup({
    checklist_comment: new FormControl("", [Validators.required]),
  });
  CreateVerificationForm = new FormGroup({
    comment: new FormControl("", [Validators.required]),
    verification: new FormControl(false, [Validators.required])
  })

  constructor(
    private _adviserService: AdviserService,
    private toastr: ToastrService,
    private _legalAnalysis: LegalAnalysisService,
    private modalService: NgbModal,
    private filenameS: FilenameService,
    private mysqlService: MysqlService,
    private spinner: NgxSpinnerService,
    private _VerificationService: VerificationdocvwService,
    private _CheckCA: ChecklistcommercialanalysisService,
  ) { }
  async ngOnInit() {
    this.spinner.show()
    await this.getLegalAdviser()
    await this.getInitLegalAnalysis()
    await this.loadConfigurations()
    this.spinner.hide()
  }
  loadConfigurations() {

    console.log(this.showViews)

    let find1 = this.showViews.find((item) => item == this.analysis_option.assigmentResponsable)
    let find2 = this.showViews.find((item) => item == this.analysis_option.form)
    if (find1 && this.pageLegalAnalysis < 2) {
      this.changePage.emit(0)
    }
    if (find2 && this.initLegalAnalysis && this.pageLegalAnalysis < 2) {
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
  getLegalAdviser() {
    let sub = this._adviserService.getLegalAdviser().toPromise().then(
      (response) => {
        console.log('#####')
        console.log(response)
        this.listlegaladviser = response
        //buscar el responsable predeterminado
        for (let i = 0; i < this.listlegaladviser.length; i++) {
          if (this.listlegaladviser[i].is_default == 1) {
            this.initLegalAnalysisForm.controls['id_adviser'].setValue(this.listlegaladviser[i].id_adviser)
          }
        }
      }
    ).catch((e) => {
      console.log(e)
    })
    return sub
  }
  changeView(input) {
    this.changePage.emit(input)
  }
  async getInitLegalAnalysis() {
    let sub = this._legalAnalysis.getInit(this.requestIdSelected).toPromise().then(
      async (response) => {
        this.initLegalAnalysis = response
        if (response == true) {
          //tenemos que obtener la data necesaria para descargar el analysis legal
          //necesitamos saber el responsable
          await this.getLegalAnalysis()
          //
        }
      }

    ).catch((err) => {
      this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
    })
    return sub
  }
  async getLegalAnalysis() {
    let sub = this._legalAnalysis.getAnalysis(this.requestIdSelected).toPromise().then(
      async (response: CommercialAnalysis) => {
        console.log('EEE')
        console.log(response)
        this.legalAnalysisSelected = response
        this.legal_analysis_docs_valid = +response.valid_documents
        this.updateLegalAnalysisForm.controls['comment'].setValue(response.commercialanalysis_comment)
        await this.getAllDocumentsLegalAnalysis()
        await this.getLegalAnalysisResponsable()
      }
    ).catch((err) => {
      console.log(err)
      this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
    })
    return sub
  }
  async getAllDocumentsLegalAnalysis() {
    let sub = this._legalAnalysis.listLegalDocuments(this.legalAnalysisSelected.id_commercialanalysis).toPromise().then(
      (response) => {
        this.legalAnalysisDataList.data = response
      }
    ).catch((err) => {
      console.log(err)
      this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
    })
    return sub
  }
  async getLegalAnalysisResponsable() {
    let sub = this._legalAnalysis.getResponsable(this.legalAnalysisSelected.id_commercialanalysis).toPromise().then(
      (response) => {
        console.log(response)
        this.responsibleLegalAnalysis = response
      }
    ).catch((err) => {
      console.log(err)
      this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
    })
    return sub
  }
  initLegalAnalysisMethod() {
    let value = this.initLegalAnalysisForm.value
    let reg: CommercialAnalysis = {
      id_request: this.requestIdSelected,
      id_customer: this.dataCustomer.customer_id,
      commercialanalysis_comment: value.comment,
    }
    console.log(value)
    if (this.initLegalAnalysis == false) {
      let sub = this._legalAnalysis.initLegalAnalysis(reg, value.id_adviser).pipe(
        map((response) => {
          this.toastr.success('Éxito', 'Se ha iniciado el análisis legal');

          let newadviser: AdviserAnalysis = {
            id_adviser: value.id_adviser,
            id_commercialanalysis: response.id_commercialanalysis,
            priority: 1
          }
          let subs = this._legalAnalysis.addAdviser(newadviser, value.id_adviser).pipe(
            map((resp) => {
              console.log(resp)
              this.initLegalAnalysis = true
              this.getLegalAnalysis()
            }),
            catchError((err) => {
              this.toastr.error('error', 'Ocurrió un error');
              console.log(err);
              return of();
            })
          ).subscribe(() => subs.unsubscribe())
        }),
        catchError((err) => {
          //this.spinner.hide();
          this.toastr.error('error', 'Ocurrió un error');
          console.log(err);
          return of();
        })
      ).subscribe(() => sub.unsubscribe())
    } else {
      //asignamos de nuevo al responsable
      this._legalAnalysis.updateAdviser(this.requestIdSelected, value.id_adviser, Analysis.legal_analysis, value.comment).toPromise().then(
        (response) => {
          this.toastr.success('Éxito', 'Se ha actualizado el analista de análisis legal');
          this.getLegalAnalysis()
        })
        .catch((e) => {
          this.toastr.error('erro', 'Ocurrió un error')
          console.log(e)
        })
    }
  }
  downloadLegalAnalysisDocs() {
    this._legalAnalysis.downloadDocuments(this.requestIdSelected,this.dataCustomer.customer_id)
    this.toastr.success('Éxito', 'Se han descargado los documentos')
    this.toastr.info('La descarga puede tardar un poco...', 'Descarga en Proceso')
  }
  openModalUploadLegalAnalysisDoc(targetModal) {
    this.targetUploadDocuments.emit('Legal')
    //console.log(this.targetUploadDocuments)
    this.FormUploadDocumentsCA.reset({});
    this.openModal(targetModal)
  }
  openCreateVerification(targetModal, data: LegalCheckListItem) {
    this.selectedLegalItem = data
    this.CreateVerificationForm.controls['comment'].setValue(data.comment)
    this.CreateVerificationForm.controls['verification'].setValue(
      (data.verification == null || data.verification == 0) ? false : true
    )
    this.openModal(targetModal)
  }
  openModal(targetModal) {
    this.arraymodals.push(
      this.modalService.open(targetModal, {
        centered: true,
        backdrop: 'static',
        keyboard: false,
        windowClass: 'my-modal',
      })
    )
  }
  checkSelectedLegalItem(val) {
    this.selectedLegalItem.verification = val
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
        this._legalAnalysis.uploadVerificationDocument(base,
          this.selectedLegalItem.id, this.selectedLegalItem.document_type, this.dataCustomer.customer_id, named)
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
              this.getLegalAnalysis()
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
  showLegalVerificationDoc() {
    this.showLegalVerificationDocument.emit(this.selectedLegalItem)
  }
  downloadDocument(doc) {
    this.downloadDocuments.emit(doc)
  }
  showChecklistDocumentM(doc) {
    this.showChecklistDocument.emit(doc)
  }















  tabs: string[] = []
  async openChecklistModal(modal, target) {
    this.spinner.show()
    const sub = this._legalAnalysis.getCheckList(this.requestIdSelected, this.dataCustomer.customer_id).toPromise().then(
      (response) => {
        this.dataChecklistAnalysis.data = response
        this.tabs = [...new Set(response.map(item => item.document_type))]
        this.openModal(modal)
      }
    )
    this.spinner.hide()
    return sub
  }
  openModalUploadDocCheck(targetModal, ver) {
    console.log('Modal Checklist');
    this.FormCheckListRD.reset({});
    this.dataDoc = ver;
    this.openModal(targetModal)
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
            checklist_verification: 1
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
          checklist_verification: 0
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

  async reloadDataModal() {
    const sub = this._legalAnalysis.getCheckList(this.requestIdSelected, this.dataCustomer.customer_id).toPromise().then(
      (response) => {
        this.dataChecklistAnalysis.data = response
      }
    )
    return sub
  }
  async uploadDocCheckList(event) {
    if (event.target.files && event.target.files[0]) {
      this.spinner.show()
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
              this.spinner.hide()
            }),
            catchError((err) => {
              this.toastr.error(
                'Error',
                'Ha ocurrido un problema con la conexión ' + err
              );
              console.log(err);
              this.spinner.hide()
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
        this.getLegalAnalysis()
      })
      .catch((err) => {
        this.toastr.error("Problemas con el servidor.", "Ha ocurrido un error")
        console.log(err)
      })
  }
  openReport() {
    this.addLastView.emit({ target: 'Legal', page: this.pageLegalAnalysis })
    this.changePage.emit(2)
    this.closeBtnClick()
  }
  returnview2() {
    this.returnview.emit()
    this.ngOnInit()
  }
  deleteDocCA(doc) {
    this.mysqlService
      .deleteDocsCA(doc.id_uploaddocsca)
      .toPromise()
      .then(async (response) => {
        this.toastr.success("Se ha eliminado el Documento", "Documento Eliminado!")
        // this.ngOnInit();
        this.reloadDataModal()
        this.getLegalAnalysis()

      })
      .catch((error) => {
        this.toastr.error("Problemas con el servidor.", "Ha ocurrido un error")
        console.log(error)
      })
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
  openShowDescription(modal, description) {
    this.showDescription = description
    this.openModal(modal)
  }
  changeVerificationsDocsLegalAnalysis(event) {
    console.log(event)
    this.updateLegalAnalysisForm.controls['valid_documents'].setValue(event)
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
  downloadVerification() {
    this.downloadVerificationDocument.emit(this.selectedLegalItem)
  }
}
