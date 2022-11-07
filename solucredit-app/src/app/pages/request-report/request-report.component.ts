import { Component, OnInit } from '@angular/core';
import { PaginationTableData } from '../../interfaces/ui/pagination-table.interface';
import { NgbDateStruct, NgbCalendar, NgbDateAdapter, NgbDateNativeAdapter, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { RequestService } from './servicio/request-report.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { NotifierService } from 'angular-notifier';
import { MysqlService } from '../../services/mysql/mysql.service';
import { DatePipe } from '@angular/common'
@Component({
  selector: 'app-request-report',
  templateUrl: './request-report.component.html',
  styleUrls: ['./request-report.component.scss']
})
export class RequestReportComponent implements OnInit {

  constructor(private _service: RequestService, private spinner: NgxSpinnerService, private notifier: NotifierService, private mysqlService: MysqlService,public datepipe: DatePipe) { }

  //-------FILTER-COMPONENT STUFFFF------
  valores1: any[] = [
    { value: 0, text: "Factoraje Tradicional" },
    { value: 1, text: "Factoraje Especial" },
    { value: 3, text: "Especiales" },
    { value: 4, text: "Pronto Pago" },
    
  ];
  valores2: any[] = [
    { value: 'NIT', text: "nit" },
    { value: 'NAME', text: "nombre" },
    
  ];
  
  
  vals: any[] = ['','','','...',null,null,];

  config = [
    {
      label: ' Filtrar por tipo de solicitud',
      tipo: 'DROPDOWN',
      range: false,
      labelsAux:['Tipo:']
      
    },
    {
      label: 'Filtrar por usuario ',
      tipo: 'DROP_TEXT',
      range: true,
      labelsAux: ['Filtro:','Palabra']

    },
    {
      label: 'Rango de fechas',
      tipo: 'DATE',
      range: true,
      labelsAux: ['Fecha inicio:', 'Fecha fin:']

    },
    {
      
      tipo: 'OPTIONS',
      options: {
        restart: true,
        header:true
        
      }

    }
  ]
  //-------------




  //model: NgbDateStruct;
  //model2: NgbDateStruct;
  date: { year: number; month: number };

  selectedRequestType: any = "";
  selectedCustomerFilter: any = "";
  selectCustomerSearch: any = "";

  dataList: PaginationTableData = {
    metadata: [
      "ID Cliente",
      "Nombre",
      "Nit",
      "ID solicitud",
      "Documentos",
      "Garantias",
      "Estado",
      "Tipo",
      "Fecha de creacion",
      "Verificaciones"


    ],
    data: []
  };
  pageSize = 10;
  page = 1;
  totalData = 0;

  ngOnInit(): void {
    this.spinner.show();
    this._service.getRequests(this.pageSize, 0, [], []).pipe(
      map((data) => {
        this.dataList.data = data.data;
        this.totalData = data.count;
        this.spinner.hide();



      }),
      catchError((err) => {
        this.notifier.notify('error', 'Ocurrio un problema con la conexion' + err);
        console.log(err);
        this.spinner.hide();
        return of();
      })

    ).subscribe((data) => {



    })
  }
  onChangeCategory1(deviceValue) {

    this.selectedRequestType = deviceValue;
    /* if (this.selectUser != "") {
      this.getLogs([this.selectUser]);
    }
    else {
      this.getLogs("");
    } */

  }
  onChangeCategory2(deviceValue) {

    this.selectedCustomerFilter = deviceValue;
    /*  if (this.selectUser != "") {
       this.getLogs([this.selectUser]);
     }
     else {
       this.getLogs("");
     } */

  }


  async xlsxDownload(e){
    /*let searchField = [];
    let searchItem = [];
    if (this.model && this.model2) {
      searchField.push('FECINI');
      let fecini = this.model.year + '-' + this.model.month + '-' + this.model.day + ' 00:00:00';
      searchItem.push(fecini);
      searchField.push('FECEND');
      let fecend = this.model2.year + '-' + this.model2.month + '-' + this.model2.day + ' 23:59:59';
      searchItem.push(fecend);
    }


    if (this.selectedRequestType != "") {
      searchField.push('TYPE');
      searchItem.push(this.selectedRequestType);
    }
    if (this.selectedCustomerFilter != "" && this.selectCustomerSearch != "") {
      searchField.push(this.selectedCustomerFilter);
      searchItem.push('%' + this.selectCustomerSearch + '%');
    }*/
    

    let searchField = [];
    let searchItem = [];
    console.log('SEARCH:: ');
    console.log(e);
    if (this.vals[4] && this.vals[5]) {
      searchField.push('FECINI');
      let fecini = this.vals[4].year + '-' + this.vals[4].month + '-' + this.vals[4].day + ' 00:00:00';
      searchItem.push(fecini);
      searchField.push('FECEND');
      let fecend = this.vals[5].year + '-' + this.vals[5].month + '-' + this.vals[5].day + ' 23:59:59';
      searchItem.push(fecend);
    }


    if (this.vals[0] != "" ) {
      searchField.push('TYPE');
      searchItem.push(this.vals[0]);
    }
    if (this.vals[2] != "" && this.vals[3] != "") {
      searchField.push(this.vals[2]);
      searchItem.push('%' + this.vals[3] + '%');
    }
    
    let date= new Date();
    let datestring =this.datepipe.transform(date, 'yyyy-MM-dd HH:MM:ss');
    await this.mysqlService
      .DownloadXlsx('ReporteSolicitudes'+datestring, searchItem, searchField);

  }

  search(e) {
    let searchField = [];
    let searchItem = [];
    console.log('SEARCH:: ');
    console.log(e);
    if (this.vals[4] && this.vals[5]) {
      searchField.push('FECINI');
      let fecini = this.vals[4].year + '-' + this.vals[4].month + '-' + this.vals[4].day + ' 00:00:00';
      searchItem.push(fecini);
      searchField.push('FECEND');
      let fecend = this.vals[5].year + '-' + this.vals[5].month + '-' + this.vals[5].day + ' 23:59:59';
      searchItem.push(fecend);
    }


    if (this.vals[0] != "" ) {
      searchField.push('TYPE');
      searchItem.push(this.vals[0]);
    }
    if (this.vals[2] != "" && this.vals[3] != "") {
      searchField.push(this.vals[2]);
      searchItem.push('%' + this.vals[3] + '%');
    }

    this._service.getRequests(this.pageSize, (this.page - 1) * this.pageSize, searchItem, searchField).pipe(
      map((data) => {
        this.dataList.data = data.data;
        this.totalData = data.count;
        this.spinner.hide();



      }),
      catchError((err) => {
        this.notifier.notify('error', 'Ocurrio un problema con la conexion' + err);
        console.log(err);
        this.spinner.hide();
        return of();
      })

    ).subscribe((data) => {



    })

  }
  pageChange(e) {
    //console.log(e);

    this.search(e);
  }

  onfilterChange1(e) { 
    console.log('onfilterChange1:' + e);
    console.log(this.vals);
  }
  onfilterChange2(e) {
    console.log('onfilterChange2:' + e);
    console.log(this.vals);
  }



}
