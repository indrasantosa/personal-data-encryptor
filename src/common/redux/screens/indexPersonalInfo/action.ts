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
