import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IVA } from 'src/app/models/isr.model';
import { environment } from 'src/environments/environment';
const httpOptions =
{
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
export class SysivaService {

  constructor(private http: HttpClient) { }
  getList(
    limit: number,
    offset: number,
    searchItem: string[]
  ) {
    let uri = `${environment.urlsysiva}?limit=${limit}&offset=${offset}`;
    if (searchItem.length != 0) {
      uri = `${environment.urlsysiva}?limit=${limit}&offset=${offset}&searchItem=${searchItem}`;
    }
    return this.http.get<any>(uri, httpOptions).pipe(
      map((response) => {
        return response.body.data;
      })
    )
  }
  save(isr: IVA) {
    const uri = `${environment.urlsysiva}`;
    const format_isr = {
      iva: isr
    };
    return this.http
      .post<any>(uri, format_isr, httpOptions)
      .pipe(
        map((response) => {
          return response.body.data;
        })
      )
  }
  update(isr: IVA): Observable<HttpResponse<any>> {
    const uri = `${environment.urlsysiva}`;
    const format_isr = {
      iva: isr
    };
    return this.http.put(uri, format_isr, httpOptions).pipe(
      map((response) => {
        return response
      })
    )
  }
  deleteISR(isr: IVA, comment: string): Observable<HttpResponse<any>> {
    const uri = `${environment.urlsysiva}/${isr.id}`;
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
