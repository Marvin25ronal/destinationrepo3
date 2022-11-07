import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DeleteAlertService } from '../../../services/alerts/delete-alert.service'
import { map, catchError } from 'rxjs/operators';
import { PaginationTableData } from 'src/app/interfaces/ui/pagination-table.interface';
import { ProductType } from 'src/app/models/producttype.model';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ProductTypeService } from 'src/app/services/Maintenance/product-type.service';
import { of } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.scss']
})
export class ProductTypeComponent implements OnInit, OnDestroy {
  exampleName = "Ej. Servicio";
  spanNameMessage = `El Nombre del Tipo de Producto es Requerido.`
  dataList: PaginationTableData = {
    metadata: [
      "No.",
      "Tipo de Producto",
      "Acciones"
    ],
    data: []
  }
  pageSize = 10;
  selectUser;
  actualProductType;
  totalData: number;
  selectedProductType: any;
  page = 1;
  constructor(
    private autorization: AuthorizationService,
    private _service: ProductTypeService,
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
  newProductTypeForm = new FormGroup({
    id_producttype: new FormControl(null),
    producttype_name: new FormControl('', [Validators.required])
  })
  async ngOnInit() {
    //LISTAR TODOS LOS TIPOS DE DESEMBOLSOS
    this.pageSize = 10;
    this.selectUser = "";
    this.spinner.show()
    await this._service.getProductTypes(this.pageSize, 0, this.selectUser).toPromise().then((producttype) => {
      this.dataList.data = producttype.producttype;
      this.totalData = producttype.count;
      console.log(this.dataList)
      this.spinner.hide()
    }).catch((e) => {
      this.spinner.hide()
      this.toastr.error('error', 'Ocurrio un problema' + e.message);
    })
  }
  canCreateDis(): boolean {
    let resource = 'CLIENT';
    //CAMBIAR LOS PERMISOS TODO 
    return this.autorization.havePermission(resource, 'CREATE_DEB')
  }
  getProductType(searchItem) {

    this._service.getProductTypes(this.pageSize, (this.page - 1) * this.pageSize, searchItem).pipe(
      map((producttype) => {
        this.dataList.data = producttype.producttype;
        this.totalData = producttype.count;
      }),
      catchError((err) => {
        console.log(err)
        return of();
      })
    ).subscribe();
  }

  setDataForm() {
    this.newProductTypeForm.controls['producttype_name'].setValue(this.actualProductType.producttype_name)
    this.newProductTypeForm.controls['id_producttype'].setValue(this.actualProductType.id_producttype)
  }
  async showAlertDelete(producttype) {
    const result = await this.delete_alert.showAlert()
    if (result.confirmed) {
      this._service.deleteProductType(producttype, result.message).pipe(
        map((resp) => {
          this.toastr.success('Éxito', 'Eliminado satisfactoriamente')
          this.getProductType(this.selectUser);
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
    this.getProductType(this.search.controls.q.value);
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
    this.getProductType(this.selectUser);
  }
  openCreate(target) {
    this.newProductTypeForm.reset();
    this.openModal(target)
  }
  ///CRUD
  onCreate() {
    let newProductType: ProductType = {
      producttype_name: this.newProductTypeForm.controls.producttype_name.value,
    };
    let subscription = this._service.saveProductType(newProductType).pipe(
      map((resp) => {
        this.closeBtnClick();
        this.newProductTypeForm.reset({})
        this.getProductType(this.selectUser);
        this.toastr.success('Éxito', 'El Tipo de Producto fue Creado con Éxito.');
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
    this._service.updateProductType(this.newProductTypeForm.value).pipe(
      map((resp) => {
        this.toastr.success('Éxito', 'El Tipo de Producto fue Modificado con Éxito.')
        this.getProductType(this.selectUser)
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
  show(target, producttype) {
    this.actualProductType = producttype;
    this.openModal(target)
  }
  edit(targetmodal, producttype) {
    this.actualProductType = producttype;
    this.setDataForm()
    this.openModal(targetmodal);
  }
  resource = 'PRODUCT_TYPE'
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
