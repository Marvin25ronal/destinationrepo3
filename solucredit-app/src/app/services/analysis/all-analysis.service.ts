import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Adviser, AdviserAnalysis } from 'src/app/models/adviser.model';
import { AnalysisType, CommercialAnalysis } from 'src/app/models/commercialanalysis.model';
import { UploadDocumentsCA } from 'src/app/models/uploaddocumentsca.model';
import { VerificationDocVW } from 'src/app/models/verificationdocsvw.model';
import { environment } from 'src/environments/environment';
import { HTTPOPTIONS } from 'src/Utils/constants';

export interface GetInitResponse {
  success: boolean
  data: boolean
}
export interface GetCreateInitResponse {
  success: boolean
  data: CommercialAnalysis
}
export interface GetAdviserResponse {
  success: boolean
  data: AdviserAnalysis
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
export interface GetResponsableResponse {
  success: boolean
  data: Adviser
}

@Injectable({
  providedIn: 'root'
})
export class AllAnalysisService {

  constructor(private http: HttpClient) { }

  getInit(id_request: number, type: string) {
    const uri = `${environment.urlAllAnalysis}/init/${id_request}/${type}`
    return this.http.get<GetInitResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        console.log('******')
        console.log(response)
        return response.body.data
      })
    )
  }
  initAnalysis(data: CommercialAnalysis, id_adviser: number) {
    const uri = `${environment.urlAllAnalysis}/init`
    let format = {
      analysis: data,
      id_adviser: id_adviser
    }
    return this.http.post<GetCreateInitResponse>(uri, format, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  addAdviser(adviser: AdviserAnalysis, id_adviser) {
    const uri = `${environment.urlAllAnalysis}/adviser`
    let format = {
      adviser: adviser,
      id_adviser: id_adviser
    }
    return this.http.post<GetAdviserResponse>(uri, format, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  updateAdviser(request_id: number, adviser_id: number, type: string, comment: string) {
    const uri = `${environment.urlAllAnalysis}/adviser`
    debugger
    let format = {
      adviser_id,
      request_id,
      type,
      comment
    }
    return this.http.put<GetAdviserResponse>(uri, format, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  getResponsable(request: number) {
    const uri = `${environment.urlAllAnalysis}/responsable/${request}`
    return this.http.get<GetResponsableResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  downloadDocuments(request: number) {
    const uri = `${environment.urlAllAnalysis}/downloadDocuments/${request}`
    return this.http.get<GetInitResponse>(uri, {
      responseType: "blob" as "json",
    }).subscribe((response: any) => {
      let filename = 'DocumentosAnalisisLegal'
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
  downloadDocumentsFinancial(customer_id:number,request_id:number) {
    const uri = `${environment.urlFinancialAnalysis}/downloadDocuments?customer_id=${customer_id}&request_id=${request_id}`
    return this.http.get<GetInitResponse>(uri, {
      responseType: "blob" as "json",
    }).subscribe((response: any) => {
      let filename = 'DocumentosAnalisisFinancial'
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
  downloadDocumentsAll(request: number, callback?: any) {
    const uri = `${environment.urlAllAnalysis}/downloadAll/${request}`
    return this.http.get<GetInitResponse>(uri, {
      responseType: "blob" as "json",
    }).subscribe((response: any) => {
      let filename = 'DocumentosAnalisisFinancial'
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
      if (callback) {
        callback()
      }
    })
  }
  getAnalysis(request: number, type: string) {
    const uri = `${environment.urlAllAnalysis}/analysis/${request}&${type}`
    return this.http.get<GetAnalysisResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  getAnalysis2(request: number) {
    const uri = `${environment.urlAllAnalysis}/analysis2/${request}`
    return this.http.get<GetAnalysisResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  updateAnalysis(id_analysis: number, comment: string, valid: boolean) {
    const uri = `${environment.urlAllAnalysis}/analysis`
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
  listLegalDocuments(id_analysis: number) {
    const uri = `${environment.urlAllAnalysis}/listdocuments/${id_analysis}`
    return this.http.get<GetDocumentsResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  getCheckList(id_request: number) {
    const uri = `${environment.urlAllAnalysis}/checklist/${id_request}`
    return this.http.get<GetChecklistResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  getType(id_analysis: number) {
    const uri = `${environment.urlAllAnalysis}/type/${id_analysis}`
    return this.http.get<GetAnalysisTypeResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
}
