import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'logaction'
})
export class LogActionPipe implements PipeTransform {
    public transform(action: string): string {
        switch (action) {
            case 'DELETE':

                return 'Eliminó';
            case 'PUT':
                return 'Modificó';
            case 'POST':
                return 'creó'

            default:
                break;
        }
    }
}