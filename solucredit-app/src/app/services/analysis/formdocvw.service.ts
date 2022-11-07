import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormDocVWPagination, GetFormDocVWResponse, GetFormDocsVWResponse} from 'src/app/models/formdocvw.model';
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
export class FormdocvwService {

  constructor(private http: HttpClient) { }
  getFormDocs(
    limit: number,
    offset: number,
    searchItem: string[]
  ): Observable<FormDocVWPagination> {
    let uri = `${environment.urlFormDocVWList}?limit=${limit}&offset=${offset}`;
    if (searchItem.length != 0) {
      uri = `${environment.urlFormDocVWList}?limit=${limit}&offset=${offset}&searchItem=${searchItem}`;
    }
    return this.http.get<GetFormDocsVWResponse>(uri, httpOptions).pipe(
      map((response) => {
        //console.log(response)
        return response.body.data;
      })
    )
  }
  getFormDoc(id: number) {
    let uri = `${environment.urlFormDocVW}/formdocument/${id}`
    return this.http.get<GetFormDocVWResponse>(uri, httpOptions).pipe(
      map((response) => {
        //console.log(response)
        return response.body.data;
      })
    )
  }
  getDocs(id: number, analysis: string) {
    debugger
    let uri = `${environment.urlFormDocVW}/${id}/${analysis}`
    return this.http.get<GetFormDocVWResponse>(uri, httpOptions).pipe(
      map((response) => {
        //console.log(response)
        return response.body.data;
      })
    )
  }
}
