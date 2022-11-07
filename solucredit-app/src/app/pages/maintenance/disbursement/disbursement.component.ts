import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DeleteAlertService } from '../../../services/alerts/delete-alert.service'
import { map, catchError } from 'rxjs/operators';
import { PaginationTableData } from 'src/app/interfaces/ui/pagination-table.interface';
import { Disbursement } from 'src/app/models/disbursement.model';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { DisbursementService } from 'src/app/services/Maintenance/disbursement.service';
import { of } from 'rxjs';
@Component({
  selector: 'app-disbursement',
  templateUrl: './disbursement.component.html',
  styleUrls: ['./disbursement.component.scss']
})
export class DisbursementComponent implements OnInit, OnDestroy {
  exampleName = "Ej. Cupo revolvente";
  spanNameMessage = `El nombre de desembolso es requerido.`
  dataList: PaginationTableData = {
    metadata: [
      "No.",
      "Tipo de desembolso",
      "Acciones"
    ],
    data: []
  }
  pageSize = 10;
  selectUser;
  actualDisbursement;
  totalData: number;
  selectedDisbursement: any;
  page = 1;
  constructor(
    private autorization: AuthorizationService,
    private _service: DisbursementService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private delete_alert: DeleteAlertService
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
  newDisbursementForm = new FormGroup({
    id_disbursement: new FormControl(null),
    disbursement_name: new FormControl('', [Validators.required])
  })
  ngOnInit(): void {
    //LISTAR TODOS LOS TIPOS DE DESEMBOLSOS
    this.pageSize = 10;
    this.selectUser = "";
    this._service.getDisbursements(this.pageSize, 0, this.selectUser).subscribe((disbursement) => {
      this.dataList.data = disbursement.disbursement;
      this.totalData = disbursement.count;
      console.log(this.dataList)
    })
  }


  canCreateDis(): boolean {
    let resource = 'CLIENT';
    //CAMBIAR LOS PERMISOS TODO 
    return this.autorization.havePermission(resource, 'CREATE_DEB')
  }
  getDisbursement(searchItem) {

    this._service.getDisbursements(this.pageSize, (this.page - 1) * this.pageSize, searchItem).pipe(
      map((disbursement) => {
        this.dataList.data = disbursement.disbursement;
        this.totalData = disbursement.count;
      }),
      catchError((err) => {
        console.log(err)
        return of();
      })
    ).subscribe();
  }

  setDataForm() {
    this.newDisbursementForm.controls['disbursement_name'].setValue(this.actualDisbursement.disbursement_name)
    this.newDisbursementForm.controls['id_disbursement'].setValue(this.actualDisbursement.id_disbursement)
  }

  async showAlertDelete(disbursement) {
    const result = await this.delete_alert.showAlert()
    if (result.confirmed) {
      this._service.deleteDisbursement(disbursement, result.message).pipe(
        map((resp) => {
          this.toastr.success('Éxito', 'Eliminado satisfactoriamente')
          this.getDisbursement(this.selectUser);
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
    this.getDisbursement(this.search.controls.q.value);
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
    this.getDisbursement(this.selectUser);
  }
  openCreate(target) {
    this.newDisbursementForm.reset();
    this.openModal(target)
  }
  ///CRUD
  onCreate() {
    let newDisbursement: Disbursement = {
      disbursement_name: this.newDisbursementForm.controls.disbursement_name.value,
    };
    let subscription = this._service.saveDisbursment(newDisbursement).pipe(
      map((resp) => {
        this.closeBtnClick();
        this.newDisbursementForm.reset({})
        this.getDisbursement(this.selectUser);
        this.toastr.success('Éxito', 'El desembolso fue creado con éxito.');
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
    this._service.updateDisbursement(this.newDisbursementForm.value).pipe(
      map((resp) => {
        this.toastr.success('Éxito', 'El desembolso fue modificada con éxito.')
        this.getDisbursement(this.selectUser)
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
  show(target, disbursement) {
    this.actualDisbursement = disbursement;
    this.openModal(target)
  }
  edit(targetmodal, disbursement) {
    this.actualDisbursement = disbursement;
    this.setDataForm()
    this.openModal(targetmodal);
  }

}
