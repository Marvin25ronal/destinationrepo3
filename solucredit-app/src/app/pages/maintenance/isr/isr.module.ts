import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IsrComponent } from './isr.component'
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
      title: "ISR",
      urls: [{ title: "Mantenimiento ISR", url: '/isr' },
      ]
    },
    component: IsrComponent
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
export class IsrModule { }
