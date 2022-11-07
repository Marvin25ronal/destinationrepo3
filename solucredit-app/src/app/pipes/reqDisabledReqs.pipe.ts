import { Pipe, PipeTransform } from '@angular/core';
import { ReqRequirementDetail } from '../models/fomMetadata.model';
@Pipe({
    name: 'req_disable_reqs'
})
export class RequestDisableReqsPipe implements PipeTransform {
    public transform(forms: ReqRequirementDetail[]): ReqRequirementDetail[] {
        return forms.filter(f => f.enabled == 1)

    }
}