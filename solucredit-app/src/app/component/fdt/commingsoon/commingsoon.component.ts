import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-commingsoon',
  templateUrl: './commingsoon.component.html',
  styleUrls: ['./commingsoon.component.scss']
})
export class CommingsoonComponent implements OnInit {
  @Input()
  return?: boolean
  @Output()
  return_view = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }
  onRoute() {
    this.return_view.emit()
  }

}
