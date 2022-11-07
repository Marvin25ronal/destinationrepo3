import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Endorsement, GetEndorsementsResponse, GetEndorsementResponse, EndorsementPagination } from '../../models/endorsement.model';
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

export class EndorsementService {

  constructor(private http: HttpClient) { }
  saveEndorsement(endorsement: Endorsement): Observable<Endorsement> {
    const uri = `${environment.urlEndorsement}`;
    const format_endorsement = {
      endorsement: endorsement
    };
    return this.http
      .post<GetEndorsementResponse>(uri, format_endorsement, httpOptions)
      .pipe(
        map((response) => {
          return response.body.data;
        })
      )
  }
  getEndorsement(
    limit: number,
    offset: number,
    searchItem: string[]
  ): Observable<EndorsementPagination> {
    let uri = `${environment.urlEndorsementList}?limit=${limit}&offset=${offset}`;
    if (searchItem.length != 0) {
      uri = `${environment.urlEndorsementList}?limit=${limit}&offset=${offset}&searchItem=${searchItem}`;
    }
    return this.http.get<GetEndorsementsResponse>(uri, httpOptions).pipe(
      map((response) => {
        return response.body.data;
      })
    )
  }
  updateEndorsement(endorsement: Endorsement): Observable<HttpResponse<any>> {
    const uri = `${environment.urlEndorsement}`;
    const format_endorsement = {
      endorsement: endorsement
    };
    return this.http.put(uri, format_endorsement, httpOptions).pipe(
      map((response) => {
        return response
      })
    )
  }
  deleteEndorsement(endorsement: Endorsement, comment: string): Observable<HttpResponse<any>> {
    const uri = `${environment.urlEndorsement}/${endorsement.id_endorsement}`;
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
