import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { EditViewPersonComponent } from './edit-view-person.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { NgxSpinnerModule } from "ngx-spinner";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Información de Representante",
      urls: [
        { title: "Representante", url: "/new-person" },
        { title: "Información" },
      ],
    },
    component: EditViewPersonComponent,
  },
  {
    path: "cliente/:id_cliente",
    data: {
      title: "Información de Representante",
      urls: [
        { title: "Listado de Clientes", url: "/list-customer" },
        { title: "Cliente", url: "/new-person" },
        { title: "Detalle del Representante" },
      ],
    },
    component: EditViewPersonComponent,
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
  declarations: [EditViewPersonComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardModule {}
