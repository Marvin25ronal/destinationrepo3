import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AlertsCrudComponent  } from './alerts-crud.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Creación de alertas',
      urls: [
        { title: 'Creación de alertas', url: '/creacion-alertas' },
        { title: 'Creación de alertas' },
      ],
    },
    component: AlertsCrudComponent ,
  },
];



@NgModule({
  declarations: [AlertsCrudComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgbModule,
  ],
})

export class AlertsCrudModule { }
