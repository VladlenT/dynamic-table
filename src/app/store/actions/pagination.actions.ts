import { createAction, props } from '@ngrx/store';

export const getTableData = createAction('[Table] Get Table Data', props<{ link: string }>());
