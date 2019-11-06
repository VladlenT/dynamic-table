import { AppState } from '@app/store';
import { createSelector } from '@ngrx/store';

export const selectTable = (state: AppState) => state.table;

export const selectInitialJSON = createSelector(
  selectTable,
  table => table.initialJSON,
);

export const selectTableHead = createSelector(
  selectInitialJSON,
  json => {
    if (Array.isArray(json) && json.length > 0) {
      return Object.keys(json[0]);
    } else {
      return Object.keys(json);
    }
  },
);

export const selectTableBody = createSelector(
  selectInitialJSON,
  json => {
    if (Array.isArray(json) && json.length > 0) {
      return json.map((e, i) => [...Object.values(e), i]);
    } else {
      const tbody = Object.values(json);
      return tbody.length > 0 ? [...tbody, 0] : [];
    }
  },
);
