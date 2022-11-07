import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PaginationTableData } from 'src/app/interfaces/ui/pagination-table.interface';
import { BranchOffice } from 'src/app/models/branchoffice.model';
import { AnalysisType, CommercialAnalysis } from 'src/app/models/commercialanalysis.model';
import { AuthorizedDebtorConditionSheet, ConditionSheet } from 'src/app/models/conditionSheet.model';
import { ContractType, DeedDocument, DeedDocumentType } from 'src/app/models/deedDocument.model';
import { ManagementAct } from 'src/app/models/managementact.model';
import { UploadDocumentsCA } from 'src/app/models/uploaddocumentsca.model';
import { User } from 'src/app/models/user.model';
import { AlertsService } from 'src/app/services/alerts.service';
import { ConfirmAlertService } from 'src/app/services/alerts/confirm-alert.service';
import { AnalysisService } from 'src/app/services/analysis/analysis.service';
import { CommercialManagerAuthorizationService } from 'src/app/services/analysis/commercial-manager-authorization.service';
import { CommercialanalysisService } from 'src/app/services/analysis/commercialanalysis.service';
import { ConditionSheetService } from 'src/app/services/analysis/condition-sheet.service';
import { DeedDocumentService } from 'src/app/services/analysis/deed-document.service';
import { LegalAnalysisService } from 'src/app/services/analysis/legal-analysis.service';
import { ManagementActService } from 'src/app/services/analysis/management-act.service';
import { OperationsAreaReportService } from 'src/app/services/analysis/operations-area-report.service';
import { ExcelService } from 'src/app/services/excel/excel.service';
import { BranchofficeService } from 'src/app/services/Maintenance/branchoffice.service';
import { PdfService } from 'src/app/services/pdf.service';
import { Analysis, ExpresionFormatDate } from 'src/Utils/constants';

@Component({
  selector: 'app-formalization-report',
  templateUrl: './formalization-report.component.html',
  styleUrls: ['./formalization-report.component.scss']
})
export class FormalizationReportComponent implements OnInit {

  @Input()
  formalizationSelected: CommercialAnalysis

  @Output()
  openReport = new EventEmitter<string>()

  @Input()
  dataCustomer


  @Input()
  lastRequest

  @Output()
  return_view = new EventEmitter()
  customer: any;
  customerType: any;

  @Output()
  reload = new EventEmitter()

  responsable: User
  conditionSheet: ConditionSheet
  comercialManagerAnalysisi: CommercialAnalysis
  managementAct: ManagementAct
  gerencialManager: User
  commercialManager: User
  deedDocument: DeedDocument

  dataList1: PaginationTableData = {
    metadata: [
      '#',
      'Documento',
      'Autorización legal',
      'Fecha autorización',
      'Autorización comercial',
      'Fecha autorización',
      'Monto',
      //'Tasa',
      'Días de garantía',
      'Aprobado',
      'Acciones'
    ],
    data: []
  }
  hiddenbutton = false
  dataList2: PaginationTableData = {
    metadata: [
      '#',
      'Número de Acta',
      'Cliente',
      'Condiciones',
      'Deudores',
      'Dirección',
      'Aprobado',

    ],
    data: []
  }
  allDeedDocumentType: DeedDocumentType[] = []
  allContractType: ContractType[] = []
  dataList3: PaginationTableData = {
    metadata: [
      '#',
      'Número de Escritura',
      'Cliente',
      'Resolución',
      'Nombre del notario',
      'Tipo de contrato',
      'Tipo de escritura',
    ],
    data: []

  }
  commentUpdoc;
  analysisType: AnalysisType
  constructor(
    private _operationsService: OperationsAreaReportService,
    private spinner: NgxSpinnerService,
    private _conditionSheetService: ConditionSheetService,
    private _commercialManagerService: CommercialManagerAuthorizationService,
    private _alertService: AlertsService,
    private _excelService: ExcelService,
    private _managemenActService: ManagementActService,
    private datePipe: DatePipe,
    private _deedDocumentService: DeedDocumentService,
    private _pdfService: PdfService,
    private _legalAnalysisService: LegalAnalysisService,
    private confirm_service: ConfirmAlertService,
    private _CAService: CommercialanalysisService,
    private branchOfficeService: BranchofficeService,
    private _analysis: AnalysisService,
  ) { }


  async ngOnInit() {
    this.commentUpdoc = 'Informe formalización de cupo'
    this.spinner.show()

    await this.getResponsable()
    await this.getConditionSheet()
    await this.getAct()
    await this.getGerencialManager()
    await this.getCommercialManager()
    await this.getDeedDocument()
    await this.allDeedDocumentTypeArray()
    await this.allContractTypeArray()
    await this.getType(this.formalizationSelected.id_commercialanalysis)
    await this.getDebtorsList()
    await this.getBranchOfficeList()
    await this.listAllReports()
    this.spinner.hide()
  }
  //Necesitamos ver si la hoja de condiciones se puede descargar
  async getConditionSheet() {
    const res = await this._commercialManagerService.getAnalysis(this.formalizationSelected?.id_request).toPromise().then(async (response) => {
      if (response && response != null) {
        //Existe el analisis commercial se puede consultar la hoja de condiciones
        this.comercialManagerAnalysisi = response
        await this._conditionSheetService.getConditionSheet(this.comercialManagerAnalysisi.id_commercialanalysis).toPromise().then((response2) => {
          if (response2 && response2 != null) {
            //si hay hoja de condiciones
            this.conditionSheet = response2
          }
        })
      }
    }).catch((e) => {
      this._alertService.errorCreatedDocument(e)
    })
    return res
  }
  async getAct() {
    const res = await this._managemenActService.managementAct(this.formalizationSelected.id_request).toPromise().then((response) => {
      if (response && response != null) {
        this.managementAct = response
      }
    }).catch((e) => {
      this._alertService.errorCreatedDocument(e)
    })
    return res
  }
  getDeedDocumentType(deed_document_id: number) {
    let find = this.allDeedDocumentType.find(item => item.id = deed_document_id)
    return find?.deed_type_name
  }
  getContractType(contract_type: number) {
    let find = this.allContractType.find(item => item.id = contract_type)
    return find?.contract_type_name
  }
  async allDeedDocumentTypeArray() {
    const res = await this._deedDocumentService.getDeedDocumentType().toPromise().then((response) => {
      if (response && response != null) {
        this.allDeedDocumentType = response
      }
    }).catch((e) => {
      this._alertService.errorCreatedDocument(e)
    })
    return res
  }
  async allContractTypeArray() {
    const res = await this._deedDocumentService.getContractTypeList().toPromise().then((response) => {
      if (response && response != null) {
        this.allContractType = response
      }
    }).catch((e) => {
      this._alertService.errorCreatedDocument(e)
    })
    return res
  }
  getManagementActName() {
    if (this.managementAct) {
      return this.managementAct.registry_act1 + this.managementAct.registry_act2
    }
    return 'Sin número de acta'
  }
  async getDeedDocument() {
    if (this.comercialManagerAnalysisi) {
      const res = await this._deedDocumentService.getDocument(this.comercialManagerAnalysisi.id_commercialanalysis).toPromise().then((response) => {
        this.deedDocument = response
      }).catch((e) => {
        this._alertService.errorCreatedDocument(e)
      })
    }
  }

  async getResponsable() {
    this._operationsService.getGerencialManager().toPromise().then(
      (response) => {
        this.responsable = response
      }
    )
  }
  async getGerencialManager() {
    await this._operationsService.getGerencialManager().toPromise().then((response) => {
      if (response && response != null) {
        this.gerencialManager = response
      }
    })
  }
  async getCommercialManager() {
    await this._operationsService.getCommercialManager().toPromise().then(async (response) => {
      if (response && response != null) {
        //Existe el analisis commercial se puede consultar la hoja de condiciones
        this.commercialManager = response
      }
    }).catch((e) => {
      this._alertService.errorCreatedDocument(e)
    })
  }
  getCommercialManagerApprovalDate() {
    if (this.comercialManagerAnalysisi) {
      if (this.comercialManagerAnalysisi.approval_date != null) {
        return this.datePipe.transform(this.comercialManagerAnalysisi.approval_date, ExpresionFormatDate)
      }
    }
    return 'Sin aprobar análisis comercial'
  }
  getApprovalDate() {
    if (this.conditionSheet.approval_date != null) {
      return this.datePipe.transform(this.conditionSheet.approval_date, ExpresionFormatDate)
    }
    else
      return 'Sin aprobar'
  }
  getGerencialName() {
    if (this.gerencialManager) {
      return this.gerencialManager.firstname + ' ' + this.gerencialManager.lastname
    }
    return 'Sin asignar gerente'
  }
  getCommercialName() {
    if (this.commercialManager) {
      return this.commercialManager.firstname + ' ' + this.commercialManager.lastname
    }
    return 'Sin asignar gerente'
  }

  downloadConditionSheet() {
    this._alertService.successDownloadDocuments()
    this.spinner.show()
    this._excelService.downloadExcel(this.comercialManagerAnalysisi.id_commercialanalysis,
      () => this.spinner.hide()
    )
  }
  downloadAct() {
    this._alertService.successDownloadDocuments()
    this.spinner.show()

  }

  getResponsableName() {
    if (this.responsable != null && this.responsable != undefined) {
      return `${this.responsable.firstname} ${this.responsable.lastname}`
    }
    return 'Sin asignar'
  }
  onRoute() {
    this.return_view.emit()
  }
  getDate() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    //@ts-ignore
    return new Date().toLocaleDateString('es-GT', options)
  }
  openDeedDocument() {

    this.openReport.emit('Documento de escritura')
  }
  async createPDF() {
    this.hiddenbutton = true
    this.spinner.show()
    let data = document.getElementById('templateInforme');
    await this._pdfService.createReportHTMLSave(data, this.analysisType.analysistype_name, this.formalizationSelected.id_commercialanalysis, this.commentUpdoc, () => { this.spinner.hide(); this.hiddenbutton = false })

  }
  async getType(id: number) {
    const res = await this._legalAnalysisService.getType(id).toPromise().then((response) => {

      this.analysisType = response

    })
    return res
  }
  async showAlertConfirm() {
    const result = await this.confirm_service.showAlert();

    if (result.confirmed) {
      let result = this._CAService.getNextAdviser(this.formalizationSelected.id_commercialanalysis, this.analysisType.id_analysistype).toPromise().then(
        (response) => {

          let data: CommercialAnalysis = {
            id_commercialanalysis: this.formalizationSelected.id_commercialanalysis,
            analysis_status_id: 3,
            commercialanalysis_comment: this.formalizationSelected.commercialanalysis_comment,
            approval_date: new Date()
          }
          this._CAService.updateCA(data).pipe(
            map((resp) => {
              this._alertService.successAnalysisCompleted()
              this.reload.emit()
            }),
            catchError((err) => {
              this._alertService.errorCreatedDocument(err)
              return of();
            })
          ).subscribe()
        }
      )
    }
  }
  debtorsList: AuthorizedDebtorConditionSheet[]
  async getDebtorsList() {
    if (this.conditionSheet) {
      const res = await this._conditionSheetService.listDebtors(this.conditionSheet.id_condition_sheet).toPromise().then(
        (response) => {
          this.debtorsList = response
        }
      ).catch((err) => {
        console.log(err)
      })
      return res
    }

  }
  branchOfficeList: BranchOffice[] = []
  async getBranchOfficeList() {
    const res = await this.branchOfficeService.getBranchOffice(-1, -1, []).toPromise().then((response) => {
      this.branchOfficeList = response.branchoffice
    }).catch((e) => {
      console.log(e)
    })
    return res
  }
  getConditionsName() {
    if (this.conditionSheet) {
      let id = this.conditionSheet.branch_office
      if (id != -1) {
        return this.branchOfficeList.find(item => item.branchoffice_id == id)?.branchoffice_name
      }
      return 'Sin asignar condiciones'
    }
    return 'No asignadas las condiciones'
  }
  managementActReport: UploadDocumentsCA
  async listAllReports() {
    const res = this._analysis.listAllreports(this.formalizationSelected.id_request).toPromise().then((response) => {
      console.log(response)
      this.managementActReport = response.find(item => item.uploaddocsca_comment == 'Acta Gerencial')
    })
    return res
  }
  downloadDocument(){
    if(this.managementActReport!=null){
      console.log(this.managementActReport)
      this._analysis.downloadDocument(this.managementActReport.id_uploaddocsca,this.managementActReport.uploaddocsca_namedoc)
      this._alertService.successDownloadDocuments()
    }else{
      this._alertService.notFoundManagementAct()
    }
  }
}
