import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { GetRequestTypeResponse, GetRequestTypesResponse, RequestType, RequestTypePagination } from 'src/app/models/request-type.model';
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
export class RequestTypeService {
  constructor(private http: HttpClient) { }
  saveRequest(request: RequestType): Observable<RequestType> {
    const uri = `${environment.urlgetTypeRequest}`;
    const format_disbursment = {
      request_type: request
    };
    return this.http
      .post<GetRequestTypeResponse>(uri, format_disbursment, httpOptions)
      .pipe(
        map((response) => {
          return response.body.data;
        })
      )
  }
  getRequest(
    limit: number,
    offset: number,
    searchItem: string[]
  ): Observable<RequestTypePagination> {
    let uri = `${environment.urlgetTypeRequestList}?limit=${limit}&offset=${offset}`;
    if (searchItem.length != 0) {
      uri = `${environment.urlgetTypeRequestList}?limit=${limit}&offset=${offset}&searchItem=${searchItem}`;
    }
    return this.http.get<GetRequestTypesResponse>(uri, httpOptions).pipe(
      map((response) => {

        return response.body.data;
      })
    )
  }
  updateRequest(request: RequestType): Observable<HttpResponse<any>> {
    const uri = `${environment.urlgetTypeRequest}`;
    const format_coverage = {
      request_type: request
    };
    return this.http.put(uri, format_coverage, httpOptions).pipe(
      map((response) => {
        return response
      })
    )
  }
  deleteRequest(coverage: RequestType, comment: string): Observable<HttpResponse<any>> {
    const uri = `${environment.urlgetTypeRequest}/${coverage.type_id}`;
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
