import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { GetFiscalYearArrayResponse } from '../../models/fiscal-year.model';
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
export class FiscalYearService {

  constructor(private http: HttpClient) { }
  getFiscalYear() {
    debugger
    const uri = `${environment.urlFiscalYear}/fiscalyear`
    return this.http.get<GetFiscalYearArrayResponse>(uri, httpOptions).pipe(
      map((response) => {
        console.log(response)
        return response.body.data
      })
    )
  }
}
