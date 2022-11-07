import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { of } from 'rxjs';
import { map, mergeMap, catchError, exhaustMap } from 'rxjs/operators';
import { AuthorizationService } from './services/authorization.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  isAuthenticated$ = this.auth.isAuthenticated$;
  isLoading$ = this.auth.isLoading$;
  user$ = this.auth.user$;
  claims$ = this.auth.idTokenClaims$;
  accessToken = '';
  error$ = this.auth.error$;

  constructor
    (
      public auth: AuthService,
      private authorization: AuthorizationService,
      @Inject(DOCUMENT) private doc: Document
    ) {

    this.claims$.pipe(
      exhaustMap(m => {
        this.authorization.changeUserData({ name: m.name, email: m.email, jwt: m.__raw })
        return this.authorization.autorizar(m.email, m.__raw, m.name).pipe(
          map((resp) => {
            //console.log('DESDE PIPE:' + resp)
            return m
          })
        )
      })
    ).subscribe(m => {

      window.localStorage.setItem("name", m.name);
      window.localStorage.setItem("usrtkn", m.__raw);
      window.localStorage.setItem("picture", m.picture);
      window.localStorage.setItem("email", m.email);
      window.localStorage.setItem("given_name", m.given_name);
      window.localStorage.setItem("family_name", m.family_name);
    });
  }
}
