import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PaginationTableData } from 'src/app/interfaces/ui/pagination-table.interface';
import { Adviser, AdviserAnalysis } from 'src/app/models/adviser.model';
import { AnalysisType, CommercialAnalysis } from 'src/app/models/commercialanalysis.model';
import { AnalysisOption } from 'src/Utils/constants';
import { AllAnalysisService } from 'src/app/services/analysis/all-analysis.service';
import { AdviserService } from 'src/app/services/Maintenance/adviser.service';
import { catchError, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FilenameService } from 'src/app/services/data/filename.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MysqlService } from 'src/app/services/mysql/mysql.service';
import { PdfService } from 'src/app/services/pdf.service';
import { LegalAnalysisService } from 'src/app/services/analysis/legal-analysis.service';

@Component({
  selector: 'app-financial-analysis',
  templateUrl: './financial-analysis.component.html',
  styleUrls: ['./financial-analysis.component.scss']
})
export class FinancialAnalysisComponent implements OnInit {


  analysis_option = AnalysisOption
  initCommercialAnalysis = false;
  showMoveToForm: boolean = false
  showMoveToAssigment: boolean = false
  listcommercialadviser: Adviser[] = []
  commercialAnalysisSelected: CommercialAnalysis
  commercial_analysis_docs_valid = 0
  responsibleCommercialAnalysis: any;
  arraymodals = []
  dataDoc;
  id;
  checkListType;
  
  @Input()
  pageFinancialAnalysis: number = 0

  @Input()
  requestIdSelected = -1

  @Input()
  dataCustomer

  @Input()
  lastRequest

  @Input()
  showViews: string[] = []

  @Output()
  changePage?= new EventEmitter<number>()

  @Output()
  returnview?= new EventEmitter<any>()

  @Output()
  addLastView?= new EventEmitter<any>()

  @Output()
  showDocuments?= new EventEmitter<any>()

  @Output()
  targetUploadDocuments?= new EventEmitter<string>()

  @Output()
  downloadDocuments?= new EventEmitter<any>()

  @Output()
  showChecklistDocument?= new EventEmitter<any>()

  previous_operation: boolean = false
  operations_area_report_docs_valid = 0;

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

  operations_area_report_dataList: PaginationTableData = {
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

  OperationsAreaReportList: PaginationTableData = {
    data: [
    ],
    metadata: [
      'Nombre',
      'Comentario',
      'Acciones',
    ]
  }
  updateFinancialAnalysisForm = new FormGroup({
    comment: new FormControl("", [Validators.required]),
    valid_documents: new FormControl("", [Validators.required])
  })

  initCommercialAnalysisForm = new FormGroup({
    id_adviser: new FormControl("", [Validators.required])
  })
  FormUploadDocumentsCA = new FormGroup({
    uploaddocsca_comment: new FormControl("", [Validators.required]),
  });
  responsableFinancial: Adviser;
  actualDocument: any;
  analysisResponsable: Adviser;
  analysisType: AnalysisType;
  commentUpdoc: string;

  constructor(
    private _adviserService: AdviserService,
    private AnalysisService: AllAnalysisService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private filenameS: FilenameService,
    private spinner: NgxSpinnerService,
    private mysqlService: MysqlService,
    private _pdfService: PdfService,
    private _legalAnalysisService: LegalAnalysisService,
  ) { }

  async ngOnInit(){
    this.spinner.show()
    console.log(this.requestIdSelected);
    console.log('Analisis Financiero');
    this.loadConfigurations();
    await this.getAnalysis();
    await this.getInitAnalysis();
    console.log(this.commercialAnalysisSelected);
    console.log(this.OperationsAreaReportList);
    console.log(this.analysisResponsable);
    
  }

  changeView(input) {
    this.changePage.emit(input)
  }
  returnview2() {
    this.returnview.emit()
    this.ngOnInit()
  }
  showReport() {
    console.log('Mandando a Report Financiero');
    this.addLastView.emit({ target: 'Financiero', page: this.pageFinancialAnalysis })
    this.changeView(1)
  }

  getFinancialAdviser() {
    let sub = this._adviserService.getFinancialAdviser().pipe(
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

   async getResponsable(){
    const res = this.AnalysisService.getResponsable(this.commercialAnalysisSelected.id_commercialanalysis).toPromise().then(
      (response) => {
        this.analysisResponsable = response
      }
    )
    return res
  }
  openModalUploadFinancialAnalysisDoc(targetModal) {
    this.targetUploadDocuments.emit('Financiero')
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

  getInitAnalysis() {
    let sub = this.AnalysisService.getInit(this.requestIdSelected, 'Financiero').pipe(
      map((response) => {
        this.initCommercialAnalysis = response
        if (response == true) {
          //tenemos que obtener la data necesaria para descargar el analysis legal
          //necesitamos saber el responsable
          
          this.getAnalysis()
          //
        }
        this.spinner.hide()
      }),
      catchError((err) => {
        this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
        return of();
      })
    ).subscribe(() => sub.unsubscribe())
  }

  async getAnalysis() {
    let sub = this.AnalysisService.getAnalysis(this.requestIdSelected, 'Financiero').pipe(
      map((response: CommercialAnalysis) => {
        console.log(' - - - - MANDANDO ANALYSYS - - - - ')
        console.log(response)
        if (response != null) {
          this.commercialAnalysisSelected = response
          this.commercial_analysis_docs_valid = +response.valid_documents
          this.updateFinancialAnalysisForm.controls['comment'].setValue(response.commercialanalysis_comment)
          let sub = this.AnalysisService.getResponsable(response.id_commercialanalysis).pipe(
            map((response)=>
            {
              console.log(' - - - - - Responsable Financiero - - - - -');
              this.responsableFinancial = response
              console.log(this.responsableFinancial);
              this.getResponsable();
              let docs = this.AnalysisService.listLegalDocuments(this.commercialAnalysisSelected.id_commercialanalysis).pipe(
                map((response)=>
                {
                  this.OperationsAreaReportList.data = response
                }),
                catchError((error)=>
                {
                  console.log(error, 'Error en Documentos');
                  return of()
                })
              ).subscribe(()=> docs.unsubscribe())
            }),
            catchError((err) =>
            {
              console.log(err);
              return of();
            })
          ).subscribe(() => sub.unsubscribe())
        }
      }),
      catchError((err) => {
        this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
        return of();
      })
    ).subscribe(() => sub.unsubscribe())
  }

  loadConfigurations() {
    let find1 = this.showViews.find((item) => item == this.analysis_option.assigmentResponsable)
    let find2 = this.showViews.find((item) => item == this.analysis_option.form)
    if (find1 && this.pageFinancialAnalysis < 2) {
      this.pageFinancialAnalysis = 0
    }
    if (find2 && this.initCommercialAnalysis && this.pageFinancialAnalysis < 2) {
      this.pageFinancialAnalysis = 1
    }
    if (find1 && find2) {
      this.showMoveToForm = true
      this.showMoveToAssigment = true
    }
  }

  UpdateAnalysisForm() {
    let data = this.updateFinancialAnalysisForm.value
    let sub = this.AnalysisService.updateAnalysis(this.commercialAnalysisSelected.id_commercialanalysis, data.comment, data.valid_documents).pipe(
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

  openReport() {
    this.addLastView.emit({ target: 'Financiero', page: this.pageFinancialAnalysis })
    console.log('Mandando a Financiero');
    this.changePage.emit(1)
    this.closeBtnClick()
  }

  FormCheckListCA = new FormGroup({
    checklist_comment: new FormControl("", [Validators.required]),
  });

  closeBtnClick() {
    console.log('Se va a cerrar el modal');
    if (this.arraymodals.length > 0)
      this.arraymodals.pop().close()
    else
      this.modalService.dismissAll()
  }

  openModalComment(modal, object) {
    this.actualDocument = object
    console.log(object)
    this.FormCheckListCA.controls['checklist_comment'].setValue(object.comment == '0' ? '' : object.comment)
    this.openModal(modal)
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
              this.getAnalysis()
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

  showDocument(doc) {
    this.showDocuments.emit(doc)
  }
  downloadDocument(doc) {
    this.downloadDocuments.emit(doc)
  }
  showChecklistDocumentM(doc) {
    this.showChecklistDocument.emit(doc)
  }

  deleteDocCA(doc) {
    this.mysqlService
      .deleteDocsCA(doc.id_uploaddocsca)
      .toPromise()
      .then(async (response) => {
        this.toastr.success("Se ha eliminado el Documento", "Documento Eliminado!")
        // this.ngOnInit();
        this.reloadDataModal()
        this.getAnalysis()

      })
      .catch((error) => {
        this.toastr.error("Problemas con el servidor.", "Ha ocurrido un error")
        console.log(error)
      })
  }
  async reloadDataModal() {
    const sub = this.AnalysisService.getCheckList(this.commercialAnalysisSelected.id_commercialanalysis).toPromise().then(
      (response) => {
        this.dataChecklistAnalysis.data = response
      }
    )
    return sub
  }
  
  downloadFinancialAnalysisDocs() {
    this.AnalysisService.downloadDocumentsFinancial(this.dataCustomer.customer_id,this.requestIdSelected)
    this.toastr.success('Éxito', 'Se han descargado los documentos')
    this.toastr.info('La descarga puede tardar un poco...', 'Descarga en Proceso')
  }

  async createPDF() {
    debugger
    this.commentUpdoc = 'Informe Análisis Financiero'
    this.spinner.show()
    let data = document.getElementById('templateInforme');
    await this._pdfService.createReportHTMLSave(data, this.analysisType.analysistype_name, this.commercialAnalysisSelected.id_commercialanalysis, 'Financiero', () => this.spinner.hide())
  }

  async getType(id: number) {
    const res = await this._legalAnalysisService.getType(id).toPromise().then((response) => {

      this.analysisType = response

    })
    return res
  }
}
