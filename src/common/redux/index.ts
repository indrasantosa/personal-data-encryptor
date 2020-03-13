import { combineReducers } from 'redux';
import screenReducer, * as fromScreen from './screens';
import entityReducer, * as fromEntity from './entities';

export interface ApplicationRootState {
  screens: fromScreen.ScreenRootState;
  entity: fromEntity.EntityState;
}

export const INITIAL_STATE: ApplicationRootState = {
  screens: fromScreen.INITIAL_STATE,
  entity: fromEntity.INITIAL_STATE
};

const RootReducer = combineReducers({
  screens: screenReducer,
  entity: entityReducer
});

export const getEntityPersonalInfo = (state: ApplicationRootState) =>
  fromEntity.getEntityPersonalInfo(state.entity);

export const getIndexPersonalInfoScreenState = (state: ApplicationRootState) =>
  fromScreen.getIndexPersonalInfoState(state.screens);
export const getCreatePersonalInfoScreenState = (state: ApplicationRootState) =>
  fromScreen.getCreatePersonalInfoState(state.screens);
export const getSharePersonalInfoScreenState = (state: ApplicationRootState) =>
  fromScreen.getSharePersonalInfoState(state.screens);

export default RootReducer;
