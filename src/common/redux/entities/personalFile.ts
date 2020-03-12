import { combineReducers } from 'redux';

const byId = (state = {}, action: any) => {
  if (action.reponse?.entities?.personalInfos) {
    return {
      ...state,
      ...action.reponse.entities.personalInfos
    };
  }
  return state;
};

const allIds = (state = [], action: any) => {};

const personalFileReducer = combineReducers({
  byId,
  allIds
});

export default personalFileReducer;
