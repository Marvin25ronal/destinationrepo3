import { Component, OnInit, OnDestroy, Inject, Input, Output, EventEmitter } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PaginationTableData } from 'src/app/interfaces/ui/pagination-table.interface';
import { LegalAnalysisService } from 'src/app/services/analysis/legal-analysis.service';
import { AnalysisType, CommercialAnalysis } from 'src/app/models/commercialanalysis.model';
import { Adviser } from 'src/app/models/adviser.model';
import { MysqlService } from 'src/app/services/mysql/mysql.service';
import { ComplianceVerificationService } from 'src/app/services/analysis/compliance-verification.service';
import { CommercialanalysisService } from 'src/app/services/analysis/commercialanalysis.service';
import { UploaddocumentscaService } from 'src/app/services/analysis/uploaddocumentsca.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas'
import { map, catchError, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import { RolService } from '../rol/services/rol.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmAlertService } from '../../services/alerts/confirm-alert.service';
import { ConditionSheetService } from 'src/app/services/analysis/condition-sheet.service';
import { ConditionSheetRate } from 'src/app/models/conditionSheet.model';
import { Rate } from 'src/app/models/rate.model';
import { Commercial_Manager_Authorization, commission_rate, Compliance_Verification, Customer_Registration, Gerencial_Manager_Authorization, Legal_Analysis } from 'src/Utils/constants';


import { AuthorizedDebtorConditionSheet, ConditionSheet } from 'src/app/models/conditionSheet.model';
import { CommercialManagerAuthorizationService } from 'src/app/services/analysis/commercial-manager-authorization.service';
import { ManagementActService } from 'src/app/services/analysis/management-act.service';
import { ManagementAct } from 'src/app/models/managementact.model';
import { PdfService } from 'src/app/services/pdf.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-analysis-report',
  templateUrl: './analysis-report.component.html',
  styleUrls: ['./analysis-report.component.scss']
})
export class AnalysisReportComponent implements OnInit, OnDestroy {
  @Input()
  analysis_id: number

  @Output()
  return_view = new EventEmitter()
  //constantes
  Commercial_Manager_Authorization = Commercial_Manager_Authorization;
  Gerencial_Manager_Authorization = Gerencial_Manager_Authorization;
  Customer_Registration = Customer_Registration;
  Compliance_Verification = Compliance_Verification
  Legal_Analysis = Legal_Analysis
  commission_rate = commission_rate
  //TERMINA CONSTANTES
  dataList: PaginationTableData = {
    metadata: [
      "No.",
      "Nombre Documento",
      "Requisito",
      "Comentario",
      "Verificado",
    ],
    data: []
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

  date = new Date()
  dia = this.date.getDay();
  mes = this.date.getMonth() + 1;
  year = this.date.getFullYear();
  hour = this.date.getHours();
  min = this.date.getMinutes();
  sec = this.date.getSeconds();
  analysis_typedoc;
  analysisType: AnalysisType
  analysisResponsable: Adviser
  gerencialAnalysisResponsable: Adviser
  othersResponsables: any[] = []
  analysis: CommercialAnalysis
  checkDocuments: number
  customer: any;
  customerType: any;
  request: any;
  typesRequest: any
  typesRequestArray: any[]
  commentUpdoc;
  viewAnalysis: number = 0
  conditionSheetSelected: ConditionSheet
  commercialManagerSelected: CommercialAnalysis
  conditionSheetSavedRates: ConditionSheetRate[]
  rates: Rate[] = []
  conditionsheet;
  managementAct: ManagementAct;
  debtorsConditionSheet: AuthorizedDebtorConditionSheet[] = [];
  //VARIABLE QUE NOS MUESTRA EL TIPO DE REPORTE
  //EN ESTE CASO SERIAN LOS VALORES
  //LEGALM, COMERCIAL, CUMPLIMIENTO-=====0
  //PARA EL DE GERENCIA COMERCIAL ===1
  // GERENCIA GENERAL == 2
  constructor(
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private _mysqlservice: MysqlService,
    private _legalAnalysisService: LegalAnalysisService,
    private _complianseVerificationService: ComplianceVerificationService,
    private _CAService: CommercialanalysisService,
    private _pdfService: PdfService,
    private _RolServise: RolService,
    private modalService: NgbModal,
    private confirm_service: ConfirmAlertService,
    private _conditionSheetService: ConditionSheetService,
    private _commercialManagerAuthorization: CommercialManagerAuthorizationService,
    private _location: Location
  ) { }
  ngOnDestroy(): void {
    if (this.modalService.hasOpenModals()) {
      this.modalService.dismissAll();
    }
    this.confirm_service.close();
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
  getDomentType(action: number) {
    switch (action) {
      case 0:
        return 'Pagaré';
      case 1:
        return 'Cupo revolvente';
      case 2:
        return 'Escritura';

      case 3:
        return 'Pagaré';

      case 4:
        return 'Crédito/Contrato';
      case 5:
        return 'Pagaré';
      case 6:
        return 'Cupo revolvente';
      case 7:
        return 'Escritura';
      case 8:
        return 'Pagaré';

      case 9:
        return 'Crédito/Contrato';
      default:
        'Default::' + action;
    }
  }
  async getRates() {
    const res = await this._conditionSheetService.getRates().toPromise().then(
      (response) => {
        console.log('RAtes')
        console.log(response)
        this.rates = response
      }
    )
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
  async getCustomer(id_customer: number) {
    const res = await this._mysqlservice.GetOneCustomer(id_customer).toPromise().then(
      (response) => {
        this.customer = response.data.customer
        console.log(response.data)
      }
    )
    return res
  }
  mode = 0
  async ngOnInit(): Promise<void> {
    this.spinner.show()
    //lo que vamos a hacer es que dependendiendo de la solicitud vamos a obtener su tipo,
    //Esto nos va a servir para obtener la informacion de cada uno
    //Para este analisis vamos a obtener el tipo del servicio de legal
    let id = this.analysis_id
    if (this.analysis_id == undefined) {
      //se obtiene de param
      if (this.activatedRoute.snapshot.params) {
        this.mode = 1
        id = this.activatedRoute.snapshot.params.id
      }
    }
    await this.getRequestTypeArray()
    await this.getType(id)
    await this.getAnalysis(id)
    // await this.getDocumentCommercialAnalysis()
    //Si es de tipo Gerente Comercial se elimina al responsable porque no existe
    if (this.analysisType.analysistype_name == this.Commercial_Manager_Authorization || this.analysisType.analysistype_name == this.Gerencial_Manager_Authorization) {
      //Tenemos que obtener los datos del gerente, si el usuari que esta conectado 
      //tiene el rol de gerente se procede a mostrar el nombre, por otro lado se muestra sin asignar
      // debugger
      //let email = localStorage.getItem("email")
      await this.getManagerResponsable()
      if (this.analysisType.analysistype_name == this.Commercial_Manager_Authorization) {
        this.viewAnalysis = 1
      }
      else {
        this.viewAnalysis = 2
      }

    } else if (this.analysisType.analysistype_name == this.Customer_Registration) {
      //tenemos que obtener todos los responsables
      this.viewAnalysis = 3
      await this.getManagerResponsable()
      await this.getManagerGerencialResponsable()
      //obtener los responsables de los analysis anteriores
      //legal
      await this.getOthersResposables()
      //tenemos que obtener la hoja de condiciones para eso se necesita el id del analysis comercial
      await this.getCommercialManagerAuthorization()
      await this.getConditionSheetData(this.commercialManagerSelected)

    } else {
      await this.getResponsable(this.analysis.id_commercialanalysis)
    }
    await this.getCustomer(this.analysis.id_customer)
    await this.getCustomerType(this.customer.customer_id)
    await this.getRequestType()
    //await this.getConditionSheetData()
    //await this.getRatesConditionSheet()
    await this.getRates()
    // await this.getconditionSheetM()
    // await this.getManagementAct()
    // await this.getDebtor()
    //En este punto tenemos que obtener los documentos dependiendo del tipo de
    switch (this.analysisType.analysistype_name) {
      case 'Legal':
        await this.getDocumentAnalysisLegal()
        this.commentUpdoc = 'Legal'
        break
      case 'Cumplimiento':
        await this.getDocumentComplianceVerification()
        this.commentUpdoc = 'Cumplimiento'
        break
      case 'Comercial':
        await this.getDocumentCommercialAnalysis()
        this.commentUpdoc = 'Comercial'
        break
      case 'Autorización Gerente Comercial':
        this.commentUpdoc = 'Autorización Gerente Comercial'
        break
      case 'Autorización Gerente General':
        this.commentUpdoc = 'Autorización Gerente General'
        break
    }
    this.spinner.hide()
    console.log(this.commentUpdoc)
  }
  async getCommercialManagerAuthorization() {
    const res = this._commercialManagerAuthorization.getAnalysis(this.analysis.id_request).toPromise().then(
      (response) => {
        this.commercialManagerSelected = response
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
  // async getconditionSheetM() {
  //   console.log('Hoja de Condiciones');
  //   const res = this._managementAct.conditionsheet(this.analysis.id_request).toPromise().then(
  //     (response) => {
  //       this.conditionsheet = response;
  //       console.log(this.conditionsheet);
  //     }
  //   )
  //   return res
  // }
  // async getManagementAct() {
  //   console.log('Acta de Gerencia');
  //   const res = this._managementAct.managementAct(this.analysis.id_request).toPromise().then(
  //     (response) => {
  //       this.managementAct = response;
  //       console.log(this.managementAct);
  //     }
  //   )
  //   return res
  // }
  // async getDebtor() {
  //   console.log('Mandando Deudores');
  //   const res = await this._managementAct.debtor(this.analysis.id_request,).toPromise().then(
  //     (response) => {
  //       //console.log('AAAA')
  //       console.log(response)
  //       this.debtorsConditionSheet = response
  //     }
  //   )
  //   return res
  // }
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
  async getManagerResponsable() {
    // const res = this._RolServise.getUserRolEmail(email).toPromise().then(
    //   (response) => {
    //     console.log('************')
    //     console.log(response)
    //     console.log(localStorage)
    //     let find = response.find(item => item.name == 'GERENTE COMERCIAL')
    //     if (find) {
    //       //es el usuario el gerente
    //       let name = localStorage.getItem('name')
    //       this.analysisResponsable = new Adviser(0, '', '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 0)
    //       this.analysisResponsable.firstname = name
    //       this.analysisResponsable.lastname = ''
    //     } else {
    //       this.analysisResponsable = new Adviser(0, '', '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 0)
    //       this.analysisResponsable.firstname = 'Sin Asignar'
    //       this.analysisResponsable.lastname = ''
    //     }
    //   }
    // )
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
  getInfoOtherResponsable(type: string) {
    let info = this.othersResponsables.find(item => item.type.analysistype_name == type)
    return info
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

  async getDocumentCommercialAnalysis() {
    const res = this._CAService.getCheckList(this.customer.customer_id, this.analysis.id_request).toPromise().then(
      (response) => {
        console.log(response)
        this.dataList.data = response
        console.log(this.dataList)
      }
    )
    return res
  }
  async getDocumentAnalysisLegal() {
    const res = this._legalAnalysisService.getCheckList(this.analysis.id_request, this.customer.customer_id).toPromise().then(
      (response) => {
        console.log(response)
        this.dataList.data = response
      }
    )
    return res
  }
  async getDocumentComplianceVerification() {
    const res = this._complianseVerificationService.getCheckList(this.customer.customer_id, this.analysis.id_request).toPromise().then(
      (response) => {
        console.log(response)
        this.dataList.data = response
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
  async getResponsable(id_request: number) {
    const res = await this._legalAnalysisService.getResponsable(id_request).toPromise().then(
      (response) => {
        this.analysisResponsable = response

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

  async getType(id: number) {
    const res = await this._legalAnalysisService.getType(id).toPromise().then(
      (response) => {
        console.log(response)
        this.analysisType = response
      }
    )
    return res
  }
  async createPDF() {
    let data = document.getElementById('templateInforme');
    this._pdfService.createReportHTMLSave(data, this.analysisType.analysistype_name, this.analysis.id_commercialanalysis, this.commentUpdoc)
    // html2canvas(data as any).then(canvas => {
    //   const image = { type: 'jpeg', quality: 0.98 };
    //   const margin = [0.5, 0.5];

    //   var imgWidth = 8.5;
    //   var pageHeight = 11;

    //   var innerPageWidth = imgWidth - margin[0] * 2;
    //   var innerPageHeight = pageHeight - margin[1] * 2;

    //   // Calculate the number of pages.
    //   var pxFullHeight = canvas.height;
    //   var pxPageHeight = Math.floor(canvas.width * (pageHeight / imgWidth));
    //   var nPages = Math.ceil(pxFullHeight / pxPageHeight);

    //   // Define pageHeight separately so it can be trimmed on the final page.
    //   var pageHeight = innerPageHeight;

    //   // Create a one-page canvas to split up the full image.
    //   var pageCanvas = document.createElement('canvas');
    //   var pageCtx = pageCanvas.getContext('2d');
    //   pageCanvas.width = canvas.width;
    //   pageCanvas.height = pxPageHeight;

    //   // Initialize the PDF.
    //   var pdf = new jsPDF('p', 'in', [8.5, 11]);

    //   for (var page = 0; page < nPages; page++) {
    //     // Trim the final page to reduce file size.
    //     if (page === nPages - 1 && pxFullHeight % pxPageHeight !== 0) {
    //       pageCanvas.height = pxFullHeight % pxPageHeight;
    //       pageHeight = (pageCanvas.height * innerPageWidth) / pageCanvas.width;
    //     }

    //     // Display the page.
    //     var w = pageCanvas.width;
    //     var h = pageCanvas.height;
    //     pageCtx.fillStyle = 'white';
    //     pageCtx.fillRect(0, 0, w, h);
    //     pageCtx.drawImage(canvas, 0, page * pxPageHeight, w, h, 0, 0, w, h);

    //     // Add the page to the PDF.
    //     if (page > 0) pdf.addPage();
    //     debugger;
    //     var imgData = pageCanvas.toDataURL('image/' + image.type, image.quality);
    //     pdf.addImage(imgData, image.type, margin[1], margin[0], innerPageWidth, pageHeight);
    //   }

    //   // var imgHeight = canvas.height * imgWidth / canvas.width;
    //   // const contentDataURL = canvas.toDataURL('image/png');
    //   // var heightLeft = imgHeight

    //   // //Formto PDF en Oficio Americano
    //   // let pdfData = new jsPDF('p', 'mm', 'a4');
    //   // var position = 0;
    //   // pdfData.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
    //   // heightLeft -= pageHeight;
    //   // while (heightLeft >= 0) {
    //   //   position = heightLeft - imgHeight
    //   //   pdfData.addPage()
    //   //   pdfData.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
    //   //   heightLeft -= pageHeight
    //   // }
    //   //Nombre Documento
    //   let filename = `Informe${this.analysisType.analysistype_name}_${this.dia}${this.mes}${this.year}_${this.hour}${this.min}_${this.sec}.pdf`
    //   console.log(filename)
    //   pdf.save(filename)
    //   let blobPDF = new Blob([pdf.output('blob')], { type: 'application/pdf' })
    //   var reader = new FileReader();
    //   reader.readAsDataURL(blobPDF);
    //   //Conversión Blob to Base64
    //   reader.onloadend = () => {
    //     var base64String = reader.result;
    //     //Data para el servicio de S3 y BD
    //     let data = {
    //       document: base64String,
    //       namedoc: filename,
    //       type: blobPDF.type,
    //       typedoc: 3,
    //       id_commercialanalysis: this.analysis.id_commercialanalysis,
    //       comment: this.commentUpdoc
    //     };
    //     console.log(data.id_commercialanalysis, data.typedoc)
    //     let check = this._UploadDocumentsService.getCheck(data.id_commercialanalysis, data.typedoc).pipe(map((resp) => {
    //       if (resp == false) {
    //         let sub = this._UploadDocumentsService.uploadDocsCA(data).pipe(map((response) => {
    //           this.toastr.success('El Informe ha sido Agregado', 'Éxito')
    //           console.log(response)
    //         }),
    //           catchError((err) => {
    //             this.toastr.error('Error', 'Ni idea de por que no funciona')
    //             console.log(err);
    //             return of();
    //           })
    //         ).subscribe(() => sub.unsubscribe())
    //       }
    //       else {
    //         console.log('Si hay documento')
    //         console.log(resp)
    //         let data = {
    //           id_commercialanalysis: this.analysis.id_commercialanalysis,
    //           id_uploaddocsca: resp,
    //           document: base64String,
    //           uploaddocsca_namedoc: filename,
    //           type: blobPDF.type,
    //           typedoc: 3
    //         }
    //         let sub = this._UploadDocumentsService.updateInform(data).pipe(map((response) => {
    //           console.log(response)
    //           this.toastr.success('El Informe ha sido Actualizado', 'Éxito')
    //         }),
    //           catchError((e) => {
    //             console.log(e)
    //             return of()
    //           })
    //         ).subscribe(() => sub.unsubscribe)
    //         console.log(data)
    //       }
    //     }),
    //       catchError((e) => {
    //         console.log(e)
    //         return of()
    //       })
    //     ).subscribe(() => check.unsubscribe())

    //   }
    //   this.toastr.success('Documento Descargado', `Se ha descargado el informe ${this.analysisType.analysistype_name}`)
    // })

  }
  onRoute() {
    
    if (this.mode==0)
      this.return_view.emit()
    else
      this._location.back()
  }
  downloadActa() {
    console.log('Descargar Acta');
  }
  async showAlertConfirm() {
    const result = await this.confirm_service.showAlert();
    debugger
    if (result.confirmed) {
      let result = this._CAService.getNextAdviser(this.analysis.id_commercialanalysis, this.analysis.analysis_type).toPromise().then(
        (response) => {
          this.toastr.success('Se ha informado al siguiente analista sobre la aprobación del análisis', 'Análisis Completado');
          let data: CommercialAnalysis = {
            id_commercialanalysis: this.analysis.id_commercialanalysis,
            analysis_status_id: 3,
            commercialanalysis_comment: this.analysis.commercialanalysis_comment,
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
  openManagementAct() {
    this.router.navigate([`/management-act`, this.analysis.id_commercialanalysis])
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
}
