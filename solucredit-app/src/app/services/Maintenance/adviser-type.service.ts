import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AdviserType, AdviserTypePagination, GetAdviserTypeResponse, GetAdviserTypesResponse } from 'src/app/models/adviser-type.model';
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
export class AdviserTypeService {

  constructor(private http: HttpClient) { }
  save(request:AdviserType): Observable<AdviserType> {
    const uri = `${environment.urlAdviserType}`;
    const format_disbursment = {
      adviser_type: request
    };
    return this.http
      .post<GetAdviserTypeResponse>(uri, format_disbursment, httpOptions)
      .pipe(
        map((response) => {
          return response.body.data;
        })
      )
  }
  getList(
    limit: number,
    offset: number,
    searchItem: string[]
  ):Observable<AdviserTypePagination>{
    let uri = `${environment.urlAdviserTypeList}?limit=${limit}&offset=${offset}`;
    if (searchItem.length != 0) {
      uri = `${environment.urlAdviserTypeList}?limit=${limit}&offset=${offset}&searchItem=${searchItem}`;
    }
    return this.http.get<GetAdviserTypesResponse>(uri, httpOptions).pipe(
      map((response) => {
        return response.body.data;
      })
    )
  }
  update(request: AdviserType): Observable<HttpResponse<any>> {
    const uri = `${environment.urlAdviserType}`;
    const format_coverage = {
      adviser_type: request
    };
    console.log(request)
    console.log(format_coverage);
    return this.http.put(uri, format_coverage, httpOptions).pipe(
      map((response) => {
        return response
      })
    )
  }
  delete(coverage: AdviserType, comment: string): Observable<HttpResponse<any>> {
    const uri = `${environment.urlAdviserType}/${coverage.id_adviser_type}`;
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
