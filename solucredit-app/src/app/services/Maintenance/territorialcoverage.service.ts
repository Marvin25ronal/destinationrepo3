import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetTerritorialCoverageResponse, GetTerritorialCoveragesResponse, TerritorialCoverage, TerritorialCoveragePagination } from '../../models/territorialcoverage.model';
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


export class TerritorialcoverageService {
  constructor(private http: HttpClient) { }
  saveCoverage(coverage: TerritorialCoverage): Observable<TerritorialCoverage> {
    const uri = `${environment.urlTerritorialCoverage}`;
    const format_disbursment = {
      territorial_coverage: coverage
    };
    return this.http
      .post<GetTerritorialCoverageResponse>(uri, format_disbursment, httpOptions)
      .pipe(
        map((response) => {
          return response.body.data;
        })
      )
  }
  getCoverage(
    limit: number,
    offset: number,
    searchItem: string[]
  ): Observable<TerritorialCoveragePagination> {
    let uri = `${environment.urlTerritorialCoverageList}?limit=${limit}&offset=${offset}`;
    if (searchItem.length != 0) {
      uri = `${environment.urlTerritorialCoverageList}?limit=${limit}&offset=${offset}&searchItem=${searchItem}`;
    }
    return this.http.get<GetTerritorialCoveragesResponse>(uri, httpOptions).pipe(
      map((response) => {
       
        return response.body.data;
      })
    )
  }
  updateCoverage(coverage: TerritorialCoverage): Observable<HttpResponse<any>> {
    const uri = `${environment.urlTerritorialCoverage}`;
    const format_coverage = {
      territorial_coverage: coverage
    };
    return this.http.put(uri, format_coverage, httpOptions).pipe(
      map((response) => {
        return response
      })
    )
  }
  deleteCoverage(coverage: TerritorialCoverage, comment: string): Observable<HttpResponse<any>> {
    const uri = `${environment.urlTerritorialCoverage}/${coverage.id_territorial_coverage}`;
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
