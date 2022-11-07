import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Rol, GetRolsResponse, Permission, GetPermissionsResponse, GetRolResponse, RolPagination, GetRol2Response } from '../../../models/rol.model';

import { environment } from 'src/environments/environment';
import { GetUsersArrayResponse, User } from 'src/app/models/user.model';
import { GetUsersResponse } from '../../../models/user.model';
import { HTTPOPTIONS } from 'src/Utils/constants';
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
export class RolService {

  constructor(private http: HttpClient) { }

  saveRol(rol: Rol): Observable<Rol> {
    const uri = `${environment.urlRols}`;
    return this.http.post<GetRolResponse>(uri, rol, httpOptions).pipe(
      map((response) => {
        return response.body.data
      })
    );
  }


  getRol(idrol: String): Observable<Rol> {
    //console.log('getRol: '+idrol)
    const uri = `${environment.urlRols}/${idrol}`;
    return this.http.get<GetRolResponse>(uri, httpOptions).pipe(
      map((response) => {
        //console.log(response);
        return response.body.data;
      })
    );
  }
  getRols(limit: number, offset: number, searchItem: string[], searchField: string[]): Observable<RolPagination> {

    let uri = `${environment.urlRols}?limit=${limit}&offset=${offset}`;
    if (searchItem.length != 0) { for (let i = 0; i < searchItem.length; i++) { uri = uri + `&searchItem=${searchItem[i]}`; } }
    if (searchField.length != 0) { for (let i = 0; i < searchField.length; i++) { uri = uri + `&searchField=${searchField[i]}`; } }

    return this.http.get<GetRolsResponse>(uri, httpOptions).pipe(
      map((response) => {
        return response.body.data;
      })
    )
  }

  getPermissions(limit: number, offset: number): Observable<Permission[]> {
    const uri = `${environment.urlPermission}?limit=${limit}&offset=${offset}`;
    return this.http.get<GetPermissionsResponse>(uri, httpOptions).pipe(
      map((response) => {
        //console.log(response);
        return response.body.data;
      })
    )
  }

  getUsuarios(limit: number, offset: number): Observable<User[]> {
    const uri = `${environment.urlUsers}?limit=${limit}&offset=${offset}`;
    return this.http.get<GetUsersResponse>(uri, httpOptions).pipe(
      map((response) => {
        //console.log(response);
        return response.body.data.data;
      })
    )
  }

  deleteRol(idrol: string): Observable<HttpResponse<any>> {
    const uri = `${environment.urlRols}/${idrol}`;
    return this.http.delete(uri, httpOptions).pipe(
      map((response) => {
        //console.log(response);
        return response;
      })
    )
  }

  modRolInfo(idrol: string, name: string, permissions: string[]): Observable<HttpResponse<any>> {
    const uri = `${environment.urlRols}`;
    let data = {
      idrol,
      name,
      permissions
    }
    //console.log('VOY A MODIFICAR ROLES')
    return this.http.put(uri, data, httpOptions).pipe(
      map((response) => {
        //console.log(response);
        return response;
      })
    );
  };

  modRol() {

    return null;
  }
  getUserRolEmail(email: string) {
    const uri = `${environment.urlRols}/userrol/${email}`
    return this.http.get<GetRol2Response>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  getCommercialManager() {
    const uri = `${environment.urlRols}/commercialmanager`
    return this.http.get<GetUsersArrayResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  getGerencialManager() {
    const uri = `${environment.urlRols}/gerencialmanager`
    return this.http.get<GetUsersArrayResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
}
