import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DebtorsComponent  } from './debtors.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Deudores',
      urls: [
        { title: 'Deudores', url: '/deudores' },
        { title: 'Creacion de deudores' },
      ],
    },
    component: DebtorsComponent ,
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forChild(routes),
  ]
})
export class DebtorsModule { }
