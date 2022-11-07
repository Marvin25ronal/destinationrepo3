import { Pipe, PipeTransform } from '@angular/core';
import { ReqSubjectResp, ReqFormResp } from '../models/fomMetadata.model';
@Pipe({
    name: 'req_subject_disable_forms'
})
export class RequestSubjectDisableFormsPipe implements PipeTransform {
    public transform(forms: ReqFormResp[]): ReqFormResp[] {
        return forms.filter(f => f.state == 1)

    }
}

