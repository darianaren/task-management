import { ACTIONS_TYPES } from "./constants";

interface SetPageAction {
  type: typeof ACTIONS_TYPES.SET_PAGE;
  payload: number;
}
export const setPage = (payload: number): SetPageAction => ({
  type: ACTIONS_TYPES.SET_PAGE,
  payload
});

interface SetFiltersPayload {
  name: string;
  value: string | Array<string>;
}
interface SetFiltersAction {
  type: typeof ACTIONS_TYPES.SET_FILTERS;
  payload: SetFiltersPayload;
}
export const setFilters = (payload: SetFiltersPayload): SetFiltersAction => ({
  type: ACTIONS_TYPES.SET_FILTERS,
  payload
});

interface ClearFiltersAction {
  type: typeof ACTIONS_TYPES.CLEAR_FILTERS;
}
export const clearFilters = (): ClearFiltersAction => ({
  type: ACTIONS_TYPES.CLEAR_FILTERS
});

interface SetLoadingAction {
  type: typeof ACTIONS_TYPES.SET_LOADING;
  payload: boolean;
}
export const setLoading = (payload: boolean): SetLoadingAction => ({
  type: ACTIONS_TYPES.SET_LOADING,
  payload
});
