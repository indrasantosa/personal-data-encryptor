import { combineReducers } from 'redux';
// import personalFileReducer from './personalFile';
import personalInfoReducer, * as fromPersonalInfo from './personalInfo';

export interface EntityState {
  personalInfo: fromPersonalInfo.PersonalInfoState;
}

export const INITIAL_STATE = {
  personalInfo: fromPersonalInfo.INITIAL_STATE
};

export default combineReducers({
  // personalFile: personalFileReducer,
  personalInfo: personalInfoReducer
});

export const getEntityPersonalInfo = (state: EntityState) => state.personalInfo;
