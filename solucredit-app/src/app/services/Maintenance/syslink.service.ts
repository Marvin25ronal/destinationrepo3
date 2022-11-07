import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetSysLinkResponse, SysLink, SysLinkPagination } from 'src/app/models/syslink.model';
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
export class SyslinkService {

  constructor(
    private http: HttpClient
  ) { }
  list(
    limit: number,
    offset: number,
    searchItem: string[]
  ): Observable<SysLinkPagination> {
    let uri = `${environment.urlSysLinks}/list?limit=${limit}&offset=${offset}`;
    if (searchItem.length != 0) {
      uri = `${environment.urlSysLinks}/list?limit=${limit}&offset=${offset}&searchItem=${searchItem}`;
    }
    return this.http.get<GetSysLinkResponse>(uri, httpOptions).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  update(value: SysLink): Observable<HttpResponse<any>> {
    const uri = `${environment.urlSysLinks}`
    const format = {
      data: value
    }
    return this.http.put(uri, format, httpOptions).pipe(
      map((response) => {
        return response
      })
    )
  }
}
