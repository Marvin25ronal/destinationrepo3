import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AlertsLogComponent  } from './alerts-log.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Bitacora de alertas',
      urls: [
        { title: 'Bitacora de alertas', url: '/bitacora-alertas' },
        { title: 'Biracora de alertas' },
      ],
    },
    component: AlertsLogComponent ,
  },
];



@NgModule({
  declarations: [AlertsLogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgbModule,
  ]
})

export class AlertsLogModule { }
