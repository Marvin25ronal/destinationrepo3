import { Injectable } from '@angular/core';
import { CanActivate, Router,CanActivateChild, CanDeactivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { AuthorizationService } from './services/authorization.service';
import { map, take, catchError, retryWhen, delay, concatMap } from 'rxjs/operators';
import { AuthService } from '@auth0/auth0-angular';
import { LogoutOptions } from '@auth0/auth0-spa-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate,CanLoad {

  obs: Observable<boolean>;
  errorCount = 0;
  
  constructor(
    private router: Router,
    private authorizationService: AuthorizationService,
    public auth: AuthService) {
    
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.obs.pipe(take(1));
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //EL RouterStateSnapshot tiene la ruta
    //console.log("CAN ACTIVATE....................");
    this.errorCount = 0;
    this.obs = this.authorizationService.canActivateRoute(state.url).pipe(
      
      /* catchError(err => { console.log(err); return of(false); }), */
      retryWhen(err => {
        //console.log('retry');
        let retries = 0;
        return err.pipe(
          delay(1000),
          map(error => {
              if (retries++ === 10) {
                throw error;
              }
              return error;
            })
        )
          
      }),
        
        
        
    
      map((data) => {
        
        
        if (!data) {
          if (this.authorizationService.userPermisos[0].permission_id == '____CLIENTE___') {
            this.router.navigate(['/my-profile']);
          } else { 
            this.router.navigate(['/dashboard']);
          }
          
        }
        
        
        return data;
          
        
      }),
      catchError((err) => {
        //console.log('Despues de varios intentos:: FALLO LA AUTORIZACION..');
        console.log(err);
        window.localStorage.clear();
        const options: LogoutOptions = {
          returnTo: environment.redirectUri,
        };

        this.auth.logout(options);
        return of(false);
      })
     
      
    );
      
  
    return this.obs;
    /* const resp = this.authorizationService.canActivateRoute(state.url);
    console.log(`PARA LA RUTA ${state.url} su activacion es ${resp}`); */
   
  }
  /* canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
   */
}
