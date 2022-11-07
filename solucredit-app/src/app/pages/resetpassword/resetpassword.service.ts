import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
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
export class ResetpasswordService {

  
  constructor(private http: HttpClient) { }

  public resetEmail(email: string): Observable<HttpResponse<any>> {
    const uri = `${environment.urlAuthorize}/resetpassword`;
    return this.http.post(uri, {email}, httpOptions).pipe(
      map((response) => {
        //console.log(response);
        return response;
      })
    )
  };
}
