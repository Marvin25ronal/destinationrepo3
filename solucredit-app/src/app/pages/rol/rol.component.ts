import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError, of, Subscription } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { Permission, Rol } from '../../models/rol.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RolService } from './services/rol.service';
import { NgxSpinnerService } from 'ngx-spinner';


interface checkPermission {
  value: boolean;
  permission: Permission
}




import { AuthorizationService } from '../../services/authorization.service';

interface permissionV2 {
  name: string;
  permissions: Permission[];
}

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.scss']
})
export class RolComponent implements OnInit {

  //PARA FILTROS
  nzTabPosition = 'top';
  selectedIndex = 27;
  vals: any[] = ['', '', '', '', '', '', '', ''];

  search = new FormGroup({
    q: new FormControl(null),
  })
  placeholder = 'Buscar rol';
  config = [

    {
      label: 'Nombre:',
      tipo: 'TEXT',
      range: false,
      labelsAux: []

    },

    {

      tipo: 'OPTIONS',
      options: {
        restart: true,
        header: false

      }

    }
  ];

  filter() {

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


    if (this.search.controls['q'].value != "") {
      searchField.push('NAME');
      searchItem.push('%' + this.search.controls['q'].value + '%');

    }

    let sub = this._service.getRols(this.pageSize, (this.page - 1) * this.pageSize, searchItem, searchField).pipe(
      map((response) => {

        this.roles = response.data;
        this.rolesTotal = response.count;
        this.spinner.hide();
        sub.unsubscribe()


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


  constructor(
    private notifier: NotifierService,
    private _service: RolService,
    public fb: FormBuilder,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private autorization: AuthorizationService) { }

  spinnerMessage = 'Cargando Información...';
  //SUBSCRIPCIONES
  rolssub: Subscription;
  //PAGINACION
  page = 1;
  pageSize = 10;
  rolesTotal: number;
  //COSAS PARA EL CHECKBOX
  public permisosModificados: Array<checkPermission>;
  public isCalculatinPermissions: boolean;
  public permissionsMap = {};
  tabs: Array<{ name: string; content: string; disabled: boolean }> = [];


  //ESTADOS PARA LOS BOTONES
  //BOTONES PARA EL MOELS DE CREACION DE UN NUEVO ROL
  public isCancelCreationAbailable: boolean;
  public isLoadingInEdition: boolean;
  public checks: Array<Permission> = [];

  //auxiliar para eliminar Rol
  IdRoltoDelete = '';


  spinLoader = false;
  actualRol: Rol;
  @ViewChild('modalMod') private modalMod: TemplateRef<{}>;
  @ViewChild('modalDelete') private modalDelete: TemplateRef<{}>;
  marcarvarios: boolean = false;
  newRolForm = this.fb.group({
    RolName: [, [Validators.required]],
    Permissions: [, [Validators.required]],
    Users: [],
  });
  RolForm = this.fb.group({
    RolName: ['', [Validators.required]],
    Permissions: new FormArray([])

  });

  isEditing = false;
  roles: Rol[] = [] /* [
        new Rol('dsadsad', 'Administrador', 5, 7),
        new Rol('dsadsadas', 'Ventas', 5, 7),
        new Rol('dsadsadas', 'Contador', 5, 7),
      new Rol('dsadsadas', 'Auditoria', 1, 7),
      new Rol('dsadsadas', 'Auditoria', 1, 7),
      new Rol('dsadsadas', 'Auditoria', 1, 7),
      new Rol('dsadsadas', 'Auditoria', 1, 7),
      new Rol('dsadsadas', 'Auditoria', 1, 7),
        new Rol('dsadsadas', 'Auditorddsadsadasdia', 1, 7)
    ]; */

  dropdownSettings = {};
  dropdownList = [];
  permisos: Permission[];
  dropdownListUser = [];
  permisosActuales: Permission[];
  permisosActualesV2: any;


  canCreate(): boolean {
    let resource = 'ROL';
    return this.autorization.havePermission(resource, 'CREATE');
  }
  canDelete(): boolean {
    let resource = 'ROL';
    return this.autorization.havePermission(resource, 'DELETE');
  }
  canUpdate(): boolean {
    let resource = 'ROL';
    return this.autorization.havePermission(resource, 'UPDATE');
  }
  canList(): boolean {
    let resource = 'ROL';
    return this.autorization.havePermission(resource, 'LIST');
  }

  ngOnInit(): void {
    this.isCancelCreationAbailable = false;
    this.isLoadingInEdition = false;
    this.getRols();

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3
      /* allowSearchFilter: true */
    };
    this.dropdownList = [];
    this.dropdownListUser = [];
    this.permisosActuales = [];
    this.permisosActualesV2 = null;
    const formArray: FormArray = this.RolForm.get('Permissions') as FormArray;
    formArray.clear();
    for (let i = 0; i < 30; i++) {
      this.tabs.push({
        name: `Tab ${i}`,
        disabled: i === 28,
        content: `Content of tab ${i}`
      });
    }
  }

  onCheckChange(event) {
    const formArray: FormArray = this.RolForm.get('Permissions') as FormArray;

    /* Selected */
    if (event.target.checked) {
      // Add a new control in the arrayForm
      if (event.target.value != null) {
        //console.log('Checkiado'+event.target.value)
        formArray.push(new FormControl(event.target.value));
      }

    }
    /* unselected */
    else {
      // find the unselected element
      let i: number = 0;

      formArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value == event.target.value) {
          // Remove the unselected element from the arrayForm
          //console.log('Deschequiado::'+formArray[i]);
          formArray.removeAt(i);
          return;
        }

        i++;
      });
    }
  }
  getRols() {
    this.spinner.show();
    this.rolssub = this._service.getRols(this.pageSize, (this.page - 1) * this.pageSize, [], []).subscribe((rols) => {
      this.roles = rols.data;
      this.rolesTotal = rols.count;

      this.spinner.hide();
      this.rolssub.unsubscribe()
    });
  }
  pageChange(e) {
    //console.log(e);
    this.getRols();
  }

  deleteRolModal(idrol: string) {
    this.IdRoltoDelete = idrol;
    this.openSingleModal(this.modalDelete)
  }


  deleteRol() {
    let idrol = this.IdRoltoDelete;
    this._service.deleteRol(idrol).pipe(
      map((resp) => {
        //console.log(resp);
        this.notifier.notify('success', 'Se elimino el Rol');
        this.roles = this.roles.filter((rol) => {
          return rol.rol_id != idrol;
        })
      }),
      catchError((err) => {
        this.notifier.notify('error', 'Ocurrio un problema con la eliminacion' + err);
        console.log(err);
        return of();
      })
    ).subscribe();

    this.closeBtnClick();
  }



  escorrecto1() { return !this.newRolForm.valid }


  onPermisosClick() {
    //console.log('PermisoLink');
    if (this.dropdownList.length == 0) {
      this._service.getPermissions(100, 0).subscribe((permis) => {
        this.permisos = permis;
        this.dropdownList = permis.map((item, i) => {
          //console.log(item);
          return { item_id: i, item_text: item.name }
        })
      });

    }



  }

  onUsersClick() {
    if (this.dropdownListUser.length == 0) {
      this._service.getUsuarios(1000, 0).subscribe(
        (users) => {
          this.dropdownListUser = users.map((item) => {
            //console.log(item);
            return { item_id: item.user_id, item_text: item.firstname + item.lastname }
          })
        }
      )
    }
  }

  onItemSelect(item: any) {
    //console.log('ON onItemSelect: ',item); 
  }
  onSelectAll(items: any) {
    //console.log('ON onSelectAll: ',items);
  }
  onFilterChange(items: any) {
    //console.log('ON onFilterChange: ',items);
  }
  crearRol() {
    this.spinLoader = true;
    const permis = this.newRolForm.controls.Permissions.value.map((item, i) => {
      return this.permisos[item.item_id].permission_id;
    });

    let usersid = [];
    if (this.newRolForm.controls.Users.value != null)
      usersid = this.newRolForm.controls.Users.value.map((item) => (item.item_id))

    const rol = new Rol(
      '',
      this.newRolForm.controls.RolName.value,
      permis,
      usersid,
      usersid.length,
      permis.length
    );


    this._service.saveRol(rol).pipe(
      map((resp) => {

        this.notifier.notify('success', 'Se creo el rol satisfactoriamente');
        this.roles.push(rol);
        this.closeBtnClick();
      }),
      catchError((err) => {
        this.notifier.notify('error', 'Ocurrio un problema durante la creacion del rol' + err.message);
        //console.log(err);
        return of();
      })
    ).subscribe();

  }
  closeBtnClick() {
    this.modalService.dismissAll();
    this.newRolForm.reset();
    this.RolForm.reset();
    this.IdRoltoDelete = '';
    this.ngOnInit();
    this.isEditing = false;
  }
  editar(rol: Rol) {
    this.isLoadingInEdition = true;
    this.isEditing = false;
    //console.log('editar: ',rol);
    this.actualRol = rol;
    this.RolForm.controls.RolName.setValue(rol.name)
    this.RolForm.controls.RolName.disable();
    this.openEditRolModal(this.modalMod);
    //this.RolForm.controls.Name.setValue(rol.name);
    //this.RolForm.controls.Name.disable();
    this._service.getRol(rol.rol_id).subscribe((r) => {
      this.permisosActuales = r.permissions;
      for (let i = 0; i < this.permisosActuales.length; i++) {
        let p = this.permisosActuales[i];
        let category = p.name.split('-')[0];
        if (!this.permisosActualesV2) {
          this.permisosActualesV2 = {};
          console.log(`La categoria ${category} no existe`);
          this.permisosActualesV2[category] = { name: category, permissions: [p] }
        }
        else if (!this.permisosActualesV2[category]) {
          console.log(`La categoria ${category} no existe`);
          this.permisosActualesV2[category] = { name: category, permissions: [p] }
        }
        else {
          console.log(`La categoria ${category} ya existe`);
          this.permisosActualesV2[category] = { ...this.permisosActualesV2[category], permissions: [...this.permisosActualesV2[category].permissions, p] }
        }
      }

      console.log(this.permisosActualesV2);

      //console.log(this.permisosActuales);
      //console.log(this.permisosActuales.length);
      this.isLoadingInEdition = false;

    });

  }
  startMod() {
    this.isEditing = true;
    this.isLoadingInEdition = true;
    this.isCalculatinPermissions = true;
    this.RolForm.controls.RolName.enable();
    this.permisosActualesV2 = {};
    this._service.getPermissions(1000, 0).pipe(
      map(response => {
        //console.log(response);
        this.permisos = response;
        //this.permisosActualesV2 = {};
        this.permisos.forEach((item) => {

          this.permissionsMap[item.permission_id] = {
            value: false,
            permission: item
          }
        })
      }),
      catchError((err) => {
        this.notifier.notify('error', '' + err.message);
        console.log(err);
        return of();
      })
    ).subscribe((permis) => {


      this.armarCheckBoxes().pipe(
        catchError((err) => {
          this.notifier.notify('error', 'Ocurrio un problema' + err.message);
          console.log(err);
          return of();
        })
      ).subscribe((estate) => {

        this.isCalculatinPermissions = false;
        this.isLoadingInEdition = false;
      });


    });
  }
  saveChanges() {

    //console.log('Los permisos que voy a mandar');
    let newpermis = this.RolForm.controls.Permissions.value;
    //console.log(newpermis);
    this.spinner.show();
    this.spinnerMessage = 'Modificando rol...';
    this._service.modRolInfo(this.actualRol.rol_id, this.RolForm.controls.RolName.value, newpermis).pipe(
      map((resp) => {
        //console.log(resp);
        this.spinnerMessage = 'Cargando Información...';
        this.notifier.notify('success', 'Se modifico el satisfactoriamente');
        this.spinner.hide()
        this.closeBtnClick();
      }),
      catchError((err) => {
        this.spinner.hide();
        this.spinnerMessage = 'Cargando Información...';
        this.notifier.notify('error', 'Ocurrio un problema' + err.message);
        console.log(err);

        return of();
      })
    ).subscribe();
  }

  openModal(targetModal, rol) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      windowClass: 'my-modal',
      size: "xl",
      /* size: 'sm' */
      // size: "lg",
      // windowClass: 'my-modal'
    });




  }

  openSingleModal(targetModal) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      windowClass: 'my-modal',
      size: "xl",
    });
  }

  openEditRolModal(targetModal) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      windowClass: 'my-modal',
      size: "xl",
    });
  }


  armarCheckBoxes(): Observable<boolean> {

    return new Observable((observer) => {
      const formArray: FormArray = this.RolForm.get('Permissions') as FormArray;
      debugger
      for (let i = 0; i < this.permisosActuales.length; i++) {
        let rol = this.permisosActuales[i];
        //console.log('observable::'+rol)select * from permission where permission_id = '58168bdf-efad-480d-a16f-52eacdc029c9'
        this.permissionsMap[rol.permission_id].value = true;
        formArray.push(new FormControl(rol.permission_id));
      }
      //this.permisosModificados = Object.values(this.permissionsMap);
      let keys = Object.keys(this.permissionsMap);
      for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let category = this.permissionsMap[key].permission.name.split('-')[0];
        if (!this.permisosActualesV2[category]) {
          this.permisosActualesV2[category] = { name: category, data: [{ value: this.permissionsMap[key].value, permission: this.permissionsMap[key].permission }] }
        }
        else {
          this.permisosActualesV2[category] = { name: category, data: [...this.permisosActualesV2[category].data, { value: this.permissionsMap[key].value, permission: this.permissionsMap[key].permission }] }
        }
      }
      console.log('Despues de armar checkboxes');
      console.log(this.permisosActualesV2);

      observer.next(true);
      observer.complete();

    });

  }
  searchTerm() {
    // this.getCoverage(this.search.controls.q.value);
  }



  log(args: any[]): void {
    console.log(args);
  }
}
