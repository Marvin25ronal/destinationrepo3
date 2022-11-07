import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AnalysisReportComponent } from './analysis-report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PipesModule } from '../../pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxCurrencyModule } from 'ngx-currency';
import { QuillModule } from 'ngx-quill';

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Reporte de Análisis",
      urls: [
        { title: "Reporte Analisis", url: "/analysis-report" },
        { title: "Información" }
      ]
    },
    component: AnalysisReportComponent
  },
  {
    path: ":id",
    data: {
      title: "Reporte de Análisis...",
      urls: [
        { title: "Ficha reporte", url: "/analysis-report" },
        { title: "Informacion" }
      ]
    },
    component: AnalysisReportComponent
  }
]

@NgModule({
  declarations: [
   
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgbModule,
    NgxSpinnerModule,
    SharedModule,
    NgxCurrencyModule,
    QuillModule.forRoot(),
  ]
})
export class AnalysisReportModule { }
