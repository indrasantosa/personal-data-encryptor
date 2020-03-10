import {
  CFD_LIST_REQUEST,
  CFD_LIST_SUCCESS,
  CFD_LIST_FAILURE,
  CfdListPageTypes
} from './types';

export interface CfdModel {
  headers: Array<string>;
  data: Array<Array<string>>;
}

export interface CfdReportPageState {
  cfd: Array<CfdModel>;
  isLoading: boolean;
}

export const INITIAL_STATE: CfdReportPageState = {
  cfd: [],
  isLoading: false
};

const reducer = (
  state = INITIAL_STATE,
  action: CfdListPageTypes
): CfdReportPageState => {
  switch (action.type) {
    case CFD_LIST_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case CFD_LIST_SUCCESS:
      return {
        ...state,
        cfd: action.payload as CfdModel[],
        isLoading: true
      };
    case CFD_LIST_FAILURE:
    default:
      return state;
  }
};

export default reducer;

export const getCfdReportData = (state: CfdReportPageState) => state.cfd;
