import { Pipe, PipeTransform } from '@angular/core';
import { List } from '../models/list.model';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(lists: List[], completed: boolean = true): List[] {
    
    return lists.filter(data => data.completed === completed);
    
  }

}
