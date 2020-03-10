import { Dispatch } from 'redux';
import axios from 'axios';
import {
  GET_TEST_API_REQUEST,
  GET_TEST_API_SUCCESS,
  GET_TEST_API_FAILURE,
  TestPageTypes
} from './types';

const getTestApiRequest = (): TestPageTypes => ({
  type: GET_TEST_API_REQUEST
});

const getTestApiSuccess = (payload: any): TestPageTypes => ({
  type: GET_TEST_API_SUCCESS,
  payload
});

const getTestApiFailure = (error: Error): TestPageTypes => ({
  type: GET_TEST_API_FAILURE,
  error
});

export const getTestApi = () => async (dispatch: Dispatch) => {
  dispatch(getTestApiRequest());
  try {
    const response = await axios.request({
      method: 'GET',
      url: '/api/test'
    });
    dispatch(getTestApiSuccess(response));
  } catch (e) {
    dispatch(getTestApiFailure(e));
  }
};
