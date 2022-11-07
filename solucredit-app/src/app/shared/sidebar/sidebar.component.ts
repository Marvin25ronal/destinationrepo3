import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ROUTES } from './menu-items';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SidevarService } from '../../services/sidevar.service';
import { SidebarNameService } from '../../services/data/sidebar-name.service'
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls:['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  showMenu = '';
  showSubMenu = '';
  name = '-';
  picture = '';
  public sidebarnavItems: any[];
  // this is for the open close
  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }
  addActiveClass(element: any) {
    if (element === this.showSubMenu) {
      this.showSubMenu = '0';
    } else {
      this.showSubMenu = element;
    }
  }

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private service: SidevarService,
    private sidebarNameServide: SidebarNameService
  ) {
    service.sidebarState$.subscribe((rutas) => {
      this.sidebarnavItems = rutas;
    });

  }

  // End open close
  ngOnInit() {
    this.sidebarNameServide.name$.subscribe(text => {
      this.name = text;
    });
    this.name = window.localStorage.getItem('name') ? window.localStorage.getItem('name') : '-';
    this.picture = window.localStorage.getItem('picture') ? window.localStorage.getItem('picture') : 'assets/images/generic-user.jpg';
    //this.sidebarnavItems = ROUTES.filter(sidebarnavItem => sidebarnavItem);
  }
}
