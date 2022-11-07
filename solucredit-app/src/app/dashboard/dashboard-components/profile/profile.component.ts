import { Component } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-profile-box',
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
	
	public config: PerfectScrollbarConfigInterface = {};

  constructor() {}
}
