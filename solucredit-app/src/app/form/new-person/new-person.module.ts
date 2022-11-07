import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NewPersonComponent } from './new-person.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Registrar un Nuevo Represetante",
      urls: [
        { title: "Registrar Representante", url: "/new-person" },
        { title: "Información" },
      ],
    },
    component: NewPersonComponent,
  },
  {
    path: "cliente/:id",
    data: {
      title: "Registrar un Nuevo Represetante",
      urls: [
        { title: "Listado de Clientes", url: "/list-customer" },
        { title: "Cliente", url: "/list-customer" },
        { title: "Información de cliente" },
      ],
    },
    component: NewPersonComponent,
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
export class DashboardModule {}
