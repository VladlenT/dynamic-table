import { AppState } from '@store/reducers';
import { createSelector } from '@ngrx/store';

export const selectTable = (state: AppState) => state.table;

export const selectTableHead = createSelector(
  selectTable,
  table => {
    if (Array.isArray(table.initialJSON)) {
      return Object.keys(table.initialJSON[0]);
    } else {
      return Object.keys(table.initialJSON);
    }
  },
);

export const selectTableBody = createSelector(
  selectTable,
  table => {
    if (Array.isArray(table.initialJSON)) {
      return table.initialJSON.map(e => Object.values(e));
    } else {
      return Object.values(table.initialJSON);
    }
  },
);
