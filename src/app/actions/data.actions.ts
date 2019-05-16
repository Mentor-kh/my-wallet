import { Action } from '@ngrx/store';
import { ITransaction } from '../components/data-table/data-table.component';
import { ICategories } from '../components/dashboard/dashboard.component';
import { IFilters } from '../components/filter/filter.component';

export enum DataActionTypes {
  LoadData = '[Data] Load Data',
  LoadDatasSuccess = '[Data] Load Datas Success',
  LoadDatasError = '[Data] Load Datas Error',
  LoadCategories = '[Data] Load Categories',
  LoadCategoriesSuccess = '[Data] Load Categories Success',
  LoadCategoriesError = '[Data] Load Categories Error',
  LoadUser = '[Data] Load User',
  LoadUserSuccess = '[Data] Load User Success',
  LoadUserError = '[Data] Load User Error',
  AddData = '[Data] Add Data',
  AddDataSuccess = '[Data] Add Data Success',
  AddDataError = '[Data] Add Data Error',
  FilterData = '[Data] Filter Data',
  AddFilters = '[Data] Filters',
  RemoveData = '[Data] Remove Data',
  RemoveDataSuccess = '[Data] Remove Data Success',
  RemoveDataError = '[Data] Remove Data Error',
  AddCategory = '[Data] Add Category',
  AddCategorySuccess = '[Data] Add Category Success',
  AddCategoryError = '[Data] Add Category Error',
  LogIn = '[Data] Log In',
}

export class LoadData implements Action {
  readonly type = DataActionTypes.LoadData;
}
// tslint:disable: max-classes-per-file
export class LoadDatasSuccess implements Action {
  readonly type = DataActionTypes.LoadDatasSuccess;
  public constructor(public payload: ITransaction[]) { }
}
export class LoadDatasError implements Action {
  readonly type = DataActionTypes.LoadDatasError;
  public constructor(public payload: any) { }
}
export class LoadCategories implements Action {
  readonly type = DataActionTypes.LoadCategories;
}
export class LoadCategoriesSuccess implements Action {
  readonly type = DataActionTypes.LoadCategoriesSuccess;
  public constructor(public payload: ICategories[]) { }
}
export class LoadCategoriesError implements Action {
  readonly type = DataActionTypes.LoadCategoriesError;
  public constructor(public payload: any) { }
}
export class LoadUser implements Action {
  readonly type = DataActionTypes.LoadUser;
}
export class LoadUserSuccess implements Action {
  readonly type = DataActionTypes.LoadUserSuccess;
  public constructor(public payload: any[]) { }
}
export class LoadUserError implements Action {
  readonly type = DataActionTypes.LoadUserError;
  public constructor(public payload: any) { }
}
export class AddData implements Action {
  readonly type = DataActionTypes.AddData;
  public constructor(public payload: ITransaction[]) { }
}
export class AddDataSuccess implements Action {
  readonly type = DataActionTypes.AddDataSuccess;
}
export class AddDataError implements Action {
  readonly type = DataActionTypes.AddDataError;
  public constructor(public payload: ITransaction) { }
}
export class FilterData implements Action {
  readonly type = DataActionTypes.FilterData;
  public constructor(public payload: ITransaction[]) { }
}
export class AddFilters implements Action {
  readonly type = DataActionTypes.AddFilters;
  public constructor(public payload: IFilters) { }
}
export class RemoveData implements Action {
  readonly type = DataActionTypes.RemoveData;
  public constructor(public payload: ITransaction[]) { }
}
export class RemoveDataSuccess implements Action {
  readonly type = DataActionTypes.RemoveDataSuccess;
  public constructor(public payload: ITransaction[]) { }
}
export class RemoveDataError implements Action {
  readonly type = DataActionTypes.RemoveDataError;
  public constructor(public payload: ITransaction[]) { }
}
export class AddCategory implements Action {
  readonly type = DataActionTypes.AddCategory;
  public constructor(public payload: ICategories[]) { }
}
export class AddCategorySuccess implements Action {
  readonly type = DataActionTypes.AddCategorySuccess;
}
export class AddCategoryError implements Action {
  readonly type = DataActionTypes.AddCategoryError;
  public constructor(public payload: ICategories) { }
}
export class LogIn implements Action {
  readonly type = DataActionTypes.LogIn;
  public constructor(public payload: boolean) { }
}

export type DataActions =
  LoadData |
  LoadDatasSuccess |
  LoadDatasError |
  LoadCategories |
  LoadCategoriesSuccess |
  LoadCategoriesError |
  LoadUser |
  LoadUserSuccess |
  LoadUserError |
  AddData |
  AddDataSuccess |
  AddDataError |
  FilterData |
  AddFilters |
  RemoveData |
  RemoveDataSuccess |
  RemoveDataError |
  AddCategory |
  AddCategorySuccess |
  AddCategoryError |
  LogIn;
