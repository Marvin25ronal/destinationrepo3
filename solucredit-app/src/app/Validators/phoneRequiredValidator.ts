import { AbstractControl, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { ValidatorFn } from "@iplab/ngx-file-upload";

export const phoneOrMobilephone = (validator: ValidatorFn, controls: string[] = null) => (group: FormGroup): ValidationErrors | null => {
    
    if (!controls) {
        controls = Object.keys(group.controls)
    }

    const hasAtLeastOne = group && group.controls && controls
        .some(k => !validator(group.controls[k]) && !isPhoneNumberValid(group.controls[k]));
    
    return hasAtLeastOne ? null : {
        atLeastOne: true,
    };
}

export function isPhoneNumberValid(control: AbstractControl) {
    var phoneRegExp = new RegExp('(^[0-9]{4}$)|(^[0-9]{8}$)')
    let phone = control.value;
    
    if (phone == undefined || phone == null || phone == '') {
        return null;
    }
    if (!phoneRegExp.test(phone)) {
        return { 'isPhoneNumberValid': { value: control.value } };
    }
    return null
}