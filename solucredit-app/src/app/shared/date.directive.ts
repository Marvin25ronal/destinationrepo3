import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[appCostumeDate]'
})
export class AppCostumeDateDirective {
   
    constructor(private el: ElementRef) {
        this.setup();
    }

    setup() {

        const domNode = this.el.nativeElement;
        let date = new Date();
        let fullYear = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let maxValue = `${fullYear}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
        domNode.setAttribute('max', maxValue);
        /* domNode.value = this.formatDate(date); */
        
      
    }
    private formatDate(date) {

        let dateAux = new Date(date);
        let userTimezoneOffset = dateAux.getTimezoneOffset() * 60000;
        let realDate = new Date(dateAux.getTime() + userTimezoneOffset);
        let month = "" + (realDate.getMonth() + 1);
        let day = "" + realDate.getDate();
        const year = realDate.getFullYear();
        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return [year, month, day].join("-");
    }
}