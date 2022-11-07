import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'pep_motivacion_pipe'
})
export class PepMotivacionPipe implements PipeTransform {
    public transform(action: number): string {
        switch (action) {
            case 1:

                return 'Profesionales';
            case 2:
                return 'Politicos';
            case 3:
                return 'Comerciales'
            case 4:
                return 'Negocios'

            case 5:
                return 'Otro'
            default:
                return '...';
        }
    }
}