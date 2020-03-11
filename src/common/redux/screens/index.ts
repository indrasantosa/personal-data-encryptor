import { combineReducers } from 'redux';

export interface ScreenRootState {}

export const INITIAL_STATE: ScreenRootState = {};

export default combineReducers({});

export const getFxRatesPage = (state: ScreenRootState) => state;
export const getCfdReportPage = (state: ScreenRootState) => state;
