import { Dispatch } from 'redux';
import { push } from 'react-router-redux';
import {
  LoginPageTypes,
  LOGIN_API_REQUEST,
  LOGIN_API_SUCCESS,
  LOGIN_API_FAILURE,
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAILURE
} from './types';
import { ApplicationRootState } from '../../../redux';

import { useDispatch, useSelector } from 'react-redux';
const loginApiRequest = (): LoginPageTypes => ({
  type: LOGIN_API_REQUEST
});

const loginApiSuccess = (payload: any): LoginPageTypes => ({
  type: LOGIN_API_SUCCESS,
  payload
});

const loginApiFailure = (error: Error, payload: any): LoginPageTypes => ({
  type: LOGIN_API_FAILURE,
  error,
  payload
});

const verifyOTPRequest = (): LoginPageTypes => ({
  type: VERIFY_OTP_REQUEST
});

const verifyOTPSuccess = (payload: any): LoginPageTypes => ({
  type: VERIFY_OTP_SUCCESS,
  payload
});

const verifyOTPFailure = (error: Error, payload: any): LoginPageTypes => ({
  type: VERIFY_OTP_FAILURE,
  error,
  payload
});

interface MockLogin {
  userName: string;
  password: string;
}

export const loginApi = ({ userName, password }: MockLogin) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch(loginApiRequest());

    setTimeout(() => {
      if (userName === 'admin' && password === 'admin') {
        // Handle success
        const errorMessage = {
          userName: '',
          password: ''
        };
        const uiState = 'otp';
        const otpCode = Math.floor(100000 + Math.random() * 900000);
        dispatch(
          loginApiSuccess({
            message: errorMessage,
            uiState,
            otpCode
          })
        );
        window.alert(otpCode);
      } else {
        const response = {
          userName: '',
          password: 'The username or password you have entered is invalid.'
        };
        dispatch(loginApiSuccess({ message: response, uiState: 'login' }));
        // throw new Error('Username and password should be "admin" and "admin"');
      }
    }, 1000);
  } catch (e) {
    // Handle error
    const response = 'Test';
    dispatch(loginApiFailure(e, { message: response }));
  }
  dispatch(loginApiRequest());
};

export const verifyOTP = (otpInput: string, otpCode: string) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch(verifyOTPRequest());

    setTimeout(() => {
      if (otpInput === otpCode.toString()) {
        // Handle success
        const errorMessage = {
          userName: '',
          password: '',
          otp: ''
        };
        dispatch(
          verifyOTPSuccess({
            message: errorMessage,
            otpCode
          })
        );
        window.alert('OTP Verification Successful');
        dispatch(push('/dashboard/fx-rates'));
      } else {
        const response = {
          otp: 'The OTP you entered is not matched'
        };
        dispatch(verifyOTPSuccess({ message: response }));
        // throw new Error('Username and password should be "admin" and "admin"');
      }
    }, 1000);
  } catch (e) {
    // Handle error
    const response = 'Test';
    dispatch(loginApiFailure(e, { message: response }));
  }
  dispatch(loginApiRequest());
};
