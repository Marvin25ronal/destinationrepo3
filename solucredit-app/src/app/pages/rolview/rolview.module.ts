import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolviewComponent } from './rolview.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotifierModule } from 'angular-notifier';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxSpinnerModule } from 'ngx-spinner';

import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SpinnerComponent } from '../rol/spinner/spinner.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

const routes: Routes = [

  {
    path: '',
    data: {
      title: 'Roles',
      urls: [
        { title: 'Roles', url: '/rolview' },
        { title: 'Listado de Roles' }

      ]
    },
    component: RolviewComponent
  }
];

@NgModule({
  declarations: [RolviewComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    NotifierModule,
    NgxSpinnerModule,
    SharedModule,
    ReactiveFormsModule,
    PipesModule,
    NgMultiSelectDropDownModule,
    RouterModule.forChild(routes),
    NzTabsModule,
  ]
})
export class RolviewModule { }
