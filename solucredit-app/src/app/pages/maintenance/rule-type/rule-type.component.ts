import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DeleteAlertService } from '../../../services/alerts/delete-alert.service'
import { map, catchError } from 'rxjs/operators';
import { PaginationTableData } from 'src/app/interfaces/ui/pagination-table.interface';
import { RuleType } from 'src/app/models/ruletype';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { RuleTypeService } from 'src/app/services/Maintenance/rule-type.service';
import { of } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-rule-type',
  templateUrl: './rule-type.component.html',
  styleUrls: ['./rule-type.component.scss']
})
export class RuleTypeComponent implements OnInit, OnDestroy {
  exampleName = "Ej. Servicio";
  spanNameMessage = `El Nombre del Tipo de Regla es Requerido.`
  dataList: PaginationTableData = {
    metadata: [
      "No.",
      "Tipo de Regla",
      "Porcentaje",
      "Monto",
      "Acciones"
    ],
    data: []
  }
  pageSize = 10;
  selectUser;
  actualRuleType;
  totalData: number;
  selectedRuleType: any;
  page = 1;
  constructor(
    private autorization: AuthorizationService,
    private _service: RuleTypeService,
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
  newRuleTypeForm = new FormGroup({
    id_ruletype: new FormControl(null),
    ruletype_name: new FormControl('', [Validators.required]),
    ruletype_percentage: new FormControl('', [Validators.required]),
    ruletype_amount: new FormControl('', [Validators.required]),
  })
  async ngOnInit() {
    //LISTAR TODOS LOS TIPOS DE REGLAS
    this.pageSize = 10;
    this.selectUser = "";
    this.spinner.show()
    this._service.getRuleTypes(this.pageSize, 0, this.selectUser).toPromise().then((ruletype) => {
      this.dataList.data = ruletype.ruletype;
      this.totalData = ruletype.count;
      console.log(this.dataList)
      this.spinner.hide()
    }).catch((e) => {
      this.spinner.hide()
      this.toastr.error('error', 'Ocurrio un problema' + e.message);
    })
  }
  canCreateDis(): boolean {
    let resource = 'CLIENT';
    //CAMBIAR LOS PERMISOS TODO 
    return this.autorization.havePermission(resource, 'CREATE_DEB')
  }
  getRuleType(searchItem) {
    this._service.getRuleTypes(this.pageSize, (this.page - 1) * this.pageSize, searchItem).pipe(
      map((ruletype) => {
        this.dataList.data = ruletype.ruletype;
        this.totalData = ruletype.count;
      }),
      catchError((err) => {
        console.log(err)
        return of();
      })
    ).subscribe();
  }
  setDataForm() {
    this.newRuleTypeForm.controls['ruletype_name'].setValue(this.actualRuleType.ruletype_name)
    this.newRuleTypeForm.controls['id_ruletype'].setValue(this.actualRuleType.id_ruletype)
    this.newRuleTypeForm.controls['ruletype_percentage'].setValue(this.actualRuleType.ruletype_percentage)
    this.newRuleTypeForm.controls['ruletype_amount'].setValue(this.actualRuleType.ruletype_amount)
  }
  async showAlertDelete(ruletype) {
    const result = await this.delete_alert.showAlert()
    if (result.confirmed) {
      this._service.deleteRuleType(ruletype, result.message).pipe(
        map((resp) => {
          this.toastr.success('Éxito', 'Eliminado satisfactoriamente')
          this.getRuleType(this.selectUser);
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
    this.getRuleType(this.search.controls.q.value);
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
    this.getRuleType(this.selectUser);
  }
  openCreate(target) {
    this.newRuleTypeForm.reset();
    this.openModal(target)
  }
  ///CRUD
  onCreate() {
    let newRuleType: RuleType = {
      ruletype_name: this.newRuleTypeForm.controls.ruletype_name.value,
      ruletype_percentage: this.newRuleTypeForm.controls.ruletype_percentage.value,
      ruletype_amount: this.newRuleTypeForm.controls.ruletype_amount.value
    };
    let subscription = this._service.saveRuleType(newRuleType).pipe(
      map((resp) => {
        this.closeBtnClick();
        this.newRuleTypeForm.reset({})
        this.getRuleType(this.selectUser);
        this.toastr.success('Éxito', 'El Tipo de Regla fue Creado con Éxito.');
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
    this._service.updateRuleType(this.newRuleTypeForm.value).pipe(
      map((resp) => {
        this.toastr.success('Éxito', 'El desembolso fue modificada con éxito.')
        this.getRuleType(this.selectUser)
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
  show(target, ruletype) {
    this.actualRuleType = ruletype;
    this.openModal(target)
  }
  edit(targetmodal, ruletype) {
    this.actualRuleType = ruletype;
    this.setDataForm()
    this.openModal(targetmodal);
  }
  resource = 'RULE_TYPE'
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
