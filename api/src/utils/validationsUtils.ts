import { TYPES_MASKS, TYPES_VALIDATIONS } from '../constants/validations';

/**
 * Immutable object containing the validation functions for different data types.
 * Each function returns a boolean indicating whether the value is valid or not.
 */
export const VALIDATIONS = Object.freeze({
  [TYPES_VALIDATIONS.email]: (email: string): boolean => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  },
  [TYPES_VALIDATIONS.name]: (name: string): boolean => {
    const nameRegex = /^[ A-Za-zÑñÁáÉéÍíÓóÚúÜü]+$/i;
    return nameRegex.test(name);
  },
  [TYPES_VALIDATIONS.password]: (value: string): boolean => value.length > 6,
  default: (): boolean => true
});

/**
 * Immutable object containing the transformation functions (masks) for different data types.
 * Each function transforms the input value and returns the transformed version.
 */
export const MASKS = Object.freeze({
  [TYPES_MASKS.lower]: (value: string): string => value.toLowerCase(),
  [TYPES_MASKS.upper]: (value: string): string => value.toUpperCase(),
  [TYPES_MASKS.pascal]: (value: string): string =>
    value
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' '),
  default: (value: string): string => value
});
