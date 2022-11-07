import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthorizedDebtorConditionSheet, ConditionSheet, CustomerMemberInformationConditionSheet } from 'src/app/models/conditionSheet.model';
import { ConditionSheetService } from 'src/app/services/analysis/condition-sheet.service';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { DebtorService } from 'src/app/services/debtors/debtor.service';
import { Debtor } from 'src/app/models/debtor.model';
import { PaymentMethod } from 'src/app/models/paymentMethod.model';
import { PaymentMethodService } from 'src/app/services/Maintenance/payment-method.service';
import { BanksService } from 'src/app/services/Maintenance/banks.service';
import { Banks } from 'src/app/models/bank.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { RateService } from 'src/app/services/Maintenance/rate.service';
import { Rate } from 'src/app/models/rate.model';
import { BranchofficeService } from 'src/app/services/Maintenance/branchoffice.service';
import { PlaceHoldersService } from 'src/app/services/place-holders.service';

@Component({
  selector: 'app-condition-sheet',
  templateUrl: './condition-sheet.component.html',
  styleUrls: ['./condition-sheet.component.scss']
})
export class ConditionSheetComponent implements OnInit {
  @Input()
  page_visible: Number

  @Input()
  customer_name: string

  @Input()
  amount: number

  @Input()
  customer_id: number

  @Input()
  requestAvalsInfo: any[]

  @Input()
  analysis_id: number

  @Output()
  returnView = new EventEmitter<Number>()



  createConditionSheetForm = new FormGroup({
    document_number: new FormControl("", [Validators.required]),
    place_and_date: new FormControl("", [Validators.required]),
    required_amount: new FormControl('', [Validators.required]),
    user_id: new FormControl('', []),
    // commission_rate: new FormControl('', [Validators.required]),
    // commission_rate_flat: new FormControl(0, [Validators.required]),
    // interest_rate: new FormControl(0, [Validators.required]),
    // arrears_interest: new FormControl('', [Validators.required]),
    // penalty_rate: new FormControl('', [Validators.required]),
    interest: new FormArray([], []),
    warranty_days: new FormControl('', [Validators.required]),
    administrative_expenses: new FormControl('', [Validators.required]),
    disbursement_expenses: new FormControl('', [Validators.required]),
    insurance: new FormControl('', [Validators.required]),
    other_conditions: new FormControl('', []),
    client_description: new FormControl('', []),
    customer_member_id: new FormControl(-1, []),
    customer_member_percentage: new FormControl(0, []),
    customer_member_work: new FormControl('', []),
    id_debtor: new FormControl(-1, []),
    id_payment_method: new FormControl(-1, []),
    id_bank: new FormControl(-1, []),
    debtor_maximum_amount_to_discount: new FormControl(0, []),
    debtor_warranty_days: new FormControl(0, []),
    debtor_commission_rate: new FormControl(0, []),
    branch_office: new FormControl(-1, [Validators.required])
  })
  updateMember = new FormGroup({
    customer_member_percentage: new FormControl(0, [Validators.required]),
    customer_member_work: new FormControl('', [Validators.required])
  })

  updateDebtor = new FormGroup({
    id_payment_method: new FormControl(0, [Validators.required]),
    id_bank: new FormControl(0, [Validators.required]),
    amount: new FormControl(0, [Validators.required]),
    warranty_days: new FormControl(0, [Validators.required]),
    percentage: new FormControl(0, [Validators.required]),
  })
  arraymodals = [];
  customCommisionPercentage = false
  customCommisionFlatPercentage = false
  customInterestRate = false
  customArrearsInterest = false
  customPenaltyRate = false
  conditionSheetSelected: ConditionSheet = null
  members = []
  membersConditionSheet: CustomerMemberInformationConditionSheet[] = []
  debtorsConditionSheet: AuthorizedDebtorConditionSheet[] = []
  debtorsList: Debtor[] = []
  paymentMethodList: PaymentMethod[] = []
  banksList: Banks[] = []
  memberSelected: CustomerMemberInformationConditionSheet
  debtorSelected: AuthorizedDebtorConditionSheet
  rates: Rate[] = []
  changeValuesRates = []
  branchOffice = -1
  branchOfficeList = []
  @Output()
  loading = new EventEmitter()
  constructor(
    private _conditionSheetService: ConditionSheetService,
    private toastr: ToastrService,
    private _debtor: DebtorService,
    private _paymentService: PaymentMethodService,
    private _bankService: BanksService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private _branchOfficeService: BranchofficeService,
    public placeHolders: PlaceHoldersService
  ) { }
  disabledAddMember() {
    return this.createConditionSheetForm.controls['customer_member_id'].value == -1
  }
  disabledAddDebtor() {
    return this.createConditionSheetForm.controls['id_debtor'].value == -1 || this.createConditionSheetForm.controls['id_payment_method'].value == -1 || this.createConditionSheetForm.controls['id_bank'].value == -1
  }
  async ngOnInit() {
    this.loading.emit()
    console.log('Hoja de Condiciones');
    this.spinner.show()
    this.createConditionSheetForm.controls['required_amount'].setValue(this.amount)
    this.createConditionSheetForm.controls['user_id'].setValue(this.customer_id)
    console.log(this.requestAvalsInfo)
    //para obtener el id del socio se va a usar el request subject detail en el cual tiene el id del socio
    this.requestAvalsInfo.forEach(item => {
      item.subjects.forEach(sub => {
        if (sub.subject_name.toLowerCase().includes('socio')&&!sub.subject_name.toLowerCase().includes('aval')) {
          this.members.push(sub)

        }
      }
      )
    })
    console.log(this.members)
    //INICIADOR DE METODOS

    await this.getConditionSheet()
    if (this.conditionSheetSelected) {
      await this.getMembers()
      await this.getDebtors()
      await this.getAllPaymentMethods()
      await this.getAllBanks()
      await this.getDebtorsConditionSheet()
      await this.getRates()
      await this.getSavedRates()
      await this.getAllBranchOffice()
      this.getOneRate()
    }

    this.spinner.hide()
  }
  async getAllBranchOffice() {
    const res = await this._branchOfficeService.getBranchOffice(-1, -1, []).toPromise().then(
      (response) => {
        console.log('BRANCHOFFICE')
        console.log(response)
        this.branchOfficeList = response.branchoffice
      }
    )
    return res
  }
  filterRates() {
    let result = this.rates.filter((item) => item.id_branchoffice == this.createConditionSheetForm.controls.branch_office.value)
    return result
  }
  getOneRate() {
    if (this.rates.length > 0) {
      let rate = this.rates[0]
      this.branchOffice = rate.id_branchoffice
    }
  }
  async getSavedRates() {
    const res = await this._conditionSheetService.getSavedRates(this.conditionSheetSelected.id_condition_sheet).toPromise().then(
      (response) => {
        console.log('RATES')
        console.log(response)
        //agregamos los valores por defecto almacenados
        response.forEach(item => {
          //necesitamos buscar el control que tiene el valor del id
          //buscar
          for (let i = 0; i < this.interest.length; i++) {
            let data = this.interest.controls[i].value
            if (data.id == item.id_rates) {
              //lo encontramos
              let control = this.interest.controls[i]
              control.setValue(
                {
                  ...control.value,
                  'amount': item.rate_amount,
                  'percentage': item.rate_percentage
                }
              )
              //en esta parte tenemos que ver si la tasa cambio para modificar el radio button
              if (item.rate_amount != this.rates.find(item2 => item.id_rates == item2.id_rates).rate_amount || item.rate_percentage != this.rates.find(item2 => item2.id_rates == item.id_rates).rate_percentage) {
                //son distintos
                let index = this.rates.findIndex(item2 => item.id_rates == item2.id_rates)
                this.changeValuesRates[index] = false
                //necesitamos refrescar al defecto cuando se le de
              }
            }
          }
        })
      }
    )
    return res
  }
  get interest() {
    return this.createConditionSheetForm.controls["interest"] as FormArray;
  }
  async getRates() {
    const res = await this._conditionSheetService.getRates().toPromise().then(
      (response) => {
        console.log('RATES')
        console.log(response)
        this.rates = response
        this.changeValuesRates = response.map(() => true)

        response.forEach(item => {
          const newform = new FormGroup(
            {
              id: new FormControl(item.id_rates, []),
              name: new FormControl(item.rule.rule_description, []),
              percentage: new FormControl(item.rate_percentage, [Validators.required]),
              amount: new FormControl(item.rate_amount, [Validators.required]),
              rate_type: new FormControl(item.default_s, [])
            }
          )
          this.interest.push(newform)
        })
        //tenemos que ver si el defecto es interest o monto
      }
    )
    return res
  }
  isDisabledRule(rate: Rate) {
    if (rate.default_s == 2) {
      //Monto
      if (rate.rule.rule_type.ruletype_amount == 0) {
        return false
      }
      return true
    } else {
      //Porcentaje
      if (rate.rule.rule_type.ruletype_percentage == 0) {
        return false
      }
      return true
    }
  }
  async getAllBanks() {
    const res = await this._bankService.getBanks(-1, -1, []).toPromise().then(
      (response) => {
        console.log(response)
        this.banksList = response.banks
      }
    )
    return res
  }
  async getAllPaymentMethods() {
    const res = await this._paymentService.getAll().toPromise().then(
      (response) => {
        console.log(response)
        this.paymentMethodList = response
      }
    )
    return res
  }
  async getDebtors() {
    console.log('Mandando Deudores');
    const res = await this._debtor.getALLDebtors().toPromise().then(
      (response) => {
        console.log(response)
        this.debtorsList = response.debtor
      }
    )
    return res
  }
  async getConditionSheet() {
    //Obtener la solicitud y de no ser asi se crea una nueva y se agrega el id
    const res = await this._conditionSheetService.getInit(this.analysis_id).toPromise().then(
      async (response) => {

        if (response == true) {
          //Actualizamos los valores de la condicion
          await this._conditionSheetService.getConditionSheet(this.analysis_id).toPromise().then(
            (condition) => {
              this.conditionSheetSelected = condition
              this.createConditionSheetForm.controls['document_number'].setValue(this.conditionSheetSelected.document_number)
              this.createConditionSheetForm.controls['place_and_date'].setValue(this.conditionSheetSelected.place_and_date)
              if (this.conditionSheetSelected.required_amount == null) {
                this.createConditionSheetForm.controls['required_amount'].setValue(this.amount)
              } else {
                this.createConditionSheetForm.controls['required_amount'].setValue(this.conditionSheetSelected.required_amount)
              }

              // this.createConditionSheetForm.controls['commission_rate'].setValue(this.conditionSheetSelected.commission_rate)
              //this.createConditionSheetForm.controls['commission_rate_flat'].setValue(this.conditionSheetSelected.commission_rate_flat)
              // this.createConditionSheetForm.controls['interest_rate'].setValue(this.conditionSheetSelected.interest_rate)
              // this.createConditionSheetForm.controls['arrears_interest'].setValue(this.conditionSheetSelected.arrears_interest)
              // this.createConditionSheetForm.controls['penalty_rate'].setValue(this.conditionSheetSelected.penalty_rate)
              this.createConditionSheetForm.controls['warranty_days'].setValue(this.conditionSheetSelected.warranty_days)
              this.createConditionSheetForm.controls['administrative_expenses'].setValue(this.conditionSheetSelected.administrative_expenses)
              this.createConditionSheetForm.controls['disbursement_expenses'].setValue(this.conditionSheetSelected.disbursement_expenses)
              this.createConditionSheetForm.controls['other_conditions'].setValue(this.conditionSheetSelected.other_conditions)
              this.createConditionSheetForm.controls['client_description'].setValue(this.conditionSheetSelected.client_description)
              this.createConditionSheetForm.controls['insurance'].setValue(this.conditionSheetSelected.insurance)
              this.createConditionSheetForm.controls['branch_office'].setValue(this.conditionSheetSelected.branch_office)

            }
          )
        } else {
          //Creamos una nueva
          this._conditionSheetService.init(this.analysis_id, this.customer_id).toPromise().then(
            async (newcondition) => {
              this.spinner.show()
              this.conditionSheetSelected = newcondition
              this.toastr.success('Hoja de condiciones Iniciada', 'Éxito')
              await this.getMembers()
              await this.getDebtors()
              await this.getAllPaymentMethods()
              await this.getAllBanks()
              await this.getDebtorsConditionSheet()
              await this.getRates()
              await this.getSavedRates()
              await this.getAllBranchOffice()
              this.spinner.hide()
            }
          )
        }
      }
    )
    return res
  }
  async getMembers() {
    const res = await this._conditionSheetService.listMembers(this.conditionSheetSelected.id_condition_sheet).toPromise().then(
      (response) => {
        this.membersConditionSheet = response

      }
    )
    return res
  }
  async getDebtorsConditionSheet() {
    const res = await this._conditionSheetService.listDebtors(this.conditionSheetSelected.id_condition_sheet).toPromise().then(
      (response) => {
        //console.log('AAAA')
        console.log(response)
        this.debtorsConditionSheet = response
      }
    )
    return res
  }
  changeCustomPercentage(change, value, valuedefect: Rate) {
    this.changeValuesRates[change] = value
    if (value == true) {
      //Regresamos a la normalidad
      let control = this.interest.controls[change]
      control.setValue({
        ...control.value,
        'amount': valuedefect.rate_amount,
        'percentage': valuedefect.rate_percentage
      })
    }
  }
  changeValue() {
    this.returnView.emit(1)
  }
  saveConditionSheet() {
    //Obtener los valores del form
    this.spinner.show()
    let data = this.createConditionSheetForm.value
    console.log(data)
    let interestaux = this.interest.value
    console.log(this.filterRates())
    console.log(interestaux)
    //Filtrar unicamente los que se estan visualizando
    let idfilterRates = this.filterRates().map(item => item.id_rates)
    //filtrar unicamente los de valor
    let newinterst = interestaux.filter(item => idfilterRates.includes(item.id))
    console.log(newinterst)
    this._conditionSheetService.updateConditionSheet(this.conditionSheetSelected.id_condition_sheet, data, newinterst).pipe(
      map((response) => {
        this.conditionSheetSelected = response
        this.toastr.success('Hoja de condiciones actualizada', 'Éxito')
        this.spinner.hide()
      }), catchError((err) => {
        this.spinner.hide()
        this.toastr.error('error', 'Ocurrio un problema' + err.message);
        return of();
      })
    ).subscribe()
  }
  createMember() {
    let data = this.createConditionSheetForm.value
    console.log(data)
    this.spinner.show()
    this._conditionSheetService.addCustomer(this.conditionSheetSelected.id_condition_sheet, data.customer_member_id, data.customer_member_work, data.customer_member_percentage).pipe(
      map((response) => {
        this.toastr.success('Socio Agregado', 'Éxito')
        this.getMembers()
        this.clearAddMember()
        this.spinner.hide()
      }), catchError((err) => {
        this.toastr.error('error', 'Ocurrio un problema' + err.message);
        this.spinner.hide()
        return of();
      })
    ).subscribe()
  }
  createDebtor() {
    let data = this.createConditionSheetForm.value
    console.log(data)
    this.spinner.show()
    this._conditionSheetService.addDebtor(this.conditionSheetSelected.id_condition_sheet, data.id_debtor, data.id_payment_method, data.id_bank, data.debtor_maximum_amount_to_discount, data.debtor_commission_rate, data.debtor_warranty_days).pipe(
      map((response) => {
        this.toastr.success('Deudor Agregado', 'Éxito')
        this.clearAddDebtor()
        this.getDebtorsConditionSheet()
        this.spinner.hide()
      }), catchError((err) => {
        this.toastr.error('error', 'Ocurrio un problema' + err.message);
        this.spinner.hide()
        return of();
      })
    ).subscribe()
  }
  deleteMember(id_member: number) {
    this._conditionSheetService.deleteMember(id_member).pipe(
      map((response) => {
        this.toastr.success('Socio Eliminado', 'Éxito')
        this.getMembers()
      }), catchError((err) => {
        this.toastr.error('error', 'Ocurrio un problema' + err.message);
        return of();
      })
    ).subscribe()
  }
  deleteDebtor(id_debtor: number) {
    this._conditionSheetService.deleteDebtor(id_debtor).pipe(
      map((response) => {
        this.toastr.success('Deudor Eliminado', 'Éxito')
        this.getDebtorsConditionSheet()
      }), catchError((err) => {
        this.toastr.error('error', 'Ocurrio un problema' + err.message);
        return of();
      })
    ).subscribe()
  }
  clearAddDebtor() {
    this.createConditionSheetForm.controls['id_debtor'].setValue(-1)
    this.createConditionSheetForm.controls['id_payment_method'].setValue(-1)
    this.createConditionSheetForm.controls['id_bank'].setValue(-1)
    this.createConditionSheetForm.controls['debtor_maximum_amount_to_discount'].setValue(0)
    this.createConditionSheetForm.controls['debtor_warranty_days'].setValue(0)
    this.createConditionSheetForm.controls['debtor_commission_rate'].setValue(0)
  }
  clearAddMember() {
    this.createConditionSheetForm.controls['customer_member_id'].setValue(-1)
    this.createConditionSheetForm.controls['customer_member_percentage'].setValue(0)
    this.createConditionSheetForm.controls['customer_member_work'].setValue('')
  }
  openModalMember(member, target) {
    console.log(member)
    this.memberSelected = member
    this.updateMember.controls['customer_member_percentage'].setValue(this.memberSelected.participation_percentage)
    this.updateMember.controls['customer_member_work'].setValue(this.memberSelected.worker_position)
    this.openModal(target)
  }
  openModalDebtor(debtor, target) {
    this.debtorSelected = debtor
    console.log(this.debtorSelected)
    this.updateDebtor.controls['id_payment_method'].setValue(this.debtorSelected.payment.id_payment)
    this.updateDebtor.controls['id_bank'].setValue(this.debtorSelected.bank.id_banks)
    this.updateDebtor.controls['amount'].setValue(this.debtorSelected.maximum_amount_to_discount)
    this.updateDebtor.controls['warranty_days'].setValue(this.debtorSelected.warranty_days)
    this.updateDebtor.controls['percentage'].setValue(this.debtorSelected.interest_rate)
    this.openModal(target)
  }
  openModal(targetModal) {
    this.arraymodals.push(
      this.modalService.open(targetModal, {
        centered: true,
        backdrop: "static",
        keyboard: false,
        size: "xl",
        windowClass: 'my-modal'
      }))
  }
  closeBtnClick() {
    if (this.arraymodals.length > 0)
      this.arraymodals.pop().close()

  }
  updateMemberMethod() {
    let data = this.updateMember.value
    this._conditionSheetService.updateMember(this.memberSelected.id, data.customer_member_percentage, data.customer_member_work).pipe(
      map((response) => {
        this.toastr.success('Socio actualizado', 'Éxito')
        this.getMembers()
        this.closeBtnClick()
      }), catchError((err) => {
        this.toastr.error('error', 'Ocurrio un problema' + err.message);
        return of();
      })
    ).subscribe()
  }
  updateDebtorMethod() {
    let data = this.updateDebtor.value
    this._conditionSheetService.updateDebtor(this.debtorSelected.id, data.id_payment_method, data.id_bank, data.amount, data.warranty_days, data.percentage).pipe(
      map((response) => {
        this.toastr.success('Deudor actualizado', 'Éxito')
        this.getDebtorsConditionSheet()
        this.closeBtnClick()
      }), catchError((err) => {
        this.toastr.error('error', 'Ocurrio un problema' + err.message);
        return of();
      })
    ).subscribe()
  }
  approveConditionSheet(approve: number) {
    this._conditionSheetService.approveConditionSheet(this.conditionSheetSelected.id_condition_sheet, approve).pipe(
      map((response) => {
        this.toastr.success('Hoja de condiciones actualizada', 'Éxito')
        this.conditionSheetSelected = response
      }),
      catchError((err) => {
        this.toastr.error('error', 'Ocurrio un problema' + err.message);
        return of();
      })
    ).subscribe()
  }
}
