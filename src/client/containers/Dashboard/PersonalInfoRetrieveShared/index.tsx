import React from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'react-router-redux';
import { useLocation } from 'react-router-dom';
import {
  requestDecryptPersonalSharedInfo,
  requestDecryptPersonalSharedFile
} from '../../../../common/redux/screens/retrieveSharedPersonalInfo/action';

const PersonalInfoRetrieveShared = ({ match }) => {
  console.log(match);
  const dispatch = useDispatch();
  const queryParams: any = new URLSearchParams(useLocation().search);

  const requestSharedInfo = e => {
    e.preventDefault();
    dispatch(
      requestDecryptPersonalSharedInfo(
        queryParams.get('shareId'),
        queryParams.get('token')
      )
    );
  };

  const requestSharedFile = e => {
    e.preventDefault();
    dispatch(
      requestDecryptPersonalSharedFile(
        queryParams.get('shareId'),
        queryParams.get('token')
      )
    );
  };

  const backToPersonalInfoList = () => {
    dispatch(push('/dashboard/personal-info'));
  };

  return (
    <div className={'w-full p-8'}>
      <button
        className={
          'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer mr-2 mb-2'
        }
        onClick={backToPersonalInfoList}
      >
        Back to List
      </button>
      <h2
        className={'text-2xl mb-6'}
      >{`Get Shared Personal info: ${queryParams.get('shareId')}`}</h2>
      <form className='w-full max-w-lg'>
        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full px-3'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='grid-first-name'
            >
              Get shared documents
            </label>
            <button
              className={
                'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer mr-2 mb-2'
              }
              onClick={requestSharedInfo}
            >
              Request Personal Info
            </button>

            <button
              className={
                'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer  mr-2 mb-2'
              }
              onClick={requestSharedFile}
            >
              Download Personal File
            </button>
            <p className='text-gray-600 text-xs italic'>
              Depends on the share type, your request may be rejected
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfoRetrieveShared;
