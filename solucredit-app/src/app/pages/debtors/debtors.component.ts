import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PaginationTableData } from 'src/app/interfaces/ui/pagination-table.interface';
import { Debtor } from 'src/app/models/debtor.model';
import { DebtorService } from 'src/app/services/debtors/debtor.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthorizationService } from '../../services/authorization.service';
@Component({
  selector: 'app-debtors',
  templateUrl: './debtors.component.html',
  styleUrls: ['./debtors.component.css']
})
export class DebtorsComponent implements OnInit {

  //------------ pagineo --------------
  types = [
    {
      id: 0,
      name: 'Autorizado'
    },
    {
      id: 1,
      name: "No autorizado"
    },
    {
      id: 2,
      name: 'En proceso'
    },
    {
      id: 3,
      name: "Suspendido"
    }
  ]
  getStatus(status: number) {
    return this.types.find(x => x.id == status).name;
  }
  pageSize = 10;
  page = 1;
  selectUser;
  totalData = 0;
  dataList: PaginationTableData = {
    metadata: [
      "No.",
      "Razón social",
      "NIT",
      "Estado",
      "Acciones"
    ],
    data: []
  };


  search = new FormGroup({
    q: new FormControl(null),
  });

  //------------ modals --------------
  actualDebtor: Debtor;
  @ViewChild('modalUpdate') private modalMod: TemplateRef<{}>;
  @ViewChild('modalShow') private modalShow: TemplateRef<{}>;
  @ViewChild('modalDelete') private modalDelete: TemplateRef<{}>;

  //-----------  form -------------

  newDebtorForm = this.fb.group({
    business_name: new FormControl(null, [Validators.required]),
    tradename: new FormControl(null, [Validators.required]),
    commercial_address: new FormControl(null, [Validators.required]),
    collection_address: new FormControl(null, [Validators.required]),
    nit: new FormControl(null, [Validators.required, Validators.pattern("^[0-9]+(-?[0-9kK])?$")]),
    phone: new FormControl(null, [Validators.required, Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)")]),
    status: new FormControl(null, [Validators.required]),
  });

  actualDebtorForm = this.fb.group({
    id_debtor: null,
    business_name: new FormControl(null, [Validators.required]),
    tradename: new FormControl(null, [Validators.required]),
    commercial_address: new FormControl(null, [Validators.required]),
    collection_address: new FormControl(null, [Validators.required]),
    nit: new FormControl(null, [Validators.required, Validators.pattern("^[0-9]+(-?[0-9kK])?$")]),
    phone: new FormControl(null, [Validators.required, Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)")]),
    status: new FormControl(null, [Validators.required]),
  });

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _service: DebtorService,
    private autorization: AuthorizationService
  ) { }

  ngOnInit(): void {
    this.pageSize = 10;
    this.selectUser = "";
    this._service.getDebtors(this.pageSize, 0, this.selectUser).subscribe((debtors) => {
      //console.log(debtors);
      this.dataList.data = debtors.debtor;
      this.totalData = debtors.count;
      //this.spinner.hide();
    })
  }

  //-------COSAS PARA LOS PERMISOS-----
  canListDeb(): boolean {
    let resource = 'CLIENT';
    return this.autorization.havePermission(resource, 'LIST_DEB');
  }
  canCreateDeb(): boolean {
    let resource = 'CLIENT';
    return this.autorization.havePermission(resource, 'CREATE_DEB');
  }
  canEditDeb(): boolean {
    let resource = 'CLIENT';
    return this.autorization.havePermission(resource, 'EDIT_DEB');
  }
  canSeeDeb(): boolean {
    let resource = 'CLIENT';
    return this.autorization.havePermission(resource, 'SEE_DEB');
  }
  canDeleteDeb(): boolean {
    let resource = 'CLIENT';
    return this.autorization.havePermission(resource, 'DEL_DEB');
  }

  //------------ Services -------------

  getDebtors(searchItem) {
    //if (typeof searchItem == 'string') { searchItem = [] }
    //this.spinner.show();
    //console.log(searchItem);
    this._service.getDebtors(this.pageSize, (this.page - 1) * this.pageSize, searchItem).pipe(
      map((debtors) => {
        this.dataList.data = debtors.debtor;
        this.totalData = debtors.count;
        //this.spinner.hide();
      }),
      catchError((err) => {
        console.log(err);
        return of();
      })

    ).subscribe();
  }

  onCreate() {
    //console.log(this.newDebtorForm.value);


    let newDebtor: Debtor = {
      business_name: this.newDebtorForm.controls.business_name.value,
      tradename: this.newDebtorForm.controls.tradename.value,
      comercial_address: this.newDebtorForm.controls.commercial_address.value,
      collection_address: this.newDebtorForm.controls.collection_address.value,
      nit: this.newDebtorForm.controls.nit.value,
      phone: this.newDebtorForm.controls.phone.value,
      status: this.newDebtorForm.controls.status.value
    }

    let suscription = this._service.saveDebtor(newDebtor).pipe(
      map((resp) => {
        //console.log(resp);
        //this.spinner.hide();
        this.closeBtnClick();
        this.newDebtorForm.reset();
        this.getDebtors(this.selectUser);
        this.toastr.success('Éxito', 'El deudor fue creado con éxito.');

      }),
      catchError((err) => {
        //this.spinner.hide();
        this.toastr.error('error', 'Ocurrio un error');
        //console.log(err);
        return of();
      })
    ).subscribe(() => suscription.unsubscribe());
  }

  saveChanges() {

    //console.log(this.actualDebtor);
    this._service.updateDebtor(this.actualDebtorForm.value).pipe(
      map((resp) => {
        this.toastr.success('Éxito', 'La alerta fue modificada con éxito.');
        this.getDebtors(this.selectUser);
        this.closeBtnClick();
      }),
      catchError((err) => {
        this.toastr.error('error', 'Ocurrio un problema' + err.message);
        //console.log(err);
        this.closeBtnClick();
        return of();
      })
    ).subscribe();
  }


  confirmacionEliminar() {
    this._service.deleteDebtor(this.actualDebtor).pipe(
      map((resp) => {
        //console.log(resp);
        this.toastr.success('Éxito', 'El deudor fue eliminada con éxito.');
        this.getDebtors(this.selectUser);
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


  //------------ pagineo -------------

  pageChange(e) {
    //console.log(e);
    this.getDebtors(this.selectUser);
  }


  //------------ modals --------------

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

  deleteDebtors(debtor) {
    this.actualDebtor = debtor;
    this.openModal(this.modalDelete);
  }

  show(debtor) {
    this.actualDebtor = debtor;
    this.openModal(this.modalShow);
  }

  editar(debtor) {
    this.actualDebtor = debtor;
    this.actualDebtorForm.controls.id_debtor.setValue(debtor.id_debtor);
    this.actualDebtorForm.controls.business_name.setValue(debtor.business_name);
    this.actualDebtorForm.controls.tradename.setValue(debtor.tradename);
    this.actualDebtorForm.controls.commercial_address.setValue(debtor.comercial_address);
    this.actualDebtorForm.controls.collection_address.setValue(debtor.collection_address);
    this.actualDebtorForm.controls.nit.setValue(debtor.nit);
    this.actualDebtorForm.controls.phone.setValue(debtor.phone);
    this.actualDebtorForm.controls.status.setValue(debtor.status);
    this.openModal(this.modalMod);
  }

  searchTerm() {
    this.getDebtors(this.search.controls.q.value);
  }
}
