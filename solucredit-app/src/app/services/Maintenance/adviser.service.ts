import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Adviser, AdviserPagination, GetAdviserArrayResponse, GetAdviserResponse, GetAdvisersResponse, } from 'src/app/models/adviser.model';
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
export class AdviserService {

  constructor(private http: HttpClient) { }
  save(request: Adviser, firm: string, user_id: number): Observable<Adviser> {
    const uri = `${environment.urlAdviser}`;
    const format_disbursment = {
      adviser: request,
      inputFirm: firm,
      user_id: user_id
    };
    return this.http
      .post<GetAdviserResponse>(uri, format_disbursment, httpOptions)
      .pipe(
        map((response) => {
          return response.body.data;
        })
      )
  }
  update(request: Adviser, firm: string, user_id: number) {
    let uri = `${environment.urlAdviser}/`
    const format = {
      adviser: request,
      inputFirm: firm,
      user_id: user_id
    }
    return this.http.put(uri, format, httpOptions).pipe(
      map((response) => {
        return response
      })
    )
  }

  getList(
    limit: number,
    offset: number,
    searchItem: string[]
  ): Observable<AdviserPagination> {
    let uri = `${environment.urlAdviserList}?limit=${limit}&offset=${offset}`;
    if (searchItem.length != 0) {
      uri = `${environment.urlAdviserList}?limit=${limit}&offset=${offset}&searchItem=${searchItem}`;
    }
    return this.http.get<GetAdvisersResponse>(uri, httpOptions).pipe(
      map((response) => {
        return response.body.data;
      })
    )
  }
  getAdviser(
    id: number,
  ) {
    let uri = `${environment.urlAdviser}/adviser/${id}`
    return this.http.get<GetAdviserResponse>(uri, httpOptions).pipe(
      map((response) => {
        return response.body.data;
      })
    )
  }
  getChilds(
    id: number,
  ) {
    let uri = `${environment.urlAdviser}/childs/${id}`
    return this.http.get<GetAdviserResponse>(uri, httpOptions).pipe(
      map((response) => {
        return response.body.data;
      })
    )
  }
  getHolders(type) {
    let uri = `${environment.urlAdviser}/holder/${type}`
    return this.http.get<GetAdviserResponse>(uri, httpOptions).pipe(
      map((response) => {
        return response.body.data;
      })
    )
  }
  exist(type, email) {
    let uri = `${environment.urlAdviser}/exist/${type}/${email}`
    return this.http.get<GetAdviserResponse>(uri, httpOptions).pipe(
      map((response) => {
        return response.body.data;
      })
    )
  }

  getImage(id) {
    let uri = `${environment.urlAdviser}/imagefirm/${id}/`
    return this.http.get<GetAdviserResponse>(uri, httpOptions).pipe(
      map((response) => {
        return response.body.data;
      })
    )
  }
  delete(coverage: Adviser, comment: string): Observable<HttpResponse<any>> {
    const uri = `${environment.urlAdviser}/${coverage.id_adviser}`;
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
  getCommercialAdviser() {
    const uri = `${environment.urlAdviser}/type/commercial`
    return this.http.get<GetAdviserArrayResponse>(uri, httpOptions).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  getLegalAdviser() {
    const uri = `${environment.urlAdviser}/type/legal`
    return this.http.get<GetAdviserArrayResponse>(uri, httpOptions).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  getFinancialAdviser() {
    const uri = `${environment.urlAdviser}/type/financial`
    return this.http.get<GetAdviserArrayResponse>(uri, httpOptions).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  getComplianceAdviser(){
    const uri = `${environment.urlAdviser}/type/complianceverification`
    return this.http.get<GetAdviserArrayResponse>(uri, httpOptions).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  getDefaultTypeAdviser(id:number){
    const uri = `${environment.urlAdviser}/default/${id}`
    return this.http.get<GetAdviserResponse>(uri, httpOptions).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
}
