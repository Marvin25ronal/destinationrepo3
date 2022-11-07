import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ButtonModel, OptionsModel } from 'src/app/models/Fdt.model';
import { WFActivity, WFActivityView, WFWorkflow, WF_Document } from 'src/app/models/wf_document.model';
import { HandlerFunctionService } from 'src/app/services/fdt/handler-function.service';
import { WfDocumentService } from 'src/app/services/fdt/wf-document.service';
import { PaginationTableData } from 'src/app/interfaces/ui/pagination-table.interface';
import Swal from 'sweetalert2';
import { SweetAlertIcon } from 'sweetalert2'
import { HistoryService } from 'src/app/services/fdt/history.service';
import { WFDocumentHistory } from 'src/app/models/wf_document_history';
import { NgxSpinnerService } from 'ngx-spinner';
import { map, catchError } from 'rxjs/operators';
import { ExportToCsv } from 'export-to-csv';
import { of } from 'rxjs';
export interface ShowViewInterface {
  show_views: string[]
  selected_name: string,
  default_views: WFActivityView[],
  document_serie_id: number
}
@Component({
  selector: 'app-directive',
  templateUrl: './directive.component.html',
  styleUrls: ['./directive.component.scss']
})
export class DirectiveComponent implements OnInit {

  @ViewChild('historymodal') historymodal: TemplateRef<any>;

  @Input()
  request_id: number

  @Input()
  customer_type: number = 0


  pageSize = 10
  page = 1
  dataList: PaginationTableData = {
    metadata: [
      "Fecha/Hora",
      "Actividades",
      "Evento",
      "Tipo",
      "Respuesta",

      "Estado",
      "Es Requerido",
    ],
    data: []
  }

  @Input()
  class: string

  @Input()
  spinner

  @Output()
  blockComponent?= new EventEmitter()

  @Output()
  showViews?= new EventEmitter<ShowViewInterface>()

  @Input()
  userID?: number




  options?: OptionsModel[] = []

  docCode: string
  description: string
  note: string
  document: WF_Document
  activity: WFActivity
  buttons: ButtonModel[] = []
  workflow: WFWorkflow
  arraymodals = [];
  dataBitacora: WFDocumentHistory
  date = new Date()

  selectedStatus: any = -1;
  info: any;
  totalData: any;
  selectUser;
  dataBitacoraComplete: any;
  constructor(
    private _service: HandlerFunctionService,
    private _wFService: WfDocumentService,
    private modalService: NgbModal,
    private _history: HistoryService,

  ) { }

  async ngOnInit() {

    await this.getDocument()
    await this.getActivity()
    await this.getButtons()
    await this.getOptions()

    await this.getWorkFlow()
    await this.getBitacora()
    await this.getInfo()
    this.pageSize = 10;
    this.selectUser = this.document.document_number;
    this._history.getHistoryList(this.pageSize, 0, this.selectUser).subscribe((fp) => {
      console.log('| | | | |  | | |  | | | | |  | | | |  | |');
      this.dataList.data = fp.data;
      this.totalData = fp.count;
      console.log(this.dataList)
    })
    console.log(this.selectUser)
    await this.getShowViews()
  }
  async getWorkFlow() {
    const res = this._wFService.getWorkflow(this.activity.wf_workflow_id).toPromise().then(
      (response) => {
        console.log('WORKFLOW')
        this.workflow = response
      }
    )
    return res
  }
  async getShowViews() {
    //En este metodo necesitamos obtener el listado de vistas a las que puede acceder el componente padre

    const res = await this._wFService.getShowViews(this.activity.wf_activity_id, localStorage.getItem("email")).toPromise().then(
      (response) => {
        console.log('VIEWS')
        console.log(response)

        //De las vistas tenemos que filtrar solo nombres
        let data = response.map(item => item.view.name_enum)
        let selected = response.find(item => item.is_default == 1)
        let send: ShowViewInterface = {
          selected_name: selected ? selected.view.name_enum : '',
          show_views: data,
          default_views: response.filter(item => item.is_default == 1),
          document_serie_id: this.document.wf_document_serie_id
        }
        this.showViews.emit(send)
      }
    )
    return res
  }

  async getDocument() {
    const res = this._wFService.getWFDocs(this.request_id).toPromise().then(
      (response) => {
        console.log('DIRECTIVE')
        console.log(response)

        this.document = response
        this.docCode = response.document_number
      }
    )
    return res
  }
  castDescription(description: string) {
    
    if (description.includes('INDIVIDUAL:') || description.includes('JURIDICO:')) {
      //INDIVIDUAL VIENE DESDE 0 
      //JURIDICO VIENE DE ULTIMO
      if (this.customer_type==0) {
        return description.substring('INDIVIDUAL:'.length, description.indexOf('JURIDICO:'))
      }else{
        return description.substring(description.indexOf('JURIDICO:') + 'JURIDICO:'.length, description.length)
      }
    }
    return description
  }
  async getActivity() {
    const res = this._wFService.getActivity(this.document.wf_activity_id).toPromise().then(
      (response) => {
        this.activity = response
        this.description = response.name
        this.note = this.castDescription(response.description)
      }
    )
    return res
  }
  async getButtons() {
    const res = this._wFService.getButtons(this.document.wf_activity_id, localStorage.getItem("email")).toPromise().then(
      (response) => {
        this.buttons = []
        this.buttons = response.map((item) => ({
          text: item.name,
          class: item.class_name,
          name_function: item.function_name,
          description: item.description,
          action_type_id: item.wf_action_type_id,
          sort: item.sort
        }))
        this.buttons = this.buttons.sort((a, b) => {
          if (a.sort < b.sort) {
            return -1
          }
          if (a.sort > b.sort) {
            return 1
          }
          return 0
        })
        console.log('ORRDENADO')
        console.log(this.buttons)
      }
    )

    return res
  }
  async getOptions() {
    const res = this._wFService.getOptions(this.document.wf_activity_id, localStorage.getItem("email")).toPromise().then((response) => {
      this.options = response.map((item) => ({
        id: item.wf_activity_interface_option_id,
        text: item.name,
        name_function: item.function_name,
        description: item.description,
        class_name: item.class_name,
        action_type_id: item.wf_action_type_id,
        sort: item.sort
      }))
      this.options = this.options.sort((a, b) => {
        if (a.sort < b.sort) {
          return -1
        }
        if (a.sort > b.sort) {
          return 1
        }
        return 0
      })
      // console.log('TTTT')
      // console.log(this.options)
    })

    return res
  }
  getBitacora() {
    const res = this._history.getBitacora(this.document.wf_document_id).toPromise().then((response) => {
      console.log(response);
      this.dataBitacoraComplete = response;
    }).catch((error) => {
      console.log(error)
    })
    return res
  }

  async getInfo() {
    const res = this._history.getInfo(this.document.id_request).toPromise().then((response) => {
      console.log('Mandando Cliente');
      console.log(response);
      this.info = response
      //console.log(this.info.body);
    })
    return res
  }
  async reloadData() {
    this.spinner.show()
    await this.getDocument()
    await this.getActivity()
    await this.getButtons()
    await this.getOptions()
    await this.getWorkFlow()
    await this.getBitacora()
    await this.getInfo()
    await this.getShowViews()
    this.selectedStatus = -1
  }
  async llamar(name: string, btn: ButtonModel) {
    this.spinner.show()
    let arr = []
    arr['@action_type_id'] = btn.action_type_id
    arr['@refresh_data'] = () => {
      this.reloadData()
    }
    arr['@open_modal'] = () => {
      this.open()
      console.log('Prueba')
    }
    arr['@wf_action_type_id'] = btn.action_type_id
    arr['@activity_name'] = this.activity.name
    arr['@request_id'] = this.request_id
    arr['@spinner'] = this.spinner
    arr['@user_id'] = this.userID
    let historyData = {
      wf_worflow_id: this.workflow.wf_workflow_id,
      wf_worflow_name: this.workflow.name,
      wf_status_id: this.workflow.wf_status.wf_status_id,
      wf_status_name: this.workflow.wf_status.name,
      wf_activity_id: this.activity.wf_activity_id,
      wf_activity_name: this.activity.name,
      wf_activity_status: this.activity.status,
      wf_document_id: this.document.wf_document_id,
      wf_document_number: this.document.document_number,
      email_owner: localStorage.getItem("email")
    }
    arr['@history_data'] = historyData
    let val = await this._service.handler(name, this.document.wf_document_id, arr)
    //this.spinner.hide()
    console.log(val)
    return true
  }
  async llamarOption(name: string, options: OptionsModel) {

    let arr = []
    arr['@action_type_id'] = options.action_type_id
    arr['@refresh_data'] = () => {
      this.reloadData()
    }
    arr['@open_modal'] = () => {
      this.open()
      console.log('Prueba')
    }
    arr['@wf_action_type_id'] = options.action_type_id
    arr['@activity_name'] = this.activity.name
    arr['@option_name'] = options.text
    arr['@request_id'] = this.request_id
    arr['@user_id'] = this.userID
    let historyData = {
      wf_worflow_id: this.workflow.wf_workflow_id,
      wf_worflow_name: this.workflow.name,
      wf_status_id: this.workflow.wf_status.wf_status_id,
      wf_status_name: this.workflow.wf_status.name,
      wf_activity_id: this.activity.wf_activity_id,
      wf_activity_name: this.activity.name,
      wf_activity_status: this.activity.status,
      wf_document_id: this.document.wf_document_id,
      wf_document_number: this.document.document_number,
      email_owner: localStorage.getItem("email")
    }
    arr['@history_data'] = historyData
    let val = await this._service.handler(name, this.document.wf_document_id, arr)
    console.log(val)
    return true
  }
  private getIcon(class_name): SweetAlertIcon {
    switch (class_name) {
      case 'error':
        return 'error'
      case 'warning':
        return 'warning'
      case 'success':
        return 'success'
      case 'question':
        return 'question'
      case 'info':
        return 'info'
    }
  }
  open() {
    this.openModal(this.historymodal)
  }
  closeBtnClick() {
    if (this.arraymodals.length > 0)
      this.arraymodals.pop().close()
  }
  changeOption(object) {
    let find = this.options.find(item => item.id == object)
    this.llamarOption(find.name_function, find)
  }

  block() {
    this.blockComponent?.emit()
  }
  getButtonsArray() {
    return this.buttons
  }
  openModal(targetModal) {
    this.arraymodals.push(
      this.modalService.open(targetModal, {
        centered: true,
        backdrop: "static",
        keyboard: false,
        size: "xxl",
        windowClass: 'my-modal'
      }))

  }
  pageChange(e) {
    this.getListHistory(this.selectUser)
  }
  getListHistory(searchItem: any) {
    this._history.getHistoryList(this.pageSize, (this.page - 1) * this.pageSize, searchItem).pipe(
      map((fp) => {
        this.dataList.data = fp.data.sort((a, b) => b.wf_document_history_id - a.wf_document_history_id);
        console.log(this.dataList.data);
        this.totalData = fp.count;
      }),
      catchError((err) => {
        console.log(err)
        return of();
      })
    ).subscribe();
  }
  generateCSV() {
    let mes = new Date().getMonth() + 1
    let dia = new Date().getDate()
    let anio = new Date().getFullYear()
    let fecha = `${dia}-${mes}-${anio}`
    console.log(this.dataBitacoraComplete);
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: `Registro actividades ${this.document.document_number} - ${fecha}`,
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      //headers: ['Column 1', 'Column 2', 'Column 1', 'Column 2', 'Column 1', 'Column 2', 'Column 1',] //<-- Won't work with useKeysAsHeaders present!
    };

    const csvExporter = new ExportToCsv(options);
    csvExporter.options.filename = `Bitacora ${this.document.document_number} - ${fecha}`
    csvExporter.generateCsv(this.dataBitacoraComplete);

  }
}
