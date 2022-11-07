import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PaginationTableData } from 'src/app/interfaces/ui/pagination-table.interface';
import { CommercialAnalysis } from 'src/app/models/commercialanalysis.model';
import { AlertsService } from 'src/app/services/alerts.service';
import { AllAnalysisService } from 'src/app/services/analysis/all-analysis.service';
import { AnalysisService } from 'src/app/services/analysis/analysis.service';
import { CommercialManagerAuthorizationService } from 'src/app/services/analysis/commercial-manager-authorization.service';
import { ConditionSheetService } from 'src/app/services/analysis/condition-sheet.service';
import { FormalizationService } from 'src/app/services/analysis/formalization.service';
import { GerencialManagerAuthorizationService } from 'src/app/services/analysis/gerencial-manager-authorization.service';
import { ManagementActService } from 'src/app/services/analysis/management-act.service';
import { FilenameService } from 'src/app/services/data/filename.service';
import { MysqlService } from 'src/app/services/mysql/mysql.service';
import { Analysis, ExpresionFormatDate, SuspendedAnalysisStatus } from 'src/Utils/constants';

@Component({
  selector: 'app-formalization',
  templateUrl: './formalization.component.html',
  styleUrls: ['./formalization.component.scss']
})
export class FormalizationComponent implements OnInit {
  formatDate = ExpresionFormatDate
  @Input()
  pageFormalization: number = 0

  @Input()
  lastRequest

  @Input()
  dataCustomer

  @Input()
  requestIdSelected = -1

  @Output()
  changePage?= new EventEmitter<number>()

  @Output()
  addLastView?= new EventEmitter<any>()

  @Output()
  returnview?= new EventEmitter<any>()

  @Output()
  showDocuments?= new EventEmitter<any>()

  @Output()
  downloadDocuments?= new EventEmitter<any>()

  @Output()
  changeAnalysis?= new EventEmitter<Analysis>()

  @Output()
  changeOperationsArea?= new EventEmitter<number>()

  @Output()
  changeLegalAnalisis?= new EventEmitter<number>()

  @Output()
  changeCouncilApproval?= new EventEmitter<number>()

  @Output()
  changeComplianceVerification?= new EventEmitter<number>()

  @Output()
  changeOperationsAreaReport?= new EventEmitter<number>()

  @Output()
  changeCommercialManagerAuthorization?= new EventEmitter<number>()

  @Output()
  changeGerencialManagerAuthorization?= new EventEmitter<number>()



  customer: any;
  customerType: any;

  formalizationdataList: PaginationTableData = {
    metadata: [
      'Etapa',
      'Tipo Informe',
      'Representante',
      'Fecha de aprobación',
      'Verificado',
      'Acciones'
    ],
    data: [

    ]
  }
  formalizationSelected: CommercialAnalysis
  updateFormalizationForm = new FormGroup({
    comment: new FormControl("", [Validators.required]),
    valid_documents: new FormControl("", [Validators.required])
  })
  councilApprovalDocumentsList: PaginationTableData = {
    metadata: [
      'Nombre',
      'Comentario',
      'Acciones',
    ],
    data: [

    ],
  }
  formalization_docs_valid = 0
  initFormalization = false
  FormUploadDocumentsCA = new FormGroup({
    uploaddocsca_comment: new FormControl("", [Validators.required]),
  });
  arraymodals = []
  existconditionsheet = false
  existmanagementAct = false
  reporList = [
    'Informe Área de Operaciones',
    'Legal',
    'Cumplimiento',
    'Autorización Gerente Comercial',
    'Autorización Gerente General',
    'Informe Autorización de consejo'
  ]
  suspendedMessage = 'El informe se encuentra suspendido, es necesario realizar todas las verificaciones necesarias y posteriormente aceptar el análisis. '
  constructor(
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private mysqlService: MysqlService,
    private filenameS: FilenameService,
    private toastr: ToastrService,
    private _analysis: AnalysisService,
    private _formalization: FormalizationService,
    private _commercialManagerService: CommercialManagerAuthorizationService,
    private _conditionSheetService: ConditionSheetService,
    private _alertService: AlertsService,
    private _gerencialManagerAuthorization: GerencialManagerAuthorizationService,
    private _managementActService: ManagementActService,
    private AnalysisService: AllAnalysisService
  ) { }

  async ngOnInit() {
    this.spinner.show()
    await this.listAllReports()
    await this.getInit()
    await this.getFormalizationAllInfo()
    await this.getConditionSheet()
    await this.getManagementAct()
    this.spinner.hide()
  }
  async getConditionSheet() {
    const res = await this._commercialManagerService.getAnalysis(this.requestIdSelected).toPromise().then(async (response) => {
      if (response && response != null) {
        //tenemos el analysis
        await this._conditionSheetService.getConditionSheet(response.id_commercialanalysis).toPromise().then((condition) => {
          if (condition && condition != null) {
            this.existconditionsheet = true
          }
        })
      }
    }).catch((e) => {
      this._alertService.errorCreatedDocument(e)
    })
    return res
  }
  async getManagementAct() {
    const res = await this._managementActService.managementAct(this.requestIdSelected).toPromise().then(async (response) => {
      if (response && response != null) {
        //tenemos el analysis
        this.existmanagementAct = true
      }
    }).catch((e) => {
      this._alertService.errorCreatedDocument(e)
    })
    return res
  }
  changeView(input) {
    this.changePage.emit(input)
  }
  showReport() {
    this.addLastView.emit({ target: 'Formalizacion', page: this.pageFormalization })
    this.changeView(2)
  }
  returnview2() {
    this.returnview.emit()
    this.ngOnInit()
  }
  async listAllReports() {
    const res = this._analysis.listAllreports(this.requestIdSelected).toPromise().then((response) => {

      this.formalizationdataList.data = response.filter(item => this.reporList.includes(item.uploaddocsca_comment))
      console.log(response)
    })
    return res
  }
  async getInit() {
    let sub = this._formalization.getInit(this.requestIdSelected).toPromise().then(
      async (response) => {
        this.initFormalization = response
        if (response == true) {
          await this.getFormalization()
        }
      }
    ).catch((err) => {
      this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
    })
    return sub
  }
  async getFormalization() {
    let sub = this._formalization.getAnalysis(this.requestIdSelected).toPromise()
      .then(async (response: CommercialAnalysis) => {
        this.formalizationSelected = response
        this.formalization_docs_valid = +response.valid_documents
        this.updateFormalizationForm.controls['comment'].setValue(response.commercialanalysis_comment)
        await this.getAllDocuments()
      }).catch((err) => {
        this.toastr.error('Error', 'Ha ocurrido un problema obteniendo informacion')
      })
    return sub
  }
  async getAllDocuments() {
    const sub = this._formalization.listDocuments(this.formalizationSelected.id_commercialanalysis)
      .toPromise().then((response) => {
        this.councilApprovalDocumentsList.data = response
      }).catch((err) => {
        this.toastr.error('Error', 'Ha ocurrido un problema')
      })
    return sub
  }
  initAnalysisMethod() {
    this.spinner.show()
    let value = this.updateFormalizationForm.value
    let reg: CommercialAnalysis = {
      id_request: this.requestIdSelected,
      id_customer: this.dataCustomer.customer_id,
      commercialanalysis_comment: value.comment,
      valid_documents: value.valid_documents
    }
    if (this.initFormalization == false) {
      let sub = this._formalization.initAnalysis(reg).toPromise().then((response) => {

        this.toastr.success('Éxito', 'Se ha iniciado el análisis');
        this.updateFormalizationForm.reset()
        this.formalizationSelected = response
        this.initFormalization = true
        this.getFormalizationAllInfo()
        this.spinner.hide()

      }).catch((e) => {
        this.toastr.error('error', 'Ocurrió un error');
        this.spinner.hide()
      })
      return sub
    } else {
      let sub = this._formalization.updateAnalysis(this.formalizationSelected.id_commercialanalysis, value.comment, value.valid_documents).toPromise().then((response) => {
        this.formalizationSelected = response
        this.toastr.success('Análisis Actualizado', 'Éxito')
        this.updateFormalizationForm.reset()
        this.getFormalizationAllInfo()
        this.spinner.hide()
      }).catch((err) => {
        this.toastr.error('Error', 'Ha ocurrido un problema ' + err.message)
        this.spinner.hide()
      })
      return sub
    }
  }
  async getFormalizationAllInfo() {
    if (this.initFormalization) {
      await this.getFormalization()
    }
  }
  openModalUploadlGerencialManagerAuthorization(targetModal) {
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
          id_commercialanalisys: this.formalizationSelected.id_commercialanalysis,
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
              this.getFormalizationAllInfo()
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
  deleteDocCA(doc) {
    this.mysqlService
      .deleteDocsCA(doc.id_uploaddocsca)
      .toPromise()
      .then(async (response) => {
        this.toastr.success("Se ha eliminado el Documento", "Documento Eliminado!")
        // this.ngOnInit();

        this.getFormalizationAllInfo()

      })
      .catch((error) => {
        this.toastr.error("Problemas con el servidor.", "Ha ocurrido un error")
        console.log(error)
      })
  }
  closeBtnClick() {
    console.log('Se va a cerrar el modal');
    if (this.arraymodals.length > 0)
      this.arraymodals.pop().close()
    else
      this.modalService.dismissAll()
  }
  openReport(target) {
    this.addLastView.emit({ target: 'Formalizacion', page: this.pageFormalization })
    console.log('aaaa', target)
    switch (target) {
      case 'Legal':
        this.changeAnalysis.emit(Analysis.legal_analysis)
        this.changeLegalAnalisis.emit(2)
        break
      case 'Cumplimiento':
        this.changeAnalysis.emit(Analysis.compliance_verification)
        this.changeComplianceVerification.emit(2)
        break
      case 'Informe Área de Operaciones':
        this.changeAnalysis.emit(Analysis.operations_area_report)
        this.changeOperationsAreaReport.emit(2)
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
      case 'Informe Autorización de consejo':
        this.changeAnalysis.emit(Analysis.council_approval)
        this.changeCouncilApproval.emit(2)
        break
      case 'Documento de escritura':
        this.changeAnalysis.emit(Analysis.commercial_manager_authorization)
        this.changeCommercialManagerAuthorization.emit(4)
        break
    }
  }
  showConditionSheet() {
    this.addLastView.emit({ target: 'Formalizacion', page: this.pageFormalization })
    this.changeAnalysis.emit(Analysis.commercial_manager_authorization)
    this.changeCommercialManagerAuthorization.emit(2)
  }
  showManagementAct() {
    this.addLastView.emit({ target: 'Formalizacion', page: this.pageFormalization })
    this.changeAnalysis.emit(Analysis.gerencial_manager_authorization)
    this.changeGerencialManagerAuthorization.emit(4)
  }
  changeVerificationsDocsLegalAnalysis(event) {
    console.log(event)
    this.updateFormalizationForm.controls['valid_documents'].setValue(event)
  }
  suspend() {
    this._analysis.changeStatus(this.formalizationSelected.id_commercialanalysis, SuspendedAnalysisStatus).toPromise().then((response) => {
      this._alertService.warningSuspendedAnalysis()
      this.ngOnInit()
    }).catch((error) => {
      console.log(error)
      this._alertService.errorCreatedDocument(error)
    })
  }
  downloadAllDocs() {
    this.spinner.show()
    this.AnalysisService.downloadDocumentsAll(this.lastRequest.request_id, () => this.spinner.hide())
    this.toastr.success('Éxito', 'Se han descargado los documentos')
    this.toastr.info('La descarga puede tardar un poco...', 'Descarga en Proceso')
  }
}
