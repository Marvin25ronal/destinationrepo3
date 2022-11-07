import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISRPagination, ISR, GetISRResponse, GetISRsResponse } from '../../models/isr.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';


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
@Injectable({
  providedIn: 'root'
})
export class IsrService {

  constructor(private http: HttpClient) { }
  saveISR(isr: ISR): Observable<ISR>{
    debugger
    const uri = `${environment.urlISR}`;
    const format_isr = {
      isr : isr
    };
    return this.http
    .post<GetISRResponse>(uri, format_isr,httpOptions)
    .pipe(
      map((response)=> {
        return response.body.data;
      })
    )
  }
  getISRList(
    limit: number,
    offset: number,
    searchItem: string[]
  ): Observable<ISRPagination> {
    let uri = `${environment.urlISRList}?limit=${limit}&offset=${offset}`;
    if (searchItem.length != 0) {
      uri = `${environment.urlISRList}?limit=${limit}&offset=${offset}&searchItem=${searchItem}`;
    }
    return this.http.get<GetISRsResponse>(uri, httpOptions).pipe(
      map((response) => {
        return response.body.data;
      })
    )
  }
  updateISR(isr: ISR): Observable<HttpResponse<any>> {
    const uri = `${environment.urlISR}`;
    const format_isr = {
      isr: isr
    };
    return this.http.put(uri, format_isr, httpOptions).pipe(
      map((response) => {
        return response
      })
    )
  }
  deleteISR(isr: ISR, comment: string): Observable<HttpResponse<any>> {
    const uri = `${environment.urlISR}/${isr.id_isr}`;
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
  getAllISR() {
    const uri = `${environment.urlISR}`
    return this.http.get<GetISRResponse>(uri, httpOptions).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
}
