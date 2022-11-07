import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loader-button',
  templateUrl: './loader-button.component.html',
  styleUrls: ['./loader-button.component.scss']
})
export class LoaderButtonComponent implements OnInit {

  @Input() buttonConfig: any;
  @Input() disabled: boolean;
  @Input() spin: boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
