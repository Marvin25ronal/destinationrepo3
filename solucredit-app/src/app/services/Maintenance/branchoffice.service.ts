import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BranchOffice, BranchOfficePagination, GetBranchOfficesResponse, GetBranchOfficeResponse } from '../../models/branchoffice.model';
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
export class BranchofficeService {
  constructor(private http: HttpClient) { }
  saveBranchOffice(branchoffice: BranchOffice): Observable<BranchOffice> {
    const uri = `${environment.urlBranchOffice}`;
    const format_branchoffice = {
      branchoffice: branchoffice
    };
    return this.http
      .post<GetBranchOfficeResponse>(uri, format_branchoffice, httpOptions)
      .pipe(
        map((response) => {
          return response.body.data;
        })
      )
  }
  getBranchOffice(
    limit: number,
    offset: number,
    searchItem: string[]
  ): Observable<BranchOfficePagination> {
    let uri = `${environment.urlBranchOfficeList}?limit=${limit}&offset=${offset}`;
    if (searchItem.length != 0) {
      uri = `${environment.urlBranchOfficeList}?limit=${limit}&offset=${offset}&searchItem=${searchItem}`;
    }
    return this.http.get<GetBranchOfficesResponse>(uri, httpOptions).pipe(
      map((response) => {
        return response.body.data;
      })
    )
  }
  updateBranchOffice(branchoffice: BranchOffice): Observable<HttpResponse<any>> {
    const uri = `${environment.urlBranchOffice}`;
    const format_branchoffice = {
      branchoffice: branchoffice
    };
    return this.http.put(uri, format_branchoffice, httpOptions).pipe(
      map((response) => {
        return response
      })
    )
  }
  deleteBranchOffice(branchoffice: BranchOffice, comment: string): Observable<HttpResponse<any>> {
    const uri = `${environment.urlBranchOffice}/${branchoffice.id_branchoffice}`;
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
