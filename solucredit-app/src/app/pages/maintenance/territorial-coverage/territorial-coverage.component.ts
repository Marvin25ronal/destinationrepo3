import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { PaginationTableData } from 'src/app/interfaces/ui/pagination-table.interface';
import { DeleteAlertService } from 'src/app/services/alerts/delete-alert.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { TerritorialcoverageService } from 'src/app/services/Maintenance/territorialcoverage.service';
import { of } from 'rxjs';
import { TerritorialCoverage } from 'src/app/models/territorialcoverage.model';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-territorial-coverage',
  templateUrl: './territorial-coverage.component.html',
  styleUrls: ['./territorial-coverage.component.scss']
})
export class TerritorialCoverageComponent implements OnInit {
  exampleName = "Ej. Local";
  spanNameMessage = `El nombre de cobertura es requerido.`
  dataList: PaginationTableData = {
    metadata: [
      "No.",
      "Tipo de Cobertura",
      "Acciones"
    ],
    data: []
  }
  pageSize = 10;
  selectUser;
  actualCoverage;
  totalData: number;
  selectedCoverage: any;
  page = 1;
  resource = 'TERRITORIAL'
  constructor(
    private autorization: AuthorizationService,
    private _service: TerritorialcoverageService,
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
  newCoverageForm = new FormGroup({
    id_territorial_coverage: new FormControl(null),
    territorial_coverage_name: new FormControl('', [Validators.required])
  })
  ngOnInit(): void {
    //LISTAR TODOS LOS TIPOS DE COBERTURA
    this.pageSize = 10;
    this.spinner.show()
    this.selectUser = "";
    this._service.getCoverage(this.pageSize, 0, this.selectUser).toPromise().then((coverage) => {
      this.dataList.data = coverage.territorial_coverage;
      this.totalData = coverage.count;
      console.log(this.dataList)
      this.spinner.hide()
    }).catch((e) => {
      this.spinner.hide()
      this.toastr.error('error', 'Ocurrio un problema' + e.message);
    })
  }



  getCoverage(searchItem) {

    this._service.getCoverage(this.pageSize, (this.page - 1) * this.pageSize, searchItem).pipe(
      map((coverage) => {
        this.dataList.data = coverage.territorial_coverage;
        this.totalData = coverage.count;
      }),
      catchError((err) => {
        console.log(err)
        return of();
      })
    ).subscribe();
  }

  setDataForm() {
    this.newCoverageForm.controls['territorial_coverage_name'].setValue(this.actualCoverage.territorial_coverage_name);
    this.newCoverageForm.controls['id_territorial_coverage'].setValue(this.actualCoverage.id_territorial_coverage)
  }

  async showAlertDelete(coverage) {
    const result = await this.delete_alert.showAlert()
    if (result.confirmed) {
      this._service.deleteCoverage(coverage, result.message).pipe(
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

  searchTerm() {
    this.getCoverage(this.search.controls.q.value);
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
    this.newCoverageForm.reset();
    this.openModal(target)
  }
  ///CRUD
  onCreate() {
    let newCoverage: TerritorialCoverage = {
      territorial_coverage_name: this.newCoverageForm.controls.territorial_coverage_name.value,
    }
    let subscription = this._service.saveCoverage(newCoverage).pipe(
      map((resp) => {
        this.closeBtnClick();
        this.newCoverageForm.reset({})
        this.getCoverage(this.selectUser);
        this.toastr.success('Éxito', 'La cobertura fue creado con éxito.');
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
    this._service.updateCoverage(this.newCoverageForm.value).pipe(
      map((resp) => {
        this.toastr.success('Éxito', 'La cobertura fue modificada con éxito.')
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
    this.actualCoverage = coverage;
    this.openModal(target)
  }
  edit(targetmodal, coverage) {
    this.actualCoverage = coverage;
    this.setDataForm()
    this.openModal(targetmodal);
  }
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
