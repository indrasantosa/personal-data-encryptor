import { Dispatch } from 'redux';
import Axios from 'axios';
import {
  CREATE_PERSONAL_INFO_REQUEST,
  CREATE_PERSONAL_INFO_SUCCESS,
  CREATE_PERSONAL_INFO_FAILURE,
  CreatePersonalInfoPageTypes
} from './types';
import { APIRoutes } from '../../../enums/routes';

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

export const createPersonalInfo = personalInfoForm => async (
  dispatch: Dispatch
) => {
  try {
    dispatch(createPersonalInfoRequest());
    const formData = new FormData();
    formData.append('name', personalInfoForm.name);
    formData.append('file', personalInfoForm.file);
    const response = await Axios.post(APIRoutes.personalInfo, formData, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    });
    dispatch(createPersonalInfoSuccess(response.data));
  } catch (e) {
    console.log(e);
    dispatch(createPersonalInfoFailure());
  }
};
