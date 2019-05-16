import { CategoryExistService } from '../services/category-exist.service';
import { FormControl } from '@angular/forms';
import { timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export const categoryAsyncValidator: Function = (categoryExistService: CategoryExistService, time: number = 500) => {
  return (input: FormControl) => {
    return timer(time).pipe(
      switchMap(() => categoryExistService.checkCategory(input.value)),
      map(res => res.isCategoryAvailable ? null : { categoryExist: true })
    );
  };
};
