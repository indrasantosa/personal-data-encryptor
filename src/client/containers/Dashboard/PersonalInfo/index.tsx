import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPersonalInfo,
  requestDecryptPersonalInfo,
  requestDecryptPersonalFile
} from '../../../../common/redux/screens/indexPersonalInfo/action';
import * as fromState from '../../../../common/redux';
import { push } from 'react-router-redux';

const PersonalInfo = () => {
  const dispatch = useDispatch();
  const screenState = useSelector(fromState.getIndexPersonalInfoScreenState);
  const personalInfos = useSelector(fromState.getEntityPersonalInfo);

  const fetchInitialData = (page = 1) => {
    dispatch(getPersonalInfo({ page }));
  };
  const requestDecryptFile = (personalInfoId: string) => e => {
    e.preventDefault();
    const input = window.prompt('Please enter your encryption key');
    if (input) {
      dispatch(requestDecryptPersonalFile(personalInfoId, input));
    }
  };
  const requestDecryptInfo = (personalInfoId: string) => e => {
    e.preventDefault();
    const input = window.prompt('Please enter your encryption key');
    if (input) {
      dispatch(requestDecryptPersonalInfo(personalInfoId, input));
    }
  };
  const goToSharePage = (personalInfoId: string) => e => {
    dispatch(push(`/dashboard/personal-info/${personalInfoId}/share`));
  };

  useEffect(() => {
    fetchInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={'w-full p-4'}>
      <h2 className={'text-2xl'}>Personal Info</h2>
      <table className={'w-full text-gray-700'}>
        <thead>
          <tr>
            <th className={'border-gray-500 border p-2'}>id</th>
            <th className={'border-gray-500 border p-2'}>Label</th>
            <th className={'border-gray-500 border p-2'}>File Name</th>
            <th className={'border-gray-500 border p-2'}>Create Date</th>
            <th className={'border-gray-500 border p-2'}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {screenState.personalInfos.length === 0 && (
            <tr>
              <td
                colSpan={5}
                className={'border-gray-500 border p-2 text-center'}
              >
                {screenState.isLoading
                  ? 'Loading Date ...'
                  : 'There is no result'}
              </td>
            </tr>
          )}
          {screenState.personalInfos.map((entityId: string) => {
            const currentInfo = personalInfos.byId[entityId];
            return (
              <tr key={currentInfo.id}>
                <td className={'border-gray-500 border p-2'}>
                  {currentInfo.id}
                </td>
                <td className={'border-gray-500 border p-2'}>
                  {currentInfo.label}
                </td>
                <td className={'border-gray-500 border p-2'}>
                  {currentInfo.file.fileName}
                </td>
                <td className={'border-gray-500 border p-2'}>
                  {currentInfo.createDate}
                </td>
                <td className={'border-gray-500 border p-2'}>
                  <button
                    className={
                      'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer mr-2 mb-2'
                    }
                    onClick={requestDecryptInfo(currentInfo.id)}
                  >
                    Decrypt Data
                  </button>
                  <button
                    className={
                      'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer mr-2 mb-2'
                    }
                    onClick={requestDecryptFile(currentInfo.id)}
                  >
                    Decrypt File
                  </button>
                  <button
                    className={
                      'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer'
                    }
                    onClick={goToSharePage(currentInfo.id)}
                  >
                    Share info
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PersonalInfo;
