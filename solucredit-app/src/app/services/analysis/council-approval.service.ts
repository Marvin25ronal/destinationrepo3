import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { CommercialAnalysis } from 'src/app/models/commercialanalysis.model';
import { GetCouncilMemberResponse } from 'src/app/models/councilmember.model';
import { environment } from 'src/environments/environment';
import { HTTPOPTIONS } from 'src/Utils/constants';
import { GetAnalysisResponse, GetCreateInitResponse, GetDocumentsResponse, GetInitResponse } from './legal-analysis.service';

@Injectable({
  providedIn: 'root'
})
export class CouncilApprovalService {

  constructor(
    private http: HttpClient,
  ) { }
  getInit(id_request: number) {
    const uri = `${environment.urlCouncilApproval}/init/${id_request}`;
    return this.http.get<GetInitResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  getAnalysis(request: number) {
    const uri = `${environment.urlCouncilApproval}/analysis/${request}`
    return this.http.get<GetAnalysisResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  listDocuments(id_analysis: number) {
    const uri = `${environment.urlCouncilApproval}/listdocuments/${id_analysis}`
    return this.http.get<GetDocumentsResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  initAnalysis(data: CommercialAnalysis) {
    const uri = `${environment.urlCouncilApproval}/init`
    let format = {
      analysis: data,
    }
    return this.http.post<GetCreateInitResponse>(uri, format, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  updateAnalysis(id_analysis: number, comment: string, valid: boolean) {
    const uri = `${environment.urlCouncilApproval}/analysis`
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
  getRepresentative() {
    const uri = `${environment.urlCouncilApproval}/getRepresentative`
    return this.http.get<GetCouncilMemberResponse>(uri, HTTPOPTIONS)
  }
}
