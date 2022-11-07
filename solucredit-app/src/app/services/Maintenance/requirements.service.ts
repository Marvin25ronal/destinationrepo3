import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Requirements, RequirementsPagination, GetRequirementResponse, GetRequirementsResponse } from '../../models/requirements.model';
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
export class RequirementsService {

  constructor(private http: HttpClient) { }
  saveRequirements(requirements: Requirements): Observable<Requirements> {
    const uri = `${environment.urlRequirements}`;
    const format_requirements = {
      requirements: requirements
    };
    return this.http
      .post<GetRequirementResponse>(uri, format_requirements, httpOptions)
      .pipe(
        map((response) => {
          return response.body.data;
        })
      )
  }

  getRequirements(
    limit: number,
    offset: number,
    searchItem: string[]
  ): Observable<RequirementsPagination> {
    let uri = `${environment.urlRequirementsList}?limit=${limit}&offset=${offset}`;
    if (searchItem.length != 0) {
      uri = `${environment.urlRequirementsList}?limit=${limit}&offset=${offset}&searchItem=${searchItem}`;
    }
    return this.http.get<GetRequirementsResponse>(uri, httpOptions).pipe(
      map((response) => {
        return response.body.data;
      })
    )
  }
  updateRequirements(requirements: Requirements): Observable<HttpResponse<any>> {
    const uri = `${environment.urlRequirements}`;
    const format_requirements = {
      requirements: requirements
    };
    return this.http.put(uri, format_requirements, httpOptions).pipe(
      map((response) => {
        return response
      })
    )
  }
  deleteRequirements(requirements: Requirements, comment: string): Observable<HttpResponse<any>> {
    const uri = `${environment.urlDisbursement}/${requirements.id_requirements}`;
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

