import { Dispatch } from 'redux';
import Axios from 'axios';
import { ShareType } from '../../../enums/app';
import {
  SHARE_PERSONAL_INFO_REQUEST,
  SHARE_PERSONAL_INFO_SUCCESS,
  SHARE_PERSONAL_INFO_FAILURE,
  RESET_SHARE_PERSONAL_INFO
} from './types';

export const sharePersonalInfoRequest = () => {
  return {
    type: SHARE_PERSONAL_INFO_REQUEST
  };
};

export const sharePersonalInfoSuccess = (response: any) => {
  return {
    type: SHARE_PERSONAL_INFO_SUCCESS,
    response: {
      encryptionKey: response.data.shareToken,
      shareId: response.data.shareId
    }
  };
};

export const sharePersonalInfoFailure = () => {
  return {
    type: SHARE_PERSONAL_INFO_FAILURE
  };
};

export const resetSharePersonalInfo = () => {
  return {
    type: RESET_SHARE_PERSONAL_INFO
  };
};

export const getShareLinksInfo = (
  personalInfoId: string,
  encryptionKey: string,
  type = ShareType.onetime,
  expiryDate = new Date()
) => async (dispatch: Dispatch) => {
  try {
    dispatch(sharePersonalInfoRequest());
    const response = await Axios.post(
      `/api/v1/personal-info/${personalInfoId}/share`,
      {
        encryptionKey,
        type,
        expiryDate
      }
    );
    dispatch(sharePersonalInfoSuccess(response.data));
  } catch (e) {
    dispatch(sharePersonalInfoFailure());
  }
};
