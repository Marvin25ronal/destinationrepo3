import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PaginationTableData } from 'src/app/interfaces/ui/pagination-table.interface';
import { Adviser } from 'src/app/models/adviser.model';
import { DeleteAlertService } from 'src/app/services/alerts/delete-alert.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { AdviserTypeService } from 'src/app/services/Maintenance/adviser-type.service';
import { AdviserService } from 'src/app/services/Maintenance/adviser.service';
import { INPUT_TIPE_IMAGE, SIZE_PAGE } from 'src/Utils/constants';
import Swal from 'sweetalert2';
import { UserService } from '../../user/servicio/user.service';

@Component({
  selector: 'app-adviser',
  templateUrl: './adviser.component.html',
  styleUrls: ['./adviser.component.scss']
})
export class AdviserComponent implements OnInit {
  exampleName = "Ej. Ahorro";
  spanNameMessage = `El campo es requerido`
  placeholder = 'Buscar Asesor';
  dataList: PaginationTableData = {
    metadata: [
      "No.",
      "Nombre",
      "Correo",
      "Tipo Asesor",
      "Titular",
      "Acciones"
    ],
    data: []
  }
  pageSize = SIZE_PAGE;
  inputTipeImage = INPUT_TIPE_IMAGE
  selectUser;
  actualAdviser;
  totalData: number;
  selectDoc: any;
  page = 1;
  title = 'Asesor '
  currencyData: any[]
  dataAdviserType: any[]
  localUrl: any[] | any;
  userdata: any
  showHolders: any
  message: string
  radio1: any;
  radio2: any;
  select_adviser: null;
  resource='ADVISER'
  recomendations = [
    'La imagen debe de estar centrada',
    'Debe de ser lo más legible posible',
    'Las dimensiones recomendadas son de 250x200 píxeles',
    'Los formatos recomendados son .png y .jpg'
  ]
  radio3: any;
  constructor(
    private autorization: AuthorizationService,
    private _service: AdviserService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private delete_alert: DeleteAlertService,
    private _userService: UserService,
    private _adviserTypeService: AdviserTypeService,
    private spinner: NgxSpinnerService,

  ) { }
  ngOnInit(): void {
    this.message = ''
    this.spinner.show()
    this._adviserTypeService.getList(-1, -1, []).subscribe(
      (response) => {
        console.log(response)
        this.dataAdviserType = response.adviser_type
      }
    )
    this.selectUser = "";
    this._service.getList(this.pageSize, 0, this.selectUser).subscribe((coverage) => {
      this.dataList.data = coverage.adviser;
      this.totalData = coverage.count;
      this.dataList.data.forEach((item) => {
        if (item.holder != 1) {
          this._service.getAdviser(item.id_holder).subscribe((coverage) => {
            console.log('coverage')
            item.infoHolder = coverage
          })
        }
      })
      this.spinner.hide()
    })
  }
  getType(id) {
    if (this.dataAdviserType && this.dataAdviserType.length > 0)
      return this.dataAdviserType.find((item) => item.id_adviser_type == id).adviser_type
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
  defaultAdviser: Adviser = null
  newAdviserForm = new FormGroup({
    id_adviser: new FormControl(0),
    user_id: new FormControl(0),
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl(null, [Validators.required]),
    address: new FormControl(null),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern("(^[0-9]{8})|(^[+][0-9]{11}$)"),]),
    professional_code: new FormControl(null),
    outsourcing: new FormControl('0'),
    id_adviser_type: new FormControl(null),
    holder: new FormControl(null),
    id_holder: new FormControl(null),
    is_default: new FormControl(null),
  })
  
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
  getCoverage(searchItem) {
    this._service.getList(this.pageSize, (this.page - 1) * this.pageSize, searchItem).pipe(
      map((coverage) => {
        this.dataList.data = coverage.adviser;
        this.totalData = coverage.count;
      }),
      catchError((err) => {
        console.log(err)
        return of();
      })
    ).subscribe();
  }
  openCreate(target) {
    this.message = ''
    this.localUrl = []
    this.newAdviserForm.reset();
    localStorage.removeItem("file");
    this.openModal(target)
  }

  disableForm() {
    this.newAdviserForm.controls['firstname'].disable()
    this.newAdviserForm.controls['lastname'].disable()
    this.newAdviserForm.controls['address'].disable()
    this.newAdviserForm.controls['phone'].disable()
    this.newAdviserForm.controls['professional_code'].disable()
  }
  enableForm() {
    this.newAdviserForm.controls['firstname'].enable()
    this.newAdviserForm.controls['lastname'].enable()
    this.newAdviserForm.controls['address'].enable()
    this.newAdviserForm.controls['phone'].enable()
    this.newAdviserForm.controls['professional_code'].enable()
  }
  changeOutsorcing(value) {
    if (value == 0) {
      this.newAdviserForm.controls['holder'].setValue(1)
    }
    this.newAdviserForm.controls['outsourcing'].setValue(value)
    console.log('cambiado')
  }
  changeDefault(value) {
    if (value == 0) {
      this.newAdviserForm.controls['is_default'].setValue(1)
    }
    this.newAdviserForm.controls['is_default'].setValue(value)
  }
  setHolders() {
    let type = this.newAdviserForm.controls['id_adviser_type'].value
    this._service.getHolders(type).pipe(
      map((coverage) => {
        this.showHolders = coverage;
        console.log(this.showHolders)

      }),
      catchError((err) => {
        console.log(err)
        return of();
      })
    ).subscribe()
  }
  changeHolder(value) {
    this.newAdviserForm.controls['holder'].setValue(value)
    this.setHolders()
    console.log('cambiado')
  }

  async searchEmail(email, refresh = true) {
    await this._userService.getUserByEmail(email).subscribe(
      (response) => {
        let data = response.data;
        if (data == null) {
          //Mostrar alerta
          Swal.fire({
            icon: 'error',
            title: 'Usuario incorrecto',
            text: 'El usuario debe existir en el sistema',
            footer: '<a href="/usuarios"><bold>Puede crearlo utilizando el siguiente enlace</bold></a>'
          })
          this.disableForm()
        } else {
          console.log(response.data)
          this.userdata = response.data
          this.enableForm()
          if (refresh) {
            this.newAdviserForm.controls['firstname'].setValue(data.firstname)
            this.newAdviserForm.controls['lastname'].setValue(data.lastname)
            this.newAdviserForm.controls['user_id'].setValue(data.user_id)
          }

        }
      }
    )
  }
  onChange(value) {
    this.newAdviserForm.controls['id_adviser_type'].setValue(value)
    this.setHolders()
    //buscar si se encuentra el asesor en el mismo tipo
    let email = this.newAdviserForm.controls['email'].value
    this._service.exist(value, email).pipe(
      map((resp) => {
        if (resp) {
          //Existe
          this.message = `Este usuario ya se encuentra en esta categoría`
        } else {
          this.message = ''
        }
      }),
      catchError((err) => {
        //this.spinner.hide();
        this.toastr.error('error', 'Ocurrio un error');
        //console.log(err);
        return of();
      })
    ).subscribe()
    //Buscar al predeterminado del area
    this._service.getDefaultTypeAdviser(value).pipe(
      map((resp) => {
        this.defaultAdviser = resp
      })
    )
  }
  onChangeHolder(value) {
    this.newAdviserForm.controls['id_holder'].setValue(value)
  }
  showPreviewImage(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.localUrl = event.target.result;
        localStorage.setItem("file", JSON.stringify(event.target.result));
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  async saveAdviser() {
    const newfile = JSON.parse(localStorage.getItem("file"));
    let formsend = this.newAdviserForm.value;
    formsend.outsourcing = formsend.outsourcing == 1 ? 0 : 1
    let subscription = this._service.save(formsend, newfile, this.userdata.user_id).pipe(
      map((resp) => {
        localStorage.removeItem("file");
        this.closeBtnClick();
        this.newAdviserForm.reset({})
        this.getCoverage(this.selectUser);
        this.toastr.success('Éxito', 'El asesor se ha creado correctamente');
        this.ngOnInit()
        this.localUrl = []
      }),
      catchError((err) => {
        //this.spinner.hide();
        this.toastr.error('error', 'Ocurrio un error');
        //console.log(err);
        return of();
      })
    ).subscribe(() => subscription.unsubscribe());
  }
  isCorrectForm() {
    if (
      this.newAdviserForm.valid
      && this.message.length == 0 && this.newAdviserForm.controls['firstname'].enabled
    ) {
      return true
    }
    return false
  }
  show(target, coverage) {
    this.localUrl = []
    this.spinner.show()
    this.actualAdviser = coverage;
    this._service.getImage(coverage.id_adviser).pipe(
      map((resp) => {
        this.localUrl = resp
        this.spinner.hide()
      }),
      catchError((err) => {
        //this.spinner.hide();
        this.toastr.error('error', 'Ocurrio un error');
        this.spinner.hide()
        //console.log(err);
        return of();
      })
    ).subscribe()
    console.log(coverage)
    this.openModal(target)
  }
  edit(targetmodal, coverage) {
    this.actualAdviser = coverage;
    this.setDataForm()
    this._service.getChilds(this.actualAdviser.id_adviser).pipe(
      map((resp) => {
        if (resp) {
          // this.message = 'Primero tiene que remover a los usuarios que se encuentren bajo el cargo de este usuario'
        }
      }),
      catchError((err) => {
        //this.spinner.hide();
        this.toastr.error('error', 'Ocurrio un error');
        this.spinner.hide()
        //console.log(err);
        return of();
      })
    ).subscribe()
    this.openModal(targetmodal);
  }
  async setDataForm() {
    this.spinner.show()
    this.localUrl = []
    this.enableForm()
    console.log(this.actualAdviser)
    this.newAdviserForm.controls['id_adviser'].setValue(this.actualAdviser.id_adviser);
    this.newAdviserForm.controls['user_id'].setValue(this.actualAdviser.user_id);

    this.newAdviserForm.controls['email'].setValue(this.actualAdviser.email);
    this.newAdviserForm.controls['address'].setValue(this.actualAdviser.address);
    this.newAdviserForm.controls['phone'].setValue(this.actualAdviser.phone);
    this.newAdviserForm.controls['id_adviser_type'].setValue(this.actualAdviser.id_adviser_type)
    this.newAdviserForm.controls['professional_code'].setValue(this.actualAdviser.professional_code);
    if (this.actualAdviser.id_holder) {
      this.newAdviserForm.controls['id_holder'].setValue(this.actualAdviser.id_holder)
    }
    this.radio1 = this.actualAdviser.outsourcing;
    await this.searchEmail(this.actualAdviser.email, false)
    this.newAdviserForm.controls['firstname'].setValue(this.actualAdviser.firstname);
    this.newAdviserForm.controls['lastname'].setValue(this.actualAdviser.lastname);
    await this.changeOutsorcing(this.radio1 == 0 ? 1 : 0)
    this.radio2 = this.actualAdviser.holder;
    await this.changeHolder(this.radio2)
    if (this.actualAdviser.holder == 0) {
      this.select_adviser = this.actualAdviser.id_holder
    }
    this.radio3 = this.actualAdviser.is_default
    await this.changeDefault(this.radio3 == 1 ? 1 : 0)
    this.enableForm()

    this._service.getImage(this.actualAdviser.id_adviser).pipe(
      map((resp) => {
        this.localUrl = resp
        this.spinner.hide()
      }),
      catchError((err) => {
        //this.spinner.hide();
        this.toastr.error('error', 'Ocurrio un error');
        this.spinner.hide()
        //console.log(err);
        return of();
      })
    ).subscribe()
  }
  saveChanges() {
    this.spinner.show()
    let data = { ...this.newAdviserForm.value }
    data.outsourcing = data.outsourcing == 1 ? 0 : 1
    const newfile = JSON.parse(localStorage.getItem("file"));
    console.log(data)
    if (newfile) {
      this._service.update(data, newfile, this.userdata.user_id).pipe(
        map((resp) => {
          this.toastr.success('Éxito', 'El Asesor fue actualizado con éxito.')
          this.getCoverage(this.selectUser)
          this.closeBtnClick();
          this.ngOnInit()
          
        }),
        catchError((err) => {
          this.toastr.error('error', 'Ocurrio un problema' + err.message);
          //console.log(err);
          this.closeBtnClick();
          return of();
        })
      ).subscribe()
    } else {
      this._service.update(data, null, this.userdata.user_id).pipe(
        map((resp) => {
          this.toastr.success('Éxito', 'El Asesor fue actualizado con éxito.')
          this.getCoverage(this.selectUser)
          this.closeBtnClick();
          this.ngOnInit()
        }),
        catchError((err) => {
          this.toastr.error('error', 'Ocurrio un problema' + err.message);
          //console.log(err);
          this.closeBtnClick();
          return of();
        })
      ).subscribe()
    }

    console.log(data)
  }
  async showAlertDelete(coverage) {
    this._service.getChilds(coverage.id_adviser).pipe(
      map(async (resp) => {
        if (resp) {
          Swal.fire({
            icon: 'error',
            title: 'Usuario incorrecto',
            text: 'El usuario no debe ser encargado de ningún usuario para eliminarlo',
          })
        } else {
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
      }),
      catchError((err) => {
        //this.spinner.hide();
        this.toastr.error('error', 'Ocurrio un error');
        this.spinner.hide()
        //console.log(err);
        return of();
      })
    ).subscribe()

  }
  canList():boolean {
    return this.autorization.havePermission(this.resource,'LIST')
  }
  canEdit():boolean {
    return this.autorization.havePermission(this.resource,'EDIT')
  }
  canDelete():boolean {
    return this.autorization.havePermission(this.resource,'DELETE')
  }
  canSee():boolean {
    return this.autorization.havePermission(this.resource,'SEE')
  }
  canCreate():boolean {
    return this.autorization.havePermission(this.resource,'CREATE')
  }
  searchTerm() {
    this.getCoverage(this.search.controls.q.value);
  }
}
