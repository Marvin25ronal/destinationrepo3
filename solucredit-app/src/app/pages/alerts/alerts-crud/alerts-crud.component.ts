import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Alert } from 'src/app/models/alert.model';
import { AlertService } from 'src/app/services/alerts/alert.service';
import { PaginationTableData } from 'src/app/interfaces/ui/pagination-table.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationService } from '../../../services/authorization.service';
@Component({
  selector: 'app-alerts-crud',
  templateUrl: './alerts-crud.component.html',
  styleUrls: ['./alerts-crud.component.css']
})
export class AlertsCrudComponent implements OnInit {

  pageSize = 10;
  page = 1;
  selectUser;
  totalData = 0;
  dataList: PaginationTableData = {
    metadata: [
      "No",
      "Seńal de alerta",
      "Riesgo",
      "Mitigador",
      "Condición",
      "Acciones"
    ],
    data: []
  };

  departamentos = [];

  search = new FormGroup({
    q: new FormControl(null),
  });

  newAlertForm = this.fb.group({
    signal: new FormControl(null, [Validators.required]),
    risk: new FormControl(null, [Validators.required]),
    reliever: new FormControl(null, [Validators.required]),
    condition: new FormControl(null, [Validators.required]),
    department: new FormControl(null, [Validators.required]),
  });


  //--------- Alert --------

  actualAlert: Alert;
  @ViewChild('modalMod') private modalMod: TemplateRef<{}>;
  @ViewChild('modalShow') private modalShow: TemplateRef<{}>;
  @ViewChild('modalDelete') private modalDelete: TemplateRef<{}>;
  actualAlertForm = this.fb.group({
    id: null,
    signal: new FormControl(null, [Validators.required]),
    risk: new FormControl(null, [Validators.required]),
    reliever: new FormControl(null, [Validators.required]),
    condition: new FormControl(null, [Validators.required]),
    department: new FormControl(null, [Validators.required]),
  });

  department_Name;


  constructor(
    private _service: AlertService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private autorization: AuthorizationService
  ) { }

  ngOnInit(): void {
    this.pageSize = 10;
    this.selectUser = "";
    this._service.getAlerts(this.pageSize, 0, this.selectUser).subscribe((alerts) => {
      //console.log(alerts);
      this.dataList.data = alerts.alert;
      this.totalData = alerts.count;
      //this.spinner.hide();
    });

    this._service.GetDepartament().subscribe((departamentos) => {
      this.departamentos = departamentos.data;
      console.log(departamentos);
    });
  }

  canList(): boolean {
    let resource = 'ALERT';
    return this.autorization.havePermission(resource, 'LIST');
  }
  canDelete(): boolean {
    let resource = 'ALERT';
    return this.autorization.havePermission(resource, 'DELETE');
  }
  canCreate(): boolean {
    let resource = 'ALERT';
    return this.autorization.havePermission(resource, 'CREATE');
  }
  canUpdate(): boolean {
    let resource = 'ALERT';
    return this.autorization.havePermission(resource, 'UPDATE');
  }
  canLog(): boolean {
    let resource = 'ALERT';
    return this.autorization.havePermission(resource, 'LOG');
  }

  getAlerts(searchItem) {
    //if (typeof searchItem == 'string') { searchItem = [] }
    //this.spinner.show();
    console.log('get');
    console.log(searchItem);
    this._service.getAlerts(this.pageSize, (this.page - 1) * this.pageSize, searchItem).pipe(
      map((alerts) => {
        this.dataList.data = alerts.alert;
        this.totalData = alerts.count;
        //this.spinner.hide();
      }),
      catchError((err) => {
        console.log(err);
        return of();
      })

    ).subscribe();
  }

  pageChange(e) {
    //console.log(e);
    this.getAlerts(this.selectUser);
  }

  openModal(targetModal) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: "static",
      keyboard: false,
      size:'lg',
      windowClass: 'my-modal'
    });
  }

  closeBtnClick() {
    //console.log('Se va a cerrar el modal');
    this.modalService.dismissAll();
  }

  onCreate() {
    console.log(this.newAlertForm.value);


    let newAlert: Alert = {
      signal: this.newAlertForm.controls.signal.value,
      risk: this.newAlertForm.controls.risk.value,
      reliever: this.newAlertForm.controls.reliever.value,
      condition: this.newAlertForm.controls.condition.value,
      department: this.newAlertForm.controls.department.value,
    }

    let suscription = this._service.saveAlert(newAlert).pipe(
      map((resp) => {
        console.log(resp);
        //this.spinner.hide();
        this.closeBtnClick();
        this.newAlertForm.reset();
        this.getAlerts(this.selectUser);
        this.toastr.success('Éxito', 'La alerta fue creada con éxito.');

      }),
      catchError((err) => {
        //this.spinner.hide();
        this.toastr.error('error', 'Ocurrio un error');
        //console.log(err);
        return of();
      })
    ).subscribe(() => suscription.unsubscribe());
  }




  editar(alert: Alert) {
    console.log('editar: ', alert);
    this.actualAlert = alert;
    this.actualAlertForm.controls.id.setValue(alert.id);
    this.actualAlertForm.controls.signal.setValue(alert.signal);
    this.actualAlertForm.controls.risk.setValue(alert.risk);
    this.actualAlertForm.controls.condition.setValue(alert.condition);
    this.actualAlertForm.controls.reliever.setValue(alert.reliever);
    this.actualAlertForm.controls.department.setValue(alert.department);
    this.openModalEdit(this.modalMod, alert);
  }

  openModalEdit(targetModal, alert) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      /* size: 'sm' */
      size:'lg',
      windowClass:'my-modal'

    });
  }

  saveChanges() {
    this._service.updateAlert(this.actualAlertForm.value).pipe(
      map((resp) => {
        this.toastr.success('Éxito', 'La alerta fue modificada con éxito.');
        this.getAlerts(this.selectUser);
        this.closeBtnClick();
      }),
      catchError((err) => {
        this.toastr.error('error', 'Ocurrio un problema' + err.message);
        console.log(err);
        this.closeBtnClick();
        return of();
      })
    ).subscribe();
  }

  show(alert: Alert) {
    this.actualAlert = alert;
    this.department_Name = null;

    let name = this.departamentos.find((item) => { return item.id_department == alert.department });
    if (name) {
      this.department_Name = name.department;
    }

    this.openModalShow(this.modalShow, alert);
  }

  openModalShow(targetModal, alert) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      size:'lg',
      windowClass:'my-modal'
      /* size: 'sm' */
    });
  }

  deleteAlert(alert) {
    this.actualAlert = alert;
    this.openModal(this.modalDelete);
  }

  confirmacionEliminar() {
    this._service.deleteAlert(this.actualAlert).pipe(
      map((resp) => {
        //console.log(resp);
        this.toastr.success('Éxito', 'La alerta fue eliminada con éxito.');
        this.getAlerts(this.selectUser);
        this.closeBtnClick();
      }),
      catchError((err) => {
        this.toastr.error('error', 'Ocurrio un problema' + err.message);
        console.log(err);
        this.closeBtnClick();
        return of();
      })
    ).subscribe();
  }


  //-------searching-------


  searchTerm() {
    this.getAlerts(this.search.controls.q.value);
  }


}
