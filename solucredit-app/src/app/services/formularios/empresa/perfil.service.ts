import { Injectable, Pipe } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders,HttpResponse  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ProfileForm, SaveFormResponse } from '../../../models/perfil-individual.model';


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
export class PerfilService {

  constructor(private http: HttpClient) { }

  saveForm(newform: ProfileForm,idApplication:number): Observable<ProfileForm>{
    const uri = `${environment.urlCrearFormularioPerfil}`;

    let body = {
      idCustomer: 1,
      idApplication: idApplication,
      profileForm: newform
    }

    return this.http.post<SaveFormResponse>(uri, body, httpOptions).pipe(
      map((response) => {
        //console.log('RESP saveFOrm');
        //console.log(response);
        return response.body.data;
      })
    );
  }

  getForm(idSolicitud: number, idCustomer:number):Observable<ProfileForm>{
    const uri = `${environment.urlCrearFormularioPerfil}?idapplication=${idSolicitud}&idcustomer=${idCustomer}`;

    return this.http.get<SaveFormResponse>(uri, httpOptions).pipe(
      map((response) => {
        //console.log('RESP getFOrm');
        //console.log(response);
        return response.body.data;
      })
    )
  }


}
