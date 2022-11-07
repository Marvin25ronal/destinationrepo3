import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'req_type'
})
export class RequestTypePipe implements PipeTransform {
    public transform(action: number): string {
        switch (action) {
            
            case 1:
                return 'Factoraje tradicional';
            case 2:
                return 'Factoraje especial';
            case 3:
                return 'Especiales';
            case 4:
                return 'Pronto pago';

            default:
                'Default::' + action;
        }
       








    }
}