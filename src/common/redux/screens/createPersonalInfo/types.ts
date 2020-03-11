export const CREATE_PERSONAL_INFO_REQUEST = 'CREATE_PERSONAL_INFO_REQUEST';
export const CREATE_PERSONAL_INFO_SUCCESS = 'CREATE_PERSONAL_INFO_SUCCESS';
export const CREATE_PERSONAL_INFO_FAILURE = 'CREATE_PERSONAL_INFO_FAILURE';

interface CreatePersonalInfoRequest {
  type: typeof CREATE_PERSONAL_INFO_REQUEST;
}

interface CreatePersonalInfoSuccess {
  type: typeof CREATE_PERSONAL_INFO_SUCCESS;
  payload: any;
}

interface CreatePersonalInfoFailure {
  type: typeof CREATE_PERSONAL_INFO_FAILURE;
}

export type CreatePersonalInfoPageTypes =
  | CreatePersonalInfoRequest
  | CreatePersonalInfoSuccess
  | CreatePersonalInfoFailure;

export interface PersonalInfoForm {
  firstName: string;
  lastName: string;
  encryptionKey: string;
  file: File;
}
