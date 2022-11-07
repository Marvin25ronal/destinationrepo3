import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UploadDocumentsCA, UploadDocumentsCAPagination, GetUDCAResponse, GetUDCASResponse, } from 'src/app/models/uploaddocumentsca.model';
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
export class UploaddocumentscaService {

  constructor(private http: HttpClient) { }
  save(request: UploadDocumentsCA, doc: string, ca_id: number): Observable<UploadDocumentsCA> {
    const uri = `${environment.urlUploadDocumentsCA}`;
    const format_updca = {
      uploaddocumentca: request,
      inputDoc: doc,
      id_commercialanalysis: ca_id
    };
    return this.http
      .post<GetUDCAResponse>(uri, format_updca, httpOptions)
      .pipe(
        map((response) => {
          return response.body.data;
        })
      )
  }
  getOneCA(id: number) {
    let uri = `${environment.urlUploadDocumentsCA}/uploaddocuments/${id}`
    return this.http.get<GetUDCASResponse>(uri, httpOptions).pipe(
      map((response) => {
        //console.log(response)
        return response.body.data;
      })
    )
  }
  getUploadDocuments(
    limit: number,
    offset: number,
    searchItem: string[]
  ): Observable<UploadDocumentsCAPagination> {
    let uri = `${environment.urlUploadDocumentsCAList}?limit=${limit}&offset=${offset}`;
    if (searchItem.length != 0) {
      uri = `${environment.urlUploadDocumentsCAList}?limit=${limit}&offset=${offset}&searchItem=${searchItem}`;
    }
    return this.http.get<GetUDCASResponse>(uri, httpOptions).pipe(
      map((response) => {
        //console.log(response)
        return response.body.data;
      })
    )
  }
  delete(coverage: UploadDocumentsCA, comment: string): Observable<HttpResponse<any>> {
    const uri = `${environment.urlUploadDocumentsCA}/${coverage.id_uploaddocsca}`;
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
  uploadDocsCA(data): Observable<any> {
    //
    const uri = `${environment.urlUploadInform}`;
    return this.http.post(uri, data).pipe(
      map((response) => {
        return response
      })
    )
  }
  getCheck(id: number, typedoc: number) {
    //
    let uri = `${environment.urlUploadInformCheck}/informec?id=${id}&typedoc=${typedoc}`
    return this.http.get<GetUDCAResponse>(uri, httpOptions).pipe(
      map((response) => {
        console.log(response)
        return response.body.data;
      })
    )
  }
  updateInform(data): Observable<any> {
    //
    const uri = `${environment.urlUpdateInform}`;
    return this.http.post(uri, data).pipe(
      map((response) => {
        return response
      })
    )
  }
}
