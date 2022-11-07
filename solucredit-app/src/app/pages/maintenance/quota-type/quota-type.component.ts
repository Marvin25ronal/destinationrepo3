import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DeleteAlertService } from '../../../services/alerts/delete-alert.service'
import { map, catchError } from 'rxjs/operators';
import { PaginationTableData } from 'src/app/interfaces/ui/pagination-table.interface';
import { QuotaType } from 'src/app/models/quotatype.model';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { QuotaTypeService } from 'src/app/services/Maintenance/quota-type.service';
import { of } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-quota-type',
  templateUrl: './quota-type.component.html',
  styleUrls: ['./quota-type.component.scss']
})
export class QuotaTypeComponent implements OnInit, OnDestroy {
  exampleName = "Ej. Créditos nuevos,  Prorrogas,  Ampliaciones,  Modificaciones";
  spanNameMessage = `El Nombre del Cupo es Requerido.`
  dataList: PaginationTableData = {
    metadata: [
      "No.",
      "Cupo",
      "Acciones"
    ],
    data: []
  }
  pageSize = 10;
  selectUser;
  actualQuotaType;
  totalData: number;
  selectedQuotaType: any;
  page = 1;
  constructor(
    private autorization: AuthorizationService,
    private _service: QuotaTypeService,
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
  newQuotaTypeForm = new FormGroup({
    quota_type_id: new FormControl(null),
    quota_type_name: new FormControl('', [Validators.required])
  })
  async ngOnInit() {
    //LISTAR TODOS LOS TIPOS DE CUPO
    this.pageSize = 10;
    this.selectUser = "";
    this.spinner.show()
    await this._service.getQuotaTypes(this.pageSize, 0, this.selectUser).toPromise().then((quotatype) => {
      this.dataList.data = quotatype.quotatype;
      this.totalData = quotatype.count;
      console.log(this.dataList)
      this.spinner.hide()
    }).catch((e) => {
      this.spinner.hide()
      this.toastr.error('error', 'Ocurrio un problema' + e.message);
    })
  }
  canCreateQt(): boolean {
    let resource = 'CLIENT';
    //CAMBIAR LOS PERMISOS TODO 
    return this.autorization.havePermission(resource, 'CREATE_DEB')
  }
  getQuotaType(searchItem) {

    this._service.getQuotaTypes(this.pageSize, (this.page - 1) * this.pageSize, searchItem).pipe(
      map((quotatype) => {
        this.dataList.data = quotatype.quotatype;
        this.totalData = quotatype.count;
      }),
      catchError((err) => {
        console.log(err)
        return of();
      })
    ).subscribe();
  }
  setDataForm() {
    this.newQuotaTypeForm.controls['quota_type_name'].setValue(this.actualQuotaType.quota_type_name)
    this.newQuotaTypeForm.controls['quota_type_id'].setValue(this.actualQuotaType.quota_type_id)
  }
  async showAlertDelete(quotatype) {
    const result = await this.delete_alert.showAlert()
    if (result.confirmed) {
      this._service.deleteQuotaType(quotatype, result.message).pipe(
        map((resp) => {
          this.toastr.success('Éxito', 'Eliminado satisfactoriamente')
          this.getQuotaType(this.selectUser);
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
  canEditQt(): boolean {
    let resource = 'CLIENT';
    return this.autorization.havePermission(resource, 'EDIT_DEB');
  }
  canSeeQt(): boolean {
    let resource = 'CLIENT';
    return this.autorization.havePermission(resource, 'SEE_DEB');
  }
  canListQtl(): boolean {
    let resource = 'CLIENT';
    return this.autorization.havePermission(resource, 'LIST_DEB');
  }
  searchTerm() {
    this.getQuotaType(this.search.controls.q.value);
  }
  canListQt(): boolean {
    let resource = 'CLIENT';
    return this.autorization.havePermission(resource, 'LIST_DEB');
  }
  canDeleteQt(): boolean {
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
    this.getQuotaType(this.selectUser);
  }
  openCreate(target) {
    this.newQuotaTypeForm.reset();
    this.openModal(target)
  }
  onCreate() {
    let newQuotaType: QuotaType = {
      quota_type_name: this.newQuotaTypeForm.controls.quota_type_name.value,
    };
    let subscription = this._service.saveQuotaType(newQuotaType).pipe(
      map((resp) => {
        this.closeBtnClick();
        this.newQuotaTypeForm.reset({})
        this.getQuotaType(this.selectUser);
        this.toastr.success('Éxito', 'El Tipo de Cupo fue Creado con Éxito.');
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
    this._service.updateQuotaType(this.newQuotaTypeForm.value).pipe(
      map((resp) => {
        this.toastr.success('Éxito', 'El Tipo de Cupo fue Modificada con Éxito.')
        this.getQuotaType(this.selectUser)
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
  show(target, quotatype) {
    this.actualQuotaType = quotatype;
    this.openModal(target)
  }
  edit(targetmodal, quotatype) {
    this.actualQuotaType = quotatype;
    this.setDataForm()
    this.openModal(targetmodal);
  }
  resource = 'QUOTE_TYPE'
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
