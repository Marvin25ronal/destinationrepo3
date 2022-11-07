import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CouncilmembersComponent } from './councilmembers.component'
import { NgxSpinnerModule } from 'ngx-spinner';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { NotifierModule } from 'angular-notifier';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';
const routes: Routes = [
  {
    path: "",
    data: {
      title: "Miembros del Consejo",
      urls: [{ title: "Miembros del Consejo", url: '/council-members' },
      ]
    },
    component: CouncilmembersComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    NgxSpinnerModule,
    PipesModule,
    NotifierModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CouncilmembersModule { }
