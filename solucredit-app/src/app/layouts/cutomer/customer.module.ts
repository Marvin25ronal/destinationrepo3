import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CutomerComponent } from './cutomer.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { NgxSpinnerModule } from "ngx-spinner";
import { QuillModule } from "ngx-quill";
import { PipesModule } from 'src/app/pipes/pipes.module';
const routes: Routes = [
  {
    path: "",
    data: {
      title: "Información de Cliente",
      urls: [
        { title: "Cliente", url: "/customer" },
        { title: "Detalle de Cliente" },
      ],
    },
    component: CutomerComponent,
  },
  {
    path: "cliente/:id",
    data: {
      title: "Información de Cliente",
      urls: [
        { title: "Clientes", url: "/list-customer" },
        { title: "Detalle de Cliente" },
      ],
    },
    component: CutomerComponent,
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
    QuillModule.forRoot(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [],
})
export class DashboardModule {}
