import { Action, createReducer, on } from '@ngrx/store';
import { tableActions } from '@store/actions';

export interface TableState {
  initialJSON: {} | any[];
}

const tableInitialState: TableState = {
  initialJSON: {},
};

const tableReducer = createReducer(
  tableInitialState,
  on(tableActions.loadJSONSuccess, (state, action) => ({ ...state, initialJSON: action.data })),
);

export function reducer(state: TableState | undefined, action: Action) {
  return tableReducer(state, action);
}
