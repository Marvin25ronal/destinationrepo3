import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'form_metadata_status'
})
export class FormMetadataStatusPipe implements PipeTransform {
    public transform(action: number): string {
        switch (action) {
            case 0:

                return 'Sin iniciar';
            case 1:
                return 'En proceso';
            case 2:
                return 'Terminado';
            default:
                break;
        }
    }
}