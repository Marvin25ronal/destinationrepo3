import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxCurrencyModule } from 'ngx-currency';
import { QuillModule } from 'ngx-quill';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComplianceVerificationComponent } from './compliance-verification.component';



const routes: Routes = [
  {
    path: "",
    data: {
      title: "Verifiación de Cumplimiento",
      urls: [
        { title: "Verificación de Cumplimiento", url: "/compliance-verification" },
        { title: "Detalle" }
      ]
    },
    component: ComplianceVerificationComponent
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
export class ComplianceVerificationModule { }
