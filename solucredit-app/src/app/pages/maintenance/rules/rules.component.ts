import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DeleteAlertService } from '../../../services/alerts/delete-alert.service'
import { map, catchError } from 'rxjs/operators';
import { PaginationTableData } from 'src/app/interfaces/ui/pagination-table.interface';
import { Rules } from 'src/app/models/rules.model';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { RulesService } from 'src/app/services/Maintenance/rules.service';
import { RuleTypeService } from 'src/app/services/Maintenance/rule-type.service';
import { of } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit, OnDestroy {
  exampleName = "Ej. Equipo";
  exampleDesc = "Ej. Servicio de Ventas";
  spanNameMessage = `El nombre de desembolso es requerido.`
  dataList: PaginationTableData = {
    metadata: [
      "No.",
      "Regla",
      "Descripción",
      "Tipo Regla",
      "Acciones"
    ],
    data: []
  }
  pageSize = 10;
  selectUser;
  actualRule;
  totalData: number;
  selectedProduct: any;
  page = 1;
  dataRuleType: any[];
  constructor(
    private autorization: AuthorizationService,
    private _service: RulesService,
    private _serviceT: RuleTypeService,
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
  newRuleForm = new FormGroup({
    id_rule: new FormControl(null),
    rule_name: new FormControl('', [Validators.required]),
    rule_description: new FormControl(),
    id_rulet: new FormControl('', [Validators.required]),
  })
  async ngOnInit() {
    this.pageSize = 10;
    this.selectUser = "";
    this.spinner.show()
    await this.getRulesType();
    this._service.getRules(this.pageSize, 0, this.selectUser).toPromise().then((rule) => {
      this.dataList.data = rule.rules;
      this.totalData = rule.count;
      console.log(this.dataList)
    })
    this._serviceT.getRuleTypes(-1, -1, []).toPromise().then((productT) => {
      this.dataRuleType = productT.ruletype
      console.log(this.dataRuleType)
      this.spinner.hide()
    }).catch((e) => {
      this.spinner.hide()
      this.toastr.error('error', 'Ocurrio un problema' + e.message);
    })
  }
  getRulesType() {
    this._serviceT.getRuleTypes(this.pageSize, 0, []).subscribe((c) => {
      this.dataRuleType = c.ruletype;
      console.log(this.dataRuleType);
    })
  }
  getRuleTypeName(value) {
    if (this.dataRuleType === undefined) { return '' }
    let find = this.dataRuleType.find((item) => item.id_ruletype == value)
    return find != undefined ? find.ruletype_name : ''
  }
  canCreateDis(): boolean {
    let resource = 'CLIENT';
    //CAMBIAR LOS PERMISOS TODO 
    return this.autorization.havePermission(resource, 'CREATE_DEB')
  }
  getRules(searchItem) {

    this._service.getRules(this.pageSize, (this.page - 1) * this.pageSize, searchItem).pipe(
      map((rules) => {
        this.dataList.data = rules.rules;
        this.totalData = rules.count;
      }),
      catchError((err) => {
        console.log(err)
        return of();
      })
    ).subscribe();
  }
  setDataForm() {
    this.newRuleForm.controls['id_rule'].setValue(this.actualRule.id_rule)
    this.newRuleForm.controls['rule_name'].setValue(this.actualRule.rule_name)
    this.newRuleForm.controls['rule_description'].setValue(this.actualRule.rule_description)
    this.newRuleForm.controls['id_rulet'].setValue(this.actualRule.id_rulet)
  }
  async showAlertDelete(rules) {
    const result = await this.delete_alert.showAlert()
    if (result.confirmed) {
      this._service.deleteRules(rules, result.message).pipe(
        map((resp) => {
          this.toastr.success('Éxito', 'Eliminado satisfactoriamente')
          this.getRules(this.selectUser);
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
    this.getRules(this.search.controls.q.value);
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
    this.getRules(this.selectUser);
  }
  openCreate(target) {
    this.newRuleForm.reset();
    this.openModal(target)
  }
  onCreate() {
    let newRules: Rules = {
      rule_name: this.newRuleForm.controls.rule_name.value,
      rule_description: this.newRuleForm.controls.rule_description.value,
      id_rulet: this.newRuleForm.controls.id_rulet.value
    };
    let subscription = this._service.saveRules(newRules).pipe(
      map((resp) => {
        this.closeBtnClick();
        this.newRuleForm.reset({})
        this.getRules(this.selectUser);
        this.toastr.success('Éxito', 'La Regla fue Creado con Éxito.');
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
    this._service.updateRules(this.newRuleForm.value).pipe(
      map((resp) => {
        this.toastr.success('Éxito', 'La Regla fue modificada con éxito.')
        this.getRules(this.selectUser)
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
  show(target, rule) {
    this.actualRule = rule;
    this.openModal(target)
  }
  edit(targetmodal, rule) {
    this.actualRule = rule;
    this.setDataForm()
    this.openModal(targetmodal);
  }
  resource = 'RULE'
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
