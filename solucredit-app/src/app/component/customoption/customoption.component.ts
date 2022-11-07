import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-customoption',
  templateUrl: './customoption.component.html',
  styleUrls: ['./customoption.component.scss']
})
export class CustomoptionComponent implements OnInit {

  @Input()
  label = ''

  @Input()
  isrequired?= false

  @Input()
  formcontrol: FormControl


  @Input()
  iconclass = 'fas fa-question'


  @Input()
  id?= 'id'


  @Input()
  data?= []

  @Input()
  itemLabel?

  @Input()
  itemValue?
  
  @Input()
  mode: 'top' | 'normal' = 'normal'

  @Input()
  options?: any


  constructor() { }

  ngOnInit(): void {
  }

}
