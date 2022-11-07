import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PaginationTableData } from 'src/app/interfaces/ui/pagination-table.interface';
import { AnalysisType, CommercialAnalysis } from 'src/app/models/commercialanalysis.model';
import { User } from 'src/app/models/user.model';
import { ConfirmAlertService } from 'src/app/services/alerts/confirm-alert.service';
import { CommercialanalysisService } from 'src/app/services/analysis/commercialanalysis.service';
import { LegalAnalysisService } from 'src/app/services/analysis/legal-analysis.service';
import { OperationsAreaReportService } from 'src/app/services/analysis/operations-area-report.service';
import { PdfService } from 'src/app/services/pdf.service';

@Component({
  selector: 'app-operations-area-report',
  templateUrl: './operations-area-report.component.html',
  styleUrls: ['./operations-area-report.component.scss']
})
export class OperationsAreaReportComponent implements OnInit {
  @Input()
  operationsAreaReportSelected: CommercialAnalysis

  @Input()
  dataCustomer

  @Input()
  lastRequest

  @Output()
  return_view = new EventEmitter()



  constructor(
    private _operationsAreaReportService: OperationsAreaReportService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private _pdfService: PdfService,
    private _legalAnalysisService: LegalAnalysisService,
    private _CAService: CommercialanalysisService,
    private confirm_service: ConfirmAlertService,
  ) { }
  checkDocuments: number = 0
  customer: any;
  customerType: any;
  gerencialManager: User = null
  analysis: CommercialAnalysis
  analysisType: AnalysisType
  commentUpdoc;
  dataList: PaginationTableData = {
    metadata: [
      "No.",
      "Nombre Documento",
      "Requisito",
      "Comentario",
      "Verificado",
    ],
    data: [
      {
        name: 'Historial de autorizaciones',
        responsable: 'Solucredit-APP',
        approvation_date: new Date()
      }
    ]
  }
  async ngOnInit() {
    this.commentUpdoc = 'Informe Área de Operaciones'
    this.spinner.show()
    await this.getAllInfo()
    this.spinner.hide()
  }
  async getAllInfo() {
    await this.getGerencialManager()

    if (this.operationsAreaReportSelected) {
      this.checkDocuments = +this.operationsAreaReportSelected.valid_documents
      await this.getType(this.operationsAreaReportSelected.id_commercialanalysis)
    }
  }
  async getGerencialManager() {
    let sub = this._operationsAreaReportService.getGerencialManager().toPromise().then(
      (response) => {
        this.gerencialManager = response
      }
    )
    return sub
  }
  onRoute() {
    this.return_view.emit()
  }
  getGerencialName() {
    if (this.gerencialManager) {
      return this.gerencialManager.firstname + ' ' + this.gerencialManager.lastname
    }
    return 'No asignado'
  }
  getDate() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    //@ts-ignore
    return new Date().toLocaleDateString('es-GT', options)
  }
  async createPDF() {
    this.spinner.show()
    let data = document.getElementById('templateInforme');
    await this._pdfService.createReportHTMLSave(data, this.analysisType.analysistype_name, this.operationsAreaReportSelected.id_commercialanalysis, this.commentUpdoc,()=>this.spinner.hide())

  }
  async getType(id: number) {
    const res = await this._legalAnalysisService.getType(id).toPromise().then(
      (response) => {
        this.analysisType = response
      }
    )
    return res
  }
  async showAlertConfirm() {
    const result = await this.confirm_service.showAlert();
    
    if (result.confirmed) {
      let result = this._CAService.getNextAdviser(this.operationsAreaReportSelected.id_commercialanalysis, this.analysisType.id_analysistype).toPromise().then(
        (response) => {
          this.toastr.success('Se ha informado al siguiente analista sobre la aprobación del análisis', 'Análisis Completado');
          let data: CommercialAnalysis = {
            id_commercialanalysis: this.operationsAreaReportSelected.id_commercialanalysis,
            analysis_status_id: 3,
            commercialanalysis_comment: this.operationsAreaReportSelected.commercialanalysis_comment,
            approval_date: new Date()
          }
          this._CAService.updateCA(data).pipe(
            map((resp) => {
              this.toastr.success('Análisis Completado', `Se ha cambiado el estado del análisis ${this.analysisType.analysistype_name}`);
            }),
            catchError((err) => {
              this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
              return of();
            })
          ).subscribe()
        }
      )
    }
  }
}
