import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Log } from '../../models/log.model';
import { GetLogsResponse, DataLogResponse } from '../../interfaces/log.interface';
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
export class LogsService {

  constructor(private http: HttpClient) { }

  getLogs(limit: number, offset: number, searchItem: string[],searchField: string[]): Observable<DataLogResponse> {
    //console.log(`${limit} , ${offset}, ${searchItem}`);
    let uri = `${environment.urlLog}?limit=${limit}&offset=${offset}`;
    if (searchItem.length != 0) { for (let i = 0; i < searchItem.length; i++) { uri = uri + `&searchItem=${searchItem[i]}`; } }
    if (searchField.length != 0) { for (let i = 0; i < searchField.length; i++) { uri = uri + `&searchField=${searchField[i]}`; } }

    return this.http.get<GetLogsResponse>(uri, httpOptions).pipe(
      map((response) => {

        return response.body.data;

      })
    )

  }
}
