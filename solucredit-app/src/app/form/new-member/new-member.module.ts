import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NewMemberComponent } from './new-member.component';

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Registrar un Nuevo Socio",
      urls: [
        { title: "Registrar Socio", url: "/new-member" },
        { title: "Información" },
      ],
    },
    component: NewMemberComponent,
  },
  {
    path: "cliente/:id",
    data: {
      title: "Registrar un Nuevo Socio",
      urls: [
        { title: "Listado de Clientes", url: "/list-customer" },
        { title: "Cliente", url: "/list-customer" },
        { title: "Información de cliente" },
      ],
    },
    component: NewMemberComponent,
  },
];



@NgModule({
  
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgbModule,
  ],
  declarations: [],
})
export class DashboardModule { }
