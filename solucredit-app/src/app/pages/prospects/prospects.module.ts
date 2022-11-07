import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { ProspectsComponent } from "./prospects.component";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { NgxSpinnerModule } from "ngx-spinner";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Información general",
      urls: [{ title: "Prospectos", url: "" }],
    },
    component: ProspectsComponent,
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
  declarations: [ProspectsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProspectModule {}
