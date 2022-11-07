import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FeicEmpresaComponent } from './feic-empresa.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'FEIC para empresa',
      urls: [
        { title: 'Feic', url: '/feic-empresa' },
        { title: 'Formulario' },
      ],
    },
    component: FeicEmpresaComponent,
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
  declarations: [FeicEmpresaComponent]
})
export class FeicEmpresaModule { }
 