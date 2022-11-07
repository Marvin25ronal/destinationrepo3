import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { RequestReportComponent } from './request-report.component';
//import { ComponentsModule } from '../../component/component.module';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { UserModule } from '../user/user.module'
import { NotifierModule } from 'angular-notifier';
import { PipesModule } from '../../pipes/pipes.module'
import { RequestService } from './servicio/request-report.service'
import { SharedModule } from '../../shared/shared.module'

const routes: Routes = [

    {
        path: '',
        data: {
            title: 'Reporte de solicitudes',
            urls: [
                { title: 'Reporte solicitudes', url: '/solicitudes-reporte' },
                { title: 'Reporte solicitudes' }
            ]
        },
        component: RequestReportComponent
    }
];

@NgModule({
    imports: [FormsModule, CommonModule, NgbModule, NgxSpinnerModule, NotifierModule, PipesModule, SharedModule,RouterModule.forChild(routes)],
    declarations: [RequestReportComponent],
    providers: [RequestService]
})
export class RequestReporteModule { }