import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Adviser, AdviserAnalysis } from 'src/app/models/adviser.model';
import { AnalysisType, CommercialAnalysis } from 'src/app/models/commercialanalysis.model';
import { UploadDocumentsCA } from 'src/app/models/uploaddocumentsca.model';
import { VerificationDocVW } from 'src/app/models/verificationdocsvw.model';
import { environment } from 'src/environments/environment';
import { HTTPOPTIONS } from 'src/Utils/constants';
import { GetInitResponse } from './legal-analysis.service';
export interface GetUploadDocumentsCA {
  success: boolean
  data: UploadDocumentsCA[]
}
export interface GetAnalysisResponse {
  success: boolean
  data: CommercialAnalysis
}
export interface GetDocumentsResponse {
  success: boolean
  data: UploadDocumentsCA[]
}
export interface GetChecklistResponse {
  success: boolean
  data: VerificationDocVW[]
}
export interface GetAnalysisTypeResponse {
  success: boolean
  data: AnalysisType
}
export interface GetResponsableResponse{
  success:boolean
  data:Adviser
}
export interface GetCreateInitResponse {
  success: boolean
  data: CommercialAnalysis
}
@Injectable({
  providedIn: 'root'
})
export class GerencialManagerAuthorizationService {

  constructor(private http: HttpClient) { }
  getInit(id_request: number) {
    const uri = `${environment.urlGerencialcialManagerAuthorization}/init/${id_request}`
    return this.http.get<GetInitResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        console.log(response);
        return response.body.data
      })
    )
  }
  listReporst(id_request: number) {
    const uri = `${environment.urlGerencialcialManagerAuthorization}/list-reports/${id_request}`
    return this.http.get<GetUploadDocumentsCA>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  listDocuments(id_analysis: number) {
    const uri = `${environment.urlGerencialcialManagerAuthorization}/listdocuments/${id_analysis}`
    return this.http.get<GetDocumentsResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  getAllReports(id_request: number) {
    const uri = `${environment.urlGerencialcialManagerAuthorization}/downloadall/${id_request}`
    return this.http.get<any>(uri, {
      responseType: "blob" as "json",
    }).subscribe((response: any) => {
      let filename = 'Expediente'
      let datatype = response.type;
      let binaryData = []
      binaryData.push(response)
      let downloadLink = document.createElement("a")
      downloadLink.href = window.URL.createObjectURL(
        new Blob(binaryData, { type: datatype })
      )
      downloadLink.setAttribute("download", filename);
      document.body.appendChild(downloadLink);
      downloadLink.click();

    })
  }
  initAnalysis(data: CommercialAnalysis) {
    debugger
    const uri = `${environment.urlGerencialcialManagerAuthorization}/init`
    let format = {
      analysis: data
    }
    return this.http.post<GetCreateInitResponse>(uri, format, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  updateAnalysis(id_analysis: number, comment: string, valid: boolean) {
    const uri = `${environment.urlGerencialcialManagerAuthorization}/analysis`
    const format = {
      id: id_analysis,
      comment: comment,
      valid_documents: valid
    }
    return this.http.put<GetAnalysisResponse>(uri, format, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  getAnalysis(request: number) {
    const uri = `${environment.urlGerencialcialManagerAuthorization}/analysis/${request}`
    return this.http.get<GetAnalysisResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
}
