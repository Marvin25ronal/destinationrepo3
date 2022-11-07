import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FmRolSharedFolder, FmUserSharedFolder, Folder, GetFmRolSharedFolder, GetFMSharedFolders, GetFolderResponse, GetFoldersResponse, GetNumberOfDocuments, GetSharedPermissions } from 'src/app/models/file-manager.model';
import { environment } from 'src/environments/environment';
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
export class FolderService {

  constructor(private http: HttpClient) { }
  save(folder: Folder, user_email: string): Observable<Folder> {
    const uri = `${environment.urlFileManager}/folder`;
    const format = {
      folder: folder,
      user_email: user_email,
    };
    return this.http
      .post<GetFolderResponse>(uri, format, httpOptions)
      .pipe(
        map((response) => {
          return response.body.data;
        })
      )
  }
  isSharedFolder(folder_id: number) {
    const uri = `${environment.urlFileManager}/compartido?folder_id=${folder_id}`;
    return this.http
      .get<any>(uri, httpOptions)
      .pipe(
        map((response) => {
          console.log(response.body.data)
          return response.body.data
        })
      )
  }
  sharedFolderByRol(sharedfolderrol: FmRolSharedFolder) {
    const uri = `${environment.urlFileManager}/folder/share/rol`;
    const format = {
      share: sharedfolderrol
    }
    return this.http.post<GetFmRolSharedFolder>(uri, format, httpOptions)
      .pipe(
        map((response) => {
          return response.body.data
        })
      )
  }
  sharedFolderByUser(sharedfolderrol: FmUserSharedFolder) {
    const uri = `${environment.urlFileManager}/folder/share/user`;
    const format = {
      share: sharedfolderrol
    }
    return this.http.post<GetFmRolSharedFolder>(uri, format, httpOptions)
      .pipe(
        map((response) => {
          return response.body.data
        })
      )
  }
  list(user_email: string): Observable<Folder[]> {
    const uri = `${environment.urlFileManager}/folder/${user_email}`;
    return this.http
      .get<GetFoldersResponse>(uri, httpOptions)
      .pipe(
        map((response) => {
          console.log(response)
          return response.body.data
        })
      )
  }
  rename(
    name: string,
    folder_id: number
  ) {
    const format = {
      name: name,
      folder_id: folder_id
    }
    const uri = `${environment.urlFileManager}/folder`
    return this.http.put<GetFolderResponse>(uri, format, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  exist(
    name: string,
    folder_id: number | null,
    email: string

  ) {
    const uri = `${environment.urlFileManager}/folder-name?email=${email}&name=${name}&folder_id=${folder_id}`
    return this.http.get<any>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  getSharedFolders(user_email: string) {
    const uri = `${environment.urlFileManager}/folder/shared-list/${user_email}`;
    return this.http.get<GetFMSharedFolders>(uri, httpOptions)
      .pipe(
        map((response) => {
          console.log(response)
          return response.body.data
        })
      )
  }
  deleteFolder(id_folder: number) {
    const uri = `${environment.urlFileManager}/folder/${id_folder}`;
    return this.http.delete(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response
      })
    )
  }
  countFiles(id_folder: number) {
    const uri = `${environment.urlFileManager}/folder/countfiles/${id_folder}`;
    return this.http.get<GetNumberOfDocuments>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  canCreateFolderSharedFolder(id_folder: number, email: string) {
    const uri = `${environment.urlFileManager}/folder/permission/createfolder?folder_id=${id_folder}&email=${email}`;
    return this.http.get<any>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        console.log(response)
        return response.body.data
      })
    )
  }
  canDeleteFolderSharedFolder(id_folder: number, email: string) {
    const uri = `${environment.urlFileManager}/folder/permission/deletefolder?folder_id=${id_folder}&email=${email}`;
    return this.http.get<any>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        console.log(response)
        return response.body.data
      })
    )
  }
  getAllPermissions(id_folder: number) {
    const uri = `${environment.urlFileManager}/permissions/folder/${id_folder}`;
    return this.http.get<any>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        console.log(response)
        return response.body.data
      })
    )
  }
  uptdateRolPermission(
    id: number,
    expiration: Date,
    rule: string
  ) {
    const uri = `${environment.urlFileManager}/permissions/folder/rol/`;
    const format = {
      id: id,
      expiration: expiration,
      rule: rule
    }
    console.log(expiration)
    return this.http.put<any>(uri, format, HTTPOPTIONS).pipe(
      map((response) => {
        console.log(response)
        return response
      })
    )

  }
  uptdateUserPermission(
    id: number,
    expiration: Date,
    rule: string
  ) {
    const uri = `${environment.urlFileManager}/permissions/folder/user/`;
    const format = {
      id: id,
      expiration: expiration,
      rule: rule
    }
    console.log(expiration)
    return this.http.put<any>(uri, format, HTTPOPTIONS).pipe(
      map((response) => {
        console.log(response)
        return response
      })
    )
  }
  deleteRolPermission(
    id: number
  ) {
    const uri = `${environment.urlFileManager}/permissions/folder/rol/${id}`;
    return this.http.delete<any>(uri, httpOptions).pipe(
      map((response) => {
        console.log(response)
        return response
      })
    )
  }
  deleteUserPermission(
    id: number
  ) {
    const uri = `${environment.urlFileManager}/permissions/folder/user/${id}`;
    return this.http.delete<any>(uri, httpOptions).pipe(
      map((response) => {
        console.log(response)
        return response
      })
    )
  }



}
