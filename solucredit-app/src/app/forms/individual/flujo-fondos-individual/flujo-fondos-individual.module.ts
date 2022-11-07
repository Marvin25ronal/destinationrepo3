import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlujoFondosIndividualComponent } from './flujo-fondos-individual.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Flujo de fondos',
      urls: [
        { title: 'Flujo de fondos', url: '/flujo-fondos-individual' },
        { title: 'Formulario' },
      ],
    },
    component: FlujoFondosIndividualComponent,
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
  declarations: [FlujoFondosIndividualComponent],
})
export class FlujoFondosIndividualModule { }
