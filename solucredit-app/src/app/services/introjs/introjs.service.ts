import { Injectable } from '@angular/core';
import * as introJs from 'intro.js/intro.js';
@Injectable({
  providedIn: 'root'
})
export class IntrojsService {
  private introJs = null;
  constructor() { }
  example() {
    this.introJs = introJs();
    this.introJs.start();
    this.introJs.setOptions({
      tooltipClass: 'customTooltip',
      nextLabel: 'Siguiente',
      prevLabel: 'Anterior',
      doneLabel: 'Finalizar',
      steps: [
        {
          element: "#step1",
          title: 'Welcome',
          intro: "This is the first step"
        }
      ]
    }).onbeforeexit(() => {
      //metodo al cerrar
    }).start()
  }
  showSendRequirements() {
    this.introJs = introJs();
    this.introJs.setOptions({
      tooltipClass: 'customTooltip',
      nextLabel: 'Siguiente',
      prevLabel: 'Anterior',
      doneLabel: 'Finalizar',
      steps: [
        {
          element: '#directivebuttons',
          title: 'Enviar requerimientos',
          intro: 'En esta sección podrá enviar sus requerimientos a el equipo de solucredit'
        }
      ]
    }).start()
  }
  customerWalkthrough(dontshow = false) {
    this.introJs = introJs();
    this.introJs.setOptions({
      tooltipClass: 'customTooltip',
      nextLabel: 'Siguiente',
      prevLabel: 'Anterior',
      doneLabel: 'Finalizar',
      dontShowAgain: dontshow,
      dontShowLabel: 'No volver a mostrar',
      steps: [
        {
          element: '#sidebarnav',
          title: 'Menú',
          intro: 'En esta sección podrá acceder a las diferentes secciones de la aplicación'
        },
        {
          element: '#customerinformation',
          title: 'Información del cliente',
          intro: 'En esta sección podrá ver la información del cliente'
        },
        {
          element: '#editcustomerbutton',
          title: 'Editar información del cliente',
          intro: 'En esta sección podrá editar la información del cliente y completar los campos que faltan'
        },
        {
          element: '#relationstatus',
          title: 'Estado de la relación',
          intro: 'En esta sección podrá ver el estado de la relación con el cliente'
        },
        {
          element: '#step1',
          title: 'Flujo de solicitud',
          intro: 'En esta sección podrá ver el flujo de la solicitud en la que se encuentra la solicitud'
        },
        {
          element: '#steperbuttons',
          title: 'Acciones',
          intro: 'Seleccione la acción que desea realizar'
        },
        {
          element: '#verificationstepperbutton',
          title: 'Verificaciones',
          intro: 'En esta sección podrá verificar los datos del cliente'
        },
        {
          element: '#documentstepperbutton',
          title: 'Documentos',
          intro: 'En esta sección podrá ver los documentos que se han cargado y los que faltan por cargar'
        },
        {
          element: '#formstepperbutton',
          title: 'Formularios',
          intro: 'En esta sección podrá ingresar los datos de los formularios'
        },
        {
          element: '#requirementstepperbutton',
          title: 'Requerimientos',
          intro: 'En esta sección podrá ver los requerimientos que se han cargado y los que faltan por cargar'
        },
        {
          element: '#uploadformstepperbutton',
          title: 'Formularios',
          intro: 'En esta sección podrá ver los formularios que se han cargado y los que faltan por cargar'
        }
      ]
    }).start()
  }
  customerUploadDocuments(dontshow = false) {
    this.introJs = introJs();
    this.introJs.setOptions({
      tooltipClass: 'customTooltip',
      nextLabel: 'Siguiente',
      prevLabel: 'Anterior',
      doneLabel: 'Finalizar',
      dontShowAgain: dontshow,
      dontShowLabel: 'No volver a mostrar',
      steps: [
        {
          element: '#createbuttons',
          title: 'Crea tu estructura de la solicitud',
          intro: 'En esta sección podrá crear la estructura de la solicitud agregando a las personas que participan en la solicitud'
        },
        {
          element:'#uploaddocuments',
          title: 'Carga tus documentos',
          intro: 'En esta sección podrá cargar los documentos de la solicitud'
        },
        {
          element: '#senddocuments',
          title: 'Envía tus documentos',
          intro: 'En esta sección podrá enviar los documentos de la solicitud'
        }
      ]
    }).start()
  }
}
