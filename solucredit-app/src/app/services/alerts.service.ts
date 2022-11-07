import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
  ) { }
  documentCreated() {
    this.toastr.success('El documento ha sido creado satisfactoriamente', 'Información Guardada')
    this.spinner.hide()
  }
  documentUpdated() {
    this.toastr.success('El documento ha sido actualizado satisfactoriamente', 'Información Actualizada')
    this.spinner.hide()
  }
  errorCreatedDocument(error) {
    this.toastr.error(error.message, 'Error en el servidor')
    this.spinner.hide()
  }
  successDownloadDocuments() {
    this.toastr.success('Éxito', 'Se han descargado los documentos')

  }
  successAnalysisCompleted() {
    this.toastr.success('Se ha completado el análisis', 'Análisis Completado');
  }
  warningSuspendedAnalysis() {
    this.toastr.warning('Verifique los documentos y cuando sean correctos, vuelva a activar el análisis', 'Análisis suspendido');
  }
  notFoundManagementAct() {
    this.toastr.info('Aun no se genera el informe de acta de gerencia. Debe de generarlo en el apartado de gerencia general.', 'Reporte no generado.')
  }
}
