import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'req_requirements_type'
})
export class RequestRequirementTypePipe implements PipeTransform {
    public transform(type:number): string {
        //console.log('TYPE:: '+type)
        switch (type) {
            
            case 1: {
                return 'DOCUMENTACIÓN LEGAL'
            }
            case 2: {
                return 'DOCUMENTACIÓN FINANCIERA';
            }
            case 3: {
                return 'OTROS REQUISITOS';
            }
            case 4: {
                return 'SOCIOS (MÍNIMMO 2 SOCIOS) O EL NÚMERO DE SOCIOS QUE SOBRE PASEN EL 50% DE ACCIONES';
            }
            case 5: {
                return '';
            }
            case 6: {
                return 'AVAL';
            }
            case 7: {
                return 'EMPRESA';
            }
            case 8: {
                return 'PROPIETARIO Y AVAL';
            }
            case 77: {
                return 'SOCIOS';
            }
        }

    }
}
