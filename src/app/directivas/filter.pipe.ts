import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], page: number = 0, search: string): any[] {
    if (search.length === 0) return value.slice(page, page + 5);

    //  console.log(value);
    search = search.toLowerCase();

    //debugger;
    console.log(
      value.filter(function (item: any) {
        return JSON.stringify(item).toLowerCase().includes(search);
      })
    );

    return value
      .filter(function (item: any) {
        return JSON.stringify(item).toLowerCase().includes(search);
      })

      .splice(page, page + 5);

    // return filterList.slice(page, page + 3);
  }
}
