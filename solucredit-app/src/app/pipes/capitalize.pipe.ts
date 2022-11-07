import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  public transform(action: string): string {
    return action
      .toLowerCase()
      .replace(/\w/, firstLetter => firstLetter.toUpperCase());
  }

}
