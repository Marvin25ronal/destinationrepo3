import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HTTPOPTIONS } from 'src/Utils/constants';


@Injectable({
  providedIn: "root",
})
export class MysqlService {
  _url = environment.urlCreateUser;
  _urlGetInternetFiles = environment.urlGetInternetFiles;
  _urlGetInternetFile = environment.urlGetInternetFile;
  _urlDeleteInternetFile = environment.urlDeleteInternetFile;
  _urlUploadInternetFile = environment.urlUploadInternetFile;
  _urlDownloadInternetFile = environment.urlDownloadInternetFile;
  _urlGetInfornetFiles = environment.urlGetInfornetFiles;
  _urlGetInfornetFile = environment.urlGetInfornetFile;
  _urlDeleteInfornetFile = environment.urlDeleteInfornetFile;
  _urlUploadInfornetFile = environment.urlUploadInfornetFile;
  _urlDownloadInfornetFile = environment.urlDownloadInfornetFile;
  urlgetCountries = environment.urlgetCountries;
  urlgetDepartments = environment.urlgetDepatments;
  urlgetMunicipalities = environment.urlgetMunicipalities;
  urlcreatePerson = environment.urlCreatePerson;
  urlgetPerson = environment.urlGetPerson;
  urlgetCustomer = environment.urlGetCustomer;
  urlgetCustomerType = environment.urlGetCustomerType;
  urlgetOnePerson = environment.urlGetOnePerson;
  urlupdateCostumer = environment.urlUpdateCutomer;
  urlupdatePerson = environment.urlUpdatePerson;
  urlCustomerRepresentative = environment.urlGetCustomerRepresentative;
  urlCustomerMember = environment.urlGetCustomerMembers;
  urlCreateCustomerRepresentative = environment.urlCreateCustomerRepresentative;
  urlCreateCustomerMember = environment.urlCreateCustomerMember;
  urlGetAllCustomer = environment.urlGetAllCustomer;
  urlGetAllCustomerCategories = environment.urlGetAllCustomerCategories;
  urlUploadFile = environment.urlUploadFile;
  urlUploadFileDocuments = environment.urlUploadFileDocuments;
  urlCreateCustomerDocument = environment.urlCreateDocument;
  urlCreateCustomerVerification = environment.urlCreateVerification;
  urlCreateCustomerWarranty = environment.urlCreateWarranty;
  urlCreateCustomerFiduciaryWarranty = environment.urlCreateFiduciaryWarranty;
  urlDeleteCustomerFiduciaryWarranty = environment.urlDeleteFiduciaryWarranty;
  urlUpdateCustomerFiduciaryWarranty = environment.urlUpdateFiduciaryWarranty;
  urlCreateDocumentStatus = environment.urlCreateDocumentStatus;
  urlGetTypeRequest = environment.urlgetTypeRequest;
  urlCustomerRequest = environment.urlCreateCustomerRequest;
  urlRequest = environment.urlCustomerRequest;
  urlDeletCustomerRequest = environment.urlDeletCustomerRequest;
  urlDeleteDocuments = environment.urlDeleteDocuments;
  urlDeleteMember = environment.urlDeleteMember;
  urlDeleteRepresentative = environment.urlDeleteRepresentative;
  urlONUlist = environment.urlOnuList;
  urlIRelation = environment.urlInitialRelation;
  urlIRelationJuridica = environment.urlInitialRelationJuridica;
  urlIRelationFiduciary = environment.urlInitialRelationFiduciary;
  urlAditionalRequest = environment.urlAditionalRequest;
  urlDownletter = environment.urlDownletter;
  urlXlsx = environment.urlXlsx;
  urlForm = environment.urlForm;
  urlFormFEIC = environment.urlFormFEIC;
  urlGetMetadaraRequest = environment.urlGetMetadaraRequest;
  urlCustomerRepMem = environment.urlCustomerRepMem;
  urlisExistEmail = environment.urlisExistEmail;
  urlCurrency = environment.urlCurrency;
  urlUploadDocsCA = environment.urlUploadDocsCA;
  urlDeleteDocsCA = environment.urlUploadDeleteDocs;
  //urlDownloadReqDoc = environment.urlDownloadReqDocs;
  urlDownloadDocReqs = environment.urlDownloadDocReqs;
  urlFormReqs = environment.urlFormDocs;
  urlIRDocs = environment.urlIRDocs;
  urlChangeCustomerToTraditionalCustomer = environment.urlChangeToTraditionalCustomer

  constructor(private _http: HttpClient) { }

  uploadInternetFile(data): Observable<any> {
    return this._http.post(this._urlUploadInternetFile, data);
  }
  uploadInfornetFile(data): Observable<any> {
    return this._http.post(this._urlUploadInfornetFile, data);
  }
  uploadDocsCA(data): Observable<any> {
    return this._http.post(this.urlUploadDocsCA, data);
  }
  /*
    downloadReqDoc(id: number, filename: string) {
      this._http
        .get(this.urlDownloadReqDoc + "/" + id, {
          responseType: "blob" as "json",
        })
        .subscribe((response: any) => {
          //let filename ='test.xlsx'
          let dataType = response.type;
          let binaryData = [];
          binaryData.push(response);
          let downloadLink = document.createElement("a"); 
          downloadLink.href = window.URL.createObjectURL(
            new Blob(binaryData, { type: dataType })
          );
          console.log(downloadLink)
          downloadLink.setAttribute("download", filename);
          document.body.appendChild(downloadLink);
          downloadLink.click();
        });
    }*/
  updateHolding(idform: number, value) {
    let format = {
      id: idform,
      value: value
    }
    return this._http.put(this.urlForm + '/holding', format)
  }
  downloadDocReq(customer_id: number, request_id: number) {
    console.log('AQUI ESTOY');
    // const format_download = {
    //   documents: documents
    // }
    this._http
      .put(this.urlDownloadDocReqs + `?customer_id=${customer_id}&request_id=${request_id}`, {}, {
        responseType: "blob" as "json",
      })
      .subscribe((response: any) => {
        let filename = 'DocumentosRequisitos'
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement("a");
        downloadLink.href = window.URL.createObjectURL(
          new Blob(binaryData, { type: dataType })
        );
        console.log(response)
        console.log(binaryData)
        console.log(downloadLink)
        downloadLink.setAttribute("download", filename);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      });
  }
  downloadDocForm(customer_id: number, request_id: number) {
    console.log('AQUI ESTOY');
    // const format_download = {
    //   documents: documents
    // }
    this._http
      .put(this.urlFormReqs+ `?customer_id=${customer_id}&request_id=${request_id}`, {}, {
        responseType: "blob" as "json",
      })
      .subscribe((response: any) => {
        let filename = 'DocumentosFormularios'
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement("a");
        downloadLink.href = window.URL.createObjectURL(
          new Blob(binaryData, { type: dataType })
        );
        console.log(response)
        console.log(binaryData)
        console.log(downloadLink)
        downloadLink.setAttribute("download", filename);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      });
  }
  downloadDocIR(customer_id: number, request_id: number) {
    console.log('AQUI ESTOY');
    this._http
      .put(this.urlIRDocs + `?customer_id=${customer_id}&request_id=${request_id}`, {}, {
        responseType: "blob" as "json",
      })
      .subscribe((response: any) => {
        let filename = 'DocumentosInicioRelación'
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement("a");
        downloadLink.href = window.URL.createObjectURL(
          new Blob(binaryData, { type: dataType })
        );
        console.log(response)
        console.log(binaryData)
        console.log(downloadLink)
        downloadLink.setAttribute("download", filename);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      });
  }

  downloadInternetFile(idfile: number, filename: string) {
    this._http
      .get(this._urlDownloadInternetFile + "/" + idfile, {
        responseType: "blob" as "json",
      })
      .subscribe((response: any) => {
        //let filename ='test.xlsx'
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement("a");
        downloadLink.href = window.URL.createObjectURL(
          new Blob(binaryData, { type: dataType })
        );
        downloadLink.setAttribute("download", filename);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      });
  }

  downloadInfornetFile(idfile: number, filename: string) {
    this._http
      .get(this._urlDownloadInfornetFile + "/" + idfile, {
        responseType: "blob" as "json",
      })
      .subscribe((response: any) => {
        //let filename ='test.xlsx'
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement("a");
        downloadLink.href = window.URL.createObjectURL(
          new Blob(binaryData, { type: dataType })
        );
        downloadLink.setAttribute("download", filename);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      });
  }
  getInternetFile(id: number): Observable<any> {
    return this._http.get(this._urlGetInternetFile + "/" + id);
  }
  getInfornetFile(id: number): Observable<any> {
    return this._http.get(this._urlGetInfornetFile + "/" + id);
  }

  getInternetFiles(customer_id: number): Observable<any> {
    return this._http.get(this._urlGetInternetFiles + "/" + customer_id);
  }
  getInfornetFiles(customer_id: number): Observable<any> {
    return this._http.get(this._urlGetInfornetFiles + "/" + customer_id);
  }

  deleteInternetFiles(customer_internet_file_id: number): Observable<any> {
    return this._http.delete(
      this._urlDeleteInternetFile + "/" + customer_internet_file_id
    );
  }
  deleteDocsCA(id_uploaddocsca: number): Observable<any> {
    return this._http.delete(
      this.urlDeleteDocsCA + "/" + id_uploaddocsca
    );
  }
  deleteInfornetFiles(customer_infornet_file_id: number): Observable<any> {
    return this._http.delete(
      this._urlDeleteInfornetFile + "/" + customer_infornet_file_id
    );
  }
  deleteMember(person_id: number): Observable<any> {
    return this._http.delete(
      this.urlDeleteMember + "/" + person_id
    );
  }
  deleteRepresentative(person_id: number): Observable<any> {
    return this._http.delete(
      this.urlDeleteRepresentative + "/" + person_id
    )
  }

  CreateUser(userData) {
    return this._http.post<any>(this._url, userData);
  }

  CreatePerson(userData) {
    console.log(this.urlcreatePerson);
    return this._http.post<any>(this.urlcreatePerson, userData);
  }

  GetCountries(): Observable<any> {
    return this._http.get<any>(this.urlgetCountries);
  }

  GetDepartments(): Observable<any> {
    return this._http.get<any>(this.urlgetDepartments);
  }

  GetCurrency(): Observable<any> {
    return this._http.get<any>(this.urlCurrency)
  }

  GetMunicipalities(): Observable<any> {
    return this._http.get<any>(this.urlgetMunicipalities);
  }

  GetPerson() {
    return this._http.get<any>(this.urlgetPerson);
  }

  GetOneCustomer(user_id): Observable<any> {
    return this._http.get<any>(this.urlgetCustomer, {
      params: { id: user_id },
    });
  }
  GetOneCustomerType(user_id): Observable<any> {
    return this._http.get<any>(this.urlgetCustomerType + '/' + user_id)
  }

  GetOnePerson(user_id, type?: number): Observable<any> {
    return this._http.get<any>(this.urlgetOnePerson, {
      params: { id: user_id, type: type?.toString() },
    });
  }

  UpdateCustomer(userData, user_id) {
    console.log("LO QUE VOY A MANDAR COMO user_id: " + user_id);
    return this._http.put<any>(this.urlupdateCostumer, userData, {
      params: { id: user_id },
    });
  }

  UpdatePerson(userData, user_id) {
    return this._http.put<any>(this.urlupdatePerson, userData, {
      params: { id: user_id },
    });
  }

  getCustomerRepresentatiave(user_id): Observable<any> {
    return this._http.get<any>(this.urlCustomerRepresentative, {
      params: { id: user_id },
    });
  }

  getCustomerRepMem(user_id): Observable<any> {
    return this._http.get<any>(this.urlCustomerRepMem, { params: { id: user_id } });
  }

  CreateCustomerRepresentative(userData) {
    return this._http.post<any>(this.urlCreateCustomerRepresentative, userData);
  }

  getCustomerMembers(user_id): Observable<any> {
    return this._http.get<any>(this.urlCustomerMember, {
      params: { id: user_id },
    });
  }

  isExistEmail(email): Observable<any> {
    return this._http.get<any>(this.urlisExistEmail, {
      params: { email: email },
    });
  }

  CreateCustomerMember(userData) {
    return this._http.post<any>(this.urlCreateCustomerMember, userData);
  }

  GetAllCustomer(
    limit: number,
    offset: number,
    searchItem: string[],
    category?: number
  ) {

    let uri = `${this.urlGetAllCustomer}?limit=${limit}&offset=${offset}${category ? '&category=' + category : ''}`
    if (searchItem.length != 0) {
      uri = `${this.urlGetAllCustomer}?limit=${limit}&offset=${offset}&searchItem=${searchItem}${category ? '&category=' + category : ''}`
    }
    return this._http.get<any>(uri);
  }

  GetAllCustomerCategories() {
    return this._http.get<any>(this.urlGetAllCustomerCategories);
  }

  UploadFile(data: any): Observable<any> {
    return this._http.post<any>(this.urlUploadFile, data);
  }

  UploadFileDocuments(data: any): Observable<any> {
    return this._http.post<any>(this.urlUploadFileDocuments, data);
  }

  UploadSupplierDocuments(data: any): Observable<any> {
    let uri = environment.urlUploadSupplierDocuments;
    return this._http.post(uri, data);
  }

  CreateDocumentCustomer(data: any): Observable<any> {
    return this._http.put<any>(this.urlCreateCustomerDocument, data);
  }

  CreateVerificationCustomer(data: any): Observable<any> {
    return this._http.put<any>(this.urlCreateCustomerVerification, data);
  }

  CreateWarrantyCustomer(data: any): Observable<any> {
    return this._http.put<any>(this.urlCreateCustomerWarranty, data);
  }

  CreateFiducaryWarrantyCustomer(data: any): Observable<any> {
    return this._http.put<any>(this.urlCreateCustomerFiduciaryWarranty, data);
  }

  DeleteFiducaryWarrantyCustomer(id: any): Observable<any> {
    return this._http.put<any>(this.urlDeleteCustomerFiduciaryWarranty + '/' + id, {});
  }


  UpdateFiducaryWarrantyCustomer(userData, user_id) {
    return this._http.put<any>(
      this.urlUpdateCustomerFiduciaryWarranty,
      userData,
      {
        params: { id: user_id },
      }
    );
  }

  CreateStatusDocument(data: any): Observable<any> {
    return this._http.put<any>(this.urlCreateDocumentStatus, data);
  }

  GetTypeRequest(): Observable<any> {
    return this._http.get<any>(this.urlGetTypeRequest);
  }

  CreateCustomerRequest(data: any): Observable<any> {
    return this._http.put<any>(this.urlCustomerRequest, data);
  }

  DeleteCustomerRequest(id: any): Observable<any> {
    return this._http.delete<any>(this.urlDeletCustomerRequest + id);
  }

  GetMetaDataRequest(request_id): Observable<any> {
    return this._http.get<any>(this.urlGetMetadaraRequest + request_id);
  }

  GetCustomerRequest(user_id): Observable<any> {
    return this._http.get<any>(this.urlCustomerRequest, {
      params: { id: user_id },
    });
  }

  GetAllDataCustomerRequest(user_id, requestid): Observable<any> {
    return this._http.get<any>(this.urlCustomerRequest + "alldata", {
      params: { id: user_id, request: requestid },
    });
  }

  GetOneDocument(user_data): Observable<any> {
    return this._http.get<any>(this.urlCustomerRequest + "onedocument", {
      params: user_data,
    });
  }

  GetAllCustomerRequest(): Observable<any> {
    return this._http.get<any>(this.urlCustomerRequest + "allrequest");
  }

  DeleteDocument(user_data): Observable<any> {
    return this._http.delete<any>(this.urlDeleteDocuments, {
      params: user_data,
    });
  }

  UpdateRequestCustomer(data, request): Observable<any> {
    return this._http.put<any>(this.urlCustomerRequest + "update", data, {
      params: { request: request },
    });
  }

  InitialDetails(data, request): Observable<any> {
    return this._http.put<any>(
      this.urlCustomerRequest + "initaldetails",
      data,
      {
        params: { request: request },
      }
    );
  }

  CreateONUList(data: any): Observable<any> {
    return this._http.post<any>(this.urlONUlist, data);
  }

  GetONUList(): Observable<any> {
    return this._http.get<any>(this.urlONUlist);
  }

  GetONUMatch(): Observable<any> {
    return this._http.get<any>(this.urlONUlist + "/match");
  }

  GetLogsUnlockLockCustomerOnu(): Observable<any> {
    return this._http.get<any>(this.urlONUlist + "/logs");
  }

  UpdateIRelation(data, user) {
    return this._http.post<any>(this.urlIRelation, data, {
      params: { id: user },
    });
  }

  UpdateIRelationJuridica(data, id_relation) {
    return this._http.post<any>(this.urlIRelationJuridica, data, {
      params: { id: id_relation },
    });
  }

  UpdateIRelationFiduciary(data, id_relation) {
    return this._http.post<any>(this.urlIRelationFiduciary, data, {
      params: { id: id_relation },
    });
  }

  AditionalRequest(data: any): Observable<any> {
    return this._http.post<any>(this.urlAditionalRequest, data);
  }

  AditionalRequestDoc(data: any): Observable<any> {
    console.log(data);
    return this._http.post<any>(this.urlAditionalRequest + "/doc", data);
  }

  GetAditionalDocument(request_id): Observable<any> {
    return this._http.get<any>(this.urlAditionalRequest + "/getdocs", {
      params: { id: request_id },
    });
  }

  Downletter(type, name, dpi, bussines, nit): Observable<any> {
    if (type === "juridico") {
      return this._http.get<any>(this.urlDownletter, {
        params: {
          type: "juridico",
          name: name,
          dpi: dpi,
          bussines: bussines,
          nit: nit,
        },
      });
    } else {
      return this._http.get<any>(this.urlDownletter, {
        params: { type: "individual", name: name, dpi: dpi },
      });
    }
  }

  UpdateAditionalDocument(data, request_id): Observable<any> {
    return this._http.post<any>(this.urlAditionalRequest + "/update", data, {
      params: { id: request_id },
    });
  }

  DownloadXlsx(filename: string = null, searchItem, searchField): void {
    this._http
      .get(this.urlXlsx, {
        responseType: "blob" as "json",
        params: { searchItem: searchItem, searchField: searchField },
      })
      .subscribe((response: any) => {
        //let filename ='test.xlsx'
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement("a");
        downloadLink.href = window.URL.createObjectURL(
          new Blob(binaryData, { type: dataType })
        );
        if (filename) downloadLink.setAttribute("download", filename);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      });
  }

  CreateUserLog(data: any): Observable<any> {
    return this._http.put<any>(this.urlCreateDocumentStatus, data);
  }

  CreateGeneralDataFEIC(data: any): Observable<any> {
    console.log('FEIC TO SAVE:: ');
    console.log('feic_address_zone:: ' + data.feic_address_zone);
    console.log('feic_address_dep::' + data.feic_address_dep);
    console.log('feic_address_mun:: ' + data.feic_address_mun);
    //console.log(data);
    return this._http.post<any>(this.urlFormFEIC, data);
  }

  CreateGeneralData(data: any): Observable<any> {
    return this._http.post<any>(this.urlForm, data);
  }

  GetGeneralData(id: any): Observable<any> {
    return this._http.get<any>(this.urlForm + "/" + id);
  }

  DeleteSomeGeneralData(id: any, resource: any): Observable<any> {
    return this._http.delete<any>(this.urlForm + "/" + id, {
      params: { resource: resource },
    });
  }

  addNewAval(data: any): Observable<any> {
    console.log(data);
    return this._http.post<any>(this.urlRequest + "/createaval", data);
  }

  DeleteAval(id: any): Observable<any> {
    return this._http.delete<any>(this.urlRequest + "/removeaval/" + id);
  }

  DeleteSubject(id: any): Observable<any> {
    return this._http.delete<any>(this.urlRequest + "removesubject/" + id);
  }

  addNewMember(data: any): Observable<any> {
    //console.log(data);
    return this._http.put<any>(this.urlRequest + "createsubject", data);
  }

  UpdateSubject(data): Observable<any> {
    return this._http.put<any>(this.urlRequest + "/modifysubject", data);
  }
  changeCustomerToTraditionalCustomer(id_customer: number): Observable<any> {
    const data = {
      id_customer
    }
    return this._http.put<any>(this.urlChangeCustomerToTraditionalCustomer, data, HTTPOPTIONS)
  }
}
