import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders,HttpResponse  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Form, SaveFormResponse } from '../../../models/solicitud-empresa.model';

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

export class SolicitudService {

  constructor(private http: HttpClient) { }

  saveForm(newform: Form, idAplication:number): Observable<Form>{
    const uri = `${environment.urlCrearSolitudInidvidual}`;
    let body = {
      idCustomer: 1,
      idAplication: idAplication,
      applicationForm: newform
    }

    return this.http.post<SaveFormResponse>(uri, body, httpOptions).pipe(
      map((response) => {
        //console.log(response);
        return response.body.data;
      })
    );


  }

  
}
