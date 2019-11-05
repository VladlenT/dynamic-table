import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { environment } from '@env';
import { TableState } from '@store/table';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import * as fromTable from './table';

export interface AppState {
  table: TableState;
  router: RouterReducerState;
}

export const reducers: ActionReducerMap<AppState> = {
  table: fromTable.reducer,
  router: routerReducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
