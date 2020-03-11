import { combineReducers } from 'redux';

export const INITIAL_STATE = {
  allIds: [],
  byId: {}
};

const byId = (state = {}, action) => {
  switch (action.type) {
  }
};

export const reducer = combineReducers({
  byId
});

export default reducer;
