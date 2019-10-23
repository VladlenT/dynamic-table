import { initialState as tableInitialState } from '@store/table';
import { initialState as paginationInitialState } from '@store/pagination';
import { AppState } from '@app/store';

export const MockState: AppState = {
  table: tableInitialState,
  pagination: paginationInitialState,
  router: undefined,
};
