import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PaginationTableData } from 'src/app/interfaces/ui/pagination-table.interface';
import { CommercialAnalysis } from 'src/app/models/commercialanalysis.model';
import { OperationsAreaReportService } from 'src/app/services/analysis/operations-area-report.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MysqlService } from 'src/app/services/mysql/mysql.service';
import { FilenameService } from 'src/app/services/data/filename.service';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { CommercialManagerAuthorizationService } from 'src/app/services/analysis/commercial-manager-authorization.service';
@Component({
  selector: 'app-operations-area-report-tab',
  templateUrl: './operations-area-report-tab.component.html',
  styleUrls: ['./operations-area-report-tab.component.scss']
})
export class OperationsAreaReportTabComponent implements OnInit {

  @Input()
  pageOperationsAreaReport: number = 0

  @Input()
  dataCustomer

  @Input()
  lastRequest

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




  arraymodals = []
  previous_operation: boolean = false
  operations_area_report_docs_valid = 0;
  initOperationsAreaReport = false
  operationsAreaReportSelected: CommercialAnalysis

  operations_area_report_dataList: PaginationTableData = {
    metadata: [
      '#',
      'Tipo de Informe',
      'Responsable',
      'Fecha de aprobación',
      'Verificado',
      'Acciones'
    ],
    data: [
      {
        name: 'Historial de autorizaciones',
        responsable: 'Solucredit-APP',
        approvation_date: new Date(),
        check: 0
      }
    ]
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
  updateOperationsAreaReportForm = new FormGroup({
    comment: new FormControl("", [Validators.required]),
    valid_documents: new FormControl("", [Validators.required])
  })
  FormUploadDocumentsCA = new FormGroup({
    uploaddocsca_comment: new FormControl("", [Validators.required]),
  });
  constructor(
    private toastr: ToastrService,
    private _operationsAreaReportService: OperationsAreaReportService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private mysqlService: MysqlService,
    private filenameS: FilenameService,
    private _commercialManagerAuthorization:CommercialManagerAuthorizationService
  ) { }

  async ngOnInit() {
    this.spinner.show()
    await this.getInit()
    await this.getOperationsAreaAllInfo()
    this.spinner.hide()
  }

  async getInit() {
    let sub = this._operationsAreaReportService.getInit(this.requestIdSelected).toPromise().then(
      async (response) => {
        this.initOperationsAreaReport = response
        if (response == true) {
          await this.getOperationsAreaReport()
        }
      }
    ).catch((err) => {
      this.toastr.error('Error', 'Ha ocurrido un problema' + err.message);
    })
    return sub
  }
  async getOperationsAreaReport() {
    let sub = this._operationsAreaReportService.getAnalysis(this.requestIdSelected).toPromise().then(
      async (response: CommercialAnalysis) => {
        this.operationsAreaReportSelected = response
        this.operations_area_report_docs_valid = +response.valid_documents
        this.updateOperationsAreaReportForm.controls['comment'].setValue(response.commercialanalysis_comment)
        await this.getAllDocuments()
      }
    ).catch((err) => {
      this.toastr.error('Error', 'Ha ocurrido un problema obteniendo informacion')
    })
    return sub
  }
  initAnalysisMethod() {
    this.spinner.show()
    let value = this.updateOperationsAreaReportForm.value
    let reg: CommercialAnalysis = {
      id_request: this.requestIdSelected,
      id_customer: this.dataCustomer.customer_id,
      commercialanalysis_comment: value.comment,
      valid_documents: value.valid_documents
    }

    if (this.initOperationsAreaReport == false) {
      let sub = this._operationsAreaReportService.initAnalysis(reg).toPromise().then((response) => {
        this.toastr.success('Éxito', 'Se ha iniciado el análisis');
        this.updateOperationsAreaReportForm.reset()
        this.operationsAreaReportSelected = response
        this.getOperationsAreaAllInfo()
        this.spinner.hide()
      }).catch((e) => {
        this.toastr.error('error', 'Ocurrió un error');
        this.spinner.hide()
      })

      return sub
    } else {
      let sub = this._operationsAreaReportService.updateAnalysis(this.operationsAreaReportSelected.id_commercialanalysis, value.comment, value.valid_documents).toPromise().then((response) => {
        this.operationsAreaReportSelected = response
        this.toastr.success('Análisis Actualizado', 'Éxito')
        this.updateOperationsAreaReportForm.reset()
        this.getOperationsAreaAllInfo()
        this.spinner.hide()
      }).catch((err) => {
        this.toastr.error('Error', 'Ha ocurrido un problema ' + err.message)
        this.spinner.hide()
      })

      return sub
    }

  }
  async getOperationsAreaAllInfo() {
    if (this.initOperationsAreaReport) {
      await this.getOperationsAreaReport()
    }

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
  openModalUploadlGerencialManagerAuthorization(targetModal) {
    this.FormUploadDocumentsCA.reset({});
    this.openModal(targetModal)
  }

  changeView(input) {
    this.changePage.emit(input)
  }
  returnview2() {
    this.returnview.emit()
    this.ngOnInit()
  }
  showReport() {
    console.log('Mandando a Reporte Operaciones');
    this.addLastView.emit({ target: 'Operaciones', page: this.pageOperationsAreaReport })
    this.changeView(2)
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
          id_commercialanalisys: this.operationsAreaReportSelected.id_commercialanalysis,
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
              this.getOperationsAreaAllInfo()
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
  async getAllDocuments() {
    const sub = this._operationsAreaReportService.listDocuments(this.operationsAreaReportSelected.id_commercialanalysis)
      .toPromise().then((response) => {
        this.OperationsAreaReportList.data = response
      }).catch((err) => {
        this.toastr.error('Error', 'Ha ocurrido un problema')
      })
    return sub
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

        this.getOperationsAreaAllInfo()

      })
      .catch((error) => {
        this.toastr.error("Problemas con el servidor.", "Ha ocurrido un error")
        console.log(error)
      })
  }
  changeVerificationsDocsLegalAnalysis(event) {
    console.log(event)
    this.updateOperationsAreaReportForm.controls['valid_documents'].setValue(event)
  }
  openReportChecklist() {
    let data = this.pageOperationsAreaReport
    this.addLastView.emit({ target: 'Operaciones', page: data })
    this.changePage.emit(2)
  }
  downloadAllReports(){
    try {
      this._commercialManagerAuthorization.getAllReports(this.requestIdSelected)
      this.toastr.success('Se han descargado todos los informes', 'Éxito')
    }
    catch (error) {
      console.log(error);
    }
  }
}
