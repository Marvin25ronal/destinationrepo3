import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SolicitudEmpresaComponent } from './solicitud-empresa.component';
import { NgxSpinnerModule } from "ngx-spinner";
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Solicitud para empresa',
      urls: [
        { title: 'Clientes', url: '/list-customer' },
        { title: 'clientes' },
      ],
    },
    component: SolicitudEmpresaComponent,
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
    component: SolicitudEmpresaComponent,
  }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgbModule,
    NgxSpinnerModule
  ],
  declarations: [SolicitudEmpresaComponent],
})
export class SolicitudEmpresaModule { }
