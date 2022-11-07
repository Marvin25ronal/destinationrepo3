import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FiscalPeriodPagination, FiscalPeriod, GetFiscalPeriodsResponse, GetFiscalPeriodResponse } from '../../models/fiscal-period.model';
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

export class FiscalPeriodService {
  constructor(private http: HttpClient) { }
  saveFiscalPeriod(fiscalperiod: FiscalPeriod): Observable<FiscalPeriod> {
    const uri = `${environment.urlFiscalPeriod}`;
    const format_fiscalperiod = {
      fiscalperiod: fiscalperiod
    };
    return this.http
      .post<GetFiscalPeriodResponse>(uri, format_fiscalperiod , httpOptions)
      .pipe(
        map((response) => {
          return response.body.data;
        })
      )
  }
  getFiscalPeriods(
    limit: number,
    offset: number,
    searchItem: string[]
  ): Observable<FiscalPeriodPagination> {
    debugger
    let uri = `${environment.urlFiscalPeriodList}?limit=${limit}&offset=${offset}`;
    if (searchItem.length != 0) {
      uri = `${environment.urlFiscalPeriodList}?limit=${limit}&offset=${offset}&searchItem=${searchItem}`;
    }
    return this.http.get<GetFiscalPeriodsResponse>(uri, httpOptions).pipe(
      map((response) => {
        return response.body.data;
      })
    )
  }
  updateFiscalPeriods(fiscalperiod: FiscalPeriod): Observable<HttpResponse<any>> {
    const uri = `${environment.urlFiscalPeriod}`;
    const format_fiscalperiod = {
      fiscalperiod: fiscalperiod
    };
    return this.http.put(uri, format_fiscalperiod, httpOptions).pipe(
      map((response) => {
        return response
      })
    )
  }
  deleteFiscalPeriod(fiscalperiod: FiscalPeriod, comment: string): Observable<HttpResponse<any>> {
    const uri = `${environment.urlFiscalPeriod}/${fiscalperiod.fiscal_period_id}`;
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
