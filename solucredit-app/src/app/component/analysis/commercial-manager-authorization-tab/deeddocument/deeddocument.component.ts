import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { DeedDocument } from 'src/app/models/deedDocument.model';
import { AlertsService } from 'src/app/services/alerts.service';
import { DeedDocumentService } from 'src/app/services/analysis/deed-document.service';
import { PlaceHoldersService } from 'src/app/services/place-holders.service';
import { ExpresionFormatDate, ExpressionInputFormatDate } from 'src/Utils/constants';

@Component({
  selector: 'app-deeddocument',
  templateUrl: './deeddocument.component.html',
  styleUrls: ['./deeddocument.component.scss']
})
export class DeeddocumentComponent implements OnInit {

  @Input()
  analysisId?: number

  @Output()
  return_view = new EventEmitter()

  @Output()
  loading = new EventEmitter()

  deedDocumentForm = new FormGroup({
    deed_number: new FormControl('', [Validators.required]),
    act_number: new FormControl('', [Validators.required]),
    deed_signature_date: new FormControl('', []),
    quota_approval_date: new FormControl('', []),
    quota_expiration_date: new FormControl('', []),
    review_date: new FormControl('', []),
    previus_expiration_date: new FormControl('', []),
    quota_validity_period: new FormControl(1, [Validators.required]),
    notarys_name: new FormControl('', [Validators.required]),
    contract_type: new FormControl('', [Validators.required]),
    deed_type: new FormControl('', [Validators.required]),
  })
  contractTypeData: any[] = [
  ]
  deedDocumentTypeData: any[] = [

  ]
  initDeedDocument
  deedDocumentSelected: DeedDocument

  constructor(
    public placeHolders: PlaceHoldersService,
    private spinner: NgxSpinnerService,
    private _deedDocumentService: DeedDocumentService,
    private alerts: AlertsService,
    private datePipe: DatePipe
  ) { }
  async getContractTypeList() {
    const res = await this._deedDocumentService.getContractTypeList().toPromise().then((response) => {
      this.contractTypeData = response.map((item) => {
        return {
          name: item.contract_type_name,
          id: item.id
        }
      })
    })
    return res
  }
  async getDeedDocumentTypeList() {
    const res = await this._deedDocumentService.getDeedDocumentType().toPromise().then((response) => {
      console.log(response)
      this.deedDocumentTypeData = response.map((item) => {
        return {
          name: item.deed_type_name,
          id: item.id
        }
      })
    })
    return res
  }
  async ngOnInit() {
    this.loading.emit()
    this.spinner.show()
    let today = new Date()
    await this.getContractTypeList()
    await this.getDeedDocumentTypeList()
    let todaystring = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2)
    // this.deedDocumentForm.controls['deed_signature_date'].setValue(todaystring);
    // this.deedDocumentForm.controls['quota_approval_date'].setValue(todaystring);
    // this.deedDocumentForm.controls['quota_expiration_date'].setValue(todaystring);
    // this.deedDocumentForm.controls['review_date'].setValue(todaystring);
    // this.deedDocumentForm.controls['previus_expiration_date'].setValue(todaystring);
    await this.getInfo()
    this.spinner.hide()
  }
  async getInfo() {
    await this.getDeedDocument()
  }
  async getDeedDocument() {
    const res = this._deedDocumentService.getDocument(this.analysisId).toPromise().then((response) => {
      if (response == null) {
        this.initDeedDocument = false
      } else {
        this.initDeedDocument = true
        this.deedDocumentForm.patchValue({ ...response })
        this.deedDocumentSelected = response
        this.deedDocumentForm.controls.deed_signature_date.setValue(this.getDateString(response.deed_signature_date))
        this.deedDocumentForm.controls.quota_approval_date.setValue(this.getDateString(response.quota_approval_date))
        this.deedDocumentForm.controls.quota_expiration_date.setValue(this.getDateString(response.quota_expiration_date))
        this.deedDocumentForm.controls.review_date.setValue(this.getDateString(response.review_date))
        this.deedDocumentForm.controls.previus_expiration_date.setValue(this.getDateString(response.previus_expiration_date))
      }
    })
    return res
  }
  getDateString(today: Date) {
    if (today == null || today == undefined)
      return null
    today = new Date(today)
    let todaystring = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2)
    return todaystring
  }
  getDeedSignatureDate() {
    return new Date()
  }
  imprimir() {
    console.log(this.deedDocumentForm.value)
  }
  save() {
    let data = this.deedDocumentForm.value
    this.imprimir()
    if (this.initDeedDocument) {
      this.spinner.show()
      this._deedDocumentService.update(data, this.analysisId).toPromise().then((response) => {
        this.alerts.documentUpdated()
        this.initDeedDocument = true
        this.deedDocumentSelected = response
        this.deedDocumentForm.reset({})
        this.getInfo()
      }).catch((e) => {
        this.alerts.errorCreatedDocument(e)
      })
    } else {
      data.analysis_id = this.analysisId
      this.spinner.show()
      this._deedDocumentService.create(data).toPromise().then((response) => {
        this.alerts.documentCreated()
        this.initDeedDocument = true
        this.deedDocumentSelected = response
        this.deedDocumentForm.reset({})
        this.getInfo()
      }).catch((e) => {
        this.alerts.errorCreatedDocument(e)
      })
    }
  }
  close() {
    this.return_view.emit()
  }
}
