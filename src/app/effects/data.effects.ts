import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  AddCategorySuccess,
  AddDataError,
  AddDataSuccess,
  DataActions,
  DataActionTypes,
  FilterData,
  LoadCategoriesError,
  LoadCategoriesSuccess,
  LoadDatasError,
  LoadDatasSuccess,
  LoadUser,
  LoadUserError,
  LoadUserSuccess,
  RemoveDataError,
  RemoveDataSuccess
} from '../actions/data.actions';
import { DataService } from '../services/data.service';
import { ITransaction } from '../components/data-table/data-table.component';
import { ICategories } from '../components/dashboard/dashboard.component';

@Injectable()
export class DataEffects {
  @Effect()
  private loadData$ = this.actions$.pipe(
    ofType(DataActionTypes.LoadData),
    mergeMap(() => this.dataService.getData()
      .pipe(
        switchMap((data: ITransaction[]) => [
          new FilterData(data),
          new LoadDatasSuccess(data),
          new LoadUser()
        ]),
        catchError((err: any) => of(new LoadDatasError(err)))
      )));

  @Effect()
  private loadCategories$ = this.actions$.pipe(
    ofType(DataActionTypes.LoadCategories),
    mergeMap(() => this.dataService.getCategories()
      .pipe(
        map((data: ICategories[]) => new LoadCategoriesSuccess(data)),
        catchError((err: any) => of(new LoadCategoriesError(err)))
      )));

  @Effect()
  private addCategory$ = this.actions$.pipe(
    ofType(DataActionTypes.AddCategory),
    mergeMap((action) => this.dataService.addCategory(action.payload)
      .pipe(
        map(() => new AddCategorySuccess()),
        catchError((err: any) => of(new AddDataError(err)))
      )));

  @Effect()
  private loadUser$ = this.actions$.pipe(
    ofType(DataActionTypes.LoadUser),
    mergeMap(() => this.dataService.getUser()
      .pipe(
        map((user: any[]) => new LoadUserSuccess(user)),
        catchError((err: any) => of(new LoadUserError(err)))
      )));

  @Effect()
  private addData$ = this.actions$.pipe(
    ofType(DataActionTypes.AddData),
    mergeMap((action) => this.dataService.addData(action.payload)
      .pipe(
        map((data: ITransaction) => new AddDataSuccess()),
        catchError((err: any) => of(new AddDataError(err)))
      )));

  @Effect()
  private removeData$ = this.actions$.pipe(
    ofType(DataActionTypes.RemoveData),
    mergeMap((action) => this.dataService.removeData(action.payload)
      .pipe(
        map((data: ITransaction[]) => new RemoveDataSuccess(data)),
        catchError((err: any) => of(new RemoveDataError(err)))
      )));

  public constructor(
    private actions$: Actions<DataActions>,
    private dataService: DataService
  ) { }
}
