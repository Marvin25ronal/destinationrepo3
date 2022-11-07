import { Component } from '@angular/core';

import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html'
})
export class FeedsComponent {
	
	public config: PerfectScrollbarConfigInterface = {};

  constructor() { }
}