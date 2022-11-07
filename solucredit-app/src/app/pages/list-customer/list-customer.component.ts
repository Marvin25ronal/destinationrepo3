import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MysqlService } from '../../services/mysql/mysql.service';
import { AuthorizationService } from '../../services/authorization.service';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: "app-list-customer",
  templateUrl: "./list-customer.component.html",
  styleUrls: ["./list-customer.component.css"],
})
export class ListCustomerComponent implements OnInit {
  dataAllCustomer;
  allData;
  dataCountRequest;
  page = 1;
  pageSize = 10;
  optionsCategories;
  selectcategory;
  tempdata;
  selectUser;
  totalData: number
  search = new FormGroup({
    q: new FormControl(null),
  })
  constructor(
    private mysqlService: MysqlService,
    private toastr: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private autorization: AuthorizationService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.selectUser = "";
    this.GetListCustomer();
    this.getCategories();
  }
  //METODOS PARA VERIFICACIONES DER PERMISOS
  canSee(): boolean {
    let resource = "CLIENT";
    return this.autorization.havePermission(resource, "SEE");
  }
  canCreate(): boolean {
    let resource = "CLIENT";
    return this.autorization.havePermission(resource, "CREATE");
  }
  canAddRepresentative(): boolean {
    let resource = "CLIENT";
    return this.autorization.havePermission(resource, "ADD_REPRESENTATIVE");
  }
  canEdit(): boolean {
    let resource = "CLIENT";
    return this.autorization.havePermission(resource, "EDIT");
  }
  canList(): boolean {
    let resource = "CLIENT";
    return this.autorization.havePermission(resource, "LIST");
  }

  //----------

  GetListCustomer() {
    this.spinner.show()
    this.mysqlService
      .GetAllCustomer(
        this.pageSize,
        0,
        this.selectUser
      )
      .toPromise()
      .then((response) => {

        this.allData = response.data.customer;
        this.dataAllCustomer = this.allData
        //console.log(response.data.customer);
        this.dataCountRequest = response.data.count;
        this.spinner.hide();
        this.tempdata = response.data.customer;
        this.totalData = response.data.totalData
      })
      .catch((error) => {
        this.toastr.error("Problemas con la conexión al servidor.", "Oops!");
      });
  }
  searchTermM() {
    this.getList(this.search.controls.q.value)
  }
  pageChange(e) {
    this.getList(this.selectUser)
  }
  getList(search) {
    this.spinner.show()
    this.mysqlService
      .GetAllCustomer(
        this.pageSize,
        (this.page - 1) * this.pageSize,
        search
      )
      .toPromise()
      .then((response) => {

        this.allData = response.data.customer;
        this.dataAllCustomer = this.allData
        //console.log(response.data.customer);
        this.dataCountRequest = response.data.count;
        this.spinner.hide();
        this.tempdata = response.data.customer;
        this.totalData = response.data.totalData
      })
      .catch((error) => {
        this.toastr.error("Problemas con la conexión al servidor.", "Oops!");
        this.spinner.hide()
      });
  }
  ViewCliente(id: string) {
    this.router.navigate([`/customer/cliente/${id}`]);
  }

  EditCliente(id: string) {
    this.router.navigate([`/edit-customer/cliente/${id}`]);
  }

  NewCustomer() {
    this.router.navigate([`/new-user`]);
  }

  //Searching..........
  _searchTerm: string;
  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(val: string) {
    this._searchTerm = val;
    this.dataAllCustomer = this.filter(val);
  }

  filter(v: string) {
    console.log(v);
    if (v !== "") {
      this.dataAllCustomer = this.allData.filter(
        (x) =>
          x?.name?.toLowerCase().indexOf(v.toLowerCase()) !== -1
        // x?.nit.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
        // x?.address1?.toLowerCase().indexOf(v.toLowerCase()) !== -1
        /*x.address2.toLowerCase().indexOf(v.toLowerCase()) !== -1*/
      );
      console.log(this.dataAllCustomer)
    } else {
      return this.GetListCustomer();
    }
  }

  filtertest(v: number) {
    this.dataAllCustomer = this.tempdata;
    v = Number(v);
    if (v != 0) {
      this.spinner.show()
      this.mysqlService
        .GetAllCustomer(
          this.pageSize,
          (this.page - 1) * this.pageSize,
          this.selectUser,
          v
        )
        .toPromise()
        .then((response) => {
          this.allData = response.data.customer;
          this.dataAllCustomer = this.allData
          //console.log(response.data.customer);
          this.dataCountRequest = response.data.count;
          this.spinner.hide();
          this.tempdata = response.data.customer;
          this.totalData = response.data.totalData
        })
        .catch((error) => {
          this.toastr.error("Problemas con la conexión al servidor.", "Oops!");
          this.spinner.hide()
        });
    } else if (v == 0) {
      return this.GetListCustomer();
    }
  }

  async getCategories() {
    const res = this.mysqlService
      .GetAllCustomerCategories()
      .toPromise()
      .then((response) => {
        this.optionsCategories = response.data;
        this.selectcategory = "";
      });
    return res;
  }

  onChangeCategory(deviceValue) {
    this.filtertest(deviceValue);
  }

  addnewPerson(id: string) {
    this.router.navigate([`/new-person/cliente/${id}`]);
  }
}
