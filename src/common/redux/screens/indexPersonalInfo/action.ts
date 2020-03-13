import { Dispatch } from 'redux';
import Axios from 'axios';
import { normalize } from 'normalizr';
import {
  LIST_PERSONAL_INFO_REQUEST,
  LIST_PERSONAL_INFO_SUCCESS,
  LIST_PERSONAL_INFO_FAILURE
} from './types';
import { personalInfo } from '../../entities/schema';
import { APIRoutes } from '../../../enums/routes';

export const getPersonalInfoRequest = () => ({
  type: LIST_PERSONAL_INFO_REQUEST
});
export const getPersonalInfoSuccess = (response: unknown) => ({
  type: LIST_PERSONAL_INFO_SUCCESS,
  response: normalize(response, { result: [personalInfo] })
});
export const getPersonalInfoFailure = () => ({
  type: LIST_PERSONAL_INFO_FAILURE
});

export const getPersonalInfo = ({ page = 1 }: { page: number }) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch(getPersonalInfoRequest());
    const response = await Axios.get(APIRoutes.personalInfo, {
      params: {
        page
      }
    });
    dispatch(getPersonalInfoSuccess(response.data));
  } catch (e) {
    console.log(e);
    dispatch(getPersonalInfoFailure());
  }
};

export const requestDecryptPersonalFile = (
  infoId: string,
  encryptionKey: string,
  fileName: string
) => async (dispatch: Dispatch) => {
  const response = await Axios.post(
    `${APIRoutes.personalInfo}/${infoId}/file`,
    {
      encryptionKey
    },
    { responseType: 'blob' }
  );
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName); //or any other extension
  document.body.appendChild(link);
  link.click();
};

export const requestDecryptPersonalInfo = (
  infoId: string,
  encryptionKey: string
) => async (dispatch: Dispatch) => {
  try {
    const response = await Axios.post(
      `${APIRoutes.personalInfo}/${infoId}/retrieve`,
      {
        encryptionKey
      }
    );
    alert(JSON.stringify(response.data.data.secret));
  } catch (e) {
    alert(e);
  }
};
