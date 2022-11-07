import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdviserService } from 'src/app/services/Maintenance/adviser.service';
import { Analysis, AnalysisOption } from 'src/Utils/constants';
import { catchError, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { Adviser, AdviserAnalysis } from 'src/app/models/adviser.model';
import { CommercialAnalysis } from 'src/app/models/commercialanalysis.model';
import { AllAnalysisService } from 'src/app/services/analysis/all-analysis.service';
import { AnalysisCheckService } from 'src/app/services/analysis/analysis-check.service';
import { AnalysisCheck } from 'src/app/models/analysis-check.model';


@Component({
  selector: 'app-analysis-area-transfer',
  templateUrl: './analysis-area-transfer.component.html',
  styleUrls: ['./analysis-area-transfer.component.scss']
})
export class AnalysisAreaTransferComponent implements OnInit {

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
  pageAnalysisAreaTransfer: number = 0

  @Input()
  requestIdSelected = -1

  @Input()
  dataCustomer

  @Input()
  showViews: string[] = []


  constructor(
    private _adviserService: AdviserService,
    private toastr: ToastrService,
    private AnalysisService: AllAnalysisService,
    private _AnalysisCheck: AnalysisCheckService
  ) { }

  async ngOnInit(){
    console.log('Traslado Area de Analisis');
    console.log(this.requestIdSelected);
    this.loadConfigurations()
    this.getAnalysis()
    this.getInitAnalysis()
    await this.getFinancialAdviser()
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

  initCommercialAnalysisForm = new FormGroup({
    id_adviser: new FormControl("", [Validators.required])
  })

  disableView(view: string) {
    let find = this.showViews.find(item => item == view)
    if (find)
      return false
    return true
  }

  loadConfigurations() {
    let find1 = this.showViews.find((item) => item == this.analysis_option.assigmentResponsable)
    let find2 = this.showViews.find((item) => item == this.analysis_option.form)
    if (find1 && this.pageAnalysisAreaTransfer < 2) {
      this.pageAnalysisAreaTransfer = 0
    }
    if (find2 && this.initCommercialAnalysis && this.pageAnalysisAreaTransfer < 2) {
      this.pageAnalysisAreaTransfer = 1
    }
    if (find1 && find2) {
      this.showMoveToForm = true
      this.showMoveToAssigment = true
    }
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
        console.log('EEE')
        console.log(response)
        if (response != null) {
          this.commercialAnalysisSelected = response
          this.commercial_analysis_docs_valid = +response.valid_documents
        }
      }),
      catchError((err) => {
        this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
        return of();
      })
    ).subscribe(() => sub.unsubscribe())
  }

  initAnalysisMethod() {
    let value = this.initCommercialAnalysisForm.value
    let reg: CommercialAnalysis = {
      id_request: this.requestIdSelected,
      id_customer: this.dataCustomer.customer_id,
      analysis_type: 8,
      analysis_status_id: 1
    }
    console.log(value)
    if (this.initCommercialAnalysis == false) {
      let sub = this.AnalysisService.initAnalysis(reg, value.id_adviser).pipe(
        map((response) => {
          this.toastr.success('Éxito', 'Se ha Asignado el Análisis Financiero');

          let newadviser: AdviserAnalysis = {
            id_adviser: value.id_adviser,
            id_commercialanalysis: response.id_commercialanalysis,
            priority: 1
          }
          let subs = this.AnalysisService.addAdviser(newadviser, value.id_adviser).pipe(
            map((resp) => {
              console.log(resp)
              this.initCommercialAnalysis = true
              this.getAnalysis()
              let analysis: any = {
                id_commercialanalysis: response.id_commercialanalysis,
                id_request: response.id_request,
                analysis_type: response.analysis_type
              }
              let sub1 = this._AnalysisCheck.createCheck(analysis).pipe(map((response)=>
              {
                console.log(response);
              }),
              catchError((e)=>
              {
                console.log(e);
                return of();
              })
              ).subscribe(()=>sub1.unsubscribe())
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
      this.AnalysisService.updateAdviser(this.requestIdSelected, value.id_adviser, Analysis.financial_analysis, value.comment).toPromise().then(
        (response) => {
          this.toastr.success('Éxito', 'Se ha Actualizado el Analista Asignado');
          this.getAnalysis()
        })
        .catch((e) => {
          this.toastr.error('erro', 'Ocurrió un error')
          console.log(e)
        })
    }
  }
}
