import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rate, RatePagination, GetRateResponse, GetRatesResponse } from '../../models/rate.model';
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

export class RateService {

  constructor(private http: HttpClient) { }
  saveRate(rate: Rate): Observable<Rate> {
    const uri = `${environment.urlRate}`;
    const format_rate = {
      rate: rate
    };
    return this.http
      .post<GetRateResponse>(uri, format_rate, httpOptions)
      .pipe(
        map((response) => {
          return response.body.data;
        })
      )
  }
  getRates(
    limit: number,
    offset: number,
    searchItem: string[]
  ): Observable<RatePagination> {
    let uri = `${environment.urlRateList}?limit=${limit}&offset=${offset}`;
    if (searchItem.length != 0) {
      uri = `${environment.urlRateList}?limit=${limit}&offset=${offset}&searchItem=${searchItem}`;
    }
    return this.http.get<GetRatesResponse>(uri, httpOptions).pipe(
      map((response) => {
        return response.body.data;
      })
    )
  }
  updateRates(rate : Rate): Observable<HttpResponse<any>> {
    const uri = `${environment.urlRate}`;
    const format_rate = {
      rate: rate
    };
    return this.http.put(uri, format_rate, httpOptions).pipe(
      map((response) => {
        return response
      })
    )
  }
  deleteRates(rates: Rate, comment: string): Observable<HttpResponse<any>> {
    const uri = `${environment.urlRate}/${rates.id_rates}`;
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
