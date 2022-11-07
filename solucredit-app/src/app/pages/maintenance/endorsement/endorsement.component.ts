import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DeleteAlertService } from '../../../services/alerts/delete-alert.service'
import { map, catchError } from 'rxjs/operators';
import { PaginationTableData } from 'src/app/interfaces/ui/pagination-table.interface';
import { Endorsement } from 'src/app/models/endorsement.model';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { EndorsementService } from 'src/app/services/Maintenance/endorsement.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-endorsement',
  templateUrl: './endorsement.component.html',
  styleUrls: ['./endorsement.component.scss']
})
export class EndorsementComponent implements OnInit, OnDestroy  {
  exampleName = "Ej. Aval Jurídico";
  spanNameMessage = `El Nombre de Aval es Requerido.`
  dataList: PaginationTableData = {
    metadata: [
      "No.",
      "Aval",
      "Acciones"
    ],
    data: []
  }
  pageSize = 10;
  selectUser;
  actualEndorsement;
  totalData: number;
  selectedEndorsement: any;
  page = 1;
  constructor(
    private autorization: AuthorizationService,
    private _service: EndorsementService,
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
  newEndorsementForm = new FormGroup({
    id_endorsement: new FormControl(null),
    endorsement_name: new FormControl('', [Validators.required])
  })
  ngOnInit(): void {
    //LISTAR TODOS LOS TIPOS DE AVALES
    this.pageSize = 10;
    this.selectUser = "";
    this._service.getEndorsement(this.pageSize, 0, this.selectUser).subscribe((endorsement) => {
      this.dataList.data = endorsement.endorsement;
      this.totalData = endorsement.count;
      console.log(this.dataList)
    })
  }
  canCreateDis(): boolean {
    let resource = 'CLIENT';
    //CAMBIAR LOS PERMISOS TODO 
    return this.autorization.havePermission(resource, 'CREATE_DEB')
  }
  getEndorsement(searchItem) {

    this._service.getEndorsement(this.pageSize, (this.page - 1) * this.pageSize, searchItem).pipe(
      map((endorsement) => {
        this.dataList.data = endorsement.endorsement;
        this.totalData = endorsement.count;
      }),
      catchError((err) => {
        console.log(err)
        return of();
      })
    ).subscribe();
  }

  setDataForm() {
    this.newEndorsementForm.controls['endorsement_name'].setValue(this.actualEndorsement.endorsement_name)
    this.newEndorsementForm.controls['id_endorsement'].setValue(this.actualEndorsement.id_endorsement)
  }
  async showAlertDelete(endorsement) {
    const result = await this.delete_alert.showAlert()
    if (result.confirmed) {
      this._service.deleteEndorsement(endorsement, result.message).pipe(
        map((resp) => {
          this.toastr.success('Éxito', 'Eliminado satisfactoriamente')
          this.getEndorsement(this.selectUser);
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
    this.getEndorsement(this.search.controls.q.value);
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
    this.getEndorsement(this.selectUser);
  }
  openCreate(target) {
    this.newEndorsementForm.reset();
    this.openModal(target)
  }
  ///CRUD
  onCreate() {
    let newEndorsement: Endorsement = {
      endorsement_name: this.newEndorsementForm.controls.endorsement_name.value,
    };
    let subscription = this._service.saveEndorsement(newEndorsement).pipe(
      map((resp) => {
        this.closeBtnClick();
        this.newEndorsementForm.reset({})
        this.getEndorsement(this.selectUser);
        this.toastr.success('Éxito', 'El Aval fue Creado con Éxito.');
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
    this._service.updateEndorsement(this.newEndorsementForm.value).pipe(
      map((resp) => {
        this.toastr.success('Éxito', 'El Aval fue Modificado con Éxito.')
        this.getEndorsement(this.selectUser)
        this.closeBtnClick();
      }),
      catchError((err) => {
        this.toastr.error('Error', 'Ocurrio un problema' + err.message);
        //console.log(err);
        this.closeBtnClick();
        return of();
      })
    ).subscribe()
  }
  show(target, endorsement) {
    this.actualEndorsement = endorsement;
    this.openModal(target)
  }
  edit(targetmodal, endorsement) {
    this.actualEndorsement = endorsement;
    this.setDataForm()
    this.openModal(targetmodal);
  }

}
