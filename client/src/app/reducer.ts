import { ACTIONS_TYPES, INITIAL_STATE_REDUCER } from "./constants";

interface State {
  page: number;
  title: string;
  dueDate: string;
  orderBy: string;
  isLoading: boolean;
  label: Array<string>;
  status: Array<string>;
  orderDirection: string;
}

interface Action {
  type: symbol;
  payload: any;
}

export const reducer = (state: State, action: Action): State => {
  const { type, payload } = action;

  switch (type) {
    case ACTIONS_TYPES.SET_PAGE:
      return {
        ...state,
        page: payload
      };
    case ACTIONS_TYPES.SET_LOADING:
      return {
        ...state,
        isLoading: payload
      };
    case ACTIONS_TYPES.SET_SEARCH:
      return {
        ...state,
        title: payload,
        page: 1
      };
    case ACTIONS_TYPES.APPLY_FILTERS:
      return {
        ...state,
        ...payload,
        page: 1
      };
    case ACTIONS_TYPES.CLEAR_FILTERS:
      return {
        ...INITIAL_STATE_REDUCER
      };
    default:
      return state;
  }
};
