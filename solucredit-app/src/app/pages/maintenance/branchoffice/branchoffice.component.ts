import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DeleteAlertService } from '../../../services/alerts/delete-alert.service'
import { map, catchError } from 'rxjs/operators';
import { PaginationTableData } from 'src/app/interfaces/ui/pagination-table.interface';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ProductService } from 'src/app/services/Maintenance/product.service';
import { ProductTypeService } from 'src/app/services/Maintenance/product-type.service';
import { BranchofficeService } from 'src/app/services/Maintenance/branchoffice.service';
import { of } from 'rxjs';
import { BranchOffice } from '../../../models/branchoffice.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-branchoffice',
  templateUrl: './branchoffice.component.html',
  styleUrls: ['./branchoffice.component.scss']
})
export class BranchofficeComponent implements OnInit, OnDestroy {
  exampleID = "Ej. 01";
  exampleName = "Ej. Sucursal Ciudad Capital";
  exampleCode = "Ej. C-137";
  exampleSocialR = "Ej. Razón Social";
  spanNameMessage = `El nombre de desembolso es requerido.`
  dataList: PaginationTableData = {
    metadata: [
      "No.",
      "ID",
      "Razón Social",
      "Código",
      "Nombre",
      "Producto",
      "Acciones"
    ],
    data: []
  }
  pageSize = 10;
  selectUser;
  actualBranchOffice;
  totalData: number;
  selectedProduct: any;
  page = 1;
  dataProduct: any[];
  dataProductType: any[];
  constructor(
    private autorization: AuthorizationService,
    private _service: BranchofficeService,
    private _serviceP: ProductService,
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
  newBranchOfficeForm = new FormGroup({
    id_branchoffice: new FormControl(null),
    branchoffice_id: new FormControl('', [Validators.required]),
    branchoffice_socialr: new FormControl('', [Validators.required]),
    branchoffice_code: new FormControl('', [Validators.required]),
    branchoffice_name: new FormControl('', [Validators.required]),
    branchoffice_product: new FormControl('', [Validators.required]),
  })
  async ngOnInit() {
    this.pageSize = 10;
    this.selectUser = "";
    this.spinner.show()
    await this.getProduct();
    await this.getTProduct();
    await this._service.getBranchOffice(this.pageSize, 0, this.selectUser).toPromise().then((branchoffice) => {
      this.dataList.data = branchoffice.branchoffice;
      this.totalData = branchoffice.count;
      console.log(this.dataList)
      this.spinner.hide()
    }).catch((e) => {
      this.spinner.hide()
      this.toastr.error('error', 'Ocurrio un problema' + e.message);
    })
  }
  getProduct() {
    this._serviceP.getProducts(this.pageSize, 0, []).subscribe((c) => {
      this.dataProduct = c.product;
      console.log(this.dataProduct);
    })
  }
  getTProduct() {
    this._serviceT.getProductTypes(this.pageSize, 0, []).subscribe((c) => {
      this.dataProductType = c.producttype;
      console.log(this.dataProductType);
    })
  }
  getProductN(value) {
    if (this.dataProduct === undefined) { return '' }
    let find = this.dataProduct.find((item) => item.id_producttype == value)
    return find != undefined ? find.product_name : ''
  }
  getProductD(value) {
    if (this.dataProduct === undefined) { return '' }
    let find = this.dataProduct.find((item) => item.id_producttype == value)
    return find != undefined ? find.product_description : ''
  }
  getProductT(value) {
    if (this.dataProductType === undefined) { return '' }
    let find = this.dataProductType.find((item) => item.id_producttype == value)
    return find != undefined ? find.producttype_name : ''
  }
  canCreateDis(): boolean {
    let resource = 'CLIENT';
    //CAMBIAR LOS PERMISOS TODO 
    return this.autorization.havePermission(resource, 'CREATE_DEB')
  }
  getBranchOffice(searchItem) {

    this._service.getBranchOffice(this.pageSize, (this.page - 1) * this.pageSize, searchItem).pipe(
      map((branchoffice) => {
        this.dataList.data = branchoffice.branchoffice;
        this.totalData = branchoffice.count;
      }),
      catchError((err) => {
        console.log(err)
        return of();
      })
    ).subscribe();
  }
  setDataForm() {
    this.newBranchOfficeForm.controls['id_branchoffice'].setValue(this.actualBranchOffice.id_branchoffice)
    this.newBranchOfficeForm.controls['branchoffice_id'].setValue(this.actualBranchOffice.branchoffice_id)
    this.newBranchOfficeForm.controls['branchoffice_socialr'].setValue(this.actualBranchOffice.branchoffice_socialr)
    this.newBranchOfficeForm.controls['branchoffice_code'].setValue(this.actualBranchOffice.branchoffice_code)
    this.newBranchOfficeForm.controls['branchoffice_name'].setValue(this.actualBranchOffice.branchoffice_name)
    this.newBranchOfficeForm.controls['branchoffice_product'].setValue(this.actualBranchOffice.branchoffice_product)
  }
  async showAlertDelete(branchoffice) {
    const result = await this.delete_alert.showAlert()
    if (result.confirmed) {
      this._service.deleteBranchOffice(branchoffice, result.message).pipe(
        map((resp) => {
          this.toastr.success('Éxito', 'Eliminado satisfactoriamente')
          this.getBranchOffice(this.selectUser);
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
    this.getBranchOffice(this.search.controls.q.value);
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
    this.getBranchOffice(this.selectUser);
  }
  openCreate(target) {
    this.newBranchOfficeForm.reset();
    this.openModal(target)
  }
  ///CRUD
  onCreate() {
    let newBranchOffice: BranchOffice = {
      branchoffice_id: this.newBranchOfficeForm.controls.branchoffice_id.value,
      branchoffice_socialr: this.newBranchOfficeForm.controls.branchoffice_socialr.value,
      branchoffice_code: this.newBranchOfficeForm.controls.branchoffice_code.value,
      branchoffice_name: this.newBranchOfficeForm.controls.branchoffice_name.value,
      branchoffice_product: this.newBranchOfficeForm.controls.branchoffice_product.value,
    };
    let subscription = this._service.saveBranchOffice(newBranchOffice).pipe(
      map((resp) => {
        this.closeBtnClick();
        this.newBranchOfficeForm.reset({})
        this.getBranchOffice(this.selectUser);
        this.toastr.success('Éxito', 'La Sucursal fue Creada con Éxito.');
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
    this._service.updateBranchOffice(this.newBranchOfficeForm.value).pipe(
      map((resp) => {
        this.toastr.success('Éxito', 'La Sucursal fue modificada con éxito.')
        this.getBranchOffice(this.selectUser)
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
  show(target, brachoffice) {
    this.actualBranchOffice = brachoffice;
    this.openModal(target)
  }
  edit(targetmodal, brachoffice) {
    this.actualBranchOffice = brachoffice;
    this.setDataForm()
    this.openModal(targetmodal);
  }
  resource = 'BRANCH_OFFICE'
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
