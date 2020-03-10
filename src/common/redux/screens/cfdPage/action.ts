import { Dispatch } from 'redux';
import Axios from 'axios';
import { CFD_LIST_REQUEST, CFD_LIST_FAILURE, CFD_LIST_SUCCESS } from './types';
import { APIRoutes } from '../../../enums/routes';

export const cfdListRequest = () => ({
  type: CFD_LIST_REQUEST
});
export const cfdListSuccess = (response: unknown) => ({
  type: CFD_LIST_SUCCESS,
  payload: response
});
export const cfdListFailure = () => ({
  type: CFD_LIST_FAILURE
});

export const getCfdData = (currency: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(cfdListRequest());
    const response = await Axios.get(APIRoutes.cfdList, {
      params: {
        currency
      }
    });
    dispatch(cfdListSuccess(response.data));
  } catch (e) {
    console.log(e);
    dispatch(cfdListFailure());
  }
};
