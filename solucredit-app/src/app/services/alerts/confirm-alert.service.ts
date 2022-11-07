import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})

export class ConfirmAlertService {
  titleMessage = 'Advertencia'
  textMessage = '¿Desea Completar el Análisis?, Se notificará a la etapa siguiente del proceso que ha sido completada esta etapa'
  icon: "question"
  confirmBurronColor: "green"
  cancelButtonColor: "#6c6c6c"
  confirmButtonText = 'Si'
  cancelButtonText = 'No'
  customclass = {
    customClass: {
      confirmButton: 'btn btn-info waves-effect waves-light',
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
    }).then((result) => {
      if (result.isConfirmed) {
        return { message: result.value, confirmed: true }
      } else {
        return { message: result.value, confirmed: false }
      }
    })
  }
  async showAlert2(title, text) {
    const swalwithbootstrap = Swal.mixin(this.customclass)
    return await swalwithbootstrap.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.confirmBurronColor,
      cancelButtonColor: this.cancelButtonColor,
      confirmButtonText: this.confirmButtonText,
      cancelButtonText: this.cancelButtonText,
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
  async confirmDownloadLetterData() {
    const swalwithbootstrap = Swal.mixin(this.customclass)
    return await swalwithbootstrap.fire({
      title: 'Advertencia',
      text: '¿Los datos ingresados son correctos?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.confirmBurronColor,
      cancelButtonColor: this.cancelButtonColor,
      confirmButtonText: this.confirmButtonText,
      cancelButtonText: this.cancelButtonText,
    }).then((result) => {
      if (result.isConfirmed) {
        return { message: result.value, confirmed: true }
      } else {
        return { message: result.value, confirmed: false }
      }
    })
  }
}