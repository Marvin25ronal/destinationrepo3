import { Component, OnInit, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas'
import { ManagementActService } from 'src/app/services/analysis/management-act.service';
import { AuthorizedDebtorConditionSheet } from 'src/app/models/conditionSheet.model';
import { CustomerRequest } from 'src/app/models/customer-request.model';
import { ManagementAct } from 'src/app/models/managementact.model';
import { BranchOffice } from 'src/app/models/branchoffice.model';
import { Rate } from 'src/app/models/rate.model';
import { PdfService } from 'src/app/services/pdf.service';

@Component({
  selector: 'app-management-act',
  templateUrl: './management-act.component.html',
  styleUrls: ['./management-act.component.scss']
})
export class ManagementActComponent implements OnInit {

  @Output()
  returnView = new EventEmitter<Number>()

  @Output()
  loading = new EventEmitter()

  commercialanalysis = null;
  id;
  conditionsheet = null;
  debtorsConditionSheet: AuthorizedDebtorConditionSheet[] = [];
  customerData = null;
  cantidad = null;
  direccion = null;
  monto: any;
  nombre: any;
  fecha: any;
  requestData: CustomerRequest;
  actualyear: number;
  createdDate: any;
  actualday: number;
  actualmonth: number;
  mes: string;
  actYear: any;
  plazo: any;
  managementAct: ManagementAct;
  createdDateAct: any;
  yearAct: number;
  monthAct: number;
  dayAct: number;
  mesAct: string;
  plazoCalc: Date;
  plazoMonth: number;
  plazoDay: number;
  plazoYear: number;
  mesPlazo: string;
  plazoCreatedM: any;
  plazoCreatedD: any;
  plazoCreatedY: any;
  plazoCalc2: any;
  days: any;
  brachofficeData: BranchOffice;
  comission: Rate;
  interest: Rate;
  flat: Rate;
  mora: Rate;
  valueFlat: any;
  valueMora: any;
  valueInterest: any;
  valueComission: any;
  registry2: string;
  registry1: string;
  yearActa: number;
  constructor(
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _managementAct: ManagementActService,
    private _pdfService: PdfService,
  ) { }

  async ngOnInit() {
    this.loading.emit()
    this.spinner.show()
    let id = this.activatedRoute.snapshot.params.request;
    this.id = this.activatedRoute.snapshot.params.request;
    console.log(this.activatedRoute.snapshot.params);
    console.log('MANDANDO ID');
    console.log(id);
    await this.getData()
    await this.getLetras()
    
    this.spinner.hide()
  }

  async createPDF() {
    let data = document.getElementById('templateActa');
    let filename = `Acta Gerencial`
    this.spinner.show()
    await this._pdfService.createReportHTMLSave(data,'Acta de gerencia',this.commercialanalysis.id_commercialanalysis,filename,()=>{
      this.spinner.hide()
    })
  }

  returnAnalysisReport() {
    this.router.navigate([`/analysis-report`, this.id])
  }

  async getCAInfo() {
    debugger
    console.log('getCAINFO');
    const res = this._managementAct.getCommercialAnalysis(this.id).toPromise().then(
      (response) => {
        this.commercialanalysis = response;
        console.log(this.commercialanalysis);
      }
    )
    return res
  }

  async existManagementAct() {
    console.log('Verificar si existe');
    const res = this._managementAct.exist(this.id).toPromise().then(
      (response) => {
        if (response == false) {
          console.log('Crear Acta');
          console.log(this.commercialanalysis.id_commercialanalysis, this.commercialanalysis.id_customer);
          this._managementAct.init(this.commercialanalysis.id_commercialanalysis, this.commercialanalysis.id_customer).toPromise().then(
            async (res) => {
              console.log('Hoja Creada');
              console.log(res);
            }
          )
        }
        else {
          console.log('Existe');
        }
      }
    )
    return res
  }

  async conditionSheet() {
    debugger
    console.log('Hoja de Condiciones');
    const res = this._managementAct.conditionsheet(this.commercialanalysis.id_request).toPromise().then(
      (response) => {
        this.conditionsheet = response;
        console.log(this.conditionsheet);
      }
    )
    return res
  }

  async branchOffice() {
    debugger
    console.log('Sucursal');
    const res = this._managementAct.branchOffice(this.conditionsheet.id_condition_sheet).toPromise().then(
      (response) => {
        this.brachofficeData = response;
        console.log('branchoffice',this.brachofficeData);
      }
    )
    return res
  }

  async debtor() {
    console.log('Mandando Deudores');
    const res = await this._managementAct.debtor(this.commercialanalysis.id_request,).toPromise().then(
      (response) => {
        //console.log('AAAA')
        console.log(response)
        this.debtorsConditionSheet = response
      }
    )
    return res
  }

  async customer() {
    console.log('Customer');
    const res = this._managementAct.customer(this.commercialanalysis.id_commercialanalysis).toPromise().then(
      (response) => {
        this.customerData = response;
        console.log(this.customerData);
      }
    )
    return res
  }

  async comissionRate() {
    debugger
    console.log('Comission Rate');
    console.log(this.brachofficeData?.id_branchoffice);
    if (this.brachofficeData?.id_branchoffice != null) {
      const res = this._managementAct.comissionRate(this.brachofficeData.id_branchoffice).toPromise().then(
        (response) => {
          this.comission = response;
          if (this.comission.default_s == 1) {
            this.valueComission = `${this.comission.rate_percentage}%`
          }
          else {
            this.valueComission = this.comission.rate_amount
          }
          console.log(this.comission);
          console.log(this.valueComission);
        }
      )
      return res
    }
  }
  async interestRate() {
    console.log('Interest Rate');
    const res = this._managementAct.interestRate(this.brachofficeData?.id_branchoffice).toPromise().then(
      (response) => {
        this.interest = response;
        if (this.interest.default_s === 1) {
          this.valueInterest = `${this.interest.rate_percentage}%`
        }
        else {
          this.valueInterest = this.interest.rate_amount
        }
        console.log(this.interest);
        console.log(this.valueInterest);
      }
    )
    return res
  }
  async flatRate() {
    console.log('Flat Rate');
    const res = this._managementAct.flatRate(this.brachofficeData?.id_branchoffice).toPromise().then(
      (response) => {
        this.flat = response;
        if (this.flat.default_s === 1) {
          this.valueFlat = `${this.flat.rate_percentage}%`
        }
        else {
          this.valueFlat = this.flat.rate_amount
        }
        console.log(this.flat);
        console.log(this.valueFlat);
      }
    )
    return res
  }
  async moraRate() {
    console.log('Mora Rate');
    const res = this._managementAct.moraRate(this.brachofficeData.id_branchoffice).toPromise().then(
      (response) => {
        this.mora = response;
        if (this.mora.default_s == 1) {
          this.valueMora = `${this.mora.rate_percentage}%`
        }
        else {
          this.valueMora = this.mora.rate_amount
        }
        console.log(this.mora);
        console.log(this.valueMora);
      }
    )
    return res
  }
  async managementact() {
    console.log('Acta de Gerencia');
    const res = this._managementAct.managementAct(this.commercialanalysis.id_request).toPromise().then(
      (response) => {
        this.managementAct = response;
        this.registry2 = response.registry_act2;
        this.registry1 = response.registry_act1;
        this.yearActa = response.year_act;
        console.log(this.managementAct);
        this.createdDateAct = this.managementAct.year_act
        this.yearAct = new Date(this.createdDateAct).getFullYear()
        this.monthAct = new Date(this.createdDateAct).getMonth()
        this.dayAct = new Date(this.createdDateAct).getDate()
        console.log(this.createdDateAct);
        switch (this.monthAct + 1) {
          case 1:
            {
              this.mesAct = 'Enero'
              break
            }
          case 2:
            {
              this.mesAct = 'Febrero'
              break
            }
          case 3:
            {
              this.mesAct = 'Marzo'
              break
            }
          case 4:
            {
              this.mesAct = 'Abril'
              break
            }
          case 5:
            {
              this.mesAct = 'Mayo'
              break
            }
          case 6:
            {
              this.mesAct = 'Junio'
              break
            }
          case 7:
            {
              this.mesAct = 'Julio'
              break
            }
          case 8:
            {
              this.mesAct = 'Agosto'
              break
            }
          case 9:
            {
              this.mesAct = 'Septiembre'
              break
            }
          case 10:
            {
              this.mesAct = 'Octubre'
              break
            }
          case 11:
            {
              this.mesAct = 'Noviembre'
              break
            }
          case 12:
            {
              this.mesAct = 'Diciembre'
              break
            }
        }
      }
    )
    return res
  }
  async request() {
    console.log('Mandando Request');
    const res = this._managementAct.requestInfo(this.commercialanalysis.id_request).toPromise().then(
      (response) => {
        this.requestData = response;
        console.log(this.requestData);
        this.plazo = this.requestData.time_in_months
        console.log(this.plazo, 'Plazo');
        this.createdDate = new Date(response.create_date)
        //Tomar Dia, Mes y Anio
        this.actualyear = new Date(this.createdDate).getFullYear()
        this.actualday = new Date(this.createdDate).getDate()
        this.actualmonth = new Date(this.createdDate).getMonth()

        console.log(this.createdDate.setMonth(this.createdDate.getMonth() + this.plazo));
        //Calcular plazo en base a los meses solicitados desde el dia de la solicitud
        this.plazoCalc2 = new Date(this.createdDate.setMonth(this.createdDate.getMonth() + this.plazo))
        console.log(this.plazoCalc2, 'Prueba');
        this.plazoCalc = new Date(this.createdDate.setMonth(this.createdDate.getMonth() + this.plazo))
        //Tomar Dia, Mes, Anio
        this.plazoMonth = this.plazoCalc2.getMonth()
        this.plazoDay = this.plazoCalc2.getDate()
        this.plazoYear = this.plazoCalc2.getFullYear()
        let difference = Math.abs(this.plazoCalc2 - this.createdDate);
        this.days = difference / (1000 * 3600 * 24)
        console.log(this.days, 'Mandando Dias');
        console.log(this.plazoMonth, this.plazoYear, this.plazoDay);
        let now = new Date().getFullYear()
        if (this.actualyear == now) {
          this.actYear = 'presente año'
        }
        else {
          this.actYear = this.actualyear
        }
        switch (this.plazoMonth + 1) {
          case 1:
            {
              this.mesPlazo = 'Enero'
              break
            }
          case 2:
            {
              this.mesPlazo = 'Febrero'
              break
            }
          case 3:
            {
              this.mesPlazo = 'Marzo'
              break
            }
          case 4:
            {
              this.mesPlazo = 'Abril'
              break
            }
          case 5:
            {
              this.mesPlazo = 'Mayo'
              break
            }
          case 6:
            {
              this.mesPlazo = 'Junio'
              break
            }
          case 7:
            {
              this.mesPlazo = 'Julio'
              break
            }
          case 8:
            {
              this.mesPlazo = 'Agosto'
              break
            }
          case 9:
            {
              this.mesPlazo = 'Septiembre'
              break
            }
          case 10:
            {
              this.mesPlazo = 'Octubre'
              break
            }
          case 11:
            {
              this.mesPlazo = 'Noviembre'
              break
            }
          case 12:
            {
              this.mesPlazo = 'Diciembre'
              break
            }
        }

        switch (this.actualmonth + 1) {
          case 1:
            {
              this.mes = 'Enero'
              break
            }
          case 2:
            {
              this.mes = 'Febrero'
              break
            }
          case 3:
            {
              this.mes = 'Marzo'
              break
            }
          case 4:
            {
              this.mes = 'Abril'
              break
            }
          case 5:
            {
              this.mes = 'Mayo'
              break
            }
          case 6:
            {
              this.mes = 'Junio'
              break
            }
          case 7:
            {
              this.mes = 'Julio'
              break
            }
          case 8:
            {
              this.mes = 'Agosto'
              break
            }
          case 9:
            {
              this.mes = 'Septiembre'
              break
            }
          case 10:
            {
              this.mes = 'Octubre'
              break
            }
          case 11:
            {
              this.mes = 'Noviembre'
              break
            }
          case 12:
            {
              this.mes = 'Diciembre'
              break
            }
        }
      }
    )
    return res
  }
  async getData() {
    debugger
    this.spinner.show
    await this.getCAInfo()
    if (this.commercialanalysis) {
      //await this.existManagementAct();
      await this.conditionSheet();
      await this.debtor();
      await this.customer();
      await this.getSetInfo();
      await this.request();
      await this.managementact();
      await this.branchOffice();
      await this.comissionRate();
      await this.flatRate()
      await this.interestRate()
      await this.moraRate()
    }
    await this.spinner.hide()
  }
  getLetras() {
    var numeroALetras = (function () {

      function Unidades(num) {

        switch (num) {
          case 1: return 'un';
          case 2: return 'dos';
          case 3: return 'tres';
          case 4: return 'cuatro';
          case 5: return 'cinco';
          case 6: return 'seis';
          case 7: return 'siete';
          case 8: return 'ocho';
          case 9: return 'nueve';
        }

        return '';
      }//Unidades()

      function Decenas(num) {

        let decena = Math.floor(num / 10);
        let unidad = num - (decena * 10);

        switch (decena) {
          case 1:
            switch (unidad) {
              case 0: return 'Diez';
              case 1: return 'Once';
              case 2: return 'Doce';
              case 3: return 'Trece';
              case 4: return 'Catorce';
              case 5: return 'Quince';
              default: return 'Dieci' + Unidades(unidad);
            }
          case 2:
            switch (unidad) {
              case 0: return 'Veinte';
              default: return 'Veinti' + Unidades(unidad);
            }
          case 3: return DecenasY('Treinta', unidad);
          case 4: return DecenasY('Cuarenta', unidad);
          case 5: return DecenasY('Cincuenta', unidad);
          case 6: return DecenasY('Sesenta', unidad);
          case 7: return DecenasY('Setenta', unidad);
          case 8: return DecenasY('Ochenta', unidad);
          case 9: return DecenasY('Noventa', unidad);
          case 0: return Unidades(unidad);
        }
      }//Unidades()

      function DecenasY(strSin, numUnidades) {
        if (numUnidades > 0)
          return strSin + ' Y ' + Unidades(numUnidades)

        return strSin;
      }//DecenasY()

      function Centenas(num) {
        let centenas = Math.floor(num / 100);
        let decenas = num - (centenas * 100);

        switch (centenas) {
          case 1:
            if (decenas > 0)
              return 'Ciento ' + Decenas(decenas);
            return 'Cien';
          case 2: return 'Doscientos ' + Decenas(decenas);
          case 3: return 'Trescientos ' + Decenas(decenas);
          case 4: return 'Cuatrocientos ' + Decenas(decenas);
          case 5: return 'Quinientos ' + Decenas(decenas);
          case 6: return 'Seiscientos ' + Decenas(decenas);
          case 7: return 'Setecientos ' + Decenas(decenas);
          case 8: return 'Ochocientos ' + Decenas(decenas);
          case 9: return 'Novecientos ' + Decenas(decenas);
        }

        return Decenas(decenas);
      }//Centenas()

      function Seccion(num, divisor, strSingular, strPlural) {
        let cientos = Math.floor(num / divisor)
        let resto = num - (cientos * divisor)

        let letras = '';

        if (cientos > 0)
          if (cientos > 1)
            letras = Centenas(cientos) + ' ' + strPlural;
          else
            letras = strSingular;

        if (resto > 0)
          letras += '';

        return letras;
      }//Seccion()

      function Miles(num) {
        let divisor = 1000;
        let cientos = Math.floor(num / divisor)
        let resto = num - (cientos * divisor)

        let strMiles = Seccion(num, divisor, 'Un Mil', 'Mil');
        let strCentenas = Centenas(resto);

        if (strMiles == '')
          return strCentenas;

        return strMiles + ' ' + strCentenas;
      }//Miles()

      function Millones(num) {
        let divisor = 1000000;
        let cientos = Math.floor(num / divisor)
        let resto = num - (cientos * divisor)

        let strMillones = Seccion(num, divisor, 'Un Millón de', 'Millones de');
        let strMiles = Miles(resto);

        if (strMillones == '')
          return strMiles;

        return strMillones + ' ' + strMiles;
      }//Millones()

      return function NumeroALetras(num, currency) {
        currency = currency || {};
        let data = {
          numero: num,
          enteros: Math.floor(num),
          centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
          letrasCentavos: '',
          letrasMonedaPlural: currency.plural || 'Quetzales',//'PESOS', 'Dólares', 'Bolívares', 'etcs'
          letrasMonedaSingular: currency.singular || 'Quetzal', //'PESO', 'Dólar', 'Bolivar', 'etc'
          letrasMonedaCentavoPlural: currency.centPlural || 'Centavos',
          letrasMonedaCentavoSingular: currency.centSingular || 'Centavo'
        };

        if (data.centavos > 0) {
          data.letrasCentavos = 'con ' + (function () {
            if (data.centavos == 1)
              return Millones(data.centavos) + ' ' + data.letrasMonedaCentavoSingular;
            else
              return Millones(data.centavos) + ' ' + data.letrasMonedaCentavoPlural;
          })();
        };

        if (data.enteros == 0)
          return 'CERO ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
        if (data.enteros == 1)
          return Millones(data.enteros) + ' ' + data.letrasMonedaSingular + ' ' + data.letrasCentavos;
        else
          return Millones(data.enteros) + ' ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
      };

    })();
    this.cantidad = numeroALetras(this.customerData.amount_interests, {
      plural: 'Quetzales',
      singular: 'Quetzal',
      centPlural: 'Centavos',
      centSingular: 'Centavo'
    })
  }
  async getSetInfo() {
    //Definir Direccion
    this.customerData.address1 == null ? this.direccion = 'No hay direccion registrada' : this.direccion = this.customerData.address1
    //Definir Monto
    this.monto = this.customerData.amount_interests
    //Definir Nombre
    this.customerData.businessname == null ? this.nombre = this.customerData.name + this.customerData.lastname1 : this.nombre = this.customerData.businessname

  }


  closeAct() {
    console.log('retornar1');
    this.returnView.emit(3)
  }
  returnReport() {
    console.log('retornar2');
    this.returnView.emit(1)
  }
}
