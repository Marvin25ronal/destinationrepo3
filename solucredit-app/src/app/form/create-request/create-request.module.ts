import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { CreateRequestComponent } from "./create-request.component";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { NgxSpinnerModule } from "ngx-spinner";

const routes: Routes = [
  {
    path: "cliente/:id",
    data: {
      title: "Crear una nueva solicitud",
      urls: [
        { title: "Listado de Clientes", url: "/list-customer" },
        { title: "Datos de cliente" },
      ],
    },
    component: CreateRequestComponent,
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
  declarations: [CreateRequestComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardModule {}
