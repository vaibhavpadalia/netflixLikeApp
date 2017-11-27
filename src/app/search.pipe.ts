import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(movies: any, search: any): any {
    if (!search) {
      return movies;
    }
    return movies.filter(re =>
      re.name.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
      re.genre.toLowerCase().indexOf(search.toLowerCase()) > -1 );
  }
}
