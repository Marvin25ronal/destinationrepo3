import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PaginationTableData } from 'src/app/interfaces/ui/pagination-table.interface';
import { DocWarranty } from 'src/app/models/docwarranty.model';
import { DeleteAlertService } from 'src/app/services/alerts/delete-alert.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { DocWarrantyService } from 'src/app/services/Maintenance/doc-warranty.service';

@Component({
  selector: 'app-doc-warranty',
  templateUrl: './doc-warranty.component.html',
  styleUrls: ['./doc-warranty.component.scss']
})
export class DocWarrantyComponent implements OnInit {
  exampleName = "Ej. Pagaré";
  spanNameMessage = `El nombre es requerido`
  placeholder='Buscar Documento';
  dataList: PaginationTableData = {
    metadata: [
      "No.",
      "Tipo de Documento",
      "Acciones"
    ],
    data: []
  }
  pageSize = 10;
  selectUser;
  actualRequest;
  totalData: number;
  selectDoc: any;
  page = 1;
  title='Documento'
  constructor(private autorization: AuthorizationService,
    private _service: DocWarrantyService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private delete_alert: DeleteAlertService) { }

  ngOnInit(): void {
    this.pageSize = 10;
    this.selectUser = "";
    this._service.getList(this.pageSize, 0, this.selectUser).subscribe((coverage) => {
      this.dataList.data = coverage.doc_warranty;
      this.totalData = coverage.count;
      console.log(this.dataList)
    })
  }
  ngOnDestroy(): void {
    if (this.modalService.hasOpenModals()) {
      this.modalService.dismissAll();
    }
    this.delete_alert.close();
  }
  search = new FormGroup({
    q: new FormControl(null),
  })
  newDoc = new FormGroup({
    id_doc_warranty: new FormControl(null),
    doc_warranty: new FormControl('', [Validators.required])
  })



  canCreateDis(): boolean {
    let resource = 'CLIENT';
    //CAMBIAR LOS PERMISOS TODO 
    return this.autorization.havePermission(resource, 'CREATE_DEB')
  }
  getCoverage(searchItem) {

    this._service.getList(this.pageSize, (this.page - 1) * this.pageSize, searchItem).pipe(
      map((coverage) => {
        this.dataList.data = coverage.doc_warranty;
        this.totalData = coverage.count;
      }),
      catchError((err) => {
        console.log(err)
        return of();
      })
    ).subscribe();
  }

  setDataForm() {
    this.newDoc.controls['doc_warranty'].setValue(this.actualRequest.doc_warranty);
    this.newDoc.controls['id_doc_warranty'].setValue(this.actualRequest.id_doc_warranty)
  }

  async showAlertDelete(coverage) {
    const result = await this.delete_alert.showAlert()
    if (result.confirmed) {
      this._service.delete(coverage, result.message).pipe(
        map((resp) => {
          this.toastr.success('Éxito', 'Eliminado satisfactoriamente')
          this.getCoverage(this.selectUser);
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
    this.getCoverage(this.search.controls.q.value);
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
    this.getCoverage(this.selectUser);
  }
  openCreate(target) {
    this.newDoc.reset();
    this.openModal(target)
  }
  ///CRUD
  onCreate() {
    let newRequest: DocWarranty = {
      doc_warranty: this.newDoc.controls.doc_warranty.value,
    }
    let subscription = this._service.save(newRequest).pipe(
      map((resp) => {
        this.closeBtnClick();
        this.newDoc.reset({})
        this.getCoverage(this.selectUser);
        this.toastr.success('Éxito', 'El tipo de documento fue creado con éxito.');
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
    this._service.update(this.newDoc.value).pipe(
      map((resp) => {
        this.toastr.success('Éxito', 'El tipo de documento fue modificado con éxito.')
        this.getCoverage(this.selectUser)
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
  show(target, coverage) {
    this.actualRequest = coverage;
    this.openModal(target)
  }
  edit(targetmodal, coverage) {
    this.actualRequest = coverage;
    this.setDataForm()
    this.openModal(targetmodal);
  }

}
