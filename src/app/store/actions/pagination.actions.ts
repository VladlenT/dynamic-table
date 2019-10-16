import { createAction, props } from '@ngrx/store';

export const changeEntriesPerPage = createAction(
  '[Pagination] Change Entries Per Page',
  props<{ entries: number }>(),
);
