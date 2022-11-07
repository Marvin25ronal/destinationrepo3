import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { GetWF_DocumentResponse } from '../models/wf_document.model';
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
export class RolviewService {

  constructor(private http: HttpClient) { }
  getRols(limit: number, offset: number, searchItem: string[]) {
    let uri = `${environment.urlRolView}?limit=${limit}&offset=${offset}`
    if (searchItem.length != 0) { for (let i = 0; i < searchItem.length; i++) { uri = uri + `&searchItem=${searchItem[i]}`; } }
    return this.http.get<any>(uri, httpOptions).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  getCountRols(id: number) {
    let uri = `${environment.urlRolView}/${id}`
    return this.http.get<any>(uri, httpOptions).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  getCountViews(id: number) {
    let uri = `${environment.urlRolView}/view/${id}`
    return this.http.get<any>(uri, httpOptions).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  getAllViews() {
    let uri = `${environment.urlRolView}/allviews`
    return this.http.get<any>(uri, httpOptions).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  getShowViews(activity_id: number) {
    let uri = `${environment.urlRolView}/getShowViews/${activity_id}`
    return this.http.get<any>(uri, httpOptions).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  getRolForViews(activity_id: number, view_id: number) {
    let uri = `${environment.urlRolView}/rolview/${activity_id}/${view_id}`
    return this.http.get<any>(uri, httpOptions).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  saveRols(rols: any, activity_id: number) {
    let uri = `${environment.urlRolView}/saverols`
    let format = {
      rols,
      activity_id
    }
    return this.http.post<any>(uri, format, httpOptions).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  changeDefault(activity_id,view_id, value: number) {
    let uri = `${environment.urlRolView}/changedefault`
    let format = {
      activity_id,
      view_id,
      value
    }
    return this.http.put<any>(uri,format,httpOptions)
  }
}
