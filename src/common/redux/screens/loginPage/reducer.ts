import {
  LoginPageTypes,
  LOGIN_API_REQUEST,
  LOGIN_API_SUCCESS,
  LOGIN_API_FAILURE,
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAILURE
} from './types';
import { FxRatesPageState } from '../fxPage/reducer';

interface Message {
  userName: string;
  password: string;
  otp: string;
}

export interface LoginPageState {
  isLoading?: boolean;
  payload?: any;
  error?: any;
  message?: Message;
  uiState?: string;
  otpCode?: string;
}

export const INITIAL_STATE: LoginPageState = {
  isLoading: false,
  payload: { hello: 'world' },
  error: undefined,
  message: {
    userName: '',
    password: '',
    otp: ''
  },
  uiState: 'login',
  otpCode: ''
};

const LoginPage = (
  state = INITIAL_STATE,
  action: LoginPageTypes
): LoginPageState => {
  switch (action.type) {
    case LOGIN_API_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: undefined
      };
    case LOGIN_API_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: action.payload.message,
        uiState: action.payload.uiState,
        otpCode: action.payload.otpCode
      };
    case LOGIN_API_FAILURE:
      return {
        ...state,
        isLoading: false,
        payload: action.payload
      };
    case VERIFY_OTP_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: undefined
      };
    case VERIFY_OTP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: action.payload.message,
        uiState: action.payload.uiState
      };
    case VERIFY_OTP_FAILURE:
      return {
        ...state,
        isLoading: false,
        payload: action.payload
      };
    default:
      return state;
  }
};

export const getRates = (state: FxRatesPageState) => state.rates;

export default LoginPage;
