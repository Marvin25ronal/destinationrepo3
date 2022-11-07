import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DeleteAlertService } from '../../../services/alerts/delete-alert.service'
import { map, catchError } from 'rxjs/operators';
import { PaginationTableData } from 'src/app/interfaces/ui/pagination-table.interface';
import { CouncilMember } from 'src/app/models/councilmember.model';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { CouncilmembertypeService } from 'src/app/services/Maintenance/councilmembertype.service';
import { CouncilmembersService } from 'src/app/services/Maintenance/councilmembers.service';
import { of } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-councilmembers',
  templateUrl: './councilmembers.component.html',
  styleUrls: ['./councilmembers.component.scss']
})
export class CouncilmembersComponent implements OnInit {
  exampleName = "Jefe - Aval";
  spanNameMessage = `Es requerido el nombre.`
  dataList: PaginationTableData = {
    metadata: [
      "No.",
      "Tipo de Miembro",
      "Nombre",
      "Inicio",
      "Final",
      "Nota",
      "Acciones"
    ],
    data: []
  }
  pageSize = 10;
  selectUser;
  actualCouncilMember;
  totalData: number;
  selectedCouncilMember: any;
  page = 1;
  councilMemberType;
  constructor(
    private autorization: AuthorizationService,
    private _service: CouncilmembersService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private delete_alert: DeleteAlertService,
    private _councilTypeserv: CouncilmembertypeService,
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
  newCouncilMemberForm = new FormGroup({
    council_memeber_id: new FormControl(null),
    council_member_type_id: new FormControl(null),
    council_full_name: new FormControl('', [Validators.required]),
    period_start_date: new FormControl('', [Validators.required]),
    period_end_date: new FormControl('', [Validators.required]),
    note: new FormControl('', [Validators.required]),
    status: new FormControl(null),
  })
  async ngOnInit() {
    this.getCouncilMemberType()
    this.pageSize = 10;
    this.selectUser = "";
    this.spinner.show()
    await this._service.getCouncilMembers(this.pageSize, 0, this.selectUser).toPromise().then((cm) => {
      console.log(cm)
      this.dataList.data = cm.councilmember;
      this.totalData = cm.count;
      console.log(this.dataList)
      this.spinner.hide()
    }).catch((e) => {
      this.spinner.hide()
      this.toastr.error('error', 'Ocurrio un problema' + e.message);
    })
    console.log(this.selectUser)
  }
  getCouncilMemberTypeName(value) {
    if (this.councilMemberType === undefined) { return '' }
    let find = this.councilMemberType.find((item) => item.council_member_type_id == value)
    return find != undefined ? find.counsil_memeber_type_name : ''
  }
  async getCouncilMemberType() {
    debugger
    let sub = this._councilTypeserv.getCouncilMemberType().pipe(
      map((response) => {
        console.log(response)
        console.log('Mandando Datos')
        this.councilMemberType = response
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
  getCouncilMembers(searchItem) {

    this._service.getCouncilMembers(this.pageSize, (this.page - 1) * this.pageSize, searchItem).pipe(
      map((cm) => {
        console.log(cm)
        this.dataList.data = cm.councilmember;
        this.totalData = cm.count;
      }),
      catchError((err) => {
        console.log(err)
        return of();
      })
    ).subscribe();
  }
  setDataForm() {
    this.newCouncilMemberForm.controls['council_memeber_id'].setValue(this.actualCouncilMember.council_memeber_id)
    this.newCouncilMemberForm.controls['council_member_type_id'].setValue(this.actualCouncilMember.council_member_type_id)
    this.newCouncilMemberForm.controls['council_full_name'].setValue(this.actualCouncilMember.council_full_name)
    this.newCouncilMemberForm.controls['period_start_date'].setValue(this.actualCouncilMember.period_start_date)
    this.newCouncilMemberForm.controls['period_end_date'].setValue(this.actualCouncilMember.period_end_date)
    this.newCouncilMemberForm.controls['note'].setValue(this.actualCouncilMember.note)
    this.newCouncilMemberForm.controls['status'].setValue(this.actualCouncilMember.status)
  }
  async showAlertDelete(fp) {
    const result = await this.delete_alert.showAlert()
    if (result.confirmed) {
      this._service.deleteCouncilMembers(fp, result.message).pipe(
        map((resp) => {
          this.toastr.success('Éxito', 'Eliminado satisfactoriamente')
          this.getCouncilMembers(this.selectUser);
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
    this.getCouncilMembers(this.search.controls.q.value);
  }
  canListCouncilMembers(): boolean {
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
    this.getCouncilMembers(this.selectUser);
  }
  openCreate(target) {
    this.newCouncilMemberForm.reset();
    this.openModal(target)
  }
  ///CRUD
  onCreate() {
    let newCouncilMember: CouncilMember = {
      council_memeber_id: this.newCouncilMemberForm.controls.council_memeber_id.value,
      council_member_type_id: this.newCouncilMemberForm.controls.council_member_type_id.value,
      council_full_name: this.newCouncilMemberForm.controls.council_full_name.value,
      period_start_date: this.newCouncilMemberForm.controls.period_start_date.value,
      period_end_date: this.newCouncilMemberForm.controls.period_end_date.value,
      note: this.newCouncilMemberForm.controls.note.value,
      status: this.newCouncilMemberForm.controls.status.value,
    };
    let subscription = this._service.saveCouncilMembers(newCouncilMember).pipe(
      map((resp) => {
        this.closeBtnClick();
        this.newCouncilMemberForm.reset({})
        this.getCouncilMembers(this.selectUser);
        this.toastr.success('Éxito', 'El Miembro fue creado con éxito.');
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
    this._service.updateCouncilMembers(this.newCouncilMemberForm.value).pipe(
      map((resp) => {
        console.log(resp)
        this.toastr.success('Éxito', 'El Miembro fue actualizado con éxito.');
        this.getCouncilMembers(this.selectUser)
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
    this.actualCouncilMember = fp;
    this.openModal(target)
  }
  edit(targetmodal, fp) {
    this.actualCouncilMember = fp;
    this.setDataForm()
    this.openModal(targetmodal);
  }
  resource = 'COUNCIL_MEMBERS'
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
