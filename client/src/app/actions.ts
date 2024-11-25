import { ACTIONS_TYPES } from "./constants";

interface SetPageAction {
  type: typeof ACTIONS_TYPES.SET_PAGE;
  payload: number;
}
export const setPage = (payload: number): SetPageAction => ({
  type: ACTIONS_TYPES.SET_PAGE,
  payload
});

interface SetLoadingAction {
  type: typeof ACTIONS_TYPES.SET_LOADING;
  payload: boolean;
}
export const setLoading = (payload: boolean): SetLoadingAction => ({
  type: ACTIONS_TYPES.SET_LOADING,
  payload
});

interface SetSearchAction {
  type: typeof ACTIONS_TYPES.SET_SEARCH;
  payload: string;
}
export const setSearch = (payload: string): SetSearchAction => ({
  type: ACTIONS_TYPES.SET_SEARCH,
  payload
});

interface ApplyFiltersAction {
  type: typeof ACTIONS_TYPES.APPLY_FILTERS;
  payload: Record<string, any>;
}
export const applyFilters = (
  payload: Record<string, any>
): ApplyFiltersAction => ({
  type: ACTIONS_TYPES.APPLY_FILTERS,
  payload
});

interface ClearFiltersAction {
  type: typeof ACTIONS_TYPES.CLEAR_FILTERS;
}
export const clearFilters = (): ClearFiltersAction => ({
  type: ACTIONS_TYPES.CLEAR_FILTERS
});
