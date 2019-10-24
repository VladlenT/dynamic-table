import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';

import { TableEffects } from './table.effects';
import { Router } from '@angular/router';
import { TableService } from '@app/services/table.service';
import { tableActions } from '@store/table/index';

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
    it('should load JSON to store if request is successful', () => {
      const testValue = { hello: 'world' };
      const action = tableActions.loadJSON({ link: 'test/link' });
      const successOutcome = tableActions.loadJSONSuccess({ data: testValue });

      actions$ = of(action);

      tableServiceSpy.getJSON.and.returnValue(of(testValue));

      effects.loadJSON$.subscribe(val => {
        expect(val).toEqual(successOutcome);
        expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/page/1');
      });
    });
  });
});
