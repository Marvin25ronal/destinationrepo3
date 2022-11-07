import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PaginationTableData } from 'src/app/interfaces/ui/pagination-table.interface';
import { AccountType } from 'src/app/models/account-type.mode';
import { DeleteAlertService } from 'src/app/services/alerts/delete-alert.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { AccountTypesService } from 'src/app/services/Maintenance/account-types.service';
import { CurrencyService } from 'src/app/services/Maintenance/currency.service';

@Component({
  selector: 'app-account-types',
  templateUrl: './account-types.component.html',
  styleUrls: ['./account-types.component.scss']
})
export class AccountTypesComponent implements OnInit {
  exampleName = "Ej. Ahorro";
  spanNameMessage = `El nombre es requerido`
  placeholder = 'Buscar Cuenta';
  dataList: PaginationTableData = {
    metadata: [
      "No.",
      "Tipo de Cuenta",
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
  title = 'Cuenta'
  currencyData: any[]
  constructor(
    private autorization: AuthorizationService,
    private _service: AccountTypesService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private delete_alert: DeleteAlertService,
    private _currency: CurrencyService,
    private spinner: NgxSpinnerService,
  ) { }

  async ngOnInit() {
    this.pageSize = 10;
    this.selectUser = "";
    this.spinner.show()
    await this._service.getList(this.pageSize, 0, this.selectUser).toPromise().then((coverage) => {
      this.dataList.data = coverage.account_type;
      this.totalData = coverage.count;
      console.log(this.dataList)
    }).catch((e) => {
      this.spinner.hide()
      this.toastr.error('error', 'Ocurrio un problema' + e.message);
    })
    await this._currency.getCurrency(-1, -1, []).toPromise().then((coverage) => {
      this.currencyData = coverage.currency
      console.log(this.currencyData)
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
    id_account: new FormControl(0),
    account_name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    currency_id: new FormControl(null, [Validators.required])
  })
  canCreateDis(): boolean {
    let resource = 'CLIENT';
    //CAMBIAR LOS PERMISOS TODO 
    return this.autorization.havePermission(resource, 'CREATE_DEB')
  }
  getCurrency(value) {
    if (this.currencyData == undefined) { return '' }
    let find = this.currencyData.find((item) => item.id_currency == value)
    return find != undefined ? find.currency_name : ''
  }
  getCoverage(searchItem) {

    this._service.getList(this.pageSize, (this.page - 1) * this.pageSize, searchItem).pipe(
      map((coverage) => {
        this.dataList.data = coverage.account_type;
        this.totalData = coverage.count;
      }),
      catchError((err) => {
        console.log(err)
        return of();
      })
    ).subscribe();
  }

  setDataForm() {
    this.newDoc.controls['account_name'].setValue(this.actualRequest.account_name);
    this.newDoc.controls['id_account'].setValue(this.actualRequest.id_account);
    this.newDoc.controls['description'].setValue(this.actualRequest.description)
    this.newDoc.controls['currency_id'].setValue(this.actualRequest.currency_id)
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
    let newRequest: AccountType = {
      account_name: this.newDoc.controls.account_name.value,
      description: this.newDoc.controls.description.value,
      currency_id: this.newDoc.controls.currency_id.value
    }
    let subscription = this._service.save(newRequest).pipe(
      map((resp) => {
        this.closeBtnClick();
        this.newDoc.reset({})
        this.getCoverage(this.selectUser);
        this.toastr.success('Éxito', 'La cuenta fue creada con éxito.');
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
        this.toastr.success('Éxito', 'La cuenta fue modificada con éxito.')
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
  resource = 'ACCOUNT_TYPE'
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
