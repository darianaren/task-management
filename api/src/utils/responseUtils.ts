import { Response } from 'express';

import { ResponseOptions } from '../interfaces/IResponses';
import { ERROR_RESPONSES, ERRORS } from '../constants/errorResponses';
import { SUCCESS, SUCCESS_RESPONSES } from '../constants/sucessResponse';

/**
 * Standardized success response format.
 * @param {Response} res - The Express response object.
 * @param {SuccessResponseOptions} success - Options for the success response, including status code, message, data, and details.
 * @returns {Response} The formatted success response object.
 */
export const successResponse = (
  res: Response,
  success: ResponseOptions
): void | Response => {
  const successDefault = SUCCESS_RESPONSES[SUCCESS.OK];
  const successStatus = success.code || successDefault.code;

  return res.status(successStatus).json({
    success: true,
    data: success.data,
    code: successStatus,
    details: success.details,
    message: success.message || successDefault.message
  });
};

/**
 * Standardized error response format.
 * @param {Response} res - The Express response object.
 * @param {ResponseOptions} error - Options for the success response, including status code, message, data, and details.
 * @returns {Response} The formatted success response object.
 */
export const errorResponse = (
  res: Response,
  error: ResponseOptions
): void | Response => {
  const errorDefault = ERROR_RESPONSES[ERRORS.INTERNAL_SERVER_ERROR];
  const errorStatus = error.code || errorDefault.code;

  return res.status(errorStatus).json({
    success: false,
    data: error.data,
    code: errorStatus,
    details: error.details,
    message: error.message || errorDefault.message
  });
};
