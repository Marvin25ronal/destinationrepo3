import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  constructor(private router: Router) { }

  login(form: NgForm): void {
    const email = form.value.email;
    const password = form.value.password;
    this.router.navigate(['/usuarios']);
  }
}
