import React, { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'react-router-redux';
import { useLocation } from 'react-router-dom';
import {
  requestDecryptPersonalSharedInfo,
  requestDecryptPersonalSharedFile
} from '../../../../common/redux/screens/retrieveSharedPersonalInfo/action';
import Button from '../../../components/Button';

const PersonalInfoRetrieveShared = () => {
  const dispatch = useDispatch();
  const queryParams: any = new URLSearchParams(useLocation().search);

  const requestSharedInfo = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(
      requestDecryptPersonalSharedInfo(
        queryParams.get('shareId'),
        queryParams.get('token')
      )
    );
  };

  const requestSharedFile = (e: MouseEvent) => {
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
      <Button onClick={backToPersonalInfoList}>Back to List</Button>
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
            <Button onClick={requestSharedInfo} className={'mr-2 mb-2'}>
              Request Personal Info
            </Button>
            <Button onClick={requestSharedFile} className={'mr-2 mb-2'}>
              Download Personal File
            </Button>
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
