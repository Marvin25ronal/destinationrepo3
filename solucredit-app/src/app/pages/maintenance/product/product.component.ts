import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DeleteAlertService } from '../../../services/alerts/delete-alert.service'
import { map, catchError } from 'rxjs/operators';
import { PaginationTableData } from 'src/app/interfaces/ui/pagination-table.interface';
import { Product } from 'src/app/models/product.model';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ProductService } from 'src/app/services/Maintenance/product.service';
import { ProductTypeService } from 'src/app/services/Maintenance/product-type.service';
import { of } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  exampleName = "Ej. Equipo";
  exampleDesc = "Ej. Servicio de Ventas";
  spanNameMessage = `El nombre de desembolso es requerido.`
  dataList: PaginationTableData = {
    metadata: [
      "No.",
      'Código',
      "Producto",
      "Tipo Producto",
      "Acciones"
    ],
    data: []
  }
  pageSize = 10;
  selectUser;
  actualProduct;
  totalData: number;
  selectedProduct: any;
  page = 1;
  dataProductType: any[];
  constructor(
    private autorization: AuthorizationService,
    private _service: ProductService,
    private _serviceT: ProductTypeService,
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
  newProductForm = new FormGroup({
    id_product: new FormControl(null),
    product_code: new FormControl('', [Validators.required]),
    product_name: new FormControl('', [Validators.required]),
    product_type: new FormControl(),
    product_description: new FormControl('', [Validators.required]),
  })
  async ngOnInit() {
    this.pageSize = 10;
    this.selectUser = "";
    this.spinner.show()
    await this.getProductType();
    await this._service.getProducts(this.pageSize, 0, this.selectUser).toPromise().then((product) => {
      this.dataList.data = product.product;
      this.totalData = product.count;
      console.log(this.dataList)
    }).catch((e) => {
      this.spinner.hide()
      this.toastr.error('error', 'Ocurrio un problema' + e.message);
    })
    this._serviceT.getProductTypes(-1, -1, []).toPromise().then((productT) => {
      this.dataProductType = productT.producttype
      console.log(this.dataProductType)
      this.spinner.hide()
    }).catch((e) => {
      this.spinner.hide()
      this.toastr.error('error', 'Ocurrio un problema' + e.message);
    })
  }
  getProductType() {
    this._serviceT.getProductTypes(this.pageSize, 0, []).subscribe((c) => {
      this.dataProductType = c.producttype;
      console.log(this.dataProductType);
    })
  }
  getProductTypeName(value) {
    if (this.dataProductType === undefined) { return '' }
    let find = this.dataProductType.find((item) => item.id_producttype == value)
    return find != undefined ? find.producttype_name : ''
  }
  canCreateDis(): boolean {
    let resource = 'CLIENT';
    //CAMBIAR LOS PERMISOS TODO 
    return this.autorization.havePermission(resource, 'CREATE_DEB')
  }
  getProduct(searchItem) {

    this._service.getProducts(this.pageSize, (this.page - 1) * this.pageSize, searchItem).pipe(
      map((product) => {
        this.dataList.data = product.product;
        this.totalData = product.count;
      }),
      catchError((err) => {
        console.log(err)
        return of();
      })
    ).subscribe();
  }

  setDataForm() {
    this.newProductForm.controls['product_name'].setValue(this.actualProduct.product_name)
    this.newProductForm.controls['id_product'].setValue(this.actualProduct.id_product)
    this.newProductForm.controls['product_type'].setValue(this.actualProduct.product_type)
    this.newProductForm.controls['product_description'].setValue(this.actualProduct.product_description)
    this.newProductForm.controls['product_code'].setValue(this.actualProduct.product_code)
  }
  async showAlertDelete(product) {
    const result = await this.delete_alert.showAlert()
    if (result.confirmed) {
      this._service.deleteProduct(product, result.message).pipe(
        map((resp) => {
          this.toastr.success('Éxito', 'Eliminado satisfactoriamente')
          this.getProduct(this.selectUser);
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
    this.getProduct(this.search.controls.q.value);
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
    this.getProduct(this.selectUser);
  }
  openCreate(target) {
    this.newProductForm.reset();
    this.openModal(target)
  }
  ///CRUD
  onCreate() {
    let newProduct: Product = {
      product_name: this.newProductForm.controls.product_name.value,
      product_type: this.newProductForm.controls.product_type.value,
      product_description: this.newProductForm.controls.product_description.value,
      product_code: this.newProductForm.controls.product_code.value
    };
    let subscription = this._service.saveProduct(newProduct).pipe(
      map((resp) => {
        this.closeBtnClick();
        this.newProductForm.reset({})
        this.getProduct(this.selectUser);
        this.toastr.success('Éxito', 'El Producto fue Creado con Éxito.');
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
    this._service.updateProduct(this.newProductForm.value).pipe(
      map((resp) => {
        this.toastr.success('Éxito', 'El desembolso fue modificada con éxito.')
        this.getProduct(this.selectUser)
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
  show(target, product) {
    this.actualProduct = product;
    this.openModal(target)
  }
  edit(targetmodal, product) {
    this.actualProduct = product;
    this.setDataForm()
    this.openModal(targetmodal);
  }
  resource = 'PRODUCTS'
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
