import { Component, OnInit, Input } from '@angular/core';
import { Log } from 'src/app/models/log.model';
import { PaginationTableData } from '../../../interfaces/ui/pagination-table.interface';
@Component({
  selector: 'app-pagination-table',
  templateUrl: './pagination-table.component.html',
  styleUrls: ['./ngtable.component.scss']
})
export class PaginationTableComponent implements OnInit {
  pageSize = 2;
  page = 1;
  totalData = 100;
  @Input('dataList') dataList: PaginationTableData ;

  constructor() { }

  ngOnInit(): void {
  }

}
