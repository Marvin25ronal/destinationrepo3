import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { RolviewService } from 'src/app/services/rolview.service';
import { RolService } from '../rol/services/rol.service';

@Component({
  selector: 'app-rolview',
  templateUrl: './rolview.component.html',
  styleUrls: ['./rolview.component.scss']
})
export class RolviewComponent implements OnInit {
  spinnerMessage = 'Cargando Información...';
  placeholder = 'Buscar rol';
  search = new FormGroup({
    q: new FormControl(''),
  })
  pageSize = 10;
  page = 1;
  dataActivities = []
  countActivities = 0
  actualActivity;
  isEditing = false;
  showViews = []
  public isCalculatinPermissions: boolean;
  public isLoadingInEdition: boolean;
  allViews: any[] = []
  RolForm = this.fb.group({
    RolName: ['', [Validators.required]],
    Permissions: new FormArray([])
  });
  allCheckForm: any[] = []
  constructor(
    private _rolViewService: RolviewService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    public fb: FormBuilder,
    private _rolservice: RolService
  ) { }

  async ngOnInit() {
    this.spinner.show()
    await this.getInfo()
    this.spinner.hide()
    this.isLoadingInEdition = false;
    console.log(this.dataActivities)
    await this.getAllViews()
  }
  async getInfo() {
    this.spinner.show()
    await this.getActivities()
    await this.getCountRoles()
    await this.getViews()
    await this.getAllViews()
    this.spinner.hide()
    debugger
    return
  }
  async getAllViews() {
    await this._rolViewService.getAllViews().toPromise()
      .then((response) => {
        this.allViews = response
      })
    return
  }
  async getCountRoles() {
    for (let i = 0; i < this.dataActivities.length; i++) {
      //tenemos que ver cuantos roles tiene
      await this._rolViewService.getCountRols(this.dataActivities[i].wf_activity_id).toPromise()
        .then((response) => {
          this.dataActivities[i].rols = response
        })
    }
    return
  }
  async getViews() {
    for (let i = 0; i < this.dataActivities.length; i++) {
      //tenemos que ver cuantos roles tiene
      await this._rolViewService.getCountViews(this.dataActivities[i].wf_activity_id).toPromise()
        .then((response) => {

          this.dataActivities[i].views = response.count
          this.dataActivities[i].dataviews = response.views
        })
    }
    return
  }
  async getActivities() {
    let searchItem = [];

    if (this.search.controls['q'].value != "") {
      searchItem.push('%' + this.search.controls['q'].value + '%');
    }
    const res = await this._rolViewService.getRols(this.pageSize, (this.page - 1) * this.pageSize, searchItem).toPromise().then(
      (response) => {
        console.log(response)
        this.dataActivities = response.rolviews
        this.countActivities = response.count
      }
    )
    return res
  }
  filter() {
    this.getInfo()
  }
  canCreate(): boolean {
    return true
  }
  canList(): boolean {
    return true
  }
  canDelete(): boolean {
    return true
  }
  canView(): boolean {
    return true
  }
  canEdit(): boolean {
    return true
  }
  pageChange(e) {
    //console.log(e);
    this.getInfo();
  }
  openModal(targetModal) {
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
  closeBtnClick() {
    this.modalService.dismissAll();
    // this.newRolForm.reset();
    // this.RolForm.reset();
    // this.IdRoltoDelete = '';
    this.ngOnInit();
    // this.isEditing = false;
  }
  editar(rol, modal) {
    debugger
    this.isLoadingInEdition = true;
    this.isEditing = false;
    this.actualActivity = rol
    this.RolForm.controls.RolName.setValue(rol.name)
    this.RolForm.controls.RolName.disable();
    //obtenemos las vistas
    this._rolViewService.getShowViews(rol.wf_activity_id).toPromise().then((response) => {
      debugger
      console.log('SHOW VIEWS')
      console.log(response)
      this.showViews = response
      for (let i = 0; i < response.length; i++) {
        this._rolViewService.getRolForViews(rol.wf_activity_id, response[i].wf_view_id).toPromise().then((response2) => {
          debugger
          this.showViews[i].rol = response2
        })
      }
    })
    console.log(this.showViews)
    this.isLoadingInEdition = false;
    this.openModal(modal)
  }
  getDefault(activity) {
    let find = activity.dataviews?.find((item) => item.is_default == 1)
    if (find) {
      let find2 = this.allViews.find((item) => item.wf_view_id == find.wf_view_id)
      if (find2)
        return find2.name
      return 'Cargando'
    } else {
      return 'No asignada'
    }
  }
  getNameView(find) {
    let find2 = this.allViews.find((item) => item.wf_view_id == find.wf_view_id)
    return find2.name
  }
  changeDefault(activity, value) {
    console.log(activity)
    this._rolViewService.changeDefault(activity.wf_activity_id, activity.wf_view_id, value).toPromise().then((response) => {
      console.log(response)
      this.closeBtnClick()
    }).catch((e) => {
      console.log('error')
    })
  }
  async startMod() {
    this.isEditing = true
    this.isLoadingInEdition = true;
    this.isCalculatinPermissions = true;
    let allrols = []
    await this._rolservice.getRols(10000, 0, [], []).toPromise().then((response) => {
      allrols = response.data
      allrols.push({
        name: null,
        rol_id: -1
      })
    })
    //tenemos que replicar por todos las vistas
    let allviews: any = this.allViews

    for (let i = 0; i < allviews.length; i++) {
      //Tenemos que buscar las vistas y por cada vista ver los roles que hacen match para ponerle check

      let checks = []
      //buscamos primero si la vista esta en los roles
      let findview = this.showViews.find((item) => item.name == allviews[i].name)
      let auxrols = findview ? findview.rol : []
      for (let j = 0; j < allrols.length; j++) {
        let rol = allrols[j]
        //hacer match 
        let find = auxrols.find((item) => item.rol?.name == rol.name)
        let check = {
          name: rol.name,
          id: rol.rol_id,
          value: find ? true : false
        }
        checks.push(check)
      }
      allviews[i].checks = checks
    }
    this.allCheckForm = allviews
    this.isCalculatinPermissions = false;
    this.isLoadingInEdition = false;
    console.log(this.allCheckForm)
    return
  }
  onCheckChange(event, view, rol) {
    console.log(view)
    console.log(rol)
    //cambiamos de valor
    console.log(this.allCheckForm)

    let findview = this.allCheckForm.findIndex((item: any) => item.wf_view_id == view.wf_view_id)
    let check = this.allCheckForm[findview].checks.findIndex((item) => item.id == rol.id)

    this.allCheckForm[findview].checks[check].value = event.target.checked
  }
  saveChanges() {
    this.spinner.show();
    this.spinnerMessage = 'Modificando rol...';
    console.log(this.allCheckForm)
    this._rolViewService.saveRols(this.allCheckForm, this.actualActivity.wf_activity_id).toPromise().then((response) => {
      console.log(response)
      this.spinnerMessage = 'Cargando Información...';
      this.spinner.hide()
      this.modalService.dismissAll()
      this.getInfo()
    })
  }
}
