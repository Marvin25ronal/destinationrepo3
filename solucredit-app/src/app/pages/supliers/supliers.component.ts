/**supplier.component.ts */

import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { map, mergeMap, catchError, exhaustMap, withLatestFrom, } from 'rxjs/operators';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { of, Observable, Subscription } from 'rxjs';
import { Supplier, SupplierMap, SupplierDocMap, SupplierLogMap } from '../../models/supplier.model'
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthorizationService } from '../../services/authorization.service';
import { SuppliersService } from './servicio/suppliers.service';
import { MysqlService } from "../../services/mysql/mysql.service";
import { DomSanitizer } from "@angular/platform-browser";
import { DocumentmodalComponent } from 'src/app/component/modals/documentmodal/documentmodal.component';
import { ToastrService } from 'ngx-toastr';

interface checkForm {
  value: boolean;
  data: SupplierDocMap

}

@Component({
  selector: 'app-supliers',
  templateUrl: './supliers.component.html',
  styleUrls: ['./supliers.component.css']
})
export class SupliersComponent implements OnInit {
  @ViewChild(DocumentmodalComponent) viewDocumentModal: DocumentmodalComponent
  //CHECKBOXES....
  formsCheckBoxes: FormArray;
  formsCheckBoxesData: Array<checkForm> = [];
  //PARA FILTROS

  vals: any[] = ['', '', '', '', '', '', '', ''];

  valsdrop3: any[] = [
    { value: 0, text: "Individual" },
    { value: 1, text: "Juridico" },
  ]
  valsdrop5: any[] = [
    { value: 0, text: "Pendiente de documentos" },
    { value: 1, text: "Activo" },
    { value: 2, text: "De baja" },
  ]
  config = [
    {
      label: 'RUC:',
      tipo: 'TEXT',
      range: false,
      labelsAux: []

    },
    {
      label: 'Tipo proveedor:',
      tipo: 'DROPDOWN',
      range: false,
      labelsAux: []

    },

    {
      label: 'Estado:',
      tipo: 'DROPDOWN',
      range: false,
      labelsAux: []

    },

    {
      label: 'Nombre:',
      tipo: 'TEXT',
      range: false,
      labelsAux: ['Nombre del proveedor:']

    },




    {

      tipo: 'OPTIONS',
      options: {
        restart: false,
        header: false

      }

    }
  ]

  //---COSAS DEL MODAL DE EDICION--
  currentJustify = "fill";
  currentSupplier: Supplier = null;
  docsList: SupplierDocMap[] = [];
  logsList: SupplierLogMap[] = [];

  //-------
  //PAGINACION
  page = 1;
  pageSize = 10;

  //----------------
  userActual: Supplier;//USUARIO SELECCIONADO DEL LISTADO
  supplierList: Supplier[] = [];//LISTA 
  suppliersTotal = 0;//TOTAL DE SUPPLIER EN EL SISTEMA--SE UTILIZA TAMBIEN EN EL PAGINEO


  //idSupplierToDelete = -1;


  //FORMULARIOS
  newSupplierForm = this.fb.group({
    type: [null, Validators.required],
    ruc: ['', Validators.required],
    name: ['', Validators.required],
    address: ['',],
    phone1: ['', Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)")],
    phone2: ['', Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)")],
    contact: ['',],
    cellphone: ['', Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)")],
    business: ['', Validators.required],
  })

  stateDocs = this.fb.group({
    states: new FormArray([])

  });



  /* docsNames: string[] = [
    'DPI',
    'Pasaporte',
    'RTU extendido por la SAT',
    'Formulario IVE-IR-01',
    'Recibo de luz, agua o teléfono',
    'Contrato',
    'Consulta de Guatecompras',
    'Formulario Anexo de Contratistas y Proveedores'





  ] */

  @ViewChild('modalDelete') private modalDelete: TemplateRef<{}>;
  @ViewChild('spinnerbit') private spinnerbit: TemplateRef<{}>;
  idSupplierToDelete: any;
  imgsrcbase64: any;
  pdfsrcbase64: any;
  docsTotal: number = 8;

  constructor(
    private notifier: NotifierService,
    private fb: FormBuilder,
    private modalService: NgbModal,

    private spinner: NgxSpinnerService,
    private autorization: AuthorizationService,
    private supplierService: SuppliersService,
    private mysqlService: MysqlService,
    private sanitizer: DomSanitizer,
    private toastService: ToastrService
  ) { }

  ngOnInit(): void {

    this.getSuppliers();
  }

  isCorrect() {
    return this.newSupplierForm.valid;
  }

  submitSupplier() {
    this.spinner.show()
    let newsup: SupplierMap = {
      supplier_id: null,
      ruc: this.newSupplierForm.controls.ruc.value,
      name: this.newSupplierForm.controls.name.value,
      address: this.newSupplierForm.controls.address.value,
      phone1: this.newSupplierForm.controls.phone1.value,
      phone2: this.newSupplierForm.controls.phone2.value,
      contact: this.newSupplierForm.controls.contact.value,
      cellphone: this.newSupplierForm.controls.cellphone.value,
      business: this.newSupplierForm.controls.business.value,

      type: this.newSupplierForm.controls.type.value,
      status: 0,//BITACORA
      fec_creation: new Date()
    };
    //this.newSupplierForm.patchValue(newsup);
    //this.newSupplierForm.

    let suscription = this.supplierService.saveSupplier(newsup).pipe(
      map((resp) => {
        this.toastService.success('Proveedor creado con exito', 'Proveedor creado')
        this.notifier.notify('success', 'Se creo el proveedor satisfactoriamente');
        this.supplierList.push(resp);
        this.spinner.hide();
        this.closeBtnClick();
      }),
      catchError((err) => {
        this.notifier.notify('error', 'Ocurrio un problema a la hora de crear un proveedor' + err);
        console.log(err);
        this.spinner.hide()
        return of();
      })
    ).subscribe(() => suscription.unsubscribe());
  }

  modSupplier(modal) {
    this.spinner.show()
    let newsup: SupplierMap = {
      supplier_id: this.currentSupplier.supplier_id,
      ruc: this.newSupplierForm.controls.ruc.value,
      name: this.newSupplierForm.controls.name.value,
      address: this.newSupplierForm.controls.address.value,
      phone1: this.newSupplierForm.controls.phone1.value,
      phone2: this.newSupplierForm.controls.phone2.value,
      contact: this.newSupplierForm.controls.contact.value,
      cellphone: this.newSupplierForm.controls.cellphone.value,
      business: this.newSupplierForm.controls.business.value,

      type: this.newSupplierForm.controls.type.value,
      status: this.currentSupplier.status,//BITACORA
    };

    let sub = this.supplierService.modSupplier(newsup).pipe(
      map((resp) => {
        this.toastService.success('Proveedor modificado con exito', 'Proveedor modificado')
        this.notifier.notify('success', 'Se modifico el proveedor satisfactoriamente');
        this.currentSupplier = resp;
        this.closeEditDataMod(modal)
        this.spinner.hide()
      }),
      catchError((err) => {
        this.notifier.notify('error', 'Ocurrio un problema a la hora de crear un proveedor' + err);
        console.log(err);
        this.closeEditDataMod(modal)
        this.spinner.hide()
        return of();
      })
    ).subscribe(() => sub.unsubscribe());;
  }

  isRucInputFocus() {
    return true;
  }
  isUrcUnique() {
    return true;
  }

  canDelete(): boolean {
    let resource = 'SUPPLIER';
    return this.autorization.havePermission(resource, 'DELETE');


  }

  canUpdate(): boolean {
    let resource = 'SUPPLIER';
    return this.autorization.havePermission(resource, 'UPDATE');

  }
  canCreate(): boolean {
    let resource = 'SUPPLIER';
    return this.autorization.havePermission(resource, 'CREATE');

  }
  canList(): boolean {
    let resource = 'SUPPLIER';
    return this.autorization.havePermission(resource, 'LIST');

  }
  pageChange(e) {
    //console.log(e);
    this.getSuppliers();
  }
  getSuppliers() {
    this.spinner.show();
    let sub = this.supplierService.getSuppliers(this.pageSize, (this.page - 1) * this.pageSize, [], []).pipe(
      map((response) => {

        this.supplierList = response.data;
        this.suppliersTotal = response.count;
        this.spinner.hide();


      }),
      catchError((err) => {
        this.notifier.notify('error', 'Ocurrio un problema con la conexion' + err);
        console.log(err);
        return of();
      })

    ).subscribe(() => {
      //console.log('................');
      sub.unsubscribe()
    });
  }




  async showPreviewImage(event, locationd, nspinner) {

    if (event.target.files && event.target.files[0]) {
      const named = event.target.files[0].name;
      const typed = event.target.files[0].type;
      this.spinner.show(nspinner);
      var reader = new FileReader();
      reader.onload = async (event: any) => {

        let data = {
          supplier_id: this.currentSupplier.supplier_id,
          iddoc: this.docsList[locationd - 1].id_supplier_doc,
          document: event.target.result,
          locationdoc: this.docsList[locationd - 1].id_supplier_doc_type,
          name: named,
          type: typed,
        }
        console.log('locationd: ' + locationd);
        console.log();

        this.spinner.show(nspinner);
        this.mysqlService.UploadSupplierDocuments(data)
          .pipe(
            map((data) => {

              this.spinner.hide(nspinner);
              this.getDocsInfo();


            }),
            catchError((err) => {
              this.notifier.notify('error', 'Ocurrio un problema con la conexion' + err);
              console.log(err);
              this.spinner.hide(nspinner);
              return of();
            })

          ).subscribe((data) => {



          })




      };
      await reader.readAsDataURL(event.target.files[0]);
      event.srcElement.value = null;
    }
  }



  closeBtnClick() {
    console.log('Se va a cerrar el modal');
    this.modalService.dismissAll();
    //this.newSupplierForm.reset();
    //this.editSupplierForm.reset();

    //this.pageName = 'Personal';

    //this.isEditing = false;
    //this.ngOnInit();
    this.getSuppliers();

  }

  closeEditDataMod(mod) {

    mod.dismiss('cerrar');
  }

  deleteSupplier() {
    let supplierID = this.idSupplierToDelete;
    let suscription = this.supplierService.deleteSupplier(supplierID).pipe(
      map((resp) => {
        //console.log(resp);
        this.toastService.success('Proveedor eliminado con exito', 'Proveedor eliminado')
        this.notifier.notify('success', 'Se elimino el Proveedor');
        this.supplierList = this.supplierList.filter((us) => us.supplier_id != supplierID)
      }),
      catchError((err) => {
        this.notifier.notify('error', 'Ocurrio un problema con la eliminacion del proveedor' + err.msg);
        console.log(err);
        return of();
      })
    ).subscribe(() => suscription.unsubscribe());
    this.closeBtnClick();
  }





  //MODAL DE CONFIRMACION DE LA ELIMACION
  deleteUserModal(idSupplier: number) {
    this.idSupplierToDelete = idSupplier;
    this.openSingleModal(this.modalDelete)
  }

  openSingleModal(targetModal) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      size: 'lg',
      windowClass: 'my-modal'
    });
  }


  //HABRE EL MODAL DE LA CREACION
  openModal2(targetModal, supplier: Supplier) {

    this.newSupplierForm.reset();
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      size: 'lg',
      windowClass: 'my-modal'
      /* size: 'sm' */
    });
  }

  changeDocStatus(iddoc: number, nspinner, val: number) {

    this.spinner.show(nspinner);
    let doc = this.docsList.filter(item => item.id_supplier_doc == iddoc)[0];
    doc.state = val;
    let sub1 = this.supplierService.changeDocState(doc).pipe(
      map((response) => {
        console.log(response);
        this.spinner.hide(nspinner);
        this.toastService.success('Se actualizo el estado del documento', 'Estado del documento actualizado')
        if (response.body.data.state == 0) {
          this.currentSupplier.status = 0;
        }


      }),
      catchError((err) => {
        this.notifier.notify('error', 'Ocurrio un problema con la conexion' + err.msg);
        console.log(err);
        this.spinner.hide(nspinner);
        return of();
      })

    ).subscribe(() => {
      //console.log('................');
      sub1.unsubscribe()
    });;
  }


  getDocsInfo() {
    let sub1 = this.supplierService.getSupplierDocs(this.currentSupplier.supplier_id).pipe(
      map((response) => {

        this.docsList = response;


        this.docsTotal = this.docsList.length;
        this.initCheckBoxex();
        this.spinner.hide();



      }),
      catchError((err) => {
        this.notifier.notify('error', 'Ocurrio un problema con la conexion' + err.msg);
        console.log(err);
        return of();
      })

    ).subscribe(() => {

      sub1.unsubscribe()
    });
  }
  openModalBitacora(modal) {
    this.spinner.show();
    let sub2 = this.supplierService.getSupplierLogss(this.currentSupplier.supplier_id).pipe(
      map((response) => {

        this.logsList = response;
        this.spinner.hide();


      }),
      catchError((err) => {
        this.notifier.notify('error', 'Ocurrio un problema con la conexion' + err.msg);
        this.spinner.hide();
        console.log(err);
        return of();
      })

    ).subscribe(() => {

      sub2.unsubscribe()
    });
    this.modalService.open(modal, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      windowClass: 'bitacora-class',

      /* size: 'lg'  */
    });
  }
  openModal(targetModal, supplier: Supplier) {


    this.currentSupplier = supplier;
    this.newSupplierForm.patchValue(this.currentSupplier);
    this.spinner.show();

    this.getDocsInfo();

    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      windowClass: 'my-class'


    });

  }



  async DeleteDocu(idddoc) {

    this.spinner.show();
    let sub = this.supplierService.delOneDoc(idddoc).pipe(
      map((response) => {


        this.spinner.hide();
        this.getDocsInfo();
        this.toastService.success('Se elimino el documento', 'Documento eliminado')

      }),
      catchError((err) => {
        this.notifier.notify('error', 'Ocurrio un problema con la conexion' + err.msg);
        console.log(err);
        return of();
      })

    ).subscribe(() => {

      sub.unsubscribe()
    });
  }
  async ViewDocu(modal, iddoc) {
    this.spinner.show();
    let sub = this.supplierService.getOneDoc(iddoc).pipe(
      map((response) => {

        this.imgsrcbase64 = null;
        this.pdfsrcbase64 = null;
        if (response.typed === "image") {
          const urls =
            "data:image/jpg;base64;base64," +
            response.url;
          this.imgsrcbase64 = this.sanitizer.bypassSecurityTrustResourceUrl(
            urls
          );
        } else if (response.typed === "pdf") {
          const urls =
            "data:application/pdf;base64," +
            response.url;
          this.pdfsrcbase64 = response.url
        }
        this.spinner.hide();
        this.getDocsInfo();


      }),
      catchError((err) => {
        this.notifier.notify('error', 'Ocurrio un problema con la conexion' + err.msg);
        console.log(err);
        return of();
      })

    ).subscribe(() => {

      sub.unsubscribe()
    });








    this.viewDocumentModal.openModal()
  }

  getStatusClass(status) {
    switch (status) {
      case 0: return 'badge badge-pill badge-warning statebadge'
      case 1: return 'badge badge-pill badge-success statebadge'
      case 2: return 'badge badge-pill badge-danger statebadge'
    }

  }

  getStatusText(status) {
    switch (status) {
      case 0: return 'Pendiente de completar documentos'
      case 1: return 'Activo'
      case 2: return 'De baja'
    }

  }



  completedDocs() {
    let flag = this.docsList.find((item) => item.state == 0)
    return flag
  }
  darDeBaja() {
    let newsup: SupplierMap = {
      supplier_id: this.currentSupplier.supplier_id,
      ruc: this.currentSupplier.ruc,
      name: this.currentSupplier.name,
      address: this.currentSupplier.address,
      phone1: this.currentSupplier.phone1,
      phone2: this.currentSupplier.phone2,
      contact: this.currentSupplier.contact,
      cellphone: this.currentSupplier.cellphone,
      business: this.currentSupplier.business,

      type: this.currentSupplier.type,
      status: 2,//BITACORA
      fec_creation: this.currentSupplier.fec_creation
    };

    let suscription = this.supplierService.modSupplier(newsup).pipe(
      map((resp) => {

        this.notifier.notify('success', 'Se dio de baja al proveedor satisfactoriamente');

        this.currentSupplier = resp;
      }),
      catchError((err) => {
        this.notifier.notify('error', 'Ocurrio un problema a la hora de dar de baja' + err);
        console.log(err);
        return of();
      })
    ).subscribe(() => suscription.unsubscribe());
  }
  completarCheckList() {
    let newsup: SupplierMap = {
      supplier_id: this.currentSupplier.supplier_id,
      ruc: this.currentSupplier.ruc,
      name: this.currentSupplier.name,
      address: this.currentSupplier.address,
      phone1: this.currentSupplier.phone1,
      phone2: this.currentSupplier.phone2,
      contact: this.currentSupplier.contact,
      cellphone: this.currentSupplier.cellphone,
      business: this.currentSupplier.business,

      type: this.currentSupplier.type,
      status: 1,//BITACORA
      fec_creation: this.currentSupplier.fec_creation
    };

    let suscription = this.supplierService.modSupplier(newsup).pipe(
      map((resp) => {

        this.notifier.notify('success', 'Se completaron los documentos satisfactoriamente');

        this.currentSupplier = resp;
      }),
      catchError((err) => {
        this.notifier.notify('error', 'Ocurrio un problema a la hora de completar los documentos' + err);
        console.log(err);
        return of();
      })
    ).subscribe(() => suscription.unsubscribe());
  }


  initCheckBoxex() {

    this.formsCheckBoxes = new FormArray([]);
    //const formArray: FormArray = this.stateDocs.get('states') as FormArray;
    this.formsCheckBoxesData = new Array<checkForm>();
    for (let i = 0; i < this.docsTotal; i++) {

      this.formsCheckBoxesData.push({
        value: this.docsList[i].state == 1 ? true : false,
        data: this.docsList[i],
      });
      this.formsCheckBoxes.push(new FormControl(this.docsList[i].id_supplier_doc));

    }

  }

  onCheckChange(event, sp) {

    if (event.target.checked) {
      // Add a new control in the arrayForm
      if (event.target.value != null) {

        this.changeDocStatus(event.target.value, sp, 1);
        this.formsCheckBoxes.push(new FormControl(event.target.value));

      }

    } else {
      /* unselected */
      // find the unselected element
      let i: number = 0;
      console.log('lo que hay en controles:');
      console.log(this.formsCheckBoxes.controls);
      this.formsCheckBoxes.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value == event.target.value) {
          console.log('deschequiado primer caso');
          // Remove the unselected element from the arrayForm
          this.changeDocStatus(event.target.value, sp, 0);
          this.formsCheckBoxes.removeAt(i);

          return;
        }


        i++;
      });
    }
  }

  openModalEditData(targetModal, supplier: Supplier) {
    console.log('openModalEditData');
    //console.log(this.currentSupplier);
    this.newSupplierForm.patchValue(this.currentSupplier);

    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      size: 'lg'
      /* size: 'sm' */
    });
  }

  filter(dataFilter) {

    let searchField = [];
    let searchItem = [];


    /* if (this.vals[0] && this.vals[1]) {
      searchField.push('FECINI');
      let fecini = this.vals[0].year + '-' + this.vals[0].month + '-' + this.vals[0].day + ' 00:00:00';
      searchItem.push(fecini);
      searchField.push('FECEND');
      let fecend = this.vals[1].year + '-' + this.vals[1].month + '-' + this.vals[1].day + ' 23:59:59';
      searchItem.push(fecend);
    } */


    if (this.vals[0] != "") {
      searchField.push('RUC');
      searchItem.push(this.vals[0]);
    }
    if (this.vals[2] != "") {
      searchField.push('TYPE');
      searchItem.push(this.vals[2]);
    }
    if (this.vals[4] != "") {
      searchField.push('STATUS');
      searchItem.push(this.vals[4]);
    }
    if (this.vals[6] != "") {
      searchField.push('NAME');
      searchItem.push('%' + this.vals[6] + '%');
    }

    let sub = this.supplierService.getSuppliers(this.pageSize, (this.page - 1) * this.pageSize, searchItem, searchField).pipe(
      map((response) => {

        this.supplierList = response.data;
        this.suppliersTotal = response.count;
        this.spinner.hide();


      }),
      catchError((err) => {
        this.notifier.notify('error', 'Ocurrio un problema con la conexion' + err);
        console.log(err);
        return of();
      })

    ).subscribe(() => {
      //console.log('................');
      sub.unsubscribe()
    });

  }
  createExcel($event) {
    console.log('EXCEL::: ');

  }


}
