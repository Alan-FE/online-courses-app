import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

  transform(value: any): string {
    if(value.length > 26) {
      return value.substr(0, 26) + '...';
    }
    return value;
  }

}
