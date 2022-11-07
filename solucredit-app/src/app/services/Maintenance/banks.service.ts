import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Banks, BanksPagination, GetBankResponse, GetBanksResponse } from '../../models/bank.model';
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

export class BanksService {

  constructor(private http: HttpClient) { }
  saveBanks(banks: Banks): Observable<Banks> {
    const uri = `${environment.urlBanks}`;
    const format_banks = {
      banks: banks
    };
    return this.http
      .post<GetBankResponse>(uri, format_banks, httpOptions)
      .pipe(
        map((response) => {
          return response.body.data;
        })
      )
  }
  getBanks(
    limit: number,
    offset: number,
    searchItem: string[]
  ): Observable<BanksPagination> {
    let uri = `${environment.urlBanksList}?limit=${limit}&offset=${offset}`;
    if (searchItem.length != 0) {
      uri = `${environment.urlBanksList}?limit=${limit}&offset=${offset}&searchItem=${searchItem}`;
    }
    return this.http.get<GetBanksResponse>(uri, httpOptions).pipe(
      map((response) => {
        return response.body.data;
      })
    )
  }
  updateBanks(banks: Banks): Observable<HttpResponse<any>> {
    const uri = `${environment.urlBanks}`;
    const format_banks = {
      banks: banks
    };
    return this.http.put(uri, format_banks, httpOptions).pipe(
      map((response) => {
        return response
      })
    )
  }
  deleteBanks(banks: Banks, comment: string): Observable<HttpResponse<any>> {
    const uri = `${environment.urlBanks}/${banks.id_banks}`;
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
