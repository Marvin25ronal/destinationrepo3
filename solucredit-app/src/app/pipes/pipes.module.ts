import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupPipe } from './groups.pipe';
import { LogActionPipe } from './logsAction.pipe'

import { ReqReportDocsPipe } from './reqreportdocs.pipe';
import { ReqReportStatusPipe } from './reqreportstatus.pipe';
import { ReqReportTypePipe } from './reqreporttype.pipe'
import { FormMetadataStatusPipe } from './formMetadataStatus.pipe'
import { SupplierLogActionPipe } from './supplierLogAction.pipe';
import { SupplierLogDocPipe } from './supplierLogDoc.pipe';
import { RequestTypePipe } from './reqType.pipe';

import { RequestWarrantyTypePipe } from './reqWarrantyType.pipe';
import { RequestDocTypePipe } from './reqDocType.pipe';

import { RequestSubjectDisableFormsPipe } from './reqSubjectDisabledForms.pipe';
import { RequestSubjectEnableFormsPipe } from './reqSubjectEnableForms.pipe'
import { RequestRequirementTypePipe } from './reqRequirementType.pipe';
import { RequestDisableReqsPipe } from './reqDisabledReqs.pipe';
import { PepMotivacionPipe } from './pepMotivacion.pipe'
import { PepParentescoPipe } from './pepParentesco.pipe';
import { CapitalizePipe } from './capitalize.pipe';
import { NamefilePipe } from './namefile.pipe'
@NgModule({
  declarations: [PepMotivacionPipe, PepParentescoPipe, GroupPipe, LogActionPipe, ReqReportDocsPipe, ReqReportStatusPipe, ReqReportTypePipe, FormMetadataStatusPipe, SupplierLogDocPipe, SupplierLogActionPipe, RequestTypePipe, RequestWarrantyTypePipe, RequestDocTypePipe, RequestSubjectEnableFormsPipe, RequestSubjectDisableFormsPipe, RequestRequirementTypePipe, RequestDisableReqsPipe, CapitalizePipe, NamefilePipe],
  imports: [
    CommonModule
  ],
  exports: [PepMotivacionPipe, PepParentescoPipe, GroupPipe, LogActionPipe, ReqReportDocsPipe, ReqReportStatusPipe, ReqReportTypePipe, FormMetadataStatusPipe, SupplierLogDocPipe, SupplierLogActionPipe, RequestTypePipe, RequestWarrantyTypePipe, RequestDocTypePipe, RequestSubjectEnableFormsPipe, RequestSubjectDisableFormsPipe, RequestRequirementTypePipe, RequestDisableReqsPipe, CapitalizePipe, NamefilePipe]
})
export class PipesModule { }
