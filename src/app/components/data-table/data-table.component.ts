import { NotificationService } from 'src/app/services/notification.service';
import { RemoveData } from 'src/app/actions/data.actions';
import { MatPaginator } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { IScope } from 'src/app/reducers';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { IFilters } from '../filter/filter.component';
import { FilterService } from 'src/app/services/filter.service';
import { Subscription } from 'rxjs';

export interface ITransaction {
  id: number;
  date: Date;
  category: string;
  positive: boolean;
  cost: number;
}


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnDestroy {
  public transactions: ITransaction[];
  public filters: IFilters[];
  public positive: boolean = true;
  public loadingFlag: boolean = false;
  public dataSource: MatTableDataSource<ITransaction>;
  public displayedColumns: string[] = ['id', 'category', 'date', 'cost', 'actions'];
  private $loadingData: Subscription;
  private $dialogRef: Subscription;

  @ViewChild(MatPaginator) private paginator: MatPaginator;
  private $filterData: Subscription;
  private $filters: Subscription;

  public constructor(
    private store: Store<IScope>,
    private notification: NotificationService,
    public dialog: MatDialog,
    public filterService: FilterService
  ) {
    this.$loadingData = this.store.select('scope', 'isLoading').subscribe((data: boolean) => {
      this.loadingFlag = data;
    });
    this.$filterData = this.store.select('scope', 'filterData').subscribe((data: ITransaction[]) => {
      this.transactions = data;
      this.dataSource = new MatTableDataSource<ITransaction>(this.transactions);
      this.dataSource.paginator = this.paginator;
    });
    this.$filters = this.store.select('scope', 'filters').subscribe((filters: IFilters[]): void => {
      this.filters = filters;
    });
  }

  public getIndex(i: number): number {
    return this.paginator.pageIndex * this.paginator.pageSize + i + 1;
  }

  public openDialog(id: number): void {
    const dialogRef: MatDialogRef<any> = this.dialog.open(DialogComponent, {
      width: '250px',
      data: true
    });

    this.$dialogRef = dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.store.dispatch(
          new RemoveData(this.transactions.filter((item: ITransaction, i: number) => this.getIndex(id) !== i + 1)));
        this.notification.showNotification('deleted');
      }
    });
  }

  public ngOnDestroy(): void {
    this.$loadingData.unsubscribe();
    this.$filterData.unsubscribe();
    this.$filters.unsubscribe();
    if (this.$dialogRef) {
      this.$dialogRef.unsubscribe();
    }
  }

  private getTotalCost(): number {
    if (this.transactions) {
      return this.transactions.map((item: ITransaction) => item).reduce((acc: number, value: ITransaction) => {
        if (value.positive) {
          return acc + value.cost;
        } else {
          return acc - value.cost;
        }
      }, 0);
    }
  }

  private removeTransaction(id: number): void {
    this.openDialog(id);
  }
}
