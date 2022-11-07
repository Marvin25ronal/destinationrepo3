import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnalysisCheck, getAnalysisCheck } from '../../models/analysis-check.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { HTTPOPTIONS } from 'src/Utils/constants';

export interface GetAnalysisCheckResponse{
  success: boolean,
  data: AnalysisCheck[]
}

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
export class AnalysisCheckService {

  constructor(private http: HttpClient) { }
  getCheckAnalysis(id: number) {
    const uri = `${environment.urlAnalysisCheck}/${id}`
    return this.http.get<GetAnalysisCheckResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        console.log(response)
        return response.body.data
      })
    )
  }
  createCheck(analysis: AnalysisCheck): Observable<AnalysisCheck> {
    const uri = `${environment.urlAnalysisCheck}/create`;
    const format_ca = {
      analysis: analysis
    };
    return this.http
      .post<getAnalysisCheck>(uri, format_ca, httpOptions)
      .pipe(
        map((response) => {
          return response.body.data;
        })
      )
  }
  update(analysis: AnalysisCheck): Observable<AnalysisCheck> {
    const uri = `${environment.urlAnalysisCheck}/update`;
    const format_ca = {
      analysis: analysis
    };
    return this.http
      .post<getAnalysisCheck>(uri, format_ca, httpOptions)
      .pipe(
        map((response) => {
          return response.body.data;
        })
      )
  }
}
