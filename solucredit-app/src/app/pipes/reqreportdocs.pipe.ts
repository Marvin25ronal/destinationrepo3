import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'reqreportdocs'
})
export class ReqReportDocsPipe implements PipeTransform {
    public transform(action: number): string {
        switch (action) {
            case 0:

                return 'Pendiente';
            case 1:
                return 'Completo';

            default:
                break;
        }
    }
}