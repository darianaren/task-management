import { NextFunction, Request, Response } from 'express';
import { errorResponse } from '../utils/responseUtils';
import { ERROR_RESPONSES, ERRORS } from '../constants/errorResponses';
import { MASKS, VALIDATIONS } from '../utils/validationsUtils';
import { ValidationField } from '../interfaces/IValidateBody';

const validateField = (
  field: ValidationField,
  req: Request
): { isValid: boolean; details?: string } => {
  const { name, required, type, min, max, format, applyMask } = field;
  const value = req.body[name];

  // Check if required field is missing
  if (required && value === undefined)
    return {
      isValid: false,
      details: `The field ${name} is required.`
    };

  if (value !== undefined && value !== null) {
    // Validate type
    if (type && typeof value !== type)
      return {
        isValid: false,
        details: `The field ${name} must be of type ${type}.`
      };

    // Additional validations
    if (format) {
      const validationsAction = VALIDATIONS[format] || VALIDATIONS.default;
      const isValid = validationsAction(value);

      if (!isValid)
        return {
          isValid: false,
          details: `The field ${name} must be a valid format.`
        };
    }
    if (
      min &&
      ((typeof value === 'number' && value < min) ||
        (typeof value !== 'number' && value.length < min))
    )
      return {
        isValid: false,
        details: `The field ${name} must be at least ${min}.`
      };

    if (
      max &&
      ((typeof value === 'number' && value > max) ||
        (typeof value !== 'number' && value.length > max))
    )
      return {
        isValid: false,
        details: `The field ${name} must not exceed ${max}.`
      };

    // Apply mask
    if (applyMask) {
      const maskAction = MASKS[applyMask] || MASKS.default;
      const newValue = maskAction(value);
      req.body[name] = newValue;
    }
  }
  return {
    isValid: true
  };
};

/**
 * Middleware to validate and process request body fields based on specified rules.
 *
 * @param {ReadonlyArray<ValidationField>} fields - Array of validation rules for each field.
 * @returns {void} Middleware function.
 */
const validateBodyMiddleware = (fields: ReadonlyArray<ValidationField>) => {
  return (req: Request, res: Response, next: NextFunction): Response | void => {
    const parsedFields = fields.map((field) => validateField(field, req));
    const hasError = parsedFields.find(({ isValid }) => !isValid);

    if (!hasError) {
      next();
    }

    return errorResponse(res, {
      ...ERROR_RESPONSES[ERRORS.BAD_REQUEST],
      details: hasError?.details
    });
  };
};

export default validateBodyMiddleware;
