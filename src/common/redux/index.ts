import { combineReducers } from 'redux';
import screenReducer, {
  INITIAL_STATE as screenInitialState,
  ScreenRootState
} from './screens';
import entityReducer, * as fromEntity from './entities';

export interface ApplicationRootState {
  screens: ScreenRootState;
  entity: fromEntity.EntityState;
}

export const INITIAL_STATE: ApplicationRootState = {
  screens: screenInitialState,
  entity: fromEntity.INITIAL_STATE
};

const RootReducer = combineReducers({
  screens: screenReducer,
  entity: entityReducer
});

export const getScreenState = (state: ApplicationRootState) => state.screens;

export const getAllPersonalInfo = (state: ApplicationRootState) =>
  fromEntity.getAllPersonalInfo(state.entity);

export default RootReducer;
