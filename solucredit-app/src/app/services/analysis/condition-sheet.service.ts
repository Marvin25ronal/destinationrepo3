import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HTTPOPTIONS } from 'src/Utils/constants';
import { GetCreateInitResponse, GetInitResponse } from './legal-analysis.service';
import { map } from 'rxjs/operators';
import { ConditionSheet, GetAuthorizedDebtorInterface, GetAuthorizedDebtorsArrayInterface, GetConditionSheetRatesArrayInterface, GetCustomerMemberInformationConditionSheetInterface, GetMembersInformationConditionSheetInterface, GetRatesArrayInterface, PostInitConditionSheet } from 'src/app/models/conditionSheet.model';

@Injectable({
  providedIn: 'root'
})
export class ConditionSheetService {

  constructor(private http: HttpClient) { }
  getInit(id_analysis: number) {
    const uri = `${environment.urlConditionSheet}/init/${id_analysis}`
    return this.http.get<GetInitResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  init(id_analysis: number, customer_id: number) {
    const uri = `${environment.urlConditionSheet}/init`
    const object = {
      id_analysis,
      customer_id
    }
    return this.http.post<PostInitConditionSheet>(uri, object, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  getConditionSheet(id_analysis: number) {
    const uri = `${environment.urlConditionSheet}/conditionsheet/${id_analysis}`
    return this.http.get<PostInitConditionSheet>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  updateConditionSheet(id_condition: number, conditionSheet: ConditionSheet, interest: any) {
    const uri = `${environment.urlConditionSheet}/conditionsheet`
    const format = {
      id_condition_sheet: id_condition,
      condition_sheet: conditionSheet,
      interest
    }
    return this.http.put<PostInitConditionSheet>(uri, format, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })

    )
  }
  addCustomer(id_condition: number, id_member: number, work_member: string, percentage: number) {
    const uri = `${environment.urlConditionSheet}/member`
    const format = {
      id_condition,
      subject_detail: id_member,
      percentage,
      worker: work_member
    }
    return this.http.post<GetCustomerMemberInformationConditionSheetInterface>(uri, format, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  listMembers(id_condition: number) {
    const uri = `${environment.urlConditionSheet}/members/${id_condition}`
    return this.http.get<GetMembersInformationConditionSheetInterface>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  listDebtors(id_condition: number) {
    const uri = `${environment.urlConditionSheet}/debtor/${id_condition}`
    return this.http.get<GetAuthorizedDebtorsArrayInterface>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  addDebtor(id_condition: number, id_debtor: number, id_payment: number, id_bank: number, amount: number, interest_rate: number, warranty_days: number) {
    const uri = `${environment.urlConditionSheet}/debtor/`
    const format = {
      id_condition,
      id_debtor,
      id_bank,
      id_payment,
      amount,
      warranty_days,
      interest_rate
    }
    return this.http.post<GetAuthorizedDebtorInterface>(uri, format, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  deleteMember(id_member: number) {
    const uri = `${environment.urlConditionSheet}/members/${id_member}`
    return this.http.delete(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body
      })
    )
  }
  deleteDebtor(id_debtor: number) {
    const uri = `${environment.urlConditionSheet}/debtor/${id_debtor}`
    return this.http.delete(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body
      })
    )
  }
  updateMember(id_member: number, percentage: number, worker_position: string) {
    const uri = `${environment.urlConditionSheet}/member`
    const format = {
      id_member,
      percentage,
      worker_position
    }
    return this.http.put<GetCustomerMemberInformationConditionSheetInterface>(uri, format, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body
      })
    )
  }
  updateDebtor(id_debtor: number, id_payment_method: number, id_bank: number, amount: number, warranty_days: number, percentage: number) {
    const uri = `${environment.urlConditionSheet}/debtor`
    const format = {
      id_debtor,
      id_payment_method,
      id_bank,
      amount,
      warranty_days,
      percentage
    }
    return this.http.put<GetAuthorizedDebtorInterface>(uri, format, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  getRates() {
    const uri = `${environment.urlConditionSheet}/rates`
    return this.http.get<GetRatesArrayInterface>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  getSavedRates(id_condition: number) {
    const uri = `${environment.urlConditionSheet}/savedrates/${id_condition}`
    return this.http.get<GetConditionSheetRatesArrayInterface>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  getOthersResponsables(request_id: number) {
    const uri = `${environment.urlConditionSheet}/getothersresponsables/${request_id}`
    return this.http.get<any>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  approveConditionSheet(id_condition: number, approve: number) {
    const uri = `${environment.urlConditionSheet}/approve`
    const format = {
      id_condition,
      approve
    }
    return this.http.put<PostInitConditionSheet>(uri, format, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
}
