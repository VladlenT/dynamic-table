import { initialState, reducer } from '@store/pagination/index';
import { changeEntriesPerPage } from '@store/pagination/pagination.actions';

describe('paginationReducer', () => {
  it('should create initialState', () => {
    expect(reducer(undefined, { type: 'init' })).toEqual(initialState);
  });

  it('should change entries per page on according action', () => {
    const entries = 25;
    expect(reducer(initialState, changeEntriesPerPage({ entries }))).toEqual({
      ...initialState,
      selectedEntries: entries,
    });
  });
});
