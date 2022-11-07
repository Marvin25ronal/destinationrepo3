import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetpasswordComponent } from './resetpassword.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotifierModule } from 'angular-notifier';
const routes: Routes = [

  {
    path: '',
    data: {
      title: 'Rcupera tu contraseña',
      urls: [
        { title: '', url: '/reset-password' },
        { title: '' }
      ]
    },
    component: ResetpasswordComponent
  }
];
@NgModule({
  declarations: [ResetpasswordComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, NgbModule, NotifierModule, RouterModule.forChild(routes)
  ]
})
export class ResetpasswordModule { }
