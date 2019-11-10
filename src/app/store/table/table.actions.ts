import { createAction, props } from '@ngrx/store';

export const loadJSON = createAction('[Table] Load JSON', props<{ link?: string }>());
export const loadJSONSuccess = createAction('[Table] JSON Loaded Success', props<{ data: any }>());
export const loadJSONError = createAction('[Table] Load JSON Error', props<{ error: Error }>());
