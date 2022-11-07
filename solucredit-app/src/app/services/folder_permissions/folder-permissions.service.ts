import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class FolderPermissionsService {
  dataPermission = [
    {
      id: 0,
      name: "Escritura",
      rule: "w"
    },
    {
      id: 1,
      name: "Lectura y Escritura",
      rule: "rw"
    },
    {
      id: 2,
      name: "Lectura",
      rule: "r"
    },
    {
      id: 3,
      name: "Eliminación",
      rule: 'd'
    },
    {
      id: 4,
      name: "Lectura y Eliminación",
      rule: 'rd'
    },
    {
      id: 5,
      name: "Escritura y Eliminación",
      rule: 'wd'
    },
    {
      id: 6,
      name: 'Todos los permisos (Lectura,Escritura y Eliminación)',
      rule: 'rwd'
    }
  ]
  constructor(

  ) { }
  getPermissions() {
    return this.dataPermission
  }
  showCantDeleteFolder() {
    Swal.fire(
      'Error',
      'No cuenta con los permisos suficientes para eliminar carpetas',
      'warning'
    )
  }
  showCantCreateDocuments() {
    Swal.fire(
      'Error',
      'No cuenta con los permisos suficientes para crear documentos',
      'warning'
    )
  }
  showCantSeeDocuments() {
    Swal.fire(
      'Error',
      'No cuenta con los permisos suficientes para ver documentos',
      'warning'
    )
  }
  showCantDeleteDocuments() {
    Swal.fire(
      'Error',
      'No cuenta con los permisos suficientes para eliminar documentos',
      'warning'
    )
  }
  showCantDownloadDocuments(){
    Swal.fire(
      'Error',
      'No cuenta con los permisos suficientes para descargar documentos',
      'warning'
    )
  }
  showCantWriteDocuments(){
    Swal.fire(
      'Error',
      'No cuenta con los permisos suficientes para editar documentos',
      'warning'
    )
  }
  showCantEditFolders(){
    Swal.fire(
      'Error',
      'No cuenta con los permisos suficientes para editar carpetas',
      'warning'
    )
  }

}
