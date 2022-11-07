import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
export interface ItemStep {
  title: string
  message: string
  icon: string
  state: 'completed' | 'inprocess' | 'error' | 'none'
  id: number
  name: string
}
@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})

export class StepperComponent implements OnInit {
  @Input()
  selectedId: number = 0;

  @Input()
  configuration: ItemStep[] = []

  @Output()
  changeStep = new EventEmitter<number>()
  constructor() { }

  ngOnInit(): void {
  }
  print() {
    console.log('print');
  }
  getStepStatusClass(item: ItemStep) {
    if (item.id == this.selectedId) {
      return 'step active'
    }
    switch (item.state) {
      case 'completed':
        return 'step completed';
      case 'inprocess':
        return 'step process';
      case 'error':
        return 'step error';
      case 'none':
        return 'step'
      default:
        return 'step'
    }
  }
  getMessage() {
    return this.configuration.find(item => item.id == this.selectedId).message
  }
  changeStepMethod(item: ItemStep) {
    this.changeStep.emit(item.id)
  }
}
