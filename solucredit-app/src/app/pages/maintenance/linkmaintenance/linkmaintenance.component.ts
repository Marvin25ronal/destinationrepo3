import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PaginationTableData } from 'src/app/interfaces/ui/pagination-table.interface';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { SyslinkService } from 'src/app/services/Maintenance/syslink.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-linkmaintenance',
  templateUrl: './linkmaintenance.component.html',
  styleUrls: ['./linkmaintenance.component.scss']
})
export class LinkmaintenanceComponent implements OnInit {
  placeholder = 'Buscar enlace';
  search = new FormGroup({
    q: new FormControl(null),
  })
  dataList: PaginationTableData = {
    metadata: [
      "No.",
      "Nombre",
      "Descripción",
      "Acciones"
    ],
    data: []
  }
  resource = 'LINKS'
  totalData: number;
  page = 1;
  pageSize = 10;
  selectUser;
  actualRequest;
  selectDoc: any;
  newDoc = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    link: new FormControl('', [Validators.required])
  })
  constructor(
    private autorization: AuthorizationService,
    private _service: SyslinkService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private modalService: NgbModal,
  ) { }

  async ngOnInit() {
    this.pageSize = 10
    this.selectUser = ""
    this.spinner.show()
    this._service.list(this.pageSize, 0, this.selectUser).toPromise().then((response) => {
      this.dataList.data = response.data
      this.totalData = response.count
      this.spinner.hide()
    }).catch((e) => {
      this.spinner.hide()
      this.toastr.error('error', 'Ocurrio un problema' + e.message);
    })
  }
  goLink(item) {
    window.open(item.link)
  }
  searchTerm() {
     this.getList(this.search.controls.q.value);
  }
  canList(): boolean {
    return this.autorization.havePermission(this.resource, 'LIST')
  }
  canEdit(): boolean {
    return this.autorization.havePermission(this.resource, 'EDIT')
  }

  canSee(): boolean {
    return this.autorization.havePermission(this.resource, 'SEE')
  }
  edit(targetmodal, item) {
    this.actualRequest = item
    this.newDoc.controls['id'].setValue(this.actualRequest.id)
    this.newDoc.controls['description'].setValue(this.actualRequest.description)
    this.newDoc.controls['link'].setValue(this.actualRequest.link)
    this.newDoc.controls['name'].setValue(this.actualRequest.name)
    this.openModal(targetmodal)
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
  getList(search) {
    this._service.list(this.pageSize, (this.page - 1), search).toPromise().then((response) => {
      this.dataList.data = response.data
      this.totalData = response.count
      this.spinner.hide()
    }).catch((e) => {
      this.spinner.hide()
      this.toastr.error('error', 'Ocurrio un problema' + e.message);
    })
  }
  closeBtnClick() {
    this.modalService.dismissAll();
  }
  saveChanges() {
    this.spinner.show()
    this._service.update(this.newDoc.value).toPromise().then(
      (resp) => {
        this.toastr.success('Éxito', 'El link fue actualizado con éxito.')
        this.getList(this.selectUser)
        this.closeBtnClick()
        this.spinner.hide()
      }).catch((e) => {
        this.toastr.error('error', 'Ocurrio un problema' + e.message);
        this.closeBtnClick();
        this.spinner.hide()
      })

  }
  
}
