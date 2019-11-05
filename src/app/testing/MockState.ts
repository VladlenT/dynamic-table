import { initialState as tableInitialState } from '@store/table';
import { AppState } from '@app/store';

export const MockState: AppState = {
  table: tableInitialState,
  router: undefined,
};
