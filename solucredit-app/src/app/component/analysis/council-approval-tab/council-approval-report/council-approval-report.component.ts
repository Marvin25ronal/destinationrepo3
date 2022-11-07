import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PaginationTableData } from 'src/app/interfaces/ui/pagination-table.interface';
import { AnalysisType, CommercialAnalysis } from 'src/app/models/commercialanalysis.model';
import { CouncilMember } from 'src/app/models/councilmember.model';
import { ConfirmAlertService } from 'src/app/services/alerts/confirm-alert.service';
import { CommercialanalysisService } from 'src/app/services/analysis/commercialanalysis.service';
import { CouncilApprovalService } from 'src/app/services/analysis/council-approval.service';
import { LegalAnalysisService } from 'src/app/services/analysis/legal-analysis.service';
import { PdfService } from 'src/app/services/pdf.service';
import { ExpresionFormatDate } from 'src/Utils/constants';

@Component({
  selector: 'app-council-approval-report',
  templateUrl: './council-approval-report.component.html',
  styleUrls: ['./council-approval-report.component.scss']
})
export class CouncilApprovalReportComponent implements OnInit {

  @Input()
  councilApprovalSelected: CommercialAnalysis

  @Input()
  dataCustomer

  @Input()
  lastRequest

  @Output()
  return_view = new EventEmitter()

  customer: any;
  customerType: any;
  expresionDate = ExpresionFormatDate
  representative: CouncilMember
  analysis: CommercialAnalysis
  commentUpdoc;
  analysisType: AnalysisType
  dataList: PaginationTableData = {
    metadata: [
      "#",
      "No.",
      "Autorización legal",
      "Fecha de autorización",
      "Autorización comercial",
      "Fecha de autorización",
      "Monto",
      "Tasa",
      "Días de garantía",
      "Aprobado",
      "Historial",
      "Estado",
      "Acciones"
    ],
    data: [
      {
        document: 101,
        legal_autorization: 'Luis Pérez',
        legal_autorization_date: new Date(),
        comercial_autorization: 'Daniel García',
        comercial_autorization_date: new Date(),
        amount: '10,000',
        rate: 0.05,
        warranty_days: 2,
        aproval: '20%',
        history: '60',
        check: 0,
      }
    ]
  }
  dataList2: PaginationTableData = {
    metadata: [
      '#',
      'Operación',
      'Cliente',
      'Monto',
      'Condiciones',
      'Deudores',
      'Dirección',
      'Aprobado'
    ],
    data: [
      {
        operation: '2',
        client: 'Luis Peréz',
        amount: '10,000',
        conditions: 'condiciones',
        deudores: 'Ana Rodas',
        address: "15 avenida 12-00 Zona 13",
        check: 1
      }
    ]
  }
  constructor(
    private _councilApproval: CouncilApprovalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private _pdfService: PdfService,
    private _legalAnalysisService: LegalAnalysisService,
    private confirm_service: ConfirmAlertService,
    private _CAService: CommercialanalysisService,
  ) { }

  async ngOnInit() {
    this.commentUpdoc = 'Informe Autorización de consejo'
    this.spinner.show()
    await this.getAllInfo()
    this.spinner.hide()

  }
  async getAllInfo() {
    await this.getRepresentative()

    if (this.councilApprovalSelected) {
      await this.getType(this.councilApprovalSelected.id_commercialanalysis)
    }
  }
  async getRepresentative() {
    let sub = this._councilApproval.getRepresentative().toPromise().then((response) => {
      this.representative = response.body.data
    })
    return sub
  }
  async getType(id: number) {
    const res = await this._legalAnalysisService.getType(id).toPromise().then((response) => {

      this.analysisType = response

    })
    return res
  }
  onRoute() {
    this.return_view.emit()
  }
  getRep() {
    if (this.representative) {
      return this.representative.council_full_name
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
    await this._pdfService.createReportHTMLSave(data, this.analysisType.analysistype_name, this.councilApprovalSelected.id_commercialanalysis, this.commentUpdoc, () => this.spinner.hide())

  }
  async showAlertConfirm() {
    const result = await this.confirm_service.showAlert();
    if (result.confirmed) {
      let result = this._CAService.getNextAdviser(this.councilApprovalSelected.id_commercialanalysis, this.analysisType.id_analysistype).toPromise().then(
        (response) => {
          this.toastr.success('Se ha informado al siguiente analista sobre la aprobación del análisis', 'Análisis Completado');
          let data: CommercialAnalysis = {
            id_commercialanalysis: this.councilApprovalSelected.id_commercialanalysis,
            analysis_status_id: 3,
            commercialanalysis_comment: this.councilApprovalSelected.commercialanalysis_comment,
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
