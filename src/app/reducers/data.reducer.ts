import { DataActions, DataActionTypes } from '../actions/data.actions';
import { ITransaction } from '../components/data-table/data-table.component';
import { ICategories } from '../components/dashboard/dashboard.component';
import { IFilters } from '../components/filter/filter.component';


export interface IState {
  isLoading: boolean;
  isAuthenticated: boolean;
  data: ITransaction[];
  filterData: ITransaction[];
  filters: IFilters[];
  error: string;
  categories: ICategories[];
  profile: {};
}

export const initialState: IState = {
  isLoading: false,
  isAuthenticated: false,
  data: [],
  filterData: [],
  filters: null,
  error: '',
  categories: [],
  profile: {}
};

// tslint:disable-next-line: cyclomatic-complexity
export function reducer(state = initialState, action: DataActions): IState {
  switch (action.type) {
    case DataActionTypes.LoadData:
      return {
        ...state,
        isLoading: true
      };

    case DataActionTypes.LoadDatasSuccess:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };

    case DataActionTypes.LoadDatasError:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };

    case DataActionTypes.AddData:
      return {
        ...state,
        isLoading: true,
        data: action.payload
      };

    case DataActionTypes.AddDataSuccess:
      return {
        ...state,
        isLoading: false
      };

    case DataActionTypes.AddDataError:
      return {
        ...state,
        isLoading: false,
        data: [action.payload]
      };

    case DataActionTypes.FilterData:
      return {
        ...state,
        filterData: action.payload
      };
    case DataActionTypes.AddFilters:
      return {
        ...state,
        filters: [action.payload]
      };

    case DataActionTypes.LoadCategories:
      return {
        ...state,
        isLoading: true,
      };

    case DataActionTypes.LoadCategoriesSuccess:
      return {
        ...state,
        isLoading: false,
        categories: action.payload
      };

    case DataActionTypes.LoadCategoriesError:
      return {
        ...state,
        isLoading: false,
        categories: action.payload
      };

    case DataActionTypes.RemoveData:
      return {
        ...state,
        isLoading: true
      };

    case DataActionTypes.RemoveDataSuccess:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    case DataActionTypes.RemoveDataError:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };

    case DataActionTypes.AddCategory:
      return {
        ...state,
        categories: action.payload
      };

    case DataActionTypes.AddCategorySuccess:
      return {
        ...state
      };

    case DataActionTypes.AddCategoryError:
      return {
        ...state,
        categories: [action.payload]
      };

    case DataActionTypes.LoadUser:
      return {
        ...state,
        isLoading: true
      };

    case DataActionTypes.LoadUserSuccess:
      return {
        ...state,
        isLoading: false,
        profile: action.payload
      };

    case DataActionTypes.LoadUserError:
      return {
        ...state,
        isLoading: false,
        profile: action.payload
      };
    case DataActionTypes.LogIn:
      return {
        ...state,
        isAuthenticated: action.payload
      };

    default:
      return state;
  }
}
