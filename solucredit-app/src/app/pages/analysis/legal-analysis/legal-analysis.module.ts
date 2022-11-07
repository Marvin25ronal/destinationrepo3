import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LegalAnalysisComponent } from './legal-analysis.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxCurrencyModule } from 'ngx-currency';
import { QuillModule } from 'ngx-quill';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Análisis Legal",
      urls: [
        { title: "Análisis Legal", url: "/legal-analysis" },
        { title: "Detalle" }
      ]
    },
    component: LegalAnalysisComponent
  },
]

@NgModule({
  declarations: [],
  imports: [
    FormsModule,
    PipesModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgbModule,
    NgxSpinnerModule,
    SharedModule,
    NgxCurrencyModule,
    QuillModule.forRoot(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LegalAnalysisModule { }
