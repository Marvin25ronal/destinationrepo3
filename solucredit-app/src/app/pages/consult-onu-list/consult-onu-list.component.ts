import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MysqlService } from "../../services/mysql/mysql.service";

@Component({
  selector: "app-consult-onu-list",
  templateUrl: "./consult-onu-list.component.html",
  styleUrls: ["./consult-onu-list.component.css"],
})
export class ConsultOnuListComponent implements OnInit {
  dataAllCustomer;
  dataCountRequest;
  page = 1;
  pageSize = 10;
  binnaclelist = [];
  tempdata = [];

  constructor(
    private mysqlService: MysqlService,
    private toastr: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  formfilter = new FormGroup({
    inital_date: new FormControl("", [Validators.required]),
    final_date: new FormControl("", [Validators.required]),
  });

  _searchTerm: string;
  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(val: string) {
    this._searchTerm = val;
  }

  filterdate(di: string, df: string) {
    if (di !== "" && df !== "") {
      return this.binnaclelist.filter(
        (x) => x.creation_date >= di && x.creation_date <= df
      );
    }
  }

  async FilterdataDate() {
    this.binnaclelist = this.tempdata;
    this.binnaclelist = this.filterdate(
      this.formfilter.value.inital_date,
      this.formfilter.value.final_date
    );
  }

  async GetONUList() {
    this.spinner.show();
    await this.mysqlService
      .GetONUList()
      .toPromise()
      .then((res) => {
        this.binnaclelist = res.data;
        this.tempdata = res.data;
        this.spinner.hide();
      })
      .catch((err) => {
        console.log("error", err);
        this.toastr.error("Problemas con el servidor.", "Oops!");
        this.spinner.hide();
      });
  }

  async ngOnInit() {
    await this.GetONUList();
  }
}
