import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'req_doc_type'
})
export class RequestDocTypePipe implements PipeTransform {
    public transform(action: number): string {
        switch (action) {

            case 0:
                return 'Pagaré';
            case 1:
                return 'Cupo revolvente';
            case 2:
                return 'Escritura';
            
            case 3:
                return 'Pagaré';
            
            case 4:
                return 'Crédito/Contrato';
            case 5:
                return 'Pagaré';
            case 6:
                return 'Cupo revolvente';
            case 7:
                return 'Escritura';
            case 8:
                return 'Pagaré';
            
            case 9:
                return 'Crédito/Contrato';
            default:
                'Default::' + action;
        }









    }
}