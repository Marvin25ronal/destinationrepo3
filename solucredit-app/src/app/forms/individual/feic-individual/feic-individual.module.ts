import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FeicIndividualComponent } from './feic-individual.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'FEIC',
      urls: [
        { title: 'FEIC', url: '/feic-individual' },
        { title: 'Formulario' },
      ],
    },
    component: FeicIndividualComponent,
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
  declarations: [FeicIndividualComponent],
})
export class FeicIndividualModule { }
