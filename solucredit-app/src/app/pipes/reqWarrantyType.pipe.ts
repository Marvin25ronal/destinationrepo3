import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'req_warranty_type'
})
export class RequestWarrantyTypePipe implements PipeTransform {
    public transform(action: number): string {
        switch (action) {
            
            case 0:
                return 'Fiduciaria';
            case 1:
                return 'Tipotecaria';
            case 2:
                return 'Prendaria';
            default:
                'Default::' + action;
        }









    }
}