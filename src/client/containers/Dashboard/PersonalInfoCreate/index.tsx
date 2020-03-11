import React, { useEffect, useState } from 'react';
import { useDispatch, useStore, useSelector } from 'react-redux';
import { getFxRates } from '../../../../common/redux/screens/fxPage/action';
import { ApplicationRootState, getScreenState } from '../../../../common/redux';
import { getRates } from '../../../../common/redux/screens/loginPage/reducer';
import { getFxRatesPage } from '../../../../common/redux/screens';
import { FxModel } from '../../../../common/redux/screens/fxPage/reducer';
import { createPersonalInfo } from '../../../../common/redux/screens/createPersonalInfo/action';

const FxRates = () => {
  const dispatch = useDispatch();

  const [attachedFile, setAttachedFile] = useState(undefined);
  const [name, setName] = useState('');

  const sendForm = e => {
    e.preventDefault();
    const data = {
      label: 'label1',
      firstName: name,
      lastName: 'lastname',
      encryptionKey: 'key',
      file: attachedFile
    };
    console.log(data);
    dispatch(createPersonalInfo(data));
  };

  return (
    <div className={'w-full p-8'}>
      <h2 className={'text-2xl'}>Create Personal Info</h2>

      <form className='w-full max-w-lg'>
        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='grid-first-name'
            >
              First Name
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
              id='grid-first-name'
              type='text'
              placeholder='Jane'
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <p className='text-red-500 text-xs italic'>
              Please fill out this field.
            </p>
          </div>
          <div className='w-full md:w-1/2 px-3'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='grid-last-name'
            >
              Last Name
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='grid-last-name'
              type='text'
              placeholder='Doe'
            />
          </div>
        </div>
        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full px-3'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='grid-password'
            >
              Encryption key
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='grid-password'
              type='password'
              placeholder='To be used to encrypt your data'
            />
            <p className='text-gray-600 text-xs italic'>
              Do not lose the key else you won't be able to access/share your
              data
            </p>
          </div>
        </div>
        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full px-3'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='grid-password'
            >
              Encryption key
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='grid-password'
              type='file'
              placeholder='To be used to encrypt your data'
              onChange={e => setAttachedFile(e.target.files[0])}
            />
            <p className='text-gray-600 text-xs italic'>
              Do not lose the key else you won't be able to access/share your
              data
            </p>
          </div>
        </div>
        <input type={'submit'} value={'Submit'} onClick={sendForm} />
      </form>
    </div>
  );
};

export default FxRates;
