import React, {
  useState,
  SetStateAction,
  useRef,
  useEffect,
  MouseEvent,
  FormEvent
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'react-router-redux';
import DateTimePicker from 'react-datetime-picker';
import { RouteComponentProps } from 'react-router-dom';
import {
  getShareLinksInfo,
  resetSharePersonalInfo
} from '../../../../common/redux/screens/sharePersonalInfo/action';
import { getSharePersonalInfoScreenState } from '../../../../common/redux';
import { ShareType } from '../../../../common/enums/app';
import Button from '../../../components/Button';

interface PersonalInfoRetrieveSharedProps {
  infoShareId: string;
}

const PersonalInfoShare = ({
  match
}: RouteComponentProps<PersonalInfoRetrieveSharedProps>) => {
  const dispatch = useDispatch();
  const linkInputEl = useRef<HTMLInputElement>(null);

  const screenState = useSelector(getSharePersonalInfoScreenState);
  const shareLinks =
    screenState.generatedShareId &&
    screenState.generatedShareToken &&
    `${window.origin}/dashboard/retrieve-shared?shareId=${screenState.generatedShareId}&token=${screenState.generatedShareToken}`;

  const [shareType, setShareType] = useState(ShareType.onetime);
  const [expiryDate, setExpiryDate] = useState(new Date());

  const sendForm = (encryptionKey: string) => {
    dispatch(
      getShareLinksInfo(
        match.params.infoShareId,
        encryptionKey,
        shareType,
        expiryDate
      )
    );
  };

  const requestShareInfo = (e: MouseEvent) => {
    e.preventDefault();
    const encryptionKey = prompt('Enter your encryption key');
    if (encryptionKey) {
      sendForm(encryptionKey);
    }
  };

  const backToPersonalInfoList = (e: MouseEvent) => {
    dispatch(push('/dashboard/personal-info'));
  };

  useEffect(() => {
    return () => {
      dispatch(resetSharePersonalInfo());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={'w-full p-8'}>
      <Button onClick={backToPersonalInfoList}>Back to List</Button>
      <h2
        className={'text-2xl mb-6'}
      >{`Personal Info Share: ${match.params.infoShareId}`}</h2>
      <form className='w-full max-w-lg'>
        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full px-3'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='grid-first-name'
            >
              Label
            </label>
            <div className='inline-block relative w-64 mb-3 '>
              <select
                name='shareType'
                id=''
                className='appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white'
                value={shareType}
                onChange={(e: FormEvent<HTMLSelectElement>) =>
                  setShareType(
                    parseInt(e.currentTarget.value) as SetStateAction<ShareType>
                  )
                }
              >
                <option value={ShareType.onetime}>One Time</option>
                <option value={ShareType.multi}>Multi</option>
              </select>
              <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                <svg
                  className='fill-current h-4 w-4'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                >
                  <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                </svg>
              </div>
            </div>
            <p className='text-gray-600 text-xs italic'>
              One time: Can be only shared one time
            </p>
            <p className='text-gray-600 text-xs italic'>
              Multi: Can be used until expiry time
            </p>
          </div>
        </div>
        {shareType === ShareType.multi && (
          <div className='flex flex-wrap -mx-3 mb-6'>
            <div className='w-full px-3'>
              <label
                className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                htmlFor='grid-first-name'
              >
                Expiry Date
              </label>
              <div className='inline-block relative w-64 mb-3 '>
                <div className='appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white'>
                  <DateTimePicker
                    onChange={setExpiryDate}
                    value={expiryDate}
                    calendarIcon={null}
                    clearIcon={null}
                    locale={'en-SG'}
                    minDate={new Date()}
                  />
                </div>
              </div>
              <p className='text-gray-600 text-xs italic'>
                You can't use the link anymore once it passed the date
              </p>
            </div>
          </div>
        )}
        {shareLinks && (
          <div className='flex flex-wrap -mx-3 mb-6'>
            <div className='w-full px-3'>
              <label
                className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                htmlFor='grid-first-name'
              >
                Share Links
              </label>
              <div className='inline-block relative w-64 mb-3 '>
                <input
                  ref={linkInputEl}
                  className='appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
                  id='grid-first-name'
                  type='text'
                  placeholder='Share links'
                  defaultValue={shareLinks}
                  onClick={() => {
                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    linkInputEl?.current?.select();
                  }}
                />
              </div>
              <p className='text-gray-600 text-xs italic'>
                You can't use the link anymore once it passed the date
              </p>
            </div>
          </div>
        )}

        <input
          className={
            'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer'
          }
          type={'submit'}
          value={'Submit'}
          onClick={requestShareInfo}
        />
      </form>
    </div>
  );
};

export default PersonalInfoShare;
