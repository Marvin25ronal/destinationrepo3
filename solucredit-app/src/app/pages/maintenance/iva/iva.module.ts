import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IvaComponent } from './iva.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotifierModule } from 'angular-notifier';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';


const routes: Routes = [

  {
    path: "",
    data: {
      title: "IVA",
      urls: [{ title: "Mantenimiento IVA", url: '/iva' },
      ]
    },
    component: IvaComponent
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
export class IvaModule { }
