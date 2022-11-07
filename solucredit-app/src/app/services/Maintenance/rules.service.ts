import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rules, RulesPagination, GetRuleResponse, GetRulesResponse } from '../../models/rules.model';
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
export class RulesService {

  constructor(private http: HttpClient) { }
  saveRules(rules: Rules): Observable<Rules> {
    const uri = `${environment.urlRules}`;
    const format_rules = {
      rules: rules
    };
    return this.http
      .post<GetRuleResponse>(uri, format_rules, httpOptions)
      .pipe(
        map((response) => {
          return response.body.data;
        })
      )
  }
  getRules(
    limit: number,
    offset: number,
    searchItem: string[]
  ): Observable<RulesPagination> {
    let uri = `${environment.urlRulesList}?limit=${limit}&offset=${offset}`;
    if (searchItem.length != 0) {
      uri = `${environment.urlRulesList}?limit=${limit}&offset=${offset}&searchItem=${searchItem}`;
    }
    return this.http.get<GetRulesResponse>(uri, httpOptions).pipe(
      map((response) => {
        return response.body.data;
      })
    )
  }
  updateRules(rules: Rules): Observable<HttpResponse<any>> {
    const uri = `${environment.urlRules}`;
    const format_rules = {
      rules: rules
    };
    return this.http.put(uri, format_rules, httpOptions).pipe(
      map((response) => {
        return response
      })
    )
  }
  deleteRules(rules: Rules, comment: string): Observable<HttpResponse<any>> {
    const uri = `${environment.urlRules}/${rules.id_rule}`;
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
