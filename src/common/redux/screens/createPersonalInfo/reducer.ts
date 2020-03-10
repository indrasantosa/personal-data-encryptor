import {
  FxRatesPageTypes,
  FX_LIST_REQUEST,
  FX_LIST_SUCCESS,
  FX_LIST_FAILURE
} from './types';

interface Message {
  userName: string;
  password: string;
  otp: string;
}

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

export interface FxRatesPageState {
  rates: Array<FxModel>;
  total?: number;
  page?: number;
  pageSize?: number;
  totalPages?: number;
  isLoading: boolean;
}

export const INITIAL_STATE: FxRatesPageState = {
  rates: [],
  total: undefined,
  page: undefined,
  pageSize: undefined,
  totalPages: undefined,
  isLoading: false
};

const LoginPage = (
  state = INITIAL_STATE,
  action: FxRatesPageTypes
): FxRatesPageState => {
  switch (action.type) {
    case FX_LIST_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case FX_LIST_SUCCESS:
      return {
        ...state,
        rates: action.payload.rows,
        isLoading: true
      };
    case FX_LIST_FAILURE:
    default:
      return state;
  }
};

export default LoginPage;
