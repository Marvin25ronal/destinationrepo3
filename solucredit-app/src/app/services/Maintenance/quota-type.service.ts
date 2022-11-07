import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuotaType, QuotaTypePagination, GetQuotaTypeResponse, GetQuotaTypesResponse } from '../../models/quotatype.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { ThumbsDown } from 'angular-feather/icons';
const httpOptions = 
{
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
export class QuotaTypeService {

  constructor(private http: HttpClient) { }
  saveQuotaType(quotatype: QuotaType): Observable<QuotaType>{
    const uri = `${environment.urlQuotaType}`;
    const format_quotatype = {
      quotatype : quotatype
    };
    return this.http
    .post<GetQuotaTypeResponse>(uri, format_quotatype,httpOptions)
    .pipe(
      map((response)=> {
        return response.body.data;
      })
    )
  }
  getQuotaTypes(
    limit: number,
    offset: number,
    searchItem: string[]
  ): Observable<QuotaTypePagination> {
    let uri = `${environment.urlQuotaTypeList}?limit=${limit}&offset=${offset}`;
    if (searchItem.length != 0) {
      uri = `${environment.urlQuotaTypeList}?limit=${limit}&offset=${offset}&searchItem=${searchItem}`;
    }
    return this.http.get<GetQuotaTypesResponse>(uri, httpOptions).pipe(
      map((response) => {
        return response.body.data;
      })
    )
  }
  updateQuotaType(quotatype: QuotaType): Observable<HttpResponse<any>> {
    const uri = `${environment.urlUpdateQuotaTypeList}`;
    const format_quotatype = {
      quotatype: quotatype
    };
    return this.http.put(uri, format_quotatype, httpOptions).pipe(
      map((response) => {
        return response
      })
    )
  }
  deleteQuotaType(quotatype: QuotaType, comment: string): Observable<HttpResponse<any>> {
    const uri = `${environment.urlQuotaType}/${quotatype.quota_type_id}`;
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
}
