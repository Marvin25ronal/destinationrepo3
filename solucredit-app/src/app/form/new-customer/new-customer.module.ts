import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NewCustomerComponent} from './new-customer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxCurrencyModule } from "ngx-currency";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Crear un nuevo prospecto",
      urls: [
        { title: "Listado de clientes y prospectos", url: "/new-customer" },
        { title: "Crear un nuevo prospecto" },
      ],
    },
    component: NewCustomerComponent,
  },
];

@NgModule({
  declarations: [NewCustomerComponent],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgbModule,
    NgxCurrencyModule
  ]
})
export class  DashboardModule { }
