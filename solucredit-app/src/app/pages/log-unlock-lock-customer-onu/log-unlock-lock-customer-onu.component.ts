import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationService } from '../../services/service.index';
import { MysqlService } from '../../services/mysql/mysql.service';

@Component({
  selector: "app-log-unlock-lock-customer-onu",
  templateUrl: "./log-unlock-lock-customer-onu.component.html",
  styleUrls: ["./log-unlock-lock-customer-onu.component.css"],
})
export class LogUnlockLockCustomerOnuComponent implements OnInit {
  data = [];
  page = 1;
  pageSize = 10;
  constructor(
    private modalService: NgbModal,
    private mysqlService: MysqlService,
    private toastr: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private autorization: AuthorizationService
  ) {}

  ngOnInit() {
    this.GetVerificationList();
  }

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
      .GetLogsUnlockLockCustomerOnu()
      .toPromise()
      .then((res) => {
        console.log('res',res);
        //console.log("data", res.data);
        this.data = res.data;
        this.spinner.hide();
      })
      .catch((err) => {
        this.toastr.error("Problemas con el servidor.", "Oops!");
        this.spinner.hide();
      });
  }
}
