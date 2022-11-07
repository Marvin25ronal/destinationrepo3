import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { MyProfileReqSubjectResp, formMetadataResponse, ReqRequirementDoc, ReqFormDocResp } from '../../../models/fomMetadata.model';

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
export class MyprofileService {

  constructor(private _http: HttpClient) { 

  }
  public changePasswordCustomer(user_id: number, newPassword: string): Observable<HttpResponse<any>> {
    const uri = `${environment.urlUsers}/changepasswordcustomer`;
    return this._http.put(uri, { user_id, newPassword }, httpOptions).pipe(
      map((response) => {
        //console.log(response);
        return response;
      })
    )
  };

  getFormsInfo(idApplication: number): Observable<MyProfileReqSubjectResp[]> {
    const uri = `${environment.urlFormConfig}/${idApplication}`;
    return this._http.get<formMetadataResponse>(uri,httpOptions)
    
      
      .pipe(
      map((response) => {
        //console.log(response);
        return response.body.data;
      })
    );
    
  }

  uploadForm(data): Observable<any> {
    const uri = `${environment.urlUploadForms}`;
    return this._http.post(uri, data);
  }

  uploadReq(data): Observable<any> {
    const uri = `${environment.urlUploadReq}`;
    return this._http.post(uri, data);
  }

  getreqDoc(reqdoc: ReqRequirementDoc): Observable<any> {
    const uri = `${environment.urlGetReq}`;
    return this._http.get<any>(uri+'/' +reqdoc.req_requi_doc);
  }
  getFormDoc(reqdoc: ReqFormDocResp): Observable<any> {
    const uri = `${environment.urlGetForm}`;
    return this._http.get<any>(uri + '/' + reqdoc.req_form_doc_id);
  }

  DownloadReqDoc(reqdoc: ReqRequirementDoc): void {
    this._http
      .get(environment.urlDownloadReq+'/'+reqdoc.req_requi_doc, {
        responseType: "blob" as "json",
      })
      .subscribe((response: any) => {
        //let filename ='test.xlsx'
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement("a");
        downloadLink.href = window.URL.createObjectURL(
          new Blob(binaryData, { type: dataType })
        );
        downloadLink.setAttribute("download",reqdoc.name);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      });
  }
  DownloadFormDoc(formdoc: ReqFormDocResp): void {
    this._http
      .get(environment.urlDownloadForms + '/' + formdoc.req_form_doc_id, {
        responseType: "blob" as "json",
      })
      .subscribe((response: any) => {
        //let filename ='test.xlsx'
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement("a");
        downloadLink.href = window.URL.createObjectURL(
          new Blob(binaryData, { type: dataType })
        );
        downloadLink.setAttribute("download", formdoc.name_s3);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      });
  }

  DeleteReqDoc(reqdoc: ReqRequirementDoc): Observable<any> {
    const uri = `${environment.urlDeleteReqDoc}`;
    return this._http.delete<any>(uri+'/' + reqdoc.req_requi_doc);
  }

  DeleteFormDoc(reqdoc: ReqFormDocResp): Observable<any> {
    const uri = `${environment.urlDeleteFormDoc}`;
    return this._http.delete<any>(uri + '/' + reqdoc.req_form_doc_id);
  }




}
