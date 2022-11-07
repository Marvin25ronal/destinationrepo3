import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RuleType, GetRuleTypeResponse, GetRuleTypesResponse, RuleTypePagination } from '../../models/ruletype';
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
export class RuleTypeService {

  constructor(private http: HttpClient) { }
  saveRuleType(ruletype: RuleType): Observable<RuleType> {
    const uri = `${environment.urlRuleType}`;
    const format_ruletype = {
      ruletype: ruletype
    };
    return this.http
      .post<GetRuleTypeResponse>(uri, format_ruletype, httpOptions)
      .pipe(
        map((response) => {
          return response.body.data;
        })
      )
  }
  getRuleTypes(
    limit: number,
    offset: number,
    searchItem: string[]
  ): Observable<RuleTypePagination> {
    let uri = `${environment.urlRuleTypeList}?limit=${limit}&offset=${offset}`;
    if (searchItem.length != 0) {
      uri = `${environment.urlRuleTypeList}?limit=${limit}&offset=${offset}&searchItem=${searchItem}`;
    }
    return this.http.get<GetRuleTypesResponse>(uri, httpOptions).pipe(
      map((response) => {
        return response.body.data;
      })
    )
  }
  updateRuleType(ruletype: RuleType): Observable<HttpResponse<any>> {
    const uri = `${environment.urlRuleType}`;
    const format_ruletype = {
      ruletype: ruletype
    };
    return this.http.put(uri, format_ruletype, httpOptions).pipe(
      map((response) => {
        return response
      })
    )
  }
  deleteRuleType(ruletype: RuleType, comment: string): Observable<HttpResponse<any>> {
    const uri = `${environment.urlRuleType}/${ruletype.id_ruletype}`;
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
