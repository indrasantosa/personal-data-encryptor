import {
  CREATE_PERSONAL_INFO_REQUEST,
  CREATE_PERSONAL_INFO_SUCCESS,
  CREATE_PERSONAL_INFO_FAILURE,
  CreatePersonalInfoPageTypes
} from './types';

export interface FxModel {
  id: number;
  cobdate: Date;
  fromcurrency: string;
  fromCurrencyname: string;
  tocurrency: string;
  toCurrencyname: string;
  exchangerate: string;
  fileName: string;
}

export interface PersonalInfoPageState {
  rates: Array<FxModel>;
  total?: number;
  page?: number;
  pageSize?: number;
  totalPages?: number;
  isLoading: boolean;
}

export const INITIAL_STATE: PersonalInfoPageState = {
  rates: [],
  total: undefined,
  page: undefined,
  pageSize: undefined,
  totalPages: undefined,
  isLoading: false
};

const CreatePersonalInfo = (
  state = INITIAL_STATE,
  action: CreatePersonalInfoPageTypes
): PersonalInfoPageState => {
  switch (action.type) {
    case CREATE_PERSONAL_INFO_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case CREATE_PERSONAL_INFO_SUCCESS:
      return {
        ...state,
        rates: action.payload.rows,
        isLoading: true
      };
    case CREATE_PERSONAL_INFO_FAILURE:
    default:
      return state;
  }
};

export default CreatePersonalInfo;
