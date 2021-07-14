import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(instructors: any [], searchTerm: string, propName: string): any {
  
    if(instructors.length == 0 || searchTerm == '') {
      return instructors;
    }

    searchTerm = searchTerm.toLowerCase();
    
    return instructors.filter(obj => {
      return obj[propName].toLowerCase().includes(searchTerm);
    })
    
  }

}
