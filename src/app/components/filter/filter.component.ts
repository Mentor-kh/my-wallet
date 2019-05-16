import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { IScope } from 'src/app/reducers';
import { Observable, Observer, Subscription } from 'rxjs';
import { ITransaction } from '../data-table/data-table.component';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FilterService } from 'src/app/services/filter.service';
import { FormControl } from '@angular/forms';
import { ICategories } from '../dashboard/dashboard.component';
import { AddFilters, FilterData } from 'src/app/actions/data.actions';
import { filterData } from 'src/app/helpers/filter-data';

export interface IFilters {
  categories: string[];
  startDate: Date;
  endDate: Date;
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnDestroy {
  @Output() public exportFilters: EventEmitter<IFilters> = new EventEmitter<IFilters>();
  public categoriesControl: FormControl = new FormControl();
  public categoriesList: string[] = [];
  public checkedCategories: string[] = [];
  public checkedStartDate: Date;
  public checkedEndDate: Date;
  public filters: IFilters = {
    categories: [],
    startDate: new Date(),
    endDate: new Date()
  };
  public transactions: ITransaction[];
  public $filters: Observer<IFilters>;
  public $filterSubscription: Subscription;
  public $categoriesControl: Subscription;
  public $categories: Subscription;
  public $data: Subscription;
  public $filtersObservable: Observable<IFilters>;
  public startControl: FormControl = new FormControl(this.filters.startDate);
  public endControl: FormControl = new FormControl(this.filters.endDate);

  public constructor(
    private store: Store<IScope>
  ) {
    this.$data = this.store.select('scope', 'data').subscribe((data: ITransaction[]) => {
      this.transactions = data;
      if (data.length > 0) {
        this.filters.startDate = new Date(data[0].date);
        this.filters.endDate = new Date(data[data.length - 1].date);
        this.store.dispatch(new FilterData(filterData(this.transactions, this.filters)));
      }
    });
    this.$filterSubscription = this.store.select('scope', 'filters').subscribe((filters: IFilters[]) => {
      if (filters && filters[0]) {
        this.filters = filters[0];
        this.checkedCategories = this.filters.categories;
        this.store.dispatch(new FilterData(filterData(this.transactions, this.filters)));
      }
    });
    this.$categoriesControl = this.categoriesControl.valueChanges.subscribe((value: string[]) => {
      this.filters.categories = value;
      this.store.dispatch(new AddFilters(this.filters));
    });
    this.$categories = this.store.select('scope', 'categories')
      .subscribe((categories: ICategories[]) => {
        this.categoriesList = [];
        categories.map((category: ICategories) => {
          this.categoriesList.push(category.category);
        });
      });
  }

  public checkedCategoriesState(a: string, b: string): boolean {
    return a === b;
  }

  public startEvent(type: string, event: MatDatepickerInputEvent<Date>): void {
    this.checkedStartDate = new Date(event.value);
    this.filters.startDate = this.checkedStartDate;
    this.store.dispatch(new AddFilters(this.filters));
  }

  public endEvent(type: string, event: MatDatepickerInputEvent<Date>): void {
    this.checkedEndDate = new Date(event.value);
    this.filters.endDate = this.checkedEndDate;
    this.store.dispatch(new AddFilters(this.filters));
  }

  public ngOnDestroy(): void {
    this.$data.unsubscribe();
    this.$filterSubscription.unsubscribe();
    this.$categoriesControl.unsubscribe();
    this.$categories.unsubscribe();
  }
}
