import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DeleteAlertService } from '../../../services/alerts/delete-alert.service'
import { map, catchError } from 'rxjs/operators';
import { PaginationTableData } from 'src/app/interfaces/ui/pagination-table.interface';
import { Requirements } from 'src/app/models/requirements.model';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { RequirementsService } from 'src/app/services/Maintenance/requirements.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-requirements',
  templateUrl: './requirements.component.html',
  styleUrls: ['./requirements.component.scss']
})
export class RequirementsComponent implements OnInit, OnDestroy {
  exampleName = "Ej. Fotografía DPI ";
  spanNameMessage = `El nombre del Requisito es Requerido.`
  dataList: PaginationTableData = {
    metadata: [
      "No.",
      "Requisito",
      "Acciones"
    ],
    data: []
  }
  pageSize = 10;
  selectUser;
  actualRequirements;
  totalData: number;
  selectedRequirements: any;
  page = 1;
  constructor(
    private autorization: AuthorizationService,
    private _service: RequirementsService,
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
  newRequirementsForm = new FormGroup({
    id_requirements: new FormControl(null),
    requirements_name: new FormControl('', [Validators.required])
  })
  ngOnInit(): void {
     //LISTAR TODOS LOS TIPOS DE DESEMBOLSOS
     this.pageSize = 10;
     this.selectUser = "";
     this._service.getRequirements(this.pageSize, 0, this.selectUser).subscribe((requirements) => {
       this.dataList.data = requirements.requirements;
       this.totalData = requirements.count;
       console.log(this.dataList)
     })
  }
  canCreateReq(): boolean {
    let resource = 'CLIENT';
    //CAMBIAR LOS PERMISOS TODO 
    return this.autorization.havePermission(resource, 'CREATE_DEB')
  }
  getRequirements(searchItem) {

    this._service.getRequirements(this.pageSize, (this.page - 1) * this.pageSize, searchItem).pipe(
      map((requirements) => {
        this.dataList.data = requirements.requirements;
        this.totalData = requirements.count;
      }),
      catchError((err) => {
        console.log(err)
        return of();
      })
    ).subscribe();
  }
  setDataForm() {
    this.newRequirementsForm.controls['requirements_name'].setValue(this.actualRequirements.requirements_name)
    this.newRequirementsForm.controls['id_requirements'].setValue(this.actualRequirements.id_requirements)
  }

  async showAlertDelete(requirements) {
    const result = await this.delete_alert.showAlert()
    if (result.confirmed) {
      this._service.deleteRequirements(requirements, result.message).pipe(
        map((resp) => {
          this.toastr.success('Éxito', 'Eliminado satisfactoriamente')
          this.getRequirements(this.selectUser);
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
    this.getRequirements(this.search.controls.q.value);
  }
  canListReq(): boolean {
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
    this.getRequirements(this.selectUser);
  }
  openCreate(target) {
    this.newRequirementsForm.reset();
    this.openModal(target)
  }
  ///CRUD
  onCreate() {
    let newDisbursement: Requirements = {
      requirements_name: this.newRequirementsForm.controls.requirements_name.value,
    };
    let subscription = this._service.saveRequirements(newDisbursement).pipe(
      map((resp) => {
        this.closeBtnClick();
        this.newRequirementsForm.reset({})
        this.getRequirements(this.selectUser);
        this.toastr.success('Éxito', 'El Requisito fue Creado con Éxito.');
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
    this._service.updateRequirements(this.newRequirementsForm.value).pipe(
      map((resp) => {
        this.toastr.success('Éxito', 'El Requisito fue modificada con éxito.')
        this.getRequirements(this.selectUser)
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
  show(target, requirements) {
    this.actualRequirements = requirements;
    this.openModal(target)
  }
  edit(targetmodal, requirements) {
    this.actualRequirements = requirements;
    this.setDataForm()
    this.openModal(targetmodal);
  }


}
