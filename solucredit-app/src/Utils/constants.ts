import { HttpHeaders } from "@angular/common/http";

export const SIZE_PAGE = 10;
export const INPUT_TIPE_IMAGE = 'image/png, image/gif, image/jpeg, image/jpg '


export const HTTPOPTIONS = {
    headers: new HttpHeaders(
        {
            'Content-Type': 'application/json',
            /* 'Access-Control-Allow-Credentials': 'true' */
        }),
    //@ts-ignore
    responseType: 'json' as const,
    //withCredentials: true as const,  
    //@ts-ignore
    observe: 'response' as const
};


export const Commercial_Manager_Authorization = 'Autorización Gerente Comercial';
export const Gerencial_Manager_Authorization = 'Autorización Gerente General';
export const Customer_Registration = 'Alta de Sistema';
export const Compliance_Verification = 'Cumplimiento'
export const Legal_Analysis = 'Legal'
export const commission_rate = 'Tasa de comisión'
// export const Authorization_Request = 'Solicitud de Autorización'
export const Operations_Area_Report = 'Informe de área de operaciones'
export const ExpresionFormatDate = 'M/d/yy, h:mm a'
export const ExpressionInputFormatDate = 'yyyy-MM-dd'


//PAGES TABS
export const Tab_Verifications = 'VERIFICATIONS'
export const Tab_Configurations = 'CONFIGURATIONS'
export const Tab_Authorizations = 'AUTHORIZATIONS'
export const Tab_Forms = 'FORMS'


//USER TABS
export const User_Documents = 'USER_DOCUMENTS'
export const User_Forms = 'USER_FORMS'
export const User_Requirements = 'USER_REQUIREMENTS'
export const User_Upload_Forms = 'USER_UPLOAD_FORMS'


export enum Analysis {
    commercial_assistant_analysis = "Análisis de Asistente Comercial",
    legal_analysis = "Análisis Legal",
    compliance_verification = 'Verificación de Cumplimiento',
    commercial_manager_authorization = 'Autorización Gerente Comercial',
    gerencial_manager_authorization = 'Autorización Gerente General',
    customer_registration = 'Alta del sistema',
    // authorization_request = 'Solicitud de Autorización',
    operations_area_report = 'Informe de área de operaciones',
    analysis_area_transfer = 'Traslado área de análisis',
    financial_analysis = 'Análisis Financiero',
    council_approval = 'Aprobación de consejo',
    formalization = 'Fomalización de cupo',
    // customer_registration_quota = 'Alta de cliente'
}

export enum AnalysisOption {
    assigmentResponsable = 'Asignación de responsable',
    report = 'Reporte',
    form = 'Formulario'
}

export const NITMINSIZE = 8
export const NITMAXSIZE = 13
//ANALYSIS STATUS
export const SuspendedAnalysisStatus = 5
export const country_list = [
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
export const migrationStatus = [
    {
        id: 0,
        text: 'Residente Temporal'
    },
    {
        id: 1,
        text: 'Residente Permanente'
    },
    {
        id: 2,
        text: 'Persona en Tránsito'
    },
    {
        id: 3,
        text: 'Turista o Visistante'
    },
    {
        id: 4,
        text: 'Permiso de Trabajo'
    },
    {
        id: 5,
        text: 'Permiso Consultar o Similar'
    },
    {
        id: 6,
        text: 'Otra'
    },
    {
        id: 7,
        text: 'No Aplica'
    }
]



export const BUCKET_NAME = 'solucredit-resources-isoft';