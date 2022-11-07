import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import { AuthorizationService } from './authorization.service';

import {LogsService} from './service.index';



@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [
    AuthorizationService,
    LogsService,
    

  ]
})
export class ServiceModule {
}