import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationService } from '../../services/authorization.service';
import { MysqlService } from '../../services/mysql/mysql.service';

@Component({
  selector: "app-upload-onu-list",
  templateUrl: "./upload-onu-list.component.html",
  styleUrls: ["./upload-onu-list.component.css"],
})
export class UploadOnuListComponent implements OnInit {
  data = [];
  page = 1;
  pageSize = 10;
  binnaclelist = [];
  currentUser;

  constructor(
    private modalService: NgbModal,
    private mysqlService: MysqlService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private autorization: AuthorizationService
  ) {}

  canUpload(): boolean { 
    let resource = 'ONU';
    return this.autorization.havePermission(resource, 'UPLOAD');
  }
  
  
  

  formListaONU = new FormGroup({
    file_name: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
  });

  _searchTerm: string;
  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(val: string) {
    this._searchTerm = val;
    this.binnaclelist = this.filter(val);
  }

  filter(v: string) {
    if (v !== "") {
      return this.binnaclelist.filter(
        (x) =>
          x.file_name.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
          x.username.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
          x.description.toLowerCase().indexOf(v.toLowerCase()) !== -1
        /*x.address2.toLowerCase().indexOf(v.toLowerCase()) !== -1*/
      );
    } else {
      this.GetONUList();
    }
  }

  openModal2(targetModal) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: "static",
      keyboard: false,
      windowClass:'my-modal'
    });
  }

  closeBtnClick() {
    //console.log('Se va a cerrar el modal');
    this.modalService.dismissAll();
  }

  async GetONUList() {
    this.spinner.show();
    await this.mysqlService
      .GetONUList()
      .toPromise()
      .then((res) => {
        this.binnaclelist = res.data;
        this.spinner.hide();
      })
      .catch((err) => {
        console.log("error", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
        this.spinner.hide();
      });
  }

  async SaveNewListONU() {
    this.spinner.show();
    this.formListaONU.value.username = this.currentUser;
    await this.mysqlService
      .CreateONUList(this.formListaONU.value)
      .toPromise()
      .then((res) => {
        this.GetONUList();
        //console.log('res',res);
        this.toastr.success("Se creo una lista nueva.", "Lista Creada");
        this.modalService.dismissAll();
        this.formListaONU.reset({});
        this.spinner.hide();
      })
      .catch((err) => {
        this.toastr.error("Problemas con el servidor.", "Oops!");
        console.log("err", err);
        this.spinner.hide();
      });
  }

  async ngOnInit() {
    this.currentUser = localStorage.getItem("email");
    await this.GetONUList();
  }
}
