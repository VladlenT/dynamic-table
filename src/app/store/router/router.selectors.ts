import { createFeatureSelector } from '@ngrx/store';
import { AppState } from '@app/store';
import { getSelectors, RouterReducerState } from '@ngrx/router-store';

const selectRouter = createFeatureSelector<AppState, RouterReducerState<any>>('router');

const {
  selectQueryParams, // select the current route query params
  selectQueryParam, // factory function to select a query param
  selectRouteParams, // select the current route params
  selectRouteParam, // factory function to select a route param
  selectRouteData, // select the current route data
  selectUrl, // select the current url
} = getSelectors(selectRouter);

export const selectRoutePage = selectRouteParam('page');
