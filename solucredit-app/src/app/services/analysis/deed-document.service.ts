import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { DeedDocument, GetContractTypeResponse, GetDeedDocumentResponse, GetDeedDocumentTypeResponse, GetInitDeedDocumentResponse } from 'src/app/models/deedDocument.model';
import { environment } from 'src/environments/environment';
import { HTTPOPTIONS } from 'src/Utils/constants';
@Injectable({
  providedIn: 'root'
})
export class DeedDocumentService {

  constructor(private http: HttpClient) { }

  getContractTypeList() {
    const uri = `${environment.urlDeedDocument}/listcontracttype`
    return this.http.get<GetContractTypeResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  getDeedDocumentType() {
    const uri = `${environment.urlDeedDocument}/listdeeddocumenttype`
    return this.http.get<GetDeedDocumentTypeResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  create(data: DeedDocument) {
    const uri = `${environment.urlDeedDocument}/`
    let format = {
      deedDocument: data
    }
    return this.http.post<GetInitDeedDocumentResponse>(uri, format, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  update(data: DeedDocument, analysis_id: number) {
    const uri = `${environment.urlDeedDocument}/`
    let format = {
      deedDocument: data,
      analysis_id
    }
    return this.http.put<GetInitDeedDocumentResponse>(uri, format, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  getDocument(analysis_id: number) {
    const uri = `${environment.urlDeedDocument}/document/${analysis_id}`
    return this.http.get<GetInitDeedDocumentResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }

}
