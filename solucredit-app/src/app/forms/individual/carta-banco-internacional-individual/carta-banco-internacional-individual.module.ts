import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartaBancoInternacionalIndividualComponent } from './carta-banco-internacional-individual.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Carta para el banco internacional',
      urls: [
        { title: 'Carta para el banco internacional', url: '/carta-banco-internacional-individual' },
        { title: 'Formulario' },
      ],
    },
    component: CartaBancoInternacionalIndividualComponent,
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
  declarations: [CartaBancoInternacionalIndividualComponent],
})
export class CartaBancoInternacionalIndividualModule { }
