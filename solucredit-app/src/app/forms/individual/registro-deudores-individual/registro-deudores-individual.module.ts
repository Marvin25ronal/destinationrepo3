import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegistroDeudoresIndividualComponent } from './registro-deudores-individual.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Registro de deudores',
      urls: [
        { title: 'Registro de deudores', url: '/registro-deudores-individual' },
        { title: 'Formulario' },
      ],
    },
    component: RegistroDeudoresIndividualComponent,
  },
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgbModule,
  ],
  declarations: [RegistroDeudoresIndividualComponent],
})
export class RegistroDeudoresIndividualModule { }
