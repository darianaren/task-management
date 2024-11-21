/**
 * @interface ValidationField
 *
 * @description
 * Defines the structure for a field that requires validation.
 *
 * @type {string} - `name`: The name of the field in the request body.
 * @type {number} [min] - Minimum acceptable value (applicable for numerical fields).
 * @type {number} [max] - Maximum acceptable value (applicable for numerical fields).
 * @type {symbol} [format] - Validation format to apply (e.g., email, name, password).
 * @type {boolean} [required] - Indicates whether the field is mandatory.
 * @type {symbol} [applyMask] - Mask to apply to the field value (e.g., convert to lowercase, PascalCase).
 * @type {'string' | 'number' | 'boolean' | 'object'} [type] - The expected data type of the field.
 */
export interface ValidationField {
  name: string;
  min?: number;
  max?: number;
  format?: symbol;
  required?: boolean;
  applyMask?: symbol;
  type?: 'string' | 'number' | 'boolean' | 'object';
}
