import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTestApi } from '../../../common/redux/screens/testPage/action';
import { ApplicationRootState } from '../../../common/redux';

const Login = () => {
  const dispatch = useDispatch();
  const requestTestApi = () => {
    dispatch(getTestApi());
  };
  const getResponse = useSelector(
    (state: ApplicationRootState) => state.screens.testPage.payload
  );
  const stringifiedResponse = JSON.stringify(getResponse);
  return (
    <div className='flex-1 items-center flex'>
      <div className='w-full max-w-xs mx-auto'>
        <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
          <div className='mb-6'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='password'
            >
              Response
            </label>
            <textarea
              value={stringifiedResponse}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline h-12'
            ></textarea>
          </div>
          <div className='flex items-center justify-between'>
            <button
              onClick={requestTestApi}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              type='button'
            >
              Fetch data
            </button>
          </div>
        </form>
        <p className='text-center text-gray-500 text-xs'>
          &copy;2020 Kynec All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
