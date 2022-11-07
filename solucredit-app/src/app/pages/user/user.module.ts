import { NgModule } from '@angular/core';

import { CommonModule,DatePipe } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { UserService } from './servicio/user.service';
import { UserComponent } from './user.component';
import { SpinnerComponent } from './spinner/spinner.component';
import {MultiselectComponent} from './multiselect/multiselect.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NotifierModule} from 'angular-notifier';
import { PipesModule } from '../../pipes/pipes.module'
import { NgxSpinnerModule } from "ngx-spinner";
import { SharedModule } from '../../shared/shared.module'
const routes: Routes = [
  
  {
    path: '',
    data: {
      title: 'Usuarios',
      urls: [
        { title: 'Usuarios', url: '/usuarios' },
        { title: 'Lista de usuarios' }
      ]
    },
    component: UserComponent
  }
];

@NgModule({
  declarations: [UserComponent,MultiselectComponent,SpinnerComponent],
  imports: [NgxSpinnerModule, PipesModule, NotifierModule, FormsModule, ReactiveFormsModule, NgMultiSelectDropDownModule, NgbModule, SharedModule ,CommonModule, RouterModule.forChild(routes)],
  exports: [NgMultiSelectDropDownModule,PipesModule],
  providers: [
    UserService,
    DatePipe,

  ]


})
export class UserModule { }
