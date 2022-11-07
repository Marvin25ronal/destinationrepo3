import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { CommercialAnalysis } from 'src/app/models/commercialanalysis.model';
import { environment } from 'src/environments/environment';
import { HTTPOPTIONS } from 'src/Utils/constants';
import { ChecklistItem, GetAnalysisResponse, GetChecklistResponse, GetCreateInitResponse, GetDocumentsResponse, GetInitResponse, GetResponsableResponse } from './legal-analysis.service';
export interface GetCheckListResponse {
  success: boolean
  data: ComplianceCheckListItem[]
}
export interface ComplianceCheckListItem extends ChecklistItem {
  compliance_checklist_analysis_id: number
  document_id: number
  checklist_document_key: string
  checklist_document_name: string
  creation_date: Date
  last_mod: Date
  verification: number
  comment: string
}
@Injectable({
  providedIn: 'root'
})
export class ComplianceVerificationService {

  constructor(private http:HttpClient) { }
  getInit(id_request:number){
    const uri = `${environment.urlComplianceVerification}/init/${id_request}`
    return this.http.get<GetInitResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        console.log('******')
        console.log(response)
        return response.body.data
      })
    )
  }
  initAnalysis(data:CommercialAnalysis,id_adviser:number){
    const uri=`${environment.urlComplianceVerification}/init`
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
  getResponsable(request: number) {
    const uri = `${environment.urlComplianceVerification}/responsable/${request}`
    return this.http.get<GetResponsableResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  getAnalysis(request: number) {
    const uri = `${environment.urlComplianceVerification}/analysis/${request}`
    return this.http.get<GetAnalysisResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  updateAnalysis(id_analysis: number, comment: string, valid: boolean) {
    const uri = `${environment.urlComplianceVerification}/analysis`
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
  listComplianceDocuments(id_analysis:number){
    const uri = `${environment.urlComplianceVerification}/listdocuments/${id_analysis}`
    return this.http.get<GetDocumentsResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  getCheckList(customer_id:number,request_id:number) {
    const uri = `${environment.urlComplianceVerification}/checklist?customer_id=${customer_id}&request_id=${request_id}`
    return this.http.get<GetChecklistResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  uploadVerificationDocument(file: any, document_id: number, document_type: string, user_id: number, file_name: string) {
    const uri = `${environment.urlComplianceVerification}/uploadverification`
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
  saveVerification(
    document_id: number,
    checklist_document_key: string,
    checklist_document_name: string,
    verification: number,
    comment: string,
    document_type: string
  ) {
    const uri = `${environment.urlComplianceVerification}/verification`
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
}
