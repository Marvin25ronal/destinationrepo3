import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyComponent } from './currency.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotifierModule } from 'angular-notifier';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PipesModule } from '../../../pipes/pipes.module';
import { SharedModule } from '../../../shared/shared.module';

const routes: Routes = [

  {
    path: "",
    data: {
      title: "Tipos de Moneda",
      urls: [{ title: "Creación de Moneda", url: '/forma-moneda' },
      ]
    },
    component: CurrencyComponent
  }
]

@NgModule({
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

export class CurrencyModule { }
