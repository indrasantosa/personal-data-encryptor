import { combineReducers } from 'redux';
import createPersonalInfoReducer, * as fromCreatePersonalInfoScreen from './createPersonalInfo/reducer';
import indexPersonalInfoReducer, * as fromIndexPersonalInfoScreen from './indexPersonalInfo/reducer';
import sharePersonalInfoReducer, * as fromSharePersonalInfoScreen from './sharePersonalInfo/reducer';

export interface ScreenRootState {
  createPersonalInfo: fromCreatePersonalInfoScreen.PersonalInfoCreatePageState;
  indexPersonalInfo: fromIndexPersonalInfoScreen.PersonalInfoIndexPageState;
  sharePersonalInfo: fromSharePersonalInfoScreen.PersonalInfoIndexPageState;
}

export const INITIAL_STATE: ScreenRootState = {
  createPersonalInfo: fromCreatePersonalInfoScreen.INITIAL_STATE,
  indexPersonalInfo: fromIndexPersonalInfoScreen.INITIAL_STATE,
  sharePersonalInfo: fromSharePersonalInfoScreen.INITIAL_STATE
};

export default combineReducers({
  createPersonalInfo: createPersonalInfoReducer,
  indexPersonalInfo: indexPersonalInfoReducer,
  sharePersonalInfo: sharePersonalInfoReducer
});

export const getCreatePersonalInfoState = (state: ScreenRootState) =>
  state.createPersonalInfo;
export const getIndexPersonalInfoState = (state: ScreenRootState) =>
  state.indexPersonalInfo;
export const getSharePersonalInfoState = (state: ScreenRootState) =>
  state.sharePersonalInfo;
