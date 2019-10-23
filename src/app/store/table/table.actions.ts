import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

export const loadJSON = createAction('[Table] Load JSON', props<{ link?: string }>());
export const loadJSONSuccess = createAction('[Table] JSON Loaded Success', props<{ data: any }>());
export const loadJSONError = createAction(
  '[Table] Load JSON Error',
  props<{ error: HttpErrorResponse }>(),
);
