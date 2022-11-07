import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PaginationTableData } from 'src/app/interfaces/ui/pagination-table.interface';
import { IVA } from 'src/app/models/isr.model';
import { DeleteAlertService } from 'src/app/services/alerts/delete-alert.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { SysivaService } from 'src/app/services/Maintenance/sysiva.service';

@Component({
  selector: 'app-iva',
  templateUrl: './iva.component.html',
  styleUrls: ['./iva.component.scss']
})
export class IvaComponent implements OnInit {

  constructor(
    private autorization: AuthorizationService,
    private _service: SysivaService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private delete_alert: DeleteAlertService,
    private spinner: NgxSpinnerService,
  ) { }

  async ngOnInit() {
    this.pageSize = 10;
    this.selectUser = "";
    this.spinner.show();
    await this._service.getList(this.pageSize, 0, this.selectUser).toPromise().then((isr) => {
      this.dataList.data = isr.iva;
      this.totalData = isr.count;

      console.log(this.dataList)
      this.spinner.hide()
    }).catch((e) => {
      this.spinner.hide()
      this.toastr.error('error', 'Ocurrio un problema' + e.message);
    })
  }
  resource = 'ISR'
  pageSize = 10;
  selectUser;
  actualISR;
  totalData: number;
  exampleName = "Ej. Clientes, Especiales, Nacionales";
  exampleNameC = "Ej. USD, GTQ";
  exampleNameS = "Ej. 10";
  page = 1;
  search = new FormGroup({
    q: new FormControl(null),
  })
  newISRForm = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', [Validators.required]),
    percentage: new FormControl('', [Validators.required])
  })
  dataList: PaginationTableData = {
    metadata: [
      "No.",
      "IVA",
      "Porcentaje",
      "Acciones"
    ],
    data: []
  }
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
  onCreate() {
    let newISR: IVA = {
      name: this.newISRForm.controls.name.value,
      percentage: parseInt(this.newISRForm.controls.percentage.value)
    };
    let subscription = this._service.save(newISR).pipe(
      map((resp) => {
        this.closeBtnClick();
        this.newISRForm.reset({})
        this.getISR(this.selectUser);
        this.toastr.success('Éxito', 'El IVA fue Creado con Éxito.');
        this.ngOnInit()
      }),
      catchError((err) => {
        //this.spinner.hide();
        this.toastr.error('error', 'Ha Ocurrido un error');
        console.log(err);
        return of();
      })
    ).subscribe(() => subscription.unsubscribe());
  }
  closeBtnClick() {
    this.modalService.dismissAll();
  }
  searchTerm() {
    this.getISR(this.search.controls.q.value);
  }
  getISR(searchItem) {

    this._service.getList(this.pageSize, (this.page - 1) * this.pageSize, searchItem).pipe(
      map((isr) => {
        this.dataList.data = isr.iva;
        this.totalData = isr.count;
      }),
      catchError((err) => {
        console.log(err)
        return of();
      })
    ).subscribe();
  }
  show(target, isr) {
    this.actualISR = isr;
    this.openModal(target)
  }
  openCreate(target) {
    this.newISRForm.reset();
    this.openModal(target)
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
  saveChanges() {

    this._service.update(this.newISRForm.value).pipe(
      map((resp) => {
        this.toastr.success('Éxito', 'El IVA fue Modificada con Éxito.')
        this.getISR(this.selectUser)
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
  editC(targetmodal, isr) {
    console.log('Mandando Edicion ISR');
    console.log(isr);
    this.actualISR = isr;
    this.setDataForm()
    this.openModal(targetmodal);
  }
  setDataForm() {
    this.newISRForm.controls['name'].setValue(this.actualISR.name)
    this.newISRForm.controls['id'].setValue(this.actualISR.id)
    this.newISRForm.controls['percentage'].setValue(this.actualISR.percentage)
  }
  async showAlertDelete(isr) {
    const result = await this.delete_alert.showAlert()
    if (result.confirmed) {
      this._service.deleteISR(isr, result.message).pipe(
        map((resp) => {
          this.toastr.success('Éxito', 'Eliminado satisfactoriamente')
          this.getISR(this.selectUser);
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
}
