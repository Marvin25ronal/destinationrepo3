import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { ChartsModule } from "ng2-charts";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ChartistModule } from "ng-chartist";
import { DashboardComponent } from "./dashboard.component";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";

import { IncomeCounterComponent } from "./dashboard-components/income-counter/income-counter.component";
import { ProjectCounterComponent } from "./dashboard-components/project-counter/project-counter.component";
import { ProjectComponent } from "./dashboard-components/project/project.component";
import { RecentcommentComponent } from "./dashboard-components/recent-comment/recent-comment.component";
import { RecentmessageComponent } from "./dashboard-components/recent-message/recent-message.component";
import { SocialSliderComponent } from "./dashboard-components/social-slider/social-slider.component";
import { TodoComponent } from "./dashboard-components/to-do/todo.component";
import { ProfileComponent } from "./dashboard-components/profile/profile.component";
import { PageAnalyzerComponent } from "./dashboard-components/page-analyzer/pa.component";
import { WidgetComponent } from "./dashboard-components/widget/widget.component";
import { CustomerSupportComponent } from "./dashboard-components/customer-support/cs.component";
import { TotalEarningComponent } from "./dashboard-components/total-earnings/te.component";
import { FeedsComponent } from "./dashboard-components/feeds/feeds.component";

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Tablero',
      urls: [
        { title: 'Tablero', url: '/dashboard' },
        { title: 'Informe Gerencial' }
      ]
    },
    component: DashboardComponent
  }
];

@NgModule({
  imports: [
    PerfectScrollbarModule,
    NgbModule,
    ChartsModule,
    ChartistModule,
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    DashboardComponent,
    IncomeCounterComponent,
    ProjectCounterComponent,
    ProjectComponent,
    RecentcommentComponent,
    RecentmessageComponent,
    SocialSliderComponent,
    TodoComponent,
    ProfileComponent,
    PageAnalyzerComponent,
    WidgetComponent,
    CustomerSupportComponent,
    TotalEarningComponent,
    FeedsComponent,
  ],
})
export class DashboardModule {}
