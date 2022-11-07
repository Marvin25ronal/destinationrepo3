import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'grouppiperoles'
})
export class GroupPipe implements PipeTransform {

  transform(value: any, args: any[] = null): any {
    //console.log('grouppipe');
    //console.log(value);
    let resp = Object.keys(value).map(function (key) {
      let pair = {};
      let k = 'key';
      let v = 'value';

      /* value['active'] = false;
      value['disable'] = false; */
      pair[k] = key;
      pair[v] = value[key];
      pair['active'] = false;
      pair['disable'] = false;
      /* console.log('EN EL MAP');
      console.log(value);
      console.log(pair);
 */
      return value[key];
    });
    //console.log(resp);
    return resp;
  }


}