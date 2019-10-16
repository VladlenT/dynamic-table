import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';

import { environment } from '@env';
import { TableState } from './table.reducer';
import { PaginationState } from '@store/reducers/pagination.reducer';

import * as fromTable from './table.reducer';
import * as fromPagination from './pagination.reducer';

export interface AppState {
  table: TableState;
  pagination: PaginationState;
}

export const reducers: ActionReducerMap<AppState> = {
  table: fromTable.reducer,
  pagination: fromPagination.reducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
