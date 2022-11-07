import { Pipe, PipeTransform } from '@angular/core';
import { ReqSubjectResp } from '../models/fomMetadata.model';
@Pipe({
    name: 'req_subject_enable_forms'
})
export class RequestSubjectEnableFormsPipe implements PipeTransform {
    public transform(subjet: ReqSubjectResp): number {
        
        return subjet.forms.filter(f => f.state == 1).length

    }
}