import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotifierModule } from 'angular-notifier';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DocWarrantyComponent } from './doc-warranty.component';

const routes: Routes = [

  {
    path: "",
    data: {
      title: "Tipos de documentos",
      urls: [{ title: "Creación de documentos", url: '/forma-tipo-documento' },
      ]
    },
    component: DocWarrantyComponent
  }
]



@NgModule({
  declarations: [],
  imports: [
    NgxSpinnerModule,
    PipesModule,
    NotifierModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class DocWarrantyModule { }
