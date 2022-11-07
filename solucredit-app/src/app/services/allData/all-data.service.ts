import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
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
export class AllDataService {

  constructor(private http: HttpClient) { }
  
  getCustomerFR(id: number) {
    const uri = `${environment.urlAllData}/customer/${id}`
    return this.http.get<any>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        console.log(response)
        return response.body.data
      })
    )
  }
  getCustomerMembers(id: number) {
    const uri = `${environment.urlAllData}/members/${id}`
    return this.http.get<any>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        console.log(response)
        return response.body.data
      })
    )
  }
  getCurrency(id: number) {
    const uri = `${environment.urlAllData}/currency/${id}`
    return this.http.get<any>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        console.log(response)
        return response.body.data
      })
    )
  }
  updateCurrency(customer: any) {
    const uri = `${environment.urlAllData}`;
    const data = {
      customer: customer
    };
    return this.http.put(uri, data, httpOptions).pipe(
      map((response) => {
        return response
      })
    )
  }
}
