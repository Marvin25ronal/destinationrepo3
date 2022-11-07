import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetAditionalRevResponse, GetAditionalRevsResponse, AditionalRev, AditionalRevPagination } from '../../models/aditionalrev.model';
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
export class AditionalrevService {

  constructor(private http: HttpClient) { }
  saveAditionalRev(aditionalrev: AditionalRev): Observable<AditionalRev> {
    debugger
    const uri = `${environment.urlAdRev}`;
    const format_adrev = {
      aditionalrev: aditionalrev
    };
    console.log(format_adrev)
    return this.http
      .post<GetAditionalRevResponse>(uri, format_adrev, httpOptions)
      .pipe(
        map((response) => {
          console.log(response)
          return response.body.data;
        })
      )
  }
  getAditionalRev(
    limit: number,
    offset: number,
    searchItem: string[]
  ): Observable<AditionalRevPagination> {
    let uri = `${environment.urlAdRevList}?limit=${limit}&offset=${offset}`;
    if (searchItem.length != 0) {
      uri = `${environment.urlAdRevList}?limit=${limit}&offset=${offset}&searchItem=${searchItem}`;
    }
    return this.http.get<GetAditionalRevsResponse>(uri, httpOptions).pipe(
      map((response) => {
        return response.body.data;
      })
    )
  }
  updateAditionalRev(aditionalrev: AditionalRev): Observable<HttpResponse<any>> {
    const uri = `${environment.urlAdRev}`;
    const format_adrev = {
      adrev: aditionalrev
    };
    return this.http.put(uri, format_adrev, httpOptions).pipe(
      map((response) => {
        return response
      })
    )
  }
  deleteAditionalRev(aditionalrev: AditionalRev, comment: string): Observable<HttpResponse<any>> {
    const uri = `${environment.urlAdRev}/${aditionalrev.id_aditionalrev}`;
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
