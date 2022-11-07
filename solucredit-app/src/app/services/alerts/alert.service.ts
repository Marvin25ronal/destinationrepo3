import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Alert, AlertPagination, GetAlertsResponse, GetAlertResponse } from '../../models/alert.model';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
const confirmationMessage = 'Confirmar'
const cancelMessage = 'Cancelar'
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
export class AlertService {

  constructor(private http: HttpClient) { }


  saveAlert(alert: Alert): Observable<Alert> {
    const uri = `${environment.urlAlert}`;
    const format_alert = {
      alert: alert
    }
    return this.http.post<GetAlertResponse>(uri, format_alert, httpOptions).pipe(
      map((response) => {
        return response.body.data
      })
    );

  }

  getAlerts(limit: number, offset: number, searchItem: string[]): Observable<AlertPagination> {
    //console.log(`${limit} , ${offset}, ${searchItem}`);
    let uri = `${environment.urlAlertsList}?limit=${limit}&offset=${offset}`;
    if (searchItem.length != 0) {
      uri = `${environment.urlAlertsList}?limit=${limit}&offset=${offset}&searchItem=${searchItem}`;
    }
    //if (searchItem.length != 0) { for (let i = 0; i < searchItem.length; i++) { uri = uri + `&searchItem=${searchItem[i]}`; } }

    return this.http.get<GetAlertsResponse>(uri, httpOptions).pipe(
      map((response) => {
        //console.log("response");
        //console.log(response.body);
        return response.body.data;

      })
    )

  }

  updateAlert(alert: Alert): Observable<HttpResponse<any>> {
    const uri = `${environment.urlAlert}`;
    const format_alert = {
      alert: alert
    }
    return this.http.put(uri, format_alert, httpOptions).pipe(
      map((response) => {
        //console.log(response);
        return response;
      })
    );
  };

  deleteAlert(alert: Alert): Observable<HttpResponse<any>> {
    const uri = `${environment.urlAlert}/${alert.id}`;
    return this.http.delete(uri, httpOptions).pipe(
      map((response) => {
        //console.log(response);
        return response;
      })
    )
  };


  GetDepartament(): Observable<any> {
    const uri = `${environment.urlAlert}/departments`
    return this.http.get<any>(uri);
  }

  showConfirmTransition(message: string) {
    let messagesh = `¿Desea completar ${message}?. Se notificará a la etapa siguiente el proceso que ha sido completado esta etapa.`
    return Swal.fire({
      icon: 'warning',
      title: 'Advertencia',
      text: messagesh,
      showCancelButton: true,
      confirmButtonText: confirmationMessage,
      cancelButtonText: cancelMessage
    })
  }
  showConfirmationModal(message: string) {
    return Swal.fire({
      icon: 'warning',
      title: 'Advertencia',
      text: message,
      showCancelButton: true,
      confirmButtonText: confirmationMessage,
      cancelButtonText: cancelMessage
    })
  }
  showConfirmationOption(message: string) {
    return Swal.fire({
      title: 'Advertencia',
      text: `¿Desea confirmar selección de actividad: ${message}, para la siguiente etapa?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: confirmationMessage,
      cancelButtonText: cancelMessage
    })
  }
  showInfoOption() {
    return Swal.fire({
      title: 'Información',
      text: 'Favor presionar botón de transferencia para ejecutar su selección.',
      icon: 'info',
    })
  }
}
