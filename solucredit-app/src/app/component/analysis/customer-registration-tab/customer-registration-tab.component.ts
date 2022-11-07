import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PaginationTableData } from 'src/app/interfaces/ui/pagination-table.interface';
import { Adviser } from 'src/app/models/adviser.model';
import { CommercialAnalysis } from 'src/app/models/commercialanalysis.model';
import { RolService } from 'src/app/pages/rol/services/rol.service';
import { CommercialManagerAuthorizationService } from 'src/app/services/analysis/commercial-manager-authorization.service';
import { CustomerRegistrationService } from 'src/app/services/analysis/customer-registration.service';
import { LegalAnalysisService } from 'src/app/services/analysis/legal-analysis.service';
import { Analysis, AnalysisOption, Commercial_Manager_Authorization, Gerencial_Manager_Authorization } from 'src/Utils/constants';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FilenameService } from 'src/app/services/data/filename.service';
import { MysqlService } from 'src/app/services/mysql/mysql.service';
import { AllAnalysisService } from 'src/app/services/analysis/all-analysis.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExcelService } from 'src/app/services/excel/excel.service';
import { ComplianceVerificationService } from 'src/app/services/analysis/compliance-verification.service';
import { AnalysisService } from 'src/app/services/analysis/analysis.service';
import { CommercialanalysisService } from 'src/app/services/analysis/commercialanalysis.service';
import { ConditionSheet } from 'src/app/models/conditionSheet.model';
import { ConditionSheetService } from 'src/app/services/analysis/condition-sheet.service';
@Component({
  selector: 'app-customer-registration-tab',
  templateUrl: './customer-registration-tab.component.html',
  styleUrls: ['./customer-registration-tab.component.scss']
})
export class CustomerRegistrationTabComponent implements OnInit {
  analysis_option = AnalysisOption
  previous_operation: boolean = false
  initCustomerRegistration = false;
  customerRegistrationSelected: CommercialAnalysis
  customer_regitstration_docs_valid = 0;
  commercialManagerAuthorizationSelected: CommercialAnalysis
  initCommercialManagerAuthorization = false;
  commercial_manager_authorization_docs_valid = 0;
  arraymodals = []
  updateComercialManagerAuthorizationForm = new FormGroup({
    comment: new FormControl("", [Validators.required]),
    valid_documents: new FormControl("", [Validators.required])
  })
  reporList = [
    'Comercial',
    'Informe Área de Operaciones',
    'Informe Análisis Financiero',
    'Legal',
    'Cumplimiento',
    'Autorización Gerente Comercial',
    'Autorización Gerente General',
    'Informe de Aprobación de Consejo'
  ]
  customer_registrationList: PaginationTableData = {
    data: [],
    metadata: [
      '#',
      'Tipo Informe',
      'Responsable',
      'Fecha de Aprobación',
      'Verificado',
      'Acciones'
    ]
  }
  commercial_manager_authorization_dataList: PaginationTableData = {
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
  customerRegistrationDataList: PaginationTableData = {
    data: [],
    metadata: [
      'Nombre',
      'Comentario',
      'Acciones'
    ]
  }
  updateCustomerRegistrationForm = new FormGroup({
    valid_documents: new FormControl("", [Validators.required]),
    comment: new FormControl("", [Validators.required])
  })
  FormUploadDocumentsCA = new FormGroup({
    uploaddocsca_comment: new FormControl("", [Validators.required]),
  });
  commercialManagerAuthorizationList: PaginationTableData = {
    data: [],
    metadata: [
      'Documento',
      'Nombre',
      'Acciones',
    ]
  }
  arrayCheckedReports = [
    {
      key: 'Cumplimiento',
      value: false
    },
    {
      key: 'Legal',
      value: false
    },
    {
      key: 'Comercial',
      value: false
    },
    {
      key: 'Autorización Gerente Comercial',
      value: false
    },
    {
      key: 'Autorización Gerente General',
      value: false
    }
  ]
  updateLegalAnalysisForm = new FormGroup({
    comment: new FormControl("", [Validators.required]),
    valid_documents: new FormControl("", [Validators.required])
  })

  //Entradas y salidas
  @Input()
  showViews: string[] = []

  @Input()
  dataCustomer

  @Input()
  lastRequest

  @Input()
  requestIdSelected = -1

  @Input()
  pageCustomerRegistration: number = 0



  @Output()
  changePage?= new EventEmitter<number>()

  @Output()
  addLastView?= new EventEmitter<any>()

  @Output()
  changeAnalysis?= new EventEmitter<Analysis>()

  @Output()
  changeCommercialManagerAuthorization?= new EventEmitter<number>()

  @Output()
  changeGerencialManagerAuthorization?= new EventEmitter<number>()

  @Output()
  changeComplianceVerification?= new EventEmitter<number>()

  @Output()
  changeLegalAnalisis?= new EventEmitter<number>()

  @Output()
  downloadDocuments?= new EventEmitter<any>()

  @Output()
  showDocuments?= new EventEmitter<any>()

  @Output()
  returnview?= new EventEmitter<any>()

  @Output()
  changeCommercialAssistantAnalysis?= new EventEmitter<number>()

  @Output()
  changeOperationsAreaReport?= new EventEmitter<number>()

  @Output()
  changeCouncilApproval?= new EventEmitter<number>()

  @Output()
  changePageFinancialAnalysis?= new EventEmitter<number>()

  conditionSheet: ConditionSheet;
  constructor(
    private _customerRegistrationService: CustomerRegistrationService,
    private toastr: ToastrService,
    private _commercialManagerAuthorization: CommercialManagerAuthorizationService,
    private _legalAnalysis: LegalAnalysisService,
    private _RolServise: RolService,
    private modalService: NgbModal,
    private filenameS: FilenameService,
    private mysqlService: MysqlService,
    private spinner: NgxSpinnerService,
    private _excelService: ExcelService,
    private _complianceVerificationService: ComplianceVerificationService,
    private commercialAssistant: AllAnalysisService,
    private _commercialService: CommercialanalysisService,
    private AnalysisService: AllAnalysisService,
    private _analysis: AnalysisService,
    private _conditionSheetService: ConditionSheetService
  ) { }

  async ngOnInit() {
    this.spinner.show()
    await this.getInitCustomerRegistration()
    await this.listAllReports()
    await this.getInitCommercialManagerAuthorization()
    await this.legalFlag()
    await this.complianceFlag()
    await this.assistantFlag()
    this.spinner.hide()
    //listamos las banderas
    console.log('CommercialManager Auth');
    console.log(this.commercialManagerAuthorizationSelected);
  }
  async getConditionSheet() {
    if (!this.commercialManagerAuthorizationSelected)
      return
    const res = await this._conditionSheetService.getConditionSheet(this.commercialManagerAuthorizationSelected.id_commercialanalysis).toPromise().then((
      response
    ) => {
      if (response && response != null) {
        this.conditionSheet = response
      }
    })
    return res
  }
  async legalFlag() {
    let analysis = this._legalAnalysis.getAnalysis(this.requestIdSelected).toPromise().then((response) => {
      if (response != null) {
        let data = this._legalAnalysis.getCheckList(this.requestIdSelected, this.dataCustomer.customer_id).toPromise()
          .then((response) => {
            if (response.length > 0) {
              let onenotchecked = response.filter(item => item.verification == 0 || item.verification == null)
              if (onenotchecked.length > 0)
                this.arrayCheckedReports.find(item => item.key == 'Legal').value = false
              else
                this.arrayCheckedReports.find(item => item.key == 'Legal').value = true
            }
          })
        return data
      }
    })

    return analysis
  }
  async complianceFlag() {
    let analysis = this._complianceVerificationService.getAnalysis(this.requestIdSelected).toPromise().then((response) => {
      if (response != null) {
        let data = this._complianceVerificationService.getCheckList(this.dataCustomer.customer_id, this.requestIdSelected).toPromise()
          .then((response) => {
            if (response.length > 0) {
              let onenotchecked = response.filter(item => item.verification == 0 || item.verification == null)
              if (onenotchecked.length > 0)
                this.arrayCheckedReports.find(item => item.key == 'Cumplimiento').value = false
              else
                this.arrayCheckedReports.find(item => item.key == 'Cumplimiento').value = true
            }
          })
        return data
      }
    })
    return analysis
  }
  async assistantFlag() {
    let analysis = this.commercialAssistant.getAnalysis(this.requestIdSelected, 'Comercial').toPromise().then(
      (response: CommercialAnalysis) => {
        if (response != null) {
          let data = this._commercialService.getCheckList(this.dataCustomer.customer_id, this.requestIdSelected).toPromise().then(
            (response) => {
              if (response.length > 0) {
                //@ts-ignore
                let onenotchecked = response.filter(item => item.verification == 0 || item.verification == null)
                if (onenotchecked.length > 0)
                  this.arrayCheckedReports.find(item => item.key == 'Comercial').value = false
                else
                  this.arrayCheckedReports.find(item => item.key == 'Comercial').value = true
              }
            }
          )
          return data
        }
      })
    return analysis
  }

  async getAllCommercialManagerAuthorizationInfo() {
    await this.listAllReports()
    console.log('Esto se está ejecutando');
    await this.getCommercialManagerAuthorization()
  }
  saveCustomerRegistration() {
    let data = this.updateCustomerRegistrationForm.value
    if (this.initCustomerRegistration == true) {
      //Existe una no tenemos que crearla
      let sub = this._customerRegistrationService.updateAnalysis(this.customerRegistrationSelected.id_commercialanalysis, data.comment, data.valid_documents).pipe(
        map((response) => {
          this.customerRegistrationSelected = response
          this.toastr.success('Análisis Actualizado', 'Éxito')
        }),
        catchError((err) => {
          this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
          return of();
        })
      ).subscribe(() => sub.unsubscribe())
    } else {
      let reg: CommercialAnalysis = {
        id_request: this.requestIdSelected,
        id_customer: this.dataCustomer.customer_id,
        commercialanalysis_comment: data.comment,
        valid_documents: data.valid_documents
      }
      let sub = this._customerRegistrationService.initAnalyis(reg).pipe(
        map((resp) => {
          this.toastr.success('Éxito', 'Se ha iniciado una nueva Alta de cliente')
          this.initCustomerRegistration = true
          this.getAllCustomerRegistrationInfo()
        }),
        catchError((err) => {
          this.toastr.error('error', 'Ocurrió un error');
          console.log(err);
          return of();
        })
      ).subscribe(() => sub.unsubscribe())
    }
  }
  async getAllDocumentsComercialManagerAuthorization() {
    let sub = this._commercialManagerAuthorization.listDocuments(this.commercialManagerAuthorizationSelected.id_commercialanalysis).toPromise().then(
      (response) => {
        this.commercialManagerAuthorizationList.data = response
      }
    ).catch((err) => {
      this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
    })
    return sub
  }
  async getCommercialManagerAuthorization() {
    const res = this._commercialManagerAuthorization.getAnalysis(this.requestIdSelected).toPromise().then(
      (response) => {
        console.log(response);
        //debugger
        //debugger
        console.log('MANDANDO INFORMACION DE LOS GC');
        this.commercialManagerAuthorizationSelected = response
        this.commercial_manager_authorization_docs_valid = +response.valid_documents
        this.updateComercialManagerAuthorizationForm.controls['comment'].setValue(response.commercialanalysis_comment)
        this.getAllDocumentsComercialManagerAuthorization()
        this.getConditionSheet()
      }
    )
    return res
  }
  async getInitCommercialManagerAuthorization() {
    // debugger
    console.log('Buscando información de GC');
    this._commercialManagerAuthorization.getInit(this.requestIdSelected).toPromise().then(
      (response) => {
        this.initCommercialManagerAuthorization = response
        console.log(response);
        if (response == true) {
          this.getAllCommercialManagerAuthorizationInfo()
        }
      }

    ).catch((err) => {
      this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
    })
  }
  disableView(view: string) {
    let find = this.showViews.find(item => item == view)
    if (find)
      return false
    return true
  }
  async getInitCustomerRegistration() {
    this._customerRegistrationService.getInit(this.requestIdSelected).toPromise().then(
      (response) => {
        this.initCustomerRegistration = response
        if (response == true) {
          this.getAllCustomerRegistrationInfo()
        }
      },

    ).catch((err) => {
      this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
    })
  }
  async getAllCustomerRegistrationInfo() {
    await this.getCustomerRegistration()

  }
  async getCustomerRegistration() {
    const res = this._customerRegistrationService.getAnalysis(this.requestIdSelected).toPromise().then(
      (response) => {
        console.log('sssss')
        console.log(response)
        this.customerRegistrationSelected = response
        this.customer_regitstration_docs_valid = +response.valid_documents
        this.updateCustomerRegistrationForm.controls['comment'].setValue(response.commercialanalysis_comment)
        this.getAllDocumentsCustomerRegistration()
      }
    )
    return res
  }
  async getAllDocumentsCustomerRegistration() {
    let sub = this._customerRegistrationService.listDocuments(this.customerRegistrationSelected.id_commercialanalysis).toPromise().then(
      (response) => {
        this.customerRegistrationDataList.data = response
      }
    ).catch((err) => {
      this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
    })
    return sub
  }
  async listAllReports() {
    const res = this._analysis.listAllreports(this.requestIdSelected).toPromise().then((response) => {
      console.log(response)
      console.log('Listar Reportes');
      this.commercial_manager_authorization_dataList.data = response.filter(item => this.reporList.includes(item.uploaddocsca_comment))
    })
    return res
    /*
    //TODO: eliminar
    const res = this._commercialManagerAuthorization.listReporst(this.requestIdSelected).toPromise().then(
      async (response) => {
        console.log('REPORTS')
        console.log(response)
        this.commercial_manager_authorization_dataList.data = response
        debugger
        for (let i = 0; i < response.length; i++) {
          let document = response[i]
          if (document.uploaddocsca_comment == Commercial_Manager_Authorization) {
            //Es el gerente comercial
            //Para este tengo que obtener el gerente comercial
            this._RolServise.getCommercialManager().toPromise().then(
              (response) => {
                if (response.length > 0) {

                  let responsable = new Adviser(0, '', '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 0)
                  responsable.firstname = response[0].firstname
                  responsable.lastname = response[0].lastname
                  this.commercial_manager_authorization_dataList.data[i].responsable = responsable
                } else {
                  let responsable = new Adviser(0, '', '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 0)
                  responsable.firstname = 'Sin Asignar'
                  responsable.lastname = ''
                  this.commercial_manager_authorization_dataList.data[i].responsable = responsable
                }
              }
            )
          } else if (document.uploaddocsca_comment == Gerencial_Manager_Authorization) {
            //El es gerente general
            //Para este tenemos que obtener el gerente general
            await this._RolServise.getGerencialManager().toPromise().then(
              (response) => {
                if (response.length > 0) {
                  let responsable = new Adviser(0, '', '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 0)
                  responsable.firstname = response[0].firstname
                  responsable.lastname = response[0].lastname
                  this.commercial_manager_authorization_dataList.data[i].responsable = responsable
                } else {
                  let responsable = new Adviser(0, '', '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 0)
                  responsable.firstname = 'Sin Asignar'
                  responsable.lastname = ''
                  this.commercial_manager_authorization_dataList.data[i].responsable = responsable
                }
              }
            )
          }
          else {
            await this._legalAnalysis.getResponsable(response[i].id_commercialanalisys).toPromise().then(
              (responsable) => {
                console.log('RESPONSABLE')
                console.log(responsable)
                this.commercial_manager_authorization_dataList.data[i].responsable = responsable
              }
            )
          }
        }
        //Un for extra para verificar cada uno de ellos y agregarlo como campo nuevo
      }
    )
    return res*/
  }
  getValueChecklist(name: string) {
    let find = this.arrayCheckedReports.find(item => item.key == name)
    if (find)
      return find.value
  }
  downloadAllReports() {
    try {
      this._commercialManagerAuthorization.getAllReports(this.requestIdSelected)
      this.toastr.success('Se han descargado todos los informes', 'Éxito')
    }
    catch (error) {
      console.log(error);
    }
  }
  changeView(input) {
    this.changePage.emit(input)
  }
  changeVerificationsDocsLegalAnalysis(event) {
    console.log(event)
    this.updateLegalAnalysisForm.controls['valid_documents'].setValue(event)
  }
  showCommercialManagerAuthorization() {
    this.addLastView.emit({ target: 'Alta Cliente', page: this.pageCustomerRegistration })
    this.changeAnalysis.emit(Analysis.commercial_manager_authorization)
    this.changeCommercialManagerAuthorization.emit(2)
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
  openModalUploadCustomerRegistration(targetModal) {
    this.FormUploadDocumentsCA.reset({})
    this.openModal(targetModal)
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
          id_commercialanalisys: this.customerRegistrationSelected.id_commercialanalysis,
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
              this.getAllCustomerRegistrationInfo()
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
  downloadDocument(doc) {
    this.downloadDocuments.emit(doc)
  }
  showDocument(doc) {
    this.showDocuments.emit(doc)
  }
  deleteDocCA(doc) {
    this.mysqlService
      .deleteDocsCA(doc.id_uploaddocsca)
      .toPromise()
      .then(async (response) => {
        this.toastr.success("Se ha eliminado el Documento", "Documento Eliminado!")
        // this.ngOnInit();

        this.getAllCustomerRegistrationInfo()

      })
      .catch((error) => {
        this.toastr.error("Problemas con el servidor.", "Ha ocurrido un error")
        console.log(error)
      })
  }
  openReportCustomerRegistration(target) {
    console.log('A REPORTE EN PRIMERA VISTA');
    console.log(target);
    this.addLastView.emit({ target: 'Alta Cliente', page: this.pageCustomerRegistration })
    debugger
    switch (target) {
      case 'Legal':
        this.changeAnalysis.emit(Analysis.legal_analysis)
        this.changeLegalAnalisis.emit(2)
        break
      case 'Cumplimiento':
        this.changeAnalysis.emit(Analysis.compliance_verification)
        this.changeComplianceVerification.emit(2)
        break
      case 'Comercial':
        this.changeAnalysis.emit(Analysis.commercial_assistant_analysis)
        this.changeCommercialAssistantAnalysis.emit(2)
        break
      case 'Autorización Gerente Comercial':
        this.changeAnalysis.emit(Analysis.commercial_manager_authorization)
        this.changeCommercialManagerAuthorization.emit(3)
        //this.pageCommercialManagerAuthorization = 3
        break
      case 'Autorización Gerente General':
        this.changeAnalysis.emit(Analysis.gerencial_manager_authorization)
        this.changeGerencialManagerAuthorization.emit(3)
        break
      case 'Informe Área de Operaciones':
        this.changeAnalysis.emit(Analysis.operations_area_report)
        this.changeOperationsAreaReport.emit(2)
        break
      case 'Aprobación de Consejo':
        this.changeAnalysis.emit(Analysis.operations_area_report)
        this.changeCouncilApproval.emit(2)
        break
      case 'Informe Análisis Financiero':
        this.changeAnalysis.emit(Analysis.financial_analysis)
        this.changePageFinancialAnalysis.emit(1)
        break
      case 'Documento de escritura':
        this.changeAnalysis.emit(Analysis.commercial_manager_authorization)
        this.changeCommercialManagerAuthorization.emit(4)
        break
    }
  }
  openReport() {
    this.addLastView.emit({ target: 'Alta Cliente', page: this.pageCustomerRegistration })
    this.changePage.emit(2)
    console.log('Mandando a Hoja de Condiciones');
  }
  downloadConditionSheet() {
    this.toastr.success('Éxito', 'Se han descargado los documentos')
    this._excelService.downloadExcel(this.commercialManagerAuthorizationSelected.id_commercialanalysis)
  }
  returnviewM() {
    this.returnview.emit()
    this.ngOnInit()
  }
  showConditionSheet() {
    this.addLastView.emit({ target: 'Alta Cliente', page: this.pageCustomerRegistration })
    this.changeAnalysis.emit(Analysis.commercial_manager_authorization)
    this.changeCommercialManagerAuthorization.emit(2)
  }
  viewConditionSheetCustomerRegistration() {
    this.addLastView.emit({ target: 'Alta Cliente', page: this.pageCustomerRegistration })
    //
  }
  downloadAllDocs() {

    this.AnalysisService.downloadDocumentsAll(this.lastRequest.request_id)
    this.toastr.success('Éxito', 'Se han descargado los documentos')
    this.toastr.info('La descarga puede tardar un poco...', 'Descarga en Proceso')
  }
}
