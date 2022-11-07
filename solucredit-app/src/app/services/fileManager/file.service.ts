import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Document, DocumentsPagination, FmRolSharedDocument, FmUserSharedDocument, GetDocumentResponse, GetDocumentsResponse, GetFmRolSharedDocument, GetNumberOfDocuments } from 'src/app/models/file-manager.model';
import { environment } from 'src/environments/environment';
import { HTTPOPTIONS } from 'src/Utils/constants';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }
  save(file: any, email: string, folder_id): Observable<Document> {
    const uri = `${environment.urlFileManager}/file`;
    const format = {
      files: file,
      email,
      folder_id
    }
    return this.http
      .post<GetDocumentResponse>(uri, format, HTTPOPTIONS)
      .pipe(
        map((response) => {
          console.log(response)
          return response.body.data
        })
      )
  }
  list(
    limit: number,
    offset: number,
    searchItem: string[],
    folder_id: number
  ): Observable<DocumentsPagination> {
    const uri = `${environment.urlFileManager}/file-list?limit=${limit}&offset=${offset}&folder_id=${folder_id}`;
    if (searchItem.length != 0) {

    }
    return this.http.get<GetDocumentsResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data;
      })
    )
  }

  show(
    document_id: number
  ): Observable<any> {
    const uri = `${environment.urlFileManager}/file/${document_id}`;
    return this.http.get<any>(uri, HTTPOPTIONS)
  }
  fileinFolder(
    folder_id: number,
    name: string,
  ): Observable<any> {
    const uri = `${environment.urlFileManager}/file-name?folder_id=${folder_id}&name=${name}`;
    return this.http.get<any>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data;
      })
    )
  }
  renameFile(
    name: string,
    document_id: number
  ) {
    const format = {
      name: name,
      document_id: document_id
    }
    const uri = `${environment.urlFileManager}/file/rename`;
    return this.http.put<GetDocumentResponse>(uri, format, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  download(id_document: number, name: string) {
    const uri = `${environment.urlFileManager}/file/download/${id_document}`
    this.http.get(uri, { responseType: "blob" as "json" })
      .subscribe((response: any) => {
        console.log(response)
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement("a");
        downloadLink.href = window.URL.createObjectURL(
          new Blob(binaryData, { type: dataType })
        );
        downloadLink.setAttribute("download", name);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      })
  }
  delete(
    id_document: number
  ) {
    const uri = `${environment.urlFileManager}/file/${id_document}`
    return this.http.delete(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response
      })
    )
  }
  sharedDocumentByFatherPermission(folder_id: number, document_id: number) {
    const uri = `${environment.urlFileManager}/file/permissionfatherfolder`;
    const format = {
      document_id: document_id,
      folder_id: folder_id
    }
    return this.http.post<GetNumberOfDocuments>(uri, format, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  getDocumentsShared(
    limit: number,
    offset: number,
    email: string,
    folder_id: number
  ) {
    const uri = `${environment.urlFileManager}/file-list?limit=${limit}&offset=${offset}&folder_id=${folder_id}&email=${email}`;
    return this.http.get<GetDocumentsResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data;
      })
    )
  }
  listSharedFolders(limit: number,
    offset: number,
    email: string) {
    const uri = `${environment.urlFileManager}/sharedfiles?limit=${limit}&offset=${offset}&email=${email}`;
    return this.http.get<GetDocumentsResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data;
      })
    )
  }
  canSeeDocument(id_folder: number, email: string) {
    const uri = `${environment.urlFileManager}/file/permission/seedocument?document_id=${id_folder}&email=${email}`;
    return this.http.get<any>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        console.log(response)
        return response.body.data
      })
    )
  }
  canDeleteDocument(id_folder: number, email: string) {
    const uri = `${environment.urlFileManager}/file/permission/deletedocument?document_id=${id_folder}&email=${email}`;
    return this.http.get<any>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        console.log(response)
        return response.body.data
      })
    )
  }
  canDownloadDocument(id_document: number, email: string) {
    const uri = `${environment.urlFileManager}/file/permission/seedocument?document_id=${id_document}&email=${email}`;
    return this.http.get<any>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        console.log(response)
        return response.body.data
      })
    )
  }
  canShareDocument(id_document: number, email: string) {
    const uri = `${environment.urlFileManager}/file/permission/writedocument?document_id=${id_document}&email=${email}`;
    return this.http.get<any>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        console.log(response)
        return response.body.data
      })
    )
  }
  canWriteDocument(id_document: number, email: string) {
    const uri = `${environment.urlFileManager}/file/permission/writedocument?document_id=${id_document}&email=${email}`;
    return this.http.get<any>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        console.log(response)
        return response.body.data
      })
    )
  }
  sharedDocumentByRol(shareddocumentrol: FmRolSharedDocument) {
    const uri = `${environment.urlFileManager}/file/share/rol`;
    const format = {
      share: shareddocumentrol
    }
    return this.http.post<GetFmRolSharedDocument>(uri, format, HTTPOPTIONS)
      .pipe(
        map((response) => {
          return response.body.data
        })
      )
  }
  sharedDocumentByUser(shareddocumentrol: FmUserSharedDocument) {
    const uri = `${environment.urlFileManager}/file/share/user`;
    const format = {
      share: shareddocumentrol
    }
    return this.http.post<GetFmRolSharedDocument>(uri, format, HTTPOPTIONS)
      .pipe(
        map((response) => {
          return response.body.data
        })
      )
  }
  getAllPermissions(id_folder: number) {
    const uri = `${environment.urlFileManager}/permissions/document/${id_folder}`;
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
    const uri = `${environment.urlFileManager}/permissions/document/rol/`;
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
    const uri = `${environment.urlFileManager}/permissions/document/user/`;
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
    const uri = `${environment.urlFileManager}/permissions/document/rol/${id}`;
    return this.http.delete<any>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        console.log(response)
        return response
      })
    )
  }
  deleteUserPermission(
    id: number
  ) {
    const uri = `${environment.urlFileManager}/permissions/document/user/${id}`;
    return this.http.delete<any>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        console.log(response)
        return response
      })
    )
  }

}
