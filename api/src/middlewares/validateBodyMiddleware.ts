import { NextFunction, Request, Response } from 'express';
import { errorResponse } from '../utils/responseUtils';
import { ERROR_RESPONSES, ERRORS } from '../constants/errorResponses';
import { MASKS, VALIDATIONS } from '../utils/validationsUtils';
import { ValidationField } from '../interfaces/IValidateBody';

/**
 * Middleware to validate and process request body fields based on specified rules.
 *
 * @param {ReadonlyArray<ValidationField>} fields - Array of validation rules for each field.
 * @returns {void} Middleware function.
 */
const validateBodyMiddleware = (fields: ReadonlyArray<ValidationField>) => {
  return (req: Request, res: Response, next: NextFunction): Response | void => {
    fields.forEach((field: ValidationField) => {
      const { name, required, type, min, max, format, applyMask } = field;
      const value = req.body[name];

      // Check if required field is missing
      if (required && value === undefined)
        return errorResponse(res, {
          ...ERROR_RESPONSES[ERRORS.BAD_REQUEST],
          details: `The field ${name} is required.`
        });

      if (value !== undefined && value !== null) {
        // Validate type
        if (type && typeof value !== type)
          return errorResponse(res, {
            ...ERROR_RESPONSES[ERRORS.BAD_REQUEST],
            details: `The field ${name} must be of type ${type}.`
          });

        // Additional validations
        if (format) {
          const validationsAction = VALIDATIONS[format] || VALIDATIONS.default;
          const isValid = validationsAction(value);

          if (!isValid)
            return errorResponse(res, {
              ...ERROR_RESPONSES[ERRORS.BAD_REQUEST],
              details: `The field ${name} must be a valid format.`
            });
        }

        if (min) {
          if (typeof value === 'number' && value < min)
            return errorResponse(res, {
              ...ERROR_RESPONSES[ERRORS.BAD_REQUEST],
              details: `The field ${name} must be at least ${min}.`
            });
          if (value.length < min)
            return errorResponse(res, {
              ...ERROR_RESPONSES[ERRORS.BAD_REQUEST],
              details: `The field size of ${name} must be at least ${min}.`
            });
        }

        if (max) {
          if (typeof value === 'number' && value > max)
            return errorResponse(res, {
              ...ERROR_RESPONSES[ERRORS.BAD_REQUEST],
              details: `The field ${name} must not exceed ${max}.`
            });
          if (value.length > max)
            return errorResponse(res, {
              ...ERROR_RESPONSES[ERRORS.BAD_REQUEST],
              details: `The field size of ${name} must not exceed ${max}.`
            });
        }

        // Apply mask
        if (applyMask) {
          const maskAction = MASKS[applyMask] || MASKS.default;
          const newValue = maskAction(value);
          req.body[name] = newValue;
        }
      }
    });

    next();
  };
};

export default validateBodyMiddleware;
