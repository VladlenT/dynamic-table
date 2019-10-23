import { initialState, reducer } from '@store/table';
import { loadJSONSuccess } from '@store/table/table.actions';

describe('tableReducer', () => {
  it('should create initialState', () => {
    expect(reducer(undefined, { type: 'init' })).toEqual(initialState);
  });

  it('should set initialJSON on loadJSONSuccess', () => {
    const testData = {
      hello: 'world',
    };

    expect(reducer(initialState, loadJSONSuccess({ data: testData }))).toEqual({
      ...initialState,
      initialJSON: testData,
    });
  });
});
