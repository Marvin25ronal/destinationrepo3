import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { WFActivityView } from 'src/app/models/wf_document.model';
import { AnalysisService } from 'src/app/services/analysis/analysis.service';
import { CommercialCheckListItem } from 'src/app/services/analysis/commercialanalysis.service';
import { ComplianceCheckListItem } from 'src/app/services/analysis/compliance-verification.service';
import { ChecklistItem, LegalCheckListItem } from 'src/app/services/analysis/legal-analysis.service';
import { Analysis } from 'src/Utils/constants';
import { DirectiveComponent } from '../../fdt/directive/directive.component';
import { DocumentmodalComponent } from '../../modals/documentmodal/documentmodal.component';
import { LegalAnalysisTabComponent } from '../legal-analysis-tab/legal-analysis-tab.component';

@Component({
  selector: 'app-analysis-tab',
  templateUrl: './analysis-tab.component.html',
  styleUrls: ['./analysis-tab.component.scss'],
})
export class AnalysisTabComponent implements OnInit {
  //Variables
  pageAnalysis = [
    Analysis.commercial_assistant_analysis,
    Analysis.legal_analysis,
    Analysis.compliance_verification,
    Analysis.commercial_manager_authorization,
    Analysis.gerencial_manager_authorization,
    Analysis.customer_registration
  ]
  pageCupoConfiguration = [
    Analysis.legal_analysis,
    Analysis.compliance_verification,
    Analysis.commercial_manager_authorization,
    Analysis.operations_area_report,
    Analysis.analysis_area_transfer,
    Analysis.financial_analysis,
    Analysis.gerencial_manager_authorization,
    Analysis.council_approval,
    Analysis.formalization,
    Analysis.customer_registration

  ]
  selectAnalysis: Analysis = null;
  analysis_type = Analysis;
  viewStack: { report: string, index: number }[] = []
  targetUploadDocuments: string
  imgsrcbase64;
  pdfsrcbase64
  arraymodals = []
  /**
   *
   * ╭━━┳━━┳━━┳┳━╮╭━━┳━━╮
     ┃╭╮┃╭╮┃╭╮┣┫╭╮┫╭╮┃━━┫
     ┃╰╯┃╭╮┃╰╯┃┃┃┃┃╭╮┣━━┃
     ┃╭━┻╯╰┻━╮┣┻╯╰┻╯╰┻━━╯
     ┃┃╱╱╱╱╭━╯┃
     ╰╯╱╱╱╱╰━━╯
   * 
   * */
  pageLegalAnalysis: number = 0
  pageComplianceVerification: number = 0
  pageCommercialManagerAuthorization: number = 0
  pageCustomerRegistration: number = 0
  pageGerencialManagerAuthorization: number = 0
  pageCommercialAnalysis: number = 0
  pageOperationsAreaReport: number = 0
  pageAnalysisAreaTransfer: number = 0
  pageFinancialAnalysis: number = 0
  pageCouncilApproval: number = 0
  pageFormalization: number = 0

  //Entradas y salidas
  @Input()
  showViews: string[] = [] //en donde dice que vistas son disponibles

  @Input()
  requestIdSelected: number = -1

  @Input()
  dataCustomer

  @Input()
  lastRequest

  @Input()
  requestAvalsInfo

  @Input()
  default_views?: WFActivityView[]

  @Input()
  document_serie_id?: number

  @Input()
  groupSubjectList: any

  //Childs
  @ViewChild('viewdocuments') private viewDocuments: TemplateRef<{}>

  @ViewChild(DocumentmodalComponent) viewDocumentModal: DocumentmodalComponent


  constructor(
    private _analysisService: AnalysisService,
    private sanitizer: DomSanitizer,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    console.log(' ^^^^^^^^ ANALISIS ^^^^^^^');
    console.log(this.analysis_type)
    //console.log(this.groupSubjectList)
    this.autoMove()
  }
  autoMove() {
    debugger
    if (this.default_views) {
      for (let i = 0; i < this.default_views.length; i++) {
        switch (this.default_views[i].view.name_enum) {
          case Analysis.commercial_assistant_analysis:
            this.selectAnalysis = Analysis.commercial_assistant_analysis
            break
          case Analysis.commercial_manager_authorization:
            this.selectAnalysis = Analysis.commercial_manager_authorization
            break
          case Analysis.compliance_verification:
            this.selectAnalysis = Analysis.compliance_verification
            break
          case Analysis.customer_registration:
            this.selectAnalysis = Analysis.customer_registration
            break
          case Analysis.gerencial_manager_authorization:
            this.selectAnalysis = Analysis.gerencial_manager_authorization
            break
          case Analysis.legal_analysis:
            this.selectAnalysis = Analysis.legal_analysis
            break
          case Analysis.operations_area_report:
            this.selectAnalysis = Analysis.operations_area_report
            break
          case Analysis.analysis_area_transfer:
            this.selectAnalysis = Analysis.analysis_area_transfer
            break
          case Analysis.financial_analysis:
            this.selectAnalysis = Analysis.financial_analysis
            break
          case Analysis.council_approval:
            this.selectAnalysis = Analysis.council_approval
            break
          case Analysis.formalization:
            this.selectAnalysis = Analysis.formalization
            break

        }
      }
      // if (this.selectAnalysis == null || this.selectAnalysis == undefined) {
      //   this.selectAnalysis = Analysis.commercial_assistant_analysis
      // }
    } else {
      this.selectAnalysis = Analysis.commercial_assistant_analysis
    }
  }

  disableView(view: string) {
    let find = this.showViews.find(item => item == view)
    if (find)
      return false
    return true
  }
  async onSelectAnalysis(process: Analysis) {
    //Tenemos que ver si se puede seleccionar el analisis
    this.selectAnalysis = process
  }
  /**
   * ╱╱╱╱╱╱╱╱╱╭╮╱╱╱╱╱╱╱╱╱╱╱╭╮
╱╱╱╱╱╱╱╱╱┃┃╱╱╱╱╱╱╱╱╱╱╱┃┃
╭━━┳━━┳╮╭┫╰━┳┳━━┳━━╮╭━╯┣━━╮╭━━┳━━┳━━┳┳━╮╭━━╮
┃╭━┫╭╮┃╰╯┃╭╮┣┫╭╮┃━━┫┃╭╮┃┃━┫┃╭╮┃╭╮┃╭╮┣┫╭╮┫╭╮┃
┃╰━┫╭╮┃┃┃┃╰╯┃┃╰╯┣━━┃┃╰╯┃┃━┫┃╰╯┃╭╮┃╰╯┃┃┃┃┃╭╮┃
╰━━┻╯╰┻┻┻┻━━┻┻━━┻━━╯╰━━┻━━╯┃╭━┻╯╰┻━╮┣┻╯╰┻╯╰╯
╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱┃┃╱╱╱╱╭━╯┃
╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╰╯╱╱╱╱╰━━╯
   * */
  changePageComplianceVerification(value) {
    this.pageComplianceVerification = value
  }
  changePageLegalAnalysis(value) {
    this.pageLegalAnalysis = value
  }
  changePageGerencialManagerAuthorization(value) {
    this.pageGerencialManagerAuthorization = value
  }
  changeCommercialManagerAuthorization(value) {
    this.pageCommercialManagerAuthorization = value
  }
  changePageCommercialAnalysis(value) {
    this.pageCommercialAnalysis = value
  }
  changeTargetUploadDocuments(value) {
    this.targetUploadDocuments = value
  }
  changeCommercialAnalysis(value) {
    this.pageCommercialAnalysis = value
  }
  changeComercialManagerAuthorization(value) {
    this.pageCommercialManagerAuthorization = value
  }
  changeGerencialManagerAuthorization(value) {
    this.pageGerencialManagerAuthorization = value
  }
  changeCustomerRegistration(value) {
    this.pageCustomerRegistration = value
  }
  changePageOperationsAreaReport(value) {
    this.pageOperationsAreaReport = value
  }
  changePageAnalysisAreaTransfer(value) {
    this.pageAnalysisAreaTransfer = value
  }
  changePageFinancialAnalysis(value) {
    this.pageFinancialAnalysis = value
  }
  changePageCouncilApproval(value) {
    this.pageCouncilApproval = value
  }
  changePageFormalization(value) {
    this.pageFormalization = value
  }





  addLastView(obj) {
    this.viewStack.push(
      {
        index: obj.page,
        report: obj.target
      }
    )
  }
  removeLastView() {
    return this.viewStack.pop()
  }
  async ViewAnalysisDocument(doc) {
    this.spinner.show();
    //console.log(doc)
    await this._analysisService.showDocument(doc.id_uploaddocsca).toPromise()
      .then((response) => {
        this.imgsrcbase64 = null;
        this.pdfsrcbase64 = null;
        console.log(response)
        if (response.type === 'image') {
          let urls =
            "data:image/jpg;base64;base64," + response.url;
          this.imgsrcbase64 = this.sanitizer.bypassSecurityTrustResourceUrl(
            urls
          );
        } else if (response.type === 'pdf') {
          let urls =
            response.url;
          this.pdfsrcbase64 = urls
          console.log(urls);
        }
        this.spinner.hide()

        this.viewDocumentModal.openModal()
        //this.openModal(this.viewDocuments)
      }).catch((error) => {
        this.toastr.error("Problemas con el servidor.", "Oops!");
        this.spinner.hide()
        console.log(error)
      });
  }
  async showLegalVerificationDocument(doc: LegalCheckListItem) {
    this.spinner.show();
    await this._analysisService.showLegalVerificationDocument(doc).toPromise()
      .then((response) => {
        this.imgsrcbase64 = null;
        this.pdfsrcbase64 = null;
        if (response.type == 'image') {
          let urls =
            "data:image/jpg;base64;base64," + response.url;
          this.imgsrcbase64 = this.sanitizer.bypassSecurityTrustResourceUrl(
            urls
          );
        } else if (response.type === 'pdf') {
          let urls =
            response.url;
          this.pdfsrcbase64 = urls
          console.log(urls);
        }
        this.spinner.hide()
        this.viewDocumentModal.openModal()
      }).catch((error) => {
        this.toastr.error("Problemas con el servidor.", "Oops!");
        this.spinner.hide()
      })
  }
  async showCommercialVerificationDocument(doc: CommercialCheckListItem) {
    this.spinner.show();
    await this._analysisService.showCommercialVerificationDocument(doc).toPromise()
      .then((response) => {
        this.imgsrcbase64 = null;
        this.pdfsrcbase64 = null;
        if (response.type == 'image') {
          let urls =
            "data:image/jpg;base64;base64," + response.url;
          this.imgsrcbase64 = this.sanitizer.bypassSecurityTrustResourceUrl(
            urls
          );
        } else if (response.type === 'pdf') {
          let urls =
            response.url;
          this.pdfsrcbase64 = urls
          console.log(urls);
        }
        this.spinner.hide()
        this.viewDocumentModal.openModal()
      }).catch((error) => {
        this.toastr.error("Problemas con el servidor.", "Oops!");
        this.spinner.hide()
      })
  }
  async showComplianceVerificationDocument(doc: ComplianceCheckListItem) {
    this.spinner.show();
    await this._analysisService.showComplianceVerificationDocument(doc).toPromise()
      .then((response) => {
        this.imgsrcbase64 = null;
        this.pdfsrcbase64 = null;
        if (response.type == 'image') {
          let urls =
            "data:image/jpg;base64;base64," + response.url;
          this.imgsrcbase64 = this.sanitizer.bypassSecurityTrustResourceUrl(
            urls
          );
        } else if (response.type === 'pdf') {
          let urls =
            response.url;
          this.pdfsrcbase64 = urls
          console.log(urls);
        }
        this.spinner.hide()
        this.viewDocumentModal.openModal()
      }).catch((error) => {
        this.toastr.error("Problemas con el servidor.", "Oops!");
        this.spinner.hide()
      })
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
  DownloadAnalysisDocument(doc) {
    console.log(doc)
    this._analysisService.downloadDocument(doc.id_uploaddocsca, doc.uploaddocsca_namedoc)
    this.toastr.success('Éxito', 'Se han descargado los documentos')
  }


  async ViewAnalysisDocumentChecklist(doc:ChecklistItem) {
    this.spinner.show()
    console.log(doc)
    await this._analysisService.showAnyDocument(doc.key,doc.document_name).toPromise()
      .then((response) => {
        this.imgsrcbase64 = null;
        this.pdfsrcbase64 = null;
        console.log(response)
        if (response.type === 'image') {
          let urls =
            "data:image/jpg;base64;base64," + response.url;
          this.imgsrcbase64 = this.sanitizer.bypassSecurityTrustResourceUrl(
            urls
          );
        } else if (response.type === 'pdf') {
          let urls =
            "data:application/pdf;base64," + response.url;
          this.pdfsrcbase64 = response.url
          console.log(urls);
        }
        this.spinner.hide()
        this.viewDocumentModal.openModal()
      }).catch((error) => {
        this.toastr.error("Problemas con el servidor.", "Oops!");
        this.spinner.hide()
        console.log(error)
      });

  }
  DownloadChecklistAnalysisDocument(doc) {
    this._analysisService.downloadAnyDocument(doc.document_name, doc.key)
    this.toastr.success('Éxito', 'Se han descargado los documentos')
  }
  async downloadLegalVerificationDocument(doc: LegalCheckListItem) {
    this._analysisService.downloadAnyDocument(doc.checklist_document_name, doc.checklist_document_key)
    this.toastr.success('Éxito', 'Se han descargado los documentos')
  }
  async downloadCommercialVerificationDocument(doc: CommercialCheckListItem) {
    this._analysisService.downloadAnyDocument(doc.checklist_document_name, doc.checklist_document_key)
    this.toastr.success('Éxito', 'Se han descargado los documentos')
  }
  async downloadComplianceVerificationDocument(doc: ComplianceCheckListItem) {
    this._analysisService.downloadAnyDocument(doc.checklist_document_name, doc.checklist_document_key)
    this.toastr.success('Éxito', 'Se han descargado los documentos')
  }
  changeAnalysis(value) {
    this.selectAnalysis = value
  }

  //Change page cupo

  returnview() {
    let last_view = this.removeLastView()

    if (!last_view) {
      switch (this.selectAnalysis) {
        case Analysis.legal_analysis:
          this.pageLegalAnalysis = 0
          break
        case Analysis.commercial_assistant_analysis:
          this.pageCommercialAnalysis = 0
        //   break
        case Analysis.compliance_verification:
          this.pageComplianceVerification = 0
          break
        case Analysis.commercial_manager_authorization:
          this.pageCommercialManagerAuthorization = 0
          break
        case Analysis.gerencial_manager_authorization:
          this.pageGerencialManagerAuthorization = 0
          break
        case Analysis.customer_registration:
          this.pageCustomerRegistration = 0
          break
        case Analysis.operations_area_report:
          this.pageOperationsAreaReport = 0
        case Analysis.financial_analysis:
          this.pageFinancialAnalysis = 0
          break
        case Analysis.council_approval:
          this.pageCouncilApproval = 0
          break
        case Analysis.formalization:
          this.pageFormalization = 0
          break
      }
    } else {
      this.returnDefaultView()
      if (last_view.report == 'Legal') {
        this.selectAnalysis = Analysis.legal_analysis
        this.pageLegalAnalysis = last_view.index
      } else if (last_view.report == 'Comercial') {
        this.selectAnalysis = Analysis.commercial_assistant_analysis
        this.pageCommercialAnalysis = last_view.index
      } else if (last_view.report == 'Cumplimiento') {
        this.selectAnalysis = Analysis.compliance_verification
        this.pageComplianceVerification = last_view.index
      } else if (last_view.report == 'Gerente Comercial') {
        this.selectAnalysis = Analysis.commercial_manager_authorization
        this.pageCommercialManagerAuthorization = last_view.index
      } else if (last_view.report == 'Alta Cliente') {
        this.selectAnalysis = Analysis.customer_registration
        this.pageCustomerRegistration = last_view.index
      } else if (last_view.report == 'Gerente General') {
        this.selectAnalysis = Analysis.gerencial_manager_authorization
        this.pageGerencialManagerAuthorization = last_view.index
      } else if (last_view.report == 'Operaciones') {
        this.selectAnalysis = Analysis.operations_area_report
        this.pageOperationsAreaReport = last_view.index
      } else if (last_view.report == 'Consejo') {
        this.selectAnalysis = Analysis.council_approval
        this.pageCouncilApproval = last_view.index
      } else if (last_view.report == 'Financiero') {
        this.selectAnalysis = Analysis.financial_analysis
        this.pageFinancialAnalysis = last_view.index
      } else if (last_view.report == 'Formalizacion') {
        this.selectAnalysis = Analysis.formalization
        this.pageFormalization = last_view.index
      }
    }
  }
  returnDefaultView() {
    if (this.selectAnalysis == Analysis.legal_analysis) {
      this.pageLegalAnalysis = 0
    } else if (this.selectAnalysis == Analysis.commercial_assistant_analysis) {
      this.pageCommercialAnalysis = 0
    } else if (this.selectAnalysis == Analysis.compliance_verification) {
      this.pageComplianceVerification = 0
    } else if (this.selectAnalysis == Analysis.commercial_manager_authorization) {
      this.pageCommercialManagerAuthorization = 0
    } else if (this.selectAnalysis == Analysis.customer_registration) {
      this.pageCustomerRegistration = 0
    } else if (this.selectAnalysis == Analysis.gerencial_manager_authorization) {
      this.pageGerencialManagerAuthorization = 0
    } else if (this.selectAnalysis == Analysis.operations_area_report) {
      this.pageOperationsAreaReport = 0
    } else if (this.selectAnalysis == Analysis.council_approval) {
      this.pageCouncilApproval = 0
    } else if (this.selectAnalysis == Analysis.financial_analysis) {
      this.pageFinancialAnalysis = 0
    } else if (this.selectAnalysis == Analysis.formalization) {
      this.pageFormalization = 0
    }
  }

}
