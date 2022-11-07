import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EndeudamientoBancarioIndividualComponent } from './endeudamiento-bancario-individual.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Endeudamiento bancario',
      urls: [
        { title: 'Endeudamiento bancario', url: 'endeudamiento-bancario-individual' },
        { title: 'Formulario' },
      ],
    },
    component: EndeudamientoBancarioIndividualComponent,
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
  declarations: [EndeudamientoBancarioIndividualComponent],
})
export class EndeudamientoBancarioIndividualModule { }
