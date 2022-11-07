import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostInitManagementAct, ManagementAct, GetManagementActResponse, GetManagementActsResponse} from '../../models/managementact.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { HTTPOPTIONS } from 'src/Utils/constants';
import { GetAuthorizedDebtorsArrayInterface } from 'src/app/models/conditionSheet.model';
import { GetCustomerRequestResponse } from 'src/app/models/customer-request.model';
import { GetBranchOfficeResponse } from 'src/app/models/branchoffice.model';
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
export class ManagementActService {

  constructor(private http: HttpClient) { }
  getCommercialAnalysis(id: number){
    const uri = `${environment.urlManagementAct}/ca/${id}`
    return this.http.get<GetManagementActResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  exist(id: number){
    const uri = `${environment.urlManagementAct}/exist/${id}`
    return this.http.get<GetManagementActResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  init(id_analysis: number, customer_id: number) {
    const uri = `${environment.urlManagementAct}/init`
    const object = {
      id_analysis,
      customer_id
    }
    return this.http.post<PostInitManagementAct>(uri, object, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  conditionsheet(id: number){
    const uri = `${environment.urlManagementAct}/cs/${id}`
    return this.http.get<GetManagementActResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  debtor(id: number){
    const uri = `${environment.urlManagementAct}/debtor/${id}`
    return this.http.get<GetAuthorizedDebtorsArrayInterface>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  customer(id: number){
    const uri = `${environment.urlManagementAct}/customer/${id}`
    return this.http.get<GetManagementActResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  requestInfo(id: number){
    const uri = `${environment.urlManagementAct}/request/${id}`
    return this.http.get<GetCustomerRequestResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  managementAct(id: number){
    const uri = `${environment.urlManagementAct}/ma/${id}`
    return this.http.get<GetManagementActResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  branchOffice(id: number){
    const uri = `${environment.urlManagementAct}/branch/${id}`
    return this.http.get<GetBranchOfficeResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  comissionRate(id: number){
    const uri = `${environment.urlManagementAct}/comission/${id}`
    return this.http.get<GetManagementActResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  interestRate(id: number){
    const uri = `${environment.urlManagementAct}/interest/${id}`
    return this.http.get<GetManagementActResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  flatRate(id: number){
    const uri = `${environment.urlManagementAct}/flat/${id}`
    return this.http.get<GetManagementActResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  moraRate(id: number){
    const uri = `${environment.urlManagementAct}/mora/${id}`
    return this.http.get<GetManagementActResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
}
