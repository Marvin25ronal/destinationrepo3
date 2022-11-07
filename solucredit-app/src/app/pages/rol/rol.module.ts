import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RolComponent } from './rol.component';
import { Routes, RouterModule } from '@angular/router';
import { MultiselectComponent } from './multiselect/multiselect.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SharedModule } from '../../shared/shared.module'
import { NotifierModule} from 'angular-notifier';
import { SpinnerComponent } from './spinner/spinner.component';
import { PipesModule } from '../../pipes/pipes.module'
import { NgxSpinnerModule } from "ngx-spinner";
import {NzTabsModule} from 'ng-zorro-antd/tabs'
const routes: Routes = [
  
  {
    path: '',
    data: {
      title: 'Roles',
      urls: [
        { title: 'Roles', url: '/rol' },
        { title: 'Listado de Roles'}
        
      ]
    },
    component: RolComponent
  }
];


@NgModule({
  declarations: [RolComponent, MultiselectComponent, SpinnerComponent],
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
export class RolModule { }
