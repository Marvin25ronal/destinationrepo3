import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { CustomerComplianceComponent } from "./customer-compliance.component";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { NgxSpinnerModule } from "ngx-spinner";
import { QuillModule } from "ngx-quill";
import { PipesModule } from '../../pipes/pipes.module'
import { SharedModule } from '../../shared/shared.module'
import { NgxCurrencyModule } from "ngx-currency";


const routes: Routes = [
  {
    path: "",
    data: {
      title: "Información de Cliente",
      urls: [
        { title: "Clientes", url: "/list-customer" },
        { title: "Detalle de Cliente", url: "/" },
        { title: "Análisis de requisitos" },
      ],
    },
    component: CustomerComplianceComponent,
  },
];

@NgModule({
  imports: [
    PipesModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgbModule,
    NgxSpinnerModule,
    SharedModule,
    NgxCurrencyModule,
    QuillModule.forRoot(),
 
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [],
})
export class DashboardModule {}
