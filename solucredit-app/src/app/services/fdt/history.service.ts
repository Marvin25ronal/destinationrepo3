import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetDocumentHistoryResponse, DocumentHistoryPagination, GetDocumentsHistoryResponse } from 'src/app/models/wf_document_history';
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

export interface GetData{
  sucess: boolean,
  data: any
}

export interface GetInfo{
  sucess: boolean,
  data: {}
}

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(
    private http: HttpClient,
  ) { }

  recordHistory(data,
    event_name: string,
    event_description: string,
    event_type: string,
    event_result: string,
    event_result_type: string,
    event_is_mandatory: number
  ) {
    const format = {
      data: {
        ...data,
        event_name,
        event_description,
        event_type,
        event_result,
        event_result_type,
        event_is_mandatory
      }
    }
    const uri = `${environment.urlTriggers}/history`
    return this.http.post<any>(uri, format, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body
      })
    )
  }
  getBitacora(id: number){
    const uri = `${environment.urlTriggers}/history/${id}`
    return this.http.get<GetData>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        console.log('******')
        console.log(response)
        return response.body.data
      })
    )
  }
  getInfo(id: number){
    const uri = `${environment.urlTriggers}/info/${id}`
    return this.http.get<GetInfo>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        console.log('Informacion Cliente')
        console.log(response)
        return response.body.data
      })
    )
  }
  getHistoryList(
    limit: number,
    offset: number,
    searchItem: string[]
  ): Observable<DocumentHistoryPagination> {
    let uri = `${environment.urlTriggers}/histories?limit=${limit}&offset=${offset}&searchItem=${searchItem}`;
    return this.http.get<GetDocumentsHistoryResponse>(uri, httpOptions).pipe(
      map((response) => {
        return response.body.data;
      })
    )
  }
}
