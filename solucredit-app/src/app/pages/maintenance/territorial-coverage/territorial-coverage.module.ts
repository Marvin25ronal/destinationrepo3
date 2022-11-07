import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TerritorialCoverageComponent } from './territorial-coverage.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotifierModule } from 'angular-notifier';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';
const routes: Routes = [

  {
    path: "",
    data: {
      title: "Tipos de cobertura",
      urls: [{ title: "Creación de cobertura", url: '/forma-cobertura' },
      ]
    },
    component: TerritorialCoverageComponent
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
export class TerritorialCoverageModule { }
