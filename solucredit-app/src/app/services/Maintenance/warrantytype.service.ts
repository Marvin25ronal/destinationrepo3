import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { GetWarrantyTypeResponse, GetWarrantyTypesResponse, WarrantyType, WarrantyTypePagination } from 'src/app/models/warrantytype.model';
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
export class WarrantytypeService {

  constructor(private http: HttpClient) { }
  saveWarranty(request: WarrantyType): Observable<WarrantyType> {
    const uri = `${environment.urlWarranty}`;
    const format_disbursment = {
      warranty_type: request
    };
    return this.http
      .post<GetWarrantyTypeResponse>(uri, format_disbursment, httpOptions)
      .pipe(
        map((response) => {
          return response.body.data;
        })
      )
  }
  getWarrantyList(
    limit: number,
    offset: number,
    searchItem: string[]
  ): Observable<WarrantyTypePagination> {
    let uri = `${environment.urlWarrantyList}?limit=${limit}&offset=${offset}`;
    if (searchItem.length != 0) {
      uri = `${environment.urlWarrantyList}?limit=${limit}&offset=${offset}&searchItem=${searchItem}`;
    }
    return this.http.get<GetWarrantyTypesResponse>(uri, httpOptions).pipe(
      map((response) => {

        return response.body.data;
      })
    )
  }
  updateRequest(request: WarrantyType): Observable<HttpResponse<any>> {
    const uri = `${environment.urlWarranty}`;
    const format_coverage = {
      warranty_type: request
    };
    return this.http.put(uri, format_coverage, httpOptions).pipe(
      map((response) => {
        return response
      })
    )
  }
  deleteRequest(coverage: WarrantyType, comment: string): Observable<HttpResponse<any>> {
    const uri = `${environment.urlWarranty}/${coverage.warranty_type_id}`;
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
