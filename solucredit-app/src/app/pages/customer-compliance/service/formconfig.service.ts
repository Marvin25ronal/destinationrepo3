import { Injectable } from '@angular/core';
import { MyProfileReqSubjectResp, ReqSubjectResp, formMetadataResponse, ReqFormResp, formSubjectModResponse, ReqFormDocResp, ReqRequirement, ReqRequirementDoc } from '../../../models/fomMetadata.model';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

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
export class FormconfigService {

  constructor(private _http: HttpClient) { }

  getAvalsInfo(idApplication: number): Observable<MyProfileReqSubjectResp[]> {
    const uri = `${environment.urlFormConfig}/${idApplication}`;
    return this._http.get<formMetadataResponse>(uri, httpOptions)


      .pipe(
        map((response) => {
          //console.log(response);
          return response.body.data;
        })
      );

  }

  DownloadJson(form_id: number,subjectName:string): void {
    this._http.get(environment.urlForm + '/getfeic/' + form_id, {
      responseType: "blob" as "json",
    }).subscribe((response: any) => {
      console.log('respose Download JSON');
      console.log(response);
      //let filename ='test.xlsx'
      let dataType = response.type;
      let binaryData = [];
      binaryData.push(response);
      let downloadLink = document.createElement("a");
      downloadLink.href = window.URL.createObjectURL(
        new Blob(binaryData, { type: 'json' })
      );
      downloadLink.setAttribute("download", subjectName+"FEIC.json");
      document.body.appendChild(downloadLink);
      downloadLink.click();
    });
  }
  

  DownloadFormDoc(formdoc: ReqFormDocResp): void {
    this._http
      .get(environment.urlDownloadForms+'/'+formdoc.req_form_doc_id, {
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
        downloadLink.setAttribute("download",formdoc.name_s3);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      });
  }


  DownloadReqDoc(reqdoc: ReqRequirementDoc): void {
    this._http
      .get(environment.urlDownloadReq + '/' + reqdoc.req_requi_doc, {
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
        downloadLink.setAttribute("download", reqdoc.name);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      });
  }

  ModifySubjectForms(sub: ReqSubjectResp): Observable<ReqSubjectResp> {
    const uri = `${environment.urlFormConfig}/modifysubject`;
    return this._http.put<formSubjectModResponse>(uri, sub ,httpOptions)
      .pipe(
        map((response) => {
          //console.log(response);
          return response.body.data;
        })
      );
  }

  ChangeFormCheckStatusAll(rsdet_id: number,check_status:boolean): Observable<HttpEvent<any>> {
    const uri = `${environment.urlFormConfig}/changeformcheckall`;
    return this._http.put(uri, { rsdet_id: rsdet_id, check_status:check_status?1:0 }, httpOptions)
      .pipe(
        map((response) => {
          //console.log(response);
          return response;
        })
      );
  }
  

  ChangeFormCheckStatus(form: ReqFormResp): Observable<HttpEvent<any>> {
    const uri = `${environment.urlFormConfig}/changeformcheck`;
    return this._http.put(uri, { rsfdet_id: form.rsfdet_id, check_status:form.check_status}, httpOptions)
      .pipe(
        map((response) => {
          //console.log(response);
          return response;
        })
      );
  }

  CompleteSubjectForms(sub: ReqSubjectResp): Observable<HttpEvent<any>> {
    const uri = `${environment.urlFormConfig}/completesubject`;
    return this._http.put(uri, { rsdet_id: sub.rsdet_id, complete_status: sub.complete_status }, httpOptions)
      .pipe(
        map((response) => {
          //console.log(response);
          return response;
        })
      );
  }

  UpdateRequirementsEnabled(req:ReqRequirement) {
    const uri = `${environment.urlFormConfig}/changereqsenabled`;
    return this._http.put(uri,req, httpOptions)
      .pipe(
        map((response) => {
          //console.log(response);
          return response;
        })
      );
  }
  UpdateRequirementsState(req: ReqRequirement, flagAll: boolean) {
    const uri = `${environment.urlFormConfig}/changereqsstatus`;
    return this._http.put(uri, {requirements:req,flagAll}, httpOptions)
      .pipe(
        map((response) => {
          //console.log(response);
          return response;
        })
      );
  }

  SetRequirementComplete(req_requi_id: number, state: number) {
    const uri = `${environment.urlFormConfig}/completereqs`;
    return this._http.put(uri, { req_requi_id, state }, httpOptions)
      .pipe(
        map((response) => {
          //console.log(response);
          return response;
        })
      );
  }
  DeleteFormDoc(reqdoc: ReqFormDocResp): Observable<any> {
    const uri = `${environment.urlDeleteFormDoc}`;
    return this._http.delete<any>(uri + '/' + reqdoc.req_form_doc_id);
  }

  DeleteReqDoc(reqdoc: ReqRequirementDoc): Observable<any> {
    const uri = `${environment.urlDeleteReqDoc}`;
    return this._http.delete<any>(uri + '/' + reqdoc.req_requi_doc);
  }

  getFormDoc(reqdoc: ReqFormDocResp): Observable<any> {
    const uri = `${environment.urlGetForm}`;
    return this._http.get<any>(uri + '/' + reqdoc.req_form_doc_id);
  }

  getreqDoc(reqdoc: ReqRequirementDoc): Observable<any> {
    const uri = `${environment.urlGetReq}`;
    return this._http.get<any>(uri + '/' + reqdoc.req_requi_doc);
  }


}


