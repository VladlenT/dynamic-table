import { createAction, props } from '@ngrx/store';

export const loadJSON = createAction('[Table] Load JSON', props<{ table: any }>());
