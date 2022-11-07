import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotifierModule } from 'angular-notifier';
import { PipesModule } from '../../pipes/pipes.module'
import { NgxSpinnerModule } from "ngx-spinner";
import { SupliersComponent } from './supliers.component';
import { SharedModule } from '../../shared/shared.module'

const routes: Routes = [

  {
    path: '',
    data: {
      title: 'Proveedores',
      urls: [
        { title: '', url: '/usuarios' },
        { title: '' }
      ]
    },
    component: SupliersComponent
  }
];


@NgModule({
  declarations: [],
  imports: [
    NgxSpinnerModule, PipesModule, NotifierModule, FormsModule, ReactiveFormsModule, NgbModule, SharedModule, CommonModule, RouterModule.forChild(routes)
  ]
})
export class SupliersModule { }
