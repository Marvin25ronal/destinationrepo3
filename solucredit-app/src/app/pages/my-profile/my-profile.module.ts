import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MyProfileComponent  } from './my-profile.component';
import { NgbModule,  NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { PipesModule} from '../../pipes/pipes.module'
import { NotifierModule } from 'angular-notifier';
import { SharedModule } from '../../shared/shared.module'
import { NgxCurrencyModule } from 'ngx-currency';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Mi perfil',
      urls: [
        { title: 'Mi perfil', url: '/my-profile' },
      ],
    },
    component: MyProfileComponent ,
  },
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgbModule,
    NgxSpinnerModule,
    PipesModule,
    FormsModule,
    SharedModule,
    NotifierModule,
    NgxCurrencyModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MyProfileModule { }
