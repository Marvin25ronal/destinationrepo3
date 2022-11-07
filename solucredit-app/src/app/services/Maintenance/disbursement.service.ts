import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Disbursement, DisbursementPagination, GetDisbursementResponse, GetDisbursmentsResponse } from '../../models/disbursement.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
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

export class DisbursementService {

  constructor(private http: HttpClient) { }
  saveDisbursment(disbursement: Disbursement): Observable<Disbursement> {
    const uri = `${environment.urlDisbursement}`;
    const format_disbursment = {
      disbursement: disbursement
    };
    return this.http
      .post<GetDisbursementResponse>(uri, format_disbursment, httpOptions)
      .pipe(
        map((response) => {
          return response.body.data;
        })
      )
  }
  getDisbursements(
    limit: number,
    offset: number,
    searchItem: string[]
  ): Observable<DisbursementPagination> {
    let uri = `${environment.urlDisbursementList}?limit=${limit}&offset=${offset}`;
    if (searchItem.length != 0) {
      uri = `${environment.urlDisbursementList}?limit=${limit}&offset=${offset}&searchItem=${searchItem}`;
    }
    return this.http.get<GetDisbursmentsResponse>(uri, httpOptions).pipe(
      map((response) => {
        return response.body.data;
      })
    )
  }
  updateDisbursement(disbursement: Disbursement): Observable<HttpResponse<any>> {
    const uri = `${environment.urlDisbursement}`;
    const format_disbursement = {
      disbursement: disbursement
    };
    return this.http.put(uri, format_disbursement, httpOptions).pipe(
      map((response) => {
        return response
      })
    )
  }
  deleteDisbursement(disbursement: Disbursement, comment: string): Observable<HttpResponse<any>> {
    const uri = `${environment.urlDisbursement}/${disbursement.id_disbursement}`;
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
