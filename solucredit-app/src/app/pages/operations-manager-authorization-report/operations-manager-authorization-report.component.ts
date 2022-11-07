import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PaginationTableData } from 'src/app/interfaces/ui/pagination-table.interface';
import { Adviser } from 'src/app/models/adviser.model';
import { AnalysisType, CommercialAnalysis } from 'src/app/models/commercialanalysis.model';
import { ConditionSheetRate, ConditionSheet } from 'src/app/models/conditionSheet.model';
import { Rate } from 'src/app/models/rate.model';
import { ConfirmAlertService } from 'src/app/services/alerts/confirm-alert.service';
import { CommercialManagerAuthorizationService } from 'src/app/services/analysis/commercial-manager-authorization.service';
import { CommercialanalysisService } from 'src/app/services/analysis/commercialanalysis.service';
import { ConditionSheetService } from 'src/app/services/analysis/condition-sheet.service';
import { LegalAnalysisService } from 'src/app/services/analysis/legal-analysis.service';
import { UploaddocumentscaService } from 'src/app/services/analysis/uploaddocumentsca.service';
import { MysqlService } from 'src/app/services/mysql/mysql.service';
import { Commercial_Manager_Authorization, Gerencial_Manager_Authorization, Customer_Registration, Compliance_Verification, Legal_Analysis, commission_rate } from 'src/Utils/constants';
import { RolService } from '../rol/services/rol.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas'
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ExcelService } from 'src/app/services/excel/excel.service';
import { ManagementActService } from 'src/app/services/analysis/management-act.service';
import { PdfService } from 'src/app/services/pdf.service';

@Component({
  selector: 'app-operations-manager-authorization-report',
  templateUrl: './operations-manager-authorization-report.component.html',
  styleUrls: ['./operations-manager-authorization-report.component.scss']
})
export class OperationsManagerAuthorizationReportComponent implements OnInit {
  @Input()
  request_id: number

  @Output()
  return_view = new EventEmitter()

  @Output()
  show_condition = new EventEmitter()




  Commercial_Manager_Authorization = Commercial_Manager_Authorization;
  Gerencial_Manager_Authorization = Gerencial_Manager_Authorization;
  Customer_Registration = Customer_Registration;
  Compliance_Verification = Compliance_Verification
  Legal_Analysis = Legal_Analysis
  commission_rate = commission_rate
  typesRequestArray: any[]
  analysisType: AnalysisType
  analysis: CommercialAnalysis
  checkDocuments: number
  analysisResponsable: Adviser
  gerencialAnalysisResponsable: Adviser
  commercialManagerSelected: CommercialAnalysis
  conditionSheetSavedRates: ConditionSheetRate[]
  conditionSheetSelected: ConditionSheet
  rates: Rate[] = []
  othersResponsables: any[] = []
  customer: any;
  customerType: any;
  request: any;
  typesRequest: any
  commentUpdoc;
  date = new Date()
  dia = this.date.getDay();
  mes = this.date.getMonth() + 1;
  year = this.date.getFullYear();
  hour = this.date.getHours();
  min = this.date.getMinutes();
  sec = this.date.getSeconds();
  mAct: any
  managementActList: PaginationTableData = {
    metadata: [
      'No',
      'Número de Acta',
      'Cliente',
      'Condiciones',
      'Deudores',
      'Dirección',
      'Verificado'
    ],
    data: []
  }
  documentRegisterList: PaginationTableData = {
    metadata: [
      'No',
      'Número de Escritura',
      'Cliente',
      'Resolución',
      'Deudores',
      'Dirección',
      'Verificado'
    ],
    data: []
  }
  managementResList: PaginationTableData = {
    metadata: [
      'No',
      'Número de Resolución',
      'Cliente',
      'Resolución',
      'Deudores',
      'Dirección',
      'Verificado'
    ],
    data: []
  }
  conditionSheetList: PaginationTableData = {
    metadata: [
      '#',
      'Número de pagaré',
      'Autorización legal',
      'Fecha Aut',
      'Autorización Comercial',
      'Fecha Aut',
      'Monto',
      'Tasa',
      'Días de garantía',
      'Aprobado',
      'Historial',
      '',
      'Acciones'
    ],
    data: [
      '1',
      '0F45',
      'Luis Pérez',
      '05/02/2020',
      'Daniel Garcia',
      '05/02/2021',
      'Q. 5,000.00'
    ]
  }
  termsList: PaginationTableData = {
    metadata: [
      'No',
      'Número de Pagaré',
      'Nombre',
      'Monto',
      'Días de garantía',
      'Aprobado',
    ],
    data: []
  }
  structureCorp: PaginationTableData = {
    metadata: [
      'No',
      'Nombre',
      'Tipo',
      'Participación accionaria',
      'Comentario',
      'Verificado'
    ],
    data: []
  }

  constructor(
    private spinner: NgxSpinnerService,
    private _mysqlservice: MysqlService,
    private _legalAnalysisService: LegalAnalysisService,
    private _RolServise: RolService,
    private _conditionSheetService: ConditionSheetService,
    private _commercialManagerAuthorization: CommercialManagerAuthorizationService,
    private _UploadDocumentsService: UploaddocumentscaService,
    private toastr: ToastrService,
    private confirm_service: ConfirmAlertService,
    private _CAService: CommercialanalysisService,
    private router: Router,
    private _excelService: ExcelService,
    private _managementActService: ManagementActService,
    private _pdfService: PdfService,
  ) { }

  async ngOnInit() {
    this.spinner.show()
    let id = this.request_id
    await this.getRequestTypeArray()
    await this.getType(id)
    await this.getAnalysis(id)
    await this.getManagerResponsable()
    await this.getManagerGerencialResponsable()
    console.log('Mandando tipo de solicitud ');
    console.log(this.request?.doc_type);
    //obtener los responsables de los analysis anteriores
    //legal
    await this.getOthersResposables()
    //tenemos que obtener la hoja de condiciones para eso se necesita el id del analysis comercial
    await this.getCommercialManagerAuthorization()
    await this.getConditionSheetData(this.commercialManagerSelected)
    await this.getCustomer(this.analysis.id_customer)
    await this.getCustomerType(this.customer.customer_id)
    await this.getRequestType()
    await this.getRatesConditionSheet()
    await this.getRates()
    //En este punto tenemos que obtener los documentos dependiendo del tipo de
    switch (this.analysisType.analysistype_name) {
      case 'Autorización Gerente Comercial':
        this.commentUpdoc = 'Autorización Gerente Comercial'
        break
    }
    console.log(this.othersResponsables)
    this.spinner.hide()
    await this.managementAct()
    console.log('Mandando tipo de solicitud ');
    console.log(this.request.doc_type);
    console.log(this.request);
  }
  getInfoOtherResponsable(type: string) {
    let info = this.othersResponsables.find(item => item.type.analysistype_name == type)
    return info
  }
  async getRates() {
    const res = await this._conditionSheetService.getRates().toPromise().then(
      (response) => {
        console.log('RAtes')
        console.log(response)
        this.rates = response
      }
    )
    return res
  }
  async getOthersResposables() {
    const res = this._conditionSheetService.getOthersResponsables(this.analysis.id_request).toPromise().then(
      (response) => {
        console.log('AAAA')
        console.log(response)
        this.othersResponsables = response

      }
    )
    return res
  }
  async getRequestTypeArray() {
    const res = await this._mysqlservice.GetTypeRequest().toPromise().then(
      (response) => {
        console.log(response)
        this.typesRequestArray = response.data
      }
    )
    return res
  }
  async getType(id: number) {
    const res = await this._legalAnalysisService.getType(id).toPromise().then(
      (response) => {
        console.log(response)
        this.analysisType = response
      }
    )
    return res
  }
  async getAnalysis(id_analysis: number) {
    const res = await this._legalAnalysisService.getAnalysis2(id_analysis).toPromise().then(
      (response) => {
        this.analysis = response
        console.log(response)
        this.checkDocuments = +response.valid_documents

      }
    )
    return res
  }
  async getManagerResponsable() {
    const res = this._RolServise.getCommercialManager().toPromise().then(
      (response) => {
        if (response.length > 0) {
          this.analysisResponsable = new Adviser(0, '', '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 0)
          this.analysisResponsable.firstname = response[0].firstname
          this.analysisResponsable.lastname = response[0].lastname
        } else {
          this.analysisResponsable = new Adviser(0, '', '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 0)
          this.analysisResponsable.firstname = 'Sin Asignar'
          this.analysisResponsable.lastname = ''
        }
      }
    )
    return res
  }
  async getManagerGerencialResponsable() {
    const res = this._RolServise.getGerencialManager().toPromise().then(
      (response) => {

        if (response.length > 0) {
          this.gerencialAnalysisResponsable = new Adviser(0, '', '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 0)
          this.gerencialAnalysisResponsable.firstname = response[0].firstname
          this.gerencialAnalysisResponsable.lastname = response[0].lastname
        } else {
          this.gerencialAnalysisResponsable = new Adviser(0, '', '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 0)
          this.gerencialAnalysisResponsable.firstname = 'Sin Asignar'
          this.gerencialAnalysisResponsable.lastname = ''
        }
      }
    )
    return res
  }
  async getCommercialManagerAuthorization() {
    const res = this._commercialManagerAuthorization.getAnalysis(this.analysis.id_request).toPromise().then(
      (response) => {
        this.commercialManagerSelected = response
      }
    )
    return res
  }

  async getConditionSheetData(analysis?: CommercialAnalysis) {
    if (analysis) {
      const res = this._conditionSheetService.getConditionSheet(analysis.id_commercialanalysis).toPromise().then(
        (response) => {
          console.log('CONDITION')
          console.log(response)
          if (response != null) {
            this.conditionSheetSelected = response
            this.checkDocuments = this.conditionSheetSelected.status_condition_sheet
          }
        }
      )
      return res
    } else {
      const res = this._conditionSheetService.getConditionSheet(this.analysis.id_commercialanalysis).toPromise().then(
        (response) => {
          console.log('CONDITION')
          console.log(response)
          if (response != null)
            this.conditionSheetSelected = response
        }
      )
      return res
    }

  }
  async getCustomer(id_customer: number) {
    const res = await this._mysqlservice.GetOneCustomer(id_customer).toPromise().then(
      (response) => {
        this.customer = response.data.customer
        console.log(response.data)
      }
    )
    return res
  }
  async getCustomerType(id_customer: number) {
    const res = this._mysqlservice.GetOneCustomerType(id_customer).toPromise().then(
      (response) => {
        console.log(response)
        this.customerType = response.data
      }
    )
    return res
  }
  async getRequestType() {
    const res = await this._mysqlservice.GetCustomerRequest(this.analysis.id_customer).toPromise().then(
      (response) => {
        console.log(response)
        this.request = response.data.request.find(item => item.request_id == this.analysis.id_request)
        this.typesRequest = this.typesRequestArray.find(item => item.type_id == this.request.type)
      }
    )
    return res
  }
  async getRatesConditionSheet() {
    const res = await this._conditionSheetService.getSavedRates(this.conditionSheetSelected.id_condition_sheet).toPromise().then(
      (response) => {
        console.log('RATES')
        console.log(response)
        this.conditionSheetSavedRates = response
      }
    )
    return res
  }
  async createPDF() {
    let data = document.getElementById('templateInforme');
    this._pdfService.createReportHTMLSave(data, this.analysisType.analysistype_name, this.analysis.id_commercialanalysis, this.commentUpdoc)
  }
  async showAlertConfirm() {
    const result = await this.confirm_service.showAlert2('Activar Cliente', '¿Desea activar el prospecto y convertirlo en Cliente en Solucredit App?');
    debugger
    if (result.confirmed) {
      //this.toastr.success('A', 'Análisis Completado');
      let data: CommercialAnalysis = {
        id_commercialanalysis: this.analysis.id_commercialanalysis,
        analysis_status_id: 3,
        commercialanalysis_comment: this.analysis.commercialanalysis_comment,
        approval_date: new Date()
      }
      this._CAService.updateCA(data).pipe(
        map((resp) => {
          this.toastr.success('Análisis Completado', `Se ha cambiado el estado del análisis ${this.analysisType.analysistype_name}`);
          //actualizamos el category_id
          this._mysqlservice.changeCustomerToTraditionalCustomer(this.customer.customer_id).toPromise().then(
            (response) => {
              this.toastr.success('Cliente dado de alta', `Se ha cambiado el estado del prospecto a cliente tradicional`);
            }
          )
        }),
        catchError((err) => {
          this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
          return of();
        })
      ).subscribe()
    }
  }
  onRoute() {
    this.router.navigate(['/list-customer']);
  }
  getShowCommissionRate() {
    if (!this.rates || !this.conditionSheetSavedRates)
      return null
    let type = this.rates.find(item => item.rate_description == this.commission_rate)
    if (!type)
      return null
    let rate = this.conditionSheetSavedRates.find(item => item.id_rates == type.id_rates)
    return rate;
    // this.conditionSheetSavedRates.find(item=>item.rate_type)
  }
  gotoConditionSheetReport() {
    this.router.navigate(['/condition-sheet-report', this.conditionSheetSelected.id_condition_sheet])
  }
  // returnConditionSheetChecklistMethod() {
  //   this.returnConditionSheetChecklist.emit(1)
  // }
  showConditionSheetMethod() {
    this.show_condition.emit()
  }
  downloadConditionSheet() {
    this._excelService.downloadExcel(this.conditionSheetSelected.id_commercialanalysis)
  }
  async managementAct() {
    console.log(this.request)
    const res = this._managementActService.managementAct(this.request.request_id).toPromise().then(
      (response) => {
        console.log('ACT')
        console.log(response)
        if (response)
          this.mAct = response
      }
    )
    return res
  }
  return_view_method() {
    this.return_view.emit()
  }
}
