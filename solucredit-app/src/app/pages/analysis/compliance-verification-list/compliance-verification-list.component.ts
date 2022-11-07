import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PaginationTableData } from 'src/app/interfaces/ui/pagination-table.interface';
import { AnalysisService } from 'src/app/services/analysis/analysis.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { MysqlService } from 'src/app/services/mysql/mysql.service';
import { SIZE_PAGE } from 'src/Utils/constants';

@Component({
  selector: 'app-compliance-verification-list',
  templateUrl: './compliance-verification-list.component.html',
  styleUrls: ['./compliance-verification-list.component.scss']
})
export class ComplianceVerificationListComponent implements OnInit {
  exampleName = "Ej. Ahorro";
  spanNameMessage = `El campo es requerido`
  placeholder = 'Buscar Análisis';
  dataList: PaginationTableData = {
    metadata: [
      "No.",
      "Cliente",
      "Fecha de creación",
      "Comentario",
      "Acciones"
    ],
    data: []
  }
  totalData: number;
  search = new FormGroup({
    q: new FormControl(''),
  })
  pageSize = SIZE_PAGE;
  page = 1;
  targetUploadDocuments: string;
  FormUploadDocumentsCA = new FormGroup({
    uploaddocsca_comment: new FormControl("", [Validators.required]),
  });

  constructor(
    private autorization: AuthorizationService,
    private _analysisService: AnalysisService,
    private _mysqlService: MysqlService,
    private spinner: NgxSpinnerService,
    private router: Router,
    
  ) { }

  async ngOnInit() {
    //Obtener el listado de analysis legales que tiene un usuario de tipo legal
    this.spinner.show()
    await this.getLegalList()
    console.log(this.dataList.data)
    this.spinner.hide()

  }
  async getLegalList() {
    let email = localStorage.getItem("email")
    const res = await this._analysisService.getComplianceAnalyisisList(email, this.pageSize, 0, this.search.controls.q.value).toPromise().then(
      (response) => {
        console.log(response)
        this.dataList.data = response
        this.totalData = response.length
      }
    )
    return res
  }
  
  pageChange(e) {
    //console.log(e);
    // this.getCoverage(this.selectUser);
  }
  searchTerm() {
    this.getLegalList()
  }
  openAnalysis(analysis) {
    console.log(analysis)
    this.router.navigate(
      [
        `compliance-verification/${analysis.id_commercialanalysis}/${analysis.id_request}/${analysis.id_customer}`
      ]
    );
  }
 

}
