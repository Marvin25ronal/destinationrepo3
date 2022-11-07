import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { ListCustomerComponent } from "./list-customer.component";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { NgxSpinnerModule } from "ngx-spinner";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Listado de clientes y prospetos",
      urls: [
        { title: "Clientes", url: "/list-customer" },
        { title: "Información de clientes y prospecto" },
      ],
    },
    component: ListCustomerComponent,
  },
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgbModule,
    NgxSpinnerModule,
  ],
  declarations: [ListCustomerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardModule {}
