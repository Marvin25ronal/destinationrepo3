import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { HTTPOPTIONS } from 'src/Utils/constants';
import { GetActivityResposne, GetButtonsResponse, GetOptionsResponse, GetViewsActivityResponse, GetWF_DocumentResponse, GetWorkflowResponse } from 'src/app/models/wf_document.model';
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
export class WfDocumentService {

  constructor(private http: HttpClient) { }
  getWFDocs(id: number) {
    const uri = `${environment.urlWFDocuments}/docs/${id}`
    return this.http.get<GetWF_DocumentResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  getActivity(id_document: number) {
    const uri = `${environment.urlWFDocuments}/activity/${id_document}`
    return this.http.get<GetActivityResposne>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  getButtons(id_activity: number, email: string) {
    const uri = `${environment.urlWFDocuments}/buttons/${id_activity}/${email}`
    return this.http.get<GetButtonsResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  getOptions(id_activity: number, email: string) {
    const uri = `${environment.urlWFDocuments}/options/${id_activity}/${email}`
    return this.http.get<GetOptionsResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  getShowViews(id_activity: number, email: string) {
    const uri = `${environment.urlWFDocuments}/showviews/${id_activity}/${email}`
    return this.http.get<GetViewsActivityResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  getWorkflow(workflow_id: number) {
    const uri = `${environment.urlWFDocuments}/workflow/${workflow_id}`
    return this.http.get<GetWorkflowResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
}
