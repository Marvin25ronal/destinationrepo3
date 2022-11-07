import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TransitionTargetEventConditionName, TransitionTargetEventTriggerName, TransitionTargetEventValidationName } from 'src/Utils/WFConstants';
import { ButtonsService } from './buttons.service';
import { HistoryService } from './history.service';
import { TriggersService } from './triggers.service';
import { ValidatorsService } from './validators.service';
@Injectable({
  providedIn: 'root'
})
export class HandlerFunctionService {
  document_id: number
  params: any[]
  constructor(
    private _buttonService: ButtonsService,
    private toastr: ToastrService,
    private _triggerService: TriggersService,
    private _historyService: HistoryService,
    private _validatorService: ValidatorsService
  ) {

  }
  async handler(function_name: string, document_id: number, params: any[]) {
    this.document_id = document_id;
    this.params = params
    const reloaddata = this.params['@refresh_data']
    let val = await eval('this.' + this.replaceValues(function_name))

    //Params se va a hacer uso unicamente los parametros que se necesitan en una funcion 
    //tienen que ir en orden de como se van a ir utilizando
    return val
  }
  async solicitudTransicion() {
    //En esta funcion tenemos que mandar a traer todas las transiciones disponibles para luego evaluar cada una de ellas
    this._buttonService.solicitarTransicion(this.document_id, this.params['@action_type_id']).toPromise().then(
      async (response) => {
        //luego de solicitarlo necesitamos hacer la busqueda
        console.log(response)
        //Por cada una de las transiciones se puede ir a otro nodo, se evaluan uno por uno encontrando un camino disponible
        let crash = false
        let executed = false
        let transicionejecutada = false

        for (let i = 0; i < response.length && transicionejecutada == false; i++) {
          // if (crash)
          //   return
          //A ESTE NIVEL TENEMOS LAS TRANSICIONES
          //NECESITAMOS OBTENER FLOS CAMINOS POR CADA TRANSICION
          
          let transition = response[i]
          await this._buttonService.getCaminos(transition.wf_transition_id).toPromise().then(
            async (response) => {
              let caminos = response
              
              for (let w = 0; w < caminos.length && executed == false; w++) {
                let camino = caminos[w]
                await this._buttonService.getTransitionEvents(camino.wf_transition_target_id, this.params['@action_type_id'], transition.wf_transition_id).toPromise().then(
                  async (events) => {
                    
                    let iterar = false
                    let dataHistory = this.params['@history_data']
                    //Con los eventos tenemos que recorrer unicamente los que son condiciones
                    //Si la condicion retorna false se interrumpe y se cambia
                    //Filtramos las condiciones 
                    console.log('CONDITIONS')
                    let conditions = events.filter(event => event.eventt.name == TransitionTargetEventConditionName)
                    if (conditions.length == 0 && this.params['@wf_action_type_id'] != 2) {
                      //No tiene condiciones se debe de mostrar error
                      this.toastr.error('Una de las transiciones no tiene condicion', 'Error cofiguración')
                      return
                    }
                    conditions = conditions.sort((a, b) => {
                      if (a.wgTTE.priority < b.wgTTE.priority) {
                        return -1
                      }
                      if (a.wgTTE.priority > b.wgTTE.priority) {
                        return 1
                      }
                      return 0
                    })
                    let allConditionsTrue = []
                    //CONDICIONES------------------------------------------------------------------------------------------------------
                    for (let j = 0; j < conditions.length; j++) {
                      //Tenemos que evaluar las condiciones
                      // Si retorna false le damos continue

                      this.params['@transition_target_event_id'] = conditions[j].wgTTE.wf_transition_target_event_id
                      this.params['@transition_target_id'] = conditions[j].wgTTE.wf_transition_target_id
                      //this.params['@wf_activity_status_id_source']=conditions[j].wgTTE
                      try {
                        let val = await eval('this._buttonService.' + this.replaceValues(conditions[j].wgTTE.function_name))
                        console.log(val)
                        if (val == true) {
                          //Quiere decir que todo bien
                          let condition = conditions[i]
                          // this.toastr.success('Éxito', `Condición ${condition.wgTTE.name}`)
                          //this.grabar(dataHistory, condition, 'éxito', 'Éxito', 'CONDICIÓN')
                        } else if (val == false) {
                          //Quiere decir que fallo
                          let condition = conditions[i]
                          if (condition.wgTTE.is_mandatory_pass == 0) {
                            //Warning
                            //this.toastr.warning('Advertencia', `Condición ${condition.wgTTE.name}`)
                            //this.grabar(dataHistory, condition, 'advertencia', 'Advertencia', 'CONDICIÓN')
                          } else {
                            //this.toastr.error('Error', `Condición ${condition.wgTTE.name}`)
                            // this.grabar(dataHistory, condition, 'error', 'Error', 'CONDICIÓN')
                          }
                        }
                        if (val != undefined) {
                          allConditionsTrue.push(val)
                        }
                      }
                      catch (e) {
                        console.log(e)
                        this.toastr.error('No se puede encontrar la funcion', 'Error configuración')
                        crash = true
                        return
                      }
                    }
                    let alltrue = allConditionsTrue.filter(item => item != true)
                    if (alltrue.length > 0) {
                      console.log('CAMBIANDO DE CAMINO, CONDICION NO TIENE TRUE')
                      //necesito iterar
                      iterar = true
                    }
                    if (!iterar) {
                      //VALIDATORS
                      let validators = events.filter(event => event.eventt.name == TransitionTargetEventValidationName);
                      validators = validators.sort((a, b) => {
                        if (a.wgTTE.priority < b.wgTTE.priority) {
                          return -1
                        }
                        if (a.wgTTE.priority > b.wgTTE.priority) {
                          return 1
                        }
                        return 0
                      })
                      //ejecutamos los validators
                      for (let j = 0; j < validators.length; j++) {
                        if (crash)
                          return
                        let validator = validators[j]

                        this.params['@activity_name'] = validator.wgTTE.name
                        this.params['@activity_description'] = validator.wgTTE.description
                        
                        try {
                          let val = await eval('this._validatorService.' + this.replaceValues(validator.wgTTE.function_name))
                          if (val == true) {
                            this.toastr.success('Éxito', `Validación ${validator.wgTTE.name}`)
                            this.grabar(dataHistory, validator, 'éxito', 'Éxito', 'VALIDACIÓN')
                          } else if (val == undefined) {
                            //no hacemos nada por si queremos almacenar el registro
                            crash = true
                            return
                          }
                          else {
                            //Con la validacion ya no se puede continuar unicamente si es mandatory
                            if (validator.wgTTE.is_mandatory_pass == 0) {
                              this.toastr.warning('Éxito', `Validación ${validator.wgTTE.name}`)
                              this.grabar(dataHistory, validator, 'advertencia', 'Advertencia', 'VALIDACIÓN')
                            } else {
                              this.toastr.error('Error', `Validación ${validator.wgTTE.name}`)
                              this.grabar(dataHistory, validator, 'error', 'Error', 'VALIDACIÓN')
                              crash = true
                            }
                          }
                        } catch (e) {
                          this.toastr.error('No se puede encontrar la funcion validator', 'Error configuración')
                          crash = true
                          return
                        }

                      }


                      let triggers = events.filter(event => event.eventt.name == TransitionTargetEventTriggerName)
                      if (triggers.length) {
                        triggers = triggers.sort((a, b) => {
                          if (a.wgTTE.priority < b.wgTTE.priority) {
                            return -1
                          }
                          if (a.wgTTE.priority > b.wgTTE.priority) {
                            return 1
                          }
                          return 0
                        })
                      }
                      //SI LLEGAMOS A ESTA PARTE TENEMOS QUE EVALUAR LAS VALIDACIONES Y LOS TRIGGERS
                      console.log('PASAMOS')
                      //TRIGGERS
                      console.log(triggers)

                      //RECARGAR VISTA DEL COMPONENTE PARA MOSTRAR LA NUEVA INFORMACION
                      //DISPARADORES------------------------------------------------------------------------------------------------------------------------------------
                      let reloaddata = this.params['@refresh_data']
                      for (let j = 0; j < triggers.length; j++) {

                        //para tener la ejecucion dinamica y no perder la referencia se va a hacer uso de la llamada a funcion con los parametros
                        //En esta seccion se le agregan los parametros necesarios
                        if (crash)
                          return
                        let trigger = triggers[j]
                        this.params['@target_event_id'] = trigger.wgTTE.wf_transition_target_id
                        this.params['@transition_target_event_id'] = trigger.wgTTE.wf_transition_target_event_id

                        //TERMINAMOS DE AGREGAR LOS PARAMETROS PARA ESTA PARTE
                        //mandamos a ejecutar la funcion 
                        this.params['@activity_name'] = trigger.wgTTE.name
                        this.params['@activity_description'] = trigger.wgTTE.description
                        try {
                          let val = await eval('this._triggerService.' + this.replaceValues(trigger.wgTTE.function_name))
                          console.log(val)
                          if (val == true) {
                            this.toastr.success('Éxito', `Disparador ${trigger.wgTTE.name}`)
                            this.grabar(dataHistory, trigger, 'éxito', 'Éxito', 'DISPARADOR')
                          } else if (val == undefined) {
                            //no hacemos nada por si queremos almacenar el registro
                            crash = true
                            return
                          }
                          else {
                            if (trigger.wgTTE.is_mandatory_pass == 0) {
                              this.toastr.warning('Éxito', `Disparador ${trigger.wgTTE.name}`)
                              this.grabar(dataHistory, trigger, 'advertencia', 'Advertencia', 'DISPARADOR')
                            } else {
                              this.toastr.error('Error', `Disparador ${trigger.wgTTE.name}`)
                              this.grabar(dataHistory, trigger, 'error', 'Error', 'DISPARADOR')
                              crash = true
                            }
                          }
                        } catch (e) {
                          this.toastr.error('No se puede encontrar la funcion disparador', 'Error configuración')
                          crash = true
                          return
                        }
                      }
                      executed = true
                      this.refreshData()
                    }


                  }
                )
                console.log('AA')
              }
            }
          )

        }
        let spinner = this.params['@spinner']
        spinner.hide()
      }
    ).catch((e) => {
      console.log(e)
      this.toastr.error('No se encontraron ningun tipo de transiciones', 'Error configuración')
    })
  }
  grabar(dataHistory, condition, type, name_type, event_type) {
    this._historyService.recordHistory(dataHistory,
      condition.wgTTE.name,
      condition.wgTTE.description,
      event_type,
      `${name_type} en evento ${condition.wgTTE.name}`,
      type,
      condition.wgTTE.is_mandatory_pass,
    ).toPromise().then(() => {
      console.log(`${event_type} GRABADA`)
    }).catch(() => {
      console.log(`${event_type} CONDICION NO GRABADA`)
    })
  }

  replaceValues(function_name: string) {
    let name = function_name
    if (name.includes('@userId')) {
      name = name.replace('@userId', '1')
    }
    if (name.includes('@document_id')) {
      name = name.replace('@document_id', this.document_id.toString())
    }
    if (name.includes('@target_event_id')) {
      name = name.replace('@target_event_id', this.params['@target_event_id'])
    }
    if (name.includes('@refresh_data')) {
      name = name.replace('@refresh_data', 'reloaddata')
    }
    if (name.includes('@activity_name')) {
      name = name.replace('@activity_name', "'" + this.params['@activity_name'] + "'")
    }
    if (name.includes('@request_id')) {
      name = name.replace('@request_id', this.params['@request_id'])
    }
    if (name.includes('@transition_target_event_id')) {
      name = name.replace('@transition_target_event_id', this.params['@transition_target_event_id'])
    }
    if (name.includes('@option_name')) {
      name = name.replace('@option_name', "'" + this.params['@option_name'] + "'")
    }
    if (name.includes('@transition_target_id')) {
      name = name.replace('@transition_target_id', this.params['@transition_target_id'])
    }
    if (name.includes('@activity_description')) {
      name = name.replace('@activity_description', "'" + this.params['@activity_description'] + "'")
    }
    if (name.includes('@user_id')) {
      name = name.replace('@user_id', this.params['@user_id'])
    }
    return name
  }

  refreshData() {
    let function_refresh = this.params['@refresh_data']
    let spinner = this.params['@spinner']
    spinner.hide()
    function_refresh()
  }
  despliegaBitacora(document_id: number) {
    let show = this.params['@open_modal']
    console.log(document_id);
    show()
  }
  cambioDeActividad(document_id: number, target_event_id: number, reloaddata: any) {
    this._triggerService.cambioDeActividad(document_id, target_event_id, reloaddata)
  }
  activityDocumentSetStatus(document_id: number, wf_activity_target_status: number, reloaddata: any, option_name: string) {
    let history = this.params['@history_data']
    this._triggerService.activityDocumentSetStatus(document_id, wf_activity_target_status, reloaddata, option_name, history)
  }
}
