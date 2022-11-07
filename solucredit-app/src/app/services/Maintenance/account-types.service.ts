import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountType, AccountTypePagination, GetAccountTypeResponse, GetAccountTypesResponse } from 'src/app/models/account-type.mode';
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
export class AccountTypesService {

  constructor(private http: HttpClient) { }
  save(request:AccountType): Observable<AccountType> {
    const uri = `${environment.urlAccountType}`;
    const format_disbursment = {
      account_type: request
    };
    return this.http
      .post<GetAccountTypeResponse>(uri, format_disbursment, httpOptions)
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
  ): Observable<AccountTypePagination> {
    let uri = `${environment.urlAccountTypeList}?limit=${limit}&offset=${offset}`;
    if (searchItem.length != 0) {
      uri = `${environment.urlAccountTypeList}?limit=${limit}&offset=${offset}&searchItem=${searchItem}`;
    }
    return this.http.get<GetAccountTypesResponse>(uri, httpOptions).pipe(
      map((response) => {
        return response.body.data;
      })
    )
  }
  update(request: AccountType): Observable<HttpResponse<any>> {
    const uri = `${environment.urlAccountType}`;
    const format_coverage = {
      account_type: request
    };
    console.log(request)
    console.log(format_coverage);
    return this.http.put(uri, format_coverage, httpOptions).pipe(
      map((response) => {
        return response
      })
    )
  }
  delete(coverage: AccountType, comment: string): Observable<HttpResponse<any>> {
    const uri = `${environment.urlAccountType}/${coverage.id_account}`;
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
