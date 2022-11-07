import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RequirementDocVWPagination, GetRequirementDocVWResponse, GetRequirementDocVWSResponse} from 'src/app/models/requirementdocvw.model';
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
export class RequirementdocvwService {

  constructor(private http: HttpClient) { }
  getReqDocs(
    limit: number,
    offset: number,
    searchItem: string[]
  ): Observable<RequirementDocVWPagination> {
    let uri = `${environment.urlRequirementDocVWList}?limit=${limit}&offset=${offset}`;
    if (searchItem.length != 0) {
      uri = `${environment.urlRequirementDocVWList}?limit=${limit}&offset=${offset}&searchItem=${searchItem}`;
    }
    return this.http.get<GetRequirementDocVWSResponse>(uri, httpOptions).pipe(
      map((response) => {
        //console.log(response)
        return response.body.data;
      })
    )
  }
  getReqDoc(id: number) {
    let uri = `${environment.urlRequirementDocVW}/requirementdoc/${id}`
    return this.http.get<GetRequirementDocVWResponse>(uri, httpOptions).pipe(
      map((response) => {
        //console.log(response)
        return response.body.data;
      })
    )
  }
  getDocs(id: number) {
    let uri = `${environment.urlRequirementDocVW}/${id}`
    return this.http.get<GetRequirementDocVWResponse>(uri, httpOptions).pipe(
      map((response) => {
        //console.log(response)
        return response.body.data;
      })
    )
  }
}
