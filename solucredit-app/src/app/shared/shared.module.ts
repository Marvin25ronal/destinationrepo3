import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderButtonComponent } from './loader-button/loader-button.component';
import { ReportfiltersComponent } from './reportfilters/reportfilters.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppPasswordDirective } from './app-pasword.directive';
import {AppCostumeDateDirective} from './date.directive'
/* import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; */
@NgModule({
  declarations: [LoaderButtonComponent, ReportfiltersComponent, AppPasswordDirective, AppCostumeDateDirective ],
  exports: [LoaderButtonComponent, ReportfiltersComponent, AppPasswordDirective, AppCostumeDateDirective ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    /* BrowserAnimationsModule, */
    NgbModule
    
    
  ]
})
export class SharedModule { }