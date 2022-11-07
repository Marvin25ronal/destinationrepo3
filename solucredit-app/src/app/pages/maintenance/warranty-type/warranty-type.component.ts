import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PaginationTableData } from 'src/app/interfaces/ui/pagination-table.interface';
import { WarrantyType } from 'src/app/models/warrantytype.model';
import { DeleteAlertService } from 'src/app/services/alerts/delete-alert.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { WarrantytypeService } from 'src/app/services/Maintenance/warrantytype.service';

@Component({
  selector: 'app-warranty-type',
  templateUrl: './warranty-type.component.html',
  styleUrls: ['./warranty-type.component.scss']
})
export class WarrantyTypeComponent implements OnInit {
  exampleName = "Ej. Fiduciaria";
  spanNameMessage = `El nombre de garantía es requerido.`
  placeholder='Buscar Garantía';
  dataList: PaginationTableData = {
    metadata: [
      "No.",
      "Tipo de Garantía",
      "Acciones"
    ],
    data: []
  }
  pageSize = 10;
  selectUser;
  actualRequest;
  totalData: number;
  selectedWarranty: any;
  page = 1;
  title='Garantía'
  constructor(
    private autorization: AuthorizationService,
    private _service: WarrantytypeService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private delete_alert: DeleteAlertService
  ) { }

  ngOnInit(): void {
    this.pageSize = 10;
    this.selectUser = "";
    this._service.getWarrantyList(this.pageSize, 0, this.selectUser).subscribe((coverage) => {
      this.dataList.data = coverage.warranty_type;
      this.totalData = coverage.count;
      console.log(this.dataList)
    })
  }
  ngOnDestroy(): void {
    if (this.modalService.hasOpenModals()) {
      this.modalService.dismissAll();
    }
    this.delete_alert.close();
  }
  search = new FormGroup({
    q: new FormControl(null),
  })
  newWarrantyForm = new FormGroup({
    warranty_type_id: new FormControl(null),
    name: new FormControl('', [Validators.required])
  })



  canCreateDis(): boolean {
    let resource = 'CLIENT';
    //CAMBIAR LOS PERMISOS TODO 
    return this.autorization.havePermission(resource, 'CREATE_DEB')
  }
  getCoverage(searchItem) {

    this._service.getWarrantyList(this.pageSize, (this.page - 1) * this.pageSize, searchItem).pipe(
      map((coverage) => {
        this.dataList.data = coverage.warranty_type;
        this.totalData = coverage.count;
      }),
      catchError((err) => {
        console.log(err)
        return of();
      })
    ).subscribe();
  }

  setDataForm() {
    this.newWarrantyForm.controls['name'].setValue(this.actualRequest.name);
    this.newWarrantyForm.controls['warranty_type_id'].setValue(this.actualRequest.warranty_type_id)
  }

  async showAlertDelete(coverage) {
    const result = await this.delete_alert.showAlert()
    if (result.confirmed) {
      this._service.deleteRequest(coverage, result.message).pipe(
        map((resp) => {
          this.toastr.success('Éxito', 'Eliminado satisfactoriamente')
          this.getCoverage(this.selectUser);
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
    this.getCoverage(this.search.controls.q.value);
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
    this.getCoverage(this.selectUser);
  }
  openCreate(target) {
    this.newWarrantyForm.reset();
    this.openModal(target)
  }
  ///CRUD
  onCreate() {
    let newRequest: WarrantyType = {
      name: this.newWarrantyForm.controls.name.value,
    }
    let subscription = this._service.saveWarranty(newRequest).pipe(
      map((resp) => {
        this.closeBtnClick();
        this.newWarrantyForm.reset({})
        this.getCoverage(this.selectUser);
        this.toastr.success('Éxito', 'El tipo de garantía fue creada con éxito.');
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
    this._service.updateRequest(this.newWarrantyForm.value).pipe(
      map((resp) => {
        this.toastr.success('Éxito', 'El tipo de garantía fue modificada con éxito.')
        this.getCoverage(this.selectUser)
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
  show(target, coverage) {
    this.actualRequest = coverage;
    this.openModal(target)
  }
  edit(targetmodal, coverage) {
    this.actualRequest = coverage;
    this.setDataForm()
    this.openModal(targetmodal);
  }
}
