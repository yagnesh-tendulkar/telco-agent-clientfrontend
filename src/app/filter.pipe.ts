import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(list: any[], searchText: string): any[] {
    console.log(list,searchText)
    if (!list) return [];
    if (!searchText) return list;
    searchText = searchText.toLowerCase();
    return list.filter(listitem => {
      return (listitem.name).toLowerCase().includes(searchText);
    });
  }
}
