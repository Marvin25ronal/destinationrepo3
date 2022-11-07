import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { GetTransitionsResponse, GetTransitionTarget, GetTransitionTargetEvent } from 'src/app/models/wf_document.model';
import { environment } from 'src/environments/environment';
import { HTTPOPTIONS } from 'src/Utils/constants';

@Injectable({
  providedIn: 'root'
})
export class ButtonsService {

  constructor(private http: HttpClient) { }
  solicitarTransicion(document_id: number, action_type_id: number) {
    const uri = `${environment.urlGetButtonTransition}/${document_id}/${action_type_id}`
    return this.http.get<GetTransitionsResponse>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  getTransitionEvents(transition_target_id: number, action_type_id: number, transition_id: number) {
    const uri = `${environment.urlGetEventsTransition}/${transition_target_id}/${action_type_id}/${transition_id}`
    return this.http.get<GetTransitionTargetEvent>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
  validaRolCliente(id: number) {
    console.log('VALIDADO')
    console.log(id)
    return true
  }
  validaRolSolucredit(id: number) {
    console.log('VALIDADO')
    console.log(id)
    return true
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
  getCaminos(transition_id: number) {
    const uri = `${environment.urlGetButtonTransition}/target/${transition_id}`
    return this.http.get<GetTransitionTarget>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        console.log('ENTRE')
        return response.body.data
      })
    )
  }
  getActivity(request_id: number) {
    const uri = `${environment.urlGetButtonTransition}/action/${request_id}`
    return this.http.get<any>(uri, HTTPOPTIONS).pipe(
      map((response) => {
        return response.body.data
      })
    )
  }
}
