import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { NgxSpinnerModule } from "ngx-spinner";
import { PipesModule } from '../../pipes/pipes.module'
import { NgxCurrencyModule } from "ngx-currency";
import { SharedModule } from '../../shared/shared.module'
import {AllFormComponent} from './all-form.component'
const routes: Routes = [
  {
    path: "",
    data: {
      title: "Información general",
      urls: [
        { title: "", url: "" },
      ],
    },
    component: AllFormComponent,
  },
];



@NgModule({
  
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgbModule,
    PipesModule,
    NgxSpinnerModule,
    NgxCurrencyModule,
    SharedModule
  ],
  declarations: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AllFormModule { }
