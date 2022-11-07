import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CommonModule, DatePipe, registerLocaleData
} from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { TreeModule } from '@circlon/angular-tree-component'
//INTERCEPTORES
import * as interceptores from './interceptors';
//
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { AuthComponent } from './auth/auth.component';

import { NavigationComponent } from './shared/header-navigation/navigation.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';

import { routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './shared/spinner.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ToastrModule } from 'ngx-toastr';
//import { NewCustomerComponent } from './form/new-customer/new-customer.component';

import { AuthModule } from '@auth0/auth0-angular';
import { environment } from '../environments/environment';

import { ServiceModule } from './services/service.module';
import { NgxSpinnerModule } from "ngx-spinner";
import { AuthorizationGuard } from './authorization.guard';
import { ChartsModule } from "ng2-charts";
import { DebtorsComponent } from './pages/debtors/debtors.component';
//import { NewMemberComponent } from './form/new-member/new-member.component';
import { NgxCurrencyModule } from "ngx-currency";
import localEsGt from '@angular/common/locales/es-GT'
import { IconsModule } from './component/icons/icons.module';
import { DisbursementComponent } from './pages/maintenance/disbursement/disbursement.component';
import { WarrantyTypeComponent } from './pages/maintenance/warranty-type/warranty-type.component';
import { RequestTypeComponent } from './pages/maintenance/request-type/request-type.component';
import { TerritorialCoverageComponent } from './pages/maintenance/territorial-coverage/territorial-coverage.component';
import { DocWarrantyComponent } from './pages/maintenance/doc-warranty/doc-warranty.component';
import { RequirementsComponent } from './pages/maintenance/requirements/requirements.component';
import { EndorsementComponent } from './pages/maintenance/endorsement/endorsement.component';
import { BanksComponent } from './pages/maintenance/banks/banks.component';





//import { RequestReportComponent } from './pages/request-report/request-report.component';
//import { AlertsCrudComponent } from './pages/alerts/alerts-crud/alerts-crud.component';
//import { AlertsLogComponent } from './pages/alerts/alerts-log/alerts-log.component';
import { CurrencyComponent } from './pages/maintenance/currency/currency.component';
import { IsrComponent } from './pages/maintenance/isr/isr.component';
import { InspectionPlaceComponent } from './pages/maintenance/inspection-place/inspection-place.component';
import { ProductTypeComponent } from './pages/maintenance/product-type/product-type.component';
import { ProductComponent } from './pages/maintenance/product/product.component';
import { BranchofficeComponent } from './pages/maintenance/branchoffice/branchoffice.component';
import { AccountTypesComponent } from './pages/maintenance/account-types/account-types.component';
import { PaymentMethodComponent } from './pages/maintenance/payment-method/payment-method.component';
import { QuotaTypeComponent } from './pages/maintenance/quota-type/quota-type.component';
import { AdviserTypeComponent } from './pages/maintenance/adviser-type/adviser-type.component';
import { RuleTypeComponent } from './pages/maintenance/rule-type/rule-type.component';
import { RulesComponent } from './pages/maintenance/rules/rules.component';
import { RateTypeComponent } from './pages/maintenance/rate-type/rate-type.component';
import { RateComponent } from './pages/maintenance/rate/rate.component';
import { AdviserComponent } from './pages/maintenance/adviser/adviser.component';
import { FileIconsModule } from 'ngx-file-icons'
import { FileManagerComponent } from './pages/file-manager/file-manager/file-manager.component';
import { AnalysisReportComponent } from './pages/analysis-report/analysis-report.component';
import { AnalysisLegalListComponent } from './pages/analysis/analysis-legal-list/analysis-legal-list.component';
import { LegalAnalysisComponent } from './pages/analysis/legal-analysis/legal-analysis.component';
//import { ComplianceVerificationComponent } from './pages/analysis/compliance-verification/compliance-verification.component';
import { ComplianceVerificationListComponent } from './pages/analysis/compliance-verification-list/compliance-verification-list.component';
import { ComplianceVerificationComponent } from './pages/analysis/compliance-verification/compliance-verification.component';
import { FlagComponent } from './component/flag/flag.component';
import { CustomerComplianceComponent } from './pages/customer-compliance/customer-compliance.component';
import { PipesModule } from './pipes/pipes.module';
import { FiscalPeriodComponent } from './pages/maintenance/fiscal-period/fiscal-period.component';
import { CouncilmembersComponent } from './pages/maintenance/councilmembers/councilmembers.component';
import { ConditionSheetComponent } from './pages/condition-sheet/condition-sheet.component';
import { ManagementActComponent } from './pages/management-act/management-act.component';
import { ConditionSheetChecklistComponent } from './pages/condition-sheet-checklist/condition-sheet-checklist.component';
import { OperationsManagerAuthorizationReportComponent } from './pages/operations-manager-authorization-report/operations-manager-authorization-report.component';
import { GerencialManagerAuthorizationComponent } from './pages/gerencial-manager-authorization/gerencial-manager-authorization.component';
import { DirectiveComponent } from './component/fdt/directive/directive.component';
import { AccessDeniedPageComponent } from './component/fdt/access-denied-page/access-denied-page.component';
import { QuillModule } from 'ngx-quill';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzAlertModule } from 'ng-zorro-antd/alert'

import { CommingsoonComponent } from './component/fdt/commingsoon/commingsoon.component';
import { AnalysisTabComponent } from './component/analysis/analysis-tab/analysis-tab.component';
import { LegalAnalysisTabComponent } from './component/analysis/legal-analysis-tab/legal-analysis-tab.component';
import { ComplianceVerificationTabComponent } from './component/analysis/compliance-verification-tab/compliance-verification-tab.component';
import { CommercialManagerAuthorizationTabComponent } from './component/analysis/commercial-manager-authorization-tab/commercial-manager-authorization-tab.component';
import { CustomerRegistrationTabComponent } from './component/analysis/customer-registration-tab/customer-registration-tab.component';
import { GerencialManagerAuthorizationTabComponent } from './component/analysis/gerencial-manager-authorization-tab/gerencial-manager-authorization-tab.component';
import { CommercialAssistantAnalysisTabComponent } from './component/analysis/commercial-assistant-analysis-tab/commercial-assistant-analysis-tab.component';
import { AnalysisAreaTransferComponent } from './component/analysis/analysis-area-transfer/analysis-area-transfer.component';
import { CouncilApprovalComponent } from './component/analysis/council-approval/council-approval.component';
import { FinancialAnalysisComponent } from './component/analysis/financial-analysis/financial-analysis.component';
import { FinancialAnalysisReportComponent } from './component/analysis/financial-analysis/financial-analysis-report/financial-analysis-report.component';
import { FormalizationComponent } from './component/analysis/formalization/formalization.component';
import { OperationsAreaReportTabComponent } from './component/analysis/operations-area-report-tab/operations-area-report-tab.component';
import { LinkmaintenanceComponent } from './pages/maintenance/linkmaintenance/linkmaintenance.component';
import { IvaComponent } from './pages/maintenance/iva/iva.component';
import { OperationsAreaReportComponent } from './component/analysis/operations-area-report-tab/operations-area-report/operations-area-report.component';
import { CouncilApprovalTabComponent } from './component/analysis/council-approval-tab/council-approval-tab.component';
import { CouncilApprovalReportComponent } from './component/analysis/council-approval-tab/council-approval-report/council-approval-report.component';
import { FormalizationReportComponent } from './component/analysis/formalization/formalization-report/formalization-report.component';
import { DeeddocumentComponent } from './component/analysis/commercial-manager-authorization-tab/deeddocument/deeddocument.component';
import { AsteriskrequiredComponent } from './component/asteriskrequired/asteriskrequired.component';
import { CustominputComponent } from './component/custominput/custominput.component';
import { CustomoptionComponent } from './component/customoption/customoption.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer'
import { DocumentmodalComponent } from './component/modals/documentmodal/documentmodal.component';
import { CutomerComponent } from './layouts/cutomer/cutomer.component';
import { SupliersComponent } from './pages/supliers/supliers.component';
import { UploadDocumentsOfRelationComponent } from './pages/upload-documents-of-relation/upload-documents-of-relation.component';
import { ConfirmationModalComponent } from './pages/upload-documents-of-relation/confirmation-modal/confirmation-modal.component';
import { EditCustomerComponent } from './form/edit-customer/edit-customer.component';
import { NewPersonComponent } from './form/new-person/new-person.component';
import { NewMemberComponent } from './form/new-member/new-member.component';
import { NewUserComponent } from './form/new-user/new-user.component';
import { RequiredInputMessageComponent } from './component/required-input-message/required-input-message.component';
import { AllFormComponent } from './pages/all-form/all-form.component';
import { StepperComponent } from './component/stepper/stepper.component';
//import { StateButtonBadgeComponent } from './component/badges/state-button-badge/state-button-badge.component';
registerLocaleData(localEsGt, 'es-Gt')
const authConfig = {
  domain: environment.domain,
  clientId: environment.clientId,
  redirectUri: environment.redirectUri,
};

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 1,
  wheelPropagation: true,
  minScrollbarLength: 20
};

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    FullComponent,
    BlankComponent,
    AuthComponent,
    NavigationComponent,
    BreadcrumbComponent,
    SidebarComponent,
    //NewCustomerComponent,
    DebtorsComponent,
    DisbursementComponent,
    WarrantyTypeComponent,
    RequestTypeComponent,
    TerritorialCoverageComponent,
    CurrencyComponent,
    IsrComponent,
    DocWarrantyComponent,
    RequirementsComponent,
    EndorsementComponent,
    BanksComponent,
    InspectionPlaceComponent,
    ProductTypeComponent,
    ProductComponent,
    BranchofficeComponent,
    AccountTypesComponent,
    PaymentMethodComponent,
    QuotaTypeComponent,
    AdviserTypeComponent,
    RuleTypeComponent,
    RulesComponent,
    RateTypeComponent,
    RateComponent,
    AdviserComponent,
    FileManagerComponent,
    AnalysisReportComponent,
    AnalysisLegalListComponent,
    ComplianceVerificationListComponent,
    FlagComponent,
    CustomerComplianceComponent,
    CutomerComponent,
    FiscalPeriodComponent,
    CouncilmembersComponent,
    ConditionSheetComponent,
    ManagementActComponent,
    ConditionSheetChecklistComponent,
    OperationsManagerAuthorizationReportComponent,
    GerencialManagerAuthorizationComponent,
    //ComplianceVerificationComponent,
    LegalAnalysisComponent,
    AsteriskrequiredComponent,

    //RequestReportComponent,
    //AlertsCrudComponent,
    //AlertsLogComponent,
    ComplianceVerificationComponent,
    DirectiveComponent,
    AccessDeniedPageComponent,
    CommingsoonComponent,
    MyProfileComponent,
    AnalysisTabComponent,
    LegalAnalysisTabComponent,
    ComplianceVerificationTabComponent,
    CommercialManagerAuthorizationTabComponent,
    CustomerRegistrationTabComponent,
    GerencialManagerAuthorizationTabComponent,
    CommercialAssistantAnalysisTabComponent,
    OperationsAreaReportTabComponent,
    AnalysisAreaTransferComponent,
    FinancialAnalysisComponent,
    CouncilApprovalComponent,
    FormalizationComponent,
    FinancialAnalysisReportComponent,

    LinkmaintenanceComponent,
    OperationsAreaReportComponent,
    CouncilApprovalTabComponent,
    CouncilApprovalReportComponent,
    FormalizationReportComponent,
    DeeddocumentComponent,
    CustominputComponent,
    CustomoptionComponent,

    IvaComponent,
    DocumentmodalComponent,
    SupliersComponent,
    UploadDocumentsOfRelationComponent,
    ConfirmationModalComponent,
    EditCustomerComponent,
    NewPersonComponent,
    NewMemberComponent,
    NewUserComponent,
    RequiredInputMessageComponent,
    AllFormComponent,
    StepperComponent,
    //StateButtonBadgeComponent,
    //RolviewComponent
  ],
  exports: [
    FlagComponent
  ],

  imports: [
    ServiceModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    NgbModule,
    ChartsModule,
    NgxCurrencyModule,
    AuthModule.forRoot({
      domain: authConfig.domain,
      clientId: authConfig.clientId,
    }),
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),


    //RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),

    PerfectScrollbarModule,
    ToastrModule.forRoot(),
    IconsModule,
    TreeModule,
    FileIconsModule,
    PipesModule,
    QuillModule.forRoot(),
    NzTabsModule,
    NzAlertModule,
    NgxExtendedPdfViewerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  providers: [AuthorizationGuard, interceptores.interceptors,
    DatePipe,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    { provide: LOCALE_ID, useValue: 'es_Gt' }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
