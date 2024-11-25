import { ChangeFunction } from "./IFormHook";

/* eslint-disable no-unused-vars */
export interface Filters {
  dueDate: string;
  orderBy: string;
  label: Array<string>;
  status: Array<string>;
  orderDirection: string;
}

export interface ResetFiltersFunction {
  (): void;
}

export interface FilterProps {
  search: string;
  dueDate: string;
  orderBy: string;
  label: Array<string>;
  status: Array<string>;
  labelOptions: Array<string>;
  handleChangeFilter: ChangeFunction;
  handleResetFilters: ResetFiltersFunction;
}
