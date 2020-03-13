import { ShareType } from '../../../enums/app';

export const SHARE_PERSONAL_INFO_REQUEST = 'SHARE_PERSONAL_INFO_REQUEST';
export const SHARE_PERSONAL_INFO_SUCCESS = 'SHARE_PERSONAL_INFO_SUCCESS';
export const SHARE_PERSONAL_INFO_FAILURE = 'SHARE_PERSONAL_INFO_FAILURE';
export const RESET_SHARE_PERSONAL_INFO = 'RESET_SHARE_PERSONAL_INFO';

interface SharePersonalInfoRequest {
  type: typeof SHARE_PERSONAL_INFO_REQUEST;
}

interface SharePersonalInfoSuccess {
  type: typeof SHARE_PERSONAL_INFO_SUCCESS;
  response: any;
}

interface SharePersonalInfoFailure {
  type: typeof SHARE_PERSONAL_INFO_FAILURE;
}

interface ResetSharePersonalInfo {
  type: typeof RESET_SHARE_PERSONAL_INFO;
}

export type SharePersonalInfoPageTypes =
  | SharePersonalInfoRequest
  | SharePersonalInfoSuccess
  | SharePersonalInfoFailure
  | ResetSharePersonalInfo;

export interface SharePersonalInfoForm {
  encryptionKey: string;
  type: ShareType;
  expiryDate?: Date;
}
