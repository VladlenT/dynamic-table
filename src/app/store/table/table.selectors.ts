import { AppState } from '@app/store';
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
    if (Array.isArray(table.initialJSON) && table.initialJSON.length > 0) {
      return table.initialJSON.map((e, i) => [...Object.values(e), i]);
    } else if (Object.values(table.initialJSON).length > 0) {
      return [...Object.values(table.initialJSON), 0];
    }
  },
);
