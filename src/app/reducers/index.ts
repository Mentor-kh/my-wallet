import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromData from './data.reducer';

export interface IScope {
  scope: fromData.IState;
}

export const reducers: ActionReducerMap<IScope> = {
  scope: fromData.reducer,
};


export const metaReducers: MetaReducer<IScope>[] = !environment.production ? [] : [];
