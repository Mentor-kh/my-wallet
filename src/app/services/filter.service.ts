import { EventEmitter, Injectable } from '@angular/core';
import { IFilters } from '../components/filter/filter.component';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  public filterEmitter: EventEmitter<IFilters> = new EventEmitter<IFilters>();
}
