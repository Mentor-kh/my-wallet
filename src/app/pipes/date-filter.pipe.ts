import { Pipe, PipeTransform } from '@angular/core';
import { ITransaction } from '../components/data-table/data-table.component';
import { IFilters } from '../components/filter/filter.component';

@Pipe({
  name: 'dateFilter',
  pure: true
})
export class DateFilterPipe implements PipeTransform {
  public transform(transactions: ITransaction[], filters: IFilters): ITransaction[] {
    if (transactions && filters) {
      return transactions.filter((transaction: ITransaction) => {
        const tDate: Date = new Date(transaction.date);
        const sDate: Date = filters.startDate;
        const eDate: Date = filters.endDate;
        return tDate >= sDate && tDate <= eDate;
      }
      );
    }
  }
}
