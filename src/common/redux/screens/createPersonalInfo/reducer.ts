import {
  CREATE_PERSONAL_INFO_REQUEST,
  CREATE_PERSONAL_INFO_SUCCESS,
  CREATE_PERSONAL_INFO_FAILURE,
  CreatePersonalInfoPageTypes
} from './types';

export interface PersonalInfoCreatePageState {
  isSubmitting: boolean;
}

export const INITIAL_STATE: PersonalInfoCreatePageState = {
  isSubmitting: false
};

const CreatePersonalInfo = (
  state = INITIAL_STATE,
  action: CreatePersonalInfoPageTypes
): PersonalInfoCreatePageState => {
  switch (action.type) {
    case CREATE_PERSONAL_INFO_REQUEST:
      return {
        ...state,
        isSubmitting: true
      };
    case CREATE_PERSONAL_INFO_SUCCESS:
      return {
        ...state,
        isSubmitting: true
      };
    case CREATE_PERSONAL_INFO_FAILURE:
    default:
      return state;
  }
};

export default CreatePersonalInfo;
