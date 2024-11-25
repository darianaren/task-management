/* eslint-disable no-unused-vars */

import React from "react";

import { SelectChangeEvent } from "@mui/material";

interface CustomValidator {
  (value: string): boolean;
}

export interface VoidFunction {
  (): void;
}

export interface ChangeFunction {
  (event: React.ChangeEvent<HTMLInputElement>): void;
}

export interface ChangeSelectFunction {
  (event: SelectChangeEvent<string>): void;
}

export interface BlurFunction {
  (event: React.FocusEvent<HTMLInputElement>): void;
}

export interface ValidationRules {
  pattern?: RegExp;
  message?: string;
  required?: boolean;
  customValidator?: CustomValidator;
}

export interface UseFormConfig {
  applyMask?: Record<string, symbol>;
  initialForm?: Record<string, string>;
  validateForm?: Record<string, ValidationRules>;
}

export interface UseFormReturn {
  form: Record<string, string>;
  errors: Record<string, string>;
  resetForm: VoidFunction;
  resetErrors: VoidFunction;
  formValidator: VoidFunction;
  blurValidator: BlurFunction;
  handleChange: ChangeFunction;
}
