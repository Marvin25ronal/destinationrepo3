import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormatoIntegracionesIndividualComponent } from './formato-integraciones-individual.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Formato para integraciones',
      urls: [
        { title: 'Perfil Individual', url: '/formato-integraciones-individual' },
        { title: 'Formulario' },
      ],
    },
    component: FormatoIntegracionesIndividualComponent,
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
  declarations: [FormatoIntegracionesIndividualComponent],
})
export class FormatoIntegracionesIndividualModule { }
