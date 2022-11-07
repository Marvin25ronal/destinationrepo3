import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CouncilMember, CouncilMemberPagination, GetCouncilMembersResponse, GetCouncilMemberResponse } from '../../models/councilmember.model';
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
export class CouncilmembersService {

  constructor(private http: HttpClient) { }
  saveCouncilMembers(councilmember: CouncilMember): Observable<CouncilMember> {
    const uri = `${environment.urlCouncilMember}`;
    const format_councilmember = {
      councilmember: councilmember
    };
    return this.http
      .post<GetCouncilMemberResponse>(uri, format_councilmember , httpOptions)
      .pipe(
        map((response) => {
          return response.body.data;
        })
      )
  }
  getCouncilMembers(
    limit: number,
    offset: number,
    searchItem: string[]
  ): Observable<CouncilMemberPagination> {
    debugger
    let uri = `${environment.urlCouncilMemberList}?limit=${limit}&offset=${offset}`;
    if (searchItem.length != 0) {
      uri = `${environment.urlCouncilMemberList}?limit=${limit}&offset=${offset}&searchItem=${searchItem}`;
    }
    return this.http.get<GetCouncilMembersResponse>(uri, httpOptions).pipe(
      map((response) => {
        console.log(response)
        return response.body.data;
      })
    )
  }
  updateCouncilMembers(councilmember: CouncilMember): Observable<HttpResponse<any>> {
    debugger
    const uri = `${environment.urlCouncilMember}`;
    const format_councilmember = {
      councilmember: councilmember
    };
    return this.http.put(uri, format_councilmember, httpOptions).pipe(
      map((response) => {
        return response
      })
    )
  }
  deleteCouncilMembers(councilmember: CouncilMember, comment: string): Observable<HttpResponse<any>> {
    const uri = `${environment.urlCouncilMember}/${councilmember.council_memeber_id}`;
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
