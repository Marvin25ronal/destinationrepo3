import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { EditCustomerComponent  } from './edit-customer.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { NgxSpinnerModule } from "ngx-spinner";
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxCurrencyModule } from 'ngx-currency';

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Editar Datos",
      urls: [
        { title: "Editar Datos", url: "/edit-customer" },
        { title: "Información" },
      ],
    },
    component: EditCustomerComponent,
  },
  {
    path: ":id",
    data: {
      title: "Editar Datos del cliente....",
      urls: [
        { title: "Ficha cliente", url: "/customer/cliente/"},
        { title: "Información" },
      ],
    },
    component: EditCustomerComponent,
  },
  
  {
    path: "cliente/:id",
    data: {
      title: "Información de Cliente",
      urls: [
        { title: "Clientes", url: "/list-customer" },
        { title: "Información de cliente" },
      ],
    },
    component: EditCustomerComponent,
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
    SharedModule,
    NgxCurrencyModule,
  ],
  declarations: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardModule {}
