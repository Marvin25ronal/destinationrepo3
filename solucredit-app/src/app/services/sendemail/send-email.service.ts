import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
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
  providedIn: "root",
})
export class SendEmailService {
  _url = environment.urlapiemail;
  constructor(private _http: HttpClient) { }

  sendEmail(userData) {
    return this._http.post<any>(this._url, userData);
  }
  /* getFormsState(id_request:string): Observable<HttpResponse<any>> {
    const uri = `${environment.urlProcess}/getformstate?idrequest=${id_request}`;
    return this._http.get(uri, httpOptions).pipe(
      map((response) => {
        //console.log(response);
        return response;
      })
    );

    
    
  }
  getRequestFormsDetail(id_request: string): Observable<HttpResponse<any>> {
    const uri = `${environment.urlProcess}/getrequestformsdetail?idrequest=${id_request}`;
    return this._http.get(uri, httpOptions).pipe(
      map((response) => {
        console.log(response);
        return response;
      })
    );



  } */
  sendCustomerEmail(
    customerData: any,
    forms: number[],
    applicationID: number,
    infolog?: any
  ): Observable<HttpResponse<any>> {
    const uri = `${environment.urlProcess}/sendcustomeremail`;
    let data = {
      applicationID,
      customerData,
      forms,
      infolog,
    };
    return this._http.put(uri, data, httpOptions).pipe(
      map((response) => {
        //console.log(response);
        return response;
      })
    );
  }
}
