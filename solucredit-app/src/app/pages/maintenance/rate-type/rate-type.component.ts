import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DeleteAlertService } from '../../../services/alerts/delete-alert.service'
import { map, catchError } from 'rxjs/operators';
import { PaginationTableData } from 'src/app/interfaces/ui/pagination-table.interface';
import { RateType } from 'src/app/models/ratetype.model';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { RateTypeService } from 'src/app/services/Maintenance/rate-type.service';

import { of } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-rate-type',
  templateUrl: './rate-type.component.html',
  styleUrls: ['./rate-type.component.scss']
})
export class RateTypeComponent implements OnInit, OnDestroy {
  exampleName = "Ej. Equipo";
  exampleDesc = "Ej. Servicio de Ventas";
  spanNameMessage = `El nombre de tipo de tasa es requerido.`
  dataList: PaginationTableData = {
    metadata: [
      "No.",
      "Nombre",
      "Descripción",
      "Acciones"
    ],
    data: []
  }
  pageSize = 10;
  selectUser;
  actualRateType;
  totalData: number;
  selectedRateType: any;
  page = 1;
  constructor(
    private autorization: AuthorizationService,
    private _service: RateTypeService,
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
  newRateTypeForm = new FormGroup({
    id_ratetype: new FormControl(null),
    ratetype_name: new FormControl('', [Validators.required]),
    ratetype_description: new FormControl('', [Validators.required]),
  })

  async ngOnInit() {
    this.pageSize = 10;
    this.selectUser = "";
    this.spinner.show() 
    this._service.getRateType(this.pageSize, 0, this.selectUser).toPromise().then((ratetype) => {
      this.dataList.data = ratetype.ratetype;
      this.totalData = ratetype.count;
      console.log(this.dataList)
      this.spinner.hide()
    }).catch((e) => {
      this.spinner.hide()
      this.toastr.error('error', 'Ocurrio un problema' + e.message);
      this.spinner.hide()
    })
  }
  canCreateDis(): boolean {
    let resource = 'CLIENT';
    //CAMBIAR LOS PERMISOS TODO 
    return this.autorization.havePermission(resource, 'CREATE_DEB')
  }
  getRateType(searchItem) {

    this._service.getRateType(this.pageSize, (this.page - 1) * this.pageSize, searchItem).pipe(
      map((ratetype) => {
        this.dataList.data = ratetype.ratetype;
        this.totalData = ratetype.count;
      }),
      catchError((err) => {
        console.log(err)
        return of();
      })
    ).subscribe();
  }
  setDataForm() {
    this.newRateTypeForm.controls['id_ratetype'].setValue(this.actualRateType.id_ratetype)
    this.newRateTypeForm.controls['ratetype_name'].setValue(this.actualRateType.ratetype_name)
    this.newRateTypeForm.controls['ratetype_description'].setValue(this.actualRateType.ratetype_description)
  }
  async showAlertDelete(ratetype) {
    const result = await this.delete_alert.showAlert()
    if (result.confirmed) {
      this._service.deleteRateType(ratetype, result.message).pipe(
        map((resp) => {
          this.toastr.success('Éxito', 'Eliminado satisfactoriamente')
          this.getRateType(this.selectUser);
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
  canEditDeb(): boolean {
    let resource = 'CLIENT';
    return this.autorization.havePermission(resource, 'EDIT_DEB');
  }
  canSeeDeb(): boolean {
    let resource = 'CLIENT';
    return this.autorization.havePermission(resource, 'SEE_DEB');
  }
  canListDeb(): boolean {
    let resource = 'CLIENT';
    return this.autorization.havePermission(resource, 'LIST_DEB');
  }
  searchTerm() {
    this.getRateType(this.search.controls.q.value);
  }
  canListDis(): boolean {
    let resource = 'CLIENT';
    return this.autorization.havePermission(resource, 'LIST_DEB');
  }
  canDeleteDeb(): boolean {
    let resource = 'CLIENT';
    return this.autorization.havePermission(resource, 'DEL_DEB');
  }
  closeBtnClick() {
    this.modalService.dismissAll();
  }
  openModal(targetModal) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: "static",
      keyboard: false,
      size: "xl",
      windowClass: 'my-modal'
    });
  }
  pageChange(e) {
    //console.log(e);
    this.getRateType(this.selectUser);
  }
  openCreate(target) {
    this.newRateTypeForm.reset();
    this.openModal(target)
  }
  ///CRUD
  onCreate() {
    let newRateType: RateType = {
      ratetype_name: this.newRateTypeForm.controls.ratetype_name.value,
      ratetype_description: this.newRateTypeForm.controls.ratetype_description.value
    };
    let subscription = this._service.saveRateType(newRateType).pipe(
      map((resp) => {
        this.closeBtnClick();
        this.newRateTypeForm.reset({})
        this.getRateType(this.selectUser);
        this.toastr.success('Éxito', 'El Tipo de Tasa fue Creado con Éxito.');
        this.ngOnInit()
      }),
      catchError((err) => {
        //this.spinner.hide();
        this.toastr.error('error', 'Ocurrio un error');
        //console.log(err);
        return of();
      })
    ).subscribe(() => subscription.unsubscribe());
  }
  saveChanges() {
    this._service.updateRateType(this.newRateTypeForm.value).pipe(
      map((resp) => {
        this.toastr.success('Éxito', 'El desembolso fue modificada con éxito.')
        this.getRateType(this.selectUser)
        this.closeBtnClick();
      }),
      catchError((err) => {
        this.toastr.error('error', 'Ocurrio un problema' + err.message);
        //console.log(err);
        this.closeBtnClick();
        return of();
      })
    ).subscribe()
  }
  show(target, ratetype) {
    this.actualRateType = ratetype;
    this.openModal(target)
  }
  edit(targetmodal, ratetype) {
    this.actualRateType = ratetype;
    this.setDataForm()
    this.openModal(targetmodal);
  }
  resource = 'RATE_TYPE'
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
