import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {

    if (arg === '' || arg.length < 1) return value;

    const resultRoutes = [];

    for(const route of value){
      if(route.name.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultRoutes.push(route);
      }
    }
    return resultRoutes;
  }

}
