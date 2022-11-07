import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthorizationService } from '../services/authorization.service';
import { data } from '../component/table/smart-table/smart-data-table';
@Injectable()
export class AuthorizeInterceptor implements HttpInterceptor {
  /* intercept(req: HttpRequest<any>, next: HttpHandler):
      Observable<HttpEvent<any>> {
      return next.handle(req);
  } */
  //tokensub: Subscription;
  token: string;
  email: string;
  name: string;
  subs: Subscription;
  constructor(private authorizationService: AuthorizationService) {
    //console.log('############# CONSTRUCTOR DE AuthorizeInterceptor####');
    this.subs = this.authorizationService.userDataState$.subscribe((data) => {

      this.token = data.jwt;
      this.email = data.email;
      this.name = data.name;
      //this.subs.unsubscribe();
    });
  }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    //console.log("Pase por el interceptor");
    this.token = localStorage.getItem("usrtkn");
    //console.log(this.token);

    //console.log('EN EL INTERCEPTOR::: ', this.email);
    let tokenizedReq = req.clone({ setHeaders: { 'Authorization': `Bearer ${this.token}`, 'userinfo': `${this.email}` } });
    return next.handle(tokenizedReq);
  }
}