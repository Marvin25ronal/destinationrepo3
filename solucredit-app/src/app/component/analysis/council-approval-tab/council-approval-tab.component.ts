import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PaginationTableData } from 'src/app/interfaces/ui/pagination-table.interface';
import { CommercialAnalysis } from 'src/app/models/commercialanalysis.model';
import { CouncilApprovalService } from 'src/app/services/analysis/council-approval.service';
import { FilenameService } from 'src/app/services/data/filename.service';
import { MysqlService } from 'src/app/services/mysql/mysql.service';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { AnalysisService } from 'src/app/services/analysis/analysis.service';
import { Analysis } from 'src/Utils/constants';
import { AllAnalysisService } from 'src/app/services/analysis/all-analysis.service';
@Component({
  selector: 'app-council-approval-tab',
  templateUrl: './council-approval-tab.component.html',
  styleUrls: ['./council-approval-tab.component.scss']
})

export class CouncilApprovalTabComponent implements OnInit {

  @Input()
  pageCouncilApproval: number = 0

  @Input()
  lastRequest

  @Input()
  dataCustomer

  @Input()
  requestIdSelected = -1


  @Output()
  changePage?= new EventEmitter<number>()

  @Output()
  returnview?= new EventEmitter<any>()

  @Output()
  addLastView?= new EventEmitter<any>()

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

  @Output()
  changePageFinancialAnalysis?= new EventEmitter<number>()

  councilApprovalDocumentsList: PaginationTableData = {
    metadata: [
      'Nombre',
      'Comentario',
      'Acciones',
    ],
    data: [

    ],
  }
  council_approval_dataList: PaginationTableData = {
    data: [

    ],
    metadata: [
      '#',
      'Tipo de informe',
      'Responsable',
      'Fecha de aprobación',
      'Verificado',
      'Acciones'
    ]
  }
  updateCouncilApprovalForm = new FormGroup({
    comment: new FormControl("", [Validators.required]),
    valid_documents: new FormControl("", [Validators.required])
  })
  FormUploadDocumentsCA = new FormGroup({
    uploaddocsca_comment: new FormControl("", [Validators.required]),
  });
  initCouncilApproval = false
  councilApprovalSelected: CommercialAnalysis
  council_approval_docs_valid = 0;
  arraymodals = []
  reporList = [
    'Informe Área de Operaciones',
    'Informe Análisis Financiero',
    'Legal',
    'Cumplimiento',
    'Autorización Gerente Comercial',
    'Autorización Gerente General',
  ]

  openReport(target) {
    this.addLastView.emit({ target: 'Consejo', page: this.pageCouncilApproval })
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
      case 'Informe Análisis Financiero':
        this.changeAnalysis.emit(Analysis.financial_analysis)
        this.changePageFinancialAnalysis.emit(3)
        break


    }
  }
  openConditionSheet() {
    this.changeAnalysis.emit(Analysis.commercial_manager_authorization)
    this.changeCommercialManagerAuthorization.emit(2)
  }
  openAct() {
    this.changeAnalysis.emit(Analysis.gerencial_manager_authorization)
    this.changeGerencialManagerAuthorization.emit(2)
  }
  constructor(
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private mysqlService: MysqlService,
    private filenameS: FilenameService,
    private _councilApproval: CouncilApprovalService,
    private toastr: ToastrService,
    private _analysis: AnalysisService,
    private AnalysisService: AllAnalysisService,
  ) { }

  async ngOnInit() {
    console.log('MANDANDO SOLICITUD');
    console.log(this.lastRequest);
    this.spinner.show()
    await this.listAllReports()
    await this.getInit()
    await this.getCouncilApprovalAllInfo()
    this.spinner.hide()
  }
  async getInit() {
    let sub = this._councilApproval.getInit(this.requestIdSelected).toPromise().then(
      async (response) => {
        this.initCouncilApproval = response
        if (response == true) {
          await this.getCouncilApproval()
        }
      }
    ).catch((err) => {
      this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
    })
    return sub
  }
  async getCouncilApproval() {
    let sub = this._councilApproval.getAnalysis(this.requestIdSelected).toPromise()
      .then(async (response: CommercialAnalysis) => {
        this.councilApprovalSelected = response
        this.council_approval_docs_valid = +response.valid_documents

        this.updateCouncilApprovalForm.controls['comment'].setValue(response.commercialanalysis_comment)
        await this.getAllDocuments()
      }).catch((err) => {
        this.toastr.error('Error', 'Ha ocurrido un problema obteniendo informacion')
      })
    return sub
  }
  async getAllDocuments() {
    const sub = this._councilApproval.listDocuments(this.councilApprovalSelected.id_commercialanalysis)
      .toPromise().then((response) => {
        this.councilApprovalDocumentsList.data = response
      }).catch((err) => {
        this.toastr.error('Error', 'Ha ocurrido un problema')
      })
    return sub
  }
  changeView(input) {
    this.changePage.emit(input)
  }
  showReport() {
    this.addLastView.emit({ target: 'Consejo', page: this.pageCouncilApproval })
    this.changeView(2)
  }
  returnview2() {
    this.returnview.emit()
    this.ngOnInit()
  }

  async listAllReports() {
    const res = this._analysis.listAllreports(this.requestIdSelected).toPromise().then((response) => {
      console.log(response)
      this.council_approval_dataList.data = response.filter(item => this.reporList.includes(item.uploaddocsca_comment))
    })
    return res
  }
  initAnalysisMethod() {
    this.spinner.show()
    let value = this.updateCouncilApprovalForm.value
    let reg: CommercialAnalysis = {
      id_request: this.requestIdSelected,
      id_customer: this.dataCustomer.customer_id,
      commercialanalysis_comment: value.comment,
      valid_documents: value.valid_documents
    }
    if (this.initCouncilApproval == false) {
      let sub = this._councilApproval.initAnalysis(reg).toPromise().then((response) => {
        this.toastr.success('Éxito', 'Se ha iniciado el análisis');
        this.updateCouncilApprovalForm.reset()
        this.councilApprovalSelected = response
        this.getCouncilApprovalAllInfo()
        this.spinner.hide()
      }).catch((e) => {
        this.toastr.error('error', 'Ocurrió un error');
        this.spinner.hide()
      })
      return sub
    } else {
      let sub = this._councilApproval.updateAnalysis(this.councilApprovalSelected.id_commercialanalysis, value.comment, value.valid_documents).toPromise().then((response) => {
        this.councilApprovalSelected = response
        this.toastr.success('Análisis Actualizado', 'Éxito')
        this.updateCouncilApprovalForm.reset()
        this.getCouncilApprovalAllInfo()
        this.spinner.hide()
      }).catch((err) => {
        this.toastr.error('Error', 'Ha ocurrido un problema ' + err.message)
        this.spinner.hide()
      })
      return sub
    }
  }
  async getCouncilApprovalAllInfo() {
    if (this.initCouncilApproval) {
      await this.getCouncilApproval()
      await this.listAllReports()
      await this.getInit()
      //await this.getCouncilApprovalAllInfo()
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
          id_commercialanalisys: this.councilApprovalSelected.id_commercialanalysis,
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
              this.getCouncilApprovalAllInfo()
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

        this.getCouncilApprovalAllInfo()

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
  changeVerificationsDocsLegalAnalysis(event) {
    console.log(event)
    this.updateCouncilApprovalForm.controls['valid_documents'].setValue(event)
  }

  downloadAllDocs() {
    this.spinner.show()
    this.AnalysisService.downloadDocumentsAll(this.lastRequest.request_id, () => this.spinner.hide())
    this.toastr.success('Éxito', 'Se han descargado los documentos')
    this.toastr.info('La descarga puede tardar un poco...', 'Descarga en Proceso')
  }
}
