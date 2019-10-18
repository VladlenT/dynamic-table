import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

import { tableActions } from '@store/actions';
import { TableService } from '@app/services/table.service';

@Injectable()
export class AppEffects {
  loadJSON$ = createEffect(() =>
    this.actions$.pipe(
      ofType(tableActions.loadJSON),
      mergeMap(action =>
        this.tableService.getJSON(action.link).pipe(
          map(data => {
            this.router.navigateByUrl('/page/1');
            return tableActions.loadJSONSuccess({ data });
          }),
          catchError(error => of(tableActions.loadJSONError({ error }))),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private tableService: TableService,
    private router: Router,
  ) {}
}
