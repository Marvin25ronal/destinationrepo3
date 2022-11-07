import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders,HttpResponse  } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError, of } from 'rxjs';
import { map} from 'rxjs/operators';
import { GetCountriesResponse, CountryInterface } from '../interfaces/coutry-interface';

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
export class AuxService {

  constructor(private http: HttpClient) { }

  getCountries(): Observable<CountryInterface> {
    const uri = `${environment.urlgetCountries}`;
    return this.http.get<GetCountriesResponse>(uri).pipe(
      map((response) => {
        return response.data;
      })
    );
  }

}
