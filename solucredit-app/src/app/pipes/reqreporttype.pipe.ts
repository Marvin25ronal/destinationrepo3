import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'reqreporttype'
})
export class ReqReportTypePipe implements PipeTransform {
    public transform(action: number): string {
        switch (action) {
            case 0:

                return 'Factoraje Tradicional';
            case 1:
                return 'Factoraje Especial';
            case 3:
                return 'Especiales';
            case 4:
                return 'Pronto Pago';

            default:
                break;
        }
    }
}