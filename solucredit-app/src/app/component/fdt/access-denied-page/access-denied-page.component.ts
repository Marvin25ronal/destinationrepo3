import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-access-denied-page',
  templateUrl: './access-denied-page.component.html',
  styleUrls: ['./access-denied-page.component.scss']
})
export class AccessDeniedPageComponent implements OnInit {
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
