import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { TableEffects } from './table.effects';

describe('AppEffects', () => {
  let actions$: Observable<any>;
  let effects: TableEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TableEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.get<TableEffects>(TableEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
