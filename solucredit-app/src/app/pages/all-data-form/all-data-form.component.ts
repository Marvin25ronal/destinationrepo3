import { Component, OnInit, ViewChild } from "@angular/core";
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbAccordion, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { MysqlService } from "../../services/mysql/mysql.service";
import { SendEmailService } from "../../services/sendemail/send-email.service";
import { AuthorizationService } from "../../services/service.index";
import { FInsurance } from "../../models/FInsurance.model";
import { DebtorService } from "../../services/debtors/debtor.service";
import { map, catchError } from 'rxjs/operators';
import { of, Observable, Subscription } from 'rxjs';
import { AsyncValidatorFn } from '@angular/forms';
import { Location } from '@angular/common'

@Component({
  selector: "app-all-data-form",
  templateUrl: "./all-data-form.component.html",
  styleUrls: ["./all-data-form.component.css"],
})
export class AllDataFormComponent implements OnInit {
  @ViewChild("accordion") accordion: NgbAccordion;
  formData: any;
  //----Variables para lo de los seguros
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
  flagFeic:boolean = false;
  fecPepsRelativeVar: any = null;
  fecPepsPartnerVar: any = null;
  dataAssociates;
  indexAssociate;
  dataDirectors;
  indexDirectors;
  dataCompanies;
  indexCompanies;
  dataBankaccount;
  indexBankaccount;
  dataBankLoans;
  indexBankLoans;
  dataFactoring;
  indexFactoring;
  dataSupplier;
  indexSupplier;
  dataCustomer;
  indexCustomer;
  dataInsurances;
  indexInsurances;
  dataCountryoperations;
  indexCountryoperations;
  dataComercialCompany;
  dataFapep;
  dataServicesFeic;
  indexComercialCompany;
  dataFinancials;
  indexFinancials;
  indexStructure;
  dataMember;
  indexMember;
  indexCPE;
  indexFaPep;
  indexServicesFeic;
  CurrentAssociate;
  CurrentDirectors;
  CurrentCompanies;
  CurrentBankAccount;
  CurrentBankLoans;
  CurrentFactoring;
  CurrentSupplier;
  CurrentCustomer;
  CurrentStructure;
  CurrentCountryOperation;
  CurrentComercialCompany;
  CurrentFapep;
  CurrentServiceFeic;
  CurrentFinancials;
  CurrentMember;
  dataDeudores = [];
  HasInsuraces = null;
  dataOperativeStructure = [];
  StatusFapep = false;
  StatusServicesFeic = false;
  StatusFormdoc = false;
  StatusChargues = false;
  StatusOtherData = false;
  StatusPartners = false;
  StatusBankAccount = false;
  StatusBankLoans = false;
  StatusFactoring = false;
  Statussuppliers = false;
  StatusCustomers = false;
  StatusProductServices = false;
  StatusDebtors = false;
  StatusCPE = false;
  StatusMarket = false;
  StatusCompanies = false;
  StatusDirectors = false;
  StatusInsurances = false;
  StatusCountryOperations = false;
  StatusComercialCompany = false;
  StatusFinancialInformation = false;
  StatusFinancial = false;
  StatusMember = false;
  StatusSales = false;
  StatusPurchases = false;
  StatusObligated = false;
  StatusRequestEnt = false;
  StatusPublicCon = false;
  StatusModPublicCon = false;
  StatusSocietyPatent = false;
  StatusCompanyPatent = false;
  StatusGovernmental = false;
  StatusRecord = false;
  StatusFormHeadOffice = false;
  StatusRepresentativeData = false;
  StatusProductService = false;
  StatusOperativeStructure = false;
  StatusMinute = false;
  StatusFEIC = false;
  cpe_data_array = [];
  container1 = true;
  container2 = false;
  container3 = true;
  container4 = true;
  container5 = true;
  container6 = true;
  container7 = true;
  container8 = true;
  container9 = true;
  container10 = true;
  container11 = true;
  container12 = true;
  container13 = true;
  container14 = true;
  container15 = true;
  container16 = true;
  container17 = true;
  container18 = true;
  container19 = true;
  container20 = true;
  container21 = true;
  container22 = true;
  container23 = true;
  container24 = true;
  container25 = true;
  container26 = true;
  container27 = true;
  container28 = true;
  container29 = true;
  container30 = true;
  container31 = true;
  container32 = true;
  container33 = true;
  container34 = true;
  container35 = true;
  container36 = true;
  container37 = true;
  currentContainer;
  SectionsAvailable = [];
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
  selecionCountry10: string[] = [];
  selecionDepartment10: string[] = [];
  selecionDepartment10ID: number = -1;
  selecionMunicipality10: string[] = [];
  selecionMunicipality10ID: number = -1;

  selecionCountry11: string[] = [];
  selecionDepartment11: string[] = [];
  selecionDepartment11ID: number = -1;
  selecionMunicipality11: string[] = [];
  selecionMunicipality11ID: number = -1;
  /*selecionCountry12: string[] = []; */

  selecionActsOnBehalf: boolean = null;
  selecionFeicMigrationCondition: string[] = [];

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

  feic_income_source: any = [
    { sector: null, amount: null, enabled: true },
    { sector: null, amount: null, enabled: false },
    { sector: null, amount: null, enabled: false },
    { sector: null, amount: null, enabled: false },
    { sector: null, amount: null, enabled: false },
  ];
  activeFeicIncomeSource: any = null;

  public showSidebar = false;
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

  Form_other_data = new FormGroup({

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
    economic_sector: new FormControl(null, [Validators.required]),
    email_send_fact: new FormControl(null, [Validators.required,Validators.email]),
    email_send_fact_name: new FormControl(null, [Validators.required]),
    email_send_fact_phone: new FormControl(null, [Validators.required,
      Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)"),]),
    warranty_type_id:new FormControl(null, [Validators.required]),
    email_isr:new FormControl(null, [Validators.required,Validators.email]),
    email_isr_name:new FormControl(null, [Validators.required]),
    email_isr_phone:new FormControl(null, [Validators.required,
      Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)"),]),
    amount:new FormControl(null, []),
    time_in_months:new FormControl(null, []),
    destination:new FormControl(null, []),
    email_accounting:new FormControl(null, [Validators.required]),
    email_accounting_name:new FormControl(null, [Validators.required]),
    email_accounting_phone:new FormControl(null, [Validators.required]),
    position_held:new FormControl(null, []),
    business_contact_name:new FormControl(null, [Validators.required]),
    business_contact_rol:new FormControl(null, [Validators.required]),
    

  });

  FormPartners = new FormGroup({
    name: new FormControl("", [Validators.required]),
    position: new FormControl("", [Validators.required]),
    nationality: new FormControl("", [Validators.required]),
    nit: new FormControl("", [
      Validators.required,
      Validators.pattern("^[0-9]+(-?[0-9kK])?$"),
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
    nationality: new FormControl("", [Validators.required]),
    nit: new FormControl("", [
      Validators.required,
      Validators.pattern("^[0-9]+(-?[0-9kK])?$"),
    ]),
    shareholding: new FormControl("", [Validators.required]),
  });

  FormDirectors = new FormGroup({
    name: new FormControl("", [Validators.required]),
    position: new FormControl("", [Validators.required]),
    nit: new FormControl("", [
      Validators.required,
      Validators.pattern("^[0-9]+(-?[0-9kK])?$"),
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
  });

  FormUpdateBankAcount = new FormGroup({
    bank: new FormControl("", [Validators.required]),
    account_number: new FormControl("", [Validators.required]),
    //nationality: new FormControl("", [Validators.required]),
    account_type: new FormControl("", [Validators.required]),
    currency: new FormControl("", [Validators.required]),
    monthly_average_deposit: new FormControl("", [Validators.required]),
  });

  FormBankLoans = new FormGroup({
    bank: new FormControl("", [Validators.required]),
    loan_number: new FormControl("", [Validators.required]),
    warranty: new FormControl("", [Validators.required]),
    amount_awarded: new FormControl("", [Validators.required]),
    time: new FormControl("", [Validators.required]),
    balance: new FormControl("", [Validators.required]),
    contain: new FormControl("1", [Validators.required]),
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
    phone: new FormControl("", [Validators.required, Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)")]),
    country: new FormControl("", [Validators.required]),
  });

  FormUpdateCustomer = new FormGroup({
    name: new FormControl("", [Validators.required]),
    monthly_average: new FormControl("", [Validators.required]),
    credit_days: new FormControl("", [Validators.required]),
    pay_form: new FormControl("", [Validators.required]),
    relation_time: new FormControl("", [Validators.required]),
    product_service: new FormControl("", [Validators.required]),
    contact: new FormControl("", [Validators.required]),
    phone: new FormControl("", [Validators.required, Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)")]),
    country: new FormControl("", [Validators.required]),
  });

  FormOperativeStructure = new FormGroup({
    type: new FormControl("", [Validators.required]),
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
      Validators.max(100),
    ]),
    second_quarter: new FormControl("", [
      Validators.required,
      Validators.min(0),
      Validators.max(100),
    ]),
    third_quarter: new FormControl("", [
      Validators.required,
      Validators.min(0),
      Validators.max(100),
    ]),
    fourth_quarter: new FormControl("", [
      Validators.required,
      Validators.min(0),
      Validators.max(100),
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
    economic_antivity: new FormControl("", [Validators.required]),
    ive_02_nit: new FormControl("", [
      Validators.required,
      Validators.pattern("^[0-9]+(-?[0-9kK])?$"),
    ]),
    constitution_country: new FormControl("", [Validators.required]),
  });

  FormPublicConstitution = new FormGroup({
    constitution_doc_num: new FormControl("", [Validators.required]),
    constitution_doc_date: new FormControl("", [Validators.required]),
    constitution_doc_notari: new FormControl("", [Validators.required]),
  });

  FormModPublicConstitution = new FormGroup({
    mod_constitution_doc_num: new FormControl("", [Validators.required]),
    mod_constitution_doc_date: new FormControl("", [Validators.required]),
    mod_constitution_doc_notari: new FormControl("", [Validators.required]),
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
    entity_website: new FormControl("", [Validators.required]),
    entity_email: new FormControl("", [Validators.required]),
    entity_cpe: new FormControl("0", [Validators.required]),
  });

  FormComercialCompany = new FormGroup({
    name: new FormControl("", [Validators.required]),
    phone: new FormControl("", [Validators.required, Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)")]),
    cellphone: new FormControl("", [Validators.required, Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)")]),
  });

  FormUpdateComercialCompany = new FormGroup({
    name: new FormControl("", [Validators.required]),
    phone: new FormControl("", [Validators.required, Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)")]),
    cellphone: new FormControl("", [Validators.required, Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)")]),
  });

  FormFinancials = new FormGroup({
    name: new FormControl("", [Validators.required]),
    phone: new FormControl("", [Validators.required, Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)")]),
    product_service: new FormControl("", [Validators.required]),
  });

  FormUpdateFinancials = new FormGroup({
    name: new FormControl("", [Validators.required]),
    phone: new FormControl("", [Validators.required, Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)")]),
    product_service: new FormControl("", [Validators.required]),
  });

  FormMembers = new FormGroup({
    name: new FormControl("", [Validators.required]),
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
    income_currency_type: new FormControl(""),
    other_income_currency_type: new FormControl("", [Validators.required]),
    expenses_currency_type: new FormControl(""),
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
    rep_migration_status: new FormControl("", [Validators.required, this.selectNotDefault()]),
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
      Validators.pattern("^[0-9]+(-?[0-9kK])?$"),
    ]),
    rep_phone: new FormControl("", [Validators.required, Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)")]),
    rep_cellphone: new FormControl("", [Validators.required, Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)")]),
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
      Validators.pattern("^[0-9]+(-?[0-9kK])?$"),
    ]),
    rep_individual_phone: new FormControl("", [Validators.required, Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)")]),
    rep_individual_cellphone: new FormControl("", [Validators.required, Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)")]),
    rep_individual_pep: new FormControl("", [Validators.required]),
    rep_individual_pep_type: new FormControl(""),
    //rep_individual_pep_type: new FormControl("", [Validators.required]),
    rep_individual_pep_type_other: new FormControl(""),
    rep_individual_pep_relatives: new FormControl("", [Validators.required]),
    rep_individual_pep_close_person: new FormControl("", [Validators.required]),
  });

  FormProductService = new FormGroup({
    prod_serv_product_type: new FormControl("", [Validators.required]),
    prod_serv_product_name: new FormControl("", [Validators.required]),
    prod_serv_currency: new FormControl("", [Validators.required]),
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
    fec_is_cpe:new FormControl(null, [Validators.required]),
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
    deb_iva_percentage: new FormControl("", [Validators.required]),
    deb_isr: new FormControl("", [Validators.required]),
    /* deb_isr_percentage: new FormControl("", [Validators.required]), */
    deb_emit_pass: new FormControl("", [Validators.required]),
    deb_web_age: new FormControl("", [Validators.required]),
    deb_belongs_com_group: new FormControl("", [Validators.required]),
    deb_pay_confirmation: new FormControl("", [Validators.required]),
    deb_comercial_relation_time: new FormControl("", [Validators.required]),
    deb_product: new FormControl("", [Validators.required]),
    debs_monthly_ave_purchases: new FormControl("", [Validators.required]),
    deb_direct_phone: new FormControl("", [Validators.required, Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)")]),
    deb_email1_bill_confirmation: new FormControl("", [Validators.required]),
    deb_email2_bill_confirmation: new FormControl("", [Validators.required]),
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
      Validators.pattern("^[0-9]{4}s?[0-9]{5}s?[0-9]{4}$"),
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
    feic_client_acts_own_behalf: new FormControl("", [Validators.required]),
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
    feic_migration_condition: new FormControl(null, [Validators.required, this.selectNotDefault()]),
    feic_migration_especific: new FormControl(null, [Validators.required]),
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
      Validators.pattern("^[0-9]+(-?[0-9kK])?$"),
    ]),
    feic_phone: new FormControl(null, [Validators.required, Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)")]),
    feic_movil: new FormControl(null, [Validators.required, Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)")]),
    feic_email: new FormControl(null, [Validators.required, Validators.email]),
    feic_address: new FormControl(null, [Validators.required]),
    feic_address_zone: new FormControl(null),
    feic_address_dep: new FormControl(null, [Validators.required]),
    feic_address_mun: new FormControl(null, [Validators.required]),
    feic_address_country: new FormControl(null, [Validators.required]),
    feicp_f_lastname: new FormControl(null, [Validators.required]),
    feicp_s_lastname: new FormControl(null, [Validators.required]),
    feicp_marry_lastname: new FormControl(null),
    feicp_firstname: new FormControl(null, [Validators.required]),
    feicp_secondname: new FormControl(null, [Validators.required]),
    feicp_other_name: new FormControl(null),
    feicp_gen: new FormControl(null, [Validators.required]),
    feicp_comercial_name: new FormControl(null, [Validators.required]),
    feicp_fecnac: new FormControl(null, [Validators.required]),
    feicp_contitutution_or_nationality: new FormControl(null, [
      Validators.required,
    ]),
    feicp_other_nationality: new FormControl(null),
    feicp_iddoc_type: new FormControl(null, [Validators.required]),
    feicp_iddoc_num: new FormControl(null, [Validators.required, Validators.pattern("^[0-9]{4}s?[0-9]{5}s?[0-9]{4}$")]),
    
    feicp_iddoc_emision_country: new FormControl(null, [Validators.required]),
    feicp_iddoc_emision_dep: new FormControl(null, []),
    feicp_nit: new FormControl(null, [
      Validators.required,
      Validators.pattern("^[0-9]+(-?[0-9kK])?$"),
    ]),
    feicp_phone: new FormControl(null, [Validators.required, Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)")]),
    feicp_movilphone: new FormControl(null, [Validators.required, Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)")]),
    fecp_ispep: new FormControl(null, [Validators.required]),
    fecp_iscpe: new FormControl(null, [Validators.required]),
    fec_ispep: new FormControl(null, [Validators.required]),
    feic_pep_wealth_origin: new FormControl(null),
    fec_peps_relative: new FormControl(null, [Validators.required]),
    fec_peps_partener: new FormControl(null, [Validators.required]),
    fec_is_cpe: new FormControl(null, [Validators.required]),
    feic_workref_name1: new FormControl(null, [Validators.required]),
    feic_workref_phone1: new FormControl(null, [Validators.required, Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)")]),
    feic_workref_movil1: new FormControl(null, [Validators.required, Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)")]),
    feic_workref_name2: new FormControl(null, [Validators.required]),
    feic_workref_phone2: new FormControl(null, [Validators.required, Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)")]),
    feic_workref_movil2: new FormControl(null, [Validators.required, Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)")]),
    feic_ref_name1: new FormControl(null, [Validators.required]),
    feic_ref_phone1: new FormControl(null, [Validators.required, Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)")]),
    feic_ref_movil1: new FormControl(null, [Validators.required, Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)")]),
    feic_ref_name2: new FormControl(null, [Validators.required]),
    feic_ref_phone2: new FormControl(null, [Validators.required, Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)")]),
    feic_ref_movil2: new FormControl(null, [Validators.required, Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)")]),
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
    feic_eco_company_zone: new FormControl(null, [Validators.required]),
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
    feic_eco_oher_aprox_income: new FormControl(null, [Validators.required]),
    feic_eco_other_total_income: new FormControl(null, [Validators.required]),
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
   
    feic_eco_company_income_currency: new FormControl(null, [Validators.required]),
    feic_eco_owncomp_income_currency: new FormControl(null, [Validators.required]),
    //CAMPOS AGREGADOS PARA NUEVAS SECCIONES
    feic_client_economic_info: new FormControl(null, [Validators.required]),
    feic_economic_profile_admission: new FormControl(null, [Validators.required]),
    feic_economic_profile_date: new FormControl(null, [Validators.required]),
    feic_income_sources_total: new FormControl(null, [Validators.required]),
    feic_eco_owncomp_currency: new FormControl(null, [Validators.required]),
    feic_eco_company_currency: new FormControl(null, [Validators.required]),
    feic_income_sources_purpose:new FormControl(null, [Validators.required])

  });

  FormFaPep = new FormGroup({
    feic_fa_relative_type: new FormControl("", [Validators.required]),
    feic_fa_relative_specific: new FormControl("", []),
    feic_fa_partner_type: new FormControl("", [Validators.required]),
    feic_fa_partner_specific: new FormControl("", []),
    feic_fa_gender: new FormControl("", [Validators.required]),
    feic_fa_condition: new FormControl("", [Validators.required]),
    feic_fa_f_lastname: new FormControl("", [Validators.required]),
    feic_fa_s_lastname: new FormControl(null),
    feic_fa_marry_lastname: new FormControl(""),
    feic_fa_firstname: new FormControl("", [Validators.required]),
    feic_fa_secondname: new FormControl(null),
    feic_fa_other_name: new FormControl(null),
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
    feic_fa_s_lastname: new FormControl(null),
    feic_fa_marry_lastname: new FormControl(""),
    feic_fa_firstname: new FormControl("", [Validators.required]),
    feic_fa_secondname: new FormControl(null),
    feic_fa_other_name: new FormControl(null),
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
  dataPersonsCustomer: any;
  representatives: any[];

  constructor(
    private mysqlService: MysqlService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private _sendemail: SendEmailService,
    private modalService: NgbModal,
    private sanitizer: DomSanitizer,
    private autorization: AuthorizationService,
    private fb: FormBuilder,
    private _service: DebtorService,
    private location: Location
  ) { }

  refreshAfterSave() {
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
    //this.spinner.show();
    this.GetGeneralData();
    if (localStorage.getItem("FormMetadata")) {
      const formdata = JSON.parse(localStorage.getItem("FormMetadata"));
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
      this.spinner.hide();
    }

    this._service.getALLDebtors().subscribe((debtors) => {
      this.dataDeudores = debtors.debtor;
    });

    this.spinner.hide();
  }
  async ngOnInit() {
    this.modalService.dismissAll();
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
    }
    if(localStorage.getItem("persons_customer")){
      this.dataPersonsCustomer=JSON.parse(localStorage.getItem("persons_customer"))
      this.representatives=[];
      let currentsubject=this.dataPersonsCustomer.currentsubject;
      for(let i=0;i<this.dataPersonsCustomer.persons.length;i++){
        let persons=this.dataPersonsCustomer.persons[i];
        let finded=false;
        let j=0;
        for(j=0;j<persons.childs.length;j++){
          if(persons.childs[j].rsdet_id==currentsubject.rsdet_id){
            finded=true;
            break;
          }
        }
        if(finded){
          this.representatives=persons.childs.slice()
          this.representatives.splice(j,1)
        }
      }
      console.log(this.representatives)
    }
    let auxType = {
      0:'Tradicional',
      1:'Especial',
      2:'Especiales',
      4:'Pronto_pago'
    }
    /* console.log("this.formData");
    console.log(this.formData); */
    let au = this.formData.customer.amount_interests;
    console.log("au: ",au);
    this.FormProductService.get('prod_serv_monthly_amount').setValue(au);
    this.FormProductService.get('prod_serv_initial_amount').setValue(au);
    this.FormProductService.get('prod_serv_currency').setValue(!this.formData.customer.currency?null:(this.formData.customer.currency==0?'Quetzales':'Dolares'));
    this.FormProductService.get('prod_serv_product_type').setValue(auxType[this.formData.dataRequest.type]?auxType[this.formData.dataRequest.type]:null);
    this.FormProductService.get('prod_serv_cover').setValue(this.formData.dataRequest.location==0?"Local":"Intenacional");
    this.Form_other_data.get('warranty_type_id').setValue(this.formData.dataRequest.warranty_type);
    this.Form_other_data.get('amount').setValue(this.formData.customer.amount_interests);
    this.Form_other_data.get('time_in_months').setValue(this.formData.dataRequest.time_in_months);
    this.Form_other_data.get('destination').setValue(this.formData.dataRequest.destination);
    

    /* this.FormProductService.get('prod_serv_monthly_amount').disable();
    this.FormProductService.get('prod_serv_initial_amount').disable();
    this.FormProductService.get('prod_serv_currency').disable();
    this.FormProductService.get('prod_serv_product_type').disable(); */
    this.FormProductService.get('prod_serv_desciption').disable();
    this.FormProductService.get('prod_serv_product_name').disable();
    /* this.FormProductService.get('prod_serv_cover').disable(); */
    /* this.Form_other_data.get('warranty_type_id').disable();
    this.Form_other_data.get('amount').disable(); */
    


    if (this.formData.metadata.sys_subject_id != 25 && this.formData.metadata.sys_subject_id != 33 && this.formData.metadata.sys_subject_id != 41 && this.formData.metadata.sys_subject_id != 43 && this.formData.metadata.sys_subject_id != 45) {

      this.Form_other_data.controls.rep_marry_lastname.enable();
      this.Form_other_data.controls.rep_s_lastname.enable();
      this.Form_other_data.controls.rep_f_lastname.enable();
      this.Form_other_data.controls.rep_other_name.enable();
      this.Form_other_data.controls.rep_secondname.enable();
      this.Form_other_data.controls.rep_firstname.enable();
      //this.Form_other_data.controls.rep_notarialact_position.enable();
      this.Form_other_data.controls.owncompany_name.disable();
      this.Form_other_data.controls.email_send_fact.disable();
      this.Form_other_data.controls.email_send_fact_name.disable();
      this.Form_other_data.controls.email_send_fact_phone.disable();
      this.Form_other_data.controls.email_isr.disable();
      this.Form_other_data.controls.email_isr_name.disable();
      this.Form_other_data.controls.email_isr_phone.disable();
      this.Form_other_data.controls.email_accounting.disable();
      this.Form_other_data.controls.email_accounting_name.disable();
      this.Form_other_data.controls.email_accounting_phone.disable();
      
      

      

    }
    else {
      this.Form_other_data.controls.rep_marry_lastname.disable();
      this.Form_other_data.controls.rep_s_lastname.disable();
      this.Form_other_data.controls.rep_f_lastname.disable();
      this.Form_other_data.controls.rep_other_name.disable();
      this.Form_other_data.controls.rep_secondname.disable();
      this.Form_other_data.controls.rep_firstname.disable();
      //this.Form_other_data.controls.rep_notarialact_position.disable();
      this.Form_other_data.controls.owncompany_name.enable();
      this.Form_other_data.controls.email_send_fact.enable();
      this.Form_other_data.controls.email_send_fact_name.enable();
      this.Form_other_data.controls.email_send_fact_phone.enable();
      this.Form_other_data.controls.email_isr.enable();
      this.Form_other_data.controls.email_isr_name.enable();
      this.Form_other_data.controls.email_isr_phone.enable();
      this.Form_other_data.controls.email_accounting.enable();
      this.Form_other_data.controls.email_accounting_name.enable();
      this.Form_other_data.controls.email_accounting_phone.enable();
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
      this.dataDeudores = debtors.debtor;
    });
    /* console.log("this.Form_request_doc.controls.doc_request_name.value:" + this.Form_request_doc.controls.doc_request_name.value + ">");
    console.log("this.Form_request_doc.controls.doc_request_email.value:" + this.Form_request_doc.controls.doc_request_email.value + ">");
    console.log("this.Form_request_doc.controls.doc_request_phone.value:" + this.Form_request_doc.controls.doc_request_phone.value + ">"); */
    /* if (this.Form_request_doc.controls.doc_request_name.value == null || this.Form_request_doc.controls.doc_request_name.value == "") {
      console.log("Entro");
      this.Form_request_doc.controls.doc_request_name.setValue(localStorage.getItem("doc_request_name"))
    }
    if (this.Form_request_doc.controls.doc_request_email.value == null || this.Form_request_doc.controls.doc_request_email.value == "") {
      console.log("Entro");
      this.Form_request_doc.controls.doc_request_email.setValue(localStorage.getItem("doc_request_email"))
    }
    if (this.Form_request_doc.controls.doc_request_phone.value == null || this.Form_request_doc.controls.doc_request_phone.value == "") {
      console.log("Entro");
      this.Form_request_doc.controls.doc_request_phone.setValue(localStorage.getItem("doc_request_phone"))
    } */

    this.spinner.hide();
    /* console.log('TERMINO DE NGOnInit'); */
  }
  //---METODOS PARA LOS SEGUROS---
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
  isInsuranceCompleted() {
    if (this.HasInsuraces == null) {
      return false;
    }
    else {
      if (this.HasInsuraces == 0) {
        return true;
      }
      else {
        let elem = this.insuranceData.find((item) => item.insurance_id);
        return elem ? true : false;

      }


    }

  }
  //---------
  openModalAssociates(targetModal, index, id) {
    this.CurrentAssociate = id;
    this.indexAssociate = index;
    this.FormUpdatePartners.patchValue({
      name: this.dataAssociates[index].name,
      position: this.dataAssociates[index].position,
      nationality: this.dataAssociates[index].nationality,
      nit: this.dataAssociates[index].nit,
      shareholding: this.dataAssociates[index].shareholding,
    });
    //console.log("index array", index);
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: "static",
      keyboard: false,
      size: "xl",
    });
  }

  openModalDirectors(targetModal, index, id) {
    this.CurrentDirectors = id;
    this.indexDirectors = index;
    this.FormUpdateDirectors.patchValue({
      name: this.dataDirectors[index].name,
      position: this.dataDirectors[index].position,
      nit: this.dataDirectors[index].nit,
      pep: this.dataDirectors[index].pep,
    });
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: "static",
      keyboard: false,
      size: "xl",
    });
  }

  openModalCompanies(targetModal, index, id) {
    this.CurrentCompanies = id;
    this.indexCompanies = index;
    this.FormUpdateCompanys.patchValue({
      comercial_name: this.dataCompanies[index].comercial_name,
      relation: this.dataCompanies[index].relation,
      sector: this.dataCompanies[index].sector,
      nit: this.dataCompanies[index].nit,
      holding_name: this.dataCompanies[index].holding_name,
      country: this.dataCompanies[index].country,
      comercial_activity: this.dataCompanies[index].comercial_activity,
    });

    this.modalService.open(targetModal, {
      centered: true,
      backdrop: "static",
      keyboard: false,
      size: "xl",
    });
  }

  openModalBankAccount(targetModal, index, id) {
    this.CurrentBankAccount = id;
    this.indexBankaccount = index;
    this.FormUpdateBankAcount.patchValue({
      bank: this.dataBankaccount[index].bank,
      account_number: this.dataBankaccount[index].account_number,
      nationality: this.dataBankaccount[index].nationality,
      account_type: this.dataBankaccount[index].account_type,
      currency: this.dataBankaccount[index].currency,
      monthly_average_deposit: this.dataBankaccount[index]
        .monthly_average_deposit,
    });

    this.modalService.open(targetModal, {
      centered: true,
      backdrop: "static",
      keyboard: false,
      size: "xl",
    });
  }

  openModalBankLoans(targetModal, index, id) {
    this.CurrentBankLoans = id;
    this.indexBankLoans = index;
    this.FormUpdateBankLoans.patchValue({
      bank: this.dataBankLoans[index].bank,
      loan_number: this.dataBankLoans[index].loan_number,
      warranty: this.dataBankLoans[index].warranty,
      amount_awarded: this.dataBankLoans[index].amount_awarded,
      time: this.dataBankLoans[index].time,
      balance: this.dataBankLoans[index].balance,
    });

    this.modalService.open(targetModal, {
      centered: true,
      backdrop: "static",
      keyboard: false,
      size: "xl",
    });
  }

  openModalFactoring(targetModal, index, id) {
    this.CurrentFactoring = id;
    this.indexFactoring = index;

    this.FormUpdateFactoring.patchValue({
      entity: this.dataFactoring[index].entity,
      warranty: this.dataFactoring[index].warranty,
      amount_awarded: this.dataFactoring[index].amount_awarded,
      amount_used: this.dataFactoring[index].amount_used,
      balance: this.dataFactoring[index].balance,
    });

    this.modalService.open(targetModal, {
      centered: true,
      backdrop: "static",
      keyboard: false,
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
      size: "xl",
    });
  }

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

    this.modalService.open(targetModal, {
      centered: true,
      backdrop: "static",
      keyboard: false,
      size: "xl",
    });
  }

  openModalStructureOperative(targetModal, index, id) {
    this.CurrentStructure = id;
    this.indexStructure = index;

    this.FormUpdateOperativeStructure.patchValue({
      type: this.dataOperativeStructure[index].id,
      name: this.dataOperativeStructure[index].ceo_name,
      time: this.dataOperativeStructure[index].ceo_time,
    });

    this.modalService.open(targetModal, {
      centered: true,
      backdrop: "static",
      keyboard: false,
      size: "xl",
    });
  }

  openModalCountryOperations(targetModal, index, id) {
    this.CurrentCountryOperation = id;
    this.indexCountryoperations = index;

    this.FormUpdateCountryOperations.patchValue({
      year_sales: this.dataCountryoperations[index].year_sales,
      country: this.dataCountryoperations[index].country,
    });

    this.modalService.open(targetModal, {
      centered: true,
      backdrop: "static",
      keyboard: false,
      size: "xl",
    });
  }

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
    });
  }

  openModalFaPep(targetModal, index, id) {
    this.CurrentFapep = id;
    this.indexFaPep = index;
    console.log("GENDER::: ",this.dataFapep[index].feic_fa_gender);

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
    });
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
    });
  }

  openModalCpe(targetModal, index) {
    this.indexCPE = index;

    this.FormUpdateCPEData.patchValue({
      cpe_institutions: this.cpe_data_array[index].cpe_institutions,
      cpe_services: this.cpe_data_array[index].cpe_services,
      cpe_category_services: this.cpe_data_array[index].cpe_category_services,
    });

    this.modalService.open(targetModal, {
      centered: true,
      backdrop: "static",
      keyboard: false,
      size: "xl",
    });
  }

  closeBtnClick() {
    this.modalService.dismissAll();
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

  GetGeneralData() {
    this.spinner.show();
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));

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

          if (
            res.data.doc_request_name &&
            res.data.doc_request_email &&
            res.data.doc_request_phone
          ) {
            this.StatusFormdoc = true;
          }

          this.Form_chargues.patchValue({
            charges_request_name: res.data.charges_request_name,
            charges_request_email: res.data.charges_request_email,
            charges_request_phone: res.data.charges_request_phone,
          });

          if (
            res.data.charges_request_name &&
            res.data.charges_request_email &&
            res.data.charges_request_phone &&
            res.data.doc_request_name &&
            res.data.doc_request_email &&
            res.data.doc_request_phone
          ) {
            this.StatusChargues = true;
          }

          this.Form_other_data.patchValue({
            time_in_business: res.data.time_in_business,
            last_year_sales: res.data.last_year_sales,
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
            owncompany_name:res.data.owncompany_name,
            economic_sector:res.data.economic_sector,
            email_isr:res.data.email_isr,
            email_isr_name:res.data.email_isr_name,
            email_isr_phone:res.data.email_isr_phone,
            email_send_fact: res.data.email_send_fact,
            email_send_fact_name: res.data.email_send_fact_name,
            email_send_fact_phone: res.data.email_send_fact_phone,
            email_accounting: res.data.email_accounting,
            email_accounting_name: res.data.email_accounting_name,
        email_accounting_phone: res.data.email_accounting_phone,
        position_held:res.data.position_held,
        business_contact_name:res.data.business_contact_name,
    business_contact_rol:res.data.business_contact_rol,


          });

          if (res.data.iva_holder == 1 && res.data.isr_holder == 1) {
            if (
              res.data.time_in_business &&
              res.data.last_year_sales &&
              res.data.iva_percentage != "" &&
              res.data.isr_percentage != ""
            ) {
              this.StatusOtherData = true;
            }
          } else if (res.data.iva_holder == 0 && res.data.isr_holder == 1) {
            if (
              res.data.time_in_business &&
              res.data.last_year_sales &&
              res.data.isr_percentage != ""
            ) {
              this.StatusOtherData = true;
            }
          } else if (res.data.iva_holder == 1 && res.data.isr_holder == 0) {
            if (
              res.data.time_in_business &&
              res.data.last_year_sales &&
              res.data.iva_percentage != ""
            ) {
              this.StatusOtherData = true;
            }
          } else if (res.data.iva_holder == 0 && res.data.isr_holder == 0) {
            if (res.data.time_in_business && res.data.last_year_sales) {
              this.StatusOtherData = true;
            }
          }

          this.changeIsr();
          this.changeIva();

          this.dataAssociates = res.data.associates;
          if (this.dataAssociates.length > 0) {
            this.StatusPartners = true;
          }

          this.dataDirectors = res.data.directors;
          if (this.dataDirectors.length > 0) {
            this.StatusDirectors = true;
          }

          this.dataBankaccount = res.data.bank_accounts;
          if (this.dataBankaccount.length > 0) {
            this.StatusBankAccount = true;
          }

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
          if (this.dataBankLoans.length > 0) {
            this.StatusBankLoans = true;
          }
          if (this.dataBankLoans.length == 0 && res.data.btn_2 == 0) {
            this.StatusBankLoans = true;
          }
          if (this.dataBankLoans.length == 0 && res.data.btn_2 == 1) {
            this.StatusBankLoans = false;
          }

          //console.log("res.data.btn_3: ", res.data.btn_3);
          this.FormFactoring.controls.contain.setValue(res.data.btn_3 + "");

          this.dataFactoring = res.data.factorings;
          if (this.dataFactoring.length > 0) {
            this.StatusFactoring = true;
          } else if (this.dataFactoring.length == 0 && res.data.btn_3 == 0) {
            this.StatusFactoring = true;
          } else if (this.dataFactoring.length == 0 && res.data.btn_3 == 1) {
            this.StatusFactoring = false;
          }
          if (res.data.btn_3 == 0) {

            this.FormFactoring.controls["entity"].disable();
            this.FormFactoring.controls["warranty"].disable();
            this.FormFactoring.controls["amount_awarded"].disable();
            this.FormFactoring.controls["amount_used"].disable();
            this.FormFactoring.controls["balance"].disable();
          }

          this.dataSupplier = res.data.suppliers;
          if (this.dataSupplier.length >= 1) {
            this.Statussuppliers = true;
          }

          this.dataCustomer = res.data.clients;
          if (this.dataCustomer.length > 0) {
            this.StatusCustomers = true;
          }

          this.dataInsurances = res.data.insurances;
          if (this.dataInsurances.length > 0) {
            this.StatusInsurances = true;
          }

          this.FormProductServices.patchValue({
            productions_commerce: res.data.productions_commerce,
            brands: res.data.brands,
            first_quarter: res.data.first_quarter,
            second_quarter: res.data.second_quarter,
            third_quarter: res.data.third_quarter,
            fourth_quarter: res.data.fourth_quarter,
          });

          if (
            res.data.productions_commerce &&
            res.data.brands &&
            res.data.first_quarter &&
            res.data.second_quarter &&
            res.data.third_quarter &&
            res.data.fourth_quarter
          ) {
            this.StatusProductServices = true;
          }

          this.FormMarketSegment.patchValue({
            market_segment: res.data.market_segment,
            competitors: res.data.competitors,
            market_percentage: res.data.market_percentage,
            distribution_channels: res.data.distribution_channels,
          });

          if (
            res.data.market_segment &&
            res.data.competitors &&
            res.data.market_percentage &&
            res.data.distribution_channels
          ) {
            this.StatusMarket = true;
          }

          this.dataCountryoperations = res.data.country_operations;
          if (this.dataCountryoperations.length > 0) {
            this.StatusCountryOperations = true;
          }

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

          if (contStructure >= 1) {
            this.StatusOperativeStructure = true;
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

          if (res.data.sales_foreign_currency == 1) {
            if (
              res.data.cash_sales &&
              res.data.credit_sales &&
              res.data.local_sales &&
              res.data.exports_sales &&
              res.data.sales_foreign_currency_origin != "" &&
              res.data.sales_foreign_currency_origin != null
            ) {
              this.StatusSales = true;
            }
          } else {
            if (
              res.data.cash_sales &&
              res.data.credit_sales &&
              res.data.local_sales &&
              res.data.exports_sales
            ) {
              this.StatusSales = true;
            }
          }

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

          if (res.data.purchases_foreign_currency == 1) {
            if (
              res.data.cash_purchases &&
              res.data.credit_purchases &&
              res.data.local_purchases &&
              res.data.exports_purchases &&
              String(res.data.purchases_foreign_currency_origin) != "" &&
              String(res.data.purchases_foreign_currency_origin) != null
            ) {
              this.StatusPurchases = true;
            }
          } else {
            if (
              res.data.cash_purchases &&
              res.data.credit_purchases &&
              res.data.local_purchases &&
              res.data.exports_purchases
            ) {
              this.StatusPurchases = true;
            }
          }

          this.changePurchases();
          this.changeSales();
          //this.changeHasBussiness();

          this.Formobligatedperson.patchValue({
            social_reason_comercial_name: res.data.social_reason_comercial_name,
            agency_name: res.data.agency_name,
            agency_code: res.data.agency_code,
          });

          if (
            res.data.social_reason_comercial_name &&
            res.data.agency_name &&
            res.data.agency_code
          ) {
            this.StatusObligated = true;
          }

          this.FormRequestEntity.patchValue({
            entity_type: res.data.entity_type,
            //entity_type_especification: res.data.entity_type_especification,
            name_entity: res.data.name_entity,
            comercial_name: res.data.comercial_name,
            economic_antivity: res.data.economic_antivity,
            ive_02_nit: res.data.ive_02_nit,
            constitution_country: res.data.constitution_country,
          });

          if (
            res.data.entity_type >= 0 &&
            //res.data.entity_type_especification &&
            res.data.name_entity &&
            res.data.comercial_name &&
            res.data.economic_antivity &&
            res.data.ive_02_nit &&
            res.data.constitution_country
          ) {
            this.StatusRequestEnt = true;
          }

          this.FormPublicConstitution.patchValue({
            constitution_doc_num: res.data.constitution_doc_num,
            constitution_doc_date: this.formatDate(
              res.data.constitution_doc_date
            ),
            constitution_doc_notari: res.data.constitution_doc_notari,
          });

          if (
            res.data.constitution_doc_num &&
            res.data.constitution_doc_date &&
            res.data.constitution_doc_notari
          ) {
            this.StatusPublicCon = true;
          }

          this.FormModPublicConstitution.patchValue({
            mod_constitution_doc_num: res.data.mod_constitution_doc_num,
            mod_constitution_doc_date: this.formatDate(
              res.data.mod_constitution_doc_date
            ),
            mod_constitution_doc_notari: res.data.mod_constitution_doc_notari,
          });

          if (
            res.data.mod_constitution_doc_num &&
            res.data.mod_constitution_doc_date &&
            res.data.mod_constitution_doc_notari
          ) {
            this.StatusModPublicCon = true;
          }

          this.FormSocietyPatent.patchValue({
            society_patent_num: res.data.society_patent_num,
            society_patent_folio: res.data.society_patent_folio,
            society_patent_book: res.data.society_patent_book,
            society_patent_record_num: res.data.society_patent_record_num,
          });

          if (
            res.data.society_patent_num &&
            res.data.society_patent_folio &&
            res.data.society_patent_book &&
            res.data.society_patent_record_num
          ) {
            this.StatusSocietyPatent = true;
          }

          this.FormCompanyPatent.patchValue({
            company_patent_num: res.data.company_patent_num,
            company_patent_folio: res.data.company_patent_folio,
            company_patent_book: res.data.company_patent_book,
            company_patent_record_num: res.data.company_patent_record_num,
          });

          if (
            res.data.company_patent_num &&
            res.data.company_patent_folio &&
            res.data.company_patent_book &&
            res.data.company_patent_record_num
          ) {
            this.StatusCompanyPatent = true;
          }

          this.FormGovernmental.patchValue({
            governmental_num: res.data.governmental_num,
            governmental_date: this.formatDate(res.data.governmental_date),
            governmental_autority: res.data.governmental_autority,
          });

          if (
            res.data.governmental_num &&
            res.data.governmental_date &&
            res.data.governmental_autority
          ) {
            this.StatusGovernmental = true;
          }

          this.FormRecord.patchValue({
            record_name: res.data.record_name,
            record_num: res.data.record_num,
            record_folio: res.data.record_folio,
            record_book: res.data.record_book,
          });

          if (
            res.data.record_name &&
            res.data.record_num &&
            res.data.record_folio &&
            res.data.record_book
          ) {
            this.StatusRecord = true;
          }

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
          this.selecionCountry2 = res.data.country_site;
          this.selecionDepartment2 = res.data.department_site;
          this.selecionDepartment2ID = this.selecionDepartment2 ? this.optionsDepartments.find(dep => dep.name == this.selecionDepartment2).id : -1;
          this.selecionMunicipality2 = res.data.muni_site;
          this.selecionMunicipality2ID = this.selecionMunicipality2 ? this.optionsMunicipalities.find(muni => muni.name == this.selecionMunicipality2).id : -1;

          if (
            res.data.zone_site &&
            res.data.department_site &&
            res.data.muni_site &&
            res.data.country_site &&
            res.data.entity_phone &&
            res.data.entity_website &&
            res.data.entity_email &&
            String(res.data.entity_cpe)
          ) {
            this.StatusFormHeadOffice = true;
          }

          this.dataComercialCompany = res.data.comercial_companys;
          if (this.dataComercialCompany.length > 0) {
            this.StatusComercialCompany = true;
          }

          this.dataFinancials = res.data.financials;
          if (this.dataFinancials.length > 0) {
            this.StatusFinancial = true;
          }

          this.dataMember = res.data.members;
          if (this.dataMember.length > 0) {
            this.StatusMember = true;
          }

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
            comercial_activity: res.data.comercial_activity,
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

          if (
            String(res.data.shareholder_more_than_ten) &&
            String(res.data.foreign_shareholder_more_than_ten) &&
            res.data.comercial_activity &&
            res.data.agencies_number &&
            res.data.employees_number &&
            res.data.income_currency_type &&
            //res.data.other_income_currency_type &&
            res.data.expenses_currency_type &&
            //res.data.other_expenses_currency_type &&
            String(res.data.total_income) &&
            //res.data.total_income_amount &&
            String(res.data.total_expenses)
            //res.data.total_expenses_amount
          ) {
            this.StatusFinancialInformation = true;
          }

          this.dataCompanies = res.data.companys;


          if (
            String(res.data.holding) == "1" &&
            this.dataCompanies.length > 0
          ) {
            this.StatusCompanies = true;
          } else if (
            String(res.data.holding) == "0"/*  && */
            /*res.data.btn_1 == 0  &&
            this.dataCompanies.length == 0 */
          ) {
            this.StatusCompanies = true;
          } else if (
            String(res.data.holding) == "1" &&
            /* res.data.btn_1 == 1 && */
            this.dataCompanies.length == 0
          ) {
            this.StatusCompanies = false;
          }

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

          this.selecionCountry3 = res.data.rep_id_emission_country;
          this.selecionDepartment3 = res.data.rep_id_emission_dep;
          this.selecionDepartment3ID = this.selecionDepartment3 ? this.optionsDepartments.find(dep => dep.name == this.selecionDepartment3).id : -1;
          this.selecionMunicipality3 = res.data.rep_id_emission_muni;
          this.selecionMunicipality3ID = this.selecionMunicipality3 ? this.optionsMunicipalities.find(muni => muni.name == this.selecionMunicipality3).id : -1;

          this.selecionCountry4 = res.data.rep_country;
          this.selecionDepartment4 = res.data.rep_dep;
          this.selecionDepartment4ID = this.selecionDepartment4 ? this.optionsDepartments.find(dep => dep.name == this.selecionDepartment4).id : -1;
          this.selecionMunicipality4 = res.data.rep_muni;
          this.selecionMunicipality4ID = this.selecionMunicipality4 ? this.optionsMunicipalities.find(muni => muni.name == this.selecionMunicipality4).id : -1;


          if (
            res.data.rep_f_lastname &&
            res.data.rep_s_lastname &&
            res.data.rep_firstname &&
            res.data.rep_secondname &&
            res.data.rep_fecnac &&
            res.data.rep_nationality &&
            //res.data.rep_other_nationality &&
            res.data.rep_place_birth &&
            String(res.data.rep_migration_status) &&
            res.data.rep_other_migration_status &&
            String(res.data.rep_genre) &&
            res.data.rep_marital_status &&
            res.data.rep_profesion &&
            res.data.rep_id_document_type &&
            res.data.rep_id_number &&
            res.data.rep_id_emission_dep &&
            res.data.rep_id_emission_muni &&
            res.data.rep_id_emission_country &&
            res.data.rep_nit &&
            res.data.rep_phone &&
            res.data.rep_cellphone &&
            res.data.rep_email &&
            res.data.rep_particular_address &&
            res.data.rep_zone &&
            res.data.rep_dep &&
            res.data.rep_muni &&
            res.data.rep_country &&
            res.data.rep_notarialact_inscription_number &&
            res.data.rep_notarialact_fecini &&
            res.data.rep_notarialact_fecend &&
            res.data.rep_notarialact_notary &&
            res.data.rep_notarialact_position &&
            String(res.data.rep_acts_likes_mandatory) &&
            (res.data.rep_registry_name ||
              res.data.rep_registry_name == "" ||
              res.data.rep_registry_name == null) &&
            (res.data.rep_registry_number ||
              res.data.rep_registry_number == "" ||
              res.data.rep_registry_number == null) &&
            (res.data.rep_registry_folio ||
              res.data.rep_registry_folio == "" ||
              res.data.rep_registry_folio == null) &&
            (res.data.rep_registry_book ||
              res.data.rep_registry_book == "" ||
              res.data.rep_registry_book == null) &&
            String(res.data.rep_act_only_forentity) &&
            res.data.rep_individual_f_lastname &&
            res.data.rep_individual_s_lastname &&
            //res.data.rep_individual_marry_lastname &&
            res.data.rep_individual_firstname &&
            res.data.rep_individual_secondname &&
            //res.data.rep_individual_other_name &&
            String(res.data.rep_individual_genre) &&
            res.data.rep_individual_comercialname &&
            res.data.rep_individual_fecnac &&
            res.data.rep_individual_country &&
            //res.data.rep_individual_other_nationality &&
            res.data.rep_individual_id_document_type &&
            res.data.rep_individual_id_document_number &&
            res.data.rep_individual_id_document_emission_country &&
            res.data.rep_individual_nit &&
            res.data.rep_individual_phone &&
            res.data.rep_individual_cellphone &&
            String(res.data.rep_individual_pep) &&
            res.data.rep_individual_pep_type_other &&
            String(res.data.rep_individual_pep_relatives) &&
            String(res.data.rep_individual_pep_close_person)
          ) {
            this.StatusRepresentativeData = true;
          }
          if (
            res.data.rep_act_only_forentity == "1" &&
            res.data.rep_f_lastname &&
            res.data.rep_s_lastname &&
            res.data.rep_firstname &&
            res.data.rep_secondname &&
            res.data.rep_fecnac &&
            res.data.rep_nationality &&
            res.data.rep_place_birth &&
            String(res.data.rep_migration_status) &&
            res.data.rep_other_migration_status &&
            String(res.data.rep_genre) &&
            res.data.rep_marital_status &&
            res.data.rep_profesion &&
            res.data.rep_id_document_type &&
            res.data.rep_id_number &&
            res.data.rep_id_emission_dep &&
            res.data.rep_id_emission_muni &&
            res.data.rep_id_emission_country &&
            res.data.rep_nit &&
            res.data.rep_phone &&
            res.data.rep_cellphone &&
            res.data.rep_email &&
            res.data.rep_particular_address &&
            res.data.rep_zone &&
            res.data.rep_dep &&
            res.data.rep_muni &&
            res.data.rep_country &&
            res.data.rep_notarialact_inscription_number &&
            res.data.rep_notarialact_fecini &&
            res.data.rep_notarialact_fecend &&
            res.data.rep_notarialact_notary &&
            res.data.rep_notarialact_position &&
            String(res.data.rep_acts_likes_mandatory) &&
            (res.data.rep_registry_name ||
              res.data.rep_registry_name == "" ||
              res.data.rep_registry_name == null) &&
            (res.data.rep_registry_number ||
              res.data.rep_registry_number == "" ||
              res.data.rep_registry_number == null) &&
            (res.data.rep_registry_folio ||
              res.data.rep_registry_folio == "" ||
              res.data.rep_registry_folio == null) &&
            (res.data.rep_registry_book ||
              res.data.rep_registry_book == "" ||
              res.data.rep_registry_book == null) &&
            String(res.data.rep_act_only_forentity) &&
            String(res.data.rep_individual_pep) &&
            res.data.rep_individual_pep_type_other &&
            String(res.data.rep_individual_pep_relatives) &&
            String(res.data.rep_individual_pep_close_person)
          ) {
            this.StatusRepresentativeData = true;
          }

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
          console.log("res.data.prod_serv_source_found::");
          console.log(res.data.prod_serv_source_found);
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

          if (
            /*  res.data.prod_serv_product_type &&
             res.data.prod_serv_product_name && 
             res.data.prod_serv_currency &&
             String(res.data.prod_serv_cover) &&*/
            /* res.data.prod_serv_desciption && */
            /* res.data.prod_serv_initial_amount && */
            /* res.data.prod_serv_monthly_amount && */
            res.data.prod_serv_purpose &&
            res.data.prod_serv_source_found &&
            (res.data.prod_serv_entity_loan ||
              res.data.prod_serv_entity_loan == "" ||
              res.data.prod_serv_entity_loan == null) &&
            (res.data.prod_serv_entity_account ||
              res.data.prod_serv_entity_account == "" ||
              res.data.prod_serv_entity_account == null) &&
            (res.data.prod_serv_other ||
              res.data.prod_serv_other == "" ||
              res.data.prod_serv_other == null) &&
            String(res.data.prod_serv_transfers) &&
            String(res.data.prod_serv_transfers_level) &&
            String(res.data.prod_serv_other_signers) /* &&
            res.data.prod_serv_coments */
          ) {
            this.StatusProductService = true;
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
            fec_is_cpe:String(res.data.fec_is_cpe)
          });

          this.cpe_data_array = JSON.parse(res.data.cpe_data);
          if(res.data.fec_is_cpe == 0){
            this.StatusCPE = true;
          }
          else{
            if (
              res.data.cpe_individual_person &&
              String(res.data.cpe_entity) &&
              String(res.data.cpe_other_sginers) &&
              String(res.data.cpe_legal_rep) &&
              res.data.cpe_person_f_lastname &&
              res.data.cpe_person_s_lastname &&
              res.data.cpe_person_firstname &&
              res.data.cpe_person_secondname &&
              res.data.cpe_comercial_name &&
              String(res.data.cpe_condition) &&
              String(res.data.cpe_is_cpe) &&
              String(res.data.cpe_service_is_in_finances) &&
              String(res.data.cpe_have_services_with_obligate_person) &&
              String(res.data.spe_guatecompras_status) &&
              (JSON.parse(res.data.cpe_data) != null ||
                JSON.parse(res.data.cpe_data) != "")
            ) {
              this.StatusCPE = true;
            }
            else{
              this.StatusCPE = false;
            }

          }

           

          /* this.dataDeudores.forEach((element) => {
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
          }); */

         /* console.log(res.data); */
         let deb = null;
         if(res.data.deb_nit && res.data.deb_social_reason){
          deb = this.dataDeudores.find(d => d.nit == res.data.deb_nit && d.business_name.toLowerCase() == res.data.deb_social_reason.toLowerCase());

         }
        
          /* console.log(deb);
         console.log(res.data.deb_iva_percentage);
         console.log(typeof res.data.deb_iva_percentage); */
          /* deb_pay_days */
          this.FormDebtors.patchValue({
            deb_social_reason: deb?deb.id_debtor:null,
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
            /* deb_isr_percentage: res.data.deb_isr_percentage, */
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
          /* if (res.data.deb_isr == 0) {
            this.FormDebtors.controls.deb_isr_percentage.disable();
          } */
          if (res.data.deb_iva == 0) {
            this.FormDebtors.controls.deb_iva_percentage.disable();
          }

          if (
            res.data.deb_social_reason &&
            res.data.deb_nit &&
            res.data.deb_comercial_name &&
            res.data.deb_phones &&
            res.data.deb_comercial_address &&
            res.data.deb_charge_address &&
            res.data.deb_principal_activity &&
            res.data.deb_contact &&
            res.data.deb_credit_days &&
            res.data.deb_pay_days &&
            res.data.deb_pay_schedule &&
            String(res.data.deb_pay_form) &&
            res.data.deb_bank_name &&
            String(res.data.deb_iva) &&

           /*  String(res.data.deb_isr) && */

            String(res.data.deb_emit_pass) &&
            res.data.deb_web_age &&
            String(res.data.deb_belongs_com_group) &&
            res.data.deb_pay_confirmation &&
            res.data.deb_comercial_relation_time &&
            res.data.deb_product &&
            res.data.debs_monthly_ave_purchases &&
            res.data.deb_direct_phone &&
            res.data.deb_email1_bill_confirmation &&
            res.data.deb_email2_bill_confirmation
          ) {
            this.StatusDebtors = true;
          }
          /* if (res.data.deb_iva == 1) {
            
          } */
          /* res.data.deb_isr_percentage
          res.data.deb_iva_percentage */

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

          if (
            res.data.acta_hour &&
            res.data.acta_notary_name &&
            String(res.data.acta_notary_constituido) &&
            res.data.acta_constituido_address &&
            res.data.acta_age &&
            res.data.acta_dpi_letters &&
            res.data.acta_dpi_numbers &&
            res.data.acta_date &&
            res.data.acta_autorize_in &&
            String(res.data.acta_notary_autorize_gen) &&
            res.data.acta_notary_autorize_name &&
            res.data.acta_registry &&
            res.data.acta_folio &&
            res.data.acta_book &&
            String(res.data.acta_sight_doc) &&
            res.data.acta_autorize_date &&
            String(res.data.acta_autorize_person) &&
            res.data.acta_authorize_name &&
            res.data.acta_authorize_assembly_date &&
            res.data.acta_agenda_number_point &&
            String(res.data.acta_rep_legal_gender) &&
            res.data.acta_credit_amount &&
            res.data.acta_lead_time &&
            String(res.data.acta_person_who_authorize) &&
            res.data.acta_authorize_hour &&
            res.data.acta_pages_number &&
            String(res.data.acta_page_form)
          ) {
            this.StatusMinute = true;
          }

          //FEIC
          if(!this.flagFeic){
            //console.log("ENTRO A ACTUALIZAR EL FEIC!!!!!!!!!!!!!!!!!!!!!");
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
            else{
              //console.log('Entro....')
              this.activeFeicIncomeSource = this.feic_income_source[0];
            }

            const isArray4: FormArray = this.formRichpep.get(
              "isArray"
            ) as FormArray;
  
            if (
              res.data.feic_pep_wealth_origin != null &&
              res.data.feic_pep_wealth_origin != ""
            ) {
              /* console.log('res.data.feic_pep_wealth_origin:: ' + res.data.feic_pep_wealth_origin); */
              JSON.parse(res.data.feic_pep_wealth_origin).forEach((element) => {
                isArray4.push(new FormControl(`${element}`));
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
                  this.SourceIncomechexboxes[0].status = true;
                  this.selecionRelacionDeDependencia = 1;
                } else if (element == 1) {
                  this.SourceIncomechexboxes[1].status = true;
                  this.selecionNegocioPropio = 1;
                } else if (element == 2) {
                  this.SourceIncomechexboxes[2].status = true;
                  this.selecionOtras = 1;
                }
              });
            }
            this.fecPepsRelativeVar = String(res.data.fec_peps_relative);
            this.fecPepsPartnerVar = String(res.data.fec_peps_partener);
            
      
            this.FormFEIC.patchValue({
              feic_country: res.data.feic_country,
              feic_dep: res.data.feic_dep,
              feic_muni: res.data.feic_muni,
              feic_client_acts_own_behalf: String(
                res.data.feic_client_acts_own_behalf
              ),
              feic_behalf: res.data.feic_behalf,
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
              feic_eco_company_name: res.data.feic_eco_company_name,
              feic_eco_phones: res.data.feic_eco_phones,
              feic_eco_rol: res.data.feic_eco_rol,
              feic_eco_company_address: res.data.feic_eco_company_address,
              feic_eco_company_zone: res.data.feic_eco_company_zone,
              feic_eco_company_dep: res.data.feic_eco_company_dep,
              feic_eco_company_mun: res.data.feic_eco_company_mun,
              feic_eco_company_country: res.data.feic_eco_company_country,
              feic_eco_company_activity: res.data.feic_eco_company_activity,
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
              feic_eco_other_profesional_activity:
                res.data.feic_eco_other_profesional_activity,
              feic_eco_other_alimony: res.data.feic_eco_other_alimony,
              feic_eco_other_rent: res.data.feic_eco_other_rent,
              feic_eco_other_retirement: res.data.feic_eco_other_retirement,
              feic_eco_oher_aprox_income: res.data.feic_eco_oher_aprox_income,
              feic_eco_other_total_income: res.data.feic_eco_other_total_income,
  
              feic_eco_owncomp_currency: res.data.feic_eco_owncomp_currency,
              feic_eco_company_sector: res.data.feic_eco_company_sector,
              feic_eco_company_income: res.data.feic_eco_company_income,
              feic_eco_other_profesional_activity_income: res.data.feic_eco_other_profesional_activity_income,
              feic_eco_other_alimony_income: res.data.feic_eco_other_alimony_income,
              feic_eco_other_rent_income: res.data.feic_eco_other_rent_income,
              feic_eco_other_retirement_income: res.data.feic_eco_other_retirement_income,
              feic_eco_other_income_income: res.data.feic_eco_other_income_income,
              feic_eco_other_profesional_activity_curency: res.data.feic_eco_other_profesional_activity_curency,
              feic_eco_other_alimony_curency: res.data.feic_eco_other_alimony_curency,
              feic_eco_other_rent_curency: res.data.feic_eco_other_rent_curency,
              feic_eco_other_retirement_curency: res.data.feic_eco_other_retirement_curency,
              feic_eco_other_income_currency: res.data.feic_eco_other_income_currency,
              feic_income_sources_total: res.data.feic_income_sources_total,
              feic_income_sources_purpose:res.data.feic_income_sources_purpose,
              feic_eco_other_specific:res.data.feic_eco_other_specific,
              feic_eco_company_currency:res.data.feic_eco_company_currency,
              feic_eco_other_income_curency:res.data.feic_eco_other_income_curency,
              feic_economic_profile_date: this.formatDate(
                res.data.feic_economic_profile_date
              ),
              feic_economic_profile_admission:res.data.feic_economic_profile_admission


            });
  
            // NUEVA VERSION-------------
            this.selecionActsOnBehalf = res.data.feic_client_acts_own_behalf == 1 ? true : false;
            this.HasInsuraces = res.data.btn_insurance;
            //console.log("typeof this.HasInsuraces::",typeof this.HasInsuraces );
  
            this.FormFEICGeneral.patchValue({
              /* feic_country: res.data.feic_country,
              feic_dep: res.data.feic_dep,
              feic_muni: res.data., */
              feic_client_acts_own_behalf: res.data.feic_client_acts_own_behalf,
              feic_behalf: res.data.feic_behalf
  
            });
  
            this.selecionCountry5 = res.data.feic_country;
            this.selecionDepartment5 = res.data.feic_dep;
            this.selecionDepartment5ID = this.selecionDepartment5 ? this.optionsDepartments.find(dep => dep.name == this.selecionDepartment5).id : -1;
            this.selecionMunicipality5 = res.data.feic_muni;
            this.selecionMunicipality5ID = this.selecionMunicipality5 ? this.optionsMunicipalities.find(muni => muni.name == this.selecionMunicipality5).id : -1;
  
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
            this.selecionMunicipality10ID = this.selecionMunicipality10 ? this.optionsMunicipalities.find(muni => muni.name == this.selecionMunicipality10).id : -1;
  
            this.selecionCountry11 = res.data.feic_iddoc_emision_country;
            this.selecionDepartment11 = res.data.feic_iddoc_emision_dep;
            this.selecionDepartment11ID = this.selecionDepartment11 ? this.optionsDepartments.find(dep => dep.name == this.selecionDepartment11).id : -1;
            this.selecionMunicipality11 = res.data.feic_iddoc_emision_mun;
            this.selecionMunicipality11ID = this.selecionMunicipality11 ? this.optionsMunicipalities.find(muni => muni.name == this.selecionMunicipality11).id : -1;
  
            this.selecionCountry6 = res.data.feic_address_country
            this.selecionDepartment6 = res.data.feic_address_dep;
            this.selecionMunicipality6 = res.data.feic_address_mun;
            /* console.log("res.data.feic_address_dep:" + res.data.feic_address_dep);
            console.log("res.data.feic_address_mun:" + res.data.feic_address_mun);
            console.log("this.optionsDepartments.length:: " + this.optionsDepartments.length);
            console.log("this.optionsMunicipalities.length:: " + this.optionsMunicipalities.length); */
            this.selecionDepartment6ID = this.selecionDepartment6 ? this.optionsDepartments.find(dep => dep.name == this.selecionDepartment6).id : -1;
            this.selecionMunicipality6ID = this.selecionMunicipality6 ? this.optionsMunicipalities.find(muni => muni.name == this.selecionMunicipality6).id : -1;
            this.selecionFeicMigrationCondition = res.data.feic_migration_condition;
  
            this.OtherIncomecheckboxes[0].status = res.data.feic_eco_other_profesional_activity_status && res.data.feic_eco_other_profesional_activity_status == 1 ? true : false;
            this.OtherIncomecheckboxes[1].status = res.data.feic_eco_other_alimony_status && res.data.feic_eco_other_alimony_status == 1 ? true : false;
            this.OtherIncomecheckboxes[2].status = res.data.feic_eco_other_rent_status && res.data.feic_eco_other_rent_status == 1 ? true : false;
            this.OtherIncomecheckboxes[3].status = res.data.feic_eco_other_retirement_status && res.data.feic_eco_other_retirement_status == 1 ? true : false;
            this.OtherIncomecheckboxes[4].status = res.data.feic_eco_other_income_status && res.data.feic_eco_other_income_status == 1 ? true : false;
  
            this.selecionCountry8 = res.data.feic_eco_owncomp_country
            this.selecionDepartment8 = res.data.feic_eco_owncomp_dep;
            this.selecionMunicipality8 = res.data.feic_eco_owncomp_mun;
  
            this.selecionDepartment8ID = this.selecionDepartment8 ? this.optionsDepartments.find(dep => dep.name == this.selecionDepartment8).id : -1;
            this.selecionMunicipality8ID = this.selecionMunicipality8 ? this.optionsMunicipalities.find(muni => muni.name == this.selecionMunicipality8).id : -1;
  
  
            this.selecionCountry7 = res.data.feic_eco_company_country
            this.selecionDepartment7 = res.data.feic_eco_company_dep;
            this.selecionMunicipality7 = res.data.feic_eco_company_mun;
  
            this.selecionDepartment7ID = this.selecionDepartment7 ? this.optionsDepartments.find(dep => dep.name == this.selecionDepartment7).id : -1;
            this.selecionMunicipality7ID = this.selecionMunicipality7 ? this.optionsMunicipalities.find(muni => muni.name == this.selecionMunicipality7).id : -1;

            this.selecionCountry99 = res.data.feicp_iddoc_emision_country
            this.selecionDepartment99 = res.data.feicp_iddoc_emision_dep;
            this.selecionDepartment99ID = this.selecionDepartment99 ? this.optionsDepartments.find(dep => dep.name == this.selecionDepartment99).id : -1;
  

          }
          else{
            this.flagFeic = false;
          }
          


          



          //------------------

          if (
            res.data.feic_country &&
            /* res.data.feic_dep &&
            res.data.feic_muni && */
            String(res.data.feic_client_acts_own_behalf) &&
            /* res.data.feic_behalf && */
            res.data.feic_f_lastname &&
            res.data.feic_s_lastname &&
            res.data.feic_firstname &&
            res.data.feic_secondname &&
            res.data.feic_fecnac &&
            res.data.feic_country_birth &&
            res.data.feic_dep_birth &&
            res.data.feic_muni_birth &&
            res.data.feic_nationality &&
            String(res.data.feic_migration_condition) &&
            String(res.data.feic_gen) &&
            res.data.feic_civil_status &&
            res.data.feic_profesion &&
            res.data.feic_iddoc_type &&
            res.data.feic_iddoc_num &&
            //res.data.feic_iddoc_emision_dep &&
            //res.data.feic_iddoc_emision_mun && 
            res.data.feic_iddoc_emision_country &&
            res.data.feic_nit &&
            res.data.feic_phone &&
            res.data.feic_movil &&
            res.data.feic_email &&
            res.data.feic_address &&
            res.data.feic_address_zone &&
            /* res.data.feic_address_dep &&
            res.data.feic_address_mun &&*/
            res.data.feic_address_country /* && */
            /*res.data.feicp_f_lastname &&
            res.data.feicp_s_lastname &&
            res.data.feicp_firstname &&
            res.data.feicp_secondname &&
            String(res.data.feicp_gen) &&
             res.data.feicp_comercial_name &&
            res.data.feicp_fecnac &&
            res.data.feicp_contitutution_or_nationality &&
            res.data.feicp_iddoc_type &&
            res.data.feicp_iddoc_num &&
            //res.data.feicp_iddoc_emision_dep &&
            res.data.feicp_iddoc_emision_country &&
            res.data.feicp_nit &&
            res.data.feicp_phone &&
            res.data.feicp_movilphone &&
            String(res.data.fecp_ispep) &&
            String(res.data.fecp_iscpe) && */
            /* String(res.data.fec_ispep) &&
            (res.data.feic_pep_wealth_origin ||
              res.data.feic_pep_wealth_origin == "" ||
              res.data.feic_pep_wealth_origin == null) &&
            String(res.data.fec_peps_relative) &&
            String(res.data.fec_peps_partener) &&
            String(res.data.fec_is_cpe)  *//* && */
            /* res.data.feic_workref_name1 &&
            res.data.feic_workref_phone1 &&
            res.data.feic_workref_movil1 &&
            res.data.feic_workref_name2 &&
            res.data.feic_workref_phone2 &&
            res.data.feic_workref_movil2 &&
            res.data.feic_ref_name1 &&
            res.data.feic_ref_phone1 &&
            res.data.feic_ref_movil1 &&
            res.data.feic_ref_name2 &&
            res.data.feic_ref_phone2 &&
            res.data.feic_ref_movil2 && */
            /* (res.data.feic_pep_entity ||
              res.data.feic_pep_entity == "" ||
              res.data.feic_pep_entity == null) &&
            (res.data.feic_pep_role ||
              res.data.feic_pep_role == "" ||
              res.data.feic_pep_role == null) &&
            (res.data.feic_pep_country_entity ||
              res.data.feic_pep_country_entity == "" ||
              res.data.feic_pep_country_entity == null) &&
            (res.data.feic_pep_wealth_especific ||
              res.data.feic_pep_wealth_especific == "" ||
              res.data.feic_pep_wealth_especific == null) &&
            res.data.feic_source_income */  /* &&
            res.data.feic_eco_company_name &&
            res.data.feic_eco_phones &&
            res.data.feic_eco_rol &&
            res.data.feic_eco_company_address &&
            res.data.feic_eco_company_zone &&
            res.data.feic_eco_company_dep &&
            res.data.feic_eco_company_mun &&
            res.data.feic_eco_company_country &&
            res.data.feic_eco_company_activity &&
            res.data.feic_eco_owncomp_name &&
            res.data.feic_eco_owncomp_phones &&
            res.data.feic_eco_owncomp_nit &&
            res.data.feic_eco_owncomp_op_fec &&
            res.data.feic_eco_owncomp_business &&
            res.data.feic_eco_owncomp_pat_num &&
            res.data.feic_eco_owncomp_pat_folio &&
            res.data.feic_eco_owncomp_pat_book &&
            res.data.feic_eco_owncomp_pat_num_exp &&
            res.data.feic_eco_owncomp_income &&
            res.data.feic_eco_owncomp_address &&
            res.data.feic_eco_owncomp_zone &&
            res.data.feic_eco_owncomp_dep &&
            res.data.feic_eco_owncomp_mun &&
            res.data.feic_eco_owncomp_country &&
            res.data.feic_eco_owncomp_activity &&
            res.data.feic_eco_other_profesional_activity &&
            res.data.feic_eco_other_alimony &&
            res.data.feic_eco_other_rent &&
            res.data.feic_eco_other_retirement &&
            res.data.feic_eco_oher_aprox_income &&
            res.data.feic_eco_other_total_income */
          ) {
            this.StatusFEIC = true;
          }

          if (String(res.data.feic_client_acts_own_behalf) == "1") {
            this.FormFEIC.controls["feicp_f_lastname"].disable();
            this.FormFEIC.controls["feicp_s_lastname"].disable();
            this.FormFEIC.controls["feicp_marry_lastname"].disable();
            this.FormFEIC.controls["feicp_firstname"].disable();
            this.FormFEIC.controls["feicp_secondname"].disable();
            this.FormFEIC.controls["feicp_other_name"].disable();
            this.FormFEIC.controls["feicp_gen"].disable();
            this.FormFEIC.controls["feicp_comercial_name"].disable();
            this.FormFEIC.controls["feicp_fecnac"].disable();
            this.FormFEIC.controls[
              "feicp_contitutution_or_nationality"
            ].disable();
            this.FormFEIC.controls["feicp_other_nationality"].disable();
            this.FormFEIC.controls["feicp_iddoc_type"].disable();
            this.FormFEIC.controls["feicp_iddoc_num"].disable();
            this.FormFEIC.controls["feicp_iddoc_emision_country"].disable();
            this.FormFEIC.controls["feicp_nit"].disable();
            this.FormFEIC.controls["feicp_phone"].disable();
            this.FormFEIC.controls["feicp_movilphone"].disable();
            this.FormFEIC.controls["fecp_ispep"].disable();
            this.FormFEIC.controls["fecp_iscpe"].disable();
          }

          if (String(res.data.fec_ispep) == "0") {
            this.FormFEIC.controls["feic_pep_entity"].disable();
            this.FormFEIC.controls["feic_pep_role"].disable();
            this.FormFEIC.controls["feic_pep_country_entity"].disable();
            this.FormFEIC.controls["feic_pep_wealth_origin"].disable();
            this.FormFEIC.controls["feic_pep_wealth_especific"].disable();
          }

          /* if (
            res.data.feic_country &&
            res.data.feic_dep &&
            res.data.feic_muni &&
            String(res.data.feic_client_acts_own_behalf) == "1" &&
            res.data.feic_behalf &&
            res.data.feic_f_lastname &&
            res.data.feic_s_lastname &&
            res.data.feic_firstname &&
            res.data.feic_secondname &&
            res.data.feic_fecnac &&
            res.data.feic_country_birth &&
            res.data.feic_dep_birth &&
            res.data.feic_muni_birth &&
            res.data.feic_nationality &&
            String(res.data.feic_migration_condition) &&
            String(res.data.feic_gen) &&
            res.data.feic_civil_status &&
            res.data.feic_profesion &&
            res.data.feic_iddoc_type &&
            res.data.feic_iddoc_num &&
            res.data.feic_iddoc_emision_dep &&
            res.data.feic_iddoc_emision_mun &&
            res.data.feic_iddoc_emision_country &&
            res.data.feic_nit &&
            res.data.feic_phone &&
            res.data.feic_movil &&
            res.data.feic_email &&
            res.data.feic_address &&
            res.data.feic_address_zone &&
            res.data.feic_address_dep &&
            res.data.feic_address_mun &&
            res.data.feic_address_country &&
            String(res.data.fec_ispep) &&
            (res.data.feic_pep_wealth_origin ||
              res.data.feic_pep_wealth_origin == "" ||
              res.data.feic_pep_wealth_origin == null) &&
            String(res.data.fec_peps_relative) &&
            String(res.data.fec_peps_partener) &&
            String(res.data.fec_is_cpe) &&
            res.data.feic_workref_name1 &&
            res.data.feic_workref_phone1 &&
            res.data.feic_workref_movil1 &&
            res.data.feic_workref_name2 &&
            res.data.feic_workref_phone2 &&
            res.data.feic_workref_movil2 &&
            res.data.feic_ref_name1 &&
            res.data.feic_ref_phone1 &&
            res.data.feic_ref_movil1 &&
            res.data.feic_ref_name2 &&
            res.data.feic_ref_phone2 &&
            res.data.feic_ref_movil2 &&
            (res.data.feic_pep_entity ||
              res.data.feic_pep_entity == "" ||
              res.data.feic_pep_entity == null) &&
            (res.data.feic_pep_role ||
              res.data.feic_pep_role == "" ||
              res.data.feic_pep_role == null) &&
            (res.data.feic_pep_country_entity ||
              res.data.feic_pep_country_entity == "" ||
              res.data.feic_pep_country_entity == null) &&
            (res.data.feic_pep_wealth_especific ||
              res.data.feic_pep_wealth_especific == "" ||
              res.data.feic_pep_wealth_especific == null) &&
            res.data.feic_source_income &&
            res.data.feic_eco_company_name &&
            res.data.feic_eco_phones &&
            res.data.feic_eco_rol &&
            res.data.feic_eco_company_address &&
            res.data.feic_eco_company_zone &&
            res.data.feic_eco_company_dep &&
            res.data.feic_eco_company_mun &&
            res.data.feic_eco_company_country &&
            res.data.feic_eco_company_activity &&
            res.data.feic_eco_owncomp_name &&
            res.data.feic_eco_owncomp_phones &&
            res.data.feic_eco_owncomp_nit &&
            res.data.feic_eco_owncomp_op_fec &&
            res.data.feic_eco_owncomp_business &&
            res.data.feic_eco_owncomp_pat_num &&
            res.data.feic_eco_owncomp_pat_folio &&
            res.data.feic_eco_owncomp_pat_book &&
            res.data.feic_eco_owncomp_pat_num_exp &&
            res.data.feic_eco_owncomp_income &&
            res.data.feic_eco_owncomp_address &&
            res.data.feic_eco_owncomp_zone &&
            res.data.feic_eco_owncomp_dep &&
            res.data.feic_eco_owncomp_mun &&
            res.data.feic_eco_owncomp_country &&
            res.data.feic_eco_owncomp_activity &&
            res.data.feic_eco_other_profesional_activity &&
            res.data.feic_eco_other_alimony &&
            res.data.feic_eco_other_rent &&
            res.data.feic_eco_other_retirement &&
            res.data.feic_eco_oher_aprox_income &&
            res.data.feic_eco_other_total_income
          ) {
            this.StatusFEIC = true;
          } */

          this.dataFapep = res.data.fa_pep;
          if (this.dataFapep.length > 0) {
            this.StatusFapep = true;
          }
          else {
            this.StatusFapep = false;
          }

          this.dataServicesFeic = res.data.feic_services;
          if (this.dataServicesFeic.length > 0) {
            this.StatusServicesFeic = true;
          }
          else {
            this.StatusServicesFeic = false;
          }
          this.spinner.hide();

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
        ).subscribe();

    }
    else {
      console.log("datalocal.formid == null");
      this.activeFeicIncomeSource = this.feic_income_source[0];
    }


  }

  isFormFeicValid() {
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
      this.FormFEIC.controls.feic_phone.value != null && this.FormFEIC.controls.feic_phone.value != '' &&
      this.FormFEIC.controls.feic_movil.value != null && this.FormFEIC.controls.feic_movil.value != '' &&
      this.FormFEIC.controls.feic_email.value != null && this.FormFEIC.controls.feic_email.value != '' &&
      this.FormFEIC.controls.feic_address.value != null && this.FormFEIC.controls.feic_address.value != '' &&
      this.FormFEIC.controls.feic_address_zone.value != null && this.FormFEIC.controls.feic_address_zone.value != '' &&
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
    return resp;
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
        await this.ngOnInit();
        this.ChangeForm("3");
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
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
        await this.ngOnInit();
        //this.ChangeForm("3");
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

    await this.mysqlService
      .CreateGeneralData({
        request_id: datalocal.request_id,
        form_id: datalocal.form_id,
        rsdet_id: datalocal.metadata.rsdet_id,
        form: this.Form_other_data.value,
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


        this.ChangeForm(formSolicitud);
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }

  async SaveAssociates() {
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
        this.ChangeForm("5");
      })
      .catch((err) => {
        //console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }

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
        this.ChangeForm("8");
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
        this.ChangeForm("9");
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
        this.ChangeForm("10");
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
        this.ChangeForm("11");
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

  async SaveCustomer() {
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    let arrayinfo = [];
    arrayinfo.push(this.FormCustomer.value);
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
        this.ChangeForm("12");
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
    arrayinfo.push(this.FormUpdateCustomer.value);
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

  async SaveDirectors() {
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
        this.ChangeForm("6");
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }

  async UpdateDirectors() {
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    let arrayinfo = [];
    this.FormUpdateDirectors.value.associate_id = this.CurrentDirectors;
    arrayinfo.push(this.FormUpdateDirectors.value);
    //console.log("data array", this.FormUpdateDirectors.value);
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
        this.ChangeForm("7");
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
        this.ChangeForm("15");
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
        this.ChangeForm("16");
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
        this.ChangeForm("17");
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
        this.ChangeForm("18");
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
        this.ChangeForm("20");
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }

  async SaveRequestEntity() {
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
        this.ChangeForm("21");
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
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
        this.ChangeForm("22");
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
        this.ChangeForm("23");
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
        this.ChangeForm("24");
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
        this.ChangeForm("25");
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
        this.ChangeForm("26");
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
        this.ChangeForm("27");
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
        this.ChangeForm("28");
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
        this.ChangeForm("32");
      })
      .catch((err) => {
        console.log("err", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
      });
  }

  async SaveOriginMoney() {
    this.FormRepresentativeData.value.rep_individual_pep_type = JSON.stringify(
      this.formoriginmoney.value.isArray
    );
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    let data = this.FormRepresentativeData.value;
    data.rep_id_emission_dep = this.selecionDepartment3ID ? this.getDepName(this.selecionDepartment3ID) : null;
    data.rep_id_emission_muni = this.selecionMunicipality3ID ? this.getMuniName(this.selecionMunicipality3ID) : null;
    data.rep_dep = this.selecionDepartment4ID ? this.getDepName(this.selecionDepartment4ID) : null;
    data.rep_muni = this.selecionMunicipality4ID ? this.getMuniName(this.selecionMunicipality4ID) : null;
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
    delete(data.fec_is_cpe); 
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

  async SaveDebtors() {
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    let data = this.FormDebtors.value;
    let iddeb = parseInt(data.deb_social_reason);
    let debName = this.dataDeudores.find(d => d.id_debtor == iddeb).business_name;
    data = {...data,deb_social_reason:debName};
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
  saveFEICTemp() {
    this.spinner.show();
    let dataGeneral = this.FormFEICGeneral.value;
    dataGeneral = {
      ...dataGeneral,
      feic_country: this.selecionCountry5,
      feic_dep: this.selecionDepartment5ID && this.selecionDepartment5ID != -1 ? this.optionsDepartments.find(dep => dep.id == this.selecionDepartment5ID).name : null,
      feic_muni: this.selecionMunicipality5ID && this.selecionMunicipality5ID != -1 ? this.optionsMunicipalities.find(muni => muni.id == this.selecionMunicipality5ID).name : null,
    };
    this.FormFEIC.value.feic_pep_wealth_origin = JSON.stringify(
      this.formRichpep.value.isArray
    );
    this.FormFEIC.value.feic_source_income = JSON.stringify(
      this.formSourceIncome.value.isArray
    );
    dataGeneral = { ...dataGeneral, ...this.FormFEIC.value }
    dataGeneral.feic_dep_birth = this.selecionDepartment10ID && this.selecionDepartment10ID != -1 ? this.getDepName(this.selecionDepartment10ID) : null;
    //dataGeneral.feic_dep_birth = this.optionsDepartments.find(dep => dep.id == this.selecionDepartment10ID).name;
    dataGeneral.feic_muni_birth = this.selecionMunicipality10ID && this.selecionMunicipality10ID != -1 ? this.getMuniName(this.selecionMunicipality10ID) : null;
    //dataGeneral.feic_muni_birth = this.optionsMunicipalities.find(muni => muni.id == this.selecionMunicipality10ID).name;
    dataGeneral.feic_address_dep = this.selecionDepartment6ID && this.selecionDepartment6ID != -1 ? this.getDepName(this.selecionDepartment6ID) : null;
    //dataGeneral.feic_address_dep = this.optionsDepartments.find(dep => dep.id == this.selecionDepartment6ID).name;
    dataGeneral.feic_address_mun = this.selecionMunicipality6ID && this.selecionMunicipality6ID != -1 ? this.getMuniName(this.selecionMunicipality6ID) : null;
    //dataGeneral.feic_address_mun = this.optionsMunicipalities.find(muni => muni.id == this.selecionMunicipality6ID).name;
    dataGeneral.feic_iddoc_emision_dep = this.selecionDepartment11ID && this.selecionDepartment11ID != -1 ? this.getDepName(this.selecionDepartment11ID) : null;
    dataGeneral.feic_iddoc_emision_mun = this.selecionMunicipality11ID && this.selecionMunicipality11ID != -1 ? this.getMuniName(this.selecionMunicipality11ID) : null;

    dataGeneral.feic_eco_owncomp_dep = this.selecionDepartment8ID && this.selecionDepartment8ID != -1 ? this.getDepName(this.selecionDepartment8ID) : null;
    dataGeneral.feic_eco_owncomp_mun = this.selecionMunicipality8ID && this.selecionMunicipality8ID != -1 ? this.getMuniName(this.selecionMunicipality8ID) : null;

    dataGeneral.feic_eco_company_dep = this.selecionDepartment7ID && this.selecionDepartment7ID != -1 ? this.getDepName(this.selecionDepartment7ID) : null;
    dataGeneral.feic_eco_company_mun = this.selecionMunicipality7ID && this.selecionMunicipality7ID != -1 ? this.getMuniName(this.selecionMunicipality7ID) : null;
    dataGeneral.feicp_iddoc_emision_dep = this.selecionDepartment99ID && this.selecionDepartment99ID != -1 ? this.getDepName(this.selecionDepartment99ID) : null;


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
          localStorage.setItem("FormMetadata", JSON.stringify(datalocal));
          const newdata = JSON.parse(localStorage.getItem("FormMetadata"));
          //console.log("new data", newdata);
        }
        this.ngOnInit();


      }),
        catchError((err) => {
          //this.notifier.notify('error', 'Ocurrio un problema con la eliminacion' + err);
          console.log(err);
          this.spinner.hide();
          return of();
        })
      ).subscribe();
    /* .toPromise()
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
      }); */


  }

  //SaveFEIC() {
  //console.log('###################SaveFEIC');
  //this.saveFEICTemp();
  /* this.FormFEIC.value.feic_pep_wealth_origin = JSON.stringify(
    this.formRichpep.value.isArray
  );
  this.FormFEIC.value.feic_source_income = JSON.stringify(
    this.formSourceIncome.value.isArray
  );
  
  const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
  await this.mysqlService
    .CreateGeneralDataFEIC({
      request_id: datalocal.request_id,
      form_id: datalocal.form_id,
      rsdet_id: datalocal.metadata.rsdet_id,
      form: this.FormFEIC.value,
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
    }); */
  //}

  async SaveFaPep() {
    this.saveFormInLocalStorage(this.FormFEICGeneral, "FormFEICGeneral");
    this.saveFormInLocalStorage(this.FormFEIC, "FormFEIC");
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

  async SaveServicesFEIC() {
    this.saveFormInLocalStorage(this.FormFEICGeneral, "FormFEICGeneral");
    this.saveFormInLocalStorage(this.FormFEIC, "FormFEIC");
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

  async changeHasBussiness() {
    const datalocal = JSON.parse(localStorage.getItem("FormMetadata"));
    let arrayinfo = [];
    const dataholding = this.FormCompanys.value.holding;
    delete this.FormCompanys.value.holding;
    debugger
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

  onCbChangeMoney(e) {
    const isArray: FormArray = this.formoriginmoney.get("isArray") as FormArray;

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

  OnCbChangeRichPep(e) {
    const isArray: FormArray = this.formRichpep.get("isArray") as FormArray;

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

  OnCbChangeSourceIncome(e, item) {
    console.log('item:');
    console.log(item);
    const isArray: FormArray = this.formSourceIncome.get(
      "isArray"
    ) as FormArray;

    if (e.target.checked) {
      let i: number = 0;
      if (item.id == 'rddepen') {
        this.selecionRelacionDeDependencia = 1;
      }
      if (item.id == 'npps') {
        this.selecionNegocioPropio = 1;
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
      }
      if (item.id == 'npps') {
        this.selecionNegocioPropio = -1;
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

  ChangeIncome() {
    if (this.FormFinancialInformation.value.prod_serv_transfers == 1) {
      this.FormFinancialInformation.controls[
        "prod_serv_transfers_level"
      ].enable();
    } else if (this.FormFinancialInformation.value.prod_serv_transfers != 5) {
      this.FormFinancialInformation.controls[
        "prod_serv_transfers_level"
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
      this.FormDebtors.controls["deb_iva_percentage"].enable();
    } else if (this.FormDebtors.value.deb_iva == 0) {
      this.FormDebtors.controls["deb_iva_percentage"].disable();
    }
  }

  ChangeDebtorsISR() {
    /* if (this.FormDebtors.value.deb_isr == 1) {
      this.FormDebtors.controls["deb_isr_percentage"].enable();
    } else if (this.FormDebtors.value.deb_isr == 0) {
      this.FormDebtors.controls["deb_isr_percentage"].disable();
    } */
  }

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

  ChangeActs_own_behalf() {
    console.log('Entro a changeActs_own_ebhalf::::');
    if (this.FormFEICGeneral.value.feic_client_acts_own_behalf == 1) {
      this.selecionActsOnBehalf = true;

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

  DeletedataArray(index, dataarray: []) {
    //console.log('before',dataarray)
    dataarray.splice(index, 1);
    //console.log('after', dataarray)
  }
  private addTimeZone(date) {
    console.log("addTimeZone", date);
    let userTimezoneOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() + userTimezoneOffset);
  }

  private formatDate(date) {

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

  mobileSidebar() {
    this.showSidebar = !this.showSidebar;
  }

  ChangeForm(containerOpen) {
    this.currentContainer = containerOpen;
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
        this.ChangeForm("7");
      });
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
          this.ChangeForm("9");
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
        if (contain == 0) {
          this.FormFactoring.controls["entity"].disable();
          this.FormFactoring.controls["warranty"].disable();
          this.FormFactoring.controls["amount_awarded"].disable();
          this.FormFactoring.controls["amount_used"].disable();
          this.FormFactoring.controls["balance"].disable();
          this.ChangeForm("10");
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
    console.log('EVENT saveCOnitunue:: ')
    console.log(e);
    const contain = e;
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

  OnOtherIncomecheckboxes(e, item) {
    if (e.target.checked) {
      console.log('Se chequio!');
      item.status = true;
    }
    else {
      console.log("Se deschequio!");
      item.status = false;
    }
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
  returnBack(): void {
    this.location.back()
  }
  onSelectCountryChange(value, flag): void {

    switch (flag) {
      case 99:{
        if (value != 'GUATEMALA') {
          this.selecionMunicipality99ID = null;
          this.selecionDepartment99ID = null;
          this.FormFEIC.controls.feicp_iddoc_emision_country.setValue(null);
          this.FormFEIC.controls.feicp_iddoc_emision_country.setValue(null);
          this.FormFEIC.controls.feicp_iddoc_emision_country.disable();
          this.FormFEIC.controls.feicp_iddoc_emision_country.disable();



        }
        else{
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
        else{
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
        else{
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
        else{
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
        else{
          this.FormFEICGeneral.controls.feic_dep.enable();
          this.FormFEICGeneral.controls.feic_muni.enable();
        }
        break;
      }
      case 10: {
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
        else{
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
        else{
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
        else{
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
        else{
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
        else{
          this.FormServiceFEIC.controls.feic_product_dep.enable();
          this.FormServiceFEIC.controls.feic_product_mun.enable();
        }
        break;
      }

    }
  }
  isFormServiceFEICValid(): boolean {
    /* FormServiceFEIC = new FormGroup({
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
  }); */

    if (!this.FormFEICGeneral)
      return false;
    let resp = false;


    if (

      this.FormServiceFEIC.controls.feic_product_fec && this.FormServiceFEIC.controls.feic_product_fec.valid &&


      this.FormServiceFEIC.controls.feic_product_type && this.FormServiceFEIC.controls.feic_product_type.valid &&
      this.FormServiceFEIC.controls.feic_product_name && this.FormServiceFEIC.controls.feic_product_name.valid &&
      this.FormServiceFEIC.controls.feic_product_description && this.FormServiceFEIC.controls.feic_product_description.valid &&
      this.FormServiceFEIC.controls.feic_product_iden && this.FormServiceFEIC.controls.feic_product_iden.valid &&
      this.FormServiceFEIC.controls.feic_product_contract_name && this.FormServiceFEIC.controls.feic_product_contract_name.valid &&
      this.FormServiceFEIC.controls.feic_product_currency && this.FormServiceFEIC.controls.feic_product_currency.valid &&
      this.FormServiceFEIC.controls.feic_product_value && this.FormServiceFEIC.controls.feic_product_value.valid &&
      this.FormServiceFEIC.controls.feic_product_country && this.FormServiceFEIC.controls.feic_product_country.valid

    ) {
      resp = true;
    }
    else {
      return false;
    }
    if (this.FormServiceFEIC.controls.feic_product_country && this.FormServiceFEIC.controls.feic_product_country.value == 'GUATEMALA') {
      if (this.FormServiceFEIC.controls.feic_product_dep && this.FormServiceFEIC.controls.feic_product_dep.valid &&
        this.FormServiceFEIC.controls.feic_product_mun && this.FormServiceFEIC.controls.feic_product_mun.valid) {
        resp = true;
      }
      else {
        return false;
      }
    }
    return resp;


  }
  addOtherIncomeSource(): void {
    let aux = this.feic_income_source.find(f => f.enabled == false);
    if (aux) {
      aux.enabled = true;
      this.activeFeicIncomeSource = aux;

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

  saveFormInLocalStorage(form: FormGroup, name: string): void {
    let data = form.value;
    data = Object.entries(data).filter(([_key, value]) => value != null && value != undefined && value != 'undefined' && value != "NaN-NaN-NaN");
    console.log("data ::",name);
    console.log(data);
    localStorage.setItem(name, JSON.stringify(data));
  }
  patchFormFromLocalStorage(name): void {
    let data = localStorage.getItem(name);
    let data2 = JSON.parse(data);
    console.log('data2: ',name);
    console.log(data2);
    let dataTopatch = {};
    for(let i=0;i<data2.length;i++){
      dataTopatch[data2[i][0]] = data2[i][1];

    }
    console.log("dataTopatch: ");
    console.log(dataTopatch);
    if (dataTopatch) {

      switch (name) {
        case 'FormFEIC': {
          console.log('ENTROOOOOOOOOOOOOOOO');
          let dd = Object.entries(dataTopatch);
          for(let i=0;i<dd.length;i++){
            console.log(dd[i][0],dd[i][1]);
            this.FormFEIC.get(dd[i][0]).setValue(dd[i][1]);
          }
          
          //this.FormFEIC.patchValue(data2);
          //this.FormFEIC.patchValue(dataTopatch)
          /* this.FormFEIC.patchValue({
            feic_f_lastname: "Fonseca",
            feic_s_lastname: "HERRERA",
            feic_firstname: "BYRON JOSE",
            feic_secondname: "HERRERA",
            feic_other_name: "BYRON JOSE",
            feic_country_birth: "GUATEMALA",
            feic_muni_birth: -1,
            feicp_firstname: "BYRON JOSE",
            feicp_secondname: "HERRERA",
            fec_ispep: "1",
            fec_peps_relative: "1",
            fec_peps_partener: "1",
            feic_workref_phone1: "57521814",
            feic_pep_entity: "Entidadd",
            feic_pep_role: "Jefe",
            feic_pep_country_entity: "Guatemala",
            feic_pep_wealth_especific: "Robos"
        }) */
          break;
        }
        case 'FormFEICGeneral':{
          console.log('ENTROOOOOOOOOOOOOOOO');
          this.FormFEICGeneral.patchValue(dataTopatch);
          break;
        }
      }

    }

  }
}
