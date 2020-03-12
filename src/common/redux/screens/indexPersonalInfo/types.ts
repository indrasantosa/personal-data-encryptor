export const LIST_PERSONAL_INFO_REQUEST = 'LIST_PERSONAL_INFO_REQUEST';
export const LIST_PERSONAL_INFO_SUCCESS = 'LIST_PERSONAL_INFO_SUCCESS';
export const LIST_PERSONAL_INFO_FAILURE = 'LIST_PERSONAL_INFO_FAILURE';

interface ListPersonalInfoRequest {
  type: typeof LIST_PERSONAL_INFO_REQUEST;
}

interface ListPersonalInfoSuccess {
  type: typeof LIST_PERSONAL_INFO_SUCCESS;
  response: any;
}

interface ListPersonalInfoFailure {
  type: typeof LIST_PERSONAL_INFO_FAILURE;
}

export type ListPersonalInfoPageTypes =
  | ListPersonalInfoRequest
  | ListPersonalInfoSuccess
  | ListPersonalInfoFailure;

export interface PersonalInfoForm {
  firstName: string;
  lastName: string;
  encryptionKey: string;
  file: File;
}
