import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-custominput',
  templateUrl: './custominput.component.html',
  styleUrls: ['./custominput.component.scss']
})
export class CustominputComponent implements OnInit {
  @Input()
  label = ''

  @Input()
  placeholder = ''

  @Input()
  formcontrol: FormControl

  @Input()
  id?= 'id'


  @Input()
  isrequired?= false

  @Input()
  iconclass = 'fas fa-question'

  @Input()
  type?= 'text'

  @Input()
  mode: 'top' | 'normal' = 'normal'

  @Input()
  options?: any

  @Input()
  currencyMask?: boolean = false

  @Input()
  errorMessages: {} = {}

  @Input()
  maxLength: number = undefined


  constructor() { }

  ngOnInit(): void {
  }
  getFirstError(): string {
    if (this.formcontrol.errors) {
      
      let keys = Object.keys(this.formcontrol.errors)
      //Ya tenemos las llaves obtenemos el primer
      let firstKey = keys[0]
      if (this.errorMessages[firstKey]) {
        return this.errorMessages[firstKey]
      }
      return 'Error'
    }
    return 'Error'
  }
}
