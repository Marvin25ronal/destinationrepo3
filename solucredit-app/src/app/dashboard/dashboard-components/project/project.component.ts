import { Component } from '@angular/core';

import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html'
})
export class ProjectComponent {
	
	public config: PerfectScrollbarConfigInterface = {};

  constructor() {}
}
