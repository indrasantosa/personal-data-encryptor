import { Dispatch } from 'redux';
import Axios from 'axios';
import {
  FX_LIST_REQUEST,
  FX_LIST_FAILURE,
  FX_LIST_SUCCESS,
  FxRatesPageTypes
} from './types';
import { APIRoutes } from '../../../enums/routes';

export const fxListRequest = () => ({
  type: FX_LIST_REQUEST
});
export const fxListSuccess = (response: unknown) => ({
  type: FX_LIST_SUCCESS,
  payload: response
});
export const fxListFailure = () => ({
  type: FX_LIST_FAILURE
});

export const getFxRates = (page = 1) => async (dispatch: Dispatch) => {
  try {
    dispatch(fxListRequest());
    const response = await Axios.get(APIRoutes.fxList, {
      params: {
        page
      }
    });
    dispatch(fxListSuccess(response.data));
  } catch (e) {
    console.log(e);
    dispatch(fxListFailure());
  }
};
