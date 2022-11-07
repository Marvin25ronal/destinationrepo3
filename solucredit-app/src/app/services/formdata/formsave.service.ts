import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormSave, getFormSave } from '../../models/formsave.model';
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
export class FormsaveService {

  constructor(private http: HttpClient) { }
  getData(id: number) {
    const uri = `${environment.urlFormSave}/${id}`
    return this.http.get<getFormSave>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        console.log(response)
        return response.body.data
      })
    )
  }
  updateCA(formdata: any): Observable<HttpResponse<any>> {
    const uri = `${environment.urlFormSave}`;
    const format_ca = {
      data: formdata
    };
    return this.http.put(uri, format_ca, httpOptions).pipe(
      map((response) => {
        return response
      })
    )
  }
}
