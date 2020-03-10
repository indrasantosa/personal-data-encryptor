export const CFD_LIST_REQUEST = 'CFD_LIST_REQUEST';
export const CFD_LIST_SUCCESS = 'CFD_LIST_SUCCESS';
export const CFD_LIST_FAILURE = 'CFD_LIST_FAILURE';

interface ICfdListRequest {
  type: typeof CFD_LIST_REQUEST;
}

interface ICfdListSuccess {
  type: typeof CFD_LIST_SUCCESS;
  payload: unknown;
}

interface ICfdListFailure {
  type: typeof CFD_LIST_FAILURE;
}

export type CfdListPageTypes =
  | ICfdListRequest
  | ICfdListSuccess
  | ICfdListFailure;
