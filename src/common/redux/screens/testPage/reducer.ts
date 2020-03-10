import {
  TestPageTypes,
  GET_TEST_API_REQUEST,
  GET_TEST_API_SUCCESS,
  GET_TEST_API_FAILURE
} from './types';

export interface TestPageState {
  isLoading?: boolean;
  payload?: any;
  error?: Error;
}

export const INITIAL_STATE: TestPageState = {
  isLoading: false,
  payload: { hello: 'wrold' },
  error: undefined
};

const TestPage = (
  state = INITIAL_STATE,
  action: TestPageTypes
): TestPageState => {
  switch (action.type) {
    case GET_TEST_API_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: undefined
      };
    case GET_TEST_API_SUCCESS:
      return {
        ...state,
        isLoading: false,
        payload: action.payload
      };
    case GET_TEST_API_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default TestPage;
