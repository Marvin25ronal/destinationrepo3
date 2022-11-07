import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HTTPOPTIONS } from 'src/Utils/constants';
import { AlertService } from '../alerts/alert.service';
import { DeleteAlertService } from '../alerts/delete-alert.service';
import { HistoryService } from './history.service';

@Injectable({
  providedIn: 'root'
})
export class TriggersService {

  constructor(
    private http: HttpClient,
    private _alertService: AlertService,
    private _historyService: HistoryService,
    private _deletealertService: DeleteAlertService,
    private spinner:NgxSpinnerService
  ) { }
  validaTodosRequisitos(user_id: number) {
    console.log('Validar documentos')
    return true
  }
  cambioDeActividad(document_id: number, target_event_id: number, reloaddata: any) {
    //Este va a ser uso de
    const uri = `${environment.urlTriggers}/update`
    const format = {
      data: {
        wf_document_id: document_id,
        wf_transition_target_id: target_event_id
      }
    }
    return this.http.post<any>(uri, format, HTTPOPTIONS).pipe(
      map((response) => {
        console.log(response.body)
      })
    ).toPromise().then((response) => {
      console.log(response)
      console.log('response2')
      reloaddata()
      return true
    })
  }
  activityDocumentSetStatus(document_id: number, wf_activity_target_status: number, reloaddata: any, activity_name: string, history: any) {
    //primero preguntamos si desea realizar la transicion
    this._alertService.showConfirmationOption(activity_name).then((response) => {
      if (response.isConfirmed) {
        //mostramos el mensaje de confirmacion
        //grabamos en bitacora
        this._historyService.recordHistory(
          history,
          activity_name,
          `Opcion seleccionada ${activity_name}`,
          'OPCIÓN',
          'Éxito en opción ' + activity_name,
          'éxito',
          0
        ).toPromise()
        this._alertService.showInfoOption().then(() => {
          const uri = `${environment.urlTriggers}/activity`
          const format = {
            format: {
              document_id,
              wf_activity_target_status
            }
          }
          return this.http.post<any>(uri, format, HTTPOPTIONS).pipe(
            map((response) => {
              return response.body.data
            })
          ).toPromise().then((response) => {
            //reloaddata()
            return response
          })
        })
      }
    })
  }
  workflowDocumentSetStatus(document_id: number, value: number) {
    const uri = `${environment.urlTriggers}/workflow`
    const format = {
      format: {
        document_id,
        value
      }
    }
    return this.http.post<any>(uri, format, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    ).toPromise().then((response) => {
      return response
    })
  }
  sendEmail(transition_target_event_id: number, document_id: number) {
    const uri = `${environment.urlTriggers}/info`
    const format = {
      transition_target_event_id,
      document_id
    }
    return this.http.post<any>(uri, format, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    ).toPromise().then((response) => {
      return response
    }).catch(() => {
      return false
    })
  }
  sendEmailCustomer(transition_target_event_id: number, document_id: number) {
    const uri = `${environment.urlTriggers}/infocustomer`
    const format = {
      transition_target_event_id,
      document_id
    }
    return this.http.post<any>(uri, format, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    ).toPromise().then((response) => {
      return response
    })
  }
  async activityDocumentSetCommentRetorno(document_id: number, activity_name: string, activity_description: string,reloaddata: any) {
    this.spinner.hide()
    const result = await this._deletealertService.showAlertReturnAction(activity_name, activity_description)
    this.spinner.show()
    if (result.confirmed) {
    
      const uri = `${environment.urlTriggers}/comment`
      const format = {
        format: {
          document_id,
          comment: result.message,
          activity_name
        }
      }
      return this.http.post<any>(uri, format, HTTPOPTIONS).pipe(
        map((response) => {
          console.log(response)
          reloaddata()
          return response.body.data
        })
      ).toPromise().then((response) => {
        return true
      })
    } else {
      return undefined
    }
    
  }
  sendEmailRechazoInterno(transition_target_event_id: number, document_id: number) {
    return true
  }
  //sendEmail(@target_event_id,@document_id)
}
