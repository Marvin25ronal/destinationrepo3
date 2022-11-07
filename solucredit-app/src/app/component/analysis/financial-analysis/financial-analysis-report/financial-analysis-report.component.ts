import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PaginationTableData } from 'src/app/interfaces/ui/pagination-table.interface';
import { Adviser } from 'src/app/models/adviser.model';
import { AnalysisCheck } from 'src/app/models/analysis-check.model';
import { AnalysisType, CommercialAnalysis } from 'src/app/models/commercialanalysis.model';
import { User } from 'src/app/models/user.model';
import { ConfirmAlertService } from 'src/app/services/alerts/confirm-alert.service';
import { AllAnalysisService } from 'src/app/services/analysis/all-analysis.service';
import { AnalysisCheckService } from 'src/app/services/analysis/analysis-check.service';
import { CommercialanalysisService } from 'src/app/services/analysis/commercialanalysis.service';
import { LegalAnalysisService } from 'src/app/services/analysis/legal-analysis.service';
import { OperationsAreaReportService } from 'src/app/services/analysis/operations-area-report.service';
import { PdfService } from 'src/app/services/pdf.service';

@Component({
  selector: 'app-financial-analysis-report',
  templateUrl: './financial-analysis-report.component.html',
  styleUrls: ['./financial-analysis-report.component.scss']
})
export class FinancialAnalysisReportComponent implements OnInit {

  @Input()
  commercialAnalysisSelected: CommercialAnalysis

  @Input()
  dataCustomer

  @Input()
  lastRequest

  @Output()
  return_view = new EventEmitter()
  responsableAnalysis: Adviser
  checklistDoc: AnalysisCheck[];

  constructor(
    private _operationsAreaReportService: OperationsAreaReportService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private _pdfService: PdfService,
    private _allAnalysis: AllAnalysisService,
    private _CAService: CommercialanalysisService,
    private confirm_service: ConfirmAlertService,
    private _AnalysisCheck: AnalysisCheckService,
    private _legalAnalysisService: LegalAnalysisService,
  ) { }
  checkDocuments: number = 0
  customer: any;
  customerType: any;
  gerencialManager: any
  analysis: CommercialAnalysis
  analysisType: AnalysisType
  commentUpdoc;
  dataList: PaginationTableData = {
    metadata: [
      "No.",
      "Descripción",
      "Estado",
      "Verificado",
    ],
    data: [
    ]
  }

  updateCheck = new FormGroup(
    {
      verification: new FormControl("", [Validators.required])
    }
  )

  async ngOnInit() {
    this.commentUpdoc = 'Informe Análisis Financiero'
    console.log('Reporte Financiero');
    console.log(this.commercialAnalysisSelected);
    this.getGerencialManager()
    this.getChecklist()
    await this.getAllInfo()
  }

  async getAllInfo()
  {
    if(this.commercialAnalysisSelected)
    {
      await this.getType(this.commercialAnalysisSelected.id_commercialanalysis)
    }
  }

  onChangeCheck(doc, value)
  {
    console.log(doc);
   // console.log(this.updateCheck.controls['verification'].value);
    let data = {
      check_verification: value,
      check_id: doc.id_check
    }
    let sub1 = this._AnalysisCheck.update(data).pipe(map((response)=>
    {
      console.log(response);
      this.getChecklist()
    }),
    catchError((e)=>
    {
      console.log(e);
      return of();
    })
    ).subscribe(()=>sub1.unsubscribe())
  }

  async getGerencialManager() {
    let sub = this._allAnalysis.getResponsable(this.commercialAnalysisSelected.id_commercialanalysis).toPromise().then(
      (response) => {
        this.responsableAnalysis = response
        console.log(this.responsableAnalysis);
      }
    )
    return sub
  }

  async getChecklist()
  {
    let sub = this._AnalysisCheck.getCheckAnalysis(this.commercialAnalysisSelected.id_commercialanalysis).toPromise().then(
      (response) => {
        this.checklistDoc = response
        console.log(this.checklistDoc);
      }
    )
    return sub
  }

  onRoute() {
    this.return_view.emit()
  }

  async createPDF() {
    debugger
    this.spinner.show()
    let data = document.getElementById('templateInforme');
    await this._pdfService.createReportHTMLSave(data, this.analysisType.analysistype_name, this.commercialAnalysisSelected.id_commercialanalysis, this.commentUpdoc,()=>this.spinner.hide())

  }

  async showAlertConfirm() {
    const result = await this.confirm_service.showAlert();
    
    if (result.confirmed) {
      let result = this._CAService.getNextAdviser(this.commercialAnalysisSelected.id_commercialanalysis, this.analysisType.id_analysistype).toPromise().then(
        (response) => {
          this.toastr.success('Se ha informado al siguiente analista sobre la aprobación del análisis', 'Análisis Completado');
          let data: CommercialAnalysis = {
            id_commercialanalysis: this.commercialAnalysisSelected.id_commercialanalysis,
            analysis_status_id: 3,
            commercialanalysis_comment: this.commercialAnalysisSelected.commercialanalysis_comment,
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

  getDate() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    //@ts-ignore
    return new Date().toLocaleDateString('es-GT', options)
  }

  async getType(id: number) {
    const res = await this._legalAnalysisService.getType(id).toPromise().then((response) => {

      this.analysisType = response

    })
    return res
  }

}
