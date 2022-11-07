import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RateType, RateTypePagination, GetRateTypeResponse, GetRateTypesResponse } from '../../models/ratetype.model';
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
export class RateTypeService {

  constructor(private http: HttpClient) { }
  saveRateType(ratetype: RateType): Observable<RateType> {
    const uri = `${environment.urlRateType}`;
    const format_ratetype = {
      ratetype: ratetype
    };
    return this.http
      .post<GetRateTypeResponse>(uri, format_ratetype, httpOptions)
      .pipe(
        map((response) => {
          return response.body.data;
        })
      )
  }
  getRateType(
    limit: number,
    offset: number,
    searchItem: string[]
  ): Observable<RateTypePagination> {
    let uri = `${environment.urlRateTypeList}?limit=${limit}&offset=${offset}`;
    if (searchItem.length != 0) {
      uri = `${environment.urlRateTypeList}?limit=${limit}&offset=${offset}&searchItem=${searchItem}`;
    }
    return this.http.get<GetRateTypesResponse>(uri, httpOptions).pipe(
      map((response) => {
        return response.body.data;
      })
    )
  }
  updateRateType(ratetype: RateType): Observable<HttpResponse<any>> {
    const uri = `${environment.urlRateType}`;
    const format_ratetype = {
      ratetype: ratetype
    };
    return this.http.put(uri, format_ratetype, httpOptions).pipe(
      map((response) => {
        return response
      })
    )
  }
  deleteRateType(ratetype: RateType, comment: string): Observable<HttpResponse<any>> {
    const uri = `${environment.urlRateType}/${ratetype.id_ratetype}`;
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
