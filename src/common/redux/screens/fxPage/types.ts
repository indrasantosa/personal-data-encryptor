export const FX_LIST_REQUEST = 'FX_LIST_REQUEST';
export const FX_LIST_SUCCESS = 'FX_LIST_SUCCESS';
export const FX_LIST_FAILURE = 'FX_LIST_FAILURE';

interface IFxListRequest {
  type: typeof FX_LIST_REQUEST;
}

interface IFxListSuccess {
  type: typeof FX_LIST_SUCCESS;
  payload: any;
}

interface IFxListFailure {
  type: typeof FX_LIST_FAILURE;
}

export type FxRatesPageTypes = IFxListRequest | IFxListSuccess | IFxListFailure;
