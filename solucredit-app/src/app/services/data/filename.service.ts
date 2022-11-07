import { Injectable } from '@angular/core';
import * as shortid from 'shortid';
@Injectable({
  providedIn: 'root'
})
export class FilenameService {
  generateName(){
    //var shortid=require('shortid')
    const id=shortid.generate();
    //console.log(id)
    return id
  }
  constructor() { 
    shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.-');
  }
}
