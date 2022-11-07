import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { FormconfigService } from 'src/app/pages/customer-compliance/service/formconfig.service';
import { environment } from 'src/environments/environment';
import { HTTPOPTIONS } from 'src/Utils/constants';
import { AlertService } from '../alerts/alert.service';
import { DeleteAlertService } from '../alerts/delete-alert.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MysqlService } from '../mysql/mysql.service';
@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor(
    private _alertService: AlertService,
    private http: HttpClient,
    private _formConfigService: FormconfigService,
    private _deletealertService: DeleteAlertService,
    private spinner: NgxSpinnerService,
    private _mysqlService: MysqlService
  ) { }

  async confirmacionTransicion(message: string) {
    this.spinner.hide()
    return await this._alertService.showConfirmTransition(message).then((response) => {
      this.spinner.show()
      return response.isConfirmed ? true : undefined;
    })
  }
  async mostrarModalConfirmacion(message: string) {
    this.spinner.hide()
    return await this._alertService.showConfirmationModal(message).then((response) => {
      this.spinner.show()
      return response.isConfirmed ? true : undefined;
    })
  }


  validaVerificacion(type: string, request_id: number) {
    const uri = `${environment.urlFunctions}/${type}/${request_id}`
    return this.http.get<any>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        console.log(response)
        return response.body.data
      })
    ).toPromise().then((response) => {
      return response
    })
  }
  validaConfiguracionRequisitos(request_id: number) {
    return this._formConfigService.getAvalsInfo(request_id).toPromise().then((response) => {
      let configurated = response.filter((item => item.requirements.update_date == null))
      if (configurated.length > 0) {
        return false
      }
      return true
    })
  }
  validaConfiguracionFormularios(request_id: number) {
    return this._formConfigService.getAvalsInfo(request_id).toPromise().then((response) => {
      let allconfigured = []
      for (let i = 0; i < response.length; i++) {
        let subject = response[i]
        for (let j = 0; j < subject.subjects.length; j++) {
          let sub = subject.subjects[j]
          if (sub.requirements_update_date == null) {
            allconfigured.push(sub)
          }
        }
      }
      if (allconfigured.length > 0)
        return false
      else
        return true
    })
  }
  validaTodosRequisitos(request_id: number) {
    return this._formConfigService.getAvalsInfo(request_id).toPromise().then((response) => {
      let allapprove = response.filter(item => item.requirements.state != 1)
      if (allapprove.length > 0)
        return false
      else
        return true
    })
  }
  validaTodosFormularios(user_id: number) {
    // return this._formConfigService.getAvalsInfo(request_id).toPromise().then((response) => {
    //   let allconfigured = []
    //   debugger
    //   for (let i = 0; i < response.length; i++) {
    //     let subject = response[i]
    //     for (let j = 0; j < subject.subjects.length; j++) {
    //       let sub = subject.subjects[j]
    //       let forms = sub.forms
    //       for (let k = 0; k < forms.length; k++) {
    //         if ((forms[k].check_status == 0 || forms[k].check_status == null) && forms[k].state == 1) {
    //           allconfigured.push(forms[k])
    //         }
    //       }
    //     }
    //   }
    //   if (allconfigured.length > 0)
    //     return false
    //   else
    //     return true
    // })
    return this._mysqlService.GetCustomerRequest(user_id)
      .toPromise()
      .then(async (response) => {
        let dataRequest = response.data.request
        if (dataRequest) {
          let data = false
          await dataRequest.forEach((element) => {
            if (element.documents === 1) {
              data = true
            } else {
              data = false
            }
          })
          return data
        }
      })
  }
  validaStatusSourceId(document_id: number, transition_target_event_id: number) {
    const uri = `${environment.urlValidations}/validation/${document_id}/${transition_target_event_id}`
    return this.http.get<any>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        console.log(response)
        return response.body.data
      })
    ).toPromise().then((response) => {
      return response
    })
  }
  async validaVerificaciones(request_id: number, user_id: number) {
    return await this._mysqlService.GetAllDataCustomerRequest(user_id, request_id)
      .toPromise()
      .then((response) => {
        debugger
        console.log('#####')
        let documents = response.data.statusdocuments
        let notcheck = documents.filter((item) => item.status == 0 || item.status == null)
        if (notcheck.length > 0 || documents.length == 0)
          return false
        return true
      })
  }
  validaExistenciaAnalisisLegal(request_id: number) {
    //TODO: implement
    return true
  }
  validaExistenciaAnalisisComercial(request_id: number) {
    //TODO: implement
    return true
  }
  validaExistenciaAnalisisCumplimiento(request_id: number) {
    //TODO: implement
    return true
  }
  validaChecklistAnalisisLegal(request_id: number) {
    //TODO: implement
    return true
  }
  validaChecklistAnalisisComercial(request_id: number) {
    //TODO: implement
    return true
  }
  validaChecklistAnalisisCumplimiento(request_id: number) {
    //TODO: implement
    return true
  }
  validaActaGG(request_id: number) {
    //TODO: implement
    return true
  }
  validaHojaCondiciones(request_id: number) {
    //TODO: implement
    return true
  }
  validaFirmaAnalisisLegal(request_id: number) {
    //TODO: implement
    return true
  }
  validaFirmaAnalisisComercial(request_id: number) {
    //TODO: implement
    return true
  }
  validaFirmaAnalisisCumplimiento(request_id: number) {
    //TODO: implement
    return true
  }
  validaInformeGG(request_id: number) {
    //TODO: implement
    return true
  }
  validaInformeGC(request_id: number) {
    //TODO: implement
    return true
  }
  validaInformeGO(request_id: number) {
    //TODO: implement
    return true
  }
  validaFirmaInformeGG(request_id) {
    return true
  }
  validaFirmaInformeGC(request_id) {
    return true
  }
  validaFirmaInformeGO(request_id) {
    return true
  }
  validaResponsableExternoAnalisisLegal(request_id) {
    return true
  }
  validaResponsableExternoAnalisisComercial(request_id) {
    return true
  }
  validaResponsableExternoAnalisisCumplimiento(request_id) {
    return true
  }
  // async activityDocumentSetCommentRetorno(document_id: number, activity_name: string, activity_description: string) {
  //   const result = await this._deletealertService.showAlertReturnAction(activity_name, activity_description)
  //   if (result.confirmed) {
  //     const uri = `${environment.urlTriggers}/comment`
  //     const format = {
  //       format: {
  //         document_id,
  //         comment: result.message,
  //         activity_name
  //       }
  //     }
  //     return this.http.post<any>(uri, format, HTTPOPTIONS).pipe(
  //       map((response) => {
  //         console.log(response)
  //         return response.body.data
  //       })
  //     ).toPromise().then((response) => {
  //       return true
  //     })
  //   } else {
  //     return undefined
  //   }
  // }
  // sendEmailRechazoInterno(transition_target_event_id: number, document_id: number) {
  //   return true
  // }
}
