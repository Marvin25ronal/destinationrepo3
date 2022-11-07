import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DeleteAlertService } from '../../../services/alerts/delete-alert.service'
import { map, catchError } from 'rxjs/operators';
import { PaginationTableData } from 'src/app/interfaces/ui/pagination-table.interface';
import { Rate } from 'src/app/models/rate.model';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { RateService } from 'src/app/services/Maintenance/rate.service';
import { BranchofficeService } from 'src/app/services/Maintenance/branchoffice.service';
import { RateTypeService } from 'src/app/services/Maintenance/rate-type.service';
import { RulesService } from 'src/app/services/Maintenance/rules.service';
import { of } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss']
})
export class RateComponent implements OnInit, OnDestroy {
  exampleName = "Ej. 50";
  exampleName2 = "Ej. 120";
  exampleName3 = "Ej. Tasa";
  spanNameMessage = `El dato es requerido.`
  dataList: PaginationTableData = {
    metadata: [
      "No.",
      "Sucursal",
      "Descripción",
      "Tipo Tasa",
      "Porcentaje",
      "Monto",
      "Defecto",
      "Acciones"
    ],
    data: []
  }
  pageSize = 10;
  selectUser;
  actualRate;
  totalData: number;
  selectedRate: any;
  page = 1;
  dataRateType: any[];
  dataBranchOffice: any[];
  dataRuleType: any[];
  radio1: any;
  constructor(
    private autorization: AuthorizationService,
    private _service: RateService,
    private _serviceRT: RateTypeService,
    private _serviceRulT: RulesService,
    private _serviceB: BranchofficeService,
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
  newRateForm = new FormGroup({
    id_rates: new FormControl(null),
    id_branchoffice: new FormControl('', [Validators.required]),
    id_rule: new FormControl('', [Validators.required]),
    id_ratet: new FormControl('', [Validators.required]),
    rate_percentage: new FormControl('', [Validators.required]),
    rate_description: new FormControl('', [Validators.required]),
    rate_amount: new FormControl('', [Validators.required]),
    default_s: new FormControl('', [Validators.required]),
  })

  async ngOnInit() {
    this.pageSize = 10;
    this.selectUser = "";
    this.spinner.show()
    await this.getRateType();
    await this.getRuleType();
    await this.getBranchOffice();

    this._service.getRates(this.pageSize, 0, this.selectUser).subscribe((rate) => {
      this.dataList.data = rate.rate;
      this.totalData = rate.count;
      console.log(this.dataList)
    })
    this._serviceRT.getRateType(-1, -1, []).toPromise().then((rtype) => {
      this.dataRateType = rtype.ratetype
      console.log(this.dataRateType)
    }).catch((e) => {
      this.spinner.hide()
      this.toastr.error('error', 'Ocurrio un problema' + e.message);
    })
    this._serviceRulT.getRules(-1, -1, []).toPromise().then((rultype) => {
      this.dataRuleType = rultype.rules
      console.log(this.dataRuleType)
    }).catch((e) => {
      this.spinner.hide()
      this.toastr.error('error', 'Ocurrio un problema' + e.message);
    })
    this._serviceB.getBranchOffice(-1, -1, []).toPromise().then((rtype) => {
      this.dataBranchOffice = rtype.branchoffice
      console.log(this.dataBranchOffice)
      this.spinner.hide()
    }).catch((e) => {
      this.spinner.hide()
      this.toastr.error('error', 'Ocurrio un problema' + e.message);
      this.spinner.hide()
    })
    
  }
  getRateType() {
    this._serviceRT.getRateType(this.pageSize, 0, []).subscribe((c) => {
      this.dataRateType = c.ratetype;
      console.log(this.dataRateType);
    })
  }
  getRateTypeName(value) {
    if (this.dataRateType === undefined) { return '' }
    let find = this.dataRateType.find((item) => item.id_ratetype == value)
    return find != undefined ? find.ratetype_name : ''
  }
  getRuleType() {
    this._serviceRulT.getRules(this.pageSize, 0, []).subscribe((c) => {
      this.dataRuleType = c.rules;
      console.log(this.dataRuleType);
    })
  }
  getRuleTypeName(value) {
    if (this.dataRuleType === undefined) { return '' }
    let find = this.dataRuleType.find((item) => item.id_rule == value)
    return find != undefined ? find.rule_name : ''
  }
  getBranchOffice() {
    this._serviceB.getBranchOffice(this.pageSize, 0, []).subscribe((c) => {
      this.dataBranchOffice = c.branchoffice;
      console.log(this.dataBranchOffice);
    })
  }
  getBranchOfficeName(value) {
    if (this.dataBranchOffice === undefined) { return '' }
    let find = this.dataBranchOffice.find((item) => item.id_branchoffice == value)
    return find != undefined ? find.branchoffice_name : ''
  }
  canCreateDis(): boolean {
    let resource = 'CLIENT';
    //CAMBIAR LOS PERMISOS TODO 
    return this.autorization.havePermission(resource, 'CREATE_DEB')
  }
  getRates(searchItem) {

    this._service.getRates(this.pageSize, (this.page - 1) * this.pageSize, searchItem).pipe(
      map((rate) => {
        this.dataList.data = rate.rate;
        this.totalData = rate.count;
      }),
      catchError((err) => {
        console.log(err)
        return of();
      })
    ).subscribe();
  }
  changeSelected(value) {
    if (value === 1) {
      this.newRateForm.controls['default_s'].setValue(1)
    }
    else {
      this.newRateForm.controls['default_s'].setValue(2)
    }
    console.log('Cambiado')
  }
  onItemChange(value) {
    console.log(" Value is : ", value);
  }
  async setDataForm() {
    this.radio1 = this.actualRate.default_s;
    await this.changeSelected(this.radio1 == 1 ? 1 : 2);
    this.newRateForm.controls['id_rates'].setValue(this.actualRate.id_rates)
    this.newRateForm.controls['id_branchoffice'].setValue(this.actualRate.id_branchoffice)
    this.newRateForm.controls['rate_description'].setValue(this.actualRate.rate_description)
    this.newRateForm.controls['id_rule'].setValue(this.actualRate.id_rule)
    this.newRateForm.controls['id_ratet'].setValue(this.actualRate.id_ratet)
    this.newRateForm.controls['rate_percentage'].setValue(this.actualRate.rate_percentage)
    this.newRateForm.controls['rate_amount'].setValue(this.actualRate.rate_amount)
  }
  async showAlertDelete(rate) {
    const result = await this.delete_alert.showAlert()
    if (result.confirmed) {
      this._service.deleteRates(rate, result.message).pipe(
        map((resp) => {
          this.toastr.success('Éxito', 'Eliminado satisfactoriamente')
          this.getRates(this.selectUser);
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
    this.getRates(this.search.controls.q.value);
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
    this.getRates(this.selectUser);
  }
  openCreate(target) {
    this.newRateForm.reset();
    this.openModal(target)
  }
  onCreate() {
    let newRate: Rate = {
      id_branchoffice: this.newRateForm.controls.id_branchoffice.value,
      id_rule: this.newRateForm.controls.id_rule.value,
      id_ratet: this.newRateForm.controls.id_ratet.value,
      rate_percentage: this.newRateForm.controls.rate_percentage.value,
      rate_amount: this.newRateForm.controls.rate_amount.value,
      default_s: this.newRateForm.controls.default_s.value,
      rate_description: this.newRateForm.controls.rate_description.value
    };
    let subscription = this._service.saveRate(newRate).pipe(
      map((resp) => {
        this.closeBtnClick();
        this.newRateForm.reset({})
        this.getRates(this.selectUser);
        this.toastr.success('Éxito', 'El Producto fue Creado con Éxito.');
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
    this._service.updateRates(this.newRateForm.value).pipe(
      map((resp) => {
        this.toastr.success('Éxito', 'La condición fue modificada con éxito.')
        this.getRates(this.selectUser)
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
  show(target, rate) {
    this.actualRate = rate;
    this.openModal(target)
  }
  edit(targetmodal, rate) {
    this.actualRate = rate;
    this.setDataForm()
    this.openModal(targetmodal);
  }
  resource = 'CONDITION'
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
