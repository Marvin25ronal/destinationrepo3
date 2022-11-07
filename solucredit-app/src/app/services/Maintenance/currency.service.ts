import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Currency, CurrencyPagination, GetCurrencyResponse, GetCurrencysResponse } from '../../models/currency.model';
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
export class CurrencyService {

  constructor(private http: HttpClient) { }
  saveCurrency(currency: Currency): Observable<Currency>{
    const uri = `${environment.urlCurrency}`;
    const format_currency = {
      currency : currency
    };
    return this.http
    .post<GetCurrencyResponse>(uri, format_currency,httpOptions)
    .pipe(
      map((response)=> {
        return response.body.data;
      })
    )
  }
  getCurrency(
    limit: number,
    offset: number,
    searchItem: string[]
  ): Observable<CurrencyPagination> {
    let uri = `${environment.urlCurrencyList}?limit=${limit}&offset=${offset}`;
    if (searchItem.length != 0) {
      uri = `${environment.urlCurrencyList}?limit=${limit}&offset=${offset}&searchItem=${searchItem}`;
    }
    return this.http.get<GetCurrencysResponse>(uri, httpOptions).pipe(
      map((response) => {
        return response.body.data;
      })
    )
  }
  updateCurrency(currency: Currency): Observable<HttpResponse<any>> {
    const uri = `${environment.urlCurrency}`;
    const format_currency = {
      currency: currency
    };
    return this.http.put(uri, format_currency, httpOptions).pipe(
      map((response) => {
        return response
      })
    )
  }
  deleteCurrency(currency: Currency, comment: string): Observable<HttpResponse<any>> {
    const uri = `${environment.urlCurrency}/${currency.id_currency}`;
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
