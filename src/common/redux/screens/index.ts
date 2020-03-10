import { combineReducers } from 'redux';

import testPageReducer, {
  INITIAL_STATE as testPageInitialState,
  TestPageState
} from './testPage/reducer';
import loginPageReducer, {
  INITIAL_STATE as loginPageInitialState,
  LoginPageState
} from './loginPage/reducer';
import fxRatesPageReducer, {
  INITIAL_STATE as fxRatesPageInitialState,
  FxRatesPageState
} from './fxPage/reducer';
import cfdReportPageReducer, {
  INITIAL_STATE as cfdPageInitialState,
  CfdReportPageState
} from './cfdPage/reducer';

export interface ScreenRootState {
  testPage: TestPageState;
  loginPage: LoginPageState;
  fxRatesPage: FxRatesPageState;
  cfdReportPage: CfdReportPageState;
}

export const INITIAL_STATE: ScreenRootState = {
  testPage: testPageInitialState,
  loginPage: loginPageInitialState,
  fxRatesPage: fxRatesPageInitialState,
  cfdReportPage: cfdPageInitialState
};

export default combineReducers({
  testPage: testPageReducer,
  loginPage: loginPageReducer,
  fxRatesPage: fxRatesPageReducer,
  cfdReportPage: cfdReportPageReducer
});

export const getFxRatesPage = (state: ScreenRootState) => state.fxRatesPage;
export const getCfdReportPage = (state: ScreenRootState) => state.cfdReportPage;
