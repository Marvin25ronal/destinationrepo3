import { Component, OnInit } from '@angular/core';
import { Log } from 'src/app/models/log.model';
import { LogsService } from 'src/app/services/service.index';
import { PaginationTableData } from '../../interfaces/ui/pagination-table.interface'
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../user/servicio/user.service';
import { User } from 'src/app/models/user.model';
import { map, catchError } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';
import { of } from 'rxjs';
import { NgbDateStruct, NgbCalendar, NgbDateAdapter, NgbDateNativeAdapter, NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap';

const my = new Date();
@Component({
  selector: "app-log",
  templateUrl: "./log.component.html",
  styleUrls: ["./ngtable.component.scss"],
})
export class LogComponent implements OnInit {
  //--COSAS PARA LOS FILTROS-------
  searchField = [];
  searchItem = [];
  vals: any[] = [null, null, ""];
  config = [
    {
      label: "Rango de fechas:",
      tipo: "DATE",
      range: true,
      labelsAux: ["Fecha inicio:", "Fecha fin"],
    },
    {
      label: "Usuario",
      tipo: "DROPDOWN",
      range: false,
      labelsAux: ["Email"],
    },

    {
      tipo: "OPTIONS",
      options: {
        restart: true,
        header: false,
      },
    },
  ];

  /* model: NgbDateStruct;
  date: { year: number; month: number }; */
  //

  pageSize = 10;
  page = 1;
  totalData = 0;
  Infologsold = [];
  Infologsnew = [];
  newdatacurrentLog = [];
  olddatacurrentLog = [];
  usersData: any = [];

  dataList: PaginationTableData = {
    metadata: [
      "Email/Usuario",
      "Fecha",
      "Hora",
      "Acción realizada",
      "Ip",
      "Info",
    ],
    data: [],
  };

  constructor(
    private notifier: NotifierService,
    private _service: LogsService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private _userService: UserService
  ) {
    /* this.model = { year: my.getFullYear(), month: my.getMonth() + 1, day: my.getDate() }; */
  }

  ngOnInit(): void {
    this.spinner.show();
    this.pageSize = 10;
    this._service.getLogs(this.pageSize, 0, [], []).subscribe((logs:any) => {
      this.Infologsnew = [];
      this.Infologsold = [];
      this.dataList.data = logs.logs;
      this.totalData = 50;
      //console.log("logs", logs.logs);
      logs.logs.forEach((element) => {
        console.log("old " + element.old_data);
        if (element.old_data != null && element.old_data != "") {
          this.Infologsold.push({
            id: element.user_log_id,
            data: JSON.parse(element.old_data),
          });
        }
        if (element.new_data != null && element.new_data != "") {
          this.Infologsnew.push({
            id: element.user_log_id,
            data: JSON.parse(element.new_data),
          });
        }
      });
      this.spinner.hide();
    });
    this.getUsers();
  }

  getLogs() {
    this.spinner.show();
    this._service
      .getLogs(
        this.pageSize,
        (this.page - 1) * this.pageSize,
        this.searchItem,
        this.searchField
      )
      .pipe(
        map((logs:any) => {
          //console.log(logs.logs);
          this.dataList.data = logs.logs;
          this.totalData = logs.count;
          this.Infologsnew = [];
          this.Infologsold = [];
          this.dataList.data = logs.logs;
          this.totalData = logs.count;
          logs.logs.forEach((element) => {
            console.log("old " + element.old_data);
            if (element.old_data != null && element.old_data != "") {
              this.Infologsold.push({
                id: element.user_log_id,
                data: JSON.parse(element.old_data),
              });
            }
            if (element.new_data != null && element.new_data != "") {
              this.Infologsnew.push({
                id: element.user_log_id,
                data: JSON.parse(element.new_data),
              });
            }
          });
          this.spinner.hide();
        }),
        catchError((err) => {
          this.notifier.notify(
            "error",
            "Ocurrio un problema con la conexion" + err
          );
          console.log(err);
          return of();
        })
      )
      .subscribe();
  }
  filter(dataFilter) {
    this.searchField = [];
    this.searchItem = [];

    if (this.vals[0] && this.vals[1]) {
      this.searchField.push("FECINI");
      let fecini =
        this.vals[0].year +
        "-" +
        this.vals[0].month +
        "-" +
        this.vals[0].day +
        " 00:00:00";
      this.searchItem.push(fecini);
      this.searchField.push("FECEND");
      let fecend =
        this.vals[1].year +
        "-" +
        this.vals[1].month +
        "-" +
        this.vals[1].day +
        " 23:59:59";
      this.searchItem.push(fecend);
    }

    if (this.vals[2] != "") {
      this.searchField.push("EMAIL");
      this.searchItem.push(this.vals[2]);
    }
    this._service
      .getLogs(
        this.pageSize,
        (this.page - 1) * this.pageSize,
        this.searchItem,
        this.searchField
      )
      .pipe(
        map((logs:any) => {
          //console.log(logs.logs);
          this.dataList.data = logs.logs;
          this.totalData = logs.count;
          this.Infologsnew = [];
          this.Infologsold = [];
          logs.logs.forEach((element) => {
            //console.log('old '+ element.old_data);
            if (element.old_data != null && element.old_data != "") {
              this.Infologsold.push({
                id: element.user_log_id,
                data: JSON.parse(element.old_data),
              });
            }
            if (element.new_data != null && element.new_data != "") {
              this.Infologsnew.push({
                id: element.user_log_id,
                data: JSON.parse(element.new_data),
              });
            }
          });
          this.spinner.hide();
        }),
        catchError((err) => {
          this.notifier.notify(
            "error",
            "Ocurrio un problema con la conexion" + err
          );
          console.log(err);
          return of();
        })
      )
      .subscribe();
  }
  getUsers() {
    //console.log('LE DI CLICK AL DROPDOWN');

    this._userService
      .getUsers(1000, 0,[],[])
      .pipe(
        map((users) => {
          this.usersData = users.data.map((item) => ({
            value: item.email,
            text: item.email,
          }));
        }),
        catchError((err) => {
          this.notifier.notify(
            "error",
            "Ocurrio un problema con la conexion" + err
          );
          console.log(err);
          return of();
        })
      )
      .subscribe();
  }
  pageChange(e) {
    //console.log(e);

    this.getLogs();
  }

  closeBtnClick() {
    this.modalService.dismissAll();
  }
  openModal(targetModal, logid) {
    this.newdatacurrentLog = [];
    this.olddatacurrentLog = [];

    const result1 = this.Infologsold.find((oldlog) => oldlog.id == logid);
    const result2 = this.Infologsnew.find((newlog) => newlog.id == logid);

    if (result2 != null && result2 != "") {
      Object.entries(result2.data).forEach(([key, value]) => {
        this.newdatacurrentLog.push({ key: key, value: value });
      });
    }
    if (result1 != null && result1 != "") {
      Object.entries(result1.data).forEach(([key, value]) => {
        this.olddatacurrentLog.push({ key: key, value: value });
      });
    }
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: "static",
      keyboard: false,
      size: "xl",
    });
  }
}
