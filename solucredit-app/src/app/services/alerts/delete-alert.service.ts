import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class DeleteAlertService {
  titleMessage = '¿Está seguro que desea eliminar este registro?'
  textMessage = 'Los cambios no se pueden revertir. Se está registrando los eventos en bitácora'
  icon: "warning"
  confirmBurronColor: "red"
  cancelButtonColor: "#6c6c6c"
  confirmButtonText = 'Eliminar'
  cancelButtonText = 'Cancelar'
  customclass = {
    customClass: {
      confirmButton: 'btn btn-danger waves-effect waves-light',
      cancelButton: 'btn btn-raised mr-1 text-white btn btn-secondary'
    },
    buttonsStyling: false
  }

  constructor() { }
  async showAlert() {
    const swalwithbootstrap = Swal.mixin(this.customclass)
    return await swalwithbootstrap.fire({
      title: this.titleMessage,
      text: this.textMessage,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.confirmBurronColor,
      cancelButtonColor: this.cancelButtonColor,
      confirmButtonText: this.confirmButtonText,
      cancelButtonText: this.cancelButtonText,
      input: 'textarea',
      inputValidator: (value) => {
        if (!value) {
          return 'El comentario es requerido'
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        return { message: result.value, confirmed: true }
      } else {
        return { message: result.value, confirmed: false }
      }
    })
  }
  close() {
    Swal.close()
  }
  async showAlertReturnAction(action: string, description: string) {
    const swalwithbootstrap = Swal.mixin(this.customclass)
    const message = `Descripción: ${description}`
    return await swalwithbootstrap.fire({
      title: `Reasignación de área (${action})`,
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.confirmBurronColor,
      cancelButtonColor: this.cancelButtonColor,
      confirmButtonText: 'Aceptar',
      cancelButtonText: this.cancelButtonText,
      input: 'textarea',
      inputValidator: (value) => {
        if (!value) {
          return 'El comentario es requerido'
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        return { message: result.value, confirmed: true }
      } else {
        return { message: result.value, confirmed: false }
      }
    })
  }
}
