import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DeleteAlertService } from '../../../services/alerts/delete-alert.service'
import { map, catchError } from 'rxjs/operators';
import { PaginationTableData } from 'src/app/interfaces/ui/pagination-table.interface';
import { ISR } from 'src/app/models/isr.model';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { IsrService } from 'src/app/services/Maintenance/isr.service';
import { of } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-isr',
  templateUrl: './isr.component.html',
  styleUrls: ['./isr.component.scss']
})
export class IsrComponent implements OnInit, OnDestroy {
  exampleName = "Ej. Clientes, Especiales, Nacionales";
  exampleNameC = "Ej. USD, GTQ";
  exampleNameS = "Ej. 10";
  spanNameMessage = `El Nombre de la Moneda es Requerido.`
  spanNameMessageC = `El Nombre es Requerido.`
  spanNameMessageS = `El Porcentaje es Requerido.`
  dataList: PaginationTableData = {
    metadata: [
      "No.",
      "ISR",
      "Porcentaje",
      "Acciones"
    ],
    data: []
  }
  pageSize = 10;
  selectUser;
  actualISR;
  totalData: number;
  selectedISR: any;
  page = 1;
  constructor(
    private autorization: AuthorizationService,
    private _service: IsrService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private delete_alert: DeleteAlertService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnDestroy(): void {
    if (this.modalService.hasOpenModals()) {
      this.modalService.dismissAll();
    }
    this.delete_alert.close();
  }

  search = new FormGroup({
    q: new FormControl(null),
  })
  newISRForm = new FormGroup({
    id_isr: new FormControl(null),
    isr_name: new FormControl('', [Validators.required]),
    isr_percentage: new FormControl('', [Validators.required])
  })
  async ngOnInit(){
    //LISTAR TODOS LOS TIPOS DE DESEMBOLSOS
    this.pageSize = 10;
    this.selectUser = "";
    this.spinner.show();
    await this._service.getISRList(this.pageSize, 0, this.selectUser).toPromise().then((isr) => {
      this.dataList.data = isr.isr;
      this.totalData = isr.count;
      console.log(this.dataList)
      this.spinner.hide()
    }).catch((e) => {
      this.spinner.hide()
      this.toastr.error('error', 'Ocurrio un problema' + e.message);
    })
  }
  canCreateISR(): boolean {
    let resource = 'CLIENT';
    //CAMBIAR LOS PERMISOS TODO 
    return this.autorization.havePermission(resource, 'CREATE_DEB')
  }
  getISR(searchItem) {

    this._service.getISRList(this.pageSize, (this.page - 1) * this.pageSize, searchItem).pipe(
      map((isr) => {
        this.dataList.data = isr.isr;
        this.totalData = isr.count;
      }),
      catchError((err) => {
        console.log(err)
        return of();
      })
    ).subscribe();
  }
  setDataForm() {
    this.newISRForm.controls['isr_name'].setValue(this.actualISR.isr_name)
    this.newISRForm.controls['id_isr'].setValue(this.actualISR.id_isr)
    this.newISRForm.controls['isr_percentage'].setValue(this.actualISR.isr_percentage)
  }
  async showAlertDelete(isr) {
    const result = await this.delete_alert.showAlert()
    if (result.confirmed) {
      this._service.deleteISR(isr, result.message).pipe(
        map((resp) => {
          this.toastr.success('Éxito', 'Eliminado satisfactoriamente')
          this.getISR(this.selectUser);
          this.closeBtnClick();
        }),
        catchError((err) => {
          this.toastr.error('error', 'Ocurrio un problema' + err.message);
          console.log(err);
          this.closeBtnClick();
          return of();
        })
      ).subscribe()
    }
  }
  canEditCu(): boolean {
    let resource = 'CLIENT';
    return this.autorization.havePermission(resource, 'EDIT_DEB');
  }
  canSeeCu(): boolean {
    let resource = 'CLIENT';
    return this.autorization.havePermission(resource, 'SEE_DEB');
  }
  canListCur(): boolean {
    let resource = 'CLIENT';
    return this.autorization.havePermission(resource, 'LIST_DEB');
  }
  searchTerm() {
    this.getISR(this.search.controls.q.value);
  }
  canListCu(): boolean {
    let resource = 'CLIENT';
    return this.autorization.havePermission(resource, 'LIST_DEB');
  }
  canDeleteCu(): boolean {
    let resource = 'CLIENT';
    return this.autorization.havePermission(resource, 'DEL_DEB');
  }
  closeBtnClick() {
    this.modalService.dismissAll();
  }
  openModal(targetModal) {
    console.log('Abriendo Modal');
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: "static",
      keyboard: false,
      size: "xl",
      windowClass: 'my-modal'
    });
  }
  pageChange(e) {
    this.getISR(this.selectUser);
  }
  openCreate(target) {
    this.newISRForm.reset();
    this.openModal(target)
  }
  onCreate() {
    let newISR: ISR = {
      isr_name: this.newISRForm.controls.isr_name.value,
      isr_percentage: parseInt(this.newISRForm.controls.isr_percentage.value)
    };
    let subscription = this._service.saveISR(newISR).pipe(
      map((resp) => {
        this.closeBtnClick();
        this.newISRForm.reset({})
        this.getISR(this.selectUser);
        this.toastr.success('Éxito', 'El ISR fue Creado con Éxito.');
        this.ngOnInit()
      }),
      catchError((err) => {
        //this.spinner.hide();
        this.toastr.error('error', 'Ha Ocurrido un error');
        //console.log(err);
        return of();
      })
    ).subscribe(() => subscription.unsubscribe());
  }
  saveChanges() {
    debugger
    this._service.updateISR(this.newISRForm.value).pipe(
      map((resp) => {
        this.toastr.success('Éxito', 'El ISR fue Modificada con Éxito.')
        this.getISR(this.selectUser)
        this.closeBtnClick();
      }),
      catchError((err) => {
        this.toastr.error('error', 'Ocurrio un Problema' + err.message);
        //console.log(err);
        this.closeBtnClick();
        return of();
      })
    ).subscribe()
  }
  show(target, isr) {
    this.actualISR = isr;
    this.openModal(target)
  }
  editC(targetmodal, isr) {
    console.log('Mandando Edicion ISR');
    console.log(isr);
    this.actualISR = isr;
    this.setDataForm()
    this.openModal(targetmodal);
  }
  resource = 'ISR'
  canList(): boolean {
    return this.autorization.havePermission(this.resource, 'LIST')
  }
  canEdit(): boolean {
    return this.autorization.havePermission(this.resource, 'EDIT')
  }
  canDelete(): boolean {
    return this.autorization.havePermission(this.resource, 'DELETE')
  }
  canSee(): boolean {
    return this.autorization.havePermission(this.resource, 'SEE')
  }
  canCreate(): boolean {
    return this.autorization.havePermission(this.resource, 'CREATE')
  }
}
