import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CpeIndividualComponent } from './cpe-individual.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'CPE',
      urls: [
        { title: 'CPE', url: '/cpe-individual' },
        { title: 'Formulario' },
      ],
    },
    component: CpeIndividualComponent,
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
  declarations: [CpeIndividualComponent],
})
export class CpeIndividualModule { }
