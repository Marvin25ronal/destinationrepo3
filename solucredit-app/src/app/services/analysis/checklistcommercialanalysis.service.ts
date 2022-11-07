import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CheckListCommercialAnalysis, CheckListCommercialAnalysysPagination, GetCheckListResponse, GetCheckListsResponse } from 'src/app/models/checklistcommercialanalysis.model';
import { environment } from 'src/environments/environment';

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
export class ChecklistcommercialanalysisService {

  constructor(private http: HttpClient) { }
  getCheckList(
    limit: number,
    offset: number,
    searchItem: string[]
  ): Observable<CheckListCommercialAnalysysPagination> {
    let uri = `${environment.urlCheckList}?limit=${limit}&offset=${offset}`;
    if (searchItem.length != 0) {
      uri = `${environment.urlCheckList}?limit=${limit}&offset=${offset}&searchItem=${searchItem}`;
    }
    return this.http.get<GetCheckListsResponse>(uri, httpOptions).pipe(
      map((response) => {
        return response.body.data;
      })
    )
  }
  saveCheck(checklist: CheckListCommercialAnalysis): Observable<CheckListCommercialAnalysis> {
    const uri = `${environment.urlCheck}`;
    const format_check = {
      data: checklist
    };
    console.log(format_check)
    return this.http
      .post<GetCheckListResponse>(uri, format_check, httpOptions)
      .pipe(
        map((response) => {
          return response.body.data;
        })
      )
  }
  updateCheck(check: CheckListCommercialAnalysis): Observable<HttpResponse<any>> {
    const uri = `${environment.urlCheck}`;
    const format_check = {
      checklist: check
    };
    return this.http.put(uri, format_check, httpOptions).pipe(
      map((response) => {
        return response
      })
    )
  }
  uploadDocsCheck(data): Observable<HttpResponse<any>> {
    const uri = `${environment.urlUploadCheck}`;
    const format_check = {
      data: data
    };
    return this.http.post(uri, format_check, httpOptions).pipe(
      map((response) => {
        return response
      })
    )
  }
  uploadDocsC(data): Observable<any> {
    debugger
    const uri = `${environment.urlUploadCheck}`;
    return this.http.post(uri, data).pipe(
      map((response) => {
        return response
      })
    )
  }
  delDocs(data): Observable<any> {
    debugger
    const uri = `${environment.urlDelDocCheck}`;
    return this.http.post(uri, data).pipe(
      map((response) => {
        console.log(response)
        return response
      })
    )
  }
  updateComment(comment, id) {
    const uri = `${environment.urlUpdateCommentCheck}`
    let format = {
      id,
      comment
    }
    return this.http.put(uri, format).pipe(
      map((response) => {
        return response
      })
    )
  }
}
