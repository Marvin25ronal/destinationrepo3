import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'namefile'
})
export class NamefilePipe implements PipeTransform {

  public transform(name: string): string {
    const index = name.indexOf('_')
    if (index != -1) {
      return name.substring(index + 1, name.length)
    }
    return name;
  }

}
