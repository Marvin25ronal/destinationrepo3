import { DebreportComponent} from './debreport.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { NgxSpinnerModule } from "ngx-spinner";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NotifierModule } from 'angular-notifier';
import { PipesModule } from '../../pipes/pipes.module'

import { SharedModule } from '../../shared/shared.module'

const routes: Routes = [

  {
    path: '',
    data: {
      title: 'Reporte de deudores',
      urls: [
        { title: 'Reporte de deudores', url: '/deudores-reporte' },
        { title: 'Reporte de deudores' }
      ]
    },
    component: DebreportComponent
  }
];


@NgModule({
  imports: [FormsModule, CommonModule, NgbModule, NgxSpinnerModule, NotifierModule, PipesModule, SharedModule, RouterModule.forChild(routes)],
  declarations: [DebreportComponent],
})
export class DebReportModule { }
