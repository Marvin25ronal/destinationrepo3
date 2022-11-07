import { AbstractControl } from "@angular/forms";

export function isDefaultValue(control: AbstractControl): { [key: string]: any } | null {
    let nit = control.value;
    if (nit == undefined || nit == null) {
        return null
    }
    if (nit == -1) {
        return {'default_value': { value: control.value }}
    }
    return null
}
