import { combineReducers } from 'redux';
import { EncryptedPersonalInfo } from '../screens/indexPersonalInfo/reducer';

export interface PersonalInfoState {
  allIds: Array<string>;
  byId: {
    [key: string]: EncryptedPersonalInfo;
  };
}

export const INITIAL_STATE = {
  allIds: [],
  byId: {}
};

const byId = (state = INITIAL_STATE.byId, action: any) => {
  if (action.response?.entities?.personalInfos) {
    return {
      ...state,
      ...action.response.entities.personalInfos
    };
  }
  return state;
};

const allIds = (state = INITIAL_STATE.allIds, action: any) => {
  return [
    ...state,
    ...Object.keys(action.response?.entities?.personalInfos || {})
  ];
};

export const reducer = combineReducers({
  byId,
  allIds
});

export default reducer;
