import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { ComponentsRoutes } from './component.routing';
import { NgbdpregressbarBasicComponent } from './progressbar/progressbar.component';
import { NgbdpaginationBasicComponent } from './pagination/pagination.component';
import { NgbdAccordionBasicComponent } from './accordion/accordion.component';
import { NgbdAlertBasicComponent } from './alert/alert.component';
import { NgbdCarouselBasicComponent } from './carousel/carousel.component';
import { NgbdDatepickerBasicComponent } from './datepicker/datepicker.component';
import { NgbdDropdownBasicComponent } from './dropdown-collapse/dropdown-collapse.component';
import { NgbdModalBasicComponent } from './modal/modal.component';
import { NgbdPopTooltipComponent } from './popover-tooltip/popover-tooltip.component';
import { NgbdratingBasicComponent } from './rating/rating.component';
import { NgbdtabsBasicComponent } from './tabs/tabs.component';
import { NgbdtimepickerBasicComponent } from './timepicker/timepicker.component';
import { NgbdtypeheadBasicComponent } from './typehead/typehead.component';
import { NgbdDatepickerLanguageComponent } from './language-datepicker/language-datepicker.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { CardsComponent } from './card/card.component';
import { NotifierComponent } from './notifier/notifier.component';
import { ToastComponent } from './toast/toast.component';
import { ToastsContainer } from './toast/toast-container';
import { TablesModule } from './table/tables.module';
import { FlagComponent } from './flag/flag.component';
import { DirectiveComponent } from './fdt/directive/directive.component';
import { CommingsoonComponent } from './fdt/commingsoon/commingsoon.component';
import { AnalysisTabComponent } from './analysis/analysis-tab/analysis-tab.component';
import { ComplianceVerificationTabComponent } from './analysis/compliance-verification-tab/compliance-verification-tab.component';
import { CustomerRegistrationTabComponent } from './analysis/customer-registration-tab/customer-registration-tab.component';
import { GerencialManagerAuthorizationTabComponent } from './analysis/gerencial-manager-authorization-tab/gerencial-manager-authorization-tab.component';
import { OperationsAreaReportTabComponent } from './analysis/operations-area-report-tab/operations-area-report-tab.component';
import { AnalysisAreaTransferComponent } from './analysis/analysis-area-transfer/analysis-area-transfer.component';
import { FinancialAnalysisComponent } from './analysis/financial-analysis/financial-analysis.component';
import { CouncilApprovalComponent } from './analysis/council-approval/council-approval.component';
import { FormalizationComponent } from './analysis/formalization/formalization.component';
import { OperationsAreaReportComponent } from './analysis/operations-area-report-tab/operations-area-report/operations-area-report.component';
import { FinancialAnalysisReportComponent } from './analysis/financial-analysis/financial-analysis-report/financial-analysis-report.component';
import { FormalizationReportComponent } from './analysis/formalization/formalization-report/formalization-report.component';
import { AsteriskrequiredComponent } from './asteriskrequired/asteriskrequired.component';
import { CustominputComponent } from './custominput/custominput.component';
import { CustomoptionComponent } from './customoption/customoption.component';
import { DocumentmodalComponent } from './modals/documentmodal/documentmodal.component';
import { RequiredInputMessageComponent } from './required-input-message/required-input-message.component';
import { StepperComponent } from './stepper/stepper.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NotifierModule,
    TablesModule
  ],
  exports: [
    TablesModule,
    
  ],
  declarations: [
    NgbdpregressbarBasicComponent,
    NgbdpaginationBasicComponent,
    NgbdAccordionBasicComponent,
    NgbdAlertBasicComponent,
    NgbdCarouselBasicComponent,
    NgbdDatepickerBasicComponent,
    NgbdDropdownBasicComponent,
    NgbdModalBasicComponent,
    NgbdPopTooltipComponent,
    NgbdratingBasicComponent,
    NgbdtabsBasicComponent,
    NgbdtimepickerBasicComponent,
    NgbdtypeheadBasicComponent,
    ButtonsComponent,
    CardsComponent,
    ToastComponent,
    ToastsContainer,
    NotifierComponent,
    NgbdDatepickerLanguageComponent,
   // WarningButtonBadgeComponent,
   // StateButtonBadgeComponent,

    // RequiredInputMessageComponent,
    // DocumentmodalComponent,

 
    // DeeddocumentComponent,
    //FinancialAnalysisReportComponent,
    // OperationsAreaReportTabComponent,
    // AnalysisAreaTransferComponent,
    // FinancialAnalysisComponent,
    // CouncilApprovalComponent,
    // FormalizationComponent,
  
   
    
   // LegalAnalysisTabComponent,
   
    //AnalysisTabComponent,
   // AccessDeniedPageComponent,
   // DirectiveComponent,
   // FlagComponent,
    
  ]
})
export class ComponentsModule {}
