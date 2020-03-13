import {
  SHARE_PERSONAL_INFO_REQUEST,
  SHARE_PERSONAL_INFO_SUCCESS,
  SHARE_PERSONAL_INFO_FAILURE,
  RESET_SHARE_PERSONAL_INFO,
  SharePersonalInfoPageTypes
} from './types';

export interface PersonalInfoIndexPageState {
  generatedShareToken?: string;
  generatedShareId?: string;
  isSubmitting: boolean;
}

export const INITIAL_STATE: PersonalInfoPageState = {
  generatedShareToken: undefined,
  generatedShareId: undefined,
  isSubmitting: false
};

const ListPersonalInfo = (
  state = INITIAL_STATE,
  action: SharePersonalInfoPageTypes
): PersonalInfoIndexPageState => {
  switch (action.type) {
    case SHARE_PERSONAL_INFO_REQUEST:
      return {
        ...state,
        isSubmitting: true
      };
    case SHARE_PERSONAL_INFO_SUCCESS:
      return {
        ...state,
        generatedShareToken: action.response.encryptionKey,
        generatedShareId: action.response.shareId,
        isSubmitting: false
      };
    case SHARE_PERSONAL_INFO_FAILURE:
      return {
        ...state,
        isSubmitting: false
      };
    case RESET_SHARE_PERSONAL_INFO:
      return {
        ...state,
        ...INITIAL_STATE
      };
    default:
      return state;
  }
};

export default ListPersonalInfo;
