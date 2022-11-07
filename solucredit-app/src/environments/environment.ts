/**` */

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

//const urlapi = "http://localhost:3001";
const urlapi = "http://localhost:8080";

export const environment = {
  production: false,
  /* domain: "solucredit-app.us.auth0.com", */
  domain: "solucredit-api.us.auth0.com",
  /* clientId: "zoStqaW7slrHPGpmdbrVc96ILj8hIw9P", */
  clientId: "fzVrypLWMe4DPY6mwyfyH95iQr3rYsg7",
  redirectUri: window.location.origin,
  urlapiemail: urlapi + "/api/v1/email/",
  urlCreateUser: urlapi + "/api/v1/customer/createcustomer",
  urlisExistEmail: urlapi + "/api/v1/customer/isexist",
  urlGetInternetFiles: urlapi + "/api/v1/customer/getinternetfiles",
  urlGetInternetFile: urlapi + "/api/v1/customer/getinternetfile",
  urlDeleteInternetFile: urlapi + "/api/v1/customer/delinternetfile",
  urlUploadInternetFile: urlapi + "/api/v1/upload/uploadinternetfile",
  urlDownloadInternetFile: urlapi + "/api/v1/upload/downloadinternetfile",
  urlGetInfornetFiles: urlapi + "/api/v1/customer/getinfornetfiles",
  urlGetInfornetFile: urlapi + "/api/v1/customer/getinfornetfile",
  urlDeleteInfornetFile: urlapi + "/api/v1/customer/delinfornetfile",
  urlUploadInfornetFile: urlapi + "/api/v1/upload/uploadinfornetfile",
  urlDownloadInfornetFile: urlapi + "/api/v1/upload/downloadinfornetfile",
  urlgetCountries: urlapi + "/api/v1/territoriality/getcountry",
  urlgetDepatments: urlapi + "/api/v1/territoriality/getdepartment",
  urlgetMunicipalities: urlapi + "/api/v1/territoriality/getmunicipality",
  urlCreatePerson: urlapi + "/api/v1/person/createPerson",
  urlGetPerson: urlapi + "/api/v1/person/getDataperson",
  urlGetCustomer: urlapi + "/api/v1/customer/getcustomerdata",
  urlGetCustomerType: urlapi + "/api/v1/customer/getType",
  urlGetOnePerson: urlapi + "/api/v1/person/getOneDataperson",
  urlUpdateCutomer: urlapi + "/api/v1/customer/updatecustomer",
  urlChangeToTraditionalCustomer: urlapi + '/api/v1/customer/customerregistration',
  urlUpdatePerson: urlapi + "/api/v1/person/updateperson",
  urlRols: urlapi + "/api/v1/rol",
  urlPermission: urlapi + "/api/v1/permission",
  urlUsers: urlapi + "/api/v1/user",
  urlGetCustomerRepresentative:
    urlapi + "/api/v1/customer/getcustomerrepresentative",
  urlCustomerRepMem: urlapi + "/api/v1/customer/getcustomerrepmem",
  urlCreateCustomerRepresentative:
    urlapi + "/api/v1/customer/createcustomrepresentative",
  urlGetCustomerMembers:
    urlapi + "/api/v1/customer/getcustomermember",
  urlCreateCustomerMember:
    urlapi + "/api/v1/customer/createcustomermember",
  urlGetAllCustomer: urlapi + "/api/v1/customer/allcustomer",
  urlGetAllCustomerCategories: urlapi + "/api/v1/customer/allcustomercategory",
  urlAuthorize: urlapi + "/api/v1/authorize",
  urlProcess: urlapi + "/api/v1/process",
  urlLog: urlapi + "/api/v1/log",
  urlUploadFile: urlapi + "/api/v1/upload/uploadLogotipo",
  urlUploadFileDocuments: urlapi + "/api/v1/upload/uploadDocuments",
  urlUploadSupplierDocuments: urlapi + "/api/v1/upload/uploadSupplierDocuments",
  urlUploadForms: urlapi + "/api/v1/upload/uploadform",
  urlUploadReq: urlapi + "/api/v1/upload/uploadreq",
  urlDownloadReq: urlapi + "/api/v1/upload/downloadreq",
  urlDownloadForms: urlapi + "/api/v1/upload/downloadform",
  urlGetReq: urlapi + "/api/v1/formconfig/getreqdoc",
  urlGetForm: urlapi + "/api/v1/formconfig/getformdoc",
  urlDeleteReqDoc: urlapi + "/api/v1/formconfig/delreqdoc",
  urlDeleteFormDoc: urlapi + "/api/v1/formconfig/delformdoc",
  urlCreateDocument: urlapi + "/api/v1/documents/document",
  urlCreateVerification: urlapi + "/api/v1/documents/verification",
  urlCreateWarranty: urlapi + "/api/v1/documents/warranty",
  urlCreateDocumentStatus: urlapi + "/api/v1/documents/status",
  urlgetTypeRequest: urlapi + "/api/v1/typerequest/",
  urlgetTypeRequestList: urlapi + "/api/v1/typerequest/type-request-list",
  urlCreateCustomerRequest: urlapi + "/api/v1/customerrequest/",
  urlDeletCustomerRequest: urlapi + "/api/v1/formconfig/removerequest/",
  urlGetMetadaraRequest: urlapi + "/api/v1/formconfig/",
  urlCustomerRequest: urlapi + "/api/v1/formconfig/",
  urlDeleteDocuments: urlapi + "/api/v1/documents/",
  urlCreateFiduciaryWarranty: urlapi + "/api/v1/documents/fiduciary",
  urlDeleteFiduciaryWarranty: urlapi + "/api/v1/documents/deletefiduciary",
  urlDeleteMember: urlapi + "/api/v1/customer/removecustomermember",
  urlDeleteRepresentative: urlapi + "/api/v1/customer/removecustomerrepresentative",
  urlUpdateFiduciaryWarranty: urlapi + "/api/v1/documents/updatefiduciary",
  urlOnuList: urlapi + "/api/v1/onu",
  //url formulario
  urlCrearSolitudInidvidual: urlapi + "/api/v1/applicationform",
  urlCrearFormularioPerfil: urlapi + "/api/v1/profileform",

  urlRequest: urlapi + "/api/v1/application",
  //url alerta
  urlAlert: urlapi + "/api/v1/alert",
  urlAlertsList: urlapi + "/api/v1/alert/alerts-list",
  urlInitialRelation: urlapi + "/api/v1/irelation/",
  urlInitialRelationJuridica: urlapi + "/api/v1/irelation/juridica",
  urlInitialRelationFiduciary: urlapi + "/api/v1/irelation/fiduciary",
  //url deudor
  urlDebtor: urlapi + "/api/v1/debtor",
  urlDebtorsList: urlapi + "/api/v1/debtor/debtor-list",
  urlAditionalRequest: urlapi + "/api/v1/aditionalrequest",
  //documento personalizado
  urlDownletter: urlapi + "/api/v1/downletter",
  urlXlsx: urlapi + "/api/v1/downloadxlsx",
  urlDocx: urlapi + "/api/v1/downloaddocx",

  //SUPLLIER
  urlSupplier: urlapi + "/api/v1/supplier",
  urlSupplierDocs: urlapi + "/api/v1/supplierdoc",
  urlSupplierLogs: urlapi + "/api/v1/supplierlog",

  //info, general
  urlFormFEIC: urlapi + "/api/v1/form/feic",
  urlForm: urlapi + "/api/v1/form",
  urlFormConfig: urlapi + "/api/v1/formconfig",

  //Maintenance
  urlDisbursement: urlapi + "/api/v1/disbursement",
  urlDisbursementList: urlapi + "/api/v1/disbursement/disbursement-list",
  urlWarranty: urlapi + '/api/v1/warrantytype',
  urlWarrantyList: urlapi + '/api/v1/warrantytype/warranty-type-list',
  urlTerritorialCoverage: urlapi + '/api/v1/territorialcoverage/',
  urlTerritorialCoverageList: urlapi + "/api/v1/territorialcoverage/territorial-coverage-list",
  urlCurrency: urlapi + '/api/v1/currency/',
  urlCurrencyList: urlapi + "/api/v1/currency/currency-list",
  urlDocWarranty: urlapi + '/api/v1/docwarranty/',
  urlDocWarrantyList: urlapi + '/api/v1/docwarranty/doc-warranty-list',
  urlRequirements: urlapi + "/api/v1/requirements",
  urlRequirementsList: urlapi + "/api/v1/requirements/requirements-list",
  urlEndorsement: urlapi + '/api/v1/endorsement/',
  urlEndorsementList: urlapi + '/api/v1/endorsement/endorsement-list',
  urlBanks: urlapi + '/api/v1/banks/',
  urlBanksList: urlapi + '/api/v1/banks/banks-list',
  urlInspectionPlace: urlapi + '/api/v1/inspectionplace',
  urlInspectionPlaceList: urlapi + '/api/v1/inspectionplace/inspection-place-list',
  urlProductType: urlapi + '/api/v1/producttype',
  urlProductTypeList: urlapi + '/api/v1/producttype/producttype-list',
  urlProduct: urlapi + '/api/v1/product',
  urlProductList: urlapi + '/api/v1/product/product-list',
  urlBranchOffice: urlapi + '/api/v1/branchoffice',
  urlBranchOfficeList: urlapi + '/api/v1/branchoffice/branchoffice-list',
  urlAccountType: urlapi + '/api/v1/accounttype',
  urlAccountTypeList: urlapi + '/api/v1/accounttype/account-type-list',
  urlPaymentMethod: urlapi + '/api/v1/paymentmethod',
  urlPaymentMethodList: urlapi + '/api/v1/paymentmethod/payment-method-list',
  urlAdviserType: urlapi + '/api/v1/advisertype',
  urlAdviserTypeList: urlapi + '/api/v1/advisertype/adviser-type-list',
  urlRuleType: urlapi + '/api/v1/ruletype',
  urlRuleTypeList: urlapi + '/api/v1/ruletype/ruletype-list',
  urlRules: urlapi + '/api/v1/rules',
  urlRulesList: urlapi + '/api/v1/rules/rules-list',
  urlRateType: urlapi + '/api/v1/ratetype',
  urlRateTypeList: urlapi + '/api/v1/ratetype/ratetype-list',
  urlRate: urlapi + '/api/v1/rate',
  urlRateList: urlapi + '/api/v1/rate/rate-list',

  urlAdviser: urlapi + '/api/v1/adviser',
  urlAdviserList: urlapi + '/api/v1/adviser/adviser-list',
  urlQuotaType: urlapi + '/api/v1/quotatype/',
  urlQuotaTypeList: urlapi + "/api/v1/quotatype/quotatype-list",
  urlUpdateQuotaTypeList: urlapi + "/api/v1/quotatype/",
  urlFileManager: urlapi + "/api/v1/fm",


  //Análisis Comercial
  urlRequirementsCA: urlapi + '/api/v1/requirementscomercialanalysis',
  urlRequirementsCAList: urlapi + '/api/v1/requirementscomercialanalysis/requirementscomercialanalysis-list',
  urlCommercialAnalysis: urlapi + '/api/v1/commercialanalysis',
  urlCommercialAnalysisList: urlapi + '/api/v1/commercialanalysis/commercialanalysis-list',
  urlFormsCA: urlapi + '/api/v1/formcommercialanalysis',
  urlFormsCAList: urlapi + '/api/v1/formcommercialanalysis/formcommercialanalysis-list',
  urlInitialRelationCA: urlapi + '/api/v1/initialrelationcommercialanalysis',
  urlInitialRelationCAList: urlapi + '/api/v1/initialrelationcommercialanalysis/initialrelationcommercialanalysis-list',
  urlUploadDocumentsCA: urlapi + '/api/v1/uploaddocumentsca',
  urlUploadDocumentsCAList: urlapi + '/api/v1/uploaddocumentsca/uploaddocumentsca-list',
  urlUploadDocsCA: urlapi + "/api/v1/uploaddocumentsca/uploaddocuments/",
  urlUploadDeleteDocs: urlapi + "/api/v1/uploaddocumentsca/deluploaddocs",
  urlUploadInform: urlapi + "/api/v1/uploaddocumentsca/informe/",
  urlUpdateInform: urlapi + "/api/v1/uploaddocumentsca/informeupdate/",
  urlUploadInformCheck: urlapi + "/api/v1/uploaddocumentsca",
  //Requerimientos Docs
  urlRequirementDocVWList: urlapi + '/api/v1/requirementdoc/requirementdoc-list',
  urlRequirementDocVW: urlapi + "/api/v1/requirementdoc",
  //DownloadReqDocs
  urlDownloadDocReqs: urlapi + "/api/v1/requirementdoc/downloadreq",
  //Forms Docs
  urlFormDocVWList: urlapi + '/api/v1/formdocument/formdocument-list',
  urlFormDocVW: urlapi + "/api/v1/formdocument",
  //DownloadFormDocs
  urlFormDocs: urlapi + "/api/v1/formdocument/downloaddoc",
  //Forms Docs
  urlIRDocVWList: urlapi + '/api/v1/initialrdoc/initialrdoc-list',
  urlIRDocVW: urlapi + "/api/v1/initialrdoc",
  //DownloadFormDocs
  urlIRDocs: urlapi + "/api/v1/initialrdoc/downloaddoc",
  //VerificationDocsVW
  urlVerification: urlapi + "/api/v1/verification",
  urlVerificationList: urlapi + "/api/v1/verification/verificationdoc-list",
  //CheckList
  urlCheck: urlapi + "/api/v1/check",
  urlCheckList: urlapi + "/api/v1/check/check-list",
  urlUploadCheck: urlapi + "/api/v1/check/upcheck/",
  urlDelDocCheck: urlapi + "/api/v1/check/deldoc",
  urlUpdateCommentCheck: urlapi + '/api/v1/check/updatecomment',

  urlLegalAnalysis: urlapi + '/api/v1/legalanalysis',
  urlFinancialAnalysis: urlapi + '/api/v1/financialanalysis',
  urlComplianceVerification: urlapi + '/api/v1/complianceverification',
  urlAnalysis: urlapi + '/api/v1/analysis',

  urlAdRevList: urlapi + '/api/v1/adrev/adrev-list',
  urlAdRev: urlapi + '/api/v1/adrev',
  urlCommercialManagerAuthorization: urlapi + '/api/v1/commercialmanagerauthorization',
  urlGerencialcialManagerAuthorization: urlapi + '/api/v1/gerencialmanagerauthorization',

  urlFiscalPeriodList: urlapi + '/api/v1/fiscalperiod/fiscalperiod-list',
  urlFiscalPeriod: urlapi + '/api/v1/fiscalperiod/',

  urlFiscalYear: urlapi + '/api/v1/fiscalyear/',

  urlCouncilMemberType: urlapi + '/api/v1/councilmembert',
  urlCouncilMember: urlapi + '/api/v1/councilmember/',
  urlCouncilMemberList: urlapi + '/api/v1/councilmember/councilmember-list',

  urlConditionSheet: urlapi + '/api/v1/conditionsheet',

  urlManagementAct: urlapi + '/api/v1/managementact',
  urlExcel: urlapi + '/api/v1/excel',
  urlCustomerRegistration: urlapi + '/api/v1/customerregistration',
  urlWFDocuments: urlapi + '/api/v1/spcreatedoc',
  urlGetButtonTransition: urlapi + '/api/v1/transition',
  urlGetEventsTransition: urlapi + '/api/v1/transition/action_type_id',
  urlTriggers: urlapi + '/api/v1/disparador',
  urlTriggersList: urlapi + '/api/v1/disparador/histories',
  urlFunctions: urlapi + '/api/v1/funciones',
  urlValidations: urlapi + '/api/v1/validaciones',
  urlRolView: urlapi + '/api/v1/rolview',
  urlAllAnalysis: urlapi + '/api/v1/all',
  urlISR: urlapi + '/api/v1/isr',
  urlISRList: urlapi + "/api/v1/isr/isr-list",
  urlSysLinks: urlapi + '/api/v1/syslinks',

  urlsysiva: urlapi + '/api/v1/iva',
  urlOperationsAreaReport: urlapi + '/api/v1/operationsareareport',
  urlCouncilApproval: urlapi + '/api/v1/councilapproval',
  urlAnalysisCheck: urlapi + '/api/v1/analysisc',
  urlFormalization: urlapi + '/api/v1/formalization',
  urlDeedDocument: urlapi + '/api/v1/deeddocument',
  urlFormSave: urlapi + '/api/v1/formsave',
  urlAllData: urlapi + '/api/v1/alldata',
  urlRequirementObservation: urlapi + '/api/v1/requirementobservation'
};
export const permisos = {


  'USER': {
    'DELETE': '342619fc-85e3-42a6-9466-d8a62f20a3b1',
    'UPDATE': 'ce0c4fb8-f119-46d2-aeea-e3a481c1bcad',
    'CREATE': 'db172212-287c-49f5-a413-cd5075d44b70',
    'LIST': '3d92d7ed-fba2-40e1-a57b-5b82d54b4b44',
    'PASS_EDITION': '92a5d460-75c5-4b5f-863a-244cff70bcec'
  },
  'ROL': {
    'DELETE': 'bbe55ed1-c780-4025-9678-62190d0e8b05',
    'UPDATE': '8de96f3a-80ac-47cf-8f39-c084c7bf2a3d',
    'CREATE': '36c49fac-f6d7-49cc-9df7-a118ce6ee2c6',
    'LIST': '96856cd9-28fb-4f3f-9d4b-a960c6009971'
  },
  'SUPPLIER': {
    'DELETE': 'e4c36ff7-c133-4f91-9b8a-08947e7c072f',
    'UPDATE': '5fc5d4fd-3e08-43ee-b1cf-fc1b33763598',
    'CREATE': '4040ff80-93db-4463-8e31-38b0fbc10719',
    'LIST': '870efe3b-231a-4430-b5f3-c2d56660a1b1'
  },
  'LOG': {
    'LIST': '5536b4b0-8cef-4857-bd5f-f859697f6046'
  },
  'REPORT': {
    'REQUEST': 'ab6fccc7-db67-4cce-b79d-286ab3b373e7'
  },
  'ALERT': {
    'LIST': '56ac8ab7-3ba6-455b-8c9a-a1420be998b8',
    'DELETE': '3e3c12ad-f80c-4291-b86b-593440897832',
    'CREATE': '1993705d-95aa-4de3-bbfa-7057f66bcc4b',
    'UPDATE': '0ad4a0d8-8b88-45df-8beb-a17d71e432c9',
    'LOG': '58168bdf-efad-480d-a16f-52eacdc029c9'

  },
  'ONU': {
    'UPLOAD': 'f7f21bd5-debf-4e78-acbc-cab611578a48',
    'QUERY': 'f3f0a765-c1a7-49d0-8112-aff48a7b4498',
    'SEE_LIST': '701ae164-8c98-4909-aaf1-7a265d5dd142',
    'BLOCK': '23adfafa-d8e2-40d7-ad5b-8abd6f02047f',
    'CHECK_CLIENT': '807b90af-d534-4443-99f3-f4db774bb30e',
    'UNBLOCK': '25b71179-d1c4-4c8d-bd85-61054dae2cb6',
    "LOGS": '442335d3-7955-44cc-aba0-9afa85796aca'

  },
  'CLIENT': {
    'CREATE': 'b8a123d3-87fd-44ec-b56c-41e9bddebe39',//YA
    'SEE': 'da4af2b1-cb6f-41ba-b73c-a9f3d8c0f6e1',//YA
    'EDIT': '252b65de-fcdf-4a7d-904d-f7f9080699f8',//YA
    'INIT_RELATION': '4d4363b9-8ba2-4be5-b85a-0603a4857208',//YA
    'ADD_REPRESENTATIVE': 'f2be3217-6186-41b2-8be6-1c76c0970c3f',//YA
    'ADD_AVAL': 'f5dc64ed-9afa-4bb9-907e-86a0f47ee896',
    'ADD_MEMBER': '9a98a949-4c87-4346-b64f-ad906e2be734',
    'LIST': 'ed2d7985-caeb-4658-8078-49ad9ac1550c',
    'LIST_DEB': '5a8164c5-38d4-4581-bf47-4afd4e4b621e',
    'CREATE_DEB': '0e28f68d-f2c1-43f1-8d9a-999fb935cb80',
    'EDIT_DEB': 'e404f1fa-c6f4-4af4-8741-cd177f4b427c',
    'SEE_DEB': 'b74af321-0946-4f93-b506-ae187a3b7a86',
    'DEL_DEB': '171dbafd-b4f6-4982-b6e5-309bef8492b4'

  },
  'REQUEST': {
    'CREATE_REQUEST': 'd6cecf30-d69b-477a-a3d2-6b4a3abdf4fc',//YA
    'COMPLETE_CHECKS': 'ce66b7f1-2c63-4433-99fc-873e6c5f76fe',//YA
    'COMPLETE_WARRANTIES': 'a165a9d8-334b-4fe7-a9a4-1ebfa8d4417f',//YA
    'COMPLETE_FORMS': 'cc3890f0-c3a5-492f-adb1-79e2a68c1a7c',//YA
    'REJECT_VERIFICATIONS': 'b92d1cc4-0cb1-438b-ae1d-671d723e81d7',
    'SEND_FORMS': '32b707dd-409f-4824-9dcc-157445383489',
    'REJECT_WARRANTIES': '9ee1893d-b54b-4a2a-a535-081ef1edbea9',
    'REJECT_FORMS': '13a554d3-3bf8-4a1e-a310-4497076717b3',
    'COMPLETE_LEGAL_ANALISIS': '67f04d7d-99a3-455d-8743-731083d4a0b4', //sirven para poder obtener los elementos de analisis
    'REJECT_LEGAL_ANALISIS': '23524ec2-fdb6-4ecb-856a-13379a886d89',
    'COMPLETE_VISITS': '2b2652c7-1c25-4c1a-9f65-59796a73faa8',
    'REJECT_VISITS': '513b5a09-57ea-4544-bba2-a90e1b331a85',
    'COMPLETE_COMPLIANCE_ANALISIS': '03342246-bdf8-41cc-bec5-b6f8a0fe2e04',
    'REJECT_COMPLIANCE_ANALISIS': 'd2c586d2-4ab8-47bf-b861-17d9fe7a332c',
    'COMPLETE_RECORDS': 'def019d7-db5b-4d33-81de-56790a224fea',
    'REJECT_RECORDS': '921b9a6b-456d-45c7-b830-a8cd3fff2046',
    'COMPLETE_CREDIT_APROBATION': '17931c3b-94bb-406b-8d08-71ffce1dd63b',
    'REJECT_CREDIT_APROBATION': '06c1960f-1db9-43f4-9f0d-7179043e529a',
    'COMPLETE_SEND_NEGOTIATION_REPORT': 'be2a2c95-0035-4f57-b660-fdd355de3ee6',
    'REJECT_SEND_NEGOTIATION_REPORT': '28ef661a-863c-4299-901d-a7c73b905f7c',
    'NEGOTIATION_CONFIRMATION': 'd45635e8-a8cf-4d32-85dc-79957b59cdc9',
    'COMPLETE_MANAGEMENT_APROVAL': '5b80df72-456a-4aa8-845f-6a4d51337213',
    'REJECT_MANAGEMENT_APROVAL': 'cbfebee6-d41b-4b5d-99a1-c1fd80d326ac',
    'COMPLETE_CLIENT_ACTIVATION': '2a897ffc-0c01-4fb8-b294-aa8f2d20c99b',
    'REJECT_CLIENT_ACTIVATION': 'fa004a2c-d05f-43f2-963d-cfe65b84818d'
  },
  'ANALYSIS': {
    'COMPLETE_LEGAL_ANALISIS': '67f04d7d-99a3-455d-8743-731083d4a0b4',
    'REJECT_LEGAL_ANALISIS': '23524ec2-fdb6-4ecb-856a-13379a886d89',
    'COMPLETE_COMPLIANCE_VERIFICATION': '03342246-bdf8-41cc-bec5-b6f8a0fe2e04',
    'REJECT_COMPLIANCE_VERIFICATION': 'd2c586d2-4ab8-47bf-b861-17d9fe7a332c',
  },
  'FILEMANAGER': {
    'LIST_FOLDERS': '9b476347-16db-4da4-a495-2e042b9de358',
    'CREATE_FOLDER': 'dde90a54-b923-4a57-8d73-d57356097234',
    'UPLOAD_FILE': 'c5ef503c-192c-482e-826e-82930d99b468',
    'LIST_SHARED_FOLDERS': '49eff717-b090-4ed3-8b36-284d25e2ebb9',
    'LIST_FILES': 'dea578fb-9e09-4166-863c-371179c38aa3',
    'READ_INFORMATION': 'd5dc63dd-0662-4089-a0c0-46f33354c550',
    'SHARE_ROL': 'fdefaac7-1734-4567-94b4-ba1483cf9413',
    'SHARE_USER': 'c169a2f7-efd7-4fc5-a0d6-17cb25776bfe',
    'SEE_FILE': '20da7074-b4e0-4b3f-96c8-d5f018d0449b',
    'DOWNLOAD_FILE': 'a4e3eb4a-0399-4400-b7f6-858df12ce788',
    'EDIT': '7a287686-86f4-4841-a83c-e2953aed7894',
    'SHARE_FILE': 'cab9b71b-b052-48d7-92b5-5221db8963be',
  },
  //CONFIGURATIONS
  'ADVISER_TYPE': {
    'LIST': '9cbefe84-2fd3-4cc2-897a-4beb8226fb2a',
    'EDIT': '202cd556-01a3-46df-bcfc-7160740dbbc7',
    'CREATE': '4fdb2d37-270a-4d01-bebb-4b83bf35ca54',
    'DELETE': '56a311b1-caf2-40c8-8e56-b16f3d7b73ab',
    'SEE': 'b8f2abcf-5bd2-4480-bc10-b66c482eaa48'
  },
  'ADVISER': {
    'LIST': 'e525f7c5-dc45-4b0f-a758-8c499f6508e4',
    'EDIT': 'a4ebcd0e-3907-4bbc-8d8d-05858f06f157',
    'CREATE': '09a8f2c8-af9c-4713-8f6c-413dcba841aa',
    'DELETE': '39727b10-44c8-436c-ba0a-827d5110ca9f',
    'SEE': '1eab8070-65d4-4593-a0be-6ef09b78eba4'
  },
  'BANK': {
    'LIST': '71f2cee5-d822-459e-882d-0695c930b784',
    'EDIT': '2a97c908-8775-43de-bf9b-cb43e8599eed',
    'CREATE': 'bd5e44e2-1c58-458a-9e44-0420c504882d',
    'DELETE': 'c286c6e7-360b-4123-8627-fc1c2947e4a4',
    'SEE': '9ac7aed6-cb25-4943-8121-bc75a314c50a',
  },
  'TERRITORIAL': {
    'LIST': 'ab4276f2-473d-4896-bc60-5d214a25a0ae',
    'EDIT': 'a2b3dcd9-dfd0-4709-acd1-653d3c3a8501',
    'CREATE': '20f7c62b-228e-424a-8acf-f02bf8807eb6',
    'DELETE': '6e69f079-dd91-457c-86ba-1390fcfae0c4',
    'SEE': 'e2aec96c-2838-4ac4-827d-cd9e15885744',
  },
  'CONDITION': {
    'CREATE': '72a861c5-7893-49b6-8822-79bdfa4a75b4',
    'LIST': '1d3be9ed-8120-490a-8b2a-83b232c94394',
    'SEE': '96d110b7-7180-4c84-aaf9-4bfd66924640',
    'EDIT': '8a614439-b93d-4755-933c-fb8f726e785d',
    'DELETE': '966e7b9f-c355-462c-883f-a3876398009e'
  },
  'RATE_TYPE': {
    'CREATE': '50afd547-c289-4621-afe0-8c38292fcaae',
    'LIST': '9794545f-8bdd-449c-a8ac-154639bb1c8b',
    'SEE': '3b76cc29-76ac-4f82-a353-7c2dffaf393a',
    'EDIT': '18d3e12f-c3ae-4a03-8e1a-763b08f39546',
    'DELETE': '1b78a458-c7c3-46e6-a20f-6454d5b8f86f'
  },
  'RULE_TYPE': {
    'CREATE': '5f7de374-878e-4483-86b6-46263f92419f',
    'SEE': 'b502348f-0363-4765-9725-63b85f1592bd',
    'LIST': 'b140567d-c102-44d4-978d-788b0de5fcc0',
    'EDIT': '32d1ca25-9012-4b16-8bdd-b2dbaf749c37',
    'DELETE': 'e615a85d-7f7f-4a25-ba54-01af5bcc3381'
  },
  'RULE': {
    'CREATE': '2c1e34e4-d672-4674-988d-6d43b2507abc',
    'LIST': 'c60f832c-e84b-4850-97bd-c2a03f264201',
    'EDIT': '0f1927c8-dc18-4d3e-8e47-10ca6f375d10',
    'DELETE': '2e16a648-1dfa-489c-9ecd-e60032c07f2a',
    'SEE': '0dc09bb7-ed60-4df2-b94d-1e1e18b7c98f',
  },
  'PAYMENT_METHOD': {
    'CREATE': '0072d74b-6b92-4d33-b2bd-867271f15e03',
    'LIST': 'f2551fa1-5d93-4a1c-ba84-b354c20fca6c',
    'EDIT': 'b41e8e8d-0f26-4f39-822a-a7f62e6e2579',
    'SEE': '8b37386e-013d-4ec0-9408-a6b5a5c25b71',
    'DELETE': '70f48ffc-a60a-41b0-8808-d0642efdf747'
  },
  'INSPECTION_PLACE': {
    'CREATE': '8cddf871-6232-4715-9244-7ad2eab09be4',
    'LIST': '7ca6f43b-ad51-4f38-a3d1-a782c397e631',
    'EDIT': 'd3f1dbfa-0b5b-45a1-aeff-302e2ee83aae',
    'SEE': '2405201b-e0cc-49bb-bf6f-e312bfa12ef8',
    'DELETE': '566ddd0c-5e02-4fa8-af11-e2c967aa9036'
  },
  'COUNCIL_MEMBERS': {
    'CREATE': '7948c375-d824-447f-9bc4-4e425893a857',
    'LIST': '02fe0fde-0668-4901-a06c-35e54005f0e0',
    'EDIT': '20327e4c-4f5c-4fb9-b35c-0bb59e792dfb',
    'SEE': '049718ef-2e20-4b38-8bec-9facd314d8ae',
    'DELETE': '8440d899-bc11-43aa-9be8-288c1ca61a3e'
  },
  'CURRENCY': {
    'CREATE': 'b07f1ac3-5d3d-4557-86ab-6f0358d727bf',
    'LIST': 'aa9a2f37-eec6-4252-b41a-3db406714c66',
    'EDIT': 'e41fdbd6-7b83-4665-99f2-0f77f9620295',
    'DELETE': '258cd8a7-975b-48c7-9333-0edcf7c7559f',
    'SEE': '9a502a5a-8bed-43af-b22a-7e63602393a1'
  },
  'FISCAL_PERIOD': {
    'CREATE': 'ffda354b-a53a-4d78-a11d-5fa278c61b0d',
    'SEE': '5889988e-563c-414e-adb2-3443eb44822e',
    'LIST': '663b9105-d084-40af-b510-f6bfa804e5f8',
    'EDIT': '8dd16909-b393-4818-aa2f-95e90e454699',
    'DELETE': '880442e7-15c5-4df4-97db-59d8210cbc93'
  },
  'PRODUCT_TYPE': {
    'CREATE': '7cb6c36b-d4f6-4eb1-adf4-d529f3ecee46',
    'LIST': 'bc59cbd0-6588-490a-a67b-cf2770d5fb65',
    'EDIT': 'cfa5fbc4-b100-4f3b-8cb7-95d67de5df8d',
    'DELETE': 'bd1fee07-a554-49af-ac6b-df7da96b090b',
    'SEE': '1508aa55-fb57-41dc-8c84-59380aba66dd',
  },
  'BRANCH_OFFICE': {
    'CREATE': 'ef798baf-2f12-4564-b3d9-84e6fd0b7d51',
    'LIST': 'df6ee1f1-11e8-4e2c-8d73-1eb3aaa57c52',
    'EDIT': '74fe28b5-6c1d-4d6b-8641-94dde19f96f2',
    'SEE': '0236f27f-1a38-41ea-8d90-6f306ead2292',
    'DELETE': '71e93220-3dec-4978-adf3-765054f58258'
  },
  'PRODUCTS': {
    'CREATE': '8ad02318-0243-4540-8862-2df1f3d5f8d5',
    'LIST': '7b4297ea-5aab-4e5e-8e67-4506d55ceff4',
    'EDIT': '58f06c4d-0606-4881-91f3-979feae447eb',
    'SEE': '1142c29b-4d32-4932-bb25-77ecf5c92703',
    'DELETE': '0c5cbffd-a9cd-4cfe-8fdb-7368c273529c'
  },
  'QUOTE_TYPE': {
    'CREATE': '78e58283-ec36-4d52-bcc8-647023c63904',
    'LIST': '4867886b-07a9-4174-836b-7a53fc647e6f',
    'EDIT': 'b225a073-a9b3-48a4-8be6-dad5f7284668',
    'SEE': '858c76dd-6b5f-4a4d-8d79-a06db6f21713',
    'DELETE': '04ec7c08-58f1-447b-8b01-438ac44f0f26'
  },
  'REQUEST_TYPE': {
    'CREATE': 'cd617509-fca5-4185-872b-dc599545689a',
    'LIST': 'abf4a561-76b3-42f3-9954-0b8d9538b871',
    'EDIT': '061e3fa8-061d-4ee9-8d12-5208a7fafdcb',
    'SEE': '061e3fa8-061d-4ee9-8d12-5208a7fafdcb',
    'DELETE': '83bb0695-a85f-4682-92b8-779309e27746'
  },
  'ACCOUNT_TYPE': {
    'CREATE': '81520753-100b-4086-99bc-3cc9a5e1b164',
    'EDIT': 'e0150ab6-da59-4f1e-9895-358f2d9af047',
    'LIST': '7b137f0a-3654-4d46-8c37-00a35f766555',
    'SEE': '89f49694-2995-42c9-8026-a32ada3dd2ea',
    'DELETE': '0eff2f0b-0065-4cfc-b497-f70641af8cc2'
  },
  'ROL_VIEW': {
    'CREATE': 'f32b3ca4-ee4b-4565-94be-06a6c8046cdf',
    'EDIT': '85662516-f01a-4935-b873-e07c20cf1d06',
    'LIST': 'cd621929-6b41-4094-be0b-c90e1aee93b8',
    'SEE': '29b0937b-0b99-49a9-92a9-036c3959a350',
    'DELETE': 'eb61284c-ef0e-4772-9b4f-f292170624ed'
  },
  'ISR': {
    'LIST': '2c34bb74-12fa-49b7-b6c1-97235d01d033',
    'EDIT': '70d2a6d0-c981-4f72-be63-bd6997afb782',
    'CREATE': '2f458045-dbcc-495b-bb23-7e2ca9711cdd',
    'DELETE': 'd0a88ccd-75e4-4587-8103-76a2eba85b60',
    'SEE': 'ea095c09-6bda-493c-a1c5-310e4d36d820',
  },
  'LINKS': {
    'LIST': 'e38ea748-66e0-479a-97d9-9e168abd9cb7',
    'EDIT': '13127171-f58f-44dd-ae2c-d48a52ce6009',
    'SEE': '0c979d9d-77af-45a7-bd49-b94826c615e0'
  }

}