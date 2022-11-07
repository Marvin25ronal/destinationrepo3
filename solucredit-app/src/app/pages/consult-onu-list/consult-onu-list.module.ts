import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { ConsultOnuListComponent } from "./consult-onu-list.component";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { NgxSpinnerModule } from "ngx-spinner";
import { QuillModule } from "ngx-quill";
const routes: Routes = [
  {
    path: "",
    data: {
      title: "Consulta de listados de la ONU",
      urls: [
        { title: "Tablero", url: "/dashboard" },
        { title: "Consulta listas ONU" },
      ],
    },
    component: ConsultOnuListComponent,
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
    QuillModule.forRoot(),
  ],
  declarations: [ConsultOnuListComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardModule {}
