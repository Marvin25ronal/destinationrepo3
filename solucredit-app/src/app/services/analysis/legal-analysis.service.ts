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
  data: LegalCheckListItem[]
}
export interface LegalCheckListItem extends ChecklistItem {
  legal_checklist_analysis_id: number
  creation_date: Date
  last_mod: Date
  verification: number
  comment: string

}
export interface ChecklistItem {
  document_type: string
  name: string
  id: number
  key: string
  document_name: string
  user_type: string
  description: string
  checklist_document_key: string
  checklist_document_name: string
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

export class LegalAnalysisService {

  constructor(private http: HttpClient) { }
  getInit(id_request: number) {
    const uri = `${environment.urlLegalAnalysis}/init/${id_request}`
    return this.http.get<GetInitResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        console.log('******')
        console.log(response)
        return response.body.data
      })
    )
  }
  initLegalAnalysis(data: CommercialAnalysis, id_adviser: number) {
    const uri = `${environment.urlLegalAnalysis}/init`
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
    const uri = `${environment.urlLegalAnalysis}/adviser`
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
    const uri = `${environment.urlLegalAnalysis}/adviser`
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
    const uri = `${environment.urlLegalAnalysis}/responsable/${request}`
    return this.http.get<GetResponsableResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  downloadDocuments(request: number, customer_id: number) {
    const uri = `${environment.urlLegalAnalysis}/downloadDocuments?request_id=${request}&customer_id=${customer_id}`
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
  getAnalysis(request: number) {
    const uri = `${environment.urlLegalAnalysis}/analysis/${request}`
    return this.http.get<GetAnalysisResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  getAnalysis2(request: number) {
    const uri = `${environment.urlLegalAnalysis}/analysis2/${request}`
    return this.http.get<GetAnalysisResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  updateAnalysis(id_analysis: number, comment: string, valid: boolean) {
    const uri = `${environment.urlLegalAnalysis}/analysis`
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
    const uri = `${environment.urlLegalAnalysis}/listdocuments/${id_analysis}`
    return this.http.get<GetDocumentsResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  getCheckList(id_request: number, customer_id: number) {
    const uri = `${environment.urlLegalAnalysis}/checklist?customer_id=${customer_id}&request_id=${id_request}`
    return this.http.get<GetChecklistResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  saveVerification(
    document_id: number,
    checklist_document_key: string,
    checklist_document_name: string,
    verification: number,
    comment: string,
    document_type: string
  ) {
    const uri = `${environment.urlLegalAnalysis}/verification`
    const format = {
      document_id,
      checklist_document_key,
      checklist_document_name,
      verification,
      comment,
      document_type
    }
    return this.http.post<any>(uri, format, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body
      })
    )
  }
  getType(id_analysis: number) {
    const uri = `${environment.urlLegalAnalysis}/type/${id_analysis}`
    return this.http.get<GetAnalysisTypeResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  uploadVerificationDocument(file: any, document_id: number, document_type: string, user_id: number, file_name: string) {
    const uri = `${environment.urlLegalAnalysis}/uploadverification`
    const format = {
      files: file,
      document_id: document_id,
      document_type,
      user_id,
      file_name
    }
    return this.http.post<any>(uri, format, HTTPOPTIONS)
      .pipe(
        map((response) => {
          return response.body
        })
      )

  }
}
