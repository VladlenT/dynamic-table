import { Action, createReducer, on } from '@ngrx/store';
import { loadJSONSuccess } from '@store/table/table.actions';

export interface TableState {
  initialJSON: object[] | {};
}

export const initialState: TableState = {
  initialJSON: {},
};

const tableReducer = createReducer(
  initialState,
  on(loadJSONSuccess, (state, action) => ({ ...state, initialJSON: action.data })),
);

export function reducer(state: TableState | undefined, action: Action) {
  return tableReducer(state, action);
}
