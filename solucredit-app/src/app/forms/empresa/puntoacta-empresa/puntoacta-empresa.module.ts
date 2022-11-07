import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PuntoactaEmpresaComponent } from './puntoacta-empresa.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Punto de Acta',
      urls: [
        { title: 'Punto de Acta', url: '/puntoacta-empresa' },
        { title: 'Formulario' },
      ],
    },
    component: PuntoactaEmpresaComponent,
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
  declarations: [PuntoactaEmpresaComponent],
})
export class PuntoactaEmpresaModule { }
