import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IveProductosIndividualComponent } from './ive-productos-individual.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'IVE Productos',
      urls: [
        { title: 'IVE Productos', url: '/ive-productos-individual' },
        { title: 'Formulario' },
      ],
    },
    component: IveProductosIndividualComponent,
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
  declarations: [IveProductosIndividualComponent],
})
export class IveProductosIndividualModule { }
