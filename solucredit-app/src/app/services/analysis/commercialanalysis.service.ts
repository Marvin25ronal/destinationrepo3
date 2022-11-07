import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommercialAnalysisPagination, CommercialAnalysis, GetCAResponse, GetCASResponse } from '../../models/commercialanalysis.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { HTTPOPTIONS } from 'src/Utils/constants';
import { ChecklistItem, GetInitResponse } from './legal-analysis.service';
export interface CommercialCheckListItem extends ChecklistItem {
  commercial_checklist_analysis_id: number
  document_id: number
  checklist_document_key: string
  checklist_document_name: string
  creation_date: Date
  last_mod: Date
  verification: number
  comment: string
  document_type: string
}
export interface GetCheckListResponse {
  success: boolean
  data: CommercialCheckListItem[]
}
const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
      /* 'Access-Control-Allow-Credentials': 'true' */
    }),
  responseType: 'json' as const,
  //withCredentials: true as const,  
  observe: 'response' as const
};

@Injectable({
  providedIn: 'root'
})

@Injectable({
  providedIn: 'root'
})
export class CommercialanalysisService {

  constructor(private http: HttpClient) { }
  saveCA(commercialanalysis: CommercialAnalysis): Observable<CommercialAnalysis> {
    const uri = `${environment.urlCommercialAnalysis}`;
    const format_ca = {
      commercialanalysis: commercialanalysis
    };
    return this.http
      .post<GetCAResponse>(uri, format_ca, httpOptions)
      .pipe(
        map((response) => {
          return response.body.data;
        })
      )
  }
  getOneCA(id: number) {
    let uri = `${environment.urlCommercialAnalysis}/commercialanalysis/${id}`
    return this.http.get<GetCAResponse>(uri, httpOptions).pipe(
      map((response) => {
        return response.body.data;
      })
    )
  }
  getCA(
    limit: number,
    offset: number,
    searchItem: string[]
  ): Observable<CommercialAnalysisPagination> {
    let uri = `${environment.urlCommercialAnalysisList}?limit=${limit}&offset=${offset}`;
    if (searchItem.length != 0) {
      uri = `${environment.urlCommercialAnalysisList}?limit=${limit}&offset=${offset}&searchItem=${searchItem}`;
    }
    return this.http.get<GetCASResponse>(uri, httpOptions).pipe(
      map((response) => {
        //console.log(response)
        return response.body.data;
      })
    )
  }
  updateCA(commercialanalysis: CommercialAnalysis): Observable<HttpResponse<any>> {
    const uri = `${environment.urlCommercialAnalysis}`;
    const format_ca = {
      commercialanalysis: commercialanalysis
    };
    return this.http.put(uri, format_ca, httpOptions).pipe(
      map((response) => {
        return response
      })
    )
  }
  getCheckList(customer_id: number, request_id: number) {
    const uri = `${environment.urlCommercialAnalysis}/checklist?customer_id=${customer_id}&request_id=${request_id}`
    return this.http.get<GetCheckListResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        console.log(response)
        return response.body.data
      })
    )
  }
  getResponsable(request: number) {
    const uri = `${environment.urlCommercialAnalysis}/responsable/${request}`
    return this.http.get<GetCASResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  deleteCA(commercialanalysis: CommercialAnalysis, comment: string): Observable<HttpResponse<any>> {
    const uri = `${environment.urlCommercialAnalysis}/${commercialanalysis.id_commercialanalysis}`;
    const format_comment = {
      comment: comment
    }
    const httpOptionsDelete = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          /* 'Access-Control-Allow-Credentials': 'true' */
        }),
      responseType: 'json' as const,
      //withCredentials: true as const,
      body: format_comment,
      observe: 'response' as const
    }
    return this.http.delete(uri, httpOptionsDelete).pipe(
      map((response) => {
        return response
      })
    )
  }
  getNextAdviser(request: number, type: number) {
    const uri = `${environment.urlCommercialAnalysis}/nextadviser/${request}&${type}`
    return this.http.get<GetCASResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  getInitCommercialAnalysis(id_request: number) {
    const uri = `${environment.urlCommercialAnalysis}/init/${id_request}`
    return this.http.get<GetInitResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  uploadVerificationDocument(file: any, document_id: number, document_type: string, user_id: number, file_name: string) {
    const uri = `${environment.urlCommercialAnalysis}/uploadverification`
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
    const uri = `${environment.urlCommercialAnalysis}/verification`
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
