import { Dispatch } from 'redux';
import Axios from 'axios';
import {
  CREATE_PERSONAL_INFO_REQUEST,
  CREATE_PERSONAL_INFO_SUCCESS,
  CREATE_PERSONAL_INFO_FAILURE,
  PersonalInfoForm
} from './types';
import { APIRoutes } from '../../../enums/routes';
import { push } from 'react-router-redux';

export const createPersonalInfoRequest = () => ({
  type: CREATE_PERSONAL_INFO_REQUEST
});
export const createPersonalInfoSuccess = (response: unknown) => ({
  type: CREATE_PERSONAL_INFO_SUCCESS,
  payload: response
});
export const createPersonalInfoFailure = () => ({
  type: CREATE_PERSONAL_INFO_FAILURE
});

export const createPersonalInfo = (
  personalInfoForm: PersonalInfoForm
) => async (dispatch: Dispatch) => {
  try {
    dispatch(createPersonalInfoRequest());
    const formData = new FormData();
    formData.append('label', personalInfoForm.label);
    formData.append('firstName', personalInfoForm.firstName);
    formData.append('lastName', personalInfoForm.lastName);
    formData.append('encryptionKey', personalInfoForm.encryptionKey);
    formData.append('file', personalInfoForm.file);
    const response = await Axios.post(APIRoutes.personalInfo, formData, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    });
    dispatch(createPersonalInfoSuccess(response.data));
    dispatch(push('/dashboard/personal-info'));
  } catch (e) {
    dispatch(createPersonalInfoFailure());
  }
};
