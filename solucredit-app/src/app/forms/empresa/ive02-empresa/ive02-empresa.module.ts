import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ive02EmpresaComponent } from './ive02-empresa.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'IVE 02',
      urls: [
        { title: 'IVE 02', url: '/ive02-empresa' },
        { title: 'Formulario' },
      ],
    },
    component: Ive02EmpresaComponent,
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
  declarations: [Ive02EmpresaComponent],
})
export class Ive02EmpresaModule { }
