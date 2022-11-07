import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetRequestReportResponse, RequestReportResponse } from '../../../interfaces/request-report.interface';
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
export class RequestService {

    constructor(private http: HttpClient) { }

    getRequests(limit: number, offset: number, searchItem: string[], searchField: string[]): Observable<RequestReportResponse> {

        let uri = `${environment.urlRequest}?limit=${limit}&offset=${offset}`;
        if (searchItem.length != 0) { for (let i = 0; i < searchItem.length; i++) { uri = uri + `&searchItem=${searchItem[i]}`; } }
        if (searchField.length != 0) { for (let i = 0; i < searchField.length; i++) { uri = uri + `&searchField=${searchField[i]}`; } }
        return this.http.get<GetRequestReportResponse>(uri, httpOptions).pipe(
            map((response) => {

                return response.body.data;

            })
        )

    }
}
