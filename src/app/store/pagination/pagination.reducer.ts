import { Action, createReducer, on } from '@ngrx/store';
import { changeEntriesPerPage } from '@store/pagination/pagination.actions';

export interface PaginationState {
  entriesOptions: number[];
  selectedEntries: number;
}

export const initialState: PaginationState = {
  entriesOptions: [5, 10, 15, 25, 50],
  selectedEntries: 5,
};

const paginationReducer = createReducer(
  initialState,
  on(changeEntriesPerPage, (state, action) => ({
    ...state,
    selectedEntries: action.entries,
  })),
);

export function reducer(state: PaginationState | undefined, action: Action) {
  return paginationReducer(state, action);
}
