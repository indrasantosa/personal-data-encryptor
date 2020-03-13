import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPersonalInfo } from '../../../../common/redux/screens/createPersonalInfo/action';

const FxRates = () => {
  const dispatch = useDispatch();

  const [attachedFile, setAttachedFile] = useState(undefined);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [label, setLabel] = useState('');
  const [encryptionKey, setEncryptionKey] = useState('');

  const sendForm = e => {
    e.preventDefault();
    const data = {
      label: label,
      firstName: firstName,
      lastName: lastName,
      encryptionKey: encryptionKey,
      file: attachedFile
    };
    console.log(data);
    dispatch(createPersonalInfo(data));
  };

  return (
    <div className={'w-full p-8'}>
      <h2 className={'text-2xl mb-6'}>Create Personal Info</h2>

      <form className='w-full max-w-lg'>
        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full px-3'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='grid-first-name'
            >
              Label
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
              id='grid-first-name'
              type='text'
              placeholder='Personal info label'
              value={label}
              onChange={e => setLabel(e.target.value)}
            />
            <p className='text-gray-600 text-xs italic'>
              Label will be used to identify your information. Do not put secret
              information here
            </p>
          </div>
        </div>
        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='grid-first-name'
            >
              First Name
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
              id='grid-first-name'
              type='text'
              placeholder='First Name'
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
            <p className='text-gray-600 text-xs italic'>
              First name will be encrypted
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
              className='appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
              id='grid-last-name'
              type='text'
              placeholder='Last Name'
              onChange={e => setLastName(e.target.value)}
            />
            <p className='text-gray-600 text-xs italic'>
              Last name will be encrypted
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
              className='appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
              id='grid-password'
              type='password'
              placeholder='To be used to encrypt your data'
              onChange={e => setEncryptionKey(e.target.value)}
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
              Upload Document
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
              id='grid-password'
              type='file'
              placeholder='To be used to encrypt your data'
              onChange={e => setAttachedFile(e.target.files[0])}
            />
            <p className='text-gray-600 text-xs italic'>
              Upload your CV/file here. Don't worry it will be encrypted in our
              server
            </p>
          </div>
        </div>
        <input
          className={
            'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer'
          }
          type={'submit'}
          value={'Submit'}
          onClick={sendForm}
        />
      </form>
    </div>
  );
};

export default FxRates;
