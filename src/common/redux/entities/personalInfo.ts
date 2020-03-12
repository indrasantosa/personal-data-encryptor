import { combineReducers } from 'redux';

export interface PersonalInfoState {
  allIds: Array<string>;
  byId: any;
}

export const INITIAL_STATE = {
  allIds: [],
  byId: {}
};

const byId = (state = INITIAL_STATE.byId, action: any) => {
  if (action.reponse?.entities?.personalInfos) {
    return {
      ...state,
      ...action.reponse.entities.personalInfos
    };
  }
  return state;
};

const allIds = (state = INITIAL_STATE.allIds, action: any) => {
  return [
    ...state,
    ...Object.keys(action.reponse?.entities?.personalInfos || {})
  ];
};

export const reducer = combineReducers({
  byId,
  allIds
});

export const getPersonalInfo = (state: PersonalInfoState, id: string) =>
  state.byId[id];

export const getAllPersonalInfo = (state: PersonalInfoState) => state.allIds;

export default reducer;
