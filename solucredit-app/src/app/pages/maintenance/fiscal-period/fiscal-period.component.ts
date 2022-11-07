import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DeleteAlertService } from '../../../services/alerts/delete-alert.service'
import { map, catchError } from 'rxjs/operators';
import { PaginationTableData } from 'src/app/interfaces/ui/pagination-table.interface';
import { FiscalPeriod } from 'src/app/models/fiscal-period.model';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { FiscalPeriodService } from 'src/app/services/Maintenance/fiscal-period.service';
import { FiscalYearService } from 'src/app/services/Maintenance/fiscal-year.service';
import { of } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-fiscal-period',
  templateUrl: './fiscal-period.component.html',
  styleUrls: ['./fiscal-period.component.scss']
})
export class FiscalPeriodComponent implements OnInit {
  exampleName = "Año Laboral";
  spanNameMessage = `El requerido el período fiscal.`
  dataList: PaginationTableData = {
    metadata: [
      "No.",
      "Periodo",
      "Año",
      "Inicio",
      "Final",
      "Nota",
      "Acciones"
    ],
    data: []
  }
  pageSize = 10;
  selectUser;
  actualFiscalPeriod;
  totalData: number;
  selectedFiscalPerioid: any;
  page = 1;
  fiscalYear;
  constructor(
    private autorization: AuthorizationService,
    private _service: FiscalPeriodService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private delete_alert: DeleteAlertService,
    private _fyserv: FiscalYearService,
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
  newFiscalPeriodForm = new FormGroup({
    fiscal_period_id: new FormControl(null),
    fiscal_year_id: new FormControl(null),
    period_name: new FormControl('', [Validators.required]),
    period_start_date: new FormControl('', [Validators.required]),
    period_end_date: new FormControl('', [Validators.required]),
    note: new FormControl('', [Validators.required]),
  })
  async ngOnInit() {
    this.getFiscalYear()
    this.pageSize = 10;
    this.selectUser = "";
    this.spinner.show()
    await this._service.getFiscalPeriods(this.pageSize, 0, this.selectUser).toPromise().then((fp) => {
      this.dataList.data = fp.fiscalperiod;
      this.totalData = fp.count;
      console.log(this.dataList)
      this.spinner.hide()
    }).catch((e) => {
      this.spinner.hide()
      this.toastr.error('error', 'Ocurrio un problema' + e.message);
    })
    console.log(this.selectUser)
  }
  getFiscalYearName(value) {
    if (this.fiscalYear === undefined) { return '' }
    let find = this.fiscalYear.find((item) => item.fiscal_year_id == value)
    return find != undefined ? find.fiscal_year_note : ''
  }
  async getFiscalYear() {
    debugger
    let sub = this._fyserv.getFiscalYear().pipe(
      map((response) => {
        console.log(response)
        console.log('Mandando Datos')
        this.fiscalYear = response
      }),
      catchError((err) => {
        console.log(err)
        return of()
      })
    ).subscribe(() => sub.unsubscribe)
  }
  canCreateBan(): boolean {
    let resource = 'CLIENT';
    //CAMBIAR LOS PERMISOS TODO 
    return this.autorization.havePermission(resource, 'CREATE_DEB')
  }
  getFiscalPeriod(searchItem) {

    this._service.getFiscalPeriods(this.pageSize, (this.page - 1) * this.pageSize, searchItem).pipe(
      map((fp) => {
        this.dataList.data = fp.fiscalperiod;
        this.totalData = fp.count;
      }),
      catchError((err) => {
        console.log(err)
        return of();
      })
    ).subscribe();
  }
  setDataForm() {
    this.newFiscalPeriodForm.controls['fiscal_period_id'].setValue(this.actualFiscalPeriod.fiscal_period_id)
    this.newFiscalPeriodForm.controls['fiscal_year_id'].setValue(this.actualFiscalPeriod.fiscal_year_id)
    this.newFiscalPeriodForm.controls['period_name'].setValue(this.actualFiscalPeriod.period_name)
    this.newFiscalPeriodForm.controls['period_start_date'].setValue(this.actualFiscalPeriod.period_start_date)
    this.newFiscalPeriodForm.controls['period_end_date'].setValue(this.actualFiscalPeriod.period_end_date)
    this.newFiscalPeriodForm.controls['note'].setValue(this.actualFiscalPeriod.note)
  }
  async showAlertDelete(fp) {
    const result = await this.delete_alert.showAlert()
    if (result.confirmed) {
      this._service.deleteFiscalPeriod(fp, result.message).pipe(
        map((resp) => {
          this.toastr.success('Éxito', 'Eliminado satisfactoriamente')
          this.getFiscalPeriod(this.selectUser);
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
  canEditBan(): boolean {
    let resource = 'CLIENT';
    return this.autorization.havePermission(resource, 'EDIT_DEB');
  }
  canSeeBan(): boolean {
    let resource = 'CLIENT';
    return this.autorization.havePermission(resource, 'SEE_DEB');
  }
  canListBan(): boolean {
    let resource = 'CLIENT';
    return this.autorization.havePermission(resource, 'LIST_DEB');
  }
  searchTerm() {
    this.getFiscalPeriod(this.search.controls.q.value);
  }
  canListFiscalPeriod(): boolean {
    let resource = 'CLIENT';
    return this.autorization.havePermission(resource, 'LIST_DEB');
  }
  canDeleteBan(): boolean {
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
    this.getFiscalPeriod(this.selectUser);
  }
  openCreate(target) {
    this.newFiscalPeriodForm.reset();
    this.openModal(target)
  }
  ///CRUD
  onCreate() {
    let newFiscalPeriod: FiscalPeriod = {
      fiscal_period_id: this.newFiscalPeriodForm.controls.fiscal_period_id.value,
      fiscal_year_id: this.newFiscalPeriodForm.controls.fiscal_year_id.value,
      period_name: this.newFiscalPeriodForm.controls.period_name.value,
      period_start_date: this.newFiscalPeriodForm.controls.period_start_date.value,
      period_end_date: this.newFiscalPeriodForm.controls.period_end_date.value,
      note: this.newFiscalPeriodForm.controls.note.value,
    };
    let subscription = this._service.saveFiscalPeriod(newFiscalPeriod).pipe(
      map((resp) => {
        this.closeBtnClick();
        this.newFiscalPeriodForm.reset({})
        this.getFiscalPeriod(this.selectUser);
        this.toastr.success('Éxito', 'El periodo fiscal se ha creado satisfactoriamente');
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
    this._service.updateFiscalPeriods(this.newFiscalPeriodForm.value).pipe(
      map((resp) => {
        this.toastr.success('Éxito', 'El periodo fiscal se ha actualizado satisfactoriamente');
        this.getFiscalPeriod(this.selectUser)
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
  show(target, fp) {
    this.actualFiscalPeriod = fp;
    this.openModal(target)
  }
  edit(targetmodal, fp) {
    this.actualFiscalPeriod = fp;
    this.setDataForm()
    this.openModal(targetmodal);
  }
  resource = 'FISCAL_PERIOD'
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
