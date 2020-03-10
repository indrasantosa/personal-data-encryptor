
export const LOGIN_API_REQUEST = 'LOGIN_API_REQUEST';
export const LOGIN_API_SUCCESS = 'LOGIN_API_SUCCESS';
export const LOGIN_API_FAILURE = 'LOGIN_API_FAILURE';
export const VERIFY_OTP_REQUEST = 'VERIFY_OTP_REQUEST';
export const VERIFY_OTP_FAILURE = 'VERIFY_OTP_FAILURE';
export const VERIFY_OTP_SUCCESS = 'VERIFY_OTP_SUCCESS';

interface ILoginApiRequest {
  type: typeof LOGIN_API_REQUEST;
}

interface ILoginApiSuccess {
  type: typeof LOGIN_API_SUCCESS;
  payload: any;
}

interface ILoginApiFailure {
  type: typeof LOGIN_API_FAILURE;
  error: Error;
  payload: any;
}

interface IVerifyOTPRequest {
  type: typeof VERIFY_OTP_REQUEST;
}

interface IVerifyOTPSuccess {
  type: typeof VERIFY_OTP_SUCCESS;
  payload: any;
}

interface IVerifyOTPFailure {
  type: typeof VERIFY_OTP_FAILURE;
  error: Error;
  payload: any;
}

export type LoginPageTypes =
  | ILoginApiRequest
  | ILoginApiSuccess
  | ILoginApiFailure
  | IVerifyOTPRequest
  | IVerifyOTPSuccess
  | IVerifyOTPFailure;
