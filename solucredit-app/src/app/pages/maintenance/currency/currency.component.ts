import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DeleteAlertService } from '../../../services/alerts/delete-alert.service'
import { map, catchError } from 'rxjs/operators';
import { PaginationTableData } from 'src/app/interfaces/ui/pagination-table.interface';
import { Currency } from 'src/app/models/currency.model';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { CurrencyService } from 'src/app/services/Maintenance/currency.service';
import { of } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit, OnDestroy {
  exampleName = "Ej. Euro, Libra, Peso, Quetzal";
  exampleNameC = "Ej. USD, GTQ";
  exampleNameS = "Ej. Q, $";
  spanNameMessage = `El Nombre de la Moneda es Requerido.`
  spanNameMessageC = `El Código es Requerido.`
  spanNameMessageS = `El Símbolo es Requerido.`
  dataList: PaginationTableData = {
    metadata: [
      "No.",
      "Moneda",
      "Símbolo",
      "Código",
      "Acciones"
    ],
    data: []
  }
  pageSize = 10;
  selectUser;
  actualCurrency;
  totalData: number;
  selectedCurrency: any;
  page = 1;
  constructor(
    private autorization: AuthorizationService,
    private _service: CurrencyService,
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
  newCurrencyForm = new FormGroup({
    id_currency: new FormControl(null),
    currency_name: new FormControl('', [Validators.required]),
    code: new FormControl('', [Validators.required]),
    symbol: new FormControl('', [Validators.required])
  })
  async ngOnInit() {
    //LISTAR TODOS LOS TIPOS DE DESEMBOLSOS
    this.pageSize = 10;
    this.selectUser = "";
    this.spinner.show();
    await this._service.getCurrency(this.pageSize, 0, this.selectUser).toPromise().then((currency) => {
      this.dataList.data = currency.currency;
      this.totalData = currency.count;
      console.log(this.dataList)
      this.spinner.hide()
    }).catch((e) => {
      this.spinner.hide()
      this.toastr.error('error', 'Ocurrio un problema' + e.message);
    })
  }
  canCreateCur(): boolean {
    let resource = 'CLIENT';
    //CAMBIAR LOS PERMISOS TODO 
    return this.autorization.havePermission(resource, 'CREATE_DEB')
  }
  getCurrency(searchItem) {

    this._service.getCurrency(this.pageSize, (this.page - 1) * this.pageSize, searchItem).pipe(
      map((currency) => {
        this.dataList.data = currency.currency;
        this.totalData = currency.count;
      }),
      catchError((err) => {
        console.log(err)
        return of();
      })
    ).subscribe();
  }
  setDataForm() {
    this.newCurrencyForm.controls['currency_name'].setValue(this.actualCurrency.currency_name)
    this.newCurrencyForm.controls['id_currency'].setValue(this.actualCurrency.id_currency)
    this.newCurrencyForm.controls['code'].setValue(this.actualCurrency.code)
    this.newCurrencyForm.controls['symbol'].setValue(this.actualCurrency.symbol)
  }
  async showAlertDelete(currency) {
    const result = await this.delete_alert.showAlert()
    if (result.confirmed) {
      this._service.deleteCurrency(currency, result.message).pipe(
        map((resp) => {
          this.toastr.success('Éxito', 'Eliminado satisfactoriamente')
          this.getCurrency(this.selectUser);
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
    this.getCurrency(this.search.controls.q.value);
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
    this.getCurrency(this.selectUser);
  }
  openCreate(target) {
    this.newCurrencyForm.reset();
    this.openModal(target)
  }
  onCreate() {
    let newCurrency: Currency = {
      currency_name: this.newCurrencyForm.controls.currency_name.value,
      code: this.newCurrencyForm.controls.code.value,
      symbol: this.newCurrencyForm.controls.symbol.value
    };
    let subscription = this._service.saveCurrency(newCurrency).pipe(
      map((resp) => {
        this.closeBtnClick();
        this.newCurrencyForm.reset({})
        this.getCurrency(this.selectUser);
        this.toastr.success('Éxito', 'La Moneda fue Creado con Éxito.');
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
    this._service.updateCurrency(this.newCurrencyForm.value).pipe(
      map((resp) => {
        this.toastr.success('Éxito', 'La Moneda fue Modificada con Éxito.')
        this.getCurrency(this.selectUser)
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
  show(target, currency) {
    this.actualCurrency = currency;
    this.openModal(target)
  }
  editC(targetmodal, currency) {
    console.log('Mandando Edicion Moneda');
    console.log(currency);
    this.actualCurrency = currency;
    this.setDataForm()
    this.openModal(targetmodal);
  }
  resource = 'CURRENCY'
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
