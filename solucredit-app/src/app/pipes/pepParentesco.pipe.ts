import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'pep_parentesco_pipe'
})
export class PepParentescoPipe implements PipeTransform {
    public transform(action: number): string {
        switch (action) {
            case 1:

                return 'Padre';
            case 2:
                return 'Madre';
            case 3:
                return 'Hijo'
            case 4:
                return 'Hermano'
            
            case 5:
                return 'Conyuge'
            case 6:
                return 'Otro'
            default:
                return '...';
        }
    }
}