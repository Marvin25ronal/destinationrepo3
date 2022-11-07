import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CommercialAnalysis } from 'src/app/models/commercialanalysis.model';
export interface GetAnalysisArrayResponse {
  success: boolean
  data: CommercialAnalysis[]
}
import { HTTPOPTIONS } from 'src/Utils/constants';
import { UploadDocumentsCA } from 'src/app/models/uploaddocumentsca.model';
import { GetUploadDocumentsCA } from './commercial-manager-authorization.service';
import { ChecklistItem, LegalCheckListItem } from './legal-analysis.service';
import { CommercialCheckListItem } from './commercialanalysis.service';
import { ComplianceCheckListItem } from './compliance-verification.service';
@Injectable({
  providedIn: 'root'
})

export class AnalysisService {

  constructor(
    private http: HttpClient
  ) { }
  getLegalAnalysisList(email: string, limit: number, offset: number, search: string) {
    const uri = `${environment.urlAnalysis}/legal?email=${email}&limit=${limit}&offset=${offset}&search=${search}`
    return this.http.get<GetAnalysisArrayResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  getComplianceAnalyisisList(email: string, limit: number, offset: number, search: string) {
    const uri = `${environment.urlAnalysis}/compliance?email=${email}&limit=${limit}&offset=${offset}&search=${search}`
    return this.http.get<GetAnalysisArrayResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  showDocument(id_doc: number) {
    const uri = `${environment.urlAnalysis}/show/${id_doc}`
    return this.http.get<any>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  showDocumentChecklist(id_checklist: number) {
    const uri = `${environment.urlAnalysis}/showChecklist/${id_checklist}`
    return this.http.get<any>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  downloadDocument(id_doc: number, name: string) {
    const uri = `${environment.urlAnalysis}/download/${id_doc}`
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
  showAnyDocument(key: string, name: string) {
    const uri = `${environment.urlAnalysis}/showAnyDocument`

    return this.http.post<any>(uri, { key, name }, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  downloadAnyDocument(name: string, key: string) {
    const uri = `${environment.urlAnalysis}/downloadDocument`
    this.http.post(uri, { key: key, name }, { responseType: "blob" as "json" })
      .subscribe((response: any) => {
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
  downloadDocumentChecklist(id_checklist: number, name: string) {
    const uri = `${environment.urlAnalysis}/downloadChecklist/${id_checklist}`
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
  listAllreports(id_request: number) {
    const uri = `${environment.urlAnalysis}/allreports/${id_request}`
    return this.http.get<GetUploadDocumentsCA>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  changeStatus(analysis_id: number, status_id: number) {
    let format = {
      analysis_id: analysis_id,
      status: status_id
    }
    const uri = `${environment.urlAnalysis}/changestatus`
    return this.http.put<any>(uri, format, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  showLegalVerificationDocument(document: LegalCheckListItem) {
    const uri = `${environment.urlAnalysis}/showLegalVerificationDocument/${document.legal_checklist_analysis_id}`
    return this.http.get<any>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  showCommercialVerificationDocument(document: CommercialCheckListItem) {
    const uri = `${environment.urlAnalysis}/showCommercialVerificationDocument/${document.commercial_checklist_analysis_id}`
    return this.http.get<any>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  showComplianceVerificationDocument(document: ComplianceCheckListItem) {
    const uri = `${environment.urlAnalysis}/showComplianceVerificationDocument/${document.compliance_checklist_analysis_id}`
    return this.http.get<any>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }

}
