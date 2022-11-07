import { Injectable, EventEmitter } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SidebarNameService {
  name$ = new EventEmitter<string>();
  constructor() { } 
}
