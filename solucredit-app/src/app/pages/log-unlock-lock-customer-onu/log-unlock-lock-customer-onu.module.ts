import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { LogUnlockLockCustomerOnuComponent } from "./log-unlock-lock-customer-onu.component";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { NgxSpinnerModule } from "ngx-spinner";
import { QuillModule } from "ngx-quill";
const routes: Routes = [
  {
    path: "",
    data: {
      title: "Bitácora de desbloqueo de clientes en lista",
      urls: [
        { title: "Tablero", url: "/dashboard" },
        { title: "Desbloqueo de clientes en lista ONU" },
      ],
    },
    component: LogUnlockLockCustomerOnuComponent,
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
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [LogUnlockLockCustomerOnuComponent],
})
export class LogUnlockLockCustomerOnu{}
