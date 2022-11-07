import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EstadoPatrimonialIndividualComponent } from './estado-patrimonial-individual.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Estado patrimonial',
      urls: [
        { title: 'Estado patrimonial', url: '/estado-patrimonial-individual' },
        { title: 'Formulario' },
      ],
    },
    component: EstadoPatrimonialIndividualComponent,
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
  declarations: [EstadoPatrimonialIndividualComponent],
})
export class EstadoPatrimonialIndividualModule { }
