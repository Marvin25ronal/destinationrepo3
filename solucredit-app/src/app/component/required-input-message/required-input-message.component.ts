import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-required-input-message',
  templateUrl: './required-input-message.component.html',
  styleUrls: ['./required-input-message.component.scss']
})
export class RequiredInputMessageComponent implements OnInit {
  @Input()
  isValid:boolean
  constructor() { }

  ngOnInit(): void {
  }

}
