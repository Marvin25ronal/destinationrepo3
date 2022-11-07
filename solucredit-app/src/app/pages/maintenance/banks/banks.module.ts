import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BanksComponent } from './banks.component'
import { NgxSpinnerModule } from 'ngx-spinner';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { NotifierModule } from 'angular-notifier';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';
const routes: Routes = [
  {
    path: "",
    data: {
      title: "Información de Bancos",
      urls: [{ title: "Creación de Bancos", url: '/banks' },
      ]
    },
    component: BanksComponent
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
export class BanksModule { }
