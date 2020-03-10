import React, { useState } from 'react';
import LoginForm from '../../components/LoginForm';
import OTPForm from '../../components/OTPForm';
import {
  loginApi,
  verifyOTP
} from '../../../common/redux/screens/loginPage/action';
import { ApplicationRootState } from '../../../common/redux';

import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
  const dispatch = useDispatch();

  const message = useSelector(
    (state: ApplicationRootState) => state.screens.loginPage.message
  );
  const isLoading = useSelector(
    (state: ApplicationRootState) => state.screens.loginPage.isLoading
  );
  const uiState = useSelector(
    (state: ApplicationRootState) => state.screens.loginPage.uiState
  );
  const otpCode = useSelector(
    (state: ApplicationRootState) => state.screens.loginPage.otpCode
  );

  interface MockLogin {
    userName: string;
    password: string;
  }

  const mockLogin = async ({ userName, password }: MockLogin) => {
    dispatch(loginApi({ userName, password }));
  };
  const handleSubmitOTP = async (otpInput: string, otpCode: string) => {
    dispatch(verifyOTP(otpInput, otpCode));
    // dispatch(loginApi({userName, password}))
  };
  return (
    <div className='flex-1 items-center flex bg-indigo-200'>
      <div className='w-full max-w-xs mx-auto object-center'>
        <div className={'items-center text-center'}>Kynec</div>
        {uiState === 'login' ? (
          <LoginForm
            onSubmit={mockLogin}
            errorMessage={message!}
            isSubmitting={isLoading!}
          />
        ) : (
          <OTPForm
            onSubmit={handleSubmitOTP}
            errorMessage={message!}
            isSubmitting={isLoading!}
            otpCode={otpCode!}
          />
        )}
        <p className='text-center text-gray-500 text-xs'>
          <div className={'items-center text-center'}>
            By signing in you agree to the following{' '}
            <a href={'#'} className={'font-extrabold'}>
              terms & condition
            </a>
          </div>
        </p>
      </div>
    </div>
  );
};

export default Login;
