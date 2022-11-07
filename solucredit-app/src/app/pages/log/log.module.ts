import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { LogComponent } from './log.component';
//import { ComponentsModule } from '../../component/component.module';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { UserModule } from '../user/user.module'
import { NotifierModule } from 'angular-notifier';
import { PipesModule } from '../../pipes/pipes.module'
import { SharedModule } from '../../shared/shared.module'
const routes: Routes = [

  {
    path: '',
    data: {
      title: 'Bitácora',
      urls: [
        { title: 'Bitácora', url: '/logs' },
        { title: 'Bitácora' }
      ]
    },
    component: LogComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule, NgbModule, NgxSpinnerModule, NotifierModule, PipesModule, SharedModule ,RouterModule.forChild(routes)],
  declarations: [LogComponent]
})
export class LogModule { }
