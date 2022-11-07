import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfilEmpresaComponent } from './perfil-empresa.component';
import { NgxSpinnerModule } from "ngx-spinner";
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Perfil',
      urls: [
        { title: 'Clientes', url: '/list-customer' },
        { title: 'clientes' },
      ],
    },
    component: PerfilEmpresaComponent,
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
    component: PerfilEmpresaComponent,
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
  declarations: [PerfilEmpresaComponent],
})
export class PerfilEmpresaModule { }
