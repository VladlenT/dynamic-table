import { selectTable, selectTableBody, selectTableHead } from '@store/table/table.selectors';
import { AppState } from '@app/store';
import { MockState } from '@app/testing/MockState';
import { initialState as tableInitialState, TableState } from '@store/table';

describe('tableSelectors', () => {
  const state: AppState = MockState;
  const testObj: TableState = {
    initialJSON: {
      prop1: 'value1',
      prop2: 'value2',
    },
  };
  const testArr = {
    initialJSON: [
      {
        prop1: 'value1',
        prop2: 'value2',
      },
      {
        prop3: 'value3',
        prop4: 'value4',
      },
    ],
  };

  describe('selectTable', () => {
    it('should select TableState from store', () => {
      expect(selectTable(state)).toEqual(tableInitialState);
    });
  });

  describe('selectTableHead', () => {
    it('should select table heading if initialJSON is an object', () => {
      expect(selectTableHead.projector(testObj)).toEqual(
        Object.keys(testObj.initialJSON),
        'failed to select head from obj',
      );
    });

    it('should select table heading if initialJSON is an array', () => {
      expect(selectTableHead.projector(testArr)).toEqual(
        Object.keys(testArr.initialJSON[0]),
        'failed to select head from array',
      );
    });
  });

  describe('selectTableBody', () => {
    it('should select table body if initialJSON is an object', () => {
      expect(selectTableBody.projector(testObj)).toEqual(
        Object.values(testObj.initialJSON),
        'failed to select table body from object',
      );
    });

    it('should select table body if initialJSON is an array', () => {
      expect(selectTableBody.projector(testArr)).toEqual(
        testArr.initialJSON.map(e => Object.values(e), 'failed to select table body from array'),
      );
    });
  });
});
