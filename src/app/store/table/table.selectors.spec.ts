import {
  selectInitialJSON,
  selectTable,
  selectTableBody,
  selectTableHead,
} from '@store/table/table.selectors';
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

  describe('selectInitialJSON', () => {
    it('should select initialJSON from table store', () => {
      expect(selectInitialJSON.projector(testObj)).toEqual(testObj.initialJSON);
    });
  });

  describe('selectTableHead', () => {
    it('should select table heading if initialJSON is an object', () => {
      expect(selectTableHead.projector(testObj.initialJSON)).toEqual(
        Object.keys(testObj.initialJSON),
        'failed to select head from obj',
      );
    });

    it('should select table heading if initialJSON is an array', () => {
      expect(selectTableHead.projector(testArr.initialJSON)).toEqual(
        Object.keys(testArr.initialJSON[0]),
        'failed to select head from array',
      );
    });

    it('should return empty array if json is empty', () => {
      expect(selectTableHead.projector({})).toEqual([]);
      expect(selectTableHead.projector([])).toEqual([]);
    });
  });

  describe('selectTableBody', () => {
    it('should select table body if initialJSON is an object', () => {
      expect(selectTableBody.projector(testObj.initialJSON)).toEqual(
        [...Object.values(testObj.initialJSON), 0],
        'failed to select table body from object',
      );
    });

    it('should select table body if initialJSON is an array', () => {
      expect(selectTableBody.projector(testArr.initialJSON)).toEqual(
        testArr.initialJSON.map(
          (e, i) => [...Object.values(e), i],
          'failed to select table body from array',
        ),
      );
    });

    it('should return empty array if json is empty', () => {
      expect(selectTableBody.projector({})).toEqual([]);
      expect(selectTableBody.projector([])).toEqual([]);
    });
  });
});
