import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: any,filteredString: string): any {
    return value ? value.filter(item => item.nick_name.search(new RegExp(filteredString, 'i')) > -1) : [];
  }

}
