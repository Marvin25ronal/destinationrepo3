import { Component, OnInit } from '@angular/core';
import { MysqlService } from '../../services/mysql/mysql.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthorizationService } from '../../services/authorization.service';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, AbstractControl, FormArray } from '@angular/forms';
import { DebtorService } from '../../services/debtors/debtor.service';
import { getCurrencySymbol, Location } from '@angular/common'
import { FInsurance } from "../../models/FInsurance.model";
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Form } from '../../models/solicitud-empresa.model';
import { CurrencyService } from 'src/app/services/Maintenance/currency.service';
import { BanksService } from 'src/app/services/Maintenance/banks.service';

import { IsrService } from 'src/app/services/Maintenance/isr.service';
import { PaymentMethodService } from 'src/app/services/Maintenance/payment-method.service';
import { ISR, IVA } from "../../models/isr.model"
import { SysivaService } from 'src/app/services/Maintenance/sysiva.service';
import { FormsaveService } from 'src/app/services/formdata/formsave.service';
import { FormSave } from 'src/app/models/formsave.model';
import { AllDataService } from 'src/app/services/allData/all-data.service';
import { PlaceHoldersService } from 'src/app/services/place-holders.service';
import { ErrorMessagesService } from 'src/app/services/error-messages.service';
import { isNitValid } from 'src/app/Validators/NitValidator';
import { isPhoneNumberValid, phoneOrMobilephone } from 'src/app/Validators/phoneRequiredValidator';
import { isDefaultValue } from 'src/app/Validators/NotDefaultValue';
import { isDPIValid } from 'src/app/Validators/DPIValidator';
import { migrationStatus } from 'src/Utils/constants';
import { data } from 'jquery';

@Component({
  selector: 'app-all-form',
  templateUrl: './all-form.component.html',
  styleUrls: ['./all-form.component.css']
})
export class AllFormComponent implements OnInit {
  feic_migration_condition_const = 100;
  public showSidebar = false;
  formData: any;
  SectionsAvailable = [];
  insuranceData: FInsurance[] = [
    {
      risk_type: 0,
    },
    {
      risk_type: 1,
    },
    {
      risk_type: 2,
    },
    {
      risk_type: 3,
    },
    {
      risk_type: 4,
    },
    {
      risk_type: 5,
    },
    {
      risk_type: 6,
    },
    {
      risk_type: 7,
    },
    {
      risk_type: 8,
    },
    {
      risk_type: 9,
    },
    {
      risk_type: 10,
    },
    {
      risk_type: 11,
    },
    {
      risk_type: 12,
    },
    {
      risk_type: 13,
    },
  ];
  country_list = [
    "AFGANISTÁN",
    "ALBANIA",
    "ALEMANIA",
    "ANDORRA",
    "ANGOLA",
    "ANTIGUA Y BARBUDA",
    "ARABIA SAUDITA",
    "ARGELIA",
    "ARGENTINA",
    "ARMENIA",
    "AUSTRALIA",
    "AUSTRIA",
    "AZERBAIYÁN",
    "BAHAMAS",
    "BANGLADÉS",
    "BARBADOS",
    "BARÉIN",
    "BÉLGICA",
    "BELICE",
    "BENÍN",
    "BIELORRUSIA",
    "BIRMANIA",
    "BOLIVIA",
    "BOSNIA Y HERZEGOVINA",
    "BOTSUANA",
    "BRASIL",
    "BRUNÉI",
    "BULGARIA",
    "BURKINA FASO",
    "BURUNDI",
    "BUTÁN",
    "CABO VERDE",
    "CAMBOYA",
    "CAMERÚN",
    "CANADÁ",
    "CATAR",
    "CHAD",
    "CHILE",
    "CHINA",
    "CHIPRE",
    "CIUDAD DEL VATICANO",
    "COLOMBIA",
    "COMORAS",
    "COREA DEL NORTE",
    "COREA DEL SUR",
    "COSTA DE MARFIL",
    "COSTA RICA",
    "CROACIA",
    "CUBA",
    "DINAMARCA",
    "DOMINICA",
    "ECUADOR",
    "EGIPTO",
    "EL SALVADOR",
    "EMIRATOS ÁRABES UNIDOS",
    "ERITREA",
    "ESLOVAQUIA",
    "ESLOVENIA",
    "ESPAÑA",
    "ESTADOS UNIDOS",
    "ESTONIA",
    "ETIOPÍA",
    "FILIPINAS",
    "FINLANDIA",
    "FIYI",
    "FRANCIA",
    "GABÓN",
    "GAMBIA",
    "GEORGIA",
    "GHANA",
    "GRANADA",
    "GRECIA",
    "GUATEMALA",
    "GUYANA",
    "GUINEA",
    "GUINEA ECUATORIAL",
    "GUINEA-BISÁU",
    "HAITÍ",
    "HONDURAS",
    "HUNGRÍA",
    "INDIA",
    "INDONESIA",
    "IRAK",
    "IRÁN",
    "IRLANDA",
    "ISLANDIA",
    "ISLAS MARSHALL",
    "ISLAS SALOMÓN",
    "ISRAEL",
    "ITALIA",
    "JAMAICA",
    "JAPÓN",
    "JORDANIA",
    "KAZAJISTÁN",
    "KENIA",
    "KIRGUISTÁN",
    "KIRIBATI",
    "KUWAIT",
    "LAOS",
    "LESOTO",
    "LETONIA",
    "LÍBANO",
    "LIBERIA",
    "LIBIA",
    "LIECHTENSTEIN",
    "LITUANIA",
    "LUXEMBURGO",
    "MADAGASCAR",
    "MALASIA",
    "MALAUI",
    "MALDIVAS",
    "MALÍ",
    "MALTA",
    "MARRUECOS",
    "MAURICIO",
    "MAURITANIA",
    "MÉXICO",
    "MICRONESIA",
    "MOLDAVIA",
    "MÓNACO",
    "MONGOLIA",
    "MONTENEGRO",
    "MOZAMBIQUE",
    "NAMIBIA",
    "NAURU",
    "NEPAL",
    "NICARAGUA",
    "NÍGER",
    "NIGERIA",
    "NORUEGA",
    "NUEVA ZELANDA",
    "OMÁN",
    "PAÍSES BAJOS",
    "PAKISTÁN",
    "PALAOS",
    "PANAMÁ",
    "PAPÚA NUEVA GUINEA",
    "PARAGUAY",
    "PERÚ",
    "POLONIA",
    "PORTUGAL",
    "REINO UNIDO",
    "REPÚBLICA CENTROAFRICANA",
    "REPÚBLICA CHECA",
    "REPÚBLICA DE MACEDONIA",
    "REPÚBLICA DEL CONGO",
    "REPÚBLICA DEMOCRÁTICA DEL CONGO",
    "REPÚBLICA DOMINICANA",
    "REPÚBLICA SUDAFRICANA",
    "RUANDA",
    "RUMANÍA",
    "RUSIA",
    "SAMOA",
    "SAN CRISTÓBAL Y NIEVES",
    "SAN MARINO",
    "SAN VICENTE Y LAS GRANADINAS",
    "SANTA LUCÍA",
    "SANTO TOMÉ Y PRÍNCIPE",
    "SENEGAL",
    "SERBIA",
    "SEYCHELLES",
    "SIERRA LEONA",
    "SINGAPUR",
    "SIRIA",
    "SOMALIA",
    "SRI LANKA",
    "SUAZILANDIA",
    "SUDÁN",
    "SUDÁN DEL SUR",
    "SUECIA",
    "SUIZA",
    "SURINAM",
    "TAILANDIA",
    "TANZANIA",
    "TAYIKISTÁN",
    "TIMOR ORIENTAL",
    "TOGO",
    "TONGA",
    "TRINIDAD Y TOBAGO",
    "TÚNEZ",
    "TURKMENISTÁN",
    "TURQUÍA",
    "TUVALU",
    "UCRANIA",
    "UGANDA",
    "URUGUAY",
    "UZBEKISTÁN",
    "VANUATU",
    "VENEZUELA",
    "VIETNAM",
    "YEMEN",
    "YIBUTI",
    "ZAMBIA",
    "ZIMBABUE",
  ];

  currencyList = [
    { code: "MNT", name: "TUGRIK" },
    { code: "TND", name: "TUNISIAN DINAR" },
    { code: "TRY", name: "TURKISH LIRA" },
    { code: "TRL", name: "TURKISH LIRA" },
    { code: "AED", name: "UAE DIRHAM" },
    { code: "XFU", name: "UIC-FRANC" },
    { code: "UZS", name: "UZBEKISTAN SUM" },
    { code: "VUV", name: "VATU" },
    { code: "KRW", name: "WON NORCOREANO" },
    { code: "YER", name: "YEMENI RIAL" },
    { code: "JPY", name: "YEN" },
    { code: "CNY", name: "YUAN RENMINBI" },
    { code: "PLN", name: "ZLOTY" },
    { code: "MOP", name: "PATACA" },
    { code: "ARS", name: "PESO ARGENTINO" },
    { code: "CLP", name: "PESO CHILENO" },
    { code: "COP", name: "PESO COLOMBIANO" },
    { code: "CUP", name: "PESO CUBANO" },
    { code: "GWP", name: "PESO DE GUINEA-BISSAU" },
    { code: "DOP", name: "PESO DOMINICANO" },
    { code: "PHP", name: "PESO FILIPINO" },
    { code: "MXN", name: "PESO MEXICANO" },
    { code: "UYU", name: "PESO URUGUAYO" },
    { code: "XAG", name: "PLATA" },
    { code: "XPT", name: "PLATINUM" },
    { code: "BWP", name: "PULA" },
    { code: "QAR", name: "QATARI RIAL" },
    { code: "GTQ", name: "QUETZAL" },
    { code: "ZAR", name: "RAND" },
    { code: "BRL", name: "REAL BRASILEÑO" },
    { code: "OMR", name: "RIAL OMANI" },
    { code: "KHR", name: "RIEL" },
    { code: "BYR", name: "RUBLO BIELORRUSO" },
    { code: "RUR", name: "RUBLO RUSO" },
    { code: "RUB", name: "RUBLO RUSO" },
    { code: "MVR", name: "RUFIYAA" },
    { code: "INR", name: "RUPIA DE LA INDIA" },
    { code: "MUR", name: "RUPIA DE MAURITIUS" },
    { code: "NPR", name: "RUPIA DE NEPAL" },
    { code: "SCR", name: "RUPIA DE SEYCHELLES" },
    { code: "LKR", name: "RUPIA DE SRI LANKA" },
    { code: "PKR", name: "RUPIA PAKISTANI" },
    { code: "IDR", name: "RUPIAH" },
    { code: "RWF", name: "RWANDA FRANC" },
    { code: "SAR", name: "SAUDI RIYAL" },
    { code: "XDR", name: "SDR" },
    { code: "UGX", name: "SHILLING DE UGANDA" },
    { code: "SKK", name: "SLOVAK KORUNA" },
    { code: "KGS", name: "SOM" },
    { code: "SOS", name: "SOMALI SHILLING" },
    { code: "TJS", name: "SOMONI" },
    { code: "BDT", name: "TAKA" },
    { code: "WST", name: "TALA" },
    { code: "TZS", name: "TANZANIAN SHILLING" },
    { code: "KZT", name: "TENGE" },
    { code: "TPE", name: "TIMOR ESCUDO" },
    { code: "SIT", name: "TOLAR" },
    { code: "DKK", name: "KRONE DANES" },
    { code: "NOK", name: "KRONE NORUEGO" },
    { code: "EEK", name: "KROON" },
    { code: "HRK", name: "KUNA CROATA" },
    { code: "ZMK", name: "KWACHA" },
    { code: "MWK", name: "KWACHA" },
    { code: "AOA", name: "KWANZA" },
    { code: "MMK", name: "KYAT" },
    { code: "GEL", name: "LARI" },
    { code: "LVL", name: "LATVIAN LATS" },
    { code: "ALL", name: "LEK" },
    { code: "HNL", name: "LEMPIRA" },
    { code: "SLL", name: "LEONE" },
    { code: "ROL", name: "LEU" },
    { code: "BGN", name: "LEV BULGARO" },
    { code: "GIP", name: "LIBRA DE GIBRALTAR" },
    { code: "FKP", name: "LIBRA DE LAS ISLAS FALKLAND" },
    { code: "SHP", name: "LIBRA DE SANTA ELENA" },
    { code: "EGP", name: "LIBRA EGIPCIA" },
    { code: "GBP", name: "LIBRA ESTERLINA" },
    { code: "IEP", name: "LIBRA IRLANDESA" },
    { code: "LBP", name: "LIBRA LIBANESA" },
    { code: "SYP", name: "LIBRA SIRIA" },
    { code: "SZL", name: "LILANGENI" },
    { code: "MTL", name: "LIRA DE MALTA" },
    { code: "ITL", name: "LIRA ITALIANA" },
    { code: "LTL", name: "LITHUANIAN LITUS" },
    { code: "LSL", name: "LOTI" },
    { code: "MGF", name: "MALAGASY FRANC" },
    { code: "MYR", name: "MALAYSIAN RINGGIT" },
    { code: "TMM", name: "MANAT" },
    { code: "MZM", name: "METICAL" },
    { code: "MDL", name: "MOLDOVAN LEU" },
    { code: "MAD", name: "MOROCCAN DIRHAM" },
    { code: "BOV", name: "MVDOL" },
    { code: "NGN", name: "NAIRA" },
    { code: "ERN", name: "NAKFA" },
    { code: "ILS", name: "NEW ISRAELI SHEQEL" },
    { code: "BTN", name: "NGULTRUM" },
    { code: "PEN", name: "NUEVO SOL" },
    { code: "XAU", name: "ORO" },
    { code: "MRO", name: "OUGUIYA" },
    { code: "TOP", name: "PAÑANGA" },
    { code: "XPD", name: "PALLADIUM" },
    { code: "BND", name: "DOLAR DE BRUNEI" },
    { code: "FJD", name: "DOLAR DE FIJI" },
    { code: "GYD", name: "DOLAR DE GUYANA" },
    { code: "HKD", name: "DOLAR DE HONG KONG" },
    { code: "KYD", name: "DOLAR DE LAS ISLAS CAIMAN" },
    { code: "SBD", name: "DOLAR DE LAS ISLAS SALOMON" },
    { code: "NAD", name: "DOLAR DE NAMIBIA" },
    { code: "NZD", name: "DOLAR DE NUEVA ZELANDA" },
    { code: "TWD", name: "DOLAR DE NUEVO TAIWAN" },
    { code: "SGD", name: "DOLAR DE SINGAPUR" },
    { code: "TTD", name: "DOLAR DE TRINIDAD Y TOBAGO" },
    { code: "ZWD", name: "DOLAR DE ZIMBAWE" },
    { code: "XCD", name: "DOLAR DEL ESTE CARIBEÑO" },
    { code: "USD", name: "DOLAR ESTADOUNIDENSE" },
    { code: "JMD", name: "DOLAR JAMAIQUINO" },
    { code: "LRD", name: "DOLAR LIBERIANO" },
    { code: "VND", name: "DONG" },
    { code: "GRD", name: "DRACMA" },
    { code: "AMD", name: "DRAM DE ARMENIA" },
    { code: "PTE", name: "ESCUDO PORTUGUES" },
    { code: "ETB", name: "ETHIOPIAN BIRR" },
    { code: "EUR", name: "EURO" },
    { code: "HUF", name: "FORINT" },
    { code: "CDF", name: "FRANC CONGOLAIS" },
    { code: "BIF", name: "FRANCO DE BURUNDI" },
    { code: "GNF", name: "FRANCO DE GUINEA" },
    { code: "LUF", name: "FRANCO DE LUXEMBURGO" },
    { code: "FRF", name: "FRANCO FRANCES" },
    { code: "CHF", name: "FRANCO SUIZO" },
    { code: "XFO", name: "GOLD-FRANC" },
    { code: "HTG", name: "GOURDE" },
    { code: "PYG", name: "GUARANI" },
    { code: "ANG", name: "GUILDER DE ANTILLAS HOLANDESAS" },
    { code: "AWG", name: "GUILDER DE ARUBA" },
    { code: "NLG", name: "GUILDER DE HOLANDA" },
    { code: "SRG", name: "GUILDER DE SURINAME" },
    { code: "UAH", name: "HRYVNIA" },
    { code: "ISK", name: "ICELAND KRONA" },
    { code: "IRR", name: "IRANIAN RIAL" },
    { code: "IQD", name: "IRAQI DINAR" },
    { code: "KES", name: "KENYAN SHILLING" },
    { code: "PGK", name: "KINA" },
    { code: "LAK", name: "KIP" },
    { code: "SEK", name: "KRONA DE SUECIA" },
    { code: "AFN", name: "AFGHANI" },
    { code: "DZD", name: "ALGERIAN DINAR" },
    { code: "AZN", name: "AZERBAIJANIAN MANAT" },
    { code: "BHD", name: "BAHRAINI DINAR" },
    { code: "THB", name: "BAHT" },
    { code: "PAB", name: "BALBOA" },
    { code: "BMD", name: "BERMUDIAN DOLLAR" },
    { code: "VEB", name: "BOLIVAR" },
    { code: "VEF", name: "BOLIVAR VENEZOLANO FUERTE" },
    { code: "BOB", name: "BOLIVIANO" },
    { code: "CVE", name: "CAPE VERDE ESCUDO" },
    { code: "GHC", name: "CEDI" },
    { code: "XOF", name: "CFA FRANC BCEAO" },
    { code: "XAF", name: "CFA FRANC BEAC" },
    { code: "XPF", name: "CFP FRANC" },
    { code: "CRC", name: "COLON COSTARRICENSE" },
    { code: "SVC", name: "COLON SALVADOREÑO" },
    { code: "KMF", name: "COMORO FRANC" },
    { code: "BAM", name: "CONVERTIBLE MARKS" },
    { code: "NIO", name: "CORDOBA ORO" },
    { code: "CYP", name: "CYPRUS POUND" },
    { code: "CZK", name: "CZECH KORUNA" },
    { code: "GMD", name: "DALASI" },
    { code: "MKD", name: "DENAR" },
    { code: "KWD", name: "DINAR DE KUWAIT" },
    { code: "SDD", name: "DINAR DE SUDAN" },
    { code: "YUM", name: "DINAR DE YUGOSLAVIA" },
    { code: "JOD", name: "DINAR JORDANO" },
    { code: "LYD", name: "DINAR LIBIO" },
    { code: "CSD", name: "DINAR SERBIO" },
    { code: "DJF", name: "DJIBOUTI FRANC" },
    { code: "STD", name: "DOBRA" },
    { code: "AUD", name: "DOLAR AUSTRALIANO" },
    { code: "BZD", name: "DOLAR BELICEÑO" },
    { code: "CAD", name: "DOLAR CANADIENSE" },
    { code: "BSD", name: "DOLAR DE BAHAMAS" },
    { code: "BBD", name: "DOLAR DE BARBADOS" }

  ];

  insuranceNames: string[] = [
    "FLOTILLA AUTOMÓVILES",
    "INCENDIO (Edificios y Contenido)",
    "EQUIPO ELECTRÓNICO",
    "RESPONSABILIDAD CIVIL",
    "TRANSPORTE",
    "AVIACIÓN",
    "EMBARCACIONES",
    "CONSTRUCCIÓN",
    "MONTAJE",
  ];
  insuranceNames1: string[] = [
    "COLECTIVO DE VIDA",
    "COLECTIVO DE GASTOS MÉDICOS",
    "COLECTIVO DE ACCIDENTES PERSONALES",
  ];
  insuranceNames2: string[] = ["TIPO"];
  insuranceNames3: string[] = ["...#"];
  //------------------------------------
  formcheckbox: FormGroup;
  formcheckboxexpenses: FormGroup;
  formoriginmoney: FormGroup;
  formSourceFound: FormGroup;
  formMigrationCondition: FormGroup;
  formRichpep: FormGroup;
  formSourceIncome: FormGroup;

  OtherIncomecheckboxes: Array<any> = [
    { name: "Actividades profesionales.", value: "1", id: "1", status: false },
    { name: "Manutención.", value: "6", id: "6", status: false },
    { name: "Rentas.", value: "3", id: "3", status: false },
    { name: "Jubilación.", value: "4", id: "4", status: false },
    { name: "Otra fuente.", value: "5", id: "5", status: false },


  ];

  SourceIncomechexboxes: Array<any> = [
    {
      name: "Relación de dependencia",
      value: "0",
      id: "rddepen",
      status: false,
    },
    { name: "Negocio Propio", value: "1", id: "npps", status: false },
    { name: "Otras", value: "2", id: "osic", status: false },
  ];
  RichPepchexboxes: Array<any> = [
    { name: "Herencia", value: "0", id: "heren", status: false },
    { name: "Negocio propio", value: "1", id: "np", status: false },
    { name: "Servicios profesionales", value: "2", id: "sp", status: false },
    { name: "Trabajos anteriores", value: "3", id: "ta", status: false },
    { name: "Trabajo actual", value: "4", id: "taa", status: false },
    { name: "Otros", value: "5", id: "otrr", status: false },
  ];
  MigrationConditionshecboxes: Array<any> = [
    { name: "Residente temporal", value: "0", id: "rtemp", status: false },
    { name: "Residente permanente", value: "1", id: "rperm", status: false },
    { name: "Persona en tránsito", value: "2", id: "petran", status: false },
    { name: "Turista o visitante", value: "3", id: "tov", status: false },
    { name: "Permiso de trabajo", value: "4", id: "petrab", status: false },
    {
      name: "Permiso consular o similar",
      value: "5",
      id: "pcos",
      status: false,
    },
    { name: "Otros", value: "6", id: "pcos", status: false },
  ];
  Currencychecboxes: Array<any> = [
    { name: "Quetzales", value: "0", id: "siq", status: false },
    { name: "USD", value: "1", id: "siu", status: false },
    { name: "Euros", value: "2", id: "sie", status: false },
    { name: "Otros", value: "3", id: "sio", status: false },
  ];
  Currencychecboxesexpenses: Array<any> = [
    { name: "Quetzales", value: "0", id: "siqex", status: false },
    { name: "USD", value: "1", id: "siuex", status: false },
    { name: "Euros", value: "2", id: "sieex", status: false },
    { name: "Otros", value: "3", id: "sioex", status: false },
  ];
  originMoneyChecboxes: Array<any> = [
    { name: "Herencia", value: "0", id: "siqexm", status: false },
    { name: "Negocio Propio", value: "1", id: "siuexm", status: false },
    {
      name: "Servicios profesionales",
      value: "2",
      id: "sieexm",
      status: false,
    },
    { name: "Prestamos bancarios", value: "3", id: "sioexm", status: false },
    { name: "trabajos anterior", value: "4", id: "txm", status: false },
    { name: "trabajo actual", value: "5", id: "texm", status: false },
    { name: "Otros", value: "6", id: "tem", status: false },
  ];
  originSourceFound: Array<any> = [
    { name: "Sueldos y Salarios", value: "0", id: "sipss", status: false },
    { name: "Remesas", value: "1", id: "sipsr", status: false },
    {
      name: "Manutención",
      value: "2",
      id: "sipsm",
      status: false,
    },
    {
      name: "Pensiones por Jubilación",
      value: "3",
      id: "sipsp",
      status: false,
    },
    { name: "Ahorros personales", value: "4", id: "sipsa", status: false },
    { name: "Intereses", value: "5", id: "sipsi", status: false },
    { name: "Compraventa Inmuebles", value: "6", id: "sipsci", status: false },
    { name: "Compraventa Muebles", value: "7", id: "sipscm", status: false },
    { name: "Compraventa de Ganado", value: "8", id: "sipscg", status: false },
    { name: "Compraventa Agrícola", value: "9", id: "sipsca", status: false },
    { name: "Ventas del Negocio", value: "10", id: "sipsvn", status: false },
    { name: "Servicios del Negocio", value: "11", id: "sipssn", status: false },
    { name: "Arrendamiento Bienes", value: "12", id: "sipsab", status: false },
    { name: "Dividendos/Utilidades", value: "13", id: "sipsdu", status: false },
    { name: "Aporte de Capital", value: "14", id: "sipsac", status: false },
    { name: "Préstamo", value: "15", id: "sipsps", status: false },
    {
      name: "Traspaso o cancelación de cuenta/inversión",
      value: "16",
      id: "siptc",
      status: false,
    },
    { name: "Otra (especifique)", value: "17", id: "sipo", status: false },
  ];
  dataDeudores = [];
  dataCurrency = [];
  dataBanks = [];
  activeFeicIncomeSource: any = null;
  currentContainer;
  status1: boolean;
  status2: boolean;
  status3: boolean;
  status4: boolean;
  status5: boolean;
  status6: boolean;
  status7: boolean;
  status8: boolean;
  status9: boolean;
  status10: boolean;
  status11: boolean;
  status12: boolean;
  status13: boolean;
  status14: boolean;
  status15: boolean;
  status16: boolean;
  dataMigrationStatus = migrationStatus

  CurrentBankLoans: any;
  CurrentBankAccount: any;

  pageSize = 20;
  selecionCountry1: string[] = [];
  selecionDepartment1: string[] = [];
  selecionMunicipality1: string[] = [];
  optionsCountries = [];
  optionsDepartments = [];
  optionsMunicipalities = [];
  selecionCountry2: string[] = [];
  selecionDepartment2: string[] = [];
  selecionMunicipality2: string[] = [];
  selecionDepartment2ID: number;
  selecionMunicipality2ID: number;
  selecionCountry3: string[] = [];
  selecionDepartment3: string[] = [];
  selecionMunicipality3: string[] = [];
  selecionDepartment3ID: number;
  selecionMunicipality3ID: number;
  selecionCountry4: string[] = [];
  selecionDepartment4: string[] = [];
  selecionMunicipality4: string[] = [];
  selecionDepartment4ID: number;
  selecionMunicipality4ID: number;
  selecionCountry5: string = null;
  selecionDepartment5: string = null;
  selecionDepartment5ID: number;
  selecionMunicipality5: string = null;
  selecionMunicipality5ID: number;
  selecionCountry6: string[] = [];
  selecionDepartment6: string[] = [];
  selecionMunicipality6: string[] = [];
  selecionDepartment6ID: number = -1;
  selecionMunicipality6ID: number = -1;
  selecionCountry7: string;
  selecionDepartment7: string[] = [];
  selecionMunicipality7: string[] = [];
  selecionDepartment7ID: number = -1;
  selecionMunicipality7ID: number = -1;
  selecionCountry8: string;
  selecionDepartment8: string[] = [];
  selecionMunicipality8: string[] = [];
  selecionDepartment8ID: number = -1;
  selecionMunicipality8ID: number = -1;
  selecionCountry9: string[] = [];
  selecionDepartment9: string[] = [];
  selecionMunicipality9: string[] = [];
  selecionDepartment9ID: number;
  selecionMunicipality9ID: number;
  selecionCountry10: string = '';
  selecionDepartment10: string[] = [];
  selecionDepartment10ID: number = -1;
  selecionMunicipality10: string[] = [];
  selecionMunicipality10ID: number = -1;

  selecionCountry11: string[] = [];
  selecionDepartment11: string[] = [];
  selecionDepartment11ID: number = -1;
  selecionMunicipality11: string[] = [];
  selecionMunicipality11ID: number = -1;

  selecionCountry12: string[] = [];
  selecionDepartment12: string[] = [];
  selecionDepartment12ID: number = -1;
  selecionMunicipality12: string[] = [];
  selecionMunicipality12ID: number = -1;
  indexSupplier;
  indexCustomer;
  selecionCountry13: string[] = [];
  selecionDepartment13: string[] = [];
  selecionDepartment13ID: number = -1;
  selecionMunicipality13: string[] = [];
  selecionMunicipality13ID: number = -1;
  /*selecionCountry12: string[] = []; */

  selecionActsOnBehalf: boolean = null;
  selecionFeicMigrationCondition: string;

  selecionRelacionDeDependencia: number = -1;
  selecionNegocioPropio: number = -1;
  selecionOtras: number = -1;

  selecionParentesco: number = -1;
  selecionMotivacion: number = -1;

  selecionParentesco2: number = -1;
  selecionMotivacion2: number = -1;
  selecionCondicion2: string = '-1';

  selecionCountry99: string[] = [];
  selecionDepartment99: string[] = [];
  selecionDepartment99ID: number = -1;
  selecionMunicipality99: string[] = [];
  selecionMunicipality99ID: number = -1;
  dataPayForm = []

  feic_income_source: any = [
    { sector: null, amount: null, enabled: true },
    { sector: null, amount: null, enabled: false },
    { sector: null, amount: null, enabled: false },
    { sector: null, amount: null, enabled: false },
    { sector: null, amount: null, enabled: false },
  ];



  //#region FORMULARIOS

  //FORMULARIOS
  Form_request_doc = new FormGroup({
    doc_request_name: new FormControl("", [Validators.required]),
    doc_request_email: new FormControl("", [
      Validators.required,
      Validators.email,
    ]),
    doc_request_phone: new FormControl("", [
      Validators.required,
      Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)"),
    ]),
  });

  Form_chargues = new FormGroup({
    charges_request_name: new FormControl("", [Validators.required]),
    charges_request_email: new FormControl("", [
      Validators.required,
      Validators.email,
    ]),
    charges_request_phone: new FormControl("", [
      Validators.required,
      Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)"),
    ]),

  });

  Form_track_record_and_sales = new FormGroup({
    //Estas son los campos
    time_in_business: new FormControl("", [Validators.required, Validators.min(0)]),
    last_year_sales: new FormControl("", [Validators.required, Validators.min(0)]),
    ///
  })
  Form_other_data_contact = new FormGroup({
    email_send_fact: new FormControl(null, [Validators.required, Validators.email]),
    email_send_fact_name: new FormControl(null, [Validators.required]),
    email_send_fact_phone: new FormControl(null, [Validators.required,
    Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)"),]),
    email_accounting: new FormControl(null, [Validators.required]),
    email_accounting_name: new FormControl(null, [Validators.required]),
    email_accounting_phone: new FormControl(null, [Validators.required]),
    email_isr: new FormControl(null, [Validators.required, Validators.email]),
    email_isr_name: new FormControl(null, [Validators.required]),
    email_isr_phone: new FormControl(null, [Validators.required,
    Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)"),]),
  })
  Form_other_data = new FormGroup({
    rep_marry_lastname: new FormControl(""),
    rep_s_lastname: new FormControl("", [Validators.required]),
    rep_fecnac: new FormControl('', [Validators.required]),
    rep_f_lastname: new FormControl("", [Validators.required]),
    rep_other_name: new FormControl("",),
    rep_secondname: new FormControl("", [Validators.required]),
    rep_firstname: new FormControl("", [Validators.required]),
    rep_notarialact_position: new FormControl("", [Validators.required]),
    rep_nationality: new FormControl("", [Validators.required]),
    rep_other_nationality: new FormControl(""),
    rep_place_birth: new FormControl("", [Validators.required]),
    rep_migration_status: new FormControl(-1, [this.selectNotDefault]),
    rep_other_migration_status: new FormControl(""),
    rep_genre: new FormControl("", [Validators.required]),
    rep_marital_status: new FormControl("", [Validators.required]),
    rep_profesion: new FormControl("", [Validators.required]),
    rep_id_document_type: new FormControl("", [Validators.required]),
    rep_id_number: new FormControl("", [
      Validators.required,
      isDPIValid
    ]),
    rep_id_emission_country: new FormControl(""),
    iva_holder: new FormControl('0', [Validators.required]),
    iva_percentage: new FormControl("", [
      Validators.required,
      Validators.min(0),
      Validators.max(100),
    ]),
    isr_holder: new FormControl('0', [Validators.required]),
    isr_percentage: new FormControl("", [
      Validators.min(0),
      Validators.max(100),
    ]),

    owncompany_name: new FormControl('', []),
    economic_sector: new FormControl('', [Validators.required]),
    // email_send_fact: new FormControl(null, [Validators.required, Validators.email]),
    // email_send_fact_name: new FormControl(null, [Validators.required]),
    // email_send_fact_phone: new FormControl(null, [Validators.required,
    // Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)"),]),
    warranty_type_id: new FormControl('', [Validators.required]),
    // email_isr: new FormControl(null, [Validators.required, Validators.email]),
    // email_isr_name: new FormControl(null, [Validators.required]),
    // email_isr_phone: new FormControl(null, [Validators.required,
    // Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)"),]),
    amount: new FormControl(null, []),
    time_in_months: new FormControl(null, []),
    destination: new FormControl(null, []),
    // email_accounting: new FormControl(null, [Validators.required]),
    // email_accounting_name: new FormControl(null, [Validators.required]),
    // email_accounting_phone: new FormControl(null, [Validators.required]),
    position_held: new FormControl(null, []),
    business_contact_name: new FormControl(null, []),
    business_contact_rol: new FormControl(null, []),
    rep_phone: new FormControl("", [isPhoneNumberValid]),
    rep_cellphone: new FormControl("", [isPhoneNumberValid]),
    rep_email: new FormControl("", [Validators.required]),
    rep_particular_address: new FormControl("", [Validators.required]),
    rep_zone: new FormControl("", [Validators.required]),
    rep_dep: new FormControl("", [Validators.required]),
    rep_muni: new FormControl("", [Validators.required]),
    rep_country: new FormControl("", [Validators.required]),
    rep_notarialact_inscription_number: new FormControl(""),
    rep_notarialact_fecini: new FormControl("", [Validators.required]),
    rep_notarialact_fecend: new FormControl("", [Validators.required]),
    rep_notarialact_notary: new FormControl("", [Validators.required]),
    rep_nit: new FormControl("", [
      Validators.required,
      isNitValid,
    ]),
    rep_acts_likes_mandatory: new FormControl("", [Validators.required]),
    rep_registry_name: new FormControl("", [Validators.required]),
    rep_registry_number: new FormControl("", [Validators.required]),
    rep_registry_folio: new FormControl("", [Validators.required]),
    rep_registry_book: new FormControl("", [Validators.required]),
    rep_act_only_forentity: new FormControl("", [Validators.required]),
    rep_individual_marry_lastname: new FormControl(""),
    rep_individual_other_name: new FormControl(""),
    rep_individual_genre: new FormControl("", [Validators.required]),
    rep_individual_fecnac: new FormControl("", [Validators.required]),
    rep_individual_other_nationality: new FormControl(""),
    rep_individual_id_document_emission_country: new FormControl(""),
    rep_id_emission_dep: new FormControl("", [Validators.required]),
    rep_id_emission_muni: new FormControl("", [Validators.required]),
    entity_website: new FormControl("", []),
    economic_antivity: new FormControl("", [Validators.required]),
  }, { validators: [phoneOrMobilephone(Validators.required, ['rep_phone', 'rep_cellphone'])] });

  FormPartners = new FormGroup({
    name: new FormControl("", [Validators.required]),
    position: new FormControl("", [Validators.required]),
    nationality: new FormControl("", [Validators.required]),
    nit: new FormControl("", [
      Validators.required,
      isNitValid,
    ]),
    shareholding: new FormControl("", [
      Validators.required,
      Validators.min(0),
      Validators.max(100),
    ]),
  });

  FormUpdatePartners = new FormGroup({
    name: new FormControl("", [Validators.required]),
    position: new FormControl("", [Validators.required]),
    nationality: new FormControl("", [
      Validators.required,
      Validators.min(0),
      Validators.max(100)
    ]),
    nit: new FormControl("", [
      Validators.required,
      isNitValid,
    ]),
    shareholding: new FormControl("", [
      Validators.required,
      Validators.min(0),
      Validators.max(100)
    ]),
  });

  FormDirectors = new FormGroup({
    name: new FormControl("", [Validators.required]),
    position: new FormControl("", [Validators.required]),
    nit: new FormControl("", [
      Validators.required,
      isNitValid,
    ]),
    pep: new FormControl("0", [Validators.required]),
  });

  FormUpdateDirectors = new FormGroup({
    name: new FormControl("", [Validators.required]),
    position: new FormControl("", [Validators.required]),
    nit: new FormControl("", [
      Validators.required,
      Validators.pattern("^[0-9]+(-?[0-9kK])?$"),
    ]),
    pep: new FormControl("0", [Validators.required]),
  });

  FormCompanys = new FormGroup({
    holding: new FormControl("", [Validators.required]),
    comercial_name: new FormControl("", [Validators.required]),
    relation: new FormControl("", [Validators.required]),
    sector: new FormControl("", [Validators.required]),
    nit: new FormControl("", [
      Validators.required,
      Validators.pattern("^[0-9]+(-?[0-9kK])?$"),
    ]),
    holding_name: new FormControl("", [Validators.required]),
    country: new FormControl("", [Validators.required, this.selectNotDefault()]),
    comercial_activity: new FormControl("", [Validators.required]),
  });

  FormUpdateCompanys = new FormGroup({
    comercial_name: new FormControl("", [Validators.required]),
    relation: new FormControl("", [Validators.required]),
    sector: new FormControl("", [Validators.required]),
    nit: new FormControl("", [
      Validators.required,
      Validators.pattern("^[0-9]+(-?[0-9kK])?$"),
    ]),
    holding_name: new FormControl("", [Validators.required]),
    country: new FormControl("", [Validators.required]),
    comercial_activity: new FormControl("", [Validators.required]),
  });

  FormBankAcount = new FormGroup({
    bank: new FormControl("", [Validators.required, this.selectNotDefault()]),
    account_number: new FormControl("", [Validators.required]),
    //nationality: new FormControl("", [Validators.required]),
    account_type: new FormControl("", [Validators.required]),
    currency: new FormControl("", [Validators.required]),
    monthly_average_deposit: new FormControl("", [Validators.required]),
    account_name: new FormControl('', [Validators.required])
  });

  FormUpdateBankAcount = new FormGroup({
    bank: new FormControl("", [Validators.required]),
    account_number: new FormControl("", [Validators.required]),
    //nationality: new FormControl("", [Validators.required]),
    account_type: new FormControl("", [Validators.required]),
    currency: new FormControl("", [Validators.required]),
    monthly_average_deposit: new FormControl("", [Validators.required]),
    account_name: new FormControl('', [Validators.required])
  });

  FormBankLoans = new FormGroup({
    bank: new FormControl("", [Validators.required]),
    loan_number: new FormControl("", [Validators.required]),
    warranty: new FormControl("", [Validators.required]),
    amount_awarded: new FormControl("", [Validators.required]),
    time: new FormControl("", [Validators.required]),
    balance: new FormControl("", [Validators.required]),
    contain: new FormControl(null, [Validators.required]),
  });

  FormUpdateBankLoans = new FormGroup({
    bank: new FormControl("", [Validators.required]),
    loan_number: new FormControl("", [Validators.required]),
    warranty: new FormControl("", [Validators.required]),
    amount_awarded: new FormControl("", [Validators.required]),
    time: new FormControl("", [Validators.required]),
    balance: new FormControl("", [Validators.required]),
  });

  FormFactoring = new FormGroup({
    entity: new FormControl("", [Validators.required]),
    warranty: new FormControl("", [Validators.required]),
    amount_awarded: new FormControl("", [Validators.required]),
    amount_used: new FormControl("", [Validators.required]),
    balance: new FormControl("", [Validators.required]),
    contain: new FormControl("1", [Validators.required]),
  });

  FormInsurance = new FormGroup({

    contain: new FormControl(null, [Validators.required]),
  });

  FormUpdateFactoring = new FormGroup({
    entity: new FormControl("", [Validators.required]),
    warranty: new FormControl("", [Validators.required]),
    amount_awarded: new FormControl("", [Validators.required]),
    amount_used: new FormControl("", [Validators.required]),
    balance: new FormControl("", [Validators.required]),
  });

  Formsuppliers = new FormGroup({
    name: new FormControl("", [Validators.required]),
    average_monthly_purchase: new FormControl("", [Validators.required]),
    max_credit: new FormControl("", [Validators.required]),
    country: new FormControl("", [Validators.required]),
    contact: new FormControl("", [Validators.required]),
    phone: new FormControl("", [Validators.required, Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)")]),
  });

  FormUpdatesuppliers = new FormGroup({
    name: new FormControl("", [Validators.required]),
    average_monthly_purchase: new FormControl("", [Validators.required]),
    max_credit: new FormControl("", [Validators.required]),
    country: new FormControl("", [Validators.required]),
    contact: new FormControl("", [Validators.required]),
    phone: new FormControl("", [Validators.required, Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)")]),
  });

  FormCustomer = new FormGroup({
    name: new FormControl("", [Validators.required]),
    monthly_average: new FormControl("", [Validators.required]),
    credit_days: new FormControl("", [Validators.required]),
    pay_form: new FormControl("", [Validators.required]),
    relation_time: new FormControl("", [Validators.required]),
    product_service: new FormControl("", [Validators.required]),
    contact: new FormControl("", [Validators.required]),
    phone: new FormControl("", [
      Validators.required,
      isPhoneNumberValid
    ]),
    country: new FormControl("", [Validators.required]),
    especific_pay_form: new FormControl("", [Validators.required])
  });

  FormUpdateCustomer = new FormGroup({
    name: new FormControl("", [Validators.required]),
    monthly_average: new FormControl("", [Validators.required]),
    credit_days: new FormControl("", [Validators.required]),
    pay_form: new FormControl("", [Validators.required]),
    especific_pay_form: new FormControl("", [Validators.required]),
    relation_time: new FormControl("", [Validators.required]),
    product_service: new FormControl("", [Validators.required]),
    contact: new FormControl("", [Validators.required]),
    phone: new FormControl("", [Validators.required, Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)")]),
    country: new FormControl("", [Validators.required]),
  });

  FormOperativeStructure = new FormGroup({
    type: new FormControl("0", [Validators.required]),
    name: new FormControl("", [Validators.required]),
    time: new FormControl("", [Validators.required]),
  });

  FormUpdateOperativeStructure = new FormGroup({
    type: new FormControl("", [Validators.required]),
    name: new FormControl("", [Validators.required]),
    time: new FormControl("", [Validators.required]),
  });

  FormProductsServices = new FormGroup({
    type: new FormControl("", [Validators.required]),
    name: new FormControl("", [Validators.required]),
    time: new FormControl("", [Validators.required]),
  });

  FormInsurances = new FormGroup({
    policy: new FormControl("", [Validators.required]),
    risk: new FormControl("", [Validators.required]),
    insured: new FormControl("", [Validators.required]),
    insurance_company: new FormControl("", [Validators.required]),
  });

  FormProductServices = new FormGroup({
    productions_commerce: new FormControl("", [Validators.required]),
    brands: new FormControl("", [Validators.required]),
    first_quarter: new FormControl("", [
      Validators.required,
      Validators.min(0),
      Validators.max(99),
    ]),
    second_quarter: new FormControl("", [
      Validators.required,
      Validators.min(0),
      Validators.max(99),
    ]),
    third_quarter: new FormControl("", [
      Validators.required,
      Validators.min(0),
      Validators.max(99),
    ]),
    fourth_quarter: new FormControl("", [
      Validators.required,
      Validators.min(0),
      Validators.max(99),
    ]),
  });

  FormMarketSegment = new FormGroup({
    market_segment: new FormControl("", [Validators.required]),
    competitors: new FormControl("", [Validators.required]),
    market_percentage: new FormControl("", [Validators.required]),
    distribution_channels: new FormControl("", [Validators.required]),
  });

  FormSales = new FormGroup({
    cash_sales: new FormControl("", [
      Validators.required,
      Validators.min(0),
      Validators.max(100),
    ]),
    credit_sales: new FormControl({ value: "", disabled: true }, [
      Validators.required,
      Validators.min(0),
      Validators.max(100),
    ]),
    local_sales: new FormControl("", [
      Validators.required,
      Validators.min(0),
      Validators.max(100),
    ]),
    exports_sales: new FormControl({ value: "", disabled: true }, [
      Validators.required,
      Validators.min(0),
      Validators.max(100),
    ]),
    sales_foreign_currency: new FormControl("", [Validators.required]),
    sales_foreign_currency_origin: new FormControl("", [Validators.required]),
  });

  FormPurchases = new FormGroup({
    cash_purchases: new FormControl("", [
      Validators.required,
      Validators.min(0),
      Validators.max(100),
    ]),
    credit_purchases: new FormControl({ value: "", disabled: true }, [
      Validators.required,
      Validators.min(0),
      Validators.max(100),
    ]),
    local_purchases: new FormControl("", [
      Validators.required,
      Validators.min(0),
      Validators.max(100),
    ]),
    exports_purchases: new FormControl({ value: "", disabled: true }, [
      Validators.required,
      Validators.min(0),
      Validators.max(100),
    ]),
    purchases_foreign_currency: new FormControl("", [Validators.required]),
    purchases_foreign_currency_origin: new FormControl("", [
      Validators.required,
    ]),
  });

  FormCountryOperations = new FormGroup({
    year_sales: new FormControl("", [Validators.required]),
    country: new FormControl("", [Validators.required]),
    country_operation: new FormControl(null, [Validators.required])
  });

  FormUpdateCountryOperations = new FormGroup({
    year_sales: new FormControl("", [Validators.required]),
    country: new FormControl("", [Validators.required]),
  });

  Formobligatedperson = new FormGroup({
    social_reason_comercial_name: new FormControl("", [Validators.required]),
    agency_name: new FormControl("", [Validators.required]),
    agency_code: new FormControl("", [Validators.required]),
  });


  FormRequestEntity = new FormGroup({
    entity_type: new FormControl("-1", [Validators.required]),
    //entity_type_especification: new FormControl("", [Validators.required]),
    name_entity: new FormControl("", [Validators.required]),
    comercial_name: new FormControl("", [Validators.required]),
    economic_antivity: new FormControl("", []),
    ive_02_nit: new FormControl("", [
      Validators.required,
      isNitValid,
    ]),
    constitution_country: new FormControl("", [Validators.required]),
    address_site: new FormControl(""),
  });

  FormPublicConstitution = new FormGroup({
    constitution_doc_num: new FormControl("", [Validators.required]),
    constitution_doc_date: new FormControl("", [Validators.required]),
    constitution_doc_notari: new FormControl("", [Validators.required]),
  });

  FormModPublicConstitution = new FormGroup({
    mod_constitution_doc_num: new FormControl("", []),
    mod_constitution_doc_date: new FormControl("", []),
    mod_constitution_doc_notari: new FormControl("", []),
  });

  FormSocietyPatent = new FormGroup({
    society_patent_num: new FormControl("", [Validators.required]),
    society_patent_folio: new FormControl("", [Validators.required]),
    society_patent_book: new FormControl("", [Validators.required]),
    society_patent_record_num: new FormControl("", [Validators.required]),
  });

  FormCompanyPatent = new FormGroup({
    company_patent_num: new FormControl("", [Validators.required]),
    company_patent_folio: new FormControl("", [Validators.required]),
    company_patent_book: new FormControl("", [Validators.required]),
    company_patent_record_num: new FormControl("", [Validators.required]),
  });

  FormGovernmental = new FormGroup({
    governmental_num: new FormControl("", [Validators.required]),
    governmental_date: new FormControl("", [Validators.required]),
    governmental_autority: new FormControl("", [Validators.required]),
  });

  FormRecord = new FormGroup({
    record_name: new FormControl("", [Validators.required]),
    record_num: new FormControl("", [Validators.required]),
    record_folio: new FormControl("", [Validators.required]),
    record_book: new FormControl("", [Validators.required]),
  });

  FormHeadOffice = new FormGroup({
    zone_site: new FormControl("", [Validators.required]),
    department_site: new FormControl("", [Validators.required]),
    muni_site: new FormControl("", [Validators.required]),
    country_site: new FormControl("", [Validators.required]),
    entity_phone: new FormControl("", [Validators.required, Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)")]),
    entity_website: new FormControl("",),
    entity_email: new FormControl("", [Validators.required]),
    entity_cpe: new FormControl("0", [Validators.required]),
  });

  FormComercialCompany = new FormGroup({
    name: new FormControl("", [Validators.required]),
    phone: new FormControl("", [isPhoneNumberValid]),
    cellphone: new FormControl("", [isPhoneNumberValid]),
  }, { validators: [phoneOrMobilephone(Validators.required, ['phone', 'cellphone'])] });

  FormUpdateComercialCompany = new FormGroup({
    name: new FormControl("", [Validators.required]),
    phone: new FormControl("", [isPhoneNumberValid]),
    cellphone: new FormControl("", [isPhoneNumberValid]),
  }, { validators: [phoneOrMobilephone(Validators.required, ['phone', 'cellphone'])] });

  FormFinancials = new FormGroup({
    name: new FormControl("", [Validators.required]),
    phone: new FormControl("", [Validators.required, isPhoneNumberValid]),
    product_service: new FormControl("", [Validators.required]),
  });

  FormUpdateFinancials = new FormGroup({
    name: new FormControl("", [Validators.required]),
    phone: new FormControl("", [Validators.required, isPhoneNumberValid]),
    product_service: new FormControl("", [Validators.required]),
  });

  FormMembers = new FormGroup({
    name: new FormControl(-1, [Validators.required, isDefaultValue]),
    position: new FormControl("", [Validators.required]),
  });

  FormUpdateMembers = new FormGroup({
    name: new FormControl("", [Validators.required]),
    position: new FormControl("", [Validators.required]),
  });

  FormFinancialInformation = new FormGroup({
    shareholder_more_than_ten: new FormControl("0", [Validators.required]),
    foreign_shareholder_more_than_ten: new FormControl("0", [
      Validators.required,
    ]),
    comercial_activity: new FormControl("", [Validators.required]),
    agencies_number: new FormControl("", [Validators.required]),
    employees_number: new FormControl("", [Validators.required]),
    income_currency_type: new FormControl("", [Validators.required]),
    other_income_currency_type: new FormControl("", [Validators.required]),
    expenses_currency_type: new FormControl("", [Validators.required]),
    other_expenses_currency_type: new FormControl("", [Validators.required]),
    total_income: new FormControl("-1", [Validators.required]),
    total_income_amount: new FormControl("", [Validators.required]),
    total_expenses: new FormControl("-1", [Validators.required]),
    total_expenses_amount: new FormControl("", [Validators.required]),
  });

  FormRepresentativeData = new FormGroup({
    rep_f_lastname: new FormControl("", [Validators.required]),
    rep_s_lastname: new FormControl("", [Validators.required]),
    rep_marry_lastname: new FormControl(""),
    rep_firstname: new FormControl("", [Validators.required]),
    rep_secondname: new FormControl("", [Validators.required]),
    rep_other_name: new FormControl(""),
    rep_fecnac: new FormControl(null, [Validators.required]),
    rep_nationality: new FormControl("", [Validators.required]),
    rep_other_nationality: new FormControl(""),
    rep_place_birth: new FormControl("", [Validators.required]),
    rep_migration_status: new FormControl("", []),
    rep_other_migration_status: new FormControl(""),
    rep_genre: new FormControl("", [Validators.required]),
    rep_marital_status: new FormControl("", [Validators.required]),
    rep_profesion: new FormControl("", [Validators.required]),
    rep_id_document_type: new FormControl("", [Validators.required]),
    rep_id_number: new FormControl("", [Validators.required]),
    rep_id_emission_dep: new FormControl("", [Validators.required]),
    rep_id_emission_muni: new FormControl("", [Validators.required]),
    rep_id_emission_country: new FormControl("", [Validators.required]),
    rep_nit: new FormControl("", [
      Validators.required,
      isNitValid,
    ]),
    rep_phone: new FormControl('', [isPhoneNumberValid]),
    rep_cellphone: new FormControl('', [isPhoneNumberValid]),
    rep_email: new FormControl("", [Validators.required]),
    rep_particular_address: new FormControl("", [Validators.required]),
    rep_zone: new FormControl("", [Validators.required]),
    rep_dep: new FormControl("", [Validators.required]),
    rep_muni: new FormControl("", [Validators.required]),
    rep_country: new FormControl("", [Validators.required]),
    rep_notarialact_inscription_number: new FormControl(""),
    rep_notarialact_fecini: new FormControl("", [Validators.required]),
    rep_notarialact_fecend: new FormControl("", [Validators.required]),
    rep_notarialact_notary: new FormControl("", [Validators.required]),
    rep_notarialact_position: new FormControl("", [Validators.required]),
    rep_acts_likes_mandatory: new FormControl("", [Validators.required]),
    rep_registry_name: new FormControl("", [Validators.required]),
    rep_registry_number: new FormControl("", [Validators.required]),
    rep_registry_folio: new FormControl("", [Validators.required]),
    rep_registry_book: new FormControl("", [Validators.required]),
    rep_act_only_forentity: new FormControl("", [Validators.required]),
    rep_individual_f_lastname: new FormControl("", [Validators.required]),
    rep_individual_s_lastname: new FormControl("", [Validators.required]),
    rep_individual_marry_lastname: new FormControl(""),
    rep_individual_firstname: new FormControl("", [Validators.required]),
    rep_individual_secondname: new FormControl("", [Validators.required]),
    rep_individual_other_name: new FormControl(""),
    rep_individual_genre: new FormControl("", [Validators.required]),
    rep_individual_comercialname: new FormControl("", [Validators.required]),
    rep_individual_fecnac: new FormControl("", [Validators.required]),
    rep_individual_country: new FormControl("", [Validators.required]),
    rep_individual_other_nationality: new FormControl(""),
    rep_individual_id_document_type: new FormControl("", [Validators.required]),
    rep_individual_id_document_number: new FormControl("", [
      Validators.required,
    ]),
    rep_individual_id_document_emission_country: new FormControl(""),
    rep_individual_nit: new FormControl("", [
      Validators.required,
      isNitValid,
    ]),
    rep_individual_phone: new FormControl("", [Validators.required, Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)")]),
    rep_individual_cellphone: new FormControl("", [Validators.required, Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)")]),
    rep_individual_pep: new FormControl("", [Validators.required]),
    rep_individual_pep_type: new FormControl(""),
    //rep_individual_pep_type: new FormControl("", [Validators.required]),
    rep_individual_pep_type_other: new FormControl(""),
    rep_individual_pep_relatives: new FormControl("", [Validators.required]),
    rep_individual_pep_close_person: new FormControl("", [Validators.required]),
  }, {
    validators: [
      phoneOrMobilephone(Validators.required, ['rep_phone', 'rep_cellphone'])
    ]
  });

  FormProductService = new FormGroup({
    prod_serv_product_type: new FormControl("", [Validators.required]),
    prod_serv_product_name: new FormControl("", [Validators.required]),
    prod_serv_currency: new FormControl(""),
    prod_serv_cover: new FormControl("", [Validators.required]),
    prod_serv_desciption: new FormControl("", [Validators.required]),
    //prod_serv_person: new FormControl("", [Validators.required]),
    prod_serv_initial_amount: new FormControl("", [Validators.required]),
    prod_serv_monthly_amount: new FormControl("", [Validators.required]),
    prod_serv_purpose: new FormControl("", [Validators.required]),
    prod_serv_source_found: new FormControl(""),
    prod_serv_entity_loan: new FormControl("", [Validators.required]),
    prod_serv_entity_account: new FormControl("", [Validators.required]),
    prod_serv_other: new FormControl("", [Validators.required]),
    prod_serv_transfers: new FormControl("", [Validators.required]),
    prod_serv_transfers_level: new FormControl("", [Validators.required]),
    prod_serv_other_signers: new FormControl("", [Validators.required]),
    prod_serv_coments: new FormControl(""),
  });

  FormCPE = new FormGroup({
    cpe_individual_person: new FormControl("", [Validators.required]),
    cpe_entity: new FormControl("", [Validators.required]),
    cpe_other_sginers: new FormControl("", [Validators.required]),
    cpe_legal_rep: new FormControl("", [Validators.required]),
    cpe_person_f_lastname: new FormControl("", [Validators.required]),
    cpe_person_s_lastname: new FormControl("", [Validators.required]),
    cpe_person_marry_lastname: new FormControl(""),
    cpe_person_firstname: new FormControl("", [Validators.required]),
    cpe_person_secondname: new FormControl("", [Validators.required]),
    cpe_person_othername: new FormControl(""),
    cpe_comercial_name: new FormControl("", [Validators.required]),
    cpe_is_cpe: new FormControl("", [Validators.required]),
    cpe_condition: new FormControl("", [Validators.required]),
    cpe_service_is_in_finances: new FormControl("", [Validators.required]),
    cpe_have_services_with_obligate_person: new FormControl("", [
      Validators.required,
    ]),
    spe_guatecompras_status: new FormControl("", [Validators.required]),
    /* btn_cpe: new FormControl("", [Validators.required]), */
    fec_is_cpe: new FormControl(null, [Validators.required]),
  });

  FormCPEData = new FormGroup({
    cpe_institutions: new FormControl("", [Validators.required]),
    cpe_services: new FormControl("", [Validators.required]),
    cpe_category_services: new FormControl("", [Validators.required]),
  });

  FormUpdateCPEData = new FormGroup({
    cpe_institutions: new FormControl("", [Validators.required]),
    cpe_services: new FormControl("", [Validators.required]),
    cpe_category_services: new FormControl("", [Validators.required]),
  });

  FormDebtors = new FormGroup({
    deb_social_reason: new FormControl("", [Validators.required]),
    deb_nit: new FormControl("", [
      Validators.required,
      Validators.pattern("^[0-9]+(-?[0-9kK])?$"),
    ]),
    deb_comercial_name: new FormControl("", [Validators.required]),
    deb_phones: new FormControl("", [Validators.required, Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)")]),
    deb_comercial_address: new FormControl("", [Validators.required]),
    deb_charge_address: new FormControl("", [Validators.required]),
    deb_principal_activity: new FormControl("", [Validators.required]),
    deb_contact: new FormControl("", [Validators.required]),
    deb_credit_days: new FormControl("", [Validators.required]),
    deb_pay_days: new FormControl("", [Validators.required]),
    deb_pay_schedule: new FormControl("", [Validators.required]),
    deb_pay_form: new FormControl("", [Validators.required]),
    deb_bank_name: new FormControl("", [Validators.required]),
    deb_iva: new FormControl("", [Validators.required]),
    deb_iva_percentage: new FormControl("-1", []),
    deb_isr: new FormControl("", [Validators.required]),
    deb_isr_percentage: new FormControl(-1, []),

    deb_emit_pass: new FormControl("", [Validators.required]),
    deb_web_age: new FormControl("", [Validators.required]),
    deb_belongs_com_group: new FormControl("", [Validators.required]),
    deb_pay_confirmation: new FormControl("", [Validators.required]),
    deb_comercial_relation_time: new FormControl("", [Validators.required]),
    deb_product: new FormControl("", [Validators.required]),
    debs_monthly_ave_purchases: new FormControl("", [Validators.required]),
    deb_direct_phone: new FormControl("", [Validators.required, Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)")]),
    deb_email1_bill_confirmation: new FormControl("", [Validators.required]),
    deb_email2_bill_confirmation: new FormControl(""),
  });

  FormMinute = new FormGroup({
    acta_hour: new FormControl("", [Validators.required]),
    acta_notary_name: new FormControl("", [Validators.required]),
    acta_notary_constituido: new FormControl("", [Validators.required]),
    acta_constituido_address: new FormControl("", [Validators.required]),
    acta_age: new FormControl("", [Validators.required]),
    acta_dpi_letters: new FormControl("", [Validators.required]),
    acta_dpi_numbers: new FormControl("", [
      Validators.required,
      isDPIValid,
    ]),
    acta_date: new FormControl("", [Validators.required]),
    acta_autorize_in: new FormControl("", [Validators.required]),
    acta_notary_autorize_gen: new FormControl("", [Validators.required]),
    acta_notary_autorize_name: new FormControl("", [Validators.required]),
    acta_registry: new FormControl("", [Validators.required]),
    acta_folio: new FormControl("", [Validators.required]),
    acta_book: new FormControl("", [Validators.required]),
    acta_sight_doc: new FormControl("", [Validators.required]),
    acta_autorize_date: new FormControl("", [Validators.required]),
    acta_autorize_person: new FormControl("", [Validators.required]),
    acta_authorize_name: new FormControl("", [Validators.required]),
    acta_authorize_assembly_date: new FormControl("", [Validators.required]),
    acta_agenda_number_point: new FormControl("", [Validators.required]),
    acta_rep_legal_gender: new FormControl("", [Validators.required]),
    acta_credit_amount: new FormControl("", [Validators.required]),
    acta_lead_time: new FormControl("", [Validators.required]),
    acta_person_who_authorize: new FormControl("", [Validators.required]),
    acta_authorize_hour: new FormControl("", [Validators.required]),
    acta_pages_number: new FormControl("", [Validators.required]),
    acta_page_form: new FormControl("", [Validators.required]),
  });


  FormFEICGeneral = new FormGroup({
    feic_country: new FormControl(null, [Validators.required]),
    feic_dep: new FormControl(null, [Validators.required]),
    feic_muni: new FormControl(null, [Validators.required]),
    feic_client_acts_own_behalf: new FormControl(null, [Validators.required]),
    feic_behalf: new FormControl(null, [Validators.required]),
  })
  /* Validators.pattern("(^[\w]+$)") */

  FormFEIC = new FormGroup({
    feic_f_lastname: new FormControl(null, [Validators.required]),
    feic_s_lastname: new FormControl(null),
    feic_marry_lastname: new FormControl(null),
    feic_firstname: new FormControl(null, [Validators.required]),
    feic_secondname: new FormControl(null),
    feic_other_name: new FormControl(null),
    feic_fecnac: new FormControl(null, [Validators.required]),
    feic_country_birth: new FormControl(null, [Validators.required]),
    feic_dep_birth: new FormControl(null, []),
    feic_muni_birth: new FormControl(null, []),
    feic_nationality: new FormControl(null, [Validators.required, this.selectNotDefault()]),
    feic_other_nat: new FormControl(null, [this.selectNotDefault()]),
    feic_migration_condition: new FormControl(null, []),
    feic_migration_especific: new FormControl(null, []),
    feic_gen: new FormControl(null, [Validators.required]),
    feic_civil_status: new FormControl(null, [Validators.required]),
    feic_profesion: new FormControl(null, [Validators.required]),
    feic_iddoc_type: new FormControl(null, [Validators.required]),
    feic_iddoc_num: new FormControl(null, [Validators.required, Validators.pattern("^[0-9]{4}s?[0-9]{5}s?[0-9]{4}$")]),
    feic_iddoc_emision_dep: new FormControl(null, [Validators.required]),
    feic_iddoc_emision_mun: new FormControl(null, [Validators.required]),
    feic_iddoc_emision_country: new FormControl(null, [Validators.required]),
    feic_nit: new FormControl(null, [
      Validators.required,
      isNitValid,
    ]),
    feic_phone: new FormControl("", [isPhoneNumberValid]),
    feic_movil: new FormControl("", [isPhoneNumberValid]),
    feic_email: new FormControl(null, [Validators.required, Validators.email]),
    feic_address: new FormControl(null, [Validators.required]),
    feic_address_zone: new FormControl(null),
    feic_address_dep: new FormControl(null, [Validators.required]),
    feic_address_mun: new FormControl(null, [Validators.required]),
    feic_address_country: new FormControl(null, [Validators.required]),
    feicp_f_lastname: new FormControl(null, [Validators.required]),
    feicp_s_lastname: new FormControl(null),
    feicp_marry_lastname: new FormControl(null),
    feicp_firstname: new FormControl(null, [Validators.required]),
    feicp_secondname: new FormControl(null),
    feicp_other_name: new FormControl(null),
    feicp_gen: new FormControl(null, [Validators.required]),
    feicp_comercial_name: new FormControl(null, [Validators.required]),
    feicp_fecnac: new FormControl(null, [Validators.required]),
    feicp_contitutution_or_nationality: new FormControl(null, [
      Validators.required,
    ]),
    feicp_other_nationality: new FormControl(null),
    feicp_iddoc_type: new FormControl(null, [Validators.required]),
    feicp_iddoc_num: new FormControl(null, [Validators.required,
      isDPIValid]),

    feicp_iddoc_emision_country: new FormControl(null, [Validators.required]),
    feicp_iddoc_emision_dep: new FormControl(null, []),
    feicp_nit: new FormControl(null, [
      Validators.required,
      isNitValid,
    ]),
    feicp_phone: new FormControl(''),
    feicp_movilphone: new FormControl(''),
    fecp_ispep: new FormControl(null, [Validators.required]),
    fecp_iscpe: new FormControl(null, [Validators.required]),
    fec_ispep: new FormControl(null, [Validators.required]),
    feic_pep_wealth_origin: new FormControl(null),
    fec_peps_relative: new FormControl(null, [Validators.required]),
    fec_peps_partener: new FormControl(null, [Validators.required]),
    fec_is_cpe: new FormControl(null, [Validators.required]),
    //MODIFICACIONES PARA ESTE CAMPO
    //feic_workref_name1: new FormControl(null, [Validators.required]),
    feic_workref_name1: new FormControl(null, []),
    //feic_workref_phone1: new FormControl(null, [Validators.required, Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)")]),
    feic_workref_phone1: new FormControl('', [isPhoneNumberValid]),
    //feic_workref_movil1: new FormControl(null, [Validators.required, Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)")]),
    feic_workref_movil1: new FormControl('', [isPhoneNumberValid]),

    //MODIFICACIONES PARA EL CAMPO 2
    feic_workref_name2: new FormControl(null, []),
    feic_workref_phone2: new FormControl('', [isPhoneNumberValid]),
    feic_workref_movil2: new FormControl('', [isPhoneNumberValid]),

    //MODIFICACIONES PARA EL CAMPO 1 LABORAL 
    feic_ref_name1: new FormControl(null, [Validators.required]),
    feic_ref_phone1: new FormControl('', [isPhoneNumberValid]),
    feic_ref_movil1: new FormControl('', [isPhoneNumberValid]),

    //MODIFICACIONES PARA EL CAMPO 2 LABORAL
    feic_ref_name2: new FormControl(null, [Validators.required]),
    feic_ref_phone2: new FormControl('', [isPhoneNumberValid]),
    feic_ref_movil2: new FormControl('', [isPhoneNumberValid]),


    feic_pep_entity: new FormControl(null, [Validators.required]),
    feic_pep_role: new FormControl(null, [Validators.required]),
    feic_pep_country_entity: new FormControl(null, [Validators.required]),
    feic_pep_wealth_especific: new FormControl(null, [Validators.required]),
    feic_source_income: new FormControl(null),
    feic_eco_company_sector: new FormControl(null, [Validators.required]),
    feic_eco_company_name: new FormControl(null, [Validators.required]),
    feic_eco_phones: new FormControl(null, [Validators.required, Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)")]),
    feic_eco_rol: new FormControl(null, [Validators.required]),
    feic_eco_company_address: new FormControl(null, [Validators.required]),
    feic_eco_company_zone: new FormControl(null),
    feic_eco_company_dep: new FormControl(null, [Validators.required]),
    feic_eco_company_mun: new FormControl(null, [Validators.required]),
    feic_eco_company_country: new FormControl(null, [Validators.required]),
    feic_eco_company_activity: new FormControl(null, [Validators.required]),
    feic_eco_company_income: new FormControl(null, []),
    feic_eco_owncomp_name: new FormControl(null, [Validators.required]),
    feic_eco_owncomp_phones: new FormControl(null, [Validators.required, Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)")]),
    feic_eco_owncomp_nit: new FormControl(null, [
      Validators.required,
      Validators.pattern("^[0-9]+(-?[0-9kK])?$"),
    ]),
    feic_eco_owncomp_op_fec: new FormControl(null, [Validators.required]),
    feic_eco_owncomp_business: new FormControl(null, [Validators.required]),
    feic_eco_owncomp_pat_num: new FormControl(null),
    feic_eco_owncomp_pat_folio: new FormControl(null),
    feic_eco_owncomp_pat_book: new FormControl(null),
    feic_eco_owncomp_pat_num_exp: new FormControl(null),
    feic_eco_owncomp_income: new FormControl(null, [Validators.required]),
    feic_eco_owncomp_address: new FormControl(null, [Validators.required]),
    feic_eco_owncomp_zone: new FormControl(null, [Validators.required]),
    feic_eco_owncomp_dep: new FormControl(null, [Validators.required]),
    feic_eco_owncomp_mun: new FormControl(null, [Validators.required]),
    feic_eco_owncomp_country: new FormControl(null, [Validators.required]),
    feic_eco_owncomp_activity: new FormControl(null, [Validators.required]),

    feic_eco_other_profesional_activity: new FormControl(null, [
      Validators.required,
    ]),
    feic_eco_other_alimony: new FormControl(null, [Validators.required]),
    feic_eco_other_rent: new FormControl(null, [Validators.required]),
    feic_eco_other_retirement: new FormControl(null, [Validators.required]),
    /* feic_eco_oher_aprox_income: new FormControl(null, [Validators.required]), */
    /* feic_eco_other_total_income: new FormControl(null, [Validators.required]), */
    feic_eco_other_specific: new FormControl(null, [Validators.required]),
    feic_eco_other_profesional_activity_income: new FormControl(null, [Validators.required]),
    feic_eco_other_alimony_income: new FormControl(null, [Validators.required]),
    feic_eco_other_rent_income: new FormControl(null, [Validators.required]),
    feic_eco_other_retirement_income: new FormControl(null, [Validators.required]),
    feic_eco_other_income_income: new FormControl(null, [Validators.required]),
    feic_eco_other_profesional_activity_curency: new FormControl(null, [Validators.required]),
    feic_eco_other_alimony_curency: new FormControl(null, [Validators.required]),
    feic_eco_other_rent_curency: new FormControl(null, [Validators.required]),
    feic_eco_other_retirement_curency: new FormControl(null, [Validators.required]),
    feic_eco_other_income_curency: new FormControl(null, [Validators.required]),

    /* feic_eco_company_income_currency: new FormControl(null, [Validators.required]),
    feic_eco_owncomp_income_currency: new FormControl(null, [Validators.required]), */
    //CAMPOS AGREGADOS PARA NUEVAS SECCIONES
    feic_client_economic_info: new FormControl(null, [Validators.required]),
    feic_economic_profile_admission: new FormControl(null, [Validators.required]),
    feic_economic_profile_date: new FormControl(null, [Validators.required]),
    feic_income_sources_total: new FormControl(null, [Validators.required]),
    feic_eco_owncomp_currency: new FormControl(null, [Validators.required]),
    feic_eco_company_currency: new FormControl(null, [Validators.required]),
    feic_income_sources_purpose: new FormControl(null, [Validators.required])

  }, {
    validators: [
      phoneOrMobilephone(Validators.required, ['feic_phone', 'feic_movil']),
      phoneOrMobilephone(Validators.required, ['feicp_phone', 'feicp_movilphone']),
      phoneOrMobilephone(Validators.required, ['feic_workref_phone1', 'feic_workref_movil1']),
      phoneOrMobilephone(Validators.required, ['feic_workref_phone2', 'feic_workref_movil2']),
      phoneOrMobilephone(Validators.required, ['feic_ref_phone1', 'feic_ref_movil1']),
      phoneOrMobilephone(Validators.required, ['feic_ref_phone2', 'feic_ref_movil2']),
    ]
  });






  FormFaPep = new FormGroup({
    feic_fa_relative_type: new FormControl("", [Validators.required]),
    feic_fa_relative_specific: new FormControl("", []),
    feic_fa_partner_type: new FormControl("", [Validators.required]),
    feic_fa_partner_specific: new FormControl("", []),
    feic_fa_gender: new FormControl("", [Validators.required]),
    feic_fa_condition: new FormControl("", [Validators.required]),
    feic_fa_f_lastname: new FormControl("", [Validators.required]),
    feic_fa_s_lastname: new FormControl(""),
    feic_fa_marry_lastname: new FormControl(""),
    feic_fa_firstname: new FormControl("", [Validators.required]),
    feic_fa_secondname: new FormControl(""),
    feic_fa_other_name: new FormControl(""),
    feic_fa_entity: new FormControl("", [Validators.required]),
    feic_fa_rol: new FormControl("", [Validators.required]),
    feic_fa_country_institution: new FormControl("", [Validators.required]),

  });

  FormUpdateFaPep = new FormGroup({
    feic_fa_relative_type: new FormControl("", [Validators.required]),
    feic_fa_relative_specific: new FormControl("", []),
    feic_fa_partner_type: new FormControl("", [Validators.required]),
    feic_fa_partner_specific: new FormControl("", []),
    feic_fa_gender: new FormControl("", [Validators.required]),
    feic_fa_condition: new FormControl("", [Validators.required]),
    feic_fa_f_lastname: new FormControl("", [Validators.required]),
    feic_fa_s_lastname: new FormControl(""),
    feic_fa_marry_lastname: new FormControl(""),
    feic_fa_firstname: new FormControl("", [Validators.required]),
    feic_fa_secondname: new FormControl(""),
    feic_fa_other_name: new FormControl(""),
    feic_fa_entity: new FormControl("", [Validators.required]),
    feic_fa_rol: new FormControl("", [Validators.required]),
    feic_fa_country_institution: new FormControl("", [Validators.required]),
  });

  FormServiceFEIC = new FormGroup({
    feic_product_fec: new FormControl("", [Validators.required]),
    feic_product_type: new FormControl("", [Validators.required]),
    feic_product_name: new FormControl("", [Validators.required]),
    feic_product_description: new FormControl("", [Validators.required]),
    feic_product_iden: new FormControl("", [Validators.required]),
    feic_product_contract_name: new FormControl("", [Validators.required]),
    feic_product_currency: new FormControl("", [Validators.required]),
    feic_product_value: new FormControl("", [Validators.required]),
    feic_product_country: new FormControl("", [Validators.required]),
    feic_product_dep: new FormControl("", [Validators.required]),
    feic_product_mun: new FormControl("", [Validators.required]),
  });

  FormUpdateServiceFEIC = new FormGroup({
    feic_product_fec: new FormControl("", [Validators.required]),
    feic_product_type: new FormControl("", [Validators.required]),
    feic_product_name: new FormControl("", [Validators.required]),
    feic_product_description: new FormControl("", [Validators.required]),
    feic_product_iden: new FormControl("", [Validators.required]),
    feic_product_contract_name: new FormControl("", [Validators.required]),
    feic_product_currency: new FormControl("", [Validators.required]),
    feic_product_value: new FormControl("", [Validators.required]),
    feic_product_country: new FormControl("", [Validators.required]),
    feic_product_dep: new FormControl("", [Validators.required]),
    feic_product_mun: new FormControl("", [Validators.required]),
  });
  Form1 = new FormGroup({
    charges_request_name: new FormControl("", [Validators.required]),
    charges_request_email: new FormControl("", [
      Validators.required,
      Validators.email,
    ]),
    charges_request_phone: new FormControl("", [
      Validators.required,
      Validators.pattern("(^[0-9]{4})|(^[+][0-9]{11}$)"),
    ]),
    doc_request_name: new FormControl("", [Validators.required]),
    doc_request_email: new FormControl("", [
      Validators.required,
      Validators.email,
    ]),
    doc_request_phone: new FormControl("", [
      Validators.required,
      Validators.pattern("(^[0-9]{4})|(^[+][0-9]{11}$)"),
    ]),
  });
  Form2 = new FormGroup({
    rep_marry_lastname: new FormControl(""),
    rep_s_lastname: new FormControl("", [Validators.required]),
    rep_f_lastname: new FormControl("", [Validators.required]),
    rep_other_name: new FormControl("",),
    rep_secondname: new FormControl("", [Validators.required]),
    rep_firstname: new FormControl("", [Validators.required]),
    rep_notarialact_position: new FormControl("", [Validators.required]),
    time_in_business: new FormControl("", [Validators.required]),
    last_year_sales: new FormControl("", [Validators.required]),
    iva_holder: new FormControl(0, [Validators.required]),
    iva_percentage: new FormControl("", [
      Validators.required,
      Validators.min(0),
      Validators.max(100),
    ]),
    isr_holder: new FormControl(0, [Validators.required]),
    isr_percentage: new FormControl("", [
      Validators.required,
      Validators.min(0),
      Validators.max(100),
    ]),
    owncompany_name: new FormControl(null, [Validators.required]),
    //economic_sector: new FormControl(null, [Validators.required]),
    email_send_fact: new FormControl(null, [Validators.required, Validators.email]),
    email_send_fact_name: new FormControl(null, [Validators.required]),
    email_send_fact_phone: new FormControl(null, [Validators.required,
    Validators.pattern("(^[0-9]{4})|(^[+][0-9]{11}$)"),]),
    warranty_type_id: new FormControl(null, [Validators.required]),
    email_isr: new FormControl(null, [Validators.required, Validators.email]),
    email_isr_name: new FormControl(null, [Validators.required]),
    email_isr_phone: new FormControl(null, [Validators.required,
    Validators.pattern("(^[0-9]{4})|(^[+][0-9]{11}$)"),]),
    amount: new FormControl(null, []),
    time_in_months: new FormControl(null, []),
    destination: new FormControl(null, []),
    email_accounting: new FormControl(null, [Validators.required]),
    email_accounting_name: new FormControl(null, [Validators.required]),
    email_accounting_phone: new FormControl(null, [Validators.required]),
    position_held: new FormControl(null, []),
    business_contact_name: new FormControl(null, [Validators.required]),
    business_contact_rol: new FormControl(null, [Validators.required]),

  });
  Form3 = new FormGroup({

  });
  Form4 = new FormGroup({

  });
  Form5 = new FormGroup({

  });
  Form6 = new FormGroup({

  });
  Form7 = new FormGroup({

  });
  Form8 = new FormGroup({

  });
  Form9 = new FormGroup({

  });
  Form10 = new FormGroup({

  });
  Form11 = new FormGroup({

  });
  dataAssociates: any;
  dataDirectors: any;
  dataBankaccount: any;
  dataBankLoans: any;
  dataFactoring: any;
  dataSupplier: any;
  dataCustomer: any;
  dataInsurances: any;
  dataCountryoperations: any;
  dataOperativeStructure: any[];
  dataComercialCompany: any;
  dataFinancials: any;
  dataMember: any;
  dataCompanies: any;
  cpe_data_array: any;
  flagFeic: any;
  fecPepsRelativeVar;
  //HasInsuraces: any;
  dataFapep: any;
  dataServicesFeic: any;
  fecPepsPartnerVar;
  CurrentComercialCompany: any;
  indexComercialCompany: any;
  indexBankAccount: any
  CurrentFapep: any;
  indexFaPep: any;
  CurrentServiceFeic: any;
  indexServicesFeic: any;
  CurrentFinancials: any;
  indexFinancials: any;
  CurrentMember: any;
  indexMember: any;
  indexCPE: any;
  CurrentCompanies: any;
  CurrentAssociate: any;
  CurrentFactoring: any;
  CurrentSupplier: any;
  CurrentCountryOperation: any;
  CurrentDirectors: any;
  CurrentCustomer: any;
  dataPersonsCustomer: any;
  representatives: any[] = [];
  dataISR: ISR;
  indexFactoring: any;
  dataForm: FormSave[] = null;
  customerData: any;
  customerMembersData: any;
  resultQuarters: number;
  boolQuarter: boolean = false;
  currencyData: any;

  validateQuarters() {

  }

  onChangeSelectorISR(target: number) {
    // if (target == 1) {
    //   this.FormDebtors.controls.deb_isr_percentage.setValidators([Validators.required])
    // } else {
    //   this.FormDebtors.controls.deb_isr_percentage.clearValidators()
    // }
    // console.log(target);
  }
  controlIsRequired(control: FormControl) {
    const validator = control.validator({} as AbstractControl);
    console.log(validator);
    if (validator && validator.required) {
      return true;
    }
  }
  onChangeMemberSelector(target: number) {
    const item = this.customerMembersData.find((item => item.person_id == target))
    console.log('On Selector Socio');
    console.log(item);
    this.FormPartners.controls['name'].setValue(item.name)
  }
  checkOtherFormData() {
    if (this.formData.metadata.sys_subject_id != 25 && this.formData.metadata.sys_subject_id != 33 && this.formData.metadata.sys_subject_id != 41 && this.formData.metadata.sys_subject_id != 43 && this.formData.metadata.sys_subject_id != 45) {
      // const invalid = [];
      // const controls = this.Form_other_data.controls;
      // for (const name in controls) {
      //   if (controls[name].invalid) {
      //     invalid.push(name);
      //   }
      // }
      // if (invalid.length > 0) {
      // }
      return this.Form_other_data.invalid
    } else {
      //VERIFICAMOS LOS OTROS
      if (
        this.Form_other_data.controls['position_held'].invalid ||
        this.Form_other_data.controls['owncompany_name'].invalid ||
        this.Form_other_data.controls['economic_sector'].invalid ||
        this.Form_other_data.controls['economic_antivity'].invalid ||
        this.Form_other_data.controls['iva_holder'].invalid ||
        this.Form_other_data.controls['isr_holder'].invalid
      ) {
        return true
      } else {
        return false
      }
    }

    return this.Form_other_data.invalid
  }
  onChangeSelector(target: number) {
    const item = this.representatives.find((item => item.id == target))
    console.log('On Selector');
    console.log(item);
    this.mysqlService.GetOnePerson(item.id, item.type_person).subscribe((c) => {
      let person = c.data
      if (person.birthdate) {
        let birthdate = new Date(person.birthdate).toISOString().slice(0, 10);
        this.Form_other_data.controls['rep_fecnac'].setValue(birthdate)
      }

      this.Form_other_data.controls['rep_firstname'].setValue(person.first_name)
      this.Form_other_data.controls['rep_secondname'].setValue(person.name2)
      this.Form_other_data.controls['rep_other_name'].setValue(person.name3)
      this.Form_other_data.controls['rep_f_lastname'].setValue(person.last_name)
      this.Form_other_data.controls['rep_s_lastname'].setValue(person.lastname2)
      this.Form_other_data.controls['rep_marry_lastname'].setValue(person.lastname3)
      this.Form_other_data.controls['rep_email'].setValue(person.email)
      this.Form_other_data.controls['rep_genre'].setValue(String(person.gender))
      this.Form_other_data.controls['rep_cellphone'].setValue(person.mobile_phone)
      this.Form_other_data.controls['rep_phone'].setValue(person.home_phone)
      this.Form_other_data.controls['rep_particular_address'].setValue(person.address)
      this.Form_other_data.controls['rep_id_number'].setValue(person.DPI)
    })
  }
  //#endregion FORMULARIOS

  constructor(
    private mysqlService: MysqlService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private _currency: CurrencyService,
    private _banks: BanksService,
    private _isr: IsrService,
    private modalService: NgbModal,
    private sanitizer: DomSanitizer,
    private autorization: AuthorizationService,
    private fb: FormBuilder,
    private _service: DebtorService,
    private location: Location,
    private payment_method: PaymentMethodService,
    private _ivaservice: SysivaService,
    private _FSService: FormsaveService,
    private _allData: AllDataService,
    public placeHolders: PlaceHoldersService,
    public errorMessages: ErrorMessagesService
  ) { }
  getPaymentMethod() {
    this.payment_method.getList(-1, -1, []).toPromise().then((response) => {
      console.log(response.payment_method)
      this.dataPayForm = response.payment_method
      this.dataPayForm.push(
        {
          "id_payment": -1,
          "payment_name": "Especifique",
        }
      )
    }).catch((e) => {
      this.toastr.error('error', 'Ocurrio un problema' + e.message);
    })
  }

  async ngOnInit() {
    this.modalService.dismissAll();
    await this.getCurrency();
    await this.getBanks();
    await this.getCustomer()
    await this.getISR()
    await this.getCustomerMembers()
    await this.getPaymentMethod()
    await this.getIva()
    if (localStorage.getItem("FormMetadata")) {

      const formdata = JSON.parse(localStorage.getItem("FormMetadata"));
      this.formData = formdata;

      formdata.metadata.forms.forEach((element) => {
        if (element.state == 1) {
          element.sections.forEach((data) => {
            this.SectionsAvailable.push(data);
          });
        }
      });
      this.SectionsAvailable = this.SectionsAvailable.filter(
        (x, i, a) => a.indexOf(x) == i
      );
      //cargar los representantes
      this.representatives = []
      console.log('FORM METADATA ', formdata)

    }
    console.log('storage', JSON.parse(localStorage.getItem("FormMetadata")));
    if (localStorage.getItem("persons_customer")) {
      this.dataPersonsCustomer = JSON.parse(localStorage.getItem("persons_customer"))
      this.representatives = [];
      let currentsubject = this.dataPersonsCustomer.currentsubject;
      for (let i = 0; i < this.dataPersonsCustomer.persons.length; i++) {
        let persons = this.dataPersonsCustomer.persons[i];
        let finded = false;
        let j = 0;
        for (j = 0; j < persons.childs.length; j++) {
          if (persons.childs[j].rsdet_id == currentsubject.rsdet_id) {
            finded = true;
            break;
          }
        }
        if (finded) {
          this.representatives = persons.childs.slice()
          this.representatives.splice(j, 1)
          this.representatives = this.representatives.map((item) => {

            if (item.person) {
              if (item.type_person == 1) {
                //Tabla person

                let data = {
                  DPI: item.person.DPI,
                  first_name: item.person.first_name,
                  last_name: item.person.last_name,
                  id: item.person_id,
                  text: item.person.name,
                  name2: item.person.name2,
                  name3: item.person.name3,
                  lastname2: item.person.lastname2,
                  lastname3: item.person.lastname3,
                  type_person: item.type_person
                }
                console.log(item.person);
                return data
              } else if (item.type_person == 2) {
                let data = {
                  DPI: item.person.DPI,
                  first_name: item.person.name1,
                  last_name: item.person.lastname1,
                  id: item.person.customer_id,
                  text: item.name,
                  name2: item.person.name2,
                  name3: item.person.name3,
                  lastname2: item.person.lastname2,
                  lastname3: item.person.lastname3,
                  type_person: item.type_person
                }
                return data
              }
            }
          })
          console.log(this.representatives)
          break
        } else {
          this.representatives = persons.childs.slice()
          this.representatives = this.representatives.map((item) => {

            if (item.person) {
              if (item.type_person == 1) {
                //Tabla person

                let data = {
                  DPI: item.person.DPI,
                  first_name: item.person.first_name,
                  last_name: item.person.last_name,
                  id: item.person_id,
                  text: item.person.name,
                  name2: item.person.name2,
                  name3: item.person.name3,
                  lastname2: item.person.lastname2,
                  lastname3: item.person.lastname3,
                  type_person: item.type_person
                }
                console.log(item.person);
                return data
              } else if (item.type_person == 2) {
                let data = {
                  DPI: item.person.DPI,
                  first_name: item.person.name1,
                  last_name: item.person.lastname1,
                  id: item.person.customer_id,
                  text: item.name,
                  name2: item.person.name2,
                  name3: item.person.name3,
                  lastname2: item.person.lastname2,
                  lastname3: item.person.lastname3,
                  type_person: item.type_person
                }
                return data
              }
            }
          })

        }
      }
    }
    this.mysqlService.GetTypeRequest()
      .toPromise().then((response) => {
        let auxType = response.data
        this.FormProductService.get('prod_serv_product_type').setValue(auxType.find(item => item.type_id == this.formData.dataRequest.type).name);
      })
    /* console.log("this.formData");
    console.log(this.formData); */
    let au = this.formData.customer.amount_interests;
    //console.log("au: ", au);
    //console.log("Customer ",this.formData.customer)
    this.FormProductService.get('prod_serv_monthly_amount').setValue(au);
    this.FormProductService.get('prod_serv_initial_amount').setValue(au);
    this.FormProductService.get('prod_serv_currency').setValue(this.formData.customer.currency != null ? this.formData.customer.currency : null);
    //Desde este punto es necesario de obtener los nuevos mantenimientos

    this.FormProductService.get('prod_serv_cover').setValue(this.formData.dataRequest.location == 0 ? "Local" : "Intenacional");
    this.Form_other_data.get('warranty_type_id').setValue(this.formData.dataRequest.warranty_type);
    this.Form_other_data.get('amount').setValue(this.formData.customer.amount_interests);
    this.Form_other_data.get('time_in_months').setValue(this.formData.dataRequest.time_in_months);
    this.Form_other_data.get('destination').setValue(this.formData.dataRequest.destination);
    this.Form_other_data.get('economic_sector').setValue(this.formData.dataRequest.comercial_activity);

    this.Form_other_data.get('iva_holder').setValue((this.formData.dataRequest.iva_holder === '0' || this.formData.dataRequest.iva_holder == null) ? '0' : '1');

    /*
    this.FormRepresentativeData.get('rep_marital_status').setValue(this.formData.dataRequest.marital_status);
    this.FormRepresentativeData.get('rep_id_document_type').setValue(this.formData.dataRequest.rep_id_document_type );
    
    this.FormProductService.get('deb_iva').setValue(this.formData.dataRequest.deb_iva);
    */


    /* this.FormProductService.get('prod_serv_monthly_amount').disable();
    this.FormProductService.get('prod_serv_initial_amount').disable();
    this.FormProductService.get('prod_serv_currency').disable();
    this.FormProductService.get('prod_serv_product_type').disable(); */
    this.FormProductService.get('prod_serv_desciption').disable();
    this.FormProductService.get('prod_serv_product_name').disable();
    /* this.FormProductService.get('prod_serv_cover').disable(); */
    /* this.Form_other_data.get('warranty_type_id').disable();
    this.Form_other_data.get('amount').disable(); */


    debugger
    if (this.formData.metadata.sys_subject_id != 25
      && this.formData.metadata.sys_subject_id != 33 && this.formData.metadata.sys_subject_id != 41 && this.formData.metadata.sys_subject_id != 43 && this.formData.metadata.sys_subject_id != 45) {

      this.Form_other_data.controls.rep_marry_lastname.enable();
      this.Form_other_data.controls.rep_s_lastname.enable();
      this.Form_other_data.controls.rep_f_lastname.enable();
      this.Form_other_data.controls.rep_other_name.enable();
      this.Form_other_data.controls.rep_secondname.enable();
      this.Form_other_data.controls.rep_firstname.enable();
      this.Form_other_data.controls.rep_notarialact_position.enable();
      this.Form_other_data.controls.owncompany_name.enable();
      this.Form_other_data_contact.controls.email_send_fact.enable();
      this.Form_other_data_contact.controls.email_send_fact_name.enable();
      this.Form_other_data_contact.controls.email_send_fact_phone.enable();
      this.Form_other_data_contact.controls.email_isr.enable();
      this.Form_other_data_contact.controls.email_isr_name.enable();
      this.Form_other_data_contact.controls.email_isr_phone.enable();
      this.Form_other_data_contact.controls.email_accounting.enable();
      this.Form_other_data_contact.controls.email_accounting_name.enable();
      this.Form_other_data_contact.controls.email_accounting_phone.enable();
      this.Form_other_data.controls.rep_nationality.enable();
      this.Form_other_data.controls.rep_place_birth.enable();
      this.Form_other_data.controls.rep_marital_status.enable();
      this.Form_other_data.controls.rep_id_document_type.enable();
      this.Form_other_data.controls.rep_profesion.enable();
      this.Form_other_data.controls.rep_id_number.enable();
      this.Form_other_data.controls.rep_id_emission_country.enable();
      this.Form_other_data.controls.iva_percentage.enable();
      this.Form_other_data.controls.rep_phone.enable();
      this.Form_other_data.controls.rep_cellphone.enable();
      this.Form_other_data.controls.rep_email.enable();
      this.Form_other_data.controls.rep_particular_address.enable();
      this.Form_other_data.controls.rep_zone.enable();
      this.Form_other_data.controls.rep_dep.enable();
      this.Form_other_data.controls.rep_muni.enable();
      this.Form_other_data.controls.rep_country.enable();
      this.Form_other_data.controls.rep_notarialact_notary.enable();
      this.Form_other_data.controls.rep_nit.enable();
      this.Form_other_data.controls.rep_id_emission_dep.enable();
      this.Form_other_data.controls.rep_id_emission_muni.enable();

    }
    else {
      this.Form_other_data.controls.rep_marry_lastname.disable();
      this.Form_other_data.controls.rep_s_lastname.disable();
      this.Form_other_data.controls.rep_f_lastname.disable();
      this.Form_other_data.controls.rep_other_name.disable();
      this.Form_other_data.controls.rep_secondname.disable();
      this.Form_other_data.controls.rep_firstname.disable();
      this.Form_other_data.controls.rep_notarialact_position.disable();
      this.Form_other_data.controls.owncompany_name.enable();
      this.Form_other_data_contact.controls.email_send_fact.enable();
      this.Form_other_data_contact.controls.email_send_fact_name.enable();
      this.Form_other_data_contact.controls.email_send_fact_phone.enable();
      this.Form_other_data_contact.controls.email_isr.enable();
      this.Form_other_data_contact.controls.email_isr_name.enable();
      this.Form_other_data_contact.controls.email_isr_phone.enable();
      this.Form_other_data_contact.controls.email_accounting.enable();
      this.Form_other_data_contact.controls.email_accounting_name.enable();
      this.Form_other_data_contact.controls.email_accounting_phone.enable();
      this.Form_other_data.controls.rep_nationality.disable();
      this.Form_other_data.controls.rep_place_birth.disable();
      this.Form_other_data.controls.rep_marital_status.disable();
      this.Form_other_data.controls.rep_id_document_type.disable();
      this.Form_other_data.controls.rep_profesion.disable();
      this.Form_other_data.controls.rep_id_number.disable();
      this.Form_other_data.controls.rep_id_emission_country.disable();
      this.Form_other_data.controls.iva_percentage.enable();
      this.Form_other_data.controls.rep_phone.disable();
      this.Form_other_data.controls.rep_cellphone.disable();
      this.Form_other_data.controls.rep_email.disable();
      this.Form_other_data.controls.rep_particular_address.disable();
      this.Form_other_data.controls.rep_zone.disable();
      this.Form_other_data.controls.rep_dep.disable();
      this.Form_other_data.controls.rep_muni.disable();
      this.Form_other_data.controls.rep_country.disable();
      this.Form_other_data.controls.rep_notarialact_notary.disable();
      this.Form_other_data.controls.rep_nit.disable();
      this.Form_other_data.controls.rep_id_emission_country.disable();
      this.Form_other_data.controls.rep_id_emission_dep.disable();
      this.Form_other_data.controls.rep_id_emission_muni.disable();

    }
    this.formcheckbox = this.fb.group({
      isArray: this.fb.array([], [Validators.required]),
    });
    this.formcheckboxexpenses = this.fb.group({
      isArray: this.fb.array([], [Validators.required]),
    });
    this.formoriginmoney = this.fb.group({
      isArray: this.fb.array([], [Validators.required]),
    });
    this.formSourceFound = this.fb.group({
      isArray: this.fb.array([], [Validators.required]),
    });
    this.formMigrationCondition = this.fb.group({
      isArray: this.fb.array([], [Validators.required]),
    });
    this.formRichpep = this.fb.group({
      isArray: this.fb.array([], [Validators.required]),
    });
    this.formSourceIncome = this.fb.group({
      isArray: this.fb.array([], [Validators.required]),
    });
    this.spinner.show();
    /*localStorage.setItem(
      "FormMetadata",
      JSON.stringify({
        request_id: 1,
        person_id: 1,
        isTrustee: 0,
        form_id: null,
      })
    ); */
    this.optionsDepartments = await this.getDepartments();
    this.optionsMunicipalities = await this.getMunicipalities();

    this.GetGeneralData();


    await this._service.getALLDebtors().subscribe((debtors) => {
      this.dataDeudores = debtors.debtor.filter(item => item.status == 0);
    });



  }
  dataIva: IVA[] = []
  getIva() {
    this._ivaservice.getList(-1, -1, []).toPromise().then((response) => {
      this.dataIva = response.iva
    })
  }
  getFormSave(id: number) {
    this._FSService.getData(id).subscribe((response) => {
      console.log('MANDANDO INFORMACION SECCIONES');
      console.log(response);
      this.dataForm = response;
    })
  }
  getCurrency() {
    this._currency.getCurrency(this.pageSize, 0, []).subscribe((c) => {
      this.dataCurrency = c.currency;
      console.log(this.dataCurrency)
    })
  }
  getOneCurrency(id) {
    if (this.dataCurrency === undefined) { return '' }
    let find = this.dataCurrency.find((item) => item.id_currency == id)
    return find != undefined ? find.currency_name : ''
  }
  getBanks() {
    this._banks.getBanks(this.pageSize, 0, []).subscribe((c) => {
      this.dataBanks = c.banks;
      console.log(this.dataBanks)
    })
  }
  getISR() {
    this._isr.getAllISR().subscribe((c) => {
      this.dataISR = c;
      console.log('MANDANDO ISR ///////////');
      console.log(this.dataISR)
    })
  }
  getCustomer() {
    try {
      const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
      let id = datalocal.request_id;
      this._allData.getCustomerFR(id).subscribe((c) => {
        this.customerData = c;
        console.log('MANDANDO Data CUSTOMER ///////////');
        console.log(this.customerData)
      })
    }
    catch (error) {
      console.log(error);
    }
  }
  getCustomerMembers() {
    try {
      const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
      console.log(datalocal);
      console.log(datalocal.dataRequest.customer_id);
      let id = datalocal.dataRequest.customer_id
      let data = JSON.parse(localStorage.getItem('persons_customer'));
      debugger
      let d = data.persons[0].childs?.filter(item => item.type_person == 1) || []
      this.customerMembersData = d
      // this._allData.getCustomerMembers(id).subscribe((c) => {
      //   this.customerMembersData = c;
      //   console.log('MANDANDO Data CUSTOMER ///////////');
      //   console.log(this.customerMembersData)
      // })
    }
    catch (error) {
      console.log(error);
    }
  }

  mobileSidebar() {
    this.showSidebar = !this.showSidebar;
  }
  returnBack(): void {
    this.location.back()
  }
  showForm(containerNum: string) {
    this.currentContainer = containerNum;
  }
  ChangeForm(currentContainer: string) {

    let containerNum = parseInt(currentContainer);
    for (let i = containerNum + 1; i < 11; i++) {
      if (this.isSectionAvailable(i)) {
        this.currentContainer = String(i);
        return;
      }
    }

    //this.currentContainer = currentContainer;
  }

  getDepName(id) {
    console.log("getDepName::" + id);
    console.log();
    for (let i = 0; i < this.optionsDepartments.length; i++) {
      if (this.optionsDepartments[i].id == id)
        return this.optionsDepartments[i].name
    }
    console.log('VA A RETORNAR NULL');
    return null;
    /* return await this.optionsDepartments.find(dep => dep.id == id).name; */
  }
  getMuniName(id) {
    /* return await this.optionsMunicipalities.find(muni => muni.id == id).name; */
    for (let i = 0; i < this.optionsMunicipalities.length; i++) {
      if (this.optionsMunicipalities[i].id == id)
        return this.optionsMunicipalities[i].name
    }
    return null;
  }
  //SAVEMETHODS
  //#region SAVEMETHODS
  SaveForm1(): void { }
  SaveForm2(): void { }
  SaveForm3(): void { }
  SaveForm4(): void { }
  SaveForm5(): void { }
  SaveForm6(): void { }
  SaveForm7(): void { }
  SaveForm8(): void { }
  SaveForm9(): void { }
  SaveForm10(): void { }
  SaveForm11(): void { }
  saveInsurance(i) {
    let insudata = this.insuranceData[i];
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: {
          insurances: [insudata],
        },
      })
      .toPromise()
      .then(async (res) => {
        //console.log("res", res);
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        await this.ngOnInit();
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }
  async SaveFaPep() {
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    let arrayinfo = [];
    arrayinfo.push(this.FormFaPep.value);

    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: { fa_pep: arrayinfo },
      })
      .toPromise()
      .then(async (res) => {
        console.log("res", res);

        this.FormFaPep.reset({});
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        this.flagFeic = true;
        await this.ngOnInit();


        //this.ChangeForm("7");
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }
  async SaveServicesFEIC() {

    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    let arrayinfo = [];
    let data = this.FormServiceFEIC.value;
    data.feic_product_fec = new Date(data.feic_product_fec);
    data.feic_product_fec = this.addTimeZone(data.feic_product_fec);
    data.feic_product_dep = this.selecionDepartment9ID ? this.getDepName(this.selecionDepartment9ID) : null;
    data.feic_product_mun = this.selecionMunicipality9ID ? this.getMuniName(this.selecionMunicipality9ID) : null;
    arrayinfo.push(data);

    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: { feic_services: arrayinfo },
      })
      .toPromise()
      .then(async (res) => {
        //console.log("res", res);
        this.FormServiceFEIC.reset({});
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        this.flagFeic = true;
        await this.ngOnInit();
        /* this.patchFormFromLocalStorage("FormFEICGeneral");
        this.patchFormFromLocalStorage("FormFEIC") */
        //this.ChangeForm("7");
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }

  async SaveAndContinue_holding() {
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: { btn_1: 1 },
      })
      .toPromise()
      .then(async (res) => {
        this.spinner.show();
        //console.log("res", res);
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        //this.ChangeForm("7");
      });
    await this.ngOnInit();
  }
  async SaveAndContinue_country_operations() {

    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    const country_operation = this.FormCountryOperations.value.country_operation;
    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: { btn_country_operation: country_operation },
      })
      .toPromise()
      .then(async (res) => {
        this.spinner.show()
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
        }
        if (country_operation == 0 || country_operation == -1) {
          this.FormCountryOperations.controls["year_sales"].disable();
          this.FormCountryOperations.controls["country"].disable();
        } else if (country_operation == 1) {
          this.FormCountryOperations.controls["year_sales"].enable();
          this.FormCountryOperations.controls["country"].enable();
        }
      })
    await this.ngOnInit();
  }
  async SaveAndContinue_loans() {
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    const conti = this.FormBankLoans.value.contain;
    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: { btn_2: conti },
      })
      .toPromise()
      .then(async (res) => {
        this.spinner.show();
        //console.log("res", res);
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          // console.log("new data", newdata);
        }
        if (conti == 0) {
          this.FormBankLoans.controls["bank"].disable();
          this.FormBankLoans.controls["loan_number"].disable();
          this.FormBankLoans.controls["warranty"].disable();
          this.FormBankLoans.controls["amount_awarded"].disable();
          this.FormBankLoans.controls["time"].disable();
          this.FormBankLoans.controls["balance"].disable();
          //this.ChangeForm("9");
        } else if (conti == 1) {
          this.FormBankLoans.controls["bank"].enable();
          this.FormBankLoans.controls["loan_number"].enable();
          this.FormBankLoans.controls["warranty"].enable();
          this.FormBankLoans.controls["amount_awarded"].enable();
          this.FormBankLoans.controls["time"].enable();
          this.FormBankLoans.controls["balance"].enable();
        }
      });
    await this.ngOnInit();
  }
  async SaveAndContinue_factoring() {
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    const contain = this.FormFactoring.value.contain;
    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: { btn_3: contain },
      })
      .toPromise()
      .then(async (res) => {
        this.spinner.show();
        //console.log("res", res);
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        if (contain == 0 || contain == -1) {
          this.FormFactoring.controls["entity"].disable();
          this.FormFactoring.controls["warranty"].disable();
          this.FormFactoring.controls["amount_awarded"].disable();
          this.FormFactoring.controls["amount_used"].disable();
          this.FormFactoring.controls["balance"].disable();
          //this.ChangeForm("10");
        } else if (contain == 1) {
          this.FormFactoring.controls["entity"].enable();
          this.FormFactoring.controls["warranty"].enable();
          this.FormFactoring.controls["amount_awarded"].enable();
          this.FormFactoring.controls["amount_used"].enable();
          this.FormFactoring.controls["balance"].enable();
        }
      });
    await this.ngOnInit();
  }
  async SaveAndContinue_Insuraces(e) {
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));

    console.log(e);
    const contain = parseInt(e.target.value);
    console.log('EVENT saveCOnitunue INSURANCE:: ', contain);
    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: { btn_insurance: contain },
      })
      .toPromise()
      .then(async (res) => {
        this.spinner.show();
        //console.log("res", res);
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        
        if (contain == 0) {
          this.ChangeForm("6");
        }
      });
    await this.ngOnInit();
  }
  saveFEICTemp() {
    console.log(this.FormFEIC.errors)

    this.spinner.show();
    let dataGeneral = this.FormFEICGeneral.value;
    dataGeneral = {
      ...dataGeneral,
      feic_country: this.selecionCountry5,
      feic_dep: this.selecionDepartment5ID && this.selecionDepartment5ID != null ? this.optionsDepartments.find(dep => dep.id == this.selecionDepartment5ID).name : null,
      feic_muni: this.selecionMunicipality5ID && this.selecionMunicipality5ID != null ? this.optionsMunicipalities.find(muni => muni.id == this.selecionMunicipality5ID).name : null,
    };
    this.FormFEIC.value.feic_pep_wealth_origin = JSON.stringify(
      this.formRichpep.value.isArray
    );
    this.FormFEIC.value.feic_source_income = JSON.stringify(
      this.formSourceIncome.value.isArray
    );
    console.log(this.FormFEIC.value.feic_pep_wealth_origin);
    console.log(this.FormFEIC.value.feic_source_income);
    dataGeneral = { ...dataGeneral, ...this.FormFEIC.value }
    dataGeneral.feic_dep_birth = this.selecionDepartment10ID && this.selecionDepartment10ID != null ? this.getDepName(this.selecionDepartment10ID) : null;
    //dataGeneral.feic_dep_birth = this.optionsDepartments.find(dep => dep.id == this.selecionDepartment10ID).name;
    dataGeneral.feic_muni_birth = this.selecionMunicipality10ID && this.selecionMunicipality10ID != null ? this.getMuniName(this.selecionMunicipality10ID) : null;
    //dataGeneral.feic_muni_birth = this.optionsMunicipalities.find(muni => muni.id == this.selecionMunicipality10ID).name;
    dataGeneral.feic_address_dep = this.selecionDepartment6ID && this.selecionDepartment6ID != null ? this.getDepName(this.selecionDepartment6ID) : null;
    //dataGeneral.feic_address_dep = this.optionsDepartments.find(dep => dep.id == this.selecionDepartment6ID).name;
    dataGeneral.feic_address_mun = this.selecionMunicipality6ID && this.selecionMunicipality6ID != null ? this.getMuniName(this.selecionMunicipality6ID) : null;
    //dataGeneral.feic_address_mun = this.optionsMunicipalities.find(muni => muni.id == this.selecionMunicipality6ID).name;
    dataGeneral.feic_iddoc_emision_dep = this.selecionDepartment11ID && this.selecionDepartment11ID != null ? this.getDepName(this.selecionDepartment11ID) : null;
    dataGeneral.feic_iddoc_emision_mun = this.selecionMunicipality11ID && this.selecionMunicipality11ID != null ? this.getMuniName(this.selecionMunicipality11ID) : null;

    dataGeneral.feic_eco_owncomp_dep = this.selecionDepartment8ID && this.selecionDepartment8ID != null ? this.getDepName(this.selecionDepartment8ID) : null;
    dataGeneral.feic_eco_owncomp_mun = this.selecionMunicipality8ID && this.selecionMunicipality8ID != null ? this.getMuniName(this.selecionMunicipality8ID) : null;

    dataGeneral.feic_eco_company_dep = this.selecionDepartment7ID && this.selecionDepartment7ID != null ? this.getDepName(this.selecionDepartment7ID) : null;
    dataGeneral.feic_eco_company_mun = this.selecionMunicipality7ID && this.selecionMunicipality7ID != null ? this.getMuniName(this.selecionMunicipality7ID) : null;
    dataGeneral.feicp_iddoc_emision_dep = this.selecionDepartment99ID && this.selecionDepartment99ID != null ? this.getDepName(this.selecionDepartment99ID) : null;


    dataGeneral.feic_eco_other_profesional_activity_status = this.OtherIncomecheckboxes[0].status ? 1 : 0;
    dataGeneral.feic_eco_other_alimony_status = this.OtherIncomecheckboxes[1].status ? 1 : 0;
    dataGeneral.feic_eco_other_rent_status = this.OtherIncomecheckboxes[2].status ? 1 : 0;
    dataGeneral.feic_eco_other_retirement_status = this.OtherIncomecheckboxes[3].status ? 1 : 0;
    dataGeneral.feic_eco_other_income_status = this.OtherIncomecheckboxes[4].status ? 1 : 0;
    console.log("this.feic_income_source");
    console.log(this.feic_income_source);

    dataGeneral.feic_client_economic_info = JSON.stringify(this.feic_income_source.filter(f => f.sector != null && f.amount != null).map(f => ({ sector: f.sector, amount: f.amount })))






    console.log("dataGeneral.feic_address_dep::" + dataGeneral.feic_address_dep);
    console.log("dataGeneral.feic_address_mun::" + dataGeneral.feic_address_mun);
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    this.mysqlService.CreateGeneralDataFEIC({
      request_id: datalocal.request_id,
      form_id: datalocal.form_id,
      rsdet_id: datalocal.metadata.rsdet_id,
      form: dataGeneral
    })
      .pipe(map((res) => {

        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        console.log(res.data);
        console.log("newFormID:: ", res.data.form_id);
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          this.FormFEIC.reset()
          this.FormFEICGeneral.reset()
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }

        this.ngOnInit();


      }),
        catchError((err) => {

          console.log(err);
          this.spinner.hide();
          return of();
        })
      ).subscribe();
  }

  async SaveDebtors() {
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    let data = this.FormDebtors.value;
    let iddeb = parseInt(data.deb_social_reason);
    let debName = this.dataDeudores.find(d => d.id_debtor == iddeb).business_name;
    data = { ...data, deb_social_reason: debName };
    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: data,
      })
      .toPromise()
      .then(async (res) => {
        //console.log("res", res);
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          // console.log("new data", newdata);
        }
        this.ChangeForm("7")
        await this.ngOnInit();
        //this.accordion.toggle("static-18");
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }

  async SaveMinute() {
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: this.FormMinute.value,
      })
      .toPromise()
      .then(async (res) => {
        //console.log("res", res);
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        await this.ngOnInit();
        //this.accordion.toggle("static-18");
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }


  async SaveFinancialInformation() {
    //console.log("data1", JSON.stringify(this.formcheckbox.value.isArray));
    /*console.log(
      "data2",
      JSON.stringify(this.formcheckboxexpenses.value.isArray)
    );*/
    this.FormFinancialInformation.value.income_currency_type = JSON.stringify(
      this.formcheckbox.value.isArray
    );
    this.FormFinancialInformation.value.expenses_currency_type = JSON.stringify(
      this.formcheckboxexpenses.value.isArray
    );
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: this.FormFinancialInformation.value,
      })
      .toPromise()
      .then(async (res) => {
        //console.log("res", res);
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        await this.ngOnInit();
        //this.ChangeForm("32");
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }

  async SaveOriginMoney() {
    this.spinner.show()
    this.FormRepresentativeData.value.rep_individual_pep_type = JSON.stringify(
      this.formoriginmoney.value.isArray
    );
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    let data = this.FormRepresentativeData.value;
    if (this.selecionDepartment12ID == -1) {
      data.rep_id_emission_dep = this.selecionDepartment3ID ? this.getDepName(this.selecionDepartment3ID) : null;
      data.rep_id_emission_muni = this.selecionMunicipality3ID ? this.getMuniName(this.selecionMunicipality3ID) : null;
    } else {
      data.rep_id_emission_dep = this.selecionDepartment12ID ? this.getDepName(this.selecionDepartment12ID) : null;
      data.rep_id_emission_muni = this.selecionMunicipality12ID ? this.getMuniName(this.selecionMunicipality12ID) : null;
    }
    if (this.selecionDepartment13ID == -1) {
      data.rep_dep = this.selecionDepartment4ID ? this.getDepName(this.selecionDepartment4ID) : null;
      data.rep_muni = this.selecionMunicipality4ID ? this.getMuniName(this.selecionMunicipality4ID) : null;
    } else {
      data.rep_dep = this.selecionDepartment13ID ? this.getDepName(this.selecionDepartment13ID) : null;
      data.rep_muni = this.selecionMunicipality13ID ? this.getMuniName(this.selecionMunicipality13ID) : null;
    }


    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: data,
      })
      .toPromise()
      .then(async (res) => {
        //console.log("res", res);
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        await this.ngOnInit();
        //this.accordion.toggle("static-18");
        this.ChangeForm('3');
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }
  async saveClientsAndProviders() {
    await this.ngOnInit()
    this.ChangeForm('4')
  }


  async SaveOriginMoneyContinueLater() {
    this.FormRepresentativeData.value.rep_individual_pep_type = JSON.stringify(
      this.formoriginmoney.value.isArray
    );
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: this.FormRepresentativeData.value,
      })
      .toPromise()
      .then(async (res) => {
        //console.log("res", res);
        this.toastr.success(
          "Se guardo la información.",
          "Información guardad!"
        );
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        await this.ngOnInit();
        //this.accordion.toggle("static-18");
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }
  async SaveProductService() {
    this.FormProductService.value.prod_serv_source_found = JSON.stringify(
      this.formSourceFound.value.isArray
    );
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: this.FormProductService.value,
      })
      .toPromise()
      .then(async (res) => {
        //console.log("res", res);
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        await this.ngOnInit();
        this.ChangeForm("8")
        //this.accordion.toggle("static-18");
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }
  async SaveCPE() {
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    let data = this.FormCPE.value;
    delete (data.fec_is_cpe);
    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: data,
      })
      .toPromise()
      .then(async (res) => {
        //console.log("res", res);
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        await this.ngOnInit();
        //this.accordion.toggle("static-18");
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }

  async SaveCPEData() {
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    const datacpe = {
      cpe_institutions: this.FormCPEData.value.cpe_institutions,
      cpe_services: this.FormCPEData.value.cpe_services,
      cpe_category_services: this.FormCPEData.value.cpe_category_services,
    };

    if (this.cpe_data_array == null) {
      this.cpe_data_array = [];
    }
    this.cpe_data_array.push(datacpe);
    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: { cpe_data: JSON.stringify(this.cpe_data_array) },
      })
      .toPromise()
      .then(async (res) => {
        //console.log("res", res);
        this.FormCPEData.reset({});
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        await this.ngOnInit();
        //this.accordion.toggle("static-18");
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }
  async SaveMember() {
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    let arrayinfo = [];
    arrayinfo.push(this.FormMembers.value);
    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: { members: arrayinfo },
      })
      .toPromise()
      .then(async (res) => {
        this.FormMembers.reset({});
        //console.log("res", res);
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        await this.ngOnInit();
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }
  async SaveFinancials() {
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    let arrayinfo = [];
    arrayinfo.push(this.FormFinancials.value);
    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: { financials: arrayinfo },
      })
      .toPromise()
      .then(async (res) => {
        this.FormFinancials.reset({});
        //console.log("res", res);
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        await this.ngOnInit();
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }
  async SaveComercialCompany() {
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    let arrayinfo = [];
    arrayinfo.push(this.FormComercialCompany.value);
    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: { comercial_companys: arrayinfo },
      })
      .toPromise()
      .then(async (res) => {
        this.FormComercialCompany.reset({});
        //console.log("res", res);
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        await this.ngOnInit();
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }
  async SaveHeadOffice() {
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    let data = this.FormHeadOffice.value;
    data.department_site = this.selecionDepartment2ID ? this.getDepName(this.selecionDepartment2ID) : null;
    data.muni_site = this.selecionMunicipality2ID ? this.getMuniName(this.selecionMunicipality2ID) : null;

    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: data,
      })
      .toPromise()
      .then(async (res) => {
        //console.log("res", res);
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        await this.ngOnInit();
        //this.ChangeForm("28");
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }
  async SaveRecord() {
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: this.FormRecord.value,
      })
      .toPromise()
      .then(async (res) => {
        //console.log("res", res);
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        await this.ngOnInit();
        //this.ChangeForm("27");
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }
  async SaveObligated() {
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: this.Formobligatedperson.value,
      })
      .toPromise()
      .then(async (res) => {
        //console.log("res", res);
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        await this.ngOnInit();
        //this.ChangeForm("20");
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }

  async SaveRequestEntity() {
    this.spinner.show()
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: this.FormRequestEntity.value,
      })
      .toPromise()
      .then(async (res) => {
        //console.log("res", res);
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        await this.ngOnInit();
        //this.ChangeForm("21");
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
        this.spinner.hide()
      });
  }

  async SavePublicConstitution() {
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: this.FormPublicConstitution.value,
      })
      .toPromise()
      .then(async (res) => {
        //console.log("res", res);

        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          // console.log("new data", newdata);
        }
        await this.ngOnInit();
        //this.ChangeForm("22");
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }

  async SaveModPublicConstitution() {
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: this.FormModPublicConstitution.value,
      })
      .toPromise()
      .then(async (res) => {
        //console.log("res", res);
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        await this.ngOnInit();
        //this.ChangeForm("23");
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }

  async SaveSocietyPatent() {
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: this.FormSocietyPatent.value,
      })
      .toPromise()
      .then(async (res) => {
        //console.log("res", res);
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        await this.ngOnInit();
        //this.ChangeForm("24");
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }

  async SaveCompanyPatent() {
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: this.FormCompanyPatent.value,
      })
      .toPromise()
      .then(async (res) => {
        //console.log("res", res);
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        await this.ngOnInit();
        //this.ChangeForm("25");
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }

  async SaveGovernmental() {
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: this.FormGovernmental.value,
      })
      .toPromise()
      .then(async (res) => {
        //console.log("res", res);
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        await this.ngOnInit();
        //this.ChangeForm("26");
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }
  async SaveCompanys() {
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    let arrayinfo = [];
    arrayinfo.push(this.FormCompanys.value);

    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: { companys: arrayinfo },
      })
      .toPromise()
      .then(async (res) => {
        //console.log("res", res);
        this.FormCompanys.reset({});
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        await this.ngOnInit();
        //this.ChangeForm("7");
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }

  async UpdateCompanys() {
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    let arrayinfo = [];
    this.FormUpdateCompanys.value.company_id = this.CurrentCompanies;
    arrayinfo.push(this.FormUpdateCompanys.value);
    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: { companys: arrayinfo },
      })
      .toPromise()
      .then(async (res) => {
        //console.log("res", res);
        //this.FormUpdateCompanys.reset({});
        this.modalService.dismissAll();
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        await this.ngOnInit();
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }

  async SaveInsurances() {
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    let arrayinfo = [];
    arrayinfo.push(this.FormInsurances.value);
    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: { insurances: arrayinfo },
      })
      .toPromise()
      .then(async (res) => {
        //console.log("res", res);
        this.FormInsurances.reset({});
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        await this.ngOnInit();
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }

  async SaveOperativeStructure() {
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    let bodydata = {};
    if (this.FormOperativeStructure.value.type == "1") {
      // gerente general
      bodydata = {
        ceo_name: this.FormOperativeStructure.value.name,
        ceo_time: this.FormOperativeStructure.value.time,
      };
    } else if (this.FormOperativeStructure.value.type == "2") {
      // gerente financiero
      bodydata = {
        finance_ceo_name: this.FormOperativeStructure.value.name,
        finance_ceo_time: this.FormOperativeStructure.value.time,
      };
    } else if (this.FormOperativeStructure.value.type == "3") {
      // gerente RRHH
      bodydata = {
        rh_ceo_name: this.FormOperativeStructure.value.name,
        rh_ceo_time: this.FormOperativeStructure.value.time,
      };
    } else if (this.FormOperativeStructure.value.type == "4") {
      // gerente Operaciones
      bodydata = {
        op_ceo_name: this.FormOperativeStructure.value.name,
        op_ceo_time: this.FormOperativeStructure.value.time,
      };
    } else if (this.FormOperativeStructure.value.type == "5") {
      // gerente Ventas
      bodydata = {
        sales_ceo_name: this.FormOperativeStructure.value.name,
        sales_ceo_time: this.FormOperativeStructure.value.time,
      };
    } else if (this.FormOperativeStructure.value.type == "6") {
      // gerente Creditos

      bodydata = {
        credit_ceo_name: this.FormOperativeStructure.value.name,
        credit_ceo_time: this.FormOperativeStructure.value.time,
      };
    } else if (this.FormOperativeStructure.value.type == "7") {
      // gerente Produción
      bodydata = {
        prod_ceo_name: this.FormOperativeStructure.value.name,
        prod_ceo_time: this.FormOperativeStructure.value.time,
      };
    }
    let arrayinfo = [];
    //arrayinfo.push(bodydata);
    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: bodydata,
      })
      .toPromise()
      .then(async (res) => {
        this.FormOperativeStructure.reset({});
        //console.log("res", res);
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        await this.ngOnInit();
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }


  async SaveProductServices() {
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: this.FormProductServices.value,
      })
      .toPromise()
      .then(async (res) => {
        //console.log("res", res);
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        await this.ngOnInit();
        //this.ChangeForm("15");
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }

  async SaveMarketsegment() {
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: this.FormMarketSegment.value,
      })
      .toPromise()
      .then(async (res) => {
        //console.log("res", res);
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        await this.ngOnInit();
        //this.ChangeForm("16");
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }

  async SaveSales() {
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    let data = this.FormSales.value;
    data.credit_sales = this.FormSales.controls.credit_sales.value;
    data.exports_sales = this.FormSales.controls.exports_sales.value;
    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: this.FormSales.value,
      })
      .toPromise()
      .then(async (res) => {
        //console.log("res", res);
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        await this.ngOnInit();
        //this.ChangeForm("17");
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }

  async SavePurchases() {
    //console.log('antes',this.FormPurchases.value );
    this.FormPurchases.value.credit_purchases =
      100 - this.FormPurchases.value.cash_purchases;
    this.FormPurchases.value.exports_purchases =
      100 - this.FormPurchases.value.local_purchases;
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: this.FormPurchases.value,
      })
      .toPromise()
      .then(async (res) => {
        console.log("despues", res);
        //console.log("res", res);
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        await this.ngOnInit();
        this.ChangeForm("5");
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }

  async SaveCountryOperations() {
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    let arrayinfo = [];
    arrayinfo.push(this.FormCountryOperations.value);
    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: { country_operations: arrayinfo },
      })
      .toPromise()
      .then(async (res) => {
        this.FormCountryOperations.reset({});
        //console.log("res", res);
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        await this.ngOnInit();
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }
  async SaveDirectors() {
    this.spinner.show()
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    let arrayinfo = [];
    const dataholding = this.FormDirectors.value.holding;
    delete this.FormDirectors.value.holding;
    arrayinfo.push(this.FormDirectors.value);
    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: { directors: arrayinfo, holding: dataholding },
      })
      .toPromise()
      .then(async (res) => {
        this.FormDirectors.reset({});
        //console.log("res", res);
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        await this.ngOnInit();
        //this.ChangeForm("6");
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
        this.spinner.hide()
      });
  }
  onChange(value) {
    if (value == 'Especifique') {
      this.FormCustomer.controls['especific_pay_form'].enable()
    } else {
      this.FormCustomer.controls['especific_pay_form'].disable()
    }
  }
  onChange2(value) {
    if (value == 'Especifique') {
      this.FormUpdateCustomer.controls['especific_pay_form'].enable()
    } else {
      this.FormUpdateCustomer.controls['especific_pay_form'].disable()
    }
  }
  async SaveCustomer() {
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    let arrayinfo = [];
    let data = this.FormCustomer.value
    if (data.pay_form == 'Especifique') {
      data.pay_form = data.especific_pay_form
    }
    arrayinfo.push(data);
    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: { clients: arrayinfo },
      })
      .toPromise()
      .then(async (res) => {
        //this.FormCustomer.reset({});
        //console.log("res", arrayinfo);
        this.FormCustomer.reset({});
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        await this.ngOnInit();
        //this.ChangeForm("12");
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }
  async SaveSuppliers() {
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    let arrayinfo = [];
    arrayinfo.push(this.Formsuppliers.value);
    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: { suppliers: arrayinfo },
      })
      .toPromise()
      .then(async (res) => {
        this.Formsuppliers.reset({});
        //console.log("res", res);
        this.Formsuppliers.reset({});
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          // console.log("new data", newdata);
        }
        await this.ngOnInit();
        //this.ChangeForm("11");
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }
  async SaveFactoring() {
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    let arrayinfo = [];
    arrayinfo.push(this.FormFactoring.value);
    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: { factorings: arrayinfo },
      })
      .toPromise()
      .then(async (res) => {
        this.FormFactoring.reset({});
        //console.log("res", res);
        this.FormFactoring.reset({});
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        await this.ngOnInit();
        //this.ChangeForm("10");
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }
  async SaveBankLoans() {
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    let arrayinfo = [];
    arrayinfo.push(this.FormBankLoans.value);
    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: { bank_loans: arrayinfo },
      })
      .toPromise()
      .then(async (res) => {
        this.FormBankLoans.reset({});
        //console.log("res", res);
        this.FormBankLoans.reset({});
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        await this.ngOnInit();
        //this.ChangeForm("9");
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }
  async SaveBankAccount() {
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    let arrayinfo = [];
    arrayinfo.push(this.FormBankAcount.value);
    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: { bank_accounts: arrayinfo },
      })
      .toPromise()
      .then(async (res) => {
        this.FormBankAcount.reset({});
        //console.log("res", res);
        this.FormBankAcount.reset({});
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        await this.ngOnInit();
        //this.ChangeForm("8");
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }
  async SaveRequestdoc() {
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    localStorage.setItem("doc_request_name", this.Form_request_doc && this.Form_request_doc.controls.doc_request_name.value ? this.Form_request_doc.controls.doc_request_name.value : "");
    localStorage.setItem("doc_request_email", this.Form_request_doc && this.Form_request_doc.controls.doc_request_email.value ? this.Form_request_doc.controls.doc_request_email.value : "");
    localStorage.setItem("doc_request_phone", this.Form_request_doc && this.Form_request_doc.controls.doc_request_phone.value ? this.Form_request_doc.controls.doc_request_phone.value : "");
    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: this.Form_request_doc.value,
      })
      .toPromise()
      .then(async (res) => {
        //console.log("res", res);
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        let data = {
          form_id: datalocal.form_id,
          name: 'Contacto para dar seguimiento a cobros'
        }
        this.updateFormSection(data)
        await this.ngOnInit();
        //this.ChangeForm("1");
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }

  updateFormSection(data) {
    let sub = this._FSService.updateCA(data).toPromise().then(
      (response) => {
        console.log(response);
        this.ngOnInit();
      }
    ).catch((error) => {
      console.log(error);
    })
    return sub
  }

  async SaveChargues() {

    localStorage.setItem("chargues_request_name", this.Form_chargues && this.Form_chargues.controls.charges_request_name.value ? this.Form_chargues.controls.charges_request_name.value : "");
    localStorage.setItem("chargues_request_email", this.Form_chargues && this.Form_chargues.controls.charges_request_email.value ? this.Form_chargues.controls.charges_request_email.value : "");
    localStorage.setItem("chargues_request_phone", this.Form_chargues && this.Form_chargues.controls.charges_request_phone.value ? this.Form_chargues.controls.charges_request_phone.value : "");
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: this.Form_chargues.value,
      })
      .toPromise()
      .then(async (res) => {
        //console.log("res", res);
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");

        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;

          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));

          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        let data = {
          form_id: datalocal.form_id,
          name: 'Contacto para solicitar documentación para el expediente'
        }
        this.updateFormSection(data)
        await this.ngOnInit();
        //this.ChangeForm("3");
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }
  async SaveTrackRecordAndSales() {
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: this.Form_track_record_and_sales.value,
      })
      .toPromise()
      .then(async (res) => {
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        await this.ngOnInit();

      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }
  async SaveOtherData2() {
    console.log("SaveOtherData");
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    let sysFormID = {
      1: '4',
      26: '4',
      60: '4',
      69: '4',
      77: '4',
      91: '6',
      111: '6',
      141: '6',
      150: '6',
      157: '6'


    }
    console.log(datalocal);
    let formSolicitud = datalocal.metadata.forms.filter(f => sysFormID[f.sys_form_id] ? true : false).map(f => sysFormID[f.sys_form_id])[0];
    console.log("formSolicitud", formSolicitud);
    let changeVar = this.Form_other_data_contact.value

    changeVar.rep_id_emission_muni = this.optionsMunicipalities.find(item => item.id == changeVar.rep_id_emission_muni)?.name
    changeVar.rep_id_emission_dep = this.optionsDepartments.find(item => item.id == changeVar.rep_id_emission_dep)?.name
    changeVar.rep_dep = this.optionsDepartments.find(item => item.id == changeVar.rep_dep)?.name
    changeVar.rep_muni = this.optionsMunicipalities.find(item => item.id == changeVar.rep_muni)?.name

    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: changeVar,
      })
      .toPromise()
      .then(async (res) => {
        //console.log("res", res);
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        let data = {
          form_id: datalocal.form_id,
          name: 'Contacto para el envío de facturas'
        }
        this.updateFormSection(data)
        let data1 = {
          form_id: datalocal.form_id,
          name: 'Contacto del Contador/Financiero de la empresa'
        }
        this.updateFormSection(data1)
        let data2 = {
          form_id: datalocal.form_id,
          name: 'Contacto para solicitar retenciones'
        }
        this.updateFormSection(data2)
        await this.ngOnInit();
        this.ChangeForm("1");

        //this.ChangeForm("2");
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }
  async SaveOtherData3() {
    console.log("SaveOtherData");
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    let sysFormID = {
      1: '4',
      26: '4',
      60: '4',
      69: '4',
      77: '4',
      91: '6',
      111: '6',
      141: '6',
      150: '6',
      157: '6'


    }
    console.log(datalocal);
    let formSolicitud = datalocal.metadata.forms.filter(f => sysFormID[f.sys_form_id] ? true : false).map(f => sysFormID[f.sys_form_id])[0];
    console.log("formSolicitud", formSolicitud);
    let changeVar = this.Form_other_data_contact.value

    changeVar.rep_id_emission_muni = this.optionsMunicipalities.find(item => item.id == changeVar.rep_id_emission_muni)?.name
    changeVar.rep_id_emission_dep = this.optionsDepartments.find(item => item.id == changeVar.rep_id_emission_dep)?.name
    changeVar.rep_dep = this.optionsDepartments.find(item => item.id == changeVar.rep_dep)?.name
    changeVar.rep_muni = this.optionsMunicipalities.find(item => item.id == changeVar.rep_muni)?.name

    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: changeVar,
      })
      .toPromise()
      .then(async (res) => {
        //console.log("res", res);
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        let data = {
          form_id: datalocal.form_id,
          name: 'Contacto del Contador/Financiero de la empresa'
        }
        this.updateFormSection(data)
        await this.ngOnInit();
        this.ChangeForm("1");

        //this.ChangeForm("2");
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }

  async SaveOtherData() {
    console.log("SaveOtherData");
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    let sysFormID = {
      1: '4',
      26: '4',
      60: '4',
      69: '4',
      77: '4',
      91: '6',
      111: '6',
      141: '6',
      150: '6',
      157: '6'


    }
    console.log(datalocal);
    let formSolicitud = datalocal.metadata.forms.filter(f => sysFormID[f.sys_form_id] ? true : false).map(f => sysFormID[f.sys_form_id])[0];
    console.log("formSolicitud", formSolicitud);
    let changeVar = this.Form_other_data.value

    changeVar.rep_id_emission_muni = this.optionsMunicipalities.find(item => item.id == changeVar.rep_id_emission_muni)?.name
    changeVar.rep_id_emission_dep = this.optionsDepartments.find(item => item.id == changeVar.rep_id_emission_dep)?.name
    changeVar.rep_dep = this.optionsDepartments.find(item => item.id == changeVar.rep_dep)?.name
    changeVar.rep_muni = this.optionsMunicipalities.find(item => item.id == changeVar.rep_muni)?.name

    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: changeVar,
      })
      .toPromise()
      .then(async (res) => {
        //console.log("res", res);
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        await this.ngOnInit();


        this.ChangeForm("2");
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }

  async SaveAssociates() {
    this.spinner.show()
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    let arrayinfo = [];
    arrayinfo.push(this.FormPartners.value);
    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: { associates: arrayinfo },
      })
      .toPromise()
      .then(async (res) => {
        this.FormPartners.reset({});
        //console.log("res", res);
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        await this.ngOnInit();
        //this.ChangeForm("5");
      })
      .catch((err) => {
        //console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }




  //#endregion SAVEMETHODS
  //ENDSAVEMETHODS


  //UPDATEMETHODS
  //#region UPDATEREGION
  async UpdateAssociates() {
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    let arrayinfo = [];
    this.FormUpdatePartners.value.associate_id = this.CurrentAssociate;
    arrayinfo.push(this.FormUpdatePartners.value);
    //console.log("data array", this.FormUpdatePartners.value);
    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: { associates: arrayinfo },
      })
      .toPromise()
      .then(async (res) => {
        this.modalService.dismissAll();
        //console.log("res", res);
        this.toastr.success(
          "La información fue actualizada.",
          "Actualización de Socio!"
        );
        this.FormUpdatePartners.reset({});
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        await this.ngOnInit();
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }
  async UpdateBankAccount() {
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    let arrayinfo = [];
    this.FormUpdateBankAcount.value.account_id = this.CurrentBankAccount;
    arrayinfo.push(this.FormUpdateBankAcount.value);
    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: { bank_accounts: arrayinfo },
      })
      .toPromise()
      .then(async (res) => {
        this.modalService.dismissAll();
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        await this.ngOnInit();
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }

  async UpdateBankLoans() {
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    let arrayinfo = [];
    this.FormUpdateBankLoans.value.loan_id = this.CurrentBankLoans;
    arrayinfo.push(this.FormUpdateBankLoans.value);
    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: { bank_loans: arrayinfo },
      })
      .toPromise()
      .then(async (res) => {
        this.modalService.dismissAll();
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        await this.ngOnInit();
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }
  async UpdateFactoring() {
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    let arrayinfo = [];
    this.FormUpdateFactoring.value.factoring_id = this.CurrentFactoring;
    arrayinfo.push(this.FormUpdateFactoring.value);
    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: { factorings: arrayinfo },
      })
      .toPromise()
      .then(async (res) => {
        this.modalService.dismissAll();
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        await this.ngOnInit();
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }
  async UpdateSuppliers() {
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    let arrayinfo = [];
    this.FormUpdatesuppliers.value.supplier_id = this.CurrentSupplier;
    arrayinfo.push(this.FormUpdatesuppliers.value);
    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: { suppliers: arrayinfo },
      })
      .toPromise()
      .then(async (res) => {
        this.modalService.dismissAll();
        this.toastr.success("Se Actualizó la Información.", "Cliente Actualizado!");
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        await this.ngOnInit();
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }
  async UpdateCustomer() {
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    let arrayinfo = [];
    this.FormUpdateCustomer.value.client_id = this.CurrentCustomer;
    let data = this.FormUpdateCustomer.value
    if (data.pay_form == 'Especifique') {
      data.pay_form = data.especific_pay_form
    }
    arrayinfo.push(data);
    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: { clients: arrayinfo },
      })
      .toPromise()
      .then(async (res) => {
        this.FormCustomer.reset({});
        //console.log("res", res);
        this.FormCustomer.reset({});
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        await this.ngOnInit();
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }
  async UpdateDirectors() {
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    let arrayinfo = [];
    this.FormUpdateDirectors.value.director_id = this.CurrentDirectors;
    arrayinfo.push(this.FormUpdateDirectors.value);
    console.log("data array", this.FormUpdateDirectors.value);
    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: { directors: arrayinfo },
      })
      .toPromise()
      .then(async (res) => {
        this.modalService.dismissAll();
        //console.log("res", res);
        this.toastr.success(
          "La información fue actualizada.",
          "Actualización de Socio!"
        );
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        await this.ngOnInit();
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }
  async UpdateCountryOperations() {
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    let arrayinfo = [];
    this.FormUpdateCountryOperations.value.country_operation_id = this.CurrentCountryOperation;
    arrayinfo.push(this.FormUpdateCountryOperations.value);
    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: { country_operations: arrayinfo },
      })
      .toPromise()
      .then(async (res) => {
        this.modalService.dismissAll();
        //console.log("res", res);
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        await this.ngOnInit();
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }

  async UpdateComercialCompany() {
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    let arrayinfo = [];
    this.FormUpdateComercialCompany.value.comercial_company_id = this.CurrentComercialCompany;
    arrayinfo.push(this.FormUpdateComercialCompany.value);
    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: { comercial_companys: arrayinfo },
      })
      .toPromise()
      .then(async (res) => {
        this.modalService.dismissAll();
        //console.log("res", res);
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        await this.ngOnInit();
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }
  async UpdateFinancials() {
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    let arrayinfo = [];
    this.FormUpdateFinancials.value.financial_id = this.CurrentFinancials;
    arrayinfo.push(this.FormUpdateFinancials.value);
    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: { financials: arrayinfo },
      })
      .toPromise()
      .then(async (res) => {
        this.modalService.dismissAll();
        //console.log("res", res);
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        await this.ngOnInit();
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }
  async UpdateMember() {
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    let arrayinfo = [];
    this.FormUpdateMembers.value.member_id = this.CurrentMember;
    arrayinfo.push(this.FormUpdateMembers.value);
    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: { members: arrayinfo },
      })
      .toPromise()
      .then(async (res) => {
        this.modalService.dismissAll();
        //console.log("res", res);
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        await this.ngOnInit();
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }
  async UpdateCPEData() {
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    this.cpe_data_array[this.indexCPE] = {
      cpe_institutions: this.FormUpdateCPEData.value.cpe_institutions,
      cpe_services: this.FormUpdateCPEData.value.cpe_services,
      cpe_category_services: this.FormUpdateCPEData.value.cpe_category_services,
    };
    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: { cpe_data: JSON.stringify(this.cpe_data_array) },
      })
      .toPromise()
      .then(async (res) => {
        //console.log("res", res);
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        await this.ngOnInit();
        //this.accordion.toggle("static-18");
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }
  async UpdateFaPep() {
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    let arrayinfo = [];
    this.FormUpdateFaPep.value.feic_fa_id = this.CurrentFapep;
    arrayinfo.push(this.FormUpdateFaPep.value);
    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: { fa_pep: arrayinfo },
      })
      .toPromise()
      .then(async (res) => {
        //console.log("res", res);
        //this.FormUpdateCompanys.reset({});
        this.modalService.dismissAll();
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        await this.ngOnInit();
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }
  async UpdateOperativeStructure() {
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    let bodydata = {};
    if (this.FormUpdateOperativeStructure.value.type == "1") {
      // gerente general
      bodydata = {
        ceo_name: this.FormUpdateOperativeStructure.value.name,
        ceo_time: this.FormUpdateOperativeStructure.value.time,
      };
    } else if (this.FormUpdateOperativeStructure.value.type == "2") {
      // gerente financiero
      bodydata = {
        finance_ceo_name: this.FormUpdateOperativeStructure.value.name,
        finance_ceo_time: this.FormUpdateOperativeStructure.value.time,
      };
    } else if (this.FormUpdateOperativeStructure.value.type == "3") {
      // gerente RRHH
      bodydata = {
        rh_ceo_name: this.FormUpdateOperativeStructure.value.name,
        rh_ceo_time: this.FormUpdateOperativeStructure.value.time,
      };
    } else if (this.FormUpdateOperativeStructure.value.type == "4") {
      // gerente Operaciones
      bodydata = {
        op_ceo_name: this.FormUpdateOperativeStructure.value.name,
        op_ceo_time: this.FormUpdateOperativeStructure.value.time,
      };
    } else if (this.FormUpdateOperativeStructure.value.type == "5") {
      // gerente Ventas
      bodydata = {
        sales_ceo_name: this.FormUpdateOperativeStructure.value.name,
        sales_ceo_time: this.FormUpdateOperativeStructure.value.time,
      };
    } else if (this.FormUpdateOperativeStructure.value.type == "6") {
      // gerente Creditos

      bodydata = {
        credit_ceo_name: this.FormUpdateOperativeStructure.value.name,
        credit_ceo_time: this.FormUpdateOperativeStructure.value.time,
      };
    } else if (this.FormUpdateOperativeStructure.value.type == "7") {
      // gerente Produción
      bodydata = {
        prod_ceo_name: this.FormUpdateOperativeStructure.value.name,
        prod_ceo_time: this.FormUpdateOperativeStructure.value.time,
      };
    }
    let arrayinfo = [];
    //arrayinfo.push(bodydata);
    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: bodydata,
      })
      .toPromise()
      .then(async (res) => {
        this.FormOperativeStructure.reset({});
        //console.log("res", res);
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        await this.ngOnInit();
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }
  async DeleteOperativeStructure(id) {
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    let bodydata = {};
    if (id == "1") {
      // gerente general
      bodydata = {
        ceo_name: "",
        ceo_time: "",
      };
    } else if (id == "2") {
      // gerente financiero
      bodydata = {
        finance_ceo_name: "",
        finance_ceo_time: "",
      };
    } else if (id == "3") {
      // gerente RRHH
      bodydata = {
        rh_ceo_name: "",
        rh_ceo_time: "",
      };
    } else if (id == "4") {
      // gerente Operaciones
      bodydata = {
        op_ceo_name: "",
        op_ceo_time: "",
      };
    } else if (id == "5") {
      // gerente Ventas
      bodydata = {
        sales_ceo_name: "",
        sales_ceo_time: "",
      };
    } else if (id == "6") {
      // gerente Creditos
      bodydata = {
        credit_ceo_name: "",
        credit_ceo_time: "",
      };
    } else if (id == "7") {
      // gerente Produción
      bodydata = {
        prod_ceo_name: "",
        prod_ceo_time: "",
      };
    }
    let arrayinfo = [];
    //arrayinfo.push(bodydata);
    console.log("bodydata", bodydata);
    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: bodydata,
      })
      .toPromise()
      .then(async (res) => {
        console.log("res", res);
        this.toastr.success(
          "Se elimino la información.",
          "Se elimino la información!"
        );
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        await this.ngOnInit();
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }

  DeletedataArray(index, dataarray: []) {
    //console.log('before',dataarray)
    dataarray.splice(index, 1);
    //console.log('after', dataarray)
    this.UpdateCPEData()
  }
  //#endregion UPDATEMETHODS

  openModalCustomer(targetModal, index, id) {

    this.CurrentCustomer = id;
    this.indexCustomer = index;
    this.FormUpdateCustomer.patchValue({
      name: this.dataCustomer[index].name,
      monthly_average: this.dataCustomer[index].monthly_average,
      credit_days: this.dataCustomer[index].credit_days,
      pay_form: this.dataCustomer[index].pay_form,
      relation_time: this.dataCustomer[index].relation_time,
      product_service: this.dataCustomer[index].product_service,
      contact: this.dataCustomer[index].contact,
      phone: this.dataCustomer[index].phone,
      country: this.dataCustomer[index].country,
    });
    let find = this.dataPayForm.find(item => item.payment_name.toLowerCase() == this.dataCustomer[index].pay_form.toLowerCase())
    if (!find) {
      this.FormUpdateCustomer.controls['pay_form'].setValue('Especifique')
      this.FormUpdateCustomer.controls['especific_pay_form'].setValue(this.dataCustomer[index].pay_form)
    } else {
      this.FormUpdateCustomer.controls['pay_form'].setValue(find.pay_form)
    }


    this.modalService.open(targetModal, {

      centered: true,
      backdrop: "static",
      keyboard: false,
      windowClass: 'my-modal',
      size: "xl",
    });
  }



  openModalSupplier(targetModal, index, id) {
    this.CurrentSupplier = id;
    this.indexSupplier = index;
    this.FormUpdatesuppliers.patchValue({
      name: this.dataSupplier[index].name,
      average_monthly_purchase: this.dataSupplier[index]
        .average_monthly_purchase,
      max_credit: this.dataSupplier[index].max_credit,
      country: this.dataSupplier[index].country,
      contact: this.dataSupplier[index].contact,
      phone: this.dataSupplier[index].phone,
    });

    this.modalService.open(targetModal, {
      centered: true,
      backdrop: "static",
      keyboard: false,
      windowClass: 'my-modal',
      size: "xl",
    });
  }

  openModalBankAccount(targetmodal, index, id) {
    this.CurrentBankAccount = id
    this.indexBankAccount = index
    this.FormUpdateBankAcount.patchValue({
      bank: this.dataBankaccount[index].bank,
      account_number: this.dataBankaccount[index].account_number,
      account_type: this.dataBankaccount[index].account_type.toString().toLowerCase(),
      currency: this.dataBankaccount[index].currency.toLowerCase(),
      monthly_average_deposit: this.dataBankaccount[index].monthly_average_deposit,
      account_name: this.dataBankaccount[index].account_name
    })
    this.modalService.open(targetmodal, {
      centered: true,
      backdrop: "static",
      keyboard: false,
      size: "xl",
      windowClass: 'my-modal'
    });
  }
  openModalFactoring(targetmodal, index, id) {
    this.CurrentFactoring = id
    this.indexFactoring = index
    this.FormUpdateFactoring.patchValue({
      entity: this.dataFactoring[index].entity,
      warranty: this.dataFactoring[index].warranty,
      amount_awarded: this.dataFactoring[index].amount_awarded,
      amount_used: this.dataFactoring[index].amount_used,
      balance: this.dataFactoring[index].balance,
    })
    this.modalService.open(targetmodal, {

      centered: true,
      backdrop: "static",
      keyboard: false,
      windowClass: 'my-modal',
      size: "xl",
    });
  }


  //#region OPENMODALS
  openModalComercialCompany(targetModal, index, id) {
    this.CurrentComercialCompany = id;
    this.indexComercialCompany = index;

    this.FormUpdateComercialCompany.patchValue({
      name: this.dataComercialCompany[index].name,
      phone: this.dataComercialCompany[index].phone,
      cellphone: this.dataComercialCompany[index].cellphone,
    });

    this.modalService.open(targetModal, {
      centered: true,
      backdrop: "static",
      keyboard: false,
      size: "xl",
      windowClass: 'my-modal'
    });
  }
  openModalXL(target) {
    this.modalService.open(target, {
      centered: true,
      backdrop: "static",
      keyboard: false,
      size: "xl",
      windowClass: 'my-modal'
    })
  }
  openModalDirectors(targetModal, index, id) {
    this.CurrentDirectors = id;
    //console.log(this.dataDirectors)
    this.FormUpdateDirectors.patchValue({
      name: this.dataDirectors[index].name,
      position: this.dataDirectors[index].position,
      nit: this.dataDirectors[index].nit,
      pep: this.dataDirectors[index].pep
    })
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: "static",
      keyboard: false,
      size: "xl",
      windowClass: 'my-modal'
    })
  }
  openModalCompanies(targetModal, index, id) {
    this.CurrentCompanies = id;
    this.FormUpdateCompanys.patchValue({
      comercial_name: this.dataCompanies[index].comercial_name,
      relation: this.dataCompanies[index].relation,
      sector: this.dataCompanies[index].sector,
      nit: this.dataCompanies[index].nit,
      holding_name: this.dataCompanies[index].holding_name,
      country: this.dataCompanies[index].country,
      comercial_activity: this.dataCompanies[index].comercial_activity
    })
    this.openModalXL(targetModal)
  }
  openModalStructureOperative(targetModal, index, id) {
    //console.log(this.dataOperativeStructure)
    this.FormUpdateOperativeStructure.patchValue({
      type: this.dataOperativeStructure[index].id,
      name: this.dataOperativeStructure[index].ceo_name,
      time: this.dataOperativeStructure[index].ceo_time
    })
    this.openModalXL(targetModal)
  }
  openModalAssociates(targetModal, index, id) {
    this.CurrentAssociate = id;
    this.FormUpdatePartners.patchValue({
      name: this.dataAssociates[index].name,
      position: this.dataAssociates[index].position,
      nationality: this.dataAssociates[index].nationality,
      nit: this.dataAssociates[index].nit,
      shareholding: this.dataAssociates[index].shareholding,
    })
    this.openModalXL(targetModal)
  }
  openModalBankLoans(target, index, id) {
    this.CurrentBankLoans = id;
    this.FormUpdateBankLoans.patchValue({
      bank: this.dataBankLoans[index].bank,
      loan_number: this.dataBankLoans[index].loan_number,
      warranty: this.dataBankLoans[index].warranty,
      amount_awarded: this.dataBankLoans[index].amount_awarded,
      time: this.dataBankLoans[index].time,
      balance: this.dataBankLoans[index].balance,
    })
    this.openModalXL(target)
  }
  openModalCountryOperations(targetModal, index, id) {
    this.CurrentCountryOperation = id;
    console.log(this.dataCountryoperations)
    this.FormUpdateCountryOperations.patchValue({
      year_sales: Number(this.dataCountryoperations[index].year_sales),
      country: this.dataCountryoperations[index].country
    })
    this.openModalXL(targetModal)
  }
  openModalFaPep(targetModal, index, id) {
    this.CurrentFapep = id;
    this.indexFaPep = index;
    console.log("GENDER::: ", this.dataFapep[index].feic_fa_gender);

    this.FormUpdateFaPep.patchValue({
      feic_fa_relative_type: this.dataFapep[index].feic_fa_relative_type,
      feic_fa_relative_specific: this.dataFapep[index]
        .feic_fa_relative_specific,
      feic_fa_partner_type: this.dataFapep[index].feic_fa_partner_type,
      feic_fa_partner_specific: this.dataFapep[index].feic_fa_partner_specific,
      feic_fa_gender: this.dataFapep[index].feic_fa_gender,
      feic_fa_condition: this.dataFapep[index].feic_fa_condition,
      feic_fa_f_lastname: this.dataFapep[index].feic_fa_f_lastname,
      feic_fa_s_lastname: this.dataFapep[index].feic_fa_s_lastname,
      feic_fa_marry_lastname: this.dataFapep[index].feic_fa_marry_lastname,
      feic_fa_firstname: this.dataFapep[index].feic_fa_firstname,
      feic_fa_secondname: this.dataFapep[index].feic_fa_secondname,
      feic_fa_other_name: this.dataFapep[index].feic_fa_other_name,
      feic_fa_entity: this.dataFapep[index].feic_fa_entity,
      feic_fa_rol: this.dataFapep[index].feic_fa_rol,
      feic_fa_country_institution: this.dataFapep[index]
        .feic_fa_country_institution,

    });
    this.selecionParentesco2 = this.dataFapep[index].feic_fa_relative_type
    this.selecionMotivacion2 = this.dataFapep[index].feic_fa_partner_type
    this.selecionCondicion2 = this.dataFapep[index].feic_fa_condition


    this.modalService.open(targetModal, {
      centered: true,
      backdrop: "static",
      keyboard: false,
      size: "xl",
      windowClass: 'my-modal'
    });
  }
  private addTimeZone(date) {
    console.log("addTimeZone", date);
    let userTimezoneOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() + userTimezoneOffset);
  }

  openModalServiceFEIC(targetModal, index, id) {
    this.CurrentServiceFeic = id;
    this.indexServicesFeic = index;


    this.FormUpdateServiceFEIC.patchValue({
      feic_product_fec: this.formatDate(
        this.dataServicesFeic[index].feic_product_fec
      ),
      feic_product_type: this.dataServicesFeic[index].feic_product_type,
      feic_product_name: this.dataServicesFeic[index].feic_product_name,
      feic_product_description: this.dataServicesFeic[index]
        .feic_product_description,
      feic_product_iden: this.dataServicesFeic[index].feic_product_iden,
      feic_product_contract_name: this.dataServicesFeic[index]
        .feic_product_contract_name,
      feic_product_currency: this.dataServicesFeic[index].feic_product_currency,
      feic_product_value: this.dataServicesFeic[index].feic_product_value,
      feic_product_country: this.dataServicesFeic[index].feic_product_country,
      feic_product_dep: this.dataServicesFeic[index].feic_product_dep,
      feic_product_mun: this.dataServicesFeic[index].feic_product_mun,
    });

    this.modalService.open(targetModal, {
      centered: true,
      backdrop: "static",
      keyboard: false,
      size: "xl",
      windowClass: 'my-modal'
    });
  }

  openModalFinancial(targetModal, index, id) {
    this.CurrentFinancials = id;
    this.indexFinancials = index;

    this.FormUpdateFinancials.patchValue({
      name: this.dataFinancials[index].name,
      phone: this.dataFinancials[index].phone,
      product_service: this.dataFinancials[index].product_service,
    });

    this.modalService.open(targetModal, {
      centered: true,
      backdrop: "static",
      keyboard: false,
      size: "xl",
      windowClass: 'my-modal'
    });
  }

  openModalMember(targetModal, index, id) {
    this.CurrentMember = id;
    this.indexMember = index;

    this.FormUpdateMembers.patchValue({
      name: this.dataMember[index].name,
      position: this.dataMember[index].position,
    });

    this.modalService.open(targetModal, {
      centered: true,
      backdrop: "static",
      keyboard: false,
      size: "xl",
      windowClass: 'my-modal'
    });
  }

  openModalCpe(targetModal, index) {
    this.indexCPE = index;

    this.FormUpdateCPEData.patchValue({
      cpe_institutions: this.cpe_data_array[index].CPE_INSTITUTIONS,
      cpe_services: this.cpe_data_array[index].CPE_SERVICES,
      cpe_category_services: this.cpe_data_array[index].CPE_CATEGORY_SERVICES,
    });

    this.modalService.open(targetModal, {
      centered: true,
      backdrop: "static",
      keyboard: false,
      size: "xl",
      windowClass: 'my-modal'
    });
  }

  closeBtnClick() {
    this.modalService.dismissAll();
  }
  //#endregion OPENMODALS



  ChangeIspepFEIC() {
    if (this.FormFEIC.value.fec_ispep == 1) {
      this.FormFEIC.controls["feic_pep_entity"].enable();
      this.FormFEIC.controls["feic_pep_role"].enable();
      this.FormFEIC.controls["feic_pep_country_entity"].enable();
      this.FormFEIC.controls["feic_pep_wealth_origin"].enable();
      this.FormFEIC.controls["feic_pep_wealth_especific"].enable();
    } else if (this.FormFEIC.value.fec_ispep == 0) {
      this.FormFEIC.controls["feic_pep_entity"].disable();
      this.FormFEIC.controls["feic_pep_role"].disable();
      this.FormFEIC.controls["feic_pep_country_entity"].disable();
      this.FormFEIC.controls["feic_pep_wealth_origin"].disable();
      this.FormFEIC.controls["feic_pep_wealth_especific"].disable();
    }
  }
  ChangeIncome(e) {
    console.log(e);
    console.log(this.FormFinancialInformation.value.total_income);
    if (this.FormFinancialInformation.value.total_income == 5) {
      this.FormFinancialInformation.controls[
        "total_income_amount"
      ].enable();
    } else if (this.FormFinancialInformation.value.total_income != 5) {
      this.FormFinancialInformation.controls[
        "total_income_amount"
      ].disable();
    }
  }
  ChangeExpenses() {
    if (this.FormFinancialInformation.value.total_expenses == 5) {
      this.FormFinancialInformation.controls["total_expenses_amount"].enable();
    } else if (this.FormFinancialInformation.value.total_expenses != 5) {
      this.FormFinancialInformation.controls["total_expenses_amount"].disable();
    }
  }
  ChangeMandatory() {
    console.log('Cambiando Mandatory');
    let val = this.FormRepresentativeData.value

    if (this.FormRepresentativeData.value.rep_acts_likes_mandatory == 1) {
      this.FormRepresentativeData.controls["rep_registry_name"].enable();
      this.FormRepresentativeData.controls["rep_registry_number"].enable();
      this.FormRepresentativeData.controls["rep_registry_folio"].enable();
      this.FormRepresentativeData.controls["rep_registry_book"].enable();
    } else if (
      this.FormRepresentativeData.value.rep_acts_likes_mandatory == 0
    ) {
      this.FormRepresentativeData.controls["rep_registry_name"].disable();
      this.FormRepresentativeData.controls["rep_registry_number"].disable();
      this.FormRepresentativeData.controls["rep_registry_folio"].disable();
      this.FormRepresentativeData.controls["rep_registry_book"].disable();
    }
  }
  ChangeMandatory2() {
    if (this.Form_other_data.value.rep_acts_likes_mandatory == 1) {
      this.Form_other_data.controls["rep_registry_name"].enable();
      this.Form_other_data.controls["rep_registry_number"].enable();
      this.Form_other_data.controls["rep_registry_folio"].enable();
      this.Form_other_data.controls["rep_registry_book"].enable();
    } else if (
      this.Form_other_data.value.rep_acts_likes_mandatory == 0
    ) {
      this.Form_other_data.controls["rep_registry_name"].disable();
      this.Form_other_data.controls["rep_registry_number"].disable();
      this.Form_other_data.controls["rep_registry_folio"].disable();
      this.Form_other_data.controls["rep_registry_book"].disable();
    }
  }
  ChangeForentity() {
    if (this.FormRepresentativeData.value.rep_act_only_forentity == 0) {
      this.FormRepresentativeData.controls[
        "rep_individual_f_lastname"
      ].enable();
      this.FormRepresentativeData.controls[
        "rep_individual_s_lastname"
      ].enable();
      this.FormRepresentativeData.controls[
        "rep_individual_marry_lastname"
      ].enable();
      this.FormRepresentativeData.controls["rep_individual_firstname"].enable();
      this.FormRepresentativeData.controls[
        "rep_individual_secondname"
      ].enable();
      this.FormRepresentativeData.controls[
        "rep_individual_other_name"
      ].enable();
      this.FormRepresentativeData.controls["rep_individual_genre"].enable();
      this.FormRepresentativeData.controls[
        "rep_individual_comercialname"
      ].enable();
      this.FormRepresentativeData.controls["rep_individual_fecnac"].enable();
      this.FormRepresentativeData.controls["rep_individual_country"].enable();
      this.FormRepresentativeData.controls[
        "rep_individual_other_nationality"
      ].enable();
      this.FormRepresentativeData.controls[
        "rep_individual_id_document_type"
      ].enable();
      this.FormRepresentativeData.controls[
        "rep_individual_id_document_number"
      ].enable();
      this.FormRepresentativeData.controls[
        "rep_individual_id_document_emission_country"
      ].enable();
      this.FormRepresentativeData.controls["rep_individual_nit"].enable();
      this.FormRepresentativeData.controls["rep_individual_phone"].enable();
      this.FormRepresentativeData.controls["rep_individual_cellphone"].enable();
    } else if (this.FormRepresentativeData.value.rep_act_only_forentity == 1) {
      this.FormRepresentativeData.controls[
        "rep_individual_f_lastname"
      ].disable();
      this.FormRepresentativeData.controls[
        "rep_individual_s_lastname"
      ].disable();
      this.FormRepresentativeData.controls[
        "rep_individual_marry_lastname"
      ].disable();
      this.FormRepresentativeData.controls[
        "rep_individual_firstname"
      ].disable();
      this.FormRepresentativeData.controls[
        "rep_individual_secondname"
      ].disable();
      this.FormRepresentativeData.controls[
        "rep_individual_other_name"
      ].disable();
      this.FormRepresentativeData.controls["rep_individual_genre"].disable();
      this.FormRepresentativeData.controls[
        "rep_individual_comercialname"
      ].disable();
      this.FormRepresentativeData.controls["rep_individual_fecnac"].disable();
      this.FormRepresentativeData.controls["rep_individual_country"].disable();
      this.FormRepresentativeData.controls[
        "rep_individual_other_nationality"
      ].disable();
      this.FormRepresentativeData.controls[
        "rep_individual_id_document_type"
      ].disable();
      this.FormRepresentativeData.controls[
        "rep_individual_id_document_number"
      ].disable();
      this.FormRepresentativeData.controls[
        "rep_individual_id_document_emission_country"
      ].disable();
      this.FormRepresentativeData.controls["rep_individual_nit"].disable();
      this.FormRepresentativeData.controls["rep_individual_phone"].disable();
      this.FormRepresentativeData.controls[
        "rep_individual_cellphone"
      ].disable();
    }
  }
  ChangeTransfer() {
    if (this.FormProductService.value.prod_serv_transfers == 1) {
      this.FormProductService.controls["prod_serv_transfers_level"].enable();
    } else if (this.FormProductService.value.prod_serv_transfers == 0) {
      this.FormProductService.controls["prod_serv_transfers_level"].disable();
    }
  }
  ChangeDebtorsIVA() {
    if (this.FormDebtors.value.deb_iva == 1) {
      this.FormDebtors.controls["deb_iva_percentage"].setValidators([Validators.required, isDefaultValue]);
    } else if (this.FormDebtors.value.deb_iva == 0) {
      this.FormDebtors.controls["deb_iva_percentage"].clearValidators();
    }
  }
  ChangeDebtorsISR() {
    if (this.FormDebtors.value.deb_isr == 1) {
      this.FormDebtors.controls["deb_isr_percentage"].setValidators([Validators.required, isDefaultValue]);
    } else if (this.FormDebtors.value.deb_isr == 0) {
      this.FormDebtors.controls["deb_isr_percentage"].clearValidators();
    }

  }

  async validateQuarter() {
    console.log('VALIDANDO CUARTOS');
    this.boolQuarter = false
    let fq = this.FormProductServices.value.first_quarter
    let sq = this.FormProductServices.value.second_quarter
    let tq = this.FormProductServices.value.third_quarter
    let ftq = this.FormProductServices.value.fourth_quarter
    this.resultQuarters = await (parseFloat(fq) + parseFloat(sq) + parseFloat(tq) + parseFloat(ftq))
    console.log('Suma de Quarters: ' + this.resultQuarters);
    if (this.FormProductServices.valid && this.resultQuarters <= 100) {
      this.boolQuarter = true
    }
    else {
      this.boolQuarter = false
    }
  }

  ChangeActs_own_behalf() {
    console.log('Entro a changeActs_own_ebhalf::::');
    if (this.FormFEICGeneral.value.feic_client_acts_own_behalf == 1) {
      this.selecionActsOnBehalf = true;
      this.FormFEIC.clearValidators();
      this.FormFEIC.setValidators([
        phoneOrMobilephone(Validators.required, ['feic_phone', 'feic_movil']),
        //phoneOrMobilephone(Validators.required, ['feicp_phone', 'feicp_movilphone']),
        phoneOrMobilephone(Validators.required, ['feic_workref_phone1', 'feic_workref_movil1']),
        phoneOrMobilephone(Validators.required, ['feic_workref_phone2', 'feic_workref_movil2']),
        phoneOrMobilephone(Validators.required, ['feic_ref_phone1', 'feic_ref_movil1']),
        phoneOrMobilephone(Validators.required, ['feic_ref_phone2', 'feic_ref_movil2']),
      ])
      this.FormFEICGeneral.controls['feic_behalf'].disable();

      this.FormFEIC.controls["feicp_f_lastname"].disable();
      this.FormFEIC.controls["feicp_s_lastname"].disable();
      this.FormFEIC.controls["feicp_marry_lastname"].disable();
      this.FormFEIC.controls["feicp_firstname"].disable();
      this.FormFEIC.controls["feicp_secondname"].disable();
      this.FormFEIC.controls["feicp_other_name"].disable();
      this.FormFEIC.controls["feicp_gen"].disable();
      this.FormFEIC.controls["feicp_comercial_name"].disable();
      this.FormFEIC.controls["feicp_fecnac"].disable();
      this.FormFEIC.controls["feicp_contitutution_or_nationality"].disable();
      this.FormFEIC.controls["feicp_other_nationality"].disable();
      this.FormFEIC.controls["feicp_iddoc_type"].disable();
      this.FormFEIC.controls["feicp_iddoc_num"].disable();
      this.FormFEIC.controls["feicp_iddoc_emision_country"].disable();
      this.FormFEIC.controls["feicp_nit"].disable();
      this.FormFEIC.controls["feicp_phone"].disable();
      this.FormFEIC.controls["feicp_movilphone"].disable();
      this.FormFEIC.controls["fecp_ispep"].disable();
      this.FormFEIC.controls["fecp_iscpe"].disable();

    } else if (this.FormFEICGeneral.value.feic_client_acts_own_behalf == 0) {
      this.selecionActsOnBehalf = false;
      this.FormFEIC.clearValidators();
      this.FormFEIC.setValidators([
        phoneOrMobilephone(Validators.required, ['feic_phone', 'feic_movil']),
        phoneOrMobilephone(Validators.required, ['feicp_phone', 'feicp_movilphone']),
        phoneOrMobilephone(Validators.required, ['feic_workref_phone1', 'feic_workref_movil1']),
        phoneOrMobilephone(Validators.required, ['feic_workref_phone2', 'feic_workref_movil2']),
        phoneOrMobilephone(Validators.required, ['feic_ref_phone1', 'feic_ref_movil1']),
        phoneOrMobilephone(Validators.required, ['feic_ref_phone2', 'feic_ref_movil2']),
      ])
      this.FormFEICGeneral.controls['feic_behalf'].enable();
      this.FormFEIC.controls["feicp_f_lastname"].enable();
      this.FormFEIC.controls["feicp_s_lastname"].enable();
      this.FormFEIC.controls["feicp_marry_lastname"].enable();
      this.FormFEIC.controls["feicp_firstname"].enable();
      this.FormFEIC.controls["feicp_secondname"].enable();
      this.FormFEIC.controls["feicp_other_name"].enable();
      this.FormFEIC.controls["feicp_gen"].enable();
      this.FormFEIC.controls["feicp_comercial_name"].enable();
      this.FormFEIC.controls["feicp_fecnac"].enable();
      this.FormFEIC.controls["feicp_contitutution_or_nationality"].enable();
      this.FormFEIC.controls["feicp_other_nationality"].enable();
      this.FormFEIC.controls["feicp_iddoc_type"].enable();
      this.FormFEIC.controls["feicp_iddoc_num"].enable();
      this.FormFEIC.controls["feicp_iddoc_emision_country"].enable();
      this.FormFEIC.controls["feicp_nit"].enable();
      this.FormFEIC.controls["feicp_phone"].enable();
      this.FormFEIC.controls["feicp_movilphone"].enable();
      this.FormFEIC.controls["fecp_ispep"].enable();
      this.FormFEIC.controls["fecp_iscpe"].enable();
    }
  }
  checkFeicIncomeSource(): boolean {
    //feic_income_source
    return this.feic_income_source[0].sector != null && this.feic_income_source[0].amount != null;
  }
  checkIspepWealthOrigin(): boolean {
    //{ name: "Herencia", value: "0", id: "heren", status: false }

    let r = this.RichPepchexboxes.filter(p => p.status == true);

    return r.length > 0;

  }
  onCbChange(e) {
    const isArray: FormArray = this.formcheckbox.get("isArray") as FormArray;

    if (e.target.checked) {
      let i: number = 0;
      isArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          isArray.removeAt(i);
          //return;
        }
        i++;
      });

      isArray.push(new FormControl(e.target.value));
      if (e.target.value == 3) {
        this.FormFinancialInformation.controls[
          "other_income_currency_type"
        ].enable();
      }
    } else {
      let i: number = 0;
      isArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          isArray.removeAt(i);

          if (e.target.value == 3) {
            this.FormFinancialInformation.controls[
              "other_income_currency_type"
            ].disable();
          }
          return;
        }
        i++;
      });
    }
  }
  onCbChangeEx(e) {
    const isArray: FormArray = this.formcheckboxexpenses.get(
      "isArray"
    ) as FormArray;

    if (e.target.checked) {
      let i: number = 0;
      isArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          isArray.removeAt(i);
          return;
        }
        i++;
      });
      isArray.push(new FormControl(e.target.value));
      if (e.target.value == 3) {
        this.FormFinancialInformation.controls[
          "other_expenses_currency_type"
        ].enable();
      }
    } else {
      let i: number = 0;
      isArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          if (e.target.value == 3) {
            this.FormFinancialInformation.controls[
              "other_expenses_currency_type"
            ].disable();
          }
          isArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  onCbChangeMoney(e, item) {
    const isArray: FormArray = this.formoriginmoney.get("isArray") as FormArray;
    console.log(item);

    if (e.target.checked) {
      let i: number = 0;
      isArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          isArray.removeAt(i);
          return;
        }
        i++;
      });
      isArray.push(new FormControl(e.target.value));
      /*if (e.target.value == 3) {
        this.FormFinancialInformation.controls[
          "other_expenses_currency_type"
        ].enable();
      }*/
    } else {
      let i: number = 0;
      isArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          /* if (e.target.value == 3) {
            this.FormFinancialInformation.controls[
              "other_expenses_currency_type"
            ].disable();
          }*/
          isArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  OnCbChangeSourceFound(e) {
    const isArray: FormArray = this.formSourceFound.get("isArray") as FormArray;

    if (e.target.checked) {
      console.log("ENTRE AL CHECKED");
      let i: number = 0;
      this.originSourceFound[e.target.value].status = true;
      isArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          isArray.removeAt(i);
          return;
        }
        i++;
      });
      isArray.push(new FormControl(e.target.value));

      if (e.target.value == 15) {
        this.FormProductService.controls["prod_serv_entity_loan"].enable();

      }
      if (e.target.value == 16) {
        this.FormProductService.controls["prod_serv_entity_account"].enable();

      }
      if (e.target.value == 17) {
        this.FormProductService.controls["prod_serv_other"].enable();

      }
      /*this.FormProductService.value.prod_serv_source_found = JSON.stringify(
        isArray
      );*/
    } else {
      console.log("ENTRE AL NOOOO CHECKED");
      let i: number = 0;
      this.originSourceFound[e.target.value].status = false;
      isArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          if (e.target.value == 15) {
            this.FormProductService.controls["prod_serv_entity_loan"].disable();
          }
          if (e.target.value == 16) {
            this.FormProductService.controls[
              "prod_serv_entity_account"
            ].disable();
          }
          if (e.target.value == 17) {
            this.FormProductService.controls["prod_serv_other"].disable();
          }
          isArray.removeAt(i);
          /*this.FormProductService.value.prod_serv_source_found = JSON.stringify(
            isArray
          );*/
          return;
        }
        i++;
      });
    }
  }

  OnCbChangeMigrationConditions(e) {
    const isArray: FormArray = this.formMigrationCondition.get(
      "isArray"
    ) as FormArray;

    if (e.target.checked) {
      let i: number = 0;
      isArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          isArray.removeAt(i);
          return;
        }
        i++;
      });
      isArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      isArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          isArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  async changeHasCPE() {
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    await this.mysqlService
      .CreateGeneralDataFEIC({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: { fec_is_cpe: this.FormCPE.controls.fec_is_cpe.value },
      })
      .toPromise()
      .then(async (res) => {
        this.spinner.show();
        //this.FormCPE.reset({});
        //console.log("res", res);
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (this.FormCPE.value.fec_is_cpe == 1) {
          this.FormCPE.controls.cpe_individual_person.enable();
          this.FormCPE.controls.cpe_entity.enable();
          this.FormCPE.controls.cpe_other_sginers.enable();
          this.FormCPE.controls.cpe_legal_rep.enable();
          this.FormCPE.controls.cpe_person_f_lastname.enable();
          this.FormCPE.controls.cpe_person_s_lastname.enable();
          this.FormCPE.controls.cpe_person_marry_lastname.enable();
          this.FormCPE.controls.cpe_person_firstname.enable();
          this.FormCPE.controls.cpe_person_secondname.enable();
          this.FormCPE.controls.cpe_person_othername.enable();
          this.FormCPE.controls.cpe_comercial_name.enable();
          this.FormCPE.controls.cpe_is_cpe.enable();
          this.FormCPE.controls.cpe_condition.enable();
          this.FormCPE.controls.cpe_service_is_in_finances.enable();
          this.FormCPE.controls.cpe_have_services_with_obligate_person.enable();
          this.FormCPE.controls.spe_guatecompras_status.enable();
          //this.FormCPE.controls.btn_cpe.enable();


        } else {
          this.FormCPE.controls.cpe_individual_person.disable();
          this.FormCPE.controls.cpe_entity.disable();
          this.FormCPE.controls.cpe_other_sginers.disable();
          this.FormCPE.controls.cpe_legal_rep.disable();
          this.FormCPE.controls.cpe_person_f_lastname.disable();
          this.FormCPE.controls.cpe_person_s_lastname.disable();
          this.FormCPE.controls.cpe_person_marry_lastname.disable();
          this.FormCPE.controls.cpe_person_firstname.disable();
          this.FormCPE.controls.cpe_person_secondname.disable();
          this.FormCPE.controls.cpe_person_othername.disable();
          this.FormCPE.controls.cpe_comercial_name.disable();
          this.FormCPE.controls.cpe_is_cpe.disable();
          this.FormCPE.controls.cpe_condition.disable();
          this.FormCPE.controls.cpe_service_is_in_finances.disable();
          this.FormCPE.controls.cpe_have_services_with_obligate_person.disable();
          this.FormCPE.controls.spe_guatecompras_status.disable();
          //this.FormCPE.controls.btn_cpe.disable();
        }
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        await this.ngOnInit();
        //this.accordion.toggle("static-6");
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }

  OnCbChangeRichPep(e, itemm) {
    console.log('change', e.target.value);
    console.log(this.RichPepchexboxes);

    const isArray: FormArray = this.formRichpep.get("isArray") as FormArray;


    if (e.target.checked) {

      isArray.push(new FormControl(e.target.value));

      itemm.status = true;
    } else {
      console.log('ENTRO ELSE');
      let i: number = 0;
      isArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          isArray.removeAt(i);
          itemm.status = false;
          return;
        }
        i++;
      });
    }

  }
  OnOtherIncomecheckboxes(e, item) {
    /* OtherIncomecheckboxes: Array<any> = [
      { name: "Actividades profesionales.", value: "1", id: "1", status: false },
      { name: "Manutención.", value: "6", id: "6", status: false },
      { name: "Rentas.", value: "3", id: "3", status: false },
      { name: "Jubilación.", value: "4", id: "4", status: false },
      { name: "Otra fuente.", value: "5", id: "5", status: false },
  
  
    ]; */
    if (e.target.checked) {
      console.log('Se chequio!');
      item.status = true;
      if (item.value == '1') {
        this.FormFEIC.get('feic_eco_other_profesional_activity').enable();
        this.FormFEIC.get('feic_eco_other_profesional_activity_income').enable();
        this.FormFEIC.get('feic_eco_other_profesional_activity_curency').enable();

      }
      if (item.value == '6') {
        this.FormFEIC.get('feic_eco_other_alimony').enable();
        this.FormFEIC.get('feic_eco_other_alimony_income').enable();
        this.FormFEIC.get('feic_eco_other_alimony_curency').enable();

      }
      if (item.value == '3') {
        this.FormFEIC.get('feic_eco_other_rent').enable();
        this.FormFEIC.get('feic_eco_other_rent_income').enable();
        this.FormFEIC.get('feic_eco_other_rent_curency').enable();

      }
      if (item.value == '4') {
        this.FormFEIC.get('feic_eco_other_retirement').enable();
        this.FormFEIC.get('feic_eco_other_retirement_income').enable();
        this.FormFEIC.get('feic_eco_other_retirement_curency').enable();

      }
      if (item.value == '5') {
        this.FormFEIC.get('feic_eco_other_specific').enable();
        this.FormFEIC.get('feic_eco_other_income_income').enable();
        this.FormFEIC.get('feic_eco_other_income_curency').enable();

      }


    }
    else {
      console.log("Se deschequio!");
      item.status = false;
      if (item.value == '1') {
        this.FormFEIC.get('feic_eco_other_profesional_activity').disable();
        this.FormFEIC.get('feic_eco_other_profesional_activity_income').disable();
        this.FormFEIC.get('feic_eco_other_profesional_activity_curency').disable();

      }
      if (item.value == '6') {
        this.FormFEIC.get('feic_eco_other_alimony').disable();
        this.FormFEIC.get('feic_eco_other_alimony_income').disable();
        this.FormFEIC.get('feic_eco_other_alimony_curency').disable();

      }
      if (item.value == '3') {
        this.FormFEIC.get('feic_eco_other_rent').disable();
        this.FormFEIC.get('feic_eco_other_rent_income').disable();
        this.FormFEIC.get('feic_eco_other_rent_curency').disable();

      }
      if (item.value == '4') {
        this.FormFEIC.get('feic_eco_other_retirement').disable();
        this.FormFEIC.get('feic_eco_other_retirement_income').disable();
        this.FormFEIC.get('feic_eco_other_retirement_curency').disable();

      }
      if (item.value == '5') {
        this.FormFEIC.get('feic_eco_other_specific').disable();
        this.FormFEIC.get('feic_eco_other_income_income').disable();
        this.FormFEIC.get('feic_eco_other_income_curency').disable();

      }
    }
  }
  OnCbChangeSourceIncome(e, item) {
    console.log('item:');
    console.log(item);
    const isArray: FormArray = this.formSourceIncome.get(
      "isArray"
    ) as FormArray;

    if (e.target.checked) {
      let i: number = 0;
      if (item.id == 'rddepen') {
        console.log("this.selecionRelacionDeDependencia = 1;");
        this.selecionRelacionDeDependencia = 1;
        //SE TIENEN QUE HABILITAR TODOS LOS CAMPOS PARA ESTA SECCION
        this.FormFEIC.get('feic_eco_company_sector').enable();
        this.FormFEIC.get('feic_eco_company_name').enable();
        this.FormFEIC.get('feic_eco_phones').enable();
        this.FormFEIC.get('feic_eco_rol').enable();
        this.FormFEIC.get('feic_eco_company_address').enable();
        this.FormFEIC.get('feic_eco_company_country').enable();
        this.FormFEIC.get('feic_eco_company_dep').enable();
        this.FormFEIC.get('feic_eco_company_mun').enable();
        this.FormFEIC.get('feic_eco_company_zone').enable();
        this.FormFEIC.get('feic_eco_company_activity').enable();
        this.FormFEIC.get('feic_eco_company_income').enable();
        this.FormFEIC.get('feic_eco_company_currency').enable();

      }
      if (item.id == 'npps') {
        console.log("this.selecionNegocioPropio = 1;");
        this.selecionNegocioPropio = 1;
        this.FormFEIC.get('feic_eco_owncomp_name').enable();
        this.FormFEIC.get('feic_eco_owncomp_phones').enable();
        this.FormFEIC.get('feic_eco_owncomp_nit').enable();
        this.FormFEIC.get('feic_eco_owncomp_op_fec').enable();
        this.FormFEIC.get('feic_eco_owncomp_business').enable();
        this.FormFEIC.get('feic_eco_owncomp_pat_num').enable();
        this.FormFEIC.get('feic_eco_owncomp_pat_folio').enable();
        this.FormFEIC.get('feic_eco_owncomp_pat_book').enable();
        this.FormFEIC.get('feic_eco_owncomp_pat_num_exp').enable();
        this.FormFEIC.get('feic_eco_owncomp_income').enable();
        this.FormFEIC.get('feic_eco_owncomp_currency').enable();
        this.FormFEIC.get('feic_eco_owncomp_activity').enable();
        this.FormFEIC.get('feic_eco_owncomp_address').enable();
        this.FormFEIC.get('feic_eco_owncomp_zone').enable();
        this.FormFEIC.get('feic_eco_owncomp_country').enable();
        /* feic_eco_owncomp_dep
        feic_eco_owncomp_mun */
      }
      if (item.id == 'osic') {
        this.selecionOtras = 1;
      }
      isArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          isArray.removeAt(i);
          return;
        }
        i++;
      });
      isArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      if (item.id == 'rddepen') {
        this.selecionRelacionDeDependencia = -1;
        this.FormFEIC.get('feic_eco_company_sector').disable();
        this.FormFEIC.get('feic_eco_company_name').disable();
        this.FormFEIC.get('feic_eco_phones').disable();
        this.FormFEIC.get('feic_eco_rol').disable();
        this.FormFEIC.get('feic_eco_company_address').disable();
        this.FormFEIC.get('feic_eco_company_country').disable();
        this.FormFEIC.get('feic_eco_company_dep').disable();
        this.FormFEIC.get('feic_eco_company_mun').disable();
        this.FormFEIC.get('feic_eco_company_zone').disable();
        this.FormFEIC.get('feic_eco_company_activity').disable();
        this.FormFEIC.get('feic_eco_company_income').disable();
        this.FormFEIC.get('feic_eco_company_currency').disable();
      }
      if (item.id == 'npps') {
        this.selecionNegocioPropio = -1;
        this.FormFEIC.get('feic_eco_owncomp_name').disable();
        this.FormFEIC.get('feic_eco_owncomp_phones').disable();
        this.FormFEIC.get('feic_eco_owncomp_nit').disable();
        this.FormFEIC.get('feic_eco_owncomp_op_fec').disable();
        this.FormFEIC.get('feic_eco_owncomp_business').disable();
        this.FormFEIC.get('feic_eco_owncomp_pat_num').disable();
        this.FormFEIC.get('feic_eco_owncomp_pat_folio').disable();
        this.FormFEIC.get('feic_eco_owncomp_pat_book').disable();
        this.FormFEIC.get('feic_eco_owncomp_pat_num_exp').disable();
        this.FormFEIC.get('feic_eco_owncomp_income').disable();
        this.FormFEIC.get('feic_eco_owncomp_currency').disable();
        this.FormFEIC.get('feic_eco_owncomp_activity').disable();
        this.FormFEIC.get('feic_eco_owncomp_address').disable();
        this.FormFEIC.get('feic_eco_owncomp_zone').disable();
        this.FormFEIC.get('feic_eco_owncomp_country').disable();
      }
      if (item.id == 'osic') {
        this.selecionOtras = -1;
      }
      isArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          isArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  enabledOtherIncomeSource(): boolean {
    //{ select: null, income: 0, enabled: true },
    //console.log(this.activeFeicIncomeSource);
    if (!this.activeFeicIncomeSource) {
      //console.log("Entro a que this.activeFeicIncomeSource es: ", this.activeFeicIncomeSource);
      return false;
    }
    if (this.activeFeicIncomeSource === this.feic_income_source[4]) {
      //console.log("Entro a que llego a su limite");
      return false;
    }
    if (this.activeFeicIncomeSource.sector != null &&
      this.activeFeicIncomeSource.sector != "" &&
      this.activeFeicIncomeSource.amount != null) {
      //console.log("Entro Aquiiiiiiii");
      return true;
    }
    //console.log("No estro a ningun lado");
    return false;
  }
  async changeHasBussiness() {
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    let arrayinfo = [];
    const dataholding = this.FormCompanys.value.holding;
    delete this.FormCompanys.value.holding;
    arrayinfo.push(this.FormCompanys.value);
    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: { holding: dataholding },
      })
      .toPromise()
      .then(async (res) => {
        this.spinner.show();
        this.FormCompanys.reset({});
        //console.log("res", res);
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (this.FormCompanys.value.holding == 1) {
          this.FormCompanys.controls["comercial_name"].enable();
          this.FormCompanys.controls["relation"].enable();
          this.FormCompanys.controls["sector"].enable();
          this.FormCompanys.controls["nit"].enable();
          this.FormCompanys.controls["holding_name"].enable();
          this.FormCompanys.controls["country"].enable();
          this.FormCompanys.controls["comercial_activity"].enable();
          //this.Form_other_data.value.isr_percentage.enable();
        } else {
          this.FormCompanys.controls["comercial_name"].disable();
          this.FormCompanys.controls["relation"].disable();
          this.FormCompanys.controls["sector"].disable();
          this.FormCompanys.controls["nit"].disable();
          this.FormCompanys.controls["holding_name"].disable();
          this.FormCompanys.controls["country"].disable();
          this.FormCompanys.controls["comercial_activity"].disable();
        }
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        await this.ngOnInit();
        //this.accordion.toggle("static-6");
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }
  onSelectCountryChange(value, flag): void {
    switch (flag) {
      case this.feic_migration_condition_const: {
        if (value == '8') {
          this.FormFEIC.controls.feic_migration_especific.enable();


        }
        else {
          this.FormFEIC.controls.feic_migration_especific.disable();
          this.FormFEIC.controls.feic_migration_especific.setValue(null);

        }
        break;
      }
      case 99: {
        if (value != 'GUATEMALA') {
          this.selecionMunicipality99ID = null;
          this.selecionDepartment99ID = null;
          this.FormFEIC.controls.feic_iddoc_emision_dep.setValue(null);
          this.FormFEIC.controls.feic_iddoc_emision_mun.setValue(null);
          this.FormFEIC.controls.feic_iddoc_emision_dep.disable();
          this.FormFEIC.controls.feic_iddoc_emision_mun.disable();



        }
        else {
          this.FormFEIC.controls.feicp_iddoc_emision_country.enable();
          this.FormFEIC.controls.feicp_iddoc_emision_country.enable();
        }
        break;
      }
      case 2: {
        if (value != 'GUATEMALA') {
          this.selecionMunicipality2ID = null;
          this.selecionDepartment2ID = null;
          this.FormHeadOffice.controls.department_site.setValue(null);
          this.FormHeadOffice.controls.muni_site.setValue(null);
          this.FormHeadOffice.controls.department_site.disable();
          this.FormHeadOffice.controls.muni_site.disable();
        }
        else {
          this.FormHeadOffice.controls.department_site.enable();
          this.FormHeadOffice.controls.muni_site.enable();
        }
        break;
      }
      case 3: {
        if (value != 'GUATEMALA') {
          this.selecionMunicipality3ID = null;
          this.selecionDepartment3ID = null;
          this.FormRepresentativeData.controls.rep_id_emission_dep.setValue(null);
          this.FormRepresentativeData.controls.rep_id_emission_muni.setValue(null);
          this.FormRepresentativeData.controls.rep_id_emission_dep.disable();
          this.FormRepresentativeData.controls.rep_id_emission_muni.disable();



        }
        else {
          this.FormRepresentativeData.controls.rep_id_emission_dep.enable();
          this.FormRepresentativeData.controls.rep_id_emission_muni.enable();
        }
        break;
      }
      case 4: {

        if (value != 'GUATEMALA') {
          this.selecionMunicipality4ID = null;
          this.selecionDepartment4ID = null;
          this.FormRepresentativeData.controls.rep_dep.setValue(null);
          this.FormRepresentativeData.controls.rep_muni.setValue(null);
          this.FormRepresentativeData.controls.rep_dep.disable();
          this.FormRepresentativeData.controls.rep_muni.disable();
        }
        else {
          this.FormRepresentativeData.controls.rep_dep.enable();
          this.FormRepresentativeData.controls.rep_muni.enable();
        }
        break;
      }
      case 5: {
        if (value != 'GUATEMALA') {
          this.selecionMunicipality5ID = null;
          this.selecionDepartment5ID = null;
          this.FormFEICGeneral.controls.feic_dep.setValue(null);
          this.FormFEICGeneral.controls.feic_muni.setValue(null);
          this.FormFEICGeneral.controls.feic_dep.disable();
          this.FormFEICGeneral.controls.feic_muni.disable();
        }
        else {
          this.FormFEICGeneral.controls.feic_dep.enable();
          this.FormFEICGeneral.controls.feic_muni.enable();
        }
        break;
      }
      case 10: {
        //País de nacimiento
        if (value != 'GUATEMALA') {
          this.selecionMunicipality10ID = null;
          this.selecionDepartment10ID = null;
          this.FormFEIC.controls.feic_dep_birth.setValue(null);
          this.FormFEIC.controls.feic_muni_birth.setValue(null);
          this.FormFEIC.controls.feic_migration_condition.enable();
          this.FormFEIC.controls.feic_dep_birth.disable();
          this.FormFEIC.controls.feic_muni_birth.disable();
        }
        else {
          this.FormFEIC.controls.feic_migration_condition.disable();
          this.FormFEIC.controls.feic_migration_especific.disable();
          this.FormFEIC.controls.feic_dep_birth.enable();
          this.FormFEIC.controls.feic_muni_birth.enable();

        }
        break;
      }
      case 11: {
        if (value != 'GUATEMALA') {
          this.selecionMunicipality11ID = null;
          this.selecionDepartment11ID = null;
          this.FormFEIC.controls.feic_iddoc_emision_dep.setValue(null);
          this.FormFEIC.controls.feic_iddoc_emision_mun.setValue(null);
          this.FormFEIC.controls.feic_iddoc_emision_dep.disable();
          this.FormFEIC.controls.feic_iddoc_emision_mun.disable();
        }
        else {
          this.FormFEIC.controls.feic_iddoc_emision_dep.enable();
          this.FormFEIC.controls.feic_iddoc_emision_mun.enable();
        }
        break;
      }
      case 6: {
        if (value != 'GUATEMALA') {
          this.selecionMunicipality6ID = null;
          this.selecionDepartment6ID = null;
          this.FormFEIC.controls.feic_address_dep.setValue(null);
          this.FormFEIC.controls.feic_address_mun.setValue(null);
          this.FormFEIC.controls.feic_address_dep.disable();
          this.FormFEIC.controls.feic_address_mun.disable();
        }
        else {
          this.FormFEIC.controls.feic_address_dep.enable();
          this.FormFEIC.controls.feic_address_mun.enable();
        }
        break;
      }
      case 7: {
        if (value != 'GUATEMALA') {
          this.selecionMunicipality7ID = null;
          this.selecionDepartment7ID = null;
          this.FormFEIC.controls.feic_eco_company_dep.setValue(null);
          this.FormFEIC.controls.feic_eco_company_mun.setValue(null);
          this.FormFEIC.controls.feic_eco_company_dep.disable();
          this.FormFEIC.controls.feic_eco_company_mun.disable();
        }
        else {
          this.FormFEIC.controls.feic_eco_company_dep.enable();
          this.FormFEIC.controls.feic_eco_company_mun.enable();
        }
        break;
      }
      case 8: {
        if (value != 'GUATEMALA') {
          this.selecionMunicipality8ID = null;
          this.selecionDepartment8ID = null;
          this.FormFEIC.controls.feic_eco_owncomp_dep.setValue(null);
          this.FormFEIC.controls.feic_eco_owncomp_mun.setValue(null);
          this.FormFEIC.controls.feic_eco_owncomp_dep.disable();
          this.FormFEIC.controls.feic_eco_owncomp_mun.disable();
        }
        else {
          this.FormFEIC.controls.feic_eco_owncomp_dep.enable();
          this.FormFEIC.controls.feic_eco_owncomp_mun.enable();
        }
        break;
      }
      case 9: {
        if (value != 'GUATEMALA') {
          this.selecionMunicipality9ID = null;
          this.selecionDepartment9ID = null;
          this.FormServiceFEIC.controls.feic_product_dep.setValue(null);
          this.FormServiceFEIC.controls.feic_product_mun.setValue(null);
          this.FormServiceFEIC.controls.feic_product_dep.disable();
          this.FormServiceFEIC.controls.feic_product_mun.disable();
        }
        else {
          this.FormServiceFEIC.controls.feic_product_dep.enable();
          this.FormServiceFEIC.controls.feic_product_mun.enable();
        }
        break;
      }
      case 12: {
        if (value != 'GUATEMALA') {
          this.selecionMunicipality12ID = null;
          this.selecionDepartment12ID = null;
          this.Form_other_data.controls.rep_id_emission_dep.setValue(null);
          this.Form_other_data.controls.rep_id_emission_muni.setValue(null);
          this.Form_other_data.controls.rep_id_emission_dep.disable();
          this.Form_other_data.controls.rep_id_emission_muni.disable();
        }
        else {
          this.Form_other_data.controls.rep_id_emission_dep.enable();
          this.Form_other_data.controls.rep_id_emission_muni.enable();
        }
        break;
      }
      case 13: {
        if (value != 'GUATEMALA') {
          this.selecionMunicipality13ID = null;
          this.selecionDepartment13ID = null;
          this.Form_other_data.controls.rep_dep.setValue(null);
          this.Form_other_data.controls.rep_muni.setValue(null);
          this.Form_other_data.controls.rep_dep.disable();
          this.Form_other_data.controls.rep_muni.disable();
        }
        else {
          this.Form_other_data.controls.rep_dep.enable();
          this.Form_other_data.controls.rep_muni.enable();
        }
        break;
      }


    }
  }

  getDepartments() {
    const departments = [];
    this.mysqlService.GetDepartments().subscribe(
      (response) => {
        Object.keys(response.data).forEach(function (k) {
          departments.push({
            id: response.data[k].department_id,
            name: response.data[k].name,
            country: response.data[k].country_id,
          });
        });
      },
      (error) => {
        console.log("error");
      }
    );
    return departments;
  }
  groupSubjectsList(subjectsList) {
    let newList = []

    subjectsList.forEach(subject => {
      if (subject.rsdet_id == null) {
        // requirement
        subject['childs'] = [];
        newList.push(subject);
      } else {
        if (newList.length > 0) {
          newList[newList.length - 1]['childs'].push(subject);
        } else {
          subject['childs'] = [];
          newList.push(subject);
        }
      }
    });

    //console.log(newList);openModalC1
    return newList;
  }
  redirectNext() {
    const redirectData = JSON.parse(localStorage.getItem("RedirectData"));
    const formMetaData = JSON.parse(localStorage.getItem("FormMetadata"));
    let avalnumber = redirectData.avalnumber
    let subject = redirectData.subject
    console.log('avalnumber', redirectData.avalnumber);
    console.log('subject', redirectData.subject);
    const limitsubjects = redirectData.formList[avalnumber].subjects.length;
    const limitforms = redirectData.formList.length;
    if (redirectData.type == 'form') {
      if (redirectData.formList[avalnumber].subjects[subject].owner) {
        let data = {
          request_id: formMetaData.request_id,
          form_id: redirectData.formList[avalnumber].subjects[subject].owner.form_id,
          metadata: redirectData.formList[avalnumber].subjects[subject].owner,
          dataRequest: formMetaData.dataRequest,
          customer: formMetaData.customer
        }
        let newRedirectData = {
          avalnumber: avalnumber,
          subject: subject,
          formList: redirectData.formList,
          lastrequest: redirectData.lastrequest,
          type: 'owner'
        }
        let persons = {
          persons: null,
          currentsubject: redirectData.formList[avalnumber].subjects[subject],
        }
        persons.persons = this.groupSubjectsList(redirectData.formList[avalnumber].subjects)

        localStorage.setItem('persons_customer', JSON.stringify(persons));
        localStorage.setItem('RedirectData', JSON.stringify(newRedirectData))
        localStorage.setItem("FormMetadata", JSON.stringify(data));

        window.location.reload()
      } else {
        if (subject + 1 < limitsubjects) {
          let data = {
            request_id: formMetaData.request_id,
            form_id: redirectData.formList[avalnumber].subjects[subject + 1].form_id,
            metadata: redirectData.formList[avalnumber].subjects[subject + 1],
            dataRequest: formMetaData.dataRequest,
            customer: formMetaData.customer
          }
          let newRedirectData = {
            avalnumber: avalnumber,
            subject: subject + 1,
            formList: redirectData.formList,
            lastrequest: redirectData.lastrequest,
            type: 'form'
          }
          let persons = {
            persons: null,
            currentsubject: redirectData.formList[avalnumber].subjects[subject + 1],
          }
          persons.persons = this.groupSubjectsList(redirectData.formList[avalnumber].subjects)

          localStorage.setItem('persons_customer', JSON.stringify(persons));
          localStorage.setItem('RedirectData', JSON.stringify(newRedirectData))
          localStorage.setItem("FormMetadata", JSON.stringify(data));
          window.location.reload()
        } else if (avalnumber + 1 < limitforms) {
          let data = {
            request_id: formMetaData.request_id,
            form_id: redirectData.formList[avalnumber + 1].subjects[0].form_id,
            metadata: redirectData.formList[avalnumber + 1].subjects[0],
            dataRequest: formMetaData.dataRequest,
            customer: formMetaData.customer,
          }
          let newRedirectData = {
            avalnumber: avalnumber + 1,
            subject: 0,
            formList: redirectData.formList,
            lastrequest: redirectData.lastrequest,
            type: 'form'
          }
          let persons = {
            persons: null,
            currentsubject: redirectData.formList[avalnumber + 1].subjects[0],
          }
          persons.persons = this.groupSubjectsList(redirectData.formList[avalnumber + 1].subjects)
          localStorage.setItem('persons_customer', JSON.stringify(persons));
          localStorage.setItem('RedirectData', JSON.stringify(newRedirectData))
          localStorage.setItem("FormMetadata", JSON.stringify(data));
          window.location.reload()
        } else {
          //no aplica tenemos que regresar
          this.router.navigate(["my-profile"]);
        }
      }
    } else {
      if (subject + 1 < limitsubjects) {
        let data = {
          request_id: formMetaData.request_id,
          form_id: redirectData.formList[avalnumber].subjects[subject + 1].form_id,
          metadata: redirectData.formList[avalnumber].subjects[subject + 1],
          dataRequest: formMetaData.dataRequest,
          customer: formMetaData.customer
        }
        let newRedirectData = {
          avalnumber: avalnumber,
          subject: subject + 1,
          formList: redirectData.formList,
          lastrequest: redirectData.lastrequest,
          type: 'form'
        }
        let persons = {
          persons: null,
          currentsubject: redirectData.formList[avalnumber].subjects[subject + 1],
        }
        persons.persons = this.groupSubjectsList(redirectData.formList[avalnumber].subjects)
        localStorage.setItem('persons_customer', JSON.stringify(persons));
        localStorage.setItem('RedirectData', JSON.stringify(newRedirectData))
        localStorage.setItem("FormMetadata", JSON.stringify(data));
        window.location.reload()
      } else if (avalnumber + 1 < limitforms) {
        let data = {
          request_id: formMetaData.request_id,
          form_id: redirectData.formList[avalnumber + 1].subjects[0].form_id,
          metadata: redirectData.formList[avalnumber + 1].subjects[0],
          dataRequest: formMetaData.dataRequest,
          customer: formMetaData.customer,
        }
        let newRedirectData = {
          avalnumber: avalnumber + 1,
          subject: 0,
          formList: redirectData.formList,
          lastrequest: redirectData.lastrequest,
          type: 'form'
        }
        let persons = {
          persons: null,
          currentsubject: redirectData.formList[avalnumber + 1].subjects[0],
        }
        persons.persons = this.groupSubjectsList(redirectData.formList[avalnumber + 1].subjects)
        localStorage.setItem('persons_customer', JSON.stringify(persons));
        localStorage.setItem('RedirectData', JSON.stringify(newRedirectData))
        localStorage.setItem("FormMetadata", JSON.stringify(data));
        window.location.reload()
      } else {
        //no aplica tenemos que regresar
        this.router.navigate(["my-profile"]);
      }
    }


    // let redirectData={

    // }

    // this.activatedRoute.snapshot.url.push();

    //lo siguiente que tenemos que hacer 
  }
  getMunicipalities() {
    const municipalities = [];
    this.mysqlService.GetMunicipalities().subscribe(
      (response) => {
        Object.keys(response.data).forEach(function (k) {
          municipalities.push({
            id: response.data[k].municipality_id,
            name: response.data[k].name,
            department: response.data[k].department_id,
          });
        });
      },
      (error) => {
        console.log("error");
      }
    );
    return municipalities;
  }

  onChangeDeudores(deviceValue) {
    //console.log('aasd', this.dataDeudores);
    this.dataDeudores.forEach((element) => {
      if (element.id_debtor == deviceValue) {
        this.FormDebtors.patchValue({
          //deb_social_reason: element.tradename,
          deb_nit: element.nit,
          deb_comercial_name: element.business_name,
          deb_phones: element.phone,
          deb_comercial_address: element.comercial_address,
          deb_charge_address: element.collection_address,
        });
        return;
      }
    });
    //console.log('asdfsd '+deviceValue);
  }

  ChangeCashSales(value) {
    //console.log('asdfasdf',value);
    this.FormSales.patchValue({
      credit_sales: 100 - value,
    });
  }

  ChangeLocalSales(value) {
    //console.log('asdfasdf',value);
    this.FormSales.patchValue({
      exports_sales: 100 - value,
    });
  }

  ChangeCashPurchases(value) {
    //console.log('asdfasdf',value);
    this.FormPurchases.patchValue({
      credit_purchases: 100 - value,
    });
  }

  ChangeLocalPurchases(value) {
    //console.log('asdfasdf',value);
    this.FormPurchases.patchValue({
      exports_purchases: 100 - value,
    });
  }
  formatDate(date) {

    let dateAux = new Date(date);
    let userTimezoneOffset = dateAux.getTimezoneOffset() * 60000;
    let realDate = new Date(dateAux.getTime() + userTimezoneOffset);
    /* console.log('dateAux::',dateAux);
    console.log("userTimezoneOffset:: ",userTimezoneOffset);
    console.log("realDate:: ",realDate) */
    let month = "" + (realDate.getMonth() + 1);
    let day = "" + realDate.getDate();
    const year = realDate.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    /* console.log([year, month, day].join("-")); */
    return [year, month, day].join("-");
  }


  isFormFeicValid() {
    debugger
    if (!this.FormFEICGeneral)
      return false;
    if (!this.FormFEIC)
      return false;

    let resp: boolean = false;



    if (

      this.FormFEICGeneral.controls.feic_country.value != null && this.FormFEICGeneral.controls.feic_country.value != '' &&
      this.FormFEIC.controls.feic_country_birth.value != null && this.FormFEIC.controls.feic_country_birth.value != '' &&
      /* this.FormFEIC.controls.feic_dep_birth.value != null && this.FormFEIC.controls.feic_dep_birth.value != '' &&
      this.FormFEIC.controls.feic_muni_birth.value != null && this.FormFEIC.controls.feic_muni_birth.value != '' && */
      this.FormFEIC.controls.feic_f_lastname.value != null && this.FormFEIC.controls.feic_f_lastname.value != '' &&
      /*this.FormFEIC.controls.feic_s_lastname.value != null && this.FormFEIC.controls.feic_s_lastname.value != '' &&*/
      this.FormFEIC.controls.feic_firstname.value != null && this.FormFEIC.controls.feic_firstname.value != '' &&
      /*this.FormFEIC.controls.feic_secondname.value != null && this.FormFEIC.controls.feic_secondname.value != '' &&*/
      this.FormFEIC.controls.feic_fecnac.value != null && this.FormFEIC.controls.feic_fecnac.value != '' &&
      this.FormFEIC.controls.feic_nationality.value != null && this.FormFEIC.controls.feic_nationality.value != '' &&
      /* this.FormFEIC.controls.feic_migration_condition.value != null && this.FormFEIC.controls.feic_migration_condition.value != '' && */
      this.FormFEIC.controls.feic_gen.value != null && this.FormFEIC.controls.feic_gen.value != '' &&
      this.FormFEIC.controls.feic_civil_status.value != null && this.FormFEIC.controls.feic_civil_status.value != '' &&
      this.FormFEIC.controls.feic_profesion.value != null && this.FormFEIC.controls.feic_profesion.value != '' &&
      this.FormFEIC.controls.feic_iddoc_type.value != null && this.FormFEIC.controls.feic_iddoc_type.value != '' &&
      this.FormFEIC.controls.feic_iddoc_num.value != null && this.FormFEIC.controls.feic_iddoc_num.value != '' &&
      this.FormFEIC.controls.feic_iddoc_emision_country.value != null && this.FormFEIC.controls.feic_iddoc_emision_country.value != '' &&
      this.FormFEIC.controls.feic_nit.value != null && this.FormFEIC.controls.feic_nit.value != '' &&
      // this.FormFEIC.controls.feic_phone.value != null && this.FormFEIC.controls.feic_phone.value != '' &&
      // this.FormFEIC.controls.feic_movil.value != null && this.FormFEIC.controls.feic_movil.value != '' &&
      this.FormFEIC.controls.feic_email.value != null && this.FormFEIC.controls.feic_email.value != '' &&
      this.FormFEIC.controls.feic_address.value != null && this.FormFEIC.controls.feic_address.value != '' &&
      /*this.FormFEIC.controls.feic_address_zone.value != null && this.FormFEIC.controls.feic_address_zone.value != '' &&*/
      this.FormFEIC.controls.feic_address_country.value != null && this.FormFEIC.controls.feic_address_country.value != ''

    ) {
      resp = true;
    }
    else {
      return false;
    }
    if (this.FormFEICGeneral.controls.feic_country.value == 'GUATEMALA') {
      if (this.FormFEICGeneral.controls.feic_dep.value != null && this.FormFEICGeneral.controls.feic_dep.value != '' &&
        this.FormFEICGeneral.controls.feic_muni.value != null && this.FormFEICGeneral.controls.feic_muni.value != null) {
        resp = true;
      }
      else {
        return false;
      }
    }

    //VALIDACIONES DEL PERFIL ECONOMICO TRNSACCIONAL
    if (this.selecionRelacionDeDependencia != -1) {
      if (this.FormFEIC.controls.feic_eco_company_sector.valid
        && this.FormFEIC.controls.feic_eco_company_name.valid
        && this.FormFEIC.controls.feic_eco_phones.valid
        && this.FormFEIC.controls.feic_eco_rol.valid
        && this.FormFEIC.controls.feic_eco_company_address.valid
        && this.FormFEIC.controls.feic_eco_company_country.valid
        && this.FormFEIC.controls.feic_eco_company_zone.valid
        && this.FormFEIC.controls.feic_eco_company_activity.valid
        && this.FormFEIC.controls.feic_eco_company_income.valid
        && this.FormFEIC.controls.feic_eco_company_income.valid
      ) {
        resp = true;
      }
      else {
        return false;
      }
      if (this.selecionCountry7 == 'GUATEMALA') {
        if (this.FormFEIC.controls.feic_eco_company_dep.valid
          && this.FormFEIC.controls.feic_eco_company_mun.valid
        ) {
          resp = true;
        }
        else {
          return false;
        }

      }

    }
    if (this.selecionNegocioPropio != -1) {
      if (this.FormFEIC.controls.feic_eco_owncomp_name.valid
        && this.FormFEIC.controls.feic_eco_owncomp_phones.valid
        && this.FormFEIC.controls.feic_eco_owncomp_nit.valid
        && this.FormFEIC.controls.feic_eco_owncomp_op_fec.valid
        && this.FormFEIC.controls.feic_eco_owncomp_business.valid
        && this.FormFEIC.controls.feic_eco_owncomp_income.valid
        && this.FormFEIC.controls.feic_eco_owncomp_address.valid
        && this.FormFEIC.controls.feic_eco_owncomp_zone.valid
        && this.FormFEIC.controls.feic_eco_owncomp_country.valid
        && this.FormFEIC.controls.feic_eco_owncomp_activity.valid
      ) {
        resp = true;
      }
      else {
        return false;
      }
      if (this.selecionCountry8 == 'GUATEMALA') {
        if (this.FormFEIC.controls.feic_eco_owncomp_dep.valid
          && this.FormFEIC.controls.feic_eco_owncomp_mun.valid
        ) {
          resp = true;
        }
        else {
          return false;
        }

      }
    }
    if (this.FormFEIC.errors) {
      return false
    }
    return resp;
  }
  changeIva() {
    if (this.Form_other_data.value.iva_holder == 1) {
      this.Form_other_data.controls["iva_percentage"].enable();
      // this.Form_other_data.value.iva_percentage.enable();
    } else {
      this.Form_other_data.controls["iva_percentage"].disable();
      //this.Form_other_data.value.iva_percentage.disable();
    }
  }

  changeIsr() {
    if (this.Form_other_data.value.isr_holder == 1) {
      this.Form_other_data.controls["isr_percentage"].enable();
      //this.Form_other_data.value.isr_percentage.enable();
    } else {
      this.Form_other_data.controls["isr_percentage"].disable();
      //this.Form_other_data.value.isr_percentage.enable();
    }
  }
  changeSales() {
    if (this.FormSales.value.sales_foreign_currency == 1) {
      this.FormSales.controls["sales_foreign_currency_origin"].enable();
      //this.Form_other_data.value.isr_percentage.enable();
    } else {
      this.FormSales.controls["sales_foreign_currency_origin"].disable();
      //this.Form_other_data.value.isr_percentage.enable();
    }
  }

  changePurchases() {
    if (this.FormPurchases.value.purchases_foreign_currency == 1) {
      this.FormPurchases.controls["purchases_foreign_currency_origin"].enable();
      //this.Form_other_data.value.isr_percentage.enable();
    } else {
      this.FormPurchases.controls[
        "purchases_foreign_currency_origin"
      ].disable();
      //this.Form_other_data.value.isr_percentage.enable();
    }
  }
  async DeleteSomeData(id, resource) {
    await this.mysqlService
      .DeleteSomeGeneralData(id, resource)
      .toPromise()
      .then(async (res) => {
        await this.ngOnInit();
        this.toastr.success("Se elimino el registro.", "Eliminación Correcta!");
        //console.log("res", res);
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas al eliminar la información.", "Oops!");
      });

  }
  async UpdateServicesFEIC() {
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    let arrayinfo = [];
    this.FormUpdateServiceFEIC.value.feic_product_id = this.CurrentServiceFeic;
    arrayinfo.push(this.FormUpdateServiceFEIC.value);
    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: { feic_services: arrayinfo },
      })
      .toPromise()
      .then(async (res) => {
        //console.log("res", res);
        //this.FormUpdateCompanys.reset({});
        this.modalService.dismissAll();
        this.toastr.success("Se cambio el estado.", "Estado Cambio!");
        if (datalocal.form_id == null) {
          datalocal.form_id = res.data.form_id;
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        await this.ngOnInit();
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }


  selectNotDefault(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      //console.log('control:: '+control.value);
      if (control.value == -1 || control.value == '-1')
        return { 'no selected': true };
      else
        return null;
    }

  }
  GetGeneralData() {
    this.spinner.show();
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    this.getFormSave(datalocal.form_id)
    if (datalocal.form_id != null) {
      this.mysqlService
        .GetGeneralData(datalocal.form_id)
        .pipe(map((res) => {

          //console.log(res);
          //console.log("LO que viene de seguros en res::");
          //console.log(res.data.insurances);

          res.data.insurances.forEach((element) => {
            this.insuranceData[element.risk_type] = element;
          });
          //console.log("res", this.dataAssociates);
          this.Form_request_doc.patchValue({
            doc_request_name: res.data.doc_request_name,
            doc_request_email: res.data.doc_request_email,
            doc_request_phone: res.data.doc_request_phone,
          });


          this.Form_chargues.patchValue({
            charges_request_name: res.data.charges_request_name,
            charges_request_email: res.data.charges_request_email,
            charges_request_phone: res.data.charges_request_phone,
          });
          this.Form_track_record_and_sales.patchValue({
            time_in_business: res.data.time_in_business,
            last_year_sales: res.data.last_year_sales,
          })

          /* OTHER DATA FORM */

          console.log('Mandando Res data', res.data);
          this.Form_other_data_contact.patchValue({
            email_send_fact: res.data.email_send_fact,
            email_send_fact_name: res.data.email_send_fact_name,
            email_send_fact_phone: res.data.email_send_fact_phone,
            email_isr: res.data.email_isr,
            email_isr_name: res.data.email_isr_name,
            email_isr_phone: res.data.email_isr_phone,
            email_accounting: res.data.email_accounting,
            email_accounting_name: res.data.email_accounting_name,
            email_accounting_phone: res.data.email_accounting_phone,
          })

          this.Form_other_data.patchValue({
            iva_holder: String(res.data.iva_holder),
            iva_percentage: res.data.iva_percentage,
            isr_holder: String(res.data.isr_holder),
            isr_percentage: res.data.isr_percentage,
            rep_marry_lastname: res.data.rep_marry_lastname,
            rep_s_lastname: res.data.rep_s_lastname,
            rep_f_lastname: res.data.rep_f_lastname,
            rep_other_name: res.data.rep_other_name,
            rep_secondname: res.data.rep_secondname,
            rep_firstname: res.data.rep_firstname,
            rep_notarialact_position: res.data.rep_notarialact_position,
            position_held: res.data.position_held,
            //iva_percentage: res.data.iva_percentage,
            owncompany_name: res.data.owncompany_name,
            entity_website: res.data.entity_website,
            // email_send_fact: res.data.email_send_fact,
            // email_send_fact_name: res.data.email_send_fact_name,
            // email_send_fact_phone: res.data.email_send_fact_phone,
            // email_isr: res.data.email_isr,
            // email_isr_name: res.data.email_isr_name,
            // email_isr_phone: res.data.email_isr_phone,
            // email_accounting: res.data.email_accounting,
            // email_accounting_name: res.data.email_accounting_name,
            // email_accounting_phone: res.data.email_accounting_phone,
            //Formulario Representantes
            /* rep_f_lastname: res.data.rep_f_lastname,
             rep_s_lastname: res.data.rep_s_lastname,
             rep_marry_lastname: res.data.rep_marry_lastname,
             rep_firstname: res.data.rep_firstname,
             rep_secondname: res.data.rep_secondname,
             rep_other_name: res.data.rep_other_name,*/
            rep_fecnac: this.formatDate(res.data.rep_fecnac),
            rep_nationality: res.data.rep_nationality,
            rep_other_nationality: res.data.rep_other_nationality,
            rep_place_birth: res.data.rep_place_birth,
            rep_migration_status: String(res.data.rep_migration_status),
            rep_other_migration_status: res.data.rep_other_migration_status,
            rep_genre: String(res.data.rep_genre),
            rep_marital_status: res.data.rep_marital_status,
            rep_profesion: res.data.rep_profesion,
            rep_id_document_type: res.data.rep_id_document_type,
            rep_id_number: res.data.rep_id_number,
            rep_id_emission_dep: res.data.rep_id_emission_dep,
            rep_id_emission_muni: res.data.rep_id_emission_muni,
            rep_id_emission_country: res.data.rep_id_emission_country,
            rep_nit: res.data.rep_nit,
            rep_phone: res.data.rep_phone,
            rep_cellphone: res.data.rep_cellphone,
            rep_email: res.data.rep_email,
            rep_particular_address: res.data.rep_particular_address,
            rep_zone: res.data.rep_zone,
            rep_dep: res.data.rep_dep,
            rep_muni: res.data.rep_muni,
            rep_country: res.data.rep_country,
            economic_sector: res.data.economic_sector,
            economic_antivity: res.data.economic_antivity,
            //iva_holder: res.data.iva_holder,
            rep_notarialact_inscription_number:
              res.data.rep_notarialact_inscription_number,
            rep_notarialact_fecini: this.formatDate(
              res.data.rep_notarialact_fecini
            ),
            rep_notarialact_fecend: this.formatDate(
              res.data.rep_notarialact_fecend
            ),
            rep_notarialact_notary: res.data.rep_notarialact_notary,
            rep_acts_likes_mandatory: String(res.data.rep_acts_likes_mandatory),
            rep_registry_name: res.data.rep_registry_name,
            rep_registry_number: res.data.rep_registry_number,
            rep_registry_folio: res.data.rep_registry_folio,
            rep_registry_book: res.data.rep_registry_book,
            rep_act_only_forentity: String(res.data.rep_act_only_forentity),
            rep_individual_f_lastname: res.data.rep_individual_f_lastname,
            rep_individual_s_lastname: res.data.rep_individual_s_lastname,
            rep_individual_marry_lastname:
              res.data.rep_individual_marry_lastname,
            rep_individual_firstname: res.data.rep_individual_firstname,
            rep_individual_secondname: res.data.rep_individual_secondname,
            rep_individual_other_name: res.data.rep_individual_other_name,
            rep_individual_genre: String(res.data.rep_individual_genre),
            rep_individual_comercialname: res.data.rep_individual_comercialname,
            rep_individual_fecnac: this.formatDate(
              res.data.rep_individual_fecnac
            ),
            rep_individual_country: res.data.rep_individual_country,
            rep_individual_other_nationality:
              res.data.rep_individual_other_nationality,
            rep_individual_id_document_type:
              res.data.rep_individual_id_document_type,
            rep_individual_id_document_number:
              res.data.rep_individual_id_document_number,
            rep_individual_id_document_emission_country:
              res.data.rep_individual_id_document_emission_country,
            rep_individual_nit: res.data.rep_individual_nit,
            rep_individual_phone: res.data.rep_individual_phone,
            rep_individual_cellphone: res.data.rep_individual_cellphone,
            rep_individual_pep: String(res.data.rep_individual_pep),
            rep_individual_pep_type: res.data.rep_individual_pep_type,
            rep_individual_pep_type_other:
              res.data.rep_individual_pep_type_other,
            rep_individual_pep_relatives: String(
              res.data.rep_individual_pep_relatives
            ),
            rep_individual_pep_close_person: String(
              res.data.rep_individual_pep_close_person
            ),

          });

          if (res.data.rep_country != 'GUATEMALA') {
            this.Form_other_data.controls.rep_muni.clearValidators()
            this.Form_other_data.controls.rep_muni.updateValueAndValidity()
            //this.Form_other_data.disable()
          }
          this.selecionCountry12 = res.data.rep_id_emission_country;
          this.selecionDepartment12 = res.data.rep_id_emission_dep;

          this.selecionDepartment12ID = this.selecionDepartment12 ? this.optionsDepartments.find(dep => dep.name == this.selecionDepartment12).id : -1;
          this.Form_other_data.controls['rep_id_emission_dep'].setValue(this.selecionDepartment12ID)
          this.selecionMunicipality12 = res.data.rep_id_emission_muni;

          this.selecionMunicipality12ID = this.selecionMunicipality12 ? this.optionsMunicipalities.find(muni => muni.name == this.selecionMunicipality12).id : -1;
          this.Form_other_data.controls['rep_id_emission_muni'].setValue(this.selecionMunicipality12ID)

          this.selecionCountry13 = res.data.rep_country;
          this.selecionDepartment13 = res.data.rep_dep;
          this.selecionDepartment13ID = this.selecionDepartment13 ? this.optionsDepartments.find(dep => dep.name == this.selecionDepartment13).id : -1;
          this.selecionMunicipality13 = res.data.rep_muni;
          this.selecionMunicipality13ID = this.selecionMunicipality13 ? this.optionsMunicipalities.find(muni => muni.name == this.selecionMunicipality13).id : -1;


          if (res.data.rep_acts_likes_mandatory == 1) {
            this.Form_other_data.controls["rep_registry_name"].enable();
            this.Form_other_data.controls[
              "rep_registry_number"
            ].enable();
            this.Form_other_data.controls["rep_registry_folio"].enable();
            this.Form_other_data.controls["rep_registry_book"].enable();
          } else if (res.data.rep_acts_likes_mandatory == 0) {
            this.Form_other_data.controls["rep_registry_name"].disable();
            this.Form_other_data.controls[
              "rep_registry_number"
            ].disable();
            this.Form_other_data.controls[
              "rep_registry_folio"
            ].disable();
            this.Form_other_data.controls["rep_registry_book"].disable();
          }



          this.changeIsr();
          this.changeIva();

          this.dataAssociates = res.data.associates;


          this.dataDirectors = res.data.directors;


          this.dataBankaccount = res.data.bank_accounts;


          this.dataBankLoans = res.data.bank_loans;
          this.FormBankLoans.patchValue({
            contain: String(res.data.btn_2),
          });


          if (res.data.btn_2 == 0) {
            this.FormBankLoans.controls["bank"].disable();
            this.FormBankLoans.controls["loan_number"].disable();
            this.FormBankLoans.controls["warranty"].disable();
            this.FormBankLoans.controls["amount_awarded"].disable();
            this.FormBankLoans.controls["time"].disable();
            this.FormBankLoans.controls["balance"].disable();
          }
          this.FormCountryOperations.patchValue({
            country_operation: String(res.data.btn_country_operation)
          })
          if (res.data.btn_country_operation == 0 || res.data.btn_country_operation == -1) {
            this.FormCountryOperations.controls["year_sales"].disable();
            this.FormCountryOperations.controls["country"].disable();
          }
          this.FormFactoring.controls.contain.setValue(res.data.btn_3 + "");

          this.dataFactoring = res.data.factorings;

          if (res.data.btn_3 == 0 || res.data.btn_3 == -1) {

            this.FormFactoring.controls["entity"].disable();
            this.FormFactoring.controls["warranty"].disable();
            this.FormFactoring.controls["amount_awarded"].disable();
            this.FormFactoring.controls["amount_used"].disable();
            this.FormFactoring.controls["balance"].disable();
          }

          this.dataSupplier = res.data.suppliers;


          this.dataCustomer = res.data.clients;
          this.dataInsurances = res.data.insurances;
          this.FormProductServices.patchValue({
            productions_commerce: res.data.productions_commerce,
            brands: res.data.brands,
            first_quarter: res.data.first_quarter,
            second_quarter: res.data.second_quarter,
            third_quarter: res.data.third_quarter,
            fourth_quarter: res.data.fourth_quarter,
          });



          this.FormMarketSegment.patchValue({
            market_segment: res.data.market_segment,
            competitors: res.data.competitors,
            market_percentage: res.data.market_percentage,
            distribution_channels: res.data.distribution_channels,
          });



          this.dataCountryoperations = res.data.country_operations;


          this.FormProductServices.patchValue({
            productions_commerce: res.data.productions_commerce,
            brands: res.data.brands,
            first_quarter: res.data.first_quarter,
            second_quarter: res.data.second_quarter,
            third_quarter: res.data.third_quarter,
            fourth_quarter: res.data.fourth_quarter,
          });
          this.dataOperativeStructure = [];
          let contStructure = 0;
          if (
            res.data.ceo_name != "" &&
            res.data.ceo_name != null &&
            res.data.ceo_time != "" &&
            res.data.ceo_time != null
          ) {
            this.dataOperativeStructure.push({
              id: "1",
              ceo_name: res.data.ceo_name,
              ceo_time: res.data.ceo_time,
            });
            contStructure++;
          }
          if (
            res.data.finance_ceo_name != "" &&
            res.data.finance_ceo_name != null &&
            res.data.finance_ceo_time != "" &&
            res.data.finance_ceo_time != null
          ) {
            this.dataOperativeStructure.push({
              id: "2",
              ceo_name: res.data.finance_ceo_name,
              ceo_time: res.data.finance_ceo_time,
            });
            contStructure++;
          }
          if (
            res.data.rh_ceo_name != "" &&
            res.data.rh_ceo_time != "" &&
            res.data.rh_ceo_name != null &&
            res.data.rh_ceo_time != null
          ) {
            this.dataOperativeStructure.push({
              id: "3",
              ceo_name: res.data.rh_ceo_name,
              ceo_time: res.data.rh_ceo_time,
            });
            contStructure++;
          }
          if (
            res.data.op_ceo_name != "" &&
            res.data.op_ceo_time != "" &&
            res.data.op_ceo_name != null &&
            res.data.op_ceo_time != null
          ) {
            this.dataOperativeStructure.push({
              id: "4",
              ceo_name: res.data.op_ceo_name,
              ceo_time: res.data.op_ceo_time,
            });
            contStructure++;
          }
          if (
            res.data.sales_ceo_name != "" &&
            res.data.sales_ceo_time != "" &&
            res.data.sales_ceo_name != null &&
            res.data.sales_ceo_time != null
          ) {
            this.dataOperativeStructure.push({
              id: "5",
              ceo_name: res.data.sales_ceo_name,
              ceo_time: res.data.sales_ceo_time,
            });
            contStructure++;
          }
          if (
            res.data.credit_ceo_name != "" &&
            res.data.credit_ceo_time != "" &&
            res.data.credit_ceo_name != null &&
            res.data.credit_ceo_time != null
          ) {
            this.dataOperativeStructure.push({
              id: "6",
              ceo_name: res.data.credit_ceo_name,
              ceo_time: res.data.credit_ceo_time,
            });
            contStructure++;
          }
          if (
            res.data.prod_ceo_name != "" &&
            res.data.prod_ceo_time != "" &&
            res.data.prod_ceo_name != null &&
            res.data.prod_ceo_time != null
          ) {
            this.dataOperativeStructure.push({
              id: "7",
              ceo_name: res.data.prod_ceo_name,
              ceo_time: res.data.prod_ceo_time,
            });
            contStructure++;
          }




          this.FormSales.patchValue({
            cash_sales: res.data.cash_sales,
            credit_sales: res.data.credit_sales,
            local_sales: res.data.local_sales,
            exports_sales: res.data.exports_sales,
            sales_foreign_currency: String(res.data.sales_foreign_currency),
            sales_foreign_currency_origin:
              res.data.sales_foreign_currency_origin,
          });


          this.FormPurchases.patchValue({
            cash_purchases: res.data.cash_purchases,
            credit_purchases: res.data.credit_purchases,
            local_purchases: res.data.local_purchases,
            exports_purchases: res.data.exports_purchases,
            purchases_foreign_currency: String(
              res.data.purchases_foreign_currency
            ),
            purchases_foreign_currency_origin: String(
              res.data.purchases_foreign_currency_origin
            ),
          });



          this.changePurchases();
          this.changeSales();
          //this.changeHasBussiness();

          this.Formobligatedperson.patchValue({
            social_reason_comercial_name: res.data.social_reason_comercial_name,
            agency_name: res.data.agency_name,
            agency_code: res.data.agency_code,
          });

          if (res.data.name_entity == null) {

            this.FormRequestEntity.patchValue({
              entity_type: res.data.entity_type,
              name_entity: res.data.businessname,
              comercial_name: res.data.businessname,
              economic_antivity: res.data.economic_antivity,
              ive_02_nit: res.data.nit,
              constitution_country: res.data.constitution_country,
              address_site: res.data.address_site
            });
            this.onChangeSelectorEntityType(res.data.entity_type);
          }
          else {
            this.FormRequestEntity.patchValue({
              entity_type: res.data.entity_type,
              //entity_type_especification: res.data.entity_type_especification,
              name_entity: res.data.name_entity,
              comercial_name: res.data.comercial_name,
              economic_antivity: res.data.economic_antivity,
              ive_02_nit: res.data.ive_02_nit,
              constitution_country: res.data.constitution_country,
              address_site: res.data.address_site
            });
            this.onChangeSelectorEntityType(res.data.entity_type);
          }

          this.FormPublicConstitution.patchValue({
            constitution_doc_num: res.data.constitution_doc_num,
            constitution_doc_date: this.formatDate(
              res.data.constitution_doc_date
            ),
            constitution_doc_notari: res.data.constitution_doc_notari,
          });



          this.FormModPublicConstitution.patchValue({
            mod_constitution_doc_num: res.data.mod_constitution_doc_num,
            mod_constitution_doc_date: this.formatDate(
              res.data.mod_constitution_doc_date
            ),
            mod_constitution_doc_notari: res.data.mod_constitution_doc_notari,
          });



          this.FormSocietyPatent.patchValue({
            society_patent_num: res.data.society_patent_num,
            society_patent_folio: res.data.society_patent_folio,
            society_patent_book: res.data.society_patent_book,
            society_patent_record_num: res.data.society_patent_record_num,
          });


          this.FormCompanyPatent.patchValue({
            company_patent_num: res.data.company_patent_num,
            company_patent_folio: res.data.company_patent_folio,
            company_patent_book: res.data.company_patent_book,
            company_patent_record_num: res.data.company_patent_record_num,
          });



          this.FormGovernmental.patchValue({
            governmental_num: res.data.governmental_num,
            governmental_date: this.formatDate(res.data.governmental_date),
            governmental_autority: res.data.governmental_autority,
          });



          this.FormRecord.patchValue({
            record_name: res.data.record_name,
            record_num: res.data.record_num,
            record_folio: res.data.record_folio,
            record_book: res.data.record_book,
          });



          this.FormHeadOffice.patchValue({
            zone_site: res.data.zone_site,
            department_site: res.data.department_site,
            muni_site: res.data.muni_site,
            country_site: res.data.country_site,
            entity_phone: res.data.entity_phone,
            entity_website: res.data.entity_website,
            entity_email: res.data.entity_email,
            entity_cpe: String(res.data.entity_cpe),
          });

          if (res.data.country_site && res.data.country_site == 'GUATEMALA') {
            this.FormHeadOffice.get('department_site').enable();
            this.FormHeadOffice.get('muni_site').enable();
          }
          else {
            this.FormHeadOffice.get('department_site').disable();
            this.FormHeadOffice.get('muni_site').disable();
          }
          this.selecionCountry2 = res.data.country_site;
          this.selecionDepartment2 = res.data.department_site;
          this.selecionDepartment2ID = this.selecionDepartment2 ? this.optionsDepartments.find(dep => dep.name == this.selecionDepartment2).id : -1;
          this.selecionMunicipality2 = res.data.muni_site;
          this.selecionMunicipality2ID = this.selecionMunicipality2 ? this.optionsMunicipalities.find(muni => muni.name == this.selecionMunicipality2).id : -1;



          this.dataComercialCompany = res.data.comercial_companys;


          this.dataFinancials = res.data.financials;


          this.dataMember = res.data.members;


          if (res.data.total_income == 5) {
            this.FormFinancialInformation.controls[
              "total_income_amount"
            ].enable();
          } else if (res.data.total_income != 5) {
            this.FormFinancialInformation.controls[
              "total_income_amount"
            ].disable();
          }

          if (res.data.total_expenses == 5) {
            this.FormFinancialInformation.controls[
              "total_expenses_amount"
            ].enable();
          } else if (res.data.total_expenses != 5) {
            this.FormFinancialInformation.controls[
              "total_expenses_amount"
            ].disable();
          }

          this.FormFinancialInformation.patchValue({
            shareholder_more_than_ten: String(
              res.data.shareholder_more_than_ten
            ),
            foreign_shareholder_more_than_ten: String(
              res.data.foreign_shareholder_more_than_ten
            ),
            comercial_activity: res.data.comercial_activity === null ? res.data.economic_antivity : res.data.comercial_activity,
            agencies_number: res.data.agencies_number,
            employees_number: res.data.employees_number,
            income_currency_type: res.data.income_currency_type,
            other_income_currency_type: res.data.other_income_currency_type,
            expenses_currency_type: res.data.expenses_currency_type,
            other_expenses_currency_type: res.data.other_expenses_currency_type,
            total_income: String(res.data.total_income),
            total_income_amount: res.data.total_income_amount,
            total_expenses: String(res.data.total_expenses),
            total_expenses_amount: res.data.total_expenses_amount,
          });



          this.dataCompanies = res.data.companys;




          if (String(res.data.holding)) {
            this.FormCompanys.patchValue({
              holding: String(res.data.holding),
            });
          }

          if (res.data.holding == 1) {
            this.FormCompanys.controls["comercial_name"].enable();
            this.FormCompanys.controls["relation"].enable();
            this.FormCompanys.controls["sector"].enable();
            this.FormCompanys.controls["nit"].enable();
            this.FormCompanys.controls["holding_name"].enable();
            this.FormCompanys.controls["country"].enable();
            this.FormCompanys.controls["comercial_activity"].enable();
            //this.Form_other_data.value.isr_percentage.enable();
          } else {
            this.FormCompanys.controls["comercial_name"].disable();
            this.FormCompanys.controls["relation"].disable();
            this.FormCompanys.controls["sector"].disable();
            this.FormCompanys.controls["nit"].disable();
            this.FormCompanys.controls["holding_name"].disable();
            this.FormCompanys.controls["country"].disable();
            this.FormCompanys.controls["comercial_activity"].disable();
          }

          this.FormFinancialInformation.controls[
            "other_income_currency_type"
          ].disable();
          this.FormFinancialInformation.controls[
            "other_expenses_currency_type"
          ].disable();

          const isArray: FormArray = this.formcheckbox.get(
            "isArray"
          ) as FormArray;

          if (
            res.data.income_currency_type != null &&
            res.data.income_currency_type != ""
          ) {
            JSON.parse(res.data.income_currency_type).forEach((element) => {
              isArray.push(new FormControl(`${element}`));
              if (element == 0) {
                this.Currencychecboxes[0].status = true;
              } else if (element == 1) {
                this.Currencychecboxes[1].status = true;
              } else if (element == 2) {
                this.Currencychecboxes[2].status = true;
              } else if (element == 3) {
                this.Currencychecboxes[3].status = true;
                this.FormFinancialInformation.controls[
                  "other_income_currency_type"
                ].enable();
              }
            });
          }

          const isArray1: FormArray = this.formcheckboxexpenses.get(
            "isArray"
          ) as FormArray;

          if (
            res.data.expenses_currency_type != null &&
            res.data.expenses_currency_type != ""
          ) {
            JSON.parse(res.data.expenses_currency_type).forEach((element) => {
              isArray1.push(new FormControl(`${element}`));
              if (element == 0) {
                this.Currencychecboxesexpenses[0].status = true;
              } else if (element == 1) {
                this.Currencychecboxesexpenses[1].status = true;
              } else if (element == 2) {
                this.Currencychecboxesexpenses[2].status = true;
              } else if (element == 3) {
                this.Currencychecboxesexpenses[3].status = true;
                this.FormFinancialInformation.controls[
                  "other_expenses_currency_type"
                ].enable();
              }
            });
          }

          const isArray2: FormArray = this.formoriginmoney.get(
            "isArray"
          ) as FormArray;

          if (
            res.data.rep_individual_pep_type != null &&
            res.data.rep_individual_pep_type != ""
          ) {
            JSON.parse(res.data.rep_individual_pep_type).forEach((element) => {
              isArray2.push(new FormControl(`${element}`));
              if (element == 0) {
                this.originMoneyChecboxes[0].status = true;
              } else if (element == 1) {
                this.originMoneyChecboxes[1].status = true;
              } else if (element == 2) {
                this.originMoneyChecboxes[2].status = true;
              } else if (element == 3) {
                this.originMoneyChecboxes[3].status = true;
              } else if (element == 4) {
                this.originMoneyChecboxes[4].status = true;
              } else if (element == 5) {
                this.originMoneyChecboxes[5].status = true;
              } else if (element == 6) {
                this.originMoneyChecboxes[6].status = true;
              }
            });
          }
          if (res.data.rep_id_emission_country && res.data.rep_id_emission_country == "GUATEMALA") {
            this.FormRepresentativeData.get('rep_id_emission_dep').enable();
            this.FormRepresentativeData.get('rep_id_emission_muni').enable();

          }
          else {
            this.FormRepresentativeData.get('rep_id_emission_dep').disable();
            this.FormRepresentativeData.get('rep_id_emission_muni').disable();
          }

          if (res.data.rep_country && res.data.rep_country == "GUATEMALA") {
            this.FormRepresentativeData.get('rep_dep').enable();
            this.FormRepresentativeData.get('rep_muni').enable();

          }
          else {
            this.FormRepresentativeData.get('rep_dep').disable();
            this.FormRepresentativeData.get('rep_muni').disable();
          }

          this.FormRepresentativeData.patchValue({
            rep_f_lastname: res.data.rep_f_lastname,
            rep_s_lastname: res.data.rep_s_lastname,
            rep_marry_lastname: res.data.rep_marry_lastname,
            rep_firstname: res.data.rep_firstname,
            rep_secondname: res.data.rep_secondname,
            rep_other_name: res.data.rep_other_name,
            rep_fecnac: this.formatDate(res.data.rep_fecnac),
            rep_nationality: res.data.rep_nationality,
            rep_other_nationality: res.data.rep_other_nationality,
            rep_place_birth: res.data.rep_place_birth,
            rep_migration_status: String(res.data.rep_migration_status),
            rep_other_migration_status: res.data.rep_other_migration_status,
            rep_genre: String(res.data.rep_genre),
            rep_marital_status: res.data.rep_marital_status,
            rep_profesion: res.data.rep_profesion,
            rep_id_document_type: res.data.rep_id_document_type,
            rep_id_number: res.data.rep_id_number,
            rep_id_emission_dep: res.data.rep_id_emission_dep,
            rep_id_emission_muni: res.data.rep_id_emission_muni,
            rep_id_emission_country: res.data.rep_id_emission_country,
            rep_nit: res.data.rep_nit,
            rep_phone: res.data.rep_phone,
            rep_cellphone: res.data.rep_cellphone,
            rep_email: res.data.rep_email,
            rep_particular_address: res.data.rep_particular_address,
            rep_zone: res.data.rep_zone,
            rep_dep: res.data.rep_dep,
            rep_muni: res.data.rep_muni,
            rep_country: res.data.rep_country,
            rep_notarialact_inscription_number:
              res.data.rep_notarialact_inscription_number,
            rep_notarialact_fecini: this.formatDate(
              res.data.rep_notarialact_fecini
            ),
            rep_notarialact_fecend: this.formatDate(
              res.data.rep_notarialact_fecend
            ),
            rep_notarialact_notary: res.data.rep_notarialact_notary,
            rep_notarialact_position: res.data.rep_notarialact_position,
            rep_acts_likes_mandatory: String(res.data.rep_acts_likes_mandatory),
            rep_registry_name: res.data.rep_registry_name,
            rep_registry_number: res.data.rep_registry_number,
            rep_registry_folio: res.data.rep_registry_folio,
            rep_registry_book: res.data.rep_registry_book,
            rep_act_only_forentity: String(res.data.rep_act_only_forentity),
            rep_individual_f_lastname: res.data.rep_individual_f_lastname,
            rep_individual_s_lastname: res.data.rep_individual_s_lastname,
            rep_individual_marry_lastname:
              res.data.rep_individual_marry_lastname,
            rep_individual_firstname: res.data.rep_individual_firstname,
            rep_individual_secondname: res.data.rep_individual_secondname,
            rep_individual_other_name: res.data.rep_individual_other_name,
            rep_individual_genre: String(res.data.rep_individual_genre),
            rep_individual_comercialname: res.data.rep_individual_comercialname,
            rep_individual_fecnac: this.formatDate(
              res.data.rep_individual_fecnac
            ),
            rep_individual_country: res.data.rep_individual_country,
            rep_individual_other_nationality:
              res.data.rep_individual_other_nationality,
            rep_individual_id_document_type:
              res.data.rep_individual_id_document_type,
            rep_individual_id_document_number:
              res.data.rep_individual_id_document_number,
            rep_individual_id_document_emission_country:
              res.data.rep_individual_id_document_emission_country,
            rep_individual_nit: res.data.rep_individual_nit,
            rep_individual_phone: res.data.rep_individual_phone,
            rep_individual_cellphone: res.data.rep_individual_cellphone,
            rep_individual_pep: String(res.data.rep_individual_pep),
            rep_individual_pep_type: res.data.rep_individual_pep_type,
            rep_individual_pep_type_other:
              res.data.rep_individual_pep_type_other,
            rep_individual_pep_relatives: String(
              res.data.rep_individual_pep_relatives
            ),
            rep_individual_pep_close_person: String(
              res.data.rep_individual_pep_close_person
            ),
          });

          if (res.data.rep_id_emission_country && res.data.rep_id_emission_country == 'GUATEMALA') {
            this.FormRepresentativeData.get('rep_id_emission_dep').enable();
            this.FormRepresentativeData.get('rep_id_emission_muni').enable();
          }
          else {
            this.FormRepresentativeData.get('rep_id_emission_dep').disable();
            this.FormRepresentativeData.get('rep_id_emission_muni').disable();
          }

          this.selecionCountry3 = res.data.rep_id_emission_country;
          this.selecionDepartment3 = res.data.rep_id_emission_dep;
          debugger
          this.selecionDepartment3ID = this.selecionDepartment3 ? this.optionsDepartments.find(dep => dep.name == this.selecionDepartment3).id : null;
          this.FormRepresentativeData.controls['rep_id_emission_dep'].setValue(this.selecionDepartment3ID)
          this.selecionMunicipality3 = res.data.rep_id_emission_muni;
          this.selecionMunicipality3ID = this.selecionMunicipality3 ? this.optionsMunicipalities.find(muni => muni.name == this.selecionMunicipality3).id : null;
          this.FormRepresentativeData.controls['rep_id_emission_muni'].setValue(this.selecionMunicipality3ID)

          this.selecionCountry4 = res.data.rep_country;
          this.selecionDepartment4 = res.data.rep_dep;
          this.selecionDepartment4ID = this.selecionDepartment4 ? this.optionsDepartments.find(dep => dep.name == this.selecionDepartment4).id : -1;
          this.selecionMunicipality4 = res.data.rep_muni;
          this.selecionMunicipality4ID = this.selecionMunicipality4 ? this.optionsMunicipalities.find(muni => muni.name == this.selecionMunicipality4).id : -1;


          if (res.data.rep_acts_likes_mandatory == 1) {
            this.FormRepresentativeData.controls["rep_registry_name"].enable();
            this.FormRepresentativeData.controls[
              "rep_registry_number"
            ].enable();
            this.FormRepresentativeData.controls["rep_registry_folio"].enable();
            this.FormRepresentativeData.controls["rep_registry_book"].enable();
          } else if (res.data.rep_acts_likes_mandatory == 0) {
            this.FormRepresentativeData.controls["rep_registry_name"].disable();
            this.FormRepresentativeData.controls[
              "rep_registry_number"
            ].disable();
            this.FormRepresentativeData.controls[
              "rep_registry_folio"
            ].disable();
            this.FormRepresentativeData.controls["rep_registry_book"].disable();
          }

          if (res.data.rep_act_only_forentity == 0) {
            this.FormRepresentativeData.controls[
              "rep_individual_f_lastname"
            ].enable();
            this.FormRepresentativeData.controls[
              "rep_individual_s_lastname"
            ].enable();
            this.FormRepresentativeData.controls[
              "rep_individual_marry_lastname"
            ].enable();
            this.FormRepresentativeData.controls[
              "rep_individual_firstname"
            ].enable();
            this.FormRepresentativeData.controls[
              "rep_individual_secondname"
            ].enable();
            this.FormRepresentativeData.controls[
              "rep_individual_other_name"
            ].enable();
            this.FormRepresentativeData.controls[
              "rep_individual_genre"
            ].enable();
            this.FormRepresentativeData.controls[
              "rep_individual_comercialname"
            ].enable();
            this.FormRepresentativeData.controls[
              "rep_individual_fecnac"
            ].enable();
            this.FormRepresentativeData.controls[
              "rep_individual_country"
            ].enable();
            this.FormRepresentativeData.controls[
              "rep_individual_other_nationality"
            ].enable();
            this.FormRepresentativeData.controls[
              "rep_individual_id_document_type"
            ].enable();
            this.FormRepresentativeData.controls[
              "rep_individual_id_document_number"
            ].enable();
            this.FormRepresentativeData.controls[
              "rep_individual_id_document_emission_country"
            ].enable();
            this.FormRepresentativeData.controls["rep_individual_nit"].enable();
            this.FormRepresentativeData.controls[
              "rep_individual_phone"
            ].enable();
            this.FormRepresentativeData.controls[
              "rep_individual_cellphone"
            ].enable();
          } else if (res.data.rep_act_only_forentity == 1) {
            this.FormRepresentativeData.controls[
              "rep_individual_f_lastname"
            ].disable();
            this.FormRepresentativeData.controls[
              "rep_individual_s_lastname"
            ].disable();
            this.FormRepresentativeData.controls[
              "rep_individual_marry_lastname"
            ].disable();
            this.FormRepresentativeData.controls[
              "rep_individual_firstname"
            ].disable();
            this.FormRepresentativeData.controls[
              "rep_individual_secondname"
            ].disable();
            this.FormRepresentativeData.controls[
              "rep_individual_other_name"
            ].disable();
            this.FormRepresentativeData.controls[
              "rep_individual_genre"
            ].disable();
            this.FormRepresentativeData.controls[
              "rep_individual_comercialname"
            ].disable();
            this.FormRepresentativeData.controls[
              "rep_individual_fecnac"
            ].disable();
            this.FormRepresentativeData.controls[
              "rep_individual_country"
            ].disable();
            this.FormRepresentativeData.controls[
              "rep_individual_other_nationality"
            ].disable();
            this.FormRepresentativeData.controls[
              "rep_individual_id_document_type"
            ].disable();
            this.FormRepresentativeData.controls[
              "rep_individual_id_document_number"
            ].disable();
            this.FormRepresentativeData.controls[
              "rep_individual_id_document_emission_country"
            ].disable();
            this.FormRepresentativeData.controls[
              "rep_individual_nit"
            ].disable();
            this.FormRepresentativeData.controls[
              "rep_individual_phone"
            ].disable();
            this.FormRepresentativeData.controls[
              "rep_individual_cellphone"
            ].disable();
          }

          const isArray3: FormArray = this.formSourceFound.get(
            "isArray"
          ) as FormArray;
          this.FormProductService.controls["prod_serv_entity_loan"].disable();
          this.FormProductService.controls[
            "prod_serv_entity_account"
          ].disable();
          this.FormProductService.controls["prod_serv_other"].disable();
          if (
            res.data.prod_serv_source_found != null &&
            res.data.prod_serv_source_found != ""
          ) {
            JSON.parse(res.data.prod_serv_source_found).forEach((element) => {
              isArray3.push(new FormControl(`${element}`));
              if (element == 0) {
                this.originSourceFound[0].status = true;
              } else if (element == 1) {
                this.originSourceFound[1].status = true;
              } else if (element == 2) {
                this.originSourceFound[2].status = true;
              } else if (element == 3) {
                this.originSourceFound[3].status = true;
              } else if (element == 4) {
                this.originSourceFound[4].status = true;
              } else if (element == 5) {
                this.originSourceFound[5].status = true;
              } else if (element == 6) {
                this.originSourceFound[6].status = true;
              } else if (element == 7) {
                this.originSourceFound[7].status = true;
              } else if (element == 8) {
                this.originSourceFound[8].status = true;
              } else if (element == 9) {
                this.originSourceFound[9].status = true;
              } else if (element == 10) {
                this.originSourceFound[10].status = true;
              } else if (element == 11) {
                this.originSourceFound[11].status = true;
              } else if (element == 12) {
                this.originSourceFound[12].status = true;
              } else if (element == 13) {
                this.originSourceFound[13].status = true;
              } else if (element == 14) {
                this.originSourceFound[14].status = true;
              } else if (element == 15) {
                this.originSourceFound[15].status = true;
                this.FormProductService.controls[
                  "prod_serv_entity_loan"
                ].enable();
              } else if (element == 16) {
                this.originSourceFound[16].status = true;
                this.FormProductService.controls[
                  "prod_serv_entity_account"
                ].enable();
              } else if (element == 17) {
                this.originSourceFound[17].status = true;
                this.FormProductService.controls["prod_serv_other"].enable();
              }
            });
          }
          if (!this.originSourceFound[15].status) {
            this.FormProductService.controls.prod_serv_entity_loan.disable();
          }
          if (!this.originSourceFound[16].status) {
            this.FormProductService.controls.prod_serv_entity_account.disable();
          }
          if (!this.originSourceFound[17].status) {
            this.FormProductService.controls.prod_serv_other.disable();
          }

          this.FormProductService.patchValue({
            /* prod_serv_product_type: res.data.prod_serv_product_type,
            prod_serv_product_name: res.data.prod_serv_product_name,
            prod_serv_currency: res.data.prod_serv_currency,
            prod_serv_cover: String(res.data.prod_serv_cover), */
            prod_serv_desciption: res.data.prod_serv_desciption,
            //prod_serv_person: res.data.prod_serv_person,
            /* prod_serv_initial_amount: res.data.prod_serv_initial_amount, */
            /* prod_serv_monthly_amount: res.data.prod_serv_monthly_amount, */
            prod_serv_purpose: res.data.prod_serv_purpose,
            prod_serv_source_found: res.data.prod_serv_source_found,
            prod_serv_entity_loan: res.data.prod_serv_entity_loan,
            prod_serv_entity_account: res.data.prod_serv_entity_account,
            prod_serv_other: res.data.prod_serv_other,
            prod_serv_transfers: String(res.data.prod_serv_transfers),
            prod_serv_transfers_level: String(
              res.data.prod_serv_transfers_level
            ),
            prod_serv_other_signers: String(res.data.prod_serv_other_signers),
            prod_serv_coments: res.data.prod_serv_coments,
          });

          if (String(res.data.prod_serv_transfers) == "0") {
            this.FormProductService.controls[
              "prod_serv_transfers_level"
            ].disable();
          }



          this.FormCPE.patchValue({
            cpe_individual_person: res.data.cpe_individual_person,
            cpe_entity: String(res.data.cpe_entity),
            cpe_other_sginers: String(res.data.cpe_other_sginers),
            cpe_legal_rep: String(res.data.cpe_legal_rep),
            cpe_person_f_lastname: res.data.cpe_person_f_lastname,
            cpe_person_s_lastname: res.data.cpe_person_s_lastname,
            cpe_person_marry_lastname: res.data.cpe_person_marry_lastname,
            cpe_person_firstname: res.data.cpe_person_firstname,
            cpe_person_secondname: res.data.cpe_person_secondname,
            cpe_person_othername: res.data.cpe_person_othername,
            cpe_comercial_name: res.data.cpe_comercial_name,
            cpe_condition: String(res.data.cpe_condition),
            cpe_is_cpe: String(res.data.cpe_is_cpe),
            cpe_service_is_in_finances: String(
              res.data.cpe_service_is_in_finances
            ),
            cpe_have_services_with_obligate_person: String(
              res.data.cpe_have_services_with_obligate_person
            ),
            spe_guatecompras_status: String(res.data.spe_guatecompras_status),
            fec_is_cpe: String(res.data.fec_is_cpe)
          });

          this.cpe_data_array = JSON.parse(res.data.cpe_data);





          /* console.log(res.data); */
          let deb = null;
          if (res.data.deb_nit && res.data.deb_social_reason) {
            deb = this.dataDeudores.find(d => d.nit == res.data.deb_nit && d.business_name.toLowerCase() == res.data.deb_social_reason.toLowerCase());

          }


          this.FormDebtors.patchValue({
            deb_social_reason: deb ? deb.id_debtor : null,
            deb_nit: res.data.deb_nit,
            cpe_category_services: res.data.cpe_category_services,
            deb_comercial_name: res.data.deb_comercial_name,
            deb_phones: res.data.deb_phones,
            deb_comercial_address: res.data.deb_comercial_address,
            deb_charge_address: res.data.deb_charge_address,
            deb_principal_activity: res.data.deb_principal_activity,
            deb_contact: res.data.deb_contact,
            deb_credit_days: res.data.deb_credit_days,
            deb_pay_days: res.data.deb_pay_days,
            deb_pay_schedule: res.data.deb_pay_schedule,
            deb_pay_form: String(res.data.deb_pay_form),
            deb_bank_name: res.data.deb_bank_name,
            deb_iva: String(res.data.deb_iva),
            deb_iva_percentage: res.data.deb_iva_percentage,
            deb_isr: String(res.data.deb_isr),
            deb_isr_percentage: res.data.deb_isr_percentage ? +res.data.deb_isr_percentage : '',
            deb_emit_pass: String(res.data.deb_emit_pass),
            deb_web_age: res.data.deb_web_age,
            deb_belongs_com_group: String(res.data.deb_belongs_com_group),
            deb_pay_confirmation: res.data.deb_pay_confirmation,
            deb_comercial_relation_time: res.data.deb_comercial_relation_time,
            deb_product: res.data.deb_product,
            debs_monthly_ave_purchases: res.data.debs_monthly_ave_purchases,
            deb_direct_phone: res.data.deb_direct_phone,
            deb_email1_bill_confirmation: res.data.deb_email1_bill_confirmation,
            deb_email2_bill_confirmation: res.data.deb_email2_bill_confirmation,
          });

          // if (res.data.deb_iva == 0) {
          //   this.FormDebtors.controls.deb_iva_percentage.disable();
          // }



          this.FormMinute.patchValue({
            acta_hour: res.data.acta_hour,
            acta_notary_name: res.data.acta_notary_name,
            acta_notary_constituido: String(res.data.acta_notary_constituido),
            acta_constituido_address: res.data.acta_constituido_address,
            acta_age: res.data.acta_age,
            acta_dpi_letters: res.data.acta_dpi_letters,
            acta_dpi_numbers: res.data.acta_dpi_numbers,
            acta_date: this.formatDate(res.data.acta_date),
            acta_autorize_in: res.data.acta_autorize_in,
            acta_notary_autorize_gen: String(res.data.acta_notary_autorize_gen),
            acta_notary_autorize_name: res.data.acta_notary_autorize_name,
            acta_registry: res.data.acta_registry,
            acta_folio: res.data.acta_folio,
            acta_book: res.data.acta_book,
            acta_sight_doc: String(res.data.acta_sight_doc),
            acta_autorize_date: this.formatDate(res.data.acta_autorize_date),
            acta_autorize_person: String(res.data.acta_autorize_person),
            acta_authorize_name: res.data.acta_authorize_name,
            acta_authorize_assembly_date: this.formatDate(
              res.data.acta_authorize_assembly_date
            ),
            acta_agenda_number_point: res.data.acta_agenda_number_point,
            acta_rep_legal_gender: String(res.data.acta_rep_legal_gender),
            acta_credit_amount: res.data.acta_credit_amount,
            acta_lead_time: res.data.acta_lead_time,
            acta_person_who_authorize: String(
              res.data.acta_person_who_authorize
            ),
            acta_authorize_hour: res.data.acta_authorize_hour,
            acta_pages_number: res.data.acta_pages_number,
            acta_page_form: String(res.data.acta_page_form),
          });

          this.FormInsurance.patchValue({
            contain: String(res.data.btn_insurance)
          });


          //FEIC
          if (!this.flagFeic) {
            this.FormFEICGeneral.patchValue({
              feic_country: res.data.feic_country,
              feic_dep: res.data.feic_dep,
              feic_muni: res.data.feic_muni,
              feic_client_acts_own_behalf: res.data.feic_client_acts_own_behalf,
              feic_behalf: res.data.feic_behalf

            });

            if (res.data.feic_client_acts_own_behalf == null || String(res.data.feic_client_acts_own_behalf) == "1") {
              this.FormFEIC.controls["feicp_f_lastname"].disable();
              this.FormFEIC.controls["feicp_s_lastname"].disable();
              this.FormFEIC.controls["feicp_marry_lastname"].disable();
              this.FormFEIC.controls["feicp_firstname"].disable();
              this.FormFEIC.controls["feicp_secondname"].disable();
              this.FormFEIC.controls["feicp_other_name"].disable();
              this.FormFEIC.controls["feicp_gen"].disable();
              this.FormFEIC.controls["feicp_comercial_name"].disable();
              this.FormFEIC.controls["feicp_fecnac"].disable();
              this.FormFEIC.controls["feicp_contitutution_or_nationality"].disable();
              this.FormFEIC.controls["feicp_other_nationality"].disable();
              this.FormFEIC.controls["feicp_iddoc_type"].disable();
              this.FormFEIC.controls["feicp_iddoc_num"].disable();
              this.FormFEIC.controls["feicp_iddoc_emision_country"].disable();
              this.FormFEIC.controls["feicp_nit"].disable();
              this.FormFEIC.controls["feicp_phone"].disable();
              this.FormFEIC.controls["feicp_movilphone"].disable();
              this.FormFEIC.controls["fecp_ispep"].disable();
              this.FormFEIC.controls["fecp_iscpe"].disable();
              this.FormFEICGeneral.controls['feic_behalf'].disable();
            }
            else {
              this.FormFEIC.controls["feicp_f_lastname"].enable();
              this.FormFEIC.controls["feicp_s_lastname"].enable();
              this.FormFEIC.controls["feicp_marry_lastname"].enable();
              this.FormFEIC.controls["feicp_firstname"].enable();
              this.FormFEIC.controls["feicp_secondname"].enable();
              this.FormFEIC.controls["feicp_other_name"].enable();
              this.FormFEIC.controls["feicp_gen"].enable();
              this.FormFEIC.controls["feicp_comercial_name"].enable();
              this.FormFEIC.controls["feicp_fecnac"].enable();
              this.FormFEIC.controls["feicp_contitutution_or_nationality"].enable();
              this.FormFEIC.controls["feicp_other_nationality"].enable();
              this.FormFEIC.controls["feicp_iddoc_type"].enable();
              this.FormFEIC.controls["feicp_iddoc_num"].enable();
              this.FormFEIC.controls["feicp_iddoc_emision_country"].enable();
              this.FormFEIC.controls["feicp_nit"].enable();
              this.FormFEIC.controls["feicp_phone"].enable();
              this.FormFEIC.controls["feicp_movilphone"].enable();
              this.FormFEIC.controls["fecp_ispep"].enable();
              this.FormFEIC.controls["fecp_iscpe"].enable();
              this.FormFEICGeneral.controls['feic_behalf'].enable();

            }
            if (res.data.feic_country != null) {
              if (res.data.feic_country == 'GUATEMALA') {

                this.FormFEICGeneral.get('feic_dep').enable();
                this.FormFEICGeneral.get('feic_muni').enable();
              }
              else {
                this.FormFEICGeneral.get('feic_dep').disable();
                this.FormFEICGeneral.get('feic_muni').disable();

              }

            }
            else {
              this.FormFEICGeneral.get('feic_dep').disable();
              this.FormFEICGeneral.get('feic_muni').disable();
            }
            //ESTO ES PARA LOS CAMPOS DE LA INFOMRACION ECONOMICA
            if (res.data.feic_client_economic_info) {
              let dataClientEconomic = JSON.parse(res.data.feic_client_economic_info);
              //console.log("dataClientEconomic:: ");
              //console.log(dataClientEconomic);
              let iaux = -1;
              for (let i = 0; i < dataClientEconomic.length; i++) {
                this.feic_income_source[i].sector = dataClientEconomic[i].sector;
                this.feic_income_source[i].amount = dataClientEconomic[i].amount;
                this.feic_income_source[i].enabled = true;
                iaux = i;
              }
              this.activeFeicIncomeSource = iaux != -1 && iaux < 4 ? this.feic_income_source[iaux + 1] : null;
              if (this.activeFeicIncomeSource) {
                this.activeFeicIncomeSource.enabled = true;
              }
              else {
                if (iaux == -1) {
                  this.activeFeicIncomeSource = this.feic_income_source[0];
                }
              }
            }
            else {
              //console.log('Entro....')
              this.activeFeicIncomeSource = this.feic_income_source[0];
            }

            const isArray4: FormArray = this.formRichpep.get(
              "isArray"
            ) as FormArray;
            isArray4.clear();
            /*  this.RichPepchexboxes.forEach(r=>{
               isArray4.push(new FormControl(`${r.value}`));
             }) */

            if (
              res.data.feic_pep_wealth_origin != null &&
              res.data.feic_pep_wealth_origin != ""
            ) {
              /* console.log('res.data.feic_pep_wealth_origin:: ' + res.data.feic_pep_wealth_origin); */
              JSON.parse(res.data.feic_pep_wealth_origin).forEach((element) => {
                /*  let aux = isArray4[parseInt(element)]; */

                if (element == 0) {
                  this.RichPepchexboxes[0].status = true;
                } else if (element == 1) {
                  this.RichPepchexboxes[1].status = true;
                } else if (element == 2) {
                  this.RichPepchexboxes[2].status = true;
                } else if (element == 3) {
                  this.RichPepchexboxes[3].status = true;
                } else if (element == 4) {
                  this.RichPepchexboxes[4].status = true;
                } else if (element == 5) {
                  this.RichPepchexboxes[5].status = true;
                }
              });
            }

            const isArray5: FormArray = this.formSourceIncome.get(
              "isArray"
            ) as FormArray;



            if (
              res.data.feic_source_income != null &&
              res.data.feic_source_income != ""
            ) {

              JSON.parse(res.data.feic_source_income).forEach((element) => {
                isArray5.push(new FormControl(`${element}`));
                if (element == 0) {
                  //console.log('ENTRO A selecionRelacionDeDependencia =1');
                  this.SourceIncomechexboxes[0].status = true;
                  this.selecionRelacionDeDependencia = 1;
                  this.FormFEIC.get('feic_eco_company_sector').enable();
                  this.FormFEIC.get('feic_eco_company_name').enable();
                  this.FormFEIC.get('feic_eco_phones').enable();
                  this.FormFEIC.get('feic_eco_rol').enable();
                  this.FormFEIC.get('feic_eco_company_address').enable();
                  this.FormFEIC.get('feic_eco_company_country').enable();
                  this.FormFEIC.get('feic_eco_company_dep').enable();
                  this.FormFEIC.get('feic_eco_company_mun').enable();
                  this.FormFEIC.get('feic_eco_company_zone').enable();
                  this.FormFEIC.get('feic_eco_company_activity').enable();
                  this.FormFEIC.get('feic_eco_company_income').enable();
                  this.FormFEIC.get('feic_eco_company_currency').enable();
                } else if (element == 1) {
                  this.SourceIncomechexboxes[1].status = true;
                  this.selecionNegocioPropio = 1;
                  // console.log('ENTRO A selecionNegocioPropio = 1');
                  this.FormFEIC.get('feic_eco_owncomp_name').enable();
                  this.FormFEIC.get('feic_eco_owncomp_phones').enable();
                  this.FormFEIC.get('feic_eco_owncomp_nit').enable();
                  this.FormFEIC.get('feic_eco_owncomp_op_fec').enable();
                  this.FormFEIC.get('feic_eco_owncomp_business').enable();
                  this.FormFEIC.get('feic_eco_owncomp_pat_num').enable();
                  this.FormFEIC.get('feic_eco_owncomp_pat_folio').enable();
                  this.FormFEIC.get('feic_eco_owncomp_pat_book').enable();
                  this.FormFEIC.get('feic_eco_owncomp_pat_num_exp').enable();
                  this.FormFEIC.get('feic_eco_owncomp_income').enable();
                  this.FormFEIC.get('feic_eco_owncomp_currency').enable();
                  this.FormFEIC.get('feic_eco_owncomp_activity').enable();
                  this.FormFEIC.get('feic_eco_owncomp_address').enable();
                  this.FormFEIC.get('feic_eco_owncomp_zone').enable();
                  this.FormFEIC.get('feic_eco_owncomp_country').enable();
                } else if (element == 2) {
                  this.SourceIncomechexboxes[2].status = true;
                  this.selecionOtras = 1;
                  // console.log('selecionOtras = 1;');
                  this.FormFEIC.get('feic_eco_other_profesional_activity').enable();
                  this.FormFEIC.get('feic_eco_other_alimony').enable();
                  this.FormFEIC.get('feic_eco_other_rent').enable();
                  this.FormFEIC.get('feic_eco_other_retirement').enable();
                  /* this.FormFEIC.get('feic_eco_oher_aprox_income').enable(); */
                  /* this.FormFEIC.get('feic_eco_other_total_income').enable(); */
                  this.FormFEIC.get('feic_eco_other_specific').enable();
                  this.FormFEIC.get('feic_eco_other_profesional_activity_income').enable();
                  this.FormFEIC.get('feic_eco_other_alimony_income').enable();
                  this.FormFEIC.get('feic_eco_other_rent_income').enable();
                  this.FormFEIC.get('feic_eco_other_retirement_income').enable();
                  this.FormFEIC.get('feic_eco_other_income_income').enable();
                  this.FormFEIC.get('feic_eco_other_profesional_activity_curency').enable();
                  this.FormFEIC.get('feic_eco_other_alimony_curency').enable();
                  this.FormFEIC.get('feic_eco_other_rent_curency').enable();
                  this.FormFEIC.get('feic_eco_other_retirement_curency').enable();
                  this.FormFEIC.get('feic_eco_other_income_curency').enable();
                }
              });
            }
            if (this.selecionNegocioPropio == -1) {
              this.FormFEIC.get('feic_eco_owncomp_name').disable();
              this.FormFEIC.get('feic_eco_owncomp_phones').disable();
              this.FormFEIC.get('feic_eco_owncomp_nit').disable();
              this.FormFEIC.get('feic_eco_owncomp_op_fec').disable();
              this.FormFEIC.get('feic_eco_owncomp_business').disable();
              this.FormFEIC.get('feic_eco_owncomp_pat_num').disable();
              this.FormFEIC.get('feic_eco_owncomp_pat_folio').disable();
              this.FormFEIC.get('feic_eco_owncomp_pat_book').disable();
              this.FormFEIC.get('feic_eco_owncomp_pat_num_exp').disable();
              this.FormFEIC.get('feic_eco_owncomp_income').disable();
              this.FormFEIC.get('feic_eco_owncomp_currency').disable();
              this.FormFEIC.get('feic_eco_owncomp_activity').disable();
              this.FormFEIC.get('feic_eco_owncomp_address').disable();
              this.FormFEIC.get('feic_eco_owncomp_zone').disable();
              this.FormFEIC.get('feic_eco_owncomp_country').disable();
              this.FormFEIC.get('feic_eco_owncomp_dep').disable();
              this.FormFEIC.get('feic_eco_owncomp_mun').disable();

            }
            if (this.selecionRelacionDeDependencia == -1) {
              this.FormFEIC.get('feic_eco_company_sector').disable();
              this.FormFEIC.get('feic_eco_company_name').disable();
              this.FormFEIC.get('feic_eco_phones').disable();
              this.FormFEIC.get('feic_eco_rol').disable();
              this.FormFEIC.get('feic_eco_company_address').disable();
              this.FormFEIC.get('feic_eco_company_country').disable();
              this.FormFEIC.get('feic_eco_company_dep').disable();
              this.FormFEIC.get('feic_eco_company_mun').disable();
              this.FormFEIC.get('feic_eco_company_zone').disable();
              this.FormFEIC.get('feic_eco_company_activity').disable();
              this.FormFEIC.get('feic_eco_company_income').disable();
              this.FormFEIC.get('feic_eco_company_currency').disable();

            }
            if (this.selecionOtras == -1) {
              this.FormFEIC.get('feic_eco_other_profesional_activity').disable();
              this.FormFEIC.get('feic_eco_other_alimony').disable();
              this.FormFEIC.get('feic_eco_other_rent').disable();
              this.FormFEIC.get('feic_eco_other_retirement').disable();
              /* this.FormFEIC.get('feic_eco_oher_aprox_income').disable(); */
              /* this.FormFEIC.get('feic_eco_other_total_income').disable(); */
              this.FormFEIC.get('feic_eco_other_specific').disable();
              this.FormFEIC.get('feic_eco_other_profesional_activity_income').disable();
              this.FormFEIC.get('feic_eco_other_alimony_income').disable();
              this.FormFEIC.get('feic_eco_other_rent_income').disable();
              this.FormFEIC.get('feic_eco_other_retirement_income').disable();
              this.FormFEIC.get('feic_eco_other_income_income').disable();
              this.FormFEIC.get('feic_eco_other_profesional_activity_curency').disable();
              this.FormFEIC.get('feic_eco_other_alimony_curency').disable();
              this.FormFEIC.get('feic_eco_other_rent_curency').disable();
              this.FormFEIC.get('feic_eco_other_retirement_curency').disable();
              this.FormFEIC.get('feic_eco_other_income_curency').disable();
            }
            this.fecPepsRelativeVar = String(res.data.fec_peps_relative);
            this.fecPepsPartnerVar = String(res.data.fec_peps_partener);


            this.FormFEIC.patchValue({

              feic_f_lastname: res.data.feic_f_lastname,
              feic_s_lastname: res.data.feic_s_lastname,
              feic_marry_lastname: res.data.feic_marry_lastname,
              feic_firstname: res.data.feic_firstname,
              feic_secondname: res.data.feic_secondname,
              feic_other_name: res.data.feic_other_name,
              feic_fecnac: this.formatDate(res.data.feic_fecnac),
              feic_country_birth: res.data.feic_country_birth,
              feic_dep_birth: res.data.feic_dep_birth,
              feic_muni_birth: res.data.feic_muni_birth,
              feic_nationality: res.data.feic_nationality,
              feic_other_nat: res.data.feic_other_nat,
              feic_migration_condition: res.data.feic_migration_condition,
              feic_migration_especific: res.data.feic_migration_especific,
              feic_gen: String(res.data.feic_gen),
              feic_civil_status: res.data.feic_civil_status,
              feic_profesion: res.data.feic_profesion,
              feic_iddoc_type: res.data.feic_iddoc_type,
              feic_iddoc_num: res.data.feic_iddoc_num,
              feic_iddoc_emision_dep: res.data.feic_iddoc_emision_dep,
              feic_iddoc_emision_mun: res.data.feic_iddoc_emision_mun,
              feic_iddoc_emision_country: res.data.feic_iddoc_emision_country,
              feic_nit: res.data.feic_nit,
              feic_phone: res.data.feic_phone,
              feic_movil: res.data.feic_movil,
              feic_email: res.data.feic_email,
              feic_address: res.data.feic_address,
              feic_address_zone: res.data.feic_address_zone,
              feic_address_dep: res.data.feic_address_dep,
              feic_address_mun: res.data.feic_address_mun,
              feic_address_country: res.data.feic_address_country,
              feicp_f_lastname: res.data.feicp_f_lastname,
              feicp_s_lastname: res.data.feicp_s_lastname,
              feicp_marry_lastname: res.data.feicp_marry_lastname,
              feicp_firstname: res.data.feicp_firstname,
              feicp_secondname: res.data.feicp_secondname,
              feicp_other_name: res.data.feicp_other_name,
              feicp_gen: String(res.data.feicp_gen),
              feicp_comercial_name: res.data.feicp_comercial_name,
              feicp_fecnac: this.formatDate(res.data.feicp_fecnac),
              feicp_contitutution_or_nationality: res.data.feicp_contitutution_or_nationality,
              feicp_other_nationality: res.data.feicp_other_nationality,
              feicp_iddoc_type: res.data.feicp_iddoc_type,
              feicp_iddoc_num: res.data.feicp_iddoc_num,
              feicp_iddoc_emision_dep: res.data.feicp_iddoc_emision_dep,
              feicp_iddoc_emision_country: res.data.feicp_iddoc_emision_country,
              feicp_nit: res.data.feicp_nit,
              feicp_phone: res.data.feicp_phone,
              feicp_movilphone: res.data.feicp_movilphone,
              fecp_ispep: String(res.data.fecp_ispep),
              fecp_iscpe: String(res.data.fecp_iscpe),
              fec_ispep: String(res.data.fec_ispep),
              feic_pep_wealth_origin: res.data.feic_pep_wealth_origin,
              fec_peps_relative: String(res.data.fec_peps_relative),
              fec_peps_partener: String(res.data.fec_peps_partener),
              fec_is_cpe: String(res.data.fec_is_cpe),
              feic_workref_name1: res.data.feic_workref_name1,
              feic_workref_phone1: res.data.feic_workref_phone1,
              feic_workref_movil1: res.data.feic_workref_movil1,
              feic_workref_name2: res.data.feic_workref_name2,
              feic_workref_phone2: res.data.feic_workref_phone2,
              feic_workref_movil2: res.data.feic_workref_movil2,
              feic_ref_name1: res.data.feic_ref_name1,
              feic_ref_phone1: res.data.feic_ref_phone1,
              feic_ref_movil1: res.data.feic_ref_movil1,
              feic_ref_name2: res.data.feic_ref_name2,
              feic_ref_phone2: res.data.feic_ref_phone2,
              feic_ref_movil2: res.data.feic_ref_movil2,
              feic_pep_entity: res.data.feic_pep_entity,
              feic_pep_role: res.data.feic_pep_role,
              feic_pep_country_entity: res.data.feic_pep_country_entity,
              feic_pep_wealth_especific: res.data.feic_pep_wealth_especific,
              feic_source_income: res.data.feic_source_income,
              feic_eco_company_sector: res.data.feic_eco_company_sector,
              feic_eco_company_name: res.data.feic_eco_company_name,
              feic_eco_phones: res.data.feic_eco_phones,
              feic_eco_rol: res.data.feic_eco_rol,
              feic_eco_company_address: res.data.feic_eco_company_address,
              feic_eco_company_zone: res.data.feic_eco_company_zone,
              feic_eco_company_dep: res.data.feic_eco_company_dep,
              feic_eco_company_mun: res.data.feic_eco_company_mun,
              feic_eco_company_country: res.data.feic_eco_company_country,
              feic_eco_company_activity: res.data.feic_eco_company_activity,
              feic_eco_company_income: res.data.feic_eco_company_income,
              feic_eco_owncomp_name: res.data.feic_eco_owncomp_name,
              feic_eco_owncomp_phones: res.data.feic_eco_owncomp_phones,
              feic_eco_owncomp_nit: res.data.feic_eco_owncomp_nit,
              feic_eco_owncomp_op_fec: this.formatDate(
                res.data.feic_eco_owncomp_op_fec
              ),
              feic_eco_owncomp_business: res.data.feic_eco_owncomp_business,
              feic_eco_owncomp_pat_num: res.data.feic_eco_owncomp_pat_num,
              feic_eco_owncomp_pat_folio: res.data.feic_eco_owncomp_pat_folio,
              feic_eco_owncomp_pat_book: res.data.feic_eco_owncomp_pat_book,
              feic_eco_owncomp_pat_num_exp: res.data.feic_eco_owncomp_pat_num_exp,
              feic_eco_owncomp_income: res.data.feic_eco_owncomp_income,
              feic_eco_owncomp_address: res.data.feic_eco_owncomp_address,
              feic_eco_owncomp_zone: res.data.feic_eco_owncomp_zone,
              feic_eco_owncomp_dep: res.data.feic_eco_owncomp_dep,
              feic_eco_owncomp_mun: res.data.feic_eco_owncomp_mun,
              feic_eco_owncomp_country: res.data.feic_eco_owncomp_country,
              feic_eco_owncomp_activity: res.data.feic_eco_owncomp_activity,
              feic_eco_other_profesional_activity: res.data.feic_eco_other_profesional_activity,
              feic_eco_other_alimony: res.data.feic_eco_other_alimony,
              feic_eco_other_rent: res.data.feic_eco_other_rent,
              feic_eco_other_retirement: res.data.feic_eco_other_retirement,
              /* feic_eco_oher_aprox_income: res.data.feic_eco_oher_aprox_income, */
              /* feic_eco_other_total_income: res.data.feic_eco_other_total_income, */
              feic_eco_other_specific: res.data.feic_eco_other_specific,
              feic_eco_other_profesional_activity_income: res.data.feic_eco_other_profesional_activity_income,
              feic_eco_other_alimony_income: res.data.feic_eco_other_alimony_income,
              feic_eco_other_rent_income: res.data.feic_eco_other_rent_income,
              feic_eco_other_retirement_income: res.data.feic_eco_other_retirement_income,
              feic_eco_other_income_income: res.data.feic_eco_other_income_income,
              feic_eco_other_profesional_activity_curency: res.data.feic_eco_other_profesional_activity_curency,
              feic_eco_other_alimony_curency: res.data.feic_eco_other_alimony_curency,
              feic_eco_other_rent_curency: res.data.feic_eco_other_rent_curency,
              feic_eco_other_retirement_curency: res.data.feic_eco_other_retirement_curency,
              feic_eco_other_income_curency: res.data.feic_eco_other_income_curency,
              /* feic_eco_company_income_currency:res.data.feic_eco_company_income_currency,
              feic_eco_owncomp_income_currency:res.data.feic_eco_owncomp_income_currency, */
              feic_client_economic_info: res.data.feic_client_economic_info,
              feic_economic_profile_admission: res.data.feic_economic_profile_admission,
              feic_economic_profile_date: this.formatDate(
                res.data.feic_economic_profile_date
              ),
              feic_income_sources_total: res.data.feic_income_sources_total,
              feic_eco_owncomp_currency: res.data.feic_eco_owncomp_currency,
              feic_eco_company_currency: res.data.feic_eco_company_currency,
              feic_income_sources_purpose: res.data.feic_income_sources_purpose,







            });

            //SE DESHABILITAN/HABILITAN INPUTS DEL FEIC
            if (res.data.feic_country_birth && res.data.feic_country_birth == 'GUATEMALA') {
              //console.log('HABILITANDO  DEP BIRTH Y MUNI_BIRTH');
              this.FormFEIC.get('feic_dep_birth').enable();
              this.FormFEIC.get('feic_muni_birth').enable();
              this.FormFEIC.controls.feic_migration_condition.disable();
              this.FormFEIC.controls.feic_migration_especific.disable();

            }
            else {

              this.FormFEIC.get('feic_dep_birth').disable();
              this.FormFEIC.get('feic_muni_birth').disable();
              this.FormFEIC.controls.feic_migration_condition.enable();

            }
            if (res.data.feic_address_country && res.data.feic_address_country == 'GUATEMALA') {
              this.FormFEIC.controls.feic_address_dep.enable();
              this.FormFEIC.controls.feic_address_mun.enable();
            }
            else {
              this.FormFEIC.controls.feic_address_dep.disable();
              this.FormFEIC.controls.feic_address_mun.disable();
            }
            if (res.data.feic_iddoc_emision_country && res.data.feic_iddoc_emision_country == 'GUATEMALA') {
              this.FormFEIC.controls.feic_iddoc_emision_dep.enable();
              this.FormFEIC.controls.feic_iddoc_emision_mun.enable();
            }
            else {
              this.FormFEIC.controls.feic_iddoc_emision_dep.disable();
              this.FormFEIC.controls.feic_iddoc_emision_mun.disable();
            }
            if (res.data.fec_ispep && res.data.fec_ispep == 1) {
              this.FormFEIC.controls["feic_pep_entity"].enable();
              this.FormFEIC.controls["feic_pep_role"].enable();
              this.FormFEIC.controls["feic_pep_country_entity"].enable();
              this.FormFEIC.controls["feic_pep_wealth_origin"].enable();
              this.FormFEIC.controls["feic_pep_wealth_especific"].enable();


            }
            else {
              this.FormFEIC.controls["feic_pep_entity"].disable();
              this.FormFEIC.controls["feic_pep_role"].disable();
              this.FormFEIC.controls["feic_pep_country_entity"].disable();
              this.FormFEIC.controls["feic_pep_wealth_origin"].disable();
              this.FormFEIC.controls["feic_pep_wealth_especific"].disable();


            }
            if (res.data.feic_eco_company_country && res.data.feic_eco_company_country == 'GUATEMALA') {
              this.FormFEIC.controls['feic_eco_company_dep'].enable();
              this.FormFEIC.controls['feic_eco_company_mun'].enable();
            }
            else {
              this.FormFEIC.controls['feic_eco_company_dep'].disable();
              this.FormFEIC.controls['feic_eco_company_mun'].disable();
            }
            if (res.data.feic_eco_owncomp_country && res.data.feic_eco_owncomp_country == 'GUATEMALA') {
              this.FormFEIC.controls['feic_eco_owncomp_dep'].enable();
              this.FormFEIC.controls['feic_eco_owncomp_mun'].enable();
            }
            else {
              this.FormFEIC.controls['feic_eco_owncomp_dep'].disable();
              this.FormFEIC.controls['feic_eco_owncomp_mun'].disable();
            }







            // NUEVA VERSION-------------
            this.selecionActsOnBehalf = res.data.feic_client_acts_own_behalf == 1 ? true : false;

            //console.log("typeof this.HasInsuraces::",typeof this.HasInsuraces );



            this.selecionCountry5 = res.data.feic_country;
            this.selecionDepartment5 = res.data.feic_dep;
            this.selecionDepartment5ID = this.selecionDepartment5 ? this.optionsDepartments.find(dep => dep.name == this.selecionDepartment5).id : null;
            this.FormFEICGeneral.controls['feic_dep'].setValue(this.selecionDepartment5ID);
            this.selecionMunicipality5 = res.data.feic_muni;
            this.selecionMunicipality5ID = this.selecionMunicipality5 ? this.optionsMunicipalities.find(muni => muni.name == this.selecionMunicipality5).id : null;
            this.FormFEICGeneral.controls['feic_muni'].setValue(this.selecionMunicipality5ID);
            /* console.log("res.data.feic_dep::" + res.data.feic_dep);
            console.log("res.data.feic_muni:: " + res.data.feic_muni);
            console.log("res.data.feic_client_acts_own_behalf:: " + res.data.feic_client_acts_own_behalf); */
            /* console.log("optionsDepartments:");
            console.log(this.optionsDepartments);
            console.log("optionsMunicipalities:");
            console.log(this.optionsMunicipalities); */
            this.selecionCountry10 = res.data.feic_country_birth;
            this.selecionDepartment10 = res.data.feic_dep_birth;
            this.selecionDepartment10ID = this.selecionDepartment10 ? this.optionsDepartments.find(dep => dep.name == this.selecionDepartment10).id : null;
            this.selecionMunicipality10 = res.data.feic_muni_birth;
            this.selecionMunicipality10ID = this.selecionMunicipality10 ? this.optionsMunicipalities.find(muni => muni.name == this.selecionMunicipality10).id : null;

            this.selecionCountry11 = res.data.feic_iddoc_emision_country;
            this.selecionDepartment11 = res.data.feic_iddoc_emision_dep;
            this.selecionDepartment11ID = this.selecionDepartment11 ? this.optionsDepartments.find(dep => dep.name == this.selecionDepartment11).id : null;
            this.selecionMunicipality11 = res.data.feic_iddoc_emision_mun;
            this.selecionMunicipality11ID = this.selecionMunicipality11 ? this.optionsMunicipalities.find(muni => muni.name == this.selecionMunicipality11).id : null;

            this.selecionCountry6 = res.data.feic_address_country
            this.selecionDepartment6 = res.data.feic_address_dep;
            this.selecionMunicipality6 = res.data.feic_address_mun;
            /* console.log("res.data.feic_address_dep:" + res.data.feic_address_dep);
            console.log("res.data.feic_address_mun:" + res.data.feic_address_mun);
            console.log("this.optionsDepartments.length:: " + this.optionsDepartments.length);
            console.log("this.optionsMunicipalities.length:: " + this.optionsMunicipalities.length); */
            this.selecionDepartment6ID = this.selecionDepartment6 ? this.optionsDepartments.find(dep => dep.name == this.selecionDepartment6).id : null;
            this.selecionMunicipality6ID = this.selecionMunicipality6 ? this.optionsMunicipalities.find(muni => muni.name == this.selecionMunicipality6).id : null;

            this.selecionFeicMigrationCondition = res.data.feic_migration_condition;

            this.OtherIncomecheckboxes[0].status = res.data.feic_eco_other_profesional_activity_status && res.data.feic_eco_other_profesional_activity_status == 1 ? true : false;
            this.OtherIncomecheckboxes[1].status = res.data.feic_eco_other_alimony_status && res.data.feic_eco_other_alimony_status == 1 ? true : false;
            this.OtherIncomecheckboxes[2].status = res.data.feic_eco_other_rent_status && res.data.feic_eco_other_rent_status == 1 ? true : false;
            this.OtherIncomecheckboxes[3].status = res.data.feic_eco_other_retirement_status && res.data.feic_eco_other_retirement_status == 1 ? true : false;
            this.OtherIncomecheckboxes[4].status = res.data.feic_eco_other_income_status && res.data.feic_eco_other_income_status == 1 ? true : false;
            if (this.OtherIncomecheckboxes[0].status) {
              this.FormFEIC.get('feic_eco_other_profesional_activity').enable();
              this.FormFEIC.get('feic_eco_other_profesional_activity_income').enable();
              this.FormFEIC.get('feic_eco_other_profesional_activity_curency').enable();

            }
            else {
              this.FormFEIC.get('feic_eco_other_profesional_activity').disable();
              this.FormFEIC.get('feic_eco_other_profesional_activity_income').disable();
              this.FormFEIC.get('feic_eco_other_profesional_activity_curency').disable();
            }
            if (this.OtherIncomecheckboxes[1].status) {
              this.FormFEIC.get('feic_eco_other_alimony').enable();
              this.FormFEIC.get('feic_eco_other_alimony_income').enable();
              this.FormFEIC.get('feic_eco_other_alimony_curency').enable();

            }
            else {
              this.FormFEIC.get('feic_eco_other_alimony').disable();
              this.FormFEIC.get('feic_eco_other_alimony_income').disable();
              this.FormFEIC.get('feic_eco_other_alimony_curency').disable();
            }
            if (this.OtherIncomecheckboxes[2].status) {
              this.FormFEIC.get('feic_eco_other_rent').enable();
              this.FormFEIC.get('feic_eco_other_rent_income').enable();
              this.FormFEIC.get('feic_eco_other_rent_curency').enable();

            }
            else {
              this.FormFEIC.get('feic_eco_other_rent').disable();
              this.FormFEIC.get('feic_eco_other_rent_income').disable();
              this.FormFEIC.get('feic_eco_other_rent_curency').disable();
            }
            if (this.OtherIncomecheckboxes[3].status) {
              this.FormFEIC.get('feic_eco_other_retirement').enable();
              this.FormFEIC.get('feic_eco_other_retirement_income').enable();
              this.FormFEIC.get('feic_eco_other_retirement_curency').enable();

            }
            else {
              this.FormFEIC.get('feic_eco_other_retirement').disable();
              this.FormFEIC.get('feic_eco_other_retirement_income').disable();
              this.FormFEIC.get('feic_eco_other_retirement_curency').disable();
            }
            if (this.OtherIncomecheckboxes[4].status) {
              this.FormFEIC.get('feic_eco_other_specific').enable();
              this.FormFEIC.get('feic_eco_other_income_income').enable();
              this.FormFEIC.get('feic_eco_other_income_curency').enable();

            }
            else {
              this.FormFEIC.get('feic_eco_other_specific').disable();
              this.FormFEIC.get('feic_eco_other_income_income').disable();
              this.FormFEIC.get('feic_eco_other_income_curency').disable();
            }

            this.selecionCountry8 = res.data.feic_eco_owncomp_country;
            this.selecionDepartment8 = res.data.feic_eco_owncomp_dep;
            this.selecionMunicipality8 = res.data.feic_eco_owncomp_mun;

            this.selecionDepartment8ID = this.selecionDepartment8 ? this.optionsDepartments.find(dep => dep.name == this.selecionDepartment8).id : null;
            this.selecionMunicipality8ID = this.selecionMunicipality8 ? this.optionsMunicipalities.find(muni => muni.name == this.selecionMunicipality8).id : null;


            this.selecionCountry7 = res.data.feic_eco_company_country
            this.selecionDepartment7 = res.data.feic_eco_company_dep;
            this.selecionMunicipality7 = res.data.feic_eco_company_mun;

            this.selecionDepartment7ID = this.selecionDepartment7 ? this.optionsDepartments.find(dep => dep.name == this.selecionDepartment7).id : null;
            this.selecionMunicipality7ID = this.selecionMunicipality7 ? this.optionsMunicipalities.find(muni => muni.name == this.selecionMunicipality7).id : null;

            this.selecionCountry99 = res.data.feicp_iddoc_emision_country
            this.selecionDepartment99 = res.data.feicp_iddoc_emision_dep;
            this.selecionDepartment99ID = this.selecionDepartment99 ? this.optionsDepartments.find(dep => dep.name == this.selecionDepartment99).id : null;
            this.FormFEIC.controls['feicp_iddoc_emision_dep'].setValue(this.selecionDepartment99ID);


          }
          else {
            this.flagFeic = false;
          }











          if (String(res.data.fec_ispep) == "0") {
            this.FormFEIC.controls["feic_pep_entity"].disable();
            this.FormFEIC.controls["feic_pep_role"].disable();
            this.FormFEIC.controls["feic_pep_country_entity"].disable();
            this.FormFEIC.controls["feic_pep_wealth_origin"].disable();
            this.FormFEIC.controls["feic_pep_wealth_especific"].disable();
          }



          this.dataFapep = res.data.fa_pep;


          this.dataServicesFeic = res.data.feic_services;



          if (this.Form_request_doc.controls.doc_request_name.value == null || this.Form_request_doc.controls.doc_request_name.value == "") {

            this.Form_request_doc.controls.doc_request_name.setValue(localStorage.getItem("doc_request_name"))
          }
          if (this.Form_request_doc.controls.doc_request_email.value == null || this.Form_request_doc.controls.doc_request_email.value == "") {
            this.Form_request_doc.controls.doc_request_email.setValue(localStorage.getItem("doc_request_email"))
          }
          if (this.Form_request_doc.controls.doc_request_phone.value == null || this.Form_request_doc.controls.doc_request_phone.value == "") {
            this.Form_request_doc.controls.doc_request_phone.setValue(localStorage.getItem("doc_request_phone"))
          }

          if (this.Form_chargues.controls.charges_request_name.value == null || this.Form_chargues.controls.charges_request_name.value == "") {

            this.Form_chargues.controls.charges_request_name.setValue(localStorage.getItem("chargues_request_name"))
          }
          if (this.Form_chargues.controls.charges_request_email.value == null || this.Form_chargues.controls.charges_request_email.value == "") {
            this.Form_chargues.controls.charges_request_email.setValue(localStorage.getItem("chargues_request_email"))
          }
          if (this.Form_chargues.controls.charges_request_phone.value == null || this.Form_chargues.controls.charges_request_phone.value == "") {
            this.Form_chargues.controls.charges_request_phone.setValue(localStorage.getItem("chargues_request_phone"))
          }
        }),
          catchError((err) => {
            //this.notifier.notify('error', 'Ocurrio un problema con la eliminacion' + err);
            console.log(err);
            this.spinner.hide();
            return of();

          })
        ).subscribe(x => {
          this.checkStatus(1);
          this.checkStatus(2);
          this.checkStatus(3);
          this.checkStatus(4);
          this.checkStatus(5);
          this.checkStatus(6);
          this.checkStatus(7);
          this.checkStatus(8);
          this.checkStatus(9);
          this.checkStatus(10);
          this.checkStatus(11);
          debugger
          this.spinner.hide();
        });

    }
    else {
      //console.log("datalocal.formid == null");
      this.activeFeicIncomeSource = this.feic_income_source[0];
      this.spinner.hide();
    }


  }

  checkStatus(numCotainer: number): boolean {
    this.status1, this.status2, this.status3, this.status4, this.status5, this.status6, this.status7, this.status8, this.status9, this.status10, this.status11 = false;
    switch (numCotainer) {
      case 1: {
        let resp = false;

        if (this.SectionsAvailable.includes(1)) {
          /*  this.Form_request_doc.get('doc_request_name').valid &&
             this.Form_request_doc.get('doc_request_email').valid &&
             this.Form_request_doc.get('doc_request_phone').valid &&
 
             this.Form_chargues.get('charges_request_name').valid &&
             this.Form_chargues.get('charges_request_email').valid &&
             this.Form_chargues.get('charges_request_phone').valid */
          resp = this.Form_request_doc.valid && this.Form_chargues.valid//agregar la parte de los nuevos formularios a agregar
            && this.Form_other_data_contact.valid

        }
        this.status1 = resp;
        return resp;



      }
      case 2: {

        /* return this.SectionsAvailable.includes(2); */

        let resp = true;
        const controls = this.Form_other_data.controls;
        for (const name in controls) {
          if (controls[name].invalid) {
            console.log(name, controls[name].valid);
            resp = false
          }
        }
        if (resp) {
          resp = true;
          console.log('ES VALIDOOOOOOO EL FORMULARIOC cASE 2');
        }
        else {
          resp = false;
          console.log('ES INVALIDO EL FORMULARIOS DE LA SECCION DOS');
          const invalid = [];
          const controls = this.Form_other_data.controls;
          for (const name in controls) {
            if (controls[name].invalid) {
              console.log(name, controls[name].valid);
            }
          }

        }

        this.status2 = resp;
        return resp;
      }
      case 3: {
        //console.log('CASE 3???');
        debugger
        let resp = true
        if (this.SectionsAvailable.includes(3)) {

          //console.log('ENTRO ASSOCIATES');


          if (this.dataAssociates.length > 0) {
            resp = true;
          }
          else {
            //console.log('INVALIDO EN ASSOCIATES');
            resp = false;
          }

        }

        if (resp && this.SectionsAvailable.includes(4)) {
          //console.log('ENTRO EN DIRECTORS');
          if (this.dataDirectors.length > 0) {
            resp = true;
          }
          else { resp = false; }

        }

        if (resp && this.SectionsAvailable.includes(5)) {
          if (this.FormCompanys.get('holding').value == '1') {
            if (this.dataCompanies.length > 0) {
              resp = true;
            } else {
              //console.log('INVALIDO EN COMPANIES');
              resp = false;
            }

          }
          else {
            resp = true;
          }
        }


        if (resp && this.SectionsAvailable.includes(11)) {
          //console.log('ENTRO OPERATIVE STRUCTURE');
          if (this.dataOperativeStructure.length > 0) {
            resp = true;
          } else {
            //console.log('INVALIDO EN OPERATIVE STRUCTURE');
            resp = false;
          }


        }

        if (resp && this.SectionsAvailable.includes(19)) {
          //DATOS DE LA ENTIDAD SOLICITANTE
          //FormRequestEntity
          if (this.FormRequestEntity.valid) {
            //console.log('EL FormRequestEntity ES VALIDO');
            resp = true;
          }
          else {
            //console.log('EL FormRequestEntity NOOO ES VALIDO');

            resp = false;
          }

        }


        if (resp && this.SectionsAvailable.includes(21)) {
          //FormModPublicConstitution
          if (this.FormModPublicConstitution.valid) {
            //console.log('EL FormModPublicConstitution ES VALIDO');
            resp = true;
          }
          else {

            resp = false;
          }


        }

        if (resp && this.SectionsAvailable.includes(22)) {
          //FormSocietyPatent
          if (this.FormSocietyPatent.valid) {
            //console.log('EL FormSocietyPatent ES VALIDO');
            resp = true;
          }
          else {

            resp = false;
          }

        }

        if (resp && this.SectionsAvailable.includes(23)) {
          //FormCompanyPatent
          if (this.FormCompanyPatent.valid) {
            //console.log('EL FormCompanyPatent ES VALIDO');
            resp = true;
          }
          else {
            //console.log('EL FormCompanyPatent NOOO ES VALIDO');
            const controls = this.FormCompanyPatent.controls;

            resp = false;
          }

        }

        if (resp && this.SectionsAvailable.includes(25)) {
          //FormRecord
          if (this.FormRecord.valid) {
            //console.log('EL FormRecord ES VALIDO');
            resp = true;
          }
          else {
            //console.log('EL FormRecord NOOO ES VALIDO');
            const controls = this.FormRecord.controls;

            resp = false;
          }

        }

        if (resp && this.SectionsAvailable.includes(26)) {
          //FormHeadOffice
          if (this.FormHeadOffice.valid) {
            //console.log('EL FormHeadOffice ES VALIDO');
            resp = true;
          }
          else {
            console.log('EL FormHeadOffice NOOO ES VALIDO');

            resp = false;
          }

        }



        if (resp && this.SectionsAvailable.includes(30)) {
          //FormFinancialInformation
          if (this.FormFinancialInformation.valid) {
            //console.log('EL FormFinancialInformation ES VALIDO');
            resp = true;
          }
          else {

            resp = false;
          }

        }

        if (resp && this.SectionsAvailable.includes(31)) {
          //FormRepresentativeData
          if (this.FormRepresentativeData.valid) {

            resp = true;
          }
          else {

            resp = false;
          }

        }

        if (resp && this.SectionsAvailable.includes(17)) {
          //OPERACIONES EN OTROS PAISES
          if (this.FormCountryOperations.get('country_operation').value == null) {
            resp = false
          } else if (this.FormCountryOperations.get('country_operation').value == '1') {
            if (this.dataCountryoperations.length > 0) {
              //console.log('EL dataCountryoperations ES VALIDO');

              resp = true;
            }
            else {
              resp = false;
              //console.log('EL dataCountryoperations NOOO ES VALIDO');


            }
          } else {
            resp = true
          }

          if (resp && this.Form_track_record_and_sales.valid) {
            resp = true
          } else {
            resp = false
          }


        }


        if (resp && this.SectionsAvailable.includes(27)) {
          //COMERCIALES
          if (this.dataComercialCompany.length > 0) {
            //console.log('EL dataComercialCompany ES VALIDO');

            resp = true;
          }
          else {
            resp = false;
            //console.log('EL dataComercialCompany NOOO ES VALIDO');
          }

        }

        if (resp && this.SectionsAvailable.includes(28)) {
          //FINANCIEROS
          if (this.dataFinancials.length > 0) {
            resp = true;
            //console.log('EL dataFinancials ES VALIDO');


          }
          else {
            resp = false;
            //console.log('EL dataFinancials NOOO ES VALIDO');
          }


        }

        if (resp && this.SectionsAvailable.includes(29)) {
          //Miembros del consejo de administración
          if (this.dataMember.length > 0) {
            resp = true;
            //console.log('EL dataMember ES VALIDO');
          }
          else {
            resp = false;
            //console.log('EL dataMember NOOO ES VALIDO');
          }

        }




        this.status3 = resp;

        return resp;
      }
      case 4: {
        /* return this.SectionsAvailable.includes(9) || this.SectionsAvailable.includes(10); */
        let resp = true;
        if (this.SectionsAvailable.includes(9)) {
          if (this.dataSupplier.length > 0) {
            resp = true;
          }
          else {
            resp = false;
          }


        }
        if (resp && this.SectionsAvailable.includes(10)) {
          if (this.dataCustomer.length > 0) {
            resp = true;
          }
          else {
            resp = false;
          }

        }
        this.status4 = resp;
        return resp;
      }
      case 5: {
        let resp = true;
        /* return this.SectionsAvailable.includes(13) || this.SectionsAvailable.includes(14) ||
        this.SectionsAvailable.includes(15) || this.SectionsAvailable.includes(16); */
        if (this.SectionsAvailable.includes(13)) {
          //FormProductServices
          if (this.FormProductServices.valid) {
            //console.log('EL FormProductServices ES VALIDO');
            resp = true;
          }
          else {

            resp = false;
          }

        }
        if (resp && this.SectionsAvailable.includes(14)) {
          //FormMarketSegment
          if (this.FormMarketSegment.valid) {
            //console.log('EL FormMarketSegment ES VALIDO');
            resp = true;
          }
          else {
            //console.log('EL FormMarketSegment NO ES VALIDO');

            resp = false;
          }

        }
        if (resp && this.SectionsAvailable.includes(15)) {
          //FormSales
          if (this.FormSales.valid) {
            //console.log('EL FormSales ES VALIDO');
            resp = true;
          }
          else {
            //console.log('EL FormSales NO ES VALIDO');
            const controls = this.FormSales.controls;

            resp = false;
          }

        }
        if (resp && this.SectionsAvailable.includes(16)) {
          //FormPurchases
          if (this.FormPurchases.valid) {
            //console.log('EL FormPurchases ES VALIDO');
            resp = true;
          }
          else {

            resp = false;
          }

        }
        this.status5 = resp;
        return resp;
      }
      case 6: {
        let resp = true;

        if (this.SectionsAvailable.includes(6)) {
          if (this.dataBankaccount.length > 0) {
            resp = true;
          }
          else {

            resp = false;
          }
        }
        if (resp && this.SectionsAvailable.includes(7)) {
          //FormBankLoans

          if (this.FormBankLoans.get('contain').value == null) {
            resp = false;
          } else if (this.FormBankLoans.get('contain').value == '1') {
            if (this.dataBankLoans.length > 0) {
              resp = true;
            }
            else {
              //console.log('CASE6 INVALIDO EN dataBankLoans');
              resp = false;
            }

          }
          else {
            resp = true;

          }

        }
        if (resp && this.SectionsAvailable.includes(8)) {
          //FormFactoring
          //contain
          if (this.FormFactoring.get('contain').value == null) {
            resp = false;
          }
          else if (this.FormFactoring.get('contain').value == '1') {
            if (this.dataFactoring.length > 0) {
              resp = true;
            }
            else {
              //console.log('CASE6 INVALIDO EN dataFactoring');
              resp = false;
            }

          }
          else {
            resp = true;

          }


        }
        if (resp && this.SectionsAvailable.includes(12)) {
          let aux = this.isInsuranceCompleted();
          if (!aux) {
            //console.log('CASE6 INVALIDO POR SEGUROS');

          }
          resp = aux;


        }
        this.status6 = resp;
        return resp;
      }
      case 7: {
        /* return this.SectionsAvailable.includes(34); */
        let resp = false;
        if (this.SectionsAvailable.includes(34)) {
          //FormDebtors
          if (this.FormDebtors.valid) {
            //console.log('EL FormDebtors ES VALIDO');
            resp = true;
          }
          else {

            resp = false;
          }
        }
        this.status7 = resp;
        return resp;
      }
      case 8: {
        /* return this.SectionsAvailable.includes(32); */
        let resp = true;
        if (this.SectionsAvailable.includes(32)) {
          //FormProductService
          if (this.FormProductService.valid) {
            //console.log('EL FormProductService ES VALIDO');
            resp = true;
          }
          else {

            resp = false;
          }
        }
        this.status8 = resp;
        return resp;
      }
      case 9: {
        /* return this.SectionsAvailable.includes(33); */

        let resp = true;
        if (this.SectionsAvailable.includes(33)) {
          //let va=this.FormCPE.get('fec_is_cpe')
          if (this.FormCPE.get('fec_is_cpe') == null || this.FormCPE.get('fec_is_cpe').value == undefined || this.FormCPE.get('fec_is_cpe').value == 'undefined') {
            resp = false;
          }
          else if (this.FormCPE.get('fec_is_cpe').value == 1) {
            if (this.FormCPE.valid && this.cpe_data_array && this.cpe_data_array.length > 0) {
              resp = true;
            }
            else {
              resp = false;
            }

          }
          else {
            resp = true;
          }

        }
        this.status9 = resp;
        return resp;
      }
      case 10: {
        /* return this.SectionsAvailable.includes(35); */

        let resp = false
        if (this.SectionsAvailable.includes(35)) {
          //FormMinute
          if (this.FormMinute.valid) {
            //console.log('EL FormMinute ES VALIDO');
            resp = true;
          }
          else {

            resp = false;
          }

        }
        this.status10 = resp;
        return resp;
      }
      case 11: {

        let resp = false
        /* this.SectionsAvailable.includes(36); */
        if (this.SectionsAvailable.includes(36)) {

          if (this.FormFEICGeneral.valid) {
            //console.log('EL GENERAL ES VALIDO');
            resp = true;
          }
          else {
            resp = false;
          }
          const invalid = [];
          const controls = this.FormFEIC.controls;
          for (const name in controls) {
            if (controls[name].invalid) {
              invalid.push(name);
            }
          }
          console.log('invalid ', invalid)
          if (resp) {
            if (invalid.length == 0) {
              //console.log('EL FEIC ES VALIDO');
              resp = true;
            }
            else {

              resp = false;
            }




          }
          if (resp) {
            if (this.FormFEIC.controls.fec_ispep.value == 1) {
              if (!this.checkIspepWealthOrigin()) {
                //console.log('FEIC INVALIDO POR Whealth origin');
                resp = false;
              }
              else {
                //console.log('FEIC VALIDO EN wheatjOrigin');
                resp = true;
              }
            }
          }
          if (resp) {
            if (
              this.selecionRelacionDeDependencia != 1 &&
              this.selecionNegocioPropio != 1 &&
              this.selecionOtras != 1
            ) {
              //console.log("INVALIDO EN PERFIL ECONOMICO");
              resp = false;
            }
            else {
              //console.log("FEIC VALIDO EN PERFIL ECONOMICO");
              resp = true;
            }
          }
        }
        if (resp) {
          if (this.fecPepsRelativeVar == 1 || this.fecPepsPartnerVar == 1) {
            if (this.dataFapep.length == 0) {
              //console.log("FEIC INVALIDO EN FAMILIARES");
              resp = false;
            }
            else {
              //console.log("FEIC VALIDO EN FAMILIARES");
              resp = true;

            }
          }

        }

        this.status11 = resp;
        return resp;

      }
      default: {
        console.log('ENTRO AL DEFAULT!!!!!!!');
        let resp = false
        return resp;
      }
    }
  }

  isSectionAvailable(numCotainer: number): boolean {

    switch (numCotainer) {
      case 1: {
        return this.SectionsAvailable.includes(1);

      }
      case 2: {

        return this.SectionsAvailable.includes(2);
      }
      case 3: {
        return this.SectionsAvailable.includes(3) ||
          this.SectionsAvailable.includes(4) || this.SectionsAvailable.includes(5) ||
          this.SectionsAvailable.includes(11) || this.SectionsAvailable.includes(19) ||
          this.SectionsAvailable.includes(20) || this.SectionsAvailable.includes(21) ||
          this.SectionsAvailable.includes(22) || this.SectionsAvailable.includes(23) ||
          this.SectionsAvailable.includes(25) || this.SectionsAvailable.includes(26) ||
          this.SectionsAvailable.includes(30) || this.SectionsAvailable.includes(31) ||
          this.SectionsAvailable.includes(17) || this.SectionsAvailable.includes(27) ||
          this.SectionsAvailable.includes(28) || this.SectionsAvailable.includes(29);

      }
      case 4: {
        return this.SectionsAvailable.includes(9) || this.SectionsAvailable.includes(10);
      }
      case 5: {
        return this.SectionsAvailable.includes(13) || this.SectionsAvailable.includes(14) ||
          this.SectionsAvailable.includes(15) || this.SectionsAvailable.includes(16);
      }
      case 6: {
        return this.SectionsAvailable.includes(6) || this.SectionsAvailable.includes(7) ||
          this.SectionsAvailable.includes(8) || this.SectionsAvailable.includes(12);
      }
      case 7: {
        return this.SectionsAvailable.includes(34);
      }
      case 8: {
        return this.SectionsAvailable.includes(32);
      }
      case 9: {
        return this.SectionsAvailable.includes(33);
      }
      case 10: {
        return this.SectionsAvailable.includes(35);
      }
      case 11: {
        return this.SectionsAvailable.includes(36);
      }
      default: {
        return false;
      }


    }
  }
  //EL NUMERO MAYOR ES EL 11 POR LO QUE SI BUSCAMOS EL NUMERO DE FORMULARIOS MAS GRANDE VA A SER EL INIDICADOR
  getMaxForm() {
    if (!JSON.parse(localStorage.getItem("RedirectData"))) {
      return -1
    }
    let maxForm = 11;
    let index = 1;
    for (let i = 1; i <= maxForm; i++) {
      if (this.isSectionAvailable(i)) {
        index = i
      }
    }
    return index
  }
  addOtherIncomeSource(): void {
    let aux = this.feic_income_source.find(f => f.enabled == false);
    if (aux) {
      aux.enabled = true;
      this.activeFeicIncomeSource = aux;

    }

  }
  isInsuranceCompleted() {
    if (this.FormInsurance.get('contain').value == null) {
      return false;
    }
    else {
      if (this.FormInsurance.get('contain').value == 0) {
        return true;
      }
      else {
        let elem = this.insuranceData.find((item) => item.insurance_id);
        return elem ? true : false;

      }


    }

  }
  checkForm() {
    if (this.FormRepresentativeData.valid) {
      console.log('EL FORM-REPRESENTATIVE-DATA ES VALIDO');
      //resp = true;
    }
    else {
      console.log('EL FORM-REPRESENTATIVE-DATA NOOO ES VALIDO');
      const controls = this.FormRepresentativeData.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          console.log(name, 'invalido', controls[name].value)
        }
        /* else{
          console.log(name,'valido')
        } */
      }
      //resp = false;
    }
  }
  isRequired(form: FormGroup, fieldcomponent: string): Boolean {
    if (form.get(fieldcomponent).validator == null) {
      return false
    }
    const validator = form.get(fieldcomponent).validator({} as AbstractControl);
    if (validator && validator.required) {
      return true;
    }
    return false;
  }
  addValidators(rules: ValidatorFn[], form: FormGroup, field: string) {
    form.get(field).setValidators(rules)
    form.get(field).updateValueAndValidity()
  }

  changeReferenceRequired(form: FormGroup, componentfield: string, event: any) {
    //Si se cambia un valor se tiene que poner obligatorio los demas
    for (let i = 1; i <= 2; i++) {
      const feic_workref_name1 = form.get(`feic_workref_name${i}`).value == null ? '' : form.get(`feic_workref_name${i}`).value;
      const feic_workref_movil1 = form.get(`feic_workref_movil${i}`).value == null ? '' : form.get(`feic_workref_movil${i}`).value;
      const feic_workref_phone1 = form.get(`feic_workref_phone${i}`).value == null ? '' : form.get(`feic_workref_phone${i}`).value;

      //Usuario1
      if (feic_workref_name1 !== '') {
        this.addValidators([Validators.required], form, `feic_workref_name${i}`)
        if (feic_workref_phone1 === '') {
          this.addValidators([Validators.required, Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)")], form, `feic_workref_movil${i}`)
        } else {
          this.addValidators([Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)")], form, `feic_workref_movil${i}`)
        }
      }
      if (feic_workref_movil1 !== '') {
        this.addValidators([Validators.required, Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)")], form, `feic_workref_movil${i}`)
        this.addValidators([Validators.required], form, `feic_workref_name${i}`)
      }
      if (feic_workref_phone1 !== '') {
        this.addValidators([Validators.required], form, `feic_workref_name${i}`)
      }
      if (feic_workref_name1 === '' && feic_workref_movil1 === '' && feic_workref_phone1 === '') {
        this.addValidators([], form, `feic_workref_name${i}`)
        this.addValidators([Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)")], form, `feic_workref_movil${i}`)
      }
    }
  }


  onChangeSelectorEntityType(value) {
    if (value == 0) {
      this.FormGovernmental.controls['governmental_num'].clearValidators();
      this.FormGovernmental.controls['governmental_date'].clearValidators();
      this.FormGovernmental.controls['governmental_autority'].clearValidators();
      this.FormRecord.controls['record_name'].clearValidators()
      this.FormRecord.controls['record_num'].clearValidators()
      this.FormRecord.controls['record_folio'].clearValidators()
      this.FormRecord.controls['record_book'].clearValidators()
    } else {
      this.FormGovernmental.controls['governmental_num'].setValidators([Validators.required]);
      this.FormGovernmental.controls['governmental_date'].setValidators([Validators.required]);
      this.FormGovernmental.controls['governmental_autority'].setValidators([Validators.required]);
      this.FormRecord.controls['record_name'].setValidators([Validators.required]);
      this.FormRecord.controls['record_num'].setValidators([Validators.required]);
      this.FormRecord.controls['record_folio'].setValidators([Validators.required]);
      this.FormRecord.controls['record_book'].setValidators([Validators.required]);
    }
  }
  isRequiredControl(formGroup: FormGroup, controlName: string): boolean {
    const { controls } = formGroup
    const control = controls[controlName]
    const { validator } = control
    if (validator) {
      const validation = validator(new FormControl())
      return validation !== null && validation.required === true
    }
    return false
  }

}
