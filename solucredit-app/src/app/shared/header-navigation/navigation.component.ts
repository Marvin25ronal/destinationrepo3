import { Component, AfterViewInit, EventEmitter, Output, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { LogoutOptions } from '@auth0/auth0-spa-js';
import { DOCUMENT } from '@angular/common';
import { environment } from '../../../environments/environment';
import { SidevarService } from '../../services/sidevar.service';
import {
  NgbModal,
  ModalDismissReasons,
  NgbPanelChangeEvent,
  NgbCarouselConfig
} from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AuthorizationService } from '../../services/authorization.service';
import { Subscription } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements AfterViewInit, OnInit {
  @Output() toggleSidebar = new EventEmitter<void>();
  rol: number = 0;
  public config: PerfectScrollbarConfigInterface = {};

  public showSearch = false;
  name = '-';
  email = '-';
  picture = '';
  suscription: Subscription;
  constructor
    (
      private modalService: NgbModal,
      private router: Router,
    public auth: AuthService,
    private service: SidevarService,
      private authorizationService: AuthorizationService,
      @Inject(DOCUMENT) private doc: Document
  ) { 
    
    }

  // This is for Notifications
  notifications: Object[] = [
    {
      btn: 'btn-danger',
      icon: 'ti-link',
      title: 'Nuevo prospecto',
      subject: 'El prospecto Luis Pérez ha realizado una solicitud.',
      time: '9:30 AM'
    },
    {
      btn: 'btn-success',
      icon: 'ti-calendar',
      title: 'Aprobación de crédito',
      subject: 'Un cliente ha cumplido todos los requisitos.',
      time: '9:10 AM'
    },
    {
      btn: 'btn-info',
      icon: 'ti-settings',
      title: 'Cierre de mes',
      subject: 'Revisar el ingreso de datos',
      time: '9:08 AM'
    },
    {
      btn: 'btn-primary',
      icon: 'ti-user',
      title: 'Revisión de solicitud',
      subject: 'Enviar formularios a cliente',
      time: '9:00 AM'
    }
  ];

  // This is for Mymessages
  mymessages: Object[] = [
    {
      useravatar: 'assets/images/users/1.jpg',
      status: 'online',
      from: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:30 AM'
    },
    {
      useravatar: 'assets/images/users/2.jpg',
      status: 'busy',
      from: 'Sonu Nigam',
      subject: 'I have sung a song! See you at',
      time: '9:10 AM'
    },
    {
      useravatar: 'assets/images/users/2.jpg',
      status: 'away',
      from: 'Arijit Sinh',
      subject: 'I am a singer!',
      time: '9:08 AM'
    },
    {
      useravatar: 'assets/images/users/4.jpg',
      status: 'offline',
      from: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:00 AM'
    }
  ];

  ngOnInit() {
    //console.log("ngOnit de Navigation Component");
    //this.name = window.localStorage.getItem('name') ? window.localStorage.getItem('name') : '-';
    //this.email = window.localStorage.getItem('email') ? window.localStorage.getItem('email') : '-';
    this.suscription = this.authorizationService.userDataState$.subscribe((data) => {
      this.name = data.name;
      this.email = data.email;
      //this.suscription.unsubscribe();
    });
    this.picture = window.localStorage.getItem('picture') ? window.localStorage.getItem('picture') : 'assets/images/generic-user.jpg';
  }
  cambiarrol() {
    this.rol++;
    //this.service.changeSidebarState(this.rol);

  }
  ngAfterViewInit() { }

  logout(): void {
    window.localStorage.clear();
    const options: LogoutOptions = {
      returnTo: environment.redirectUri,
    };

    this.auth.logout(options);
  }
}
