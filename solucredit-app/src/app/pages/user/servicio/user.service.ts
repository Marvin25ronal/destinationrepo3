import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetRolsResponse } from '../../../models/rol.model'
import { User, GetUsersResponse, GetUserResponse, SaveUserResponse, UserPagination } from '../../../models/user.model';
import { environment } from 'src/environments/environment';
import { Rol } from 'src/app/models/rol.model';

import { getUserRolsResp } from '../../../interfaces/api/v1/user/index.interface';
/* @Injectable({
  providedIn: 'root'
}) */

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
export class UserService {

  constructor(private http: HttpClient) { }

  public changePassword(user_id: number, newPassword: string): Observable<HttpResponse<any>> {
    const uri = `${environment.urlUsers}/changepassword`;
    return this.http.put(uri, { user_id, newPassword }, httpOptions).pipe(
      map((response) => {
        //console.log(response);
        return response;
      })
    )
  };

  public modUserInfo(use: User): Observable<HttpResponse<any>> {
    const uri = `${environment.urlUsers}`;
    return this.http.put(uri, use, httpOptions).pipe(
      map((response) => {
        //console.log(response);
        return response;
      })
    )
  };

  public modRolsUser(user: User, roles: string[]): Observable<HttpResponse<any>> {
    const uri = `${environment.urlUsers}`;
    let datadel = {
      method: "DELROLS",
      iduser: user.user_id,
      rols: roles
    }
    return this.http.put(uri, datadel, httpOptions).pipe(
      map((response) => {
        //console.log(response);
        return response;
      })
    )

  }


  public deleteUser(idUser: number): Observable<HttpResponse<any>> {
    const uri = `${environment.urlUsers}/${idUser}`;
    return this.http.delete(uri, httpOptions).pipe(
      map((response) => {
        //console.log(response);
        return response;
      })
    )
  }
  public getUser(iduser: number): Observable<User> {
    const uri = `${environment.urlUsers}/${iduser}`;
    return this.http.get<GetUserResponse>(uri, httpOptions).pipe(
      map((response) => {
        return response.body.data;
      })
    )
  }
  public getUserByEmail(email: string): Observable<any> {
    const httpOptionsDelete = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          /* 'Access-Control-Allow-Credentials': 'true' */
        }),
      responseType: 'json' as const,
      //withCredentials: true as const,
      body: { email: email },
      observe: 'response' as const
    }
    const uri = `${environment.urlUsers}/email/${email}`
    return this.http.get(uri, httpOptionsDelete).pipe(
      map((response) => {
        return response.body;
      })
    )
  }

  public searchUser(searchFlag: string[], searchItem: string[]) {

    let queryparams = new URLSearchParams();
    searchFlag.forEach(item => queryparams.append('searchField', 'EMAIL'));
    searchItem.forEach(item => queryparams.append('searchItem', item));
    console.log(queryparams.toString())
    const uri = `${environment.urlUsers}?${queryparams.toString()}`;
    return this.http.get<GetUsersResponse>(uri, httpOptions).pipe(
      map((response) => {
        return response.body.data;
      })
    )


  }
  public getUsers(limit: number, offset: number, searchItem: string[], searchField: string[]): Observable<UserPagination> {
    let uri = `${environment.urlUsers}?limit=${limit}&offset=${offset}`;
    if (searchItem.length != 0) { for (let i = 0; i < searchItem.length; i++) { uri = uri + `&searchItem=${searchItem[i]}`; } }
    if (searchField.length != 0) { for (let i = 0; i < searchField.length; i++) { uri = uri + `&searchField=${searchField[i]}`; } }

    return this.http.get<GetUsersResponse>(uri, httpOptions).pipe(
      map((response) => {
        return response.body.data;
      })
    )
  }

  saveUser(newuser: User): Observable<User> {
    const uri = `${environment.urlUsers}`;

    return this.http.post<SaveUserResponse>(uri, newuser, httpOptions).pipe(
      map((response) => {
        return response.body.data;
      })
    )

  }

  getRols(limit: number, offset: number): Observable<Rol[]> {

    const uri = `${environment.urlRols}?limit=${limit}&offset=${offset}`;
    return this.http.get<GetRolsResponse>(uri, httpOptions).pipe(
      map((response) => {
        //console.log(response);
        return response.body.data.data;
      })
    )
  }

  getUserROls(iduser: number): Observable<Rol[]> {
    //console.log('###### EN getUserRols');
    const uri = `${environment.urlRols}?method=rolid&iduser=${iduser}`;
    return this.http.get<getUserRolsResp>(uri, httpOptions).pipe(
      map((response) => {
        //console.log(response);
        return response.body.data;
      })
    )
  }



}
