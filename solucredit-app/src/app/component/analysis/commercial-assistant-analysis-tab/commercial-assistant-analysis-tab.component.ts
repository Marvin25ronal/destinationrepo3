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
import { FormDocVW } from 'src/app/models/formdocvw.model';
import { InitialRelationDocVW } from 'src/app/models/initialrelationvw.model';
import { RequirementDocVW } from 'src/app/models/requirementdocvw.model';
import { ComplianceVerificationService } from 'src/app/services/analysis/compliance-verification.service';
import { AllAnalysisService } from 'src/app/services/analysis/all-analysis.service';
import { AnalysisService } from 'src/app/services/analysis/analysis.service';
import { ChecklistcommercialanalysisService } from 'src/app/services/analysis/checklistcommercialanalysis.service';
import { FormdocvwService } from 'src/app/services/analysis/formdocvw.service';
import { InitialrelationdocvwService } from 'src/app/services/analysis/initialrelationdocvw.service';
import { CommercialanalysisService, CommercialCheckListItem } from 'src/app/services/analysis/commercialanalysis.service';
import { RequirementdocvwService } from 'src/app/services/analysis/requirementdocvw.service';
import { VerificationdocvwService } from 'src/app/services/analysis/verificationdocsvw.service';
import { FilenameService } from 'src/app/services/data/filename.service';
import { AdviserService } from 'src/app/services/Maintenance/adviser.service';
import { MysqlService } from 'src/app/services/mysql/mysql.service';
import { Analysis, AnalysisOption } from 'src/Utils/constants';

@Component({
  selector: 'app-commercial-assistant-analysis-tab',
  templateUrl: './commercial-assistant-analysis-tab.component.html',
  styleUrls: ['./commercial-assistant-analysis-tab.component.scss']
})
export class CommercialAssistantAnalysisTabComponent implements OnInit {
  //Variables
  analysis_option = AnalysisOption
  listcommercialadviser: Adviser[] = []
  showMoveToForm: boolean = false
  showMoveToAssigment: boolean = false
  initCommercialAnalysis = false;
  commercialAnalysisSelected: CommercialAnalysis
  commercial_analysis_docs_valid = 0
  responsibleCommercialAnalysis: any;
  arraymodals = []
  dataDoc;
  id;

  checkListType;


  commercialAnalysisDataList: PaginationTableData = {
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
  pageCommercialAnalysis: number = 0

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
  showVerificationDocument?= new EventEmitter<CommercialCheckListItem>()

  @Output()
  downloadVerificationDocument?= new EventEmitter<CommercialCheckListItem>()


  //FORMS
  initCommercialAnalysisForm = new FormGroup({
    id_adviser: new FormControl("", [Validators.required])
  })
  updateCommercialAnalysisForm = new FormGroup({
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
  DataIRDocs: InitialRelationDocVW;
  dataRequestIRView: InitialRelationDocVW;
  actualIRDoc: any;
  DataFormDocs: FormDocVW;
  dataRequestFormView: FormDocVW;
  actualFormDoc: any;
  DataReqDocs: RequirementDocVW;
  dataRequestDocView: RequirementDocVW;
  actualReqDoc: any;
  almacenaIR: any;
  almacenaDocs: any;
  almacenaReq: any;
  selectedCommercialItem: CommercialCheckListItem
  constructor(
    private _adviserService: AdviserService,
    private toastr: ToastrService,
    private _legalAnalysis: AllAnalysisService,
    private modalService: NgbModal,
    private filenameS: FilenameService,
    private mysqlService: MysqlService,
    private spinner: NgxSpinnerService,
    private _VerificationService: VerificationdocvwService,
    private _CheckCA: ChecklistcommercialanalysisService,
    private _IRDocService: InitialrelationdocvwService,
    private _FormDocService: FormdocvwService,
    private _ReqDocService: RequirementdocvwService,
    private _complianceVerificationService: ComplianceVerificationService,
    private _commercialService: CommercialanalysisService

  ) { }

  async ngOnInit() {
    console.log(this.commercialAnalysisSelected);
    await this.getCommercialAdviser()
    await this.loadConfigurations()
    await this.getInitCommercialAnalysis()
    await this.getCommercialAnalysis()
    await this.getFormDocView()
    await this.getIRDocView()
    await this.getReqDocView()

    console.log('Ejecutando TAB ANALISIS COMERCIAL');
    console.log(this.pageCommercialAnalysis);
    console.log(this.dataCustomer.id_commercialanalysis);
  }
  loadConfigurations() {
    console.log(this.showViews)
    let find1 = this.showViews.find((item) => item == this.analysis_option.assigmentResponsable)
    let find2 = this.showViews.find((item) => item == this.analysis_option.form)
    if (find1 && this.pageCommercialAnalysis < 2) {
      this.pageCommercialAnalysis = 0
    }
    if (find2 && this.initCommercialAnalysis && this.pageCommercialAnalysis < 2) {
      this.pageCommercialAnalysis = 1
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
  getCommercialAdviser() {
    let sub = this._adviserService.getCommercialAdviser().pipe(
      map((response) => {
        console.log('#####')
        console.log(response)
        this.listcommercialadviser = response
        //buscar el responsable predeterminado
        for (let i = 0; i < this.listcommercialadviser.length; i++) {
          if (this.listcommercialadviser[i].is_default == 1) {
            this.initCommercialAnalysisForm.controls['id_adviser'].setValue(this.listcommercialadviser[i].id_adviser)
          }
        }
      }),
      catchError((err) => {
        this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
        return of();
      })
    ).subscribe(() => sub.unsubscribe())
  }
  changeView(input) {
    this.changePage.emit(input)
  }
  getInitCommercialAnalysis() {
    let sub = this._legalAnalysis.getInit(this.requestIdSelected, 'Comercial').pipe(
      map((response) => {
        this.initCommercialAnalysis = response
        if (response == true) {
          //tenemos que obtener la data necesaria para descargar el analysis legal
          //necesitamos saber el responsable
          this.getCommercialAnalysis()
          //
        }
      }),
      catchError((err) => {
        this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
        return of();
      })
    ).subscribe(() => sub.unsubscribe())
  }
  async getCommercialAnalysis() {
    let sub = this._legalAnalysis.getAnalysis(this.requestIdSelected, 'Comercial').pipe(
      map((response: CommercialAnalysis) => {
        console.log('EEE')
        console.log(response)
        if (response != null) {
          this.commercialAnalysisSelected = response
          this.commercial_analysis_docs_valid = +response.valid_documents
          this.updateCommercialAnalysisForm.controls['comment'].setValue(response.commercialanalysis_comment)
          this.getAllDocumentsCommercialAnalysis()
          this.getCommercialAnalysisResponsable()
        }
      }),
      catchError((err) => {
        this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
        return of();
      })
    ).subscribe(() => sub.unsubscribe())
  }
  getAllDocumentsCommercialAnalysis() {
    let sub = this._complianceVerificationService.listComplianceDocuments(this.commercialAnalysisSelected.id_commercialanalysis).pipe(
      map((response) => {
        this.commercialAnalysisDataList.data = response
      }),
      catchError((err) => {
        this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
        return of();
      })
    ).subscribe(() => sub.unsubscribe())
  }
  private getCommercialAnalysisResponsable() {
    let sub = this._legalAnalysis.getResponsable(this.commercialAnalysisSelected.id_commercialanalysis).pipe(
      map((response) => {
        console.log(response)
        this.responsibleCommercialAnalysis = response
      }),
      catchError((err) => {
        this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
        return of();
      })
    ).subscribe(() => sub.unsubscribe())
  }
  initCommercialAnalysisMethod() {
    let value = this.initCommercialAnalysisForm.value
    let reg: CommercialAnalysis = {
      id_request: this.requestIdSelected,
      id_customer: this.dataCustomer.customer_id,
      analysis_type: 1,
      analysis_status_id: 1
    }
    console.log(value)
    if (this.initCommercialAnalysis == false) {
      let sub = this._legalAnalysis.initAnalysis(reg, value.id_adviser).pipe(
        map((response) => {
          this.toastr.success('Éxito', 'Se ha iniciado el análisis Comercial');

          let newadviser: AdviserAnalysis = {
            id_adviser: value.id_adviser,
            id_commercialanalysis: response.id_commercialanalysis,
            priority: 1
          }
          let subs = this._legalAnalysis.addAdviser(newadviser, value.id_adviser).pipe(
            map((resp) => {
              console.log(resp)
              this.initCommercialAnalysis = true
              this.getCommercialAnalysis()
              this.getIRDocView()
              this.getFormDocView()
              this.getReqDocView()
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
      this._legalAnalysis.updateAdviser(this.requestIdSelected, value.id_adviser, Analysis.commercial_assistant_analysis, value.comment).toPromise().then(
        (response) => {
          this.toastr.success('Éxito', 'Se ha actualizado el analista de análisis comercial');
          this.getCommercialAnalysis()
        })
        .catch((e) => {
          this.toastr.error('erro', 'Ocurrió un error')
          console.log(e)
        })
    }
  }
  downloadCommercialAnalysisDocs() {
    this._legalAnalysis.downloadDocuments(this.commercialAnalysisSelected.id_commercialanalysis)
    this.toastr.success('Éxito', 'Se han descargado los documentos')
  }
  openModalUploadCommercialAnalysisDoc(targetModal) {
    this.targetUploadDocuments.emit('Comercial')
    //console.log(this.targetUploadDocuments)
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
          id_commercialanalisys: this.commercialAnalysisSelected.id_commercialanalysis,
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
              this.getCommercialAnalysis()
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
  tabs: string[] = []
  async openChecklistModal(modal, target) {
    this.spinner.show()
    const sub = this._commercialService.getCheckList(this.dataCustomer.customer_id, this.requestIdSelected).toPromise().then(
      (response) => {
        this.dataChecklistAnalysis.data = response
        debugger
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
    const sub = this._commercialService.getCheckList(this.dataCustomer.customer_id, this.requestIdSelected).toPromise().then(
      (response) => {
        this.dataChecklistAnalysis.data = response
      }
    )
    return sub
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
        this.getCommercialAnalysis()
      })
      .catch((err) => {
        this.toastr.error("Problemas con el servidor.", "Ha ocurrido un error")
        console.log(err)
      })
  }
  openReport() {
    this.addLastView.emit({ target: 'Comercial', page: this.pageCommercialAnalysis })
    this.changePage.emit(2)
    this.closeBtnClick()
  }
  returnview2() {
    this.returnview.emit()
    this.ngOnInit()
  }
  async getIRDocView() {
    debugger
    this._IRDocService.getDocs(this.requestIdSelected, 'Comercial').subscribe((c) => {
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
  async getFormDocView() {
    try {
      debugger
      console.log('Ejecutando Form');
      this._FormDocService.getDocs(this.requestIdSelected, 'Comercial').subscribe((c) => {
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
  async downloadDocIR() {
    console.log(this.actualIRDoc);
    this.almacenaIR = this.actualIRDoc.map(e => { return { key: e.s3key, document_name: e.filename } })
    console.log(this.actualIRDoc)
    this.mysqlService
      .downloadDocIR(this.dataCustomer.customer_id,this.requestIdSelected)
    this.toastr.success('Éxito', 'Se han descargado los documentos')
    this.toastr.info('La descarga puede tardar un poco...', 'Descarga en Proceso')
  }
  downloadDocForms() {
    console.log('DESCARGA DE DOCUMENTOS');
    //this.almacenaDocs = this.actualFormDoc.map(e => { return { key: e.s3key, document_name: e.filename } })
    this.mysqlService
      .downloadDocForm(this.dataCustomer.customer_id,this.requestIdSelected)
    this.toastr.success('Éxito', 'Se han descargado los documentos')
    this.toastr.info('La descarga puede tardar un poco...', 'Descarga en Proceso')
  }
  downloadDocRequirements() {
    this.almacenaReq = this.actualReqDoc.map(e => { return { key: e.s3key, document_name: e.filename } })
    console.log(this.almacenaReq)
    this.mysqlService
      .downloadDocReq(this.dataCustomer.customer_id,this.requestIdSelected)
    this.toastr.success('Éxito', 'Se han descargado los documentos')
    this.toastr.info('La descarga puede tardar un poco...', 'Descarga en Proceso')
  }
  deleteDocCA(doc) {
    this.mysqlService
      .deleteDocsCA(doc.id_uploaddocsca)
      .toPromise()
      .then(async (response) => {
        this.toastr.success("Se ha eliminado el Documento", "Documento Eliminado!")
        // this.ngOnInit();
        this.reloadDataModal()
        this.getCommercialAnalysis()

      })
      .catch((error) => {
        this.toastr.error("Problemas con el servidor.", "Ha ocurrido un error")
        console.log(error)
      })
  }
  saveUpdateCommercialAnalysisForm() {
    let data = this.updateCommercialAnalysisForm.value
    let sub = this._legalAnalysis.updateAnalysis(this.commercialAnalysisSelected.id_commercialanalysis, data.comment, data.valid_documents).pipe(
      map((response) => {
        this.commercialAnalysisSelected = response
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
    return false
  }
  checkSelectedCommercialItem(val) {
    this.selectedCommercialItem.verification = val
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
        this._commercialService.uploadVerificationDocument(base,
          this.selectedCommercialItem.id, this.selectedCommercialItem.document_type, this.dataCustomer.customer_id, named)
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
    this.showVerificationDocument.emit(this.selectedCommercialItem)
  }
  openCreateVerification(targetModal, data: CommercialCheckListItem) {
    this.selectedCommercialItem = data
    this.CreateVerificationForm.controls['comment'].setValue(data.comment)
    this.CreateVerificationForm.controls['verification'].setValue(
      (data.verification == null || data.verification == 0) ? false : true
    )
    this.openModal(targetModal)
  }
  async saveVerification() {
    this._commercialService.saveVerification(
      this.selectedCommercialItem.id,
      '',
      '',
      this.selectedCommercialItem.verification,
      this.CreateVerificationForm.controls['comment'].value,
      this.selectedCommercialItem.document_type
    ).toPromise().then(
      (response) => {
        this.toastr.success('Éxito', 'Se ha guardado la verificación')
        this.getCommercialAnalysis()
        this.closeBtnClick()
      }
    ).catch((err) => {
      console.log(err)
      this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
    })
  }
  downloadVerification() {
    this.downloadVerificationDocument.emit(this.selectedCommercialItem)
  }
  showCommercialVerificationDoc() {
    this.showVerificationDocument.emit(this.selectedCommercialItem)
  }
}
