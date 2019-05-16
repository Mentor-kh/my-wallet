import { ITransaction } from '../components/data-table/data-table.component';
import { IFilters } from '../components/filter/filter.component';

export const filterData: Function = (data: ITransaction[], filters: IFilters): ITransaction[] => {
  return data.filter((transaction: ITransaction) => {
    const tDate: Date = new Date(transaction.date);
    let dateSuccess: boolean;
    if (filters) {
      let categorySuccess: boolean = filters.categories.length === 0 ? true : false;
      const sDate: Date = filters.startDate;
      const eDate: Date = filters.endDate;
      dateSuccess = tDate >= sDate && tDate <= eDate;

      filters.categories.map(
        (value: string) => {
          if (value === transaction.category) {
            categorySuccess = true;
            return true;
          } else {
            return false;
          }
        }
      );
      if (dateSuccess && categorySuccess) {
        return true;
      } else {
        return false;
      }
    }
  });
};
