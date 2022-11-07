import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PaginationTableData } from 'src/app/interfaces/ui/pagination-table.interface';
import { AdviserType } from 'src/app/models/adviser-type.model';
import { DeleteAlertService } from 'src/app/services/alerts/delete-alert.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { AdviserTypeService } from 'src/app/services/Maintenance/adviser-type.service';

@Component({
  selector: 'app-adviser-type',
  templateUrl: './adviser-type.component.html',
  styleUrls: ['./adviser-type.component.scss']
})
export class AdviserTypeComponent implements OnInit {
  exampleName = "Ej. Asesores Legales";
  spanNameMessage = `El nombre es requerido`
  placeholder = 'Buscar tipo de Asesor';
  resource = 'ADVISER_TYPE'
  dataList: PaginationTableData = {
    metadata: [
      "No.",
      "Tipo de Asesor",
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
  title = 'Tipo de asesor'
  constructor(
    private autorization: AuthorizationService,
    private _service: AdviserTypeService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private delete_alert: DeleteAlertService,
    private spinner: NgxSpinnerService,
  ) { }

  async ngOnInit() {
    this.pageSize = 10;
    this.spinner.show()
    this.selectUser = "";
    await this._service.getList(this.pageSize, 0, this.selectUser).toPromise().then((coverage) => {
      this.dataList.data = coverage.adviser_type;
      this.totalData = coverage.count;
      console.log(this.dataList)
    }).catch((e) => {
      this.spinner.hide()
      this.toastr.error('error', 'Ocurrio un problema' + e.message);
    })
    this.spinner.hide()
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
    id_adviser_type: new FormControl(0),
    adviser_type: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  })
  getCoverage(searchItem) {

    this._service.getList(this.pageSize, (this.page - 1) * this.pageSize, searchItem).pipe(
      map((coverage) => {
        this.dataList.data = coverage.adviser_type;
        this.totalData = coverage.count;
      }),
      catchError((err) => {
        console.log(err)
        return of();
      })
    ).subscribe();
  }
  setDataForm() {
    this.newDoc.controls['adviser_type'].setValue(this.actualRequest.adviser_type);
    this.newDoc.controls['id_adviser_type'].setValue(this.actualRequest.id_adviser_type);
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
    return this.autorization.havePermission(this.resource, 'EDIT');
  }
  canSeeDeb(): boolean {
    return this.autorization.havePermission(this.resource, 'SEE');
  }
  canListDeb(): boolean {
    return this.autorization.havePermission(this.resource, 'LIST');
  }
  canCreate(): boolean {
    return this.autorization.havePermission(this.resource, 'CREATE')
  }
  canDeleteDeb(): boolean {
    return this.autorization.havePermission(this.resource, 'DELETE')
  }
  searchTerm() {
    this.getCoverage(this.search.controls.q.value);
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
    let newRequest: AdviserType = {
      adviser_type: this.newDoc.controls.adviser_type.value,
      description: this.newDoc.controls.description.value,
    }
    let subscription = this._service.save(newRequest).pipe(
      map((resp) => {
        this.closeBtnClick();
        this.newDoc.reset({})
        this.getCoverage(this.selectUser);
        this.toastr.success('Éxito', 'El tipo de asesor se ha creado satisfactoriamente');
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
        this.toastr.success('Éxito', 'El tipo de asesor se ha actualizado satisfactoriamente');
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
