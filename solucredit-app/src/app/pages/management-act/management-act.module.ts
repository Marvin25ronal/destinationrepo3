import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ManagementActComponent } from './management-act.component';
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
        { title: "Acta de Gerencia", url: "/management-act" },
        { title: "Información" }
      ]
    },
    component: ManagementActComponent
  },
  {
    path: ":id",
    data: {
      title: "Reporte de Análisis...",
      urls: [
        { title: "Acta de Gerencia", url: "/management-act" },
        { title: "Informacion" }
      ]
    },
    component: ManagementActComponent
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
export class ManagementActModule { }
