import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PaginationTableData } from 'src/app/interfaces/ui/pagination-table.interface';
import { DeleteAlertService } from 'src/app/services/alerts/delete-alert.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { InspectionPlaceService } from 'src/app/services/Maintenance/inspection-place.service';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InspectionPlace } from 'src/app/models/inspection-place.model';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-inspection-place',
  templateUrl: './inspection-place.component.html',
  styleUrls: ['./inspection-place.component.scss']
})
export class InspectionPlaceComponent implements OnInit {
  exampleName = "Ej. Fachada";
  spanNameMessage = `El nombre es requerido`
  placeholder = 'Buscar Lugar';
  dataList: PaginationTableData = {
    metadata: [
      "No.",
      "Tipo de lugar",
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
  title = 'Lugar de inspección'
  constructor(
    private autorization: AuthorizationService,
    private _service: InspectionPlaceService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private delete_alert: DeleteAlertService,
    private spinner: NgxSpinnerService,
  ) { }

  async ngOnInit() {
    this.pageSize = 10;
    this.selectUser = "";
    this.spinner.show()
    this._service.getList(this.pageSize, 0, this.selectUser).toPromise().then((coverage) => {
      this.dataList.data = coverage.inspection_place;
      this.totalData = coverage.count;
      console.log(this.dataList)
      this.spinner.hide()
    }).catch((e) => {
      this.spinner.hide()
      this.toastr.error('error', 'Ocurrio un problema' + e.message);
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
    id_place: new FormControl(null),
    name_place: new FormControl('', [Validators.required])
  })



  canCreateDis(): boolean {
    let resource = 'CLIENT';
    //CAMBIAR LOS PERMISOS TODO 
    return this.autorization.havePermission(resource, 'CREATE_DEB')
  }
  getCoverage(searchItem) {

    this._service.getList(this.pageSize, (this.page - 1) * this.pageSize, searchItem).pipe(
      map((coverage) => {
        this.dataList.data = coverage.inspection_place;
        this.totalData = coverage.count;
      }),
      catchError((err) => {
        console.log(err)
        return of();
      })
    ).subscribe();
  }

  setDataForm() {
    this.newDoc.controls['name_place'].setValue(this.actualRequest.name_place);
    this.newDoc.controls['id_place'].setValue(this.actualRequest.id_place)
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
    let newRequest: InspectionPlace = {
      name_place: this.newDoc.controls.name_place.value,
    }
    let subscription = this._service.save(newRequest).pipe(
      map((resp) => {
        this.closeBtnClick();
        this.newDoc.reset({})
        this.getCoverage(this.selectUser);
        this.toastr.success('Éxito', 'El lugar fue creado con éxito.');
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
        this.toastr.success('Éxito', 'El lugar fue modificado con éxito.')
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
  resource = 'INSPECTION_PLACE'
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
