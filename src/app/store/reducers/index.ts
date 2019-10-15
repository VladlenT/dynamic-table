import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';

import * as fromTable from './table.reducer';
import { environment } from '@env';
import { TableState } from './table.reducer';

export interface AppState {
  table: TableState;
}

export const reducers: ActionReducerMap<AppState> = {
  table: fromTable.reducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
