import { combineReducers } from 'redux';
import createPersonalInfoReducer, * as fromCreatePersonalInfoScreen from './createPersonalInfo/reducer';
import indexPersonalInfoReducer, * as fromIndexPersonalInfoScreen from './indexPersonalInfo/reducer';

export interface ScreenRootState {
  createPersonalInfo: fromCreatePersonalInfoScreen.PersonalInfoCreatePageState;
  indexPersonalInfo: fromIndexPersonalInfoScreen.PersonalInfoIndexPageState;
}

export const INITIAL_STATE: ScreenRootState = {
  createPersonalInfo: fromCreatePersonalInfoScreen.INITIAL_STATE,
  indexPersonalInfo: fromIndexPersonalInfoScreen.INITIAL_STATE
};

export default combineReducers({
  createPersonalInfo: createPersonalInfoReducer,
  indexPersonalInfo: indexPersonalInfoReducer
});

export const getCreatePersonalInfoState = (state: ScreenRootState) =>
  state.createPersonalInfo;
export const getIndexPersonalInfoState = (state: ScreenRootState) =>
  state.indexPersonalInfo;
