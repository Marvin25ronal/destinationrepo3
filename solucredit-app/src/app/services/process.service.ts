import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter, catchError } from 'rxjs/operators';

import { Injectable } from '@angular/core';

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
export class ProcessService {

  constructor(public http: HttpClient) { }

  /* verifySendingEmailDocument(): Observable<boolean> {
    const uri = ``
  } */
}
