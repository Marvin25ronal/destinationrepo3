import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AutorizacionConsultaIndividualComponent } from './autorizacion-consulta-individual.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Autorizaciones para consultas',
      urls: [
        { title: 'Autorizaciones para consultas', url: '/autorizacion-consulta-individual' },
        { title: 'Formulario' },
      ],
    },
    component: AutorizacionConsultaIndividualComponent,
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
  declarations: [AutorizacionConsultaIndividualComponent],
})
export class AutorizacionConsultaIndividualModule { }
