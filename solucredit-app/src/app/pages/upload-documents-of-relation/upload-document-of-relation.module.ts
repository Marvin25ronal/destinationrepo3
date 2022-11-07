import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { UploadDocumentsOfRelationComponent } from "./upload-documents-of-relation.component";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { NgxSpinnerModule } from "ngx-spinner";
import { QuillModule } from "ngx-quill";
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
const routes: Routes = [
  {
    path: "",
    data: {
      title: "Documentos de cliente",
      urls: [{ title: "Subir archivos" }],
    },
    component: UploadDocumentsOfRelationComponent,
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
  declarations: [ ],
})
export class DashboardModule {}
