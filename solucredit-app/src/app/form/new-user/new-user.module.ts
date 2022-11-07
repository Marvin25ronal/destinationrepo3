import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NewUserComponent } from './new-user.component';
import { NgModule } from '@angular/core';
import { NgxCurrencyModule } from "ngx-currency";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Crear un nuevo prospecto",
      urls: [
        { title: "Listado de clientes y prospectos", url: "/list-customer" },
        { title: "Crear un nuevo prospecto" },
      ],
    },
    component: NewUserComponent,
  },
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgbModule,
    NgxCurrencyModule
  ],
  declarations: [],
})
export class DashboardModule {}
