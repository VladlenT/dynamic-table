import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';

import { TableEffects } from './table.effects';
import { Router } from '@angular/router';
import { TableService } from '@app/services/table.service';
import { tableActions } from '@store/table/index';
import { HttpErrorResponse } from '@angular/common/http';

describe('TableEffects', () => {
  let actions$: Observable<any>;
  let effects: TableEffects;
  let tableServiceSpy: jasmine.SpyObj<TableService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    tableServiceSpy = jasmine.createSpyObj('TableService', ['getJSON']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      providers: [
        TableEffects,
        provideMockActions(() => actions$),
        { provide: Router, useValue: routerSpy },
        { provide: TableService, useValue: tableServiceSpy },
      ],
    });
    effects = TestBed.get(TableEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadJSON$', () => {
    const testValue = { hello: 'world' };
    const testError = new HttpErrorResponse({ error: 'error message' });

    const action = tableActions.loadJSON({ link: 'test/link' });
    const successOutcome = tableActions.loadJSONSuccess({ data: testValue });
    const errorOutcome = tableActions.loadJSONError({
      error: testError,
    });

    actions$ = of(action);

    it('should dispatch loadJSONSuccess and redirect to 1st page if request is successful', () => {
      tableServiceSpy.getJSON.and.returnValue(of(testValue));

      effects.loadJSON$.subscribe(val => {
        expect(val).toEqual(successOutcome);
        expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/page/1');
      });
    });

    it('should dispatch loadJSONError if request has failed', () => {
      tableServiceSpy.getJSON.and.returnValue(throwError(testError));

      effects.loadJSON$.subscribe(val => {
        expect(val).toEqual(errorOutcome);
      });
    });
  });
});
