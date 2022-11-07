import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DocWarranty, DocWarrantyPagination, GetDocWarrantyResponse, GetDocWarrantysResponse } from 'src/app/models/docwarranty.model';
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
export class DocWarrantyService {
  constructor(private http: HttpClient) { }
  save(request: DocWarranty): Observable<DocWarranty> {
    const uri = `${environment.urlDocWarranty}`;
    const format_disbursment = {
      doc_warranty: request
    };
    return this.http
      .post<GetDocWarrantyResponse>(uri, format_disbursment, httpOptions)
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
  ): Observable<DocWarrantyPagination> {
    let uri = `${environment.urlDocWarrantyList}?limit=${limit}&offset=${offset}`;
    if (searchItem.length != 0) {
      uri = `${environment.urlDocWarrantyList}?limit=${limit}&offset=${offset}&searchItem=${searchItem}`;
    }
    return this.http.get<GetDocWarrantysResponse>(uri, httpOptions).pipe(
      map((response) => {

        return response.body.data;
      })
    )
  }
  update(request: DocWarranty): Observable<HttpResponse<any>> {
    const uri = `${environment.urlDocWarranty}`;
    const format_coverage = {
      doc_warranty: request
    };
    console.log(format_coverage);
    return this.http.put(uri, format_coverage, httpOptions).pipe(
      map((response) => {
        return response
      })
    )
  }
  delete(coverage: DocWarranty, comment: string): Observable<HttpResponse<any>> {
    const uri = `${environment.urlDocWarranty}/${coverage.id_doc_warranty}`;
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
