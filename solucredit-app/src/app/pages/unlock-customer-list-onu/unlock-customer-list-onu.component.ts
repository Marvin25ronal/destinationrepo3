import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MysqlService } from '../../services/mysql/mysql.service';

@Component({
  selector: "app-unlock-customer-list-onu",
  templateUrl: "./unlock-customer-list-onu.component.html",
  styleUrls: ["./unlock-customer-list-onu.component.css"],
})
export class UnlockCustomerListOnuComponent implements OnInit {
  data = [];
  page = 1;
  pageSize = 10;

  constructor(
    private mysqlService: MysqlService,
    private toastr: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  _searchTerm: string;
  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(val: string) {
    this._searchTerm = val;
    this.data = this.filter(val);
  }

  filter(v: string) {
    console.log(v);
    if (v !== "") {
      return this.data.filter(
        (x) =>
          x.name.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
          x.nit.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
          x.address1.toLowerCase().indexOf(v.toLowerCase()) !== -1
        /*x.address2.toLowerCase().indexOf(v.toLowerCase()) !== -1*/
      );
    } else {
      //return this.GetListCustomer();
    }
  }

  ngOnInit(): void {}
}
