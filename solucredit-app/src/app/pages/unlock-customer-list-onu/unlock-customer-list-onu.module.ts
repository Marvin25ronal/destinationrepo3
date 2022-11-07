import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { UnlockCustomerListOnuComponent } from "./unlock-customer-list-onu.component";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { NgxSpinnerModule } from "ngx-spinner";
import { QuillModule } from "ngx-quill";
const routes: Routes = [
  {
    path: "",
    data: {
      title: "Verificación de clientes",
      urls: [
        { title: "Tablero", url: "/dashboard" },
        { title: "Clientes en lista ONU" },
      ],
    },
    component: UnlockCustomerListOnuComponent,
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
  declarations: [UnlockCustomerListOnuComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardModule {}
