import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PepIndividualComponent } from './pep-individual.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'PEP',
      urls: [
        { title: 'PEP', url: '/pep-individual' },
        { title: 'Formulario' },
      ],
    },
    component: PepIndividualComponent,
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
  declarations: [PepIndividualComponent],
})
export class PepIndividualModule { }
