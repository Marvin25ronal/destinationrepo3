import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Debtor, DebtorPagination, GetDebtorsResponse, GetDebtorResponse } from '../../models/debtor.model';
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
  providedIn: "root",
})
export class DebtorService {
  constructor(private http: HttpClient) {}

  saveDebtor(debtor: Debtor): Observable<Debtor> {
    const uri = `${environment.urlDebtor}`;
    const format_debtor = {
      debtor: debtor,
    };
    return this.http
      .post<GetDebtorResponse>(uri, format_debtor, httpOptions)
      .pipe(
        map((response) => {
          return response.body.data;
        })
      );
  }

  getDebtors(
    limit: number,
    offset: number,
    searchItem: string[]
  ): Observable<DebtorPagination> {
    //console.log(`${limit} , ${offset}, ${searchItem}`);
    let uri = `${environment.urlDebtorsList}?limit=${limit}&offset=${offset}`;
    if (searchItem.length != 0) {
      uri = `${environment.urlDebtorsList}?limit=${limit}&offset=${offset}&searchItem=${searchItem}`;
    }
    //if (searchItem.length != 0) { for (let i = 0; i < searchItem.length; i++) { uri = uri + `&searchItem=${searchItem[i]}`; } }

    return this.http.get<GetDebtorsResponse>(uri, httpOptions).pipe(
      map((response) => {
        //console.log("response");
        //console.log(response.body);
        return response.body.data;
      })
    );
  }

  getALLDebtors(): Observable<DebtorPagination> {
    //console.log(`${limit} , ${offset}, ${searchItem}`);
    let uri = `${environment.urlDebtorsList}`;
    /*if (searchItem.length != 0) {
      uri = `${environment.urlDebtorsList}?limit=${limit}&offset=${offset}&searchItem=${searchItem}`;
    }*/
    //if (searchItem.length != 0) { for (let i = 0; i < searchItem.length; i++) { uri = uri + `&searchItem=${searchItem[i]}`; } }

    return this.http.get<GetDebtorsResponse>(uri, httpOptions).pipe(
      map((response) => {
        //console.log("response");
        //console.log(response.body);
        return response.body.data;
      })
    );
  }

  updateDebtor(debtor: Debtor): Observable<HttpResponse<any>> {
    const uri = `${environment.urlDebtor}`;
    const format_debtor = {
      debtor: debtor,
    };
    console.log(format_debtor);
    return this.http.put(uri, format_debtor, httpOptions).pipe(
      map((response) => {
        //console.log(response);
        return response;
      })
    );
  }

  deleteDebtor(debtor: Debtor): Observable<HttpResponse<any>> {
    const uri = `${environment.urlDebtor}/${debtor.id_debtor}`;
    return this.http.delete(uri, httpOptions).pipe(
      map((response) => {
        //console.log(response);
        return response;
      })
    );
  }
}
