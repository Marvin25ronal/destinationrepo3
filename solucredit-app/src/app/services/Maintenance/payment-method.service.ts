import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetPaymentMethodResponse, GetPaymentMethodsArrayResponse, GetPaymentMethodsResponse, PaymentMethod, PaymentMethodPagination } from 'src/app/models/paymentMethod.model';
import { environment } from 'src/environments/environment';
import { HTTPOPTIONS } from 'src/Utils/constants';
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
export class PaymentMethodService {

  constructor(private http: HttpClient) { }

  save(request: PaymentMethod): Observable<PaymentMethod> {
    const uri = `${environment.urlPaymentMethod}`;
    const format_disbursment = {
      payment_method: request
    };
    return this.http
      .post<GetPaymentMethodResponse>(uri, format_disbursment, httpOptions)
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
  ): Observable<PaymentMethodPagination> {
    let uri = `${environment.urlPaymentMethodList}?limit=${limit}&offset=${offset}`;
    if (searchItem.length != 0) {
      uri = `${environment.urlPaymentMethodList}?limit=${limit}&offset=${offset}&searchItem=${searchItem}`;
    }
    return this.http.get<GetPaymentMethodsResponse>(uri, httpOptions).pipe(
      map((response) => {
        return response.body.data;
      })
    )
  }
  update(request: PaymentMethod): Observable<HttpResponse<any>> {
    const uri = `${environment.urlPaymentMethod}`;
    const format_coverage = {
      payment_method: request
    };
    console.log(request)
    console.log(format_coverage);
    return this.http.put(uri, format_coverage, httpOptions).pipe(
      map((response) => {
        return response
      })
    )
  }
  delete(coverage: PaymentMethod, comment: string): Observable<HttpResponse<any>> {
    const uri = `${environment.urlPaymentMethod}/${coverage.id_payment}`;
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
  getAll() {
    const uri = `${environment.urlPaymentMethod}/all`;
    return this.http.get<GetPaymentMethodsArrayResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
}
