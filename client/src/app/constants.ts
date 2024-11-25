export const INITIAL_STATE_REDUCER = Object.freeze({
  page: 1,
  title: "",
  label: [],
  status: [],
  dueDate: "",
  isLoading: false,
  orderBy: "createdAt",
  orderDirection: "DESC"
});

export const ACTIONS_TYPES = Object.freeze({
  SET_SEARCH: Symbol("Set title value"),
  CLEAR_FILTERS: Symbol("Reset filters"),
  APPLY_FILTERS: Symbol("Apply filters"),
  SET_LOADING: Symbol("Set loading value")
});
