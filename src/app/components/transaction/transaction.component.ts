import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IScope } from 'src/app/reducers';
import { AddCategory, AddData } from 'src/app/actions/data.actions';
import { ITransaction } from '../data-table/data-table.component';
import { Subscription } from 'rxjs';
import { CategoryExistService } from 'src/app/services/category-exist.service';
import { categoryAsyncValidator } from 'src/app/helpers/category-async-validator';
import { ICategories } from '../dashboard/dashboard.component';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit, OnDestroy {
  public transactionForm: FormGroup;
  public categoryForm: FormGroup;
  public positive: boolean = false;
  public priceValid: boolean = true;
  public categoryValid: boolean = true;
  public categories: ICategories[];
  public transactions: ITransaction[];
  public isOpen: boolean = false;
  private $formSubscription: Subscription;
  private $categories: Subscription;
  private $data: Subscription;
  private $categoryForm: Subscription;
  private dataTransaction: { category: string, positive: boolean, cost: number };

  public constructor(
    private categoryExistService: CategoryExistService,
    private notification: NotificationService,
    private store: Store<IScope>
  ) {
    this.$categories = this.store.select('scope', 'categories').subscribe((data: ICategories[]) => {
      this.categories = data;
    });
    this.$data = this.store.select('scope', 'data').subscribe((data: ITransaction[]) => {
      this.transactions = data;
    });
    this.transactionForm = new FormGroup({
      category: new FormControl('', Validators.required),
      cost: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    });
    this.categoryForm = new FormGroup({
      category: new FormControl('', Validators.required, categoryAsyncValidator(this.categoryExistService)),
      positive: new FormControl(false),
    });
  }

  public ngOnInit(): void {
    this.$formSubscription = this.transactionForm.valueChanges.subscribe((formValue: any) => {
      this.categoryValid = formValue.category.valid;
      this.priceValid = formValue.cost.valid;
    });
    this.$categoryForm =
      this.categoryForm.controls.positive.valueChanges.subscribe((value: boolean) => this.positive = value);
  }

  public addTransaction(): void {
    if (!this.transactionForm.valid) {
      return;
    }
    this.dataTransaction = {
      category: this.transactionForm.controls.category.value.category,
      positive: this.transactionForm.controls.category.value.positive,
      cost: this.transactionForm.controls.cost.value
    };
    const newTransaction: ITransaction =
      Object.assign({ id: this.transactions.length, date: new Date() }, this.dataTransaction);
    this.store.dispatch(
      new AddData([...this.transactions, { ...newTransaction }])
    );
  }

  public addCategory(): void {
    if (!this.categoryForm.valid) {
      return;
    }
    this.store.dispatch(new AddCategory([...this.categories, this.categoryForm.value]));
    this.notification.showNotification(`"${this.categoryForm.controls.category.value}" category added`);
    this.categoryForm.controls.category.setValue('');
    this.categoryForm.controls.category.setErrors(null);
  }

  public menuOpen(): void {
    this.isOpen = !this.isOpen;
  }

  public isCategoryTaken(): boolean {
    return this.categoryForm.get('category').hasError('categoryExist');
  }

  public ngOnDestroy(): void {
    this.$formSubscription.unsubscribe();
    this.$categories.unsubscribe();
    this.$data.unsubscribe();
    this.$categoryForm.unsubscribe();
  }
}
