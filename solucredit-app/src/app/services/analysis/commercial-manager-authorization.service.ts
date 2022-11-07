import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { CommercialAnalysis } from 'src/app/models/commercialanalysis.model';
import { UploadDocumentsCA } from 'src/app/models/uploaddocumentsca.model';
import { environment } from 'src/environments/environment';
import { HTTPOPTIONS } from 'src/Utils/constants';
import { GetAnalysisResponse, GetCreateInitResponse, GetDocumentsResponse, GetInitResponse } from './legal-analysis.service';


export interface GetUploadDocumentsCA {
  success: boolean
  data: UploadDocumentsCA[]
}
@Injectable({
  providedIn: 'root'
})
export class CommercialManagerAuthorizationService {

  constructor(private http: HttpClient) { }
  getInit(id_request: number) {
    const uri = `${environment.urlCommercialManagerAuthorization}/init/${id_request}`
    return this.http.get<GetInitResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  listReporst(id_request: number) {
    const uri = `${environment.urlCommercialManagerAuthorization}/list-reports/${id_request}`
    return this.http.get<GetUploadDocumentsCA>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  listDocuments(id_analysis: number) {
    const uri = `${environment.urlCommercialManagerAuthorization}/listdocuments/${id_analysis}`
    return this.http.get<GetDocumentsResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  getAllReports(id_request: number) {
    const uri = `${environment.urlCommercialManagerAuthorization}/downloadall/${id_request}`
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
    const uri = `${environment.urlCommercialManagerAuthorization}/init`
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
    const uri = `${environment.urlCommercialManagerAuthorization}/analysis`
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
    const uri = `${environment.urlCommercialManagerAuthorization}/analysis/${request}`
    return this.http.get<GetAnalysisResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
}
