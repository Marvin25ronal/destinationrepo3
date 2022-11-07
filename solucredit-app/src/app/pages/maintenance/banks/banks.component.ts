import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DeleteAlertService } from '../../../services/alerts/delete-alert.service'
import { map, catchError } from 'rxjs/operators';
import { PaginationTableData } from 'src/app/interfaces/ui/pagination-table.interface';
import { Banks } from 'src/app/models/bank.model';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { BanksService } from 'src/app/services/Maintenance/banks.service';
import { of } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.scss']
})
export class BanksComponent implements OnInit, OnDestroy {
  exampleName = "Ej. Banco de los Trabajadores";
  spanNameMessage = `El Nombre del Banco es Requerido.`
  dataList: PaginationTableData = {
    metadata: [
      "No.",
      "Banco",
      "Acciones"
    ],
    data: []
  }
  pageSize = 10;
  selectUser;
  actualBanks;
  totalData: number;
  selectedBanks: any;
  page = 1;
  constructor(
    private autorization: AuthorizationService,
    private _service: BanksService,
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
  newBanksForm = new FormGroup({
    id_banks: new FormControl(null),
    banks_name: new FormControl('', [Validators.required])
  })
  ngOnInit(): void {
    //LISTAR TODOS LOS BANCOS
    this.pageSize = 10;
    this.spinner.show()
    this.selectUser = "";
    this._service.getBanks(this.pageSize, 0, this.selectUser).toPromise().then((banks) => {
      this.dataList.data = banks.banks;
      this.totalData = banks.count;
      console.log(this.dataList)
      this.spinner.hide()
    }).catch((e) => {
      this.spinner.hide()
      this.toastr.error('error', 'Ocurrio un problema' + e.message);
    })
    console.log(this.selectUser)
  }

  getBanks(searchItem) {

    this._service.getBanks(this.pageSize, (this.page - 1) * this.pageSize, searchItem).pipe(
      map((banks) => {
        this.dataList.data = banks.banks;
        this.totalData = banks.count;
      }),
      catchError((err) => {
        console.log(err)
        return of();
      })
    ).subscribe();
  }

  setDataForm() {
    this.newBanksForm.controls['banks_name'].setValue(this.actualBanks.banks_name)
    this.newBanksForm.controls['id_banks'].setValue(this.actualBanks.id_banks)
  }
  async showAlertDelete(banks) {
    const result = await this.delete_alert.showAlert()
    if (result.confirmed) {
      this._service.deleteBanks(banks, result.message).pipe(
        map((resp) => {
          this.toastr.success('Éxito', 'Eliminado satisfactoriamente')
          this.getBanks(this.selectUser);
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

  searchTerm() {
    this.getBanks(this.search.controls.q.value);
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
    this.getBanks(this.selectUser);
  }
  openCreate(target) {
    this.newBanksForm.reset();
    this.openModal(target)
  }
  ///CRUD
  onCreate() {
    let newBanks: Banks = {
      banks_name: this.newBanksForm.controls.banks_name.value,
    };
    let subscription = this._service.saveBanks(newBanks).pipe(
      map((resp) => {
        this.closeBtnClick();
        this.newBanksForm.reset({})
        this.getBanks(this.selectUser);
        this.toastr.success('Éxito', 'El Banco fue creado con éxito.');
        this.ngOnInit()
      }),
      catchError((err) => {
        //this.spinner.hide();
        this.toastr.error('error', 'Ocurrió un error');
        //console.log(err);
        return of();
      })
    ).subscribe(() => subscription.unsubscribe());
  }
  saveChanges() {
    this._service.updateBanks(this.newBanksForm.value).pipe(
      map((resp) => {
        this.toastr.success('Éxito', 'El Banco fue Modificada con Éxito.')
        this.getBanks(this.selectUser)
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
  show(target, banks) {
    this.actualBanks = banks;
    this.openModal(target)
  }
  edit(targetmodal, banks) {
    this.actualBanks = banks;
    this.setDataForm()
    this.openModal(targetmodal);
  }
  resource = 'BANK'
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
