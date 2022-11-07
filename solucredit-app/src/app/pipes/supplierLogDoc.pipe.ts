import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'supplier_log_doc'
})
export class SupplierLogDocPipe implements PipeTransform {
    public transform(action: number): string {
        switch (action) {
            case 1:
                return 'DPI';
            case 2:
                return 'Pasaporte';
            case 3:
                return 'RTU extendido por la SAT';
            case 4:
                return 'Formulario IVE-IR-01';
            case 5:
                return 'Recibo de luz, agua o teléfono';
            case 6:
                return 'Contrato';
            case 7:
                return 'Consulta de Guatecompras';
            case 8:
                return 'Formulario Anexo de Contratistas y Proveedores';
            default:
                return 'Proveedor';
        }

        
            
            
            
            
            
            
    }
}