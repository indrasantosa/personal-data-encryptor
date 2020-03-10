export const GET_TEST_API_REQUEST = 'GET_TEST_API_REQUEST';
export const GET_TEST_API_SUCCESS = 'GET_TEST_API_SUCCESS';
export const GET_TEST_API_FAILURE = 'GET_TEST_API_FAILURE';

interface IGetTestApiRequest {
  type: typeof GET_TEST_API_REQUEST;
}

interface IGetTestApiSuccess {
  type: typeof GET_TEST_API_SUCCESS;
  payload: any;
}

interface IGetTestApiFailure {
  type: typeof GET_TEST_API_FAILURE;
  error: Error;
}

export type TestPageTypes =
  | IGetTestApiRequest
  | IGetTestApiSuccess
  | IGetTestApiFailure;
