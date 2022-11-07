import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetVerificationDocVWResponse, GetVerificationDocsVWResponse, VerificationDocVW, VerificationDocsVWPagination } from 'src/app/models/verificationdocsvw.model';
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

@Injectable({
  providedIn: 'root'
})
export class VerificationdocvwService {

  constructor(private http: HttpClient) { }
  getVerifications(
    limit: number,
    offset: number,
    searchItem: string[]
  ): Observable<VerificationDocsVWPagination> {
    let uri = `${environment.urlVerificationList}?limit=${limit}&offset=${offset}`;
    if (searchItem.length != 0) {
      uri = `${environment.urlVerificationList}?limit=${limit}&offset=${offset}&searchItem=${searchItem}`;
    }
    return this.http.get<GetVerificationDocsVWResponse>(uri, httpOptions).pipe(
      map((response) => {
        console.log(response)
        return response.body.data;
      })
    )
  }
  getCheck(id: number, docname: string, id_commercial: number) {
    let uri = `${environment.urlVerification}/check?id=${id}&name=${docname}&id_commercial=${id_commercial}`
    return this.http.get<GetVerificationDocVWResponse>(uri, httpOptions).pipe(
      map((response) => {
        console.log(response)
        return response.body.data;
      })
    )
  }
}
