import { Request, Response, NextFunction } from 'express';

import { verifyToken } from '../utils/jwtUtils';
import { errorResponse } from '../utils/responseUtils';
import { ERROR_RESPONSES, ERRORS } from '../constants/errorResponses';

/**
 * @function authMiddleware
 *
 * @description
 * Middleware function to verify the JWT token provided in the `Authorization` header.
 * This middleware checks if the request has a valid token and, if so, decodes it to attach user information
 * (id and email) to the request object. If the token is missing or invalid, the request is rejected with a 401 status.
 *
 * This middleware should be used to protect routes that require authentication.
 *
 * @param {Request} req - The Express request object. The user information will be attached to the `user` property on the `req` object if the token is valid.
 * @param {Response} res - The Express response object used to send the response back to the client.
 * @param {NextFunction} next - The next middleware function to be called if the token is valid.
 *
 * @returns {void | Response} - If the token is valid, the function proceeds to the next middleware or route handler. If the token is missing or invalid, the function returns a 401 Unauthorized response.
 *
 * @throws {Response} - Returns a 401 Unauthorized response if the token is missing or invalid.
 */
const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void | Response => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return errorResponse(res, {
      ...ERROR_RESPONSES[ERRORS.UNAUTHORIZED],
      details: 'Missing token'
    });
  }

  try {
    const decoded = verifyToken(token) as { id: number; email: string };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (req as any).user = { id: decoded.id, email: decoded.email };

    next();
  } catch (error) {
    return errorResponse(res, {
      ...ERROR_RESPONSES[ERRORS.UNAUTHORIZED],
      details: 'Invalid token.',
      data: { error }
    });
  }
};

export default authMiddleware;
