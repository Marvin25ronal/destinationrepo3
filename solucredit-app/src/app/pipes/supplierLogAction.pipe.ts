import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'supplier_log_action'
})
export class SupplierLogActionPipe implements PipeTransform {
    public transform(action: number): string {
        switch (action) {
            case 0:
                return 'Creacion';
            case 1:
                return 'Eliminacion';
            case 2:
                return 'Modificar';
            case 3:
                return 'Elimino archivo';
            case 4:
                return 'Subio archivo';
            case 5:
                return 'Completó documento';
            case 6:
                return 'Incompletó el documento';

            default:
                'Default::' + action;
        }








    }
}