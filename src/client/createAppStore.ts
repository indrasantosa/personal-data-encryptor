import { createStore, applyMiddleware } from 'redux';
import rootReducer, { INITIAL_STATE } from '../common/redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'react-router-redux';
import { History } from 'history';
import logger from 'redux-logger';

interface ICrateStory {
  history: History;
}

export const createAppStore = ({ history }: ICrateStory) => {
  const route = routerMiddleware(history);
  const middlewares = [ReduxThunk, route, logger];
  return createStore(
    rootReducer,
    INITIAL_STATE,
    composeWithDevTools(applyMiddleware(...middlewares))
  );
};
