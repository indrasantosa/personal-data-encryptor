import { combineReducers } from 'redux';
import screenReducer, {
  INITIAL_STATE as screenInitialState,
  ScreenRootState
} from './screens';

export interface ApplicationRootState {
  screens: ScreenRootState;
}

export const INITIAL_STATE: ApplicationRootState = {
  screens: screenInitialState
};

const RootReducer = combineReducers({
  screens: screenReducer
});

export const getScreenState = (state: ApplicationRootState) => state.screens;

export default RootReducer;
