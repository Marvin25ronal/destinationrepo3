import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'reqreportstatus'
})
export class ReqReportStatusPipe implements PipeTransform {
    public transform(action: number): string {
        switch (action) {
            case 0:

                return 'Pendiente';
            case 1:
                return 'Precalificado';
            case 2:
                return 'Comite de creditos';

            default:
                break;
        }
    }
}