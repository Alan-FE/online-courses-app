import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagination',
  pure: false
})
export class PaginationPipe implements PipeTransform {

  transform(array: any[], page: number, itemsPerPage: number): any[]{
    
    if(array.length == 0) {
      return array;
    }

    let newArray: any [] = [];
    let startIndex: number = page * itemsPerPage - itemsPerPage;
    let endIndex: number =  (page * itemsPerPage > array.length) ? array.length : page * itemsPerPage;

    for(let i = startIndex; i < endIndex; i++) {
      newArray.push(array[i]);
    }
    
    return newArray;
  }

}
