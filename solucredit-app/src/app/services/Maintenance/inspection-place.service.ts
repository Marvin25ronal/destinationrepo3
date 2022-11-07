import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetInspectionPlaceResponse, GetInspectionPlacesResponse, InspectionPlace, InspectionPlacePagination } from 'src/app/models/inspection-place.model';
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
export class InspectionPlaceService {

  constructor(private http: HttpClient) { }
  save(request: InspectionPlace): Observable<InspectionPlace> {
    const uri = `${environment.urlInspectionPlace}`;
    const format_disbursment = {
      inspection_place: request
    };
    return this.http
      .post<GetInspectionPlaceResponse>(uri, format_disbursment, httpOptions)
      .pipe(
        map((response) => {
          return response.body.data;
        })
      )
  }
  getList(
    limit: number,
    offset: number,
    searchItem: string[]
  ): Observable<InspectionPlacePagination> {
    let uri = `${environment.urlInspectionPlaceList}?limit=${limit}&offset=${offset}`;
    if (searchItem.length != 0) {
      uri = `${environment.urlInspectionPlaceList}?limit=${limit}&offset=${offset}&searchItem=${searchItem}`;
    }
    return this.http.get<GetInspectionPlacesResponse>(uri, httpOptions).pipe(
      map((response) => {

        return response.body.data;
      })
    )
  }
  update(request: InspectionPlace): Observable<HttpResponse<any>> {
    const uri = `${environment.urlInspectionPlace}`;
    const format_coverage = {
      inspection_place: request
    };
    console.log(format_coverage);
    return this.http.put(uri, format_coverage, httpOptions).pipe(
      map((response) => {
        return response
      })
    )
  }
  delete(coverage: InspectionPlace, comment: string): Observable<HttpResponse<any>> {
    const uri = `${environment.urlInspectionPlace}/${coverage.id_place}`;
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
