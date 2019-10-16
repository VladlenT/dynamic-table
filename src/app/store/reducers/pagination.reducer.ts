import { Action, createReducer, on } from '@ngrx/store';
import { paginationActions } from '@store/actions';

export interface PaginationState {
  entriesOptions: number[];
  selectedEntries: number;
}

const paginationInitialState: PaginationState = {
  entriesOptions: [5, 10, 15, 25, 50],
  selectedEntries: 5,
};

const paginationReducer = createReducer(
  paginationInitialState,
  on(paginationActions.changeEntriesPerPage, (state, action) => ({
    ...state,
    selectedEntries: action.entries,
  })),
);

export function reducer(state: PaginationState | undefined, action: Action) {
  return paginationReducer(state, action);
}
