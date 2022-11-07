import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MysqlService } from '../../services/mysql/mysql.service';
import { AuthorizationService } from '../../services/authorization.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: "app-verification-list-onu",
  templateUrl: "./verification-list-onu.component.html",
  styleUrls: ["./verification-list-onu.component.css"],
})
export class VerificationListOnuComponent implements OnInit {
  data = [];
  page = 1;
  pageSize = 10;
  currentUser;
  idCustomerBlock;
  nameCustomerBlock;
  idreference;
  userMatch: any;
  constructor(
    private modalService: NgbModal,
    private mysqlService: MysqlService,
    private toastr: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private autorization: AuthorizationService
  ) {}

  canUnblock(): boolean {
    let resource = "ONU";
    return this.autorization.havePermission(resource, "UNBLOCK");
  }
  canBlock(): boolean {
    let resource = "ONU";
    return this.autorization.havePermission(resource, "BLOCK");
  }

  cambiarEstadoUsuario = new FormGroup({
    description: new FormControl("", [Validators.required]),
  });

  _searchTerm: string;
  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(val: string) {
    this._searchTerm = val;
    this.data = this.filter(val);
  }

  filter(v: string) {
    //console.log(v);
    if (v !== "") {
      return this.data.filter(
        (x) =>
          x.customer.name.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
          x.onu.FIRST_NAME.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
          x.onu.SECOND_NAME.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
          x.customer.customer_id == v ||
          x.onu.DATAID == v
        /*x.address2.toLowerCase().indexOf(v.toLowerCase()) !== -1*/
      );
    } else {
      this.GetVerificationList();
    }
  }

  async GetVerificationList() {
    this.spinner.show();
    await this.mysqlService
      .GetONUMatch()
      .toPromise()
      .then((res) => {
        console.log('res',res);
        let cont = 0;
        this.data = res.data;
        this.data.forEach(element => {
          
          if(element.customer == null){
            this.data.splice(cont,cont);
          }
          cont++;
          
        });
        //console.log("res", this.data);
        this.spinner.hide();
      })
      .catch((err) => {
        this.toastr.error("Problemas con el servidor.", "Oops!");
        this.spinner.hide();
      });
  }

  BlockUser() {
    this.spinner.show("busuario");
    let id = this.idCustomerBlock;
   // this.spinner.show("dusuario");
    let data = {
      status_id: 1,
      description: this.cambiarEstadoUsuario.value.description,
      reference: this.idreference,
      employee_email: localStorage.getItem("email"),
      
    };
    if(this.userMatch.metadata.fiduciary){
      //@ts-ignore
      data = {...data,fiduciary:this.userMatch.metadata.fiduciary};
    }
    else if(this.userMatch.metadata.representative){
      //@ts-ignore
      data = {...data,representative:this.userMatch.metadata.representative};

    }
    this.mysqlService
      .UpdateCustomer(
        data,
        this.idCustomerBlock
      )
      .subscribe(
        (response) => {
          this.GetVerificationList();
          this.modalService.dismissAll();
          this.toastr.success("Se bloqueo el usuario.", "Usuario Bloqueado!");
          this.spinner.hide("busuario");
        },
        (error) => {
          this.toastr.error("Problemas al bloquear el usuario.", "Oops!");
          console.log("error");
          this.spinner.hide("busuario");
        }
      );
  }

  UnlockUser() {
    let id = this.idCustomerBlock;
    this.spinner.show("dusuario");
    let data = {
      status_id: 0,
      description: this.cambiarEstadoUsuario.value.description,
      reference: this.idreference,
      employee_email: localStorage.getItem("email"),
      
    };
    //console.log('UNLOCK',this.userMatch);
    if(this.userMatch.metadata.fiduciary){
      //@ts-ignore
      data = {...data,fiduciary:this.userMatch.metadata.fiduciary};
    }
    else if(this.userMatch.metadata.representative){
      //@ts-ignore
      data = {...data,representative:this.userMatch.metadata.representative};

    }
    this.mysqlService
      .UpdateCustomer(
        data,
        id
      )
      .subscribe(
        (response) => {
          this.modalService.dismissAll();
          this.GetVerificationList();
          this.toastr.success(
            "Se desbloqueo el usuario.",
            "Usuario Desbloqueado!"
          );
          this.spinner.hide("dusuario");
        },
        (error) => {
          this.toastr.error("Problemas al desbloquear el usuario.", "Oops!");
          console.log("error");
          this.spinner.hide("dusuario");
        }
      );
  }

  openModal2(targetModal,user) {
    //console.log(user);
    this.userMatch = user;
    //this.confirmblock,user.customer.customer_id,user.customer.name, user.onu.id_reference
    this.cambiarEstadoUsuario.reset({});
    this.idCustomerBlock = user.customer.customer_id;
    this.nameCustomerBlock = user.customer.name;
    this.idreference = user.onu.id_reference;
      
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: "static",
      keyboard: false,
    });
  }

  closeBtnClick() {
    //console.log('Se va a cerrar el modal');
    this.modalService.dismissAll();
  }

  async ngOnInit() {
    await this.GetVerificationList();
  }
}
