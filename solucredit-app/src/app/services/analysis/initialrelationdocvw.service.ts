import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetInitialRelationDocVWResponse, InitialRelationDocVWPagination, GetInitialRelationDocsVWResponse} from 'src/app/models/initialrelationvw.model';
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
export class InitialrelationdocvwService {

  constructor(private http: HttpClient) { }
  getIRDocs(
    limit: number,
    offset: number,
    searchItem: string[]
  ): Observable<InitialRelationDocVWPagination> {
    let uri = `${environment.urlIRDocVWList}?limit=${limit}&offset=${offset}`;
    if (searchItem.length != 0) {
      uri = `${environment.urlIRDocVWList}?limit=${limit}&offset=${offset}&searchItem=${searchItem}`;
    }
    return this.http.get<GetInitialRelationDocsVWResponse>(uri, httpOptions).pipe(
      map((response) => {
        return response.body.data;
      })
    )
  }
  getIRDoc(id: number) {
    let uri = `${environment.urlIRDocVW}/initialrdoc/${id}`
    return this.http.get<GetInitialRelationDocVWResponse>(uri, httpOptions).pipe(
      map((response) => {
        return response.body.data;
      })
    )
  }
  getDocs(id: number, analysis: string) {
    let uri = `${environment.urlIRDocVW}/${id}/${analysis}`
    return this.http.get<GetInitialRelationDocVWResponse>(uri, httpOptions).pipe(
      map((response) => {
        return response.body.data;
      })
    )
  }
}
