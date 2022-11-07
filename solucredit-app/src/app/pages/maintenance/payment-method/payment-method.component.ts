import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PaginationTableData } from 'src/app/interfaces/ui/pagination-table.interface';
import { PaymentMethod } from 'src/app/models/paymentMethod.model';
import { DeleteAlertService } from 'src/app/services/alerts/delete-alert.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { PaymentMethodService } from 'src/app/services/Maintenance/payment-method.service';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss']
})
export class PaymentMethodComponent implements OnInit {
  exampleName = "Ej. Transferencia";
  spanNameMessage = `El nombre es requerido`
  placeholder = 'Buscar tipo de pago';
  dataList: PaginationTableData = {
    metadata: [
      "No.",
      "Tipo de Pago",
      "Descripción",
      "Acciones"
    ],
    data: []
  }
  pageSize = 10;
  selectUser;
  actualRequest;
  totalData: number;
  selectDoc: any;
  page = 1;
  title = 'Forma de pago'
  constructor(
    private autorization: AuthorizationService,
    private _service: PaymentMethodService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private delete_alert: DeleteAlertService,
    private spinner: NgxSpinnerService,
  ) { }

  async ngOnInit() {
    this.pageSize = 10;
    this.selectUser = "";
    this.spinner.show()
    this._service.getList(this.pageSize, 0, this.selectUser).toPromise().then((coverage) => {
      this.dataList.data = coverage.payment_method;
      this.totalData = coverage.count;
      console.log(this.dataList)
      this.spinner.hide()
    }).catch((e) => {
      this.spinner.hide()
      this.toastr.error('error', 'Ocurrio un problema' + e.message);
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
  newDoc = new FormGroup({
    id_payment: new FormControl(0),
    payment_name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),

  })
  canCreateDis(): boolean {
    let resource = 'CLIENT';
    //CAMBIAR LOS PERMISOS TODO 
    return this.autorization.havePermission(resource, 'CREATE_DEB')
  }
  getCoverage(searchItem) {

    this._service.getList(this.pageSize, (this.page - 1) * this.pageSize, searchItem).pipe(
      map((coverage) => {
        this.dataList.data = coverage.payment_method;
        this.totalData = coverage.count;
      }),
      catchError((err) => {
        console.log(err)
        return of();
      })
    ).subscribe();
  }
  setDataForm() {
    this.newDoc.controls['payment_name'].setValue(this.actualRequest.payment_name);
    this.newDoc.controls['id_payment'].setValue(this.actualRequest.id_payment);
    this.newDoc.controls['description'].setValue(this.actualRequest.description)
  }
  async showAlertDelete(coverage) {
    const result = await this.delete_alert.showAlert()
    if (result.confirmed) {
      this._service.delete(coverage, result.message).pipe(
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
    this.newDoc.reset();
    this.openModal(target)
  }
  ///CRUD
  onCreate() {
    let newRequest: PaymentMethod = {
      payment_name: this.newDoc.controls.payment_name.value,
      description: this.newDoc.controls.description.value,
    }
    let subscription = this._service.save(newRequest).pipe(
      map((resp) => {
        this.closeBtnClick();
        this.newDoc.reset({})
        this.getCoverage(this.selectUser);
        this.toastr.success('Éxito', 'El método de pago o desembolso fue creada con éxito.');
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
    this._service.update(this.newDoc.value).pipe(
      map((resp) => {
        this.toastr.success('Éxito', 'El método de pago o desembolso fue actualizado con éxito.');
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
  resource = 'PAYMENT_METHOD'
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
