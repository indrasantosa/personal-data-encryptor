import { combineReducers } from 'redux';
import createPersonalInfoReducer, {
  INITIAL_STATE as createPersonalInfoInitialState,
  PersonalInfoCreatePageState
} from './createPersonalInfo/reducer';
import indexPersonalInfoReducer, {
  INITIAL_STATE as indexPersonalInfoInitialState,
  PersonalInfoIndexPageState
} from './indexPersonalInfo/reducer';

export interface ScreenRootState {
  createPersonalInfo: PersonalInfoCreatePageState;
  indexPersonalInfo: PersonalInfoIndexPageState;
}

export const INITIAL_STATE: ScreenRootState = {
  createPersonalInfo: createPersonalInfoInitialState,
  indexPersonalInfo: indexPersonalInfoInitialState
};

export default combineReducers({
  createPersonalInfo: createPersonalInfoReducer,
  indexPersonalInfo: indexPersonalInfoReducer
});
