import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { environment } from '@env';
import { TableState } from '@store/table';
import { PaginationState } from '@store/pagination';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import * as fromTable from './table';
import * as fromPagination from './pagination';

export interface AppState {
  table: TableState;
  pagination: PaginationState;
  router: RouterReducerState;
}

export const reducers: ActionReducerMap<AppState> = {
  table: fromTable.reducer,
  pagination: fromPagination.reducer,
  router: routerReducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
