import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitudIndividualComponent } from './solicitud-individual.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from "ngx-spinner";


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Solicitud Individual',
      urls: [
        { title: 'Clientes', url: '/list-customer' },
        { title: 'clientes' },
      ],
    },
    component: SolicitudIndividualComponent,
  },
  {
    path: 'cliente/:idsolicitud',
    data: {
      title: 'cliente',
      urls: [
        { title: 'Mi perfil', url: '/my-profile' },
        { title: 'Mi Perfil' },
      ],
    },
    component: SolicitudIndividualComponent,
  }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    RouterModule.forChild(routes),
    NgbModule,
  ],
  declarations: [SolicitudIndividualComponent],
})
export class SolicitudIndividualModule { }
