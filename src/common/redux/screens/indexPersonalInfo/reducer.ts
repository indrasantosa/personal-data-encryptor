import {
  LIST_PERSONAL_INFO_REQUEST,
  LIST_PERSONAL_INFO_SUCCESS,
  LIST_PERSONAL_INFO_FAILURE,
  ListPersonalInfoPageTypes
} from './types';

export interface EncryptedPersonalFile {
  id: string;
  fileName: string;
}

export interface EncryptedPersonalInfo {
  id: string;
  label: string;
  createDate: Date;
  updateDate: Date;
  file: EncryptedPersonalFile;
}

export interface PersonalInfoIndexPageState {
  personalInfos: Array<EncryptedPersonalInfo>;
  isLoading: boolean;
}

export const INITIAL_STATE: PersonalInfoPageState = {
  personalInfos: [],
  isLoading: false
};

const ListPersonalInfo = (
  state = INITIAL_STATE,
  action: ListPersonalInfoPageTypes
): PersonalInfoPageState => {
  switch (action.type) {
    case LIST_PERSONAL_INFO_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case LIST_PERSONAL_INFO_SUCCESS:
      return {
        ...state,
        personalInfos: action.response.result.result,
        isLoading: false
      };
    case LIST_PERSONAL_INFO_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

export default ListPersonalInfo;
