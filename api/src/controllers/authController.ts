import { Request, Response } from 'express';

import { UserModel } from '../models/userModel';
import { generateToken } from '../utils/jwtUtils';
import { comparePassword } from '../utils/bcryptUtils';
import { base64ToString } from '../utils/base64Utils';
import { errorResponse, successResponse } from '../utils/responseUtils';
import { ERROR_RESPONSES, ERRORS } from '../constants/errorResponses';
import { SUCCESS, SUCCESS_RESPONSES } from '../constants/sucessResponse';

/**
 * @class AuthController
 *
 * @description
 * This controller handles authentication-related operations, such as logging in a user.
 * It verifies user credentials, generates a JWT token, and sends the token back in the response.
 *
 * @constructor
 * @param {UserModel} userModel - Instance of the UserModel used to interact with the user database.
 */
export class AuthController {
  constructor(private userModel: UserModel) {}

  /**
   * @function login
   *
   * @description
   * Logs in a user by verifying their email and password. If the credentials are valid, a JWT token is generated and returned.
   * If the credentials are invalid, an appropriate error message is returned.
   *
   * @param {Request} req - The request object containing the user's login credentials in the body.
   * @param {Response} res - The response object used to send the result (success or error) back to the client.
   *
   * @returns {Promise<void | Response>} - A promise that resolves with the response. The response can either be a JWT token on success or an error message.
   *
   * @throws {Error} - If an unexpected error occurs during the login process.
   */
  async login(req: Request, res: Response): Promise<void | Response> {
    const { email, password } = req.body;

    try {
      const user = await this.userModel.findByEmail(email);
      if (!user)
        return errorResponse(res, {
          ...ERROR_RESPONSES[ERRORS.NOT_FOUND],
          details: 'User not found'
        });

      const isPasswordValid = await comparePassword(
        password,
        user.passwordHash
      );

      if (!isPasswordValid)
        return errorResponse(res, {
          ...ERROR_RESPONSES[ERRORS.UNAUTHORIZED],
          details: 'Invalid password'
        });

      const token = generateToken({ id: user.id, email: user.email });

      return successResponse(res, {
        ...SUCCESS_RESPONSES[SUCCESS.OK],
        data: { token }
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: Error | any | unknown) {
      return errorResponse(res, {
        ...ERROR_RESPONSES[ERRORS.INTERNAL_SERVER_ERROR],
        details: error?.message
      });
    }
  }

  /**
   * @function register
   *
   * @description
   * Creates a new user by accepting their name, email, and password.
   * It checks if the email is already in use before creating the user.
   * If the email is already taken, a 500 error is returned.
   * If an internal error occurs, a 500 error is returned.
   *
   * @param {Request} req - The request object containing the user's name, email, and password in the body.
   * @param {Response} res - The response object used to send the result (new user data or error) back to the client.
   *
   * @returns {Promise<void | Response>} - A promise that resolves with the new user's ID, name, email and labels if successful, or an error message.
   *
   * @throws {Error} - If an unexpected error occurs during the user creation process.
   */
  async register(req: Request, res: Response): Promise<void | Response> {
    const { name, email, password } = req.body;

    try {
      const existingUser = await this.userModel.findByEmail(email);
      if (existingUser)
        return errorResponse(res, {
          ...ERROR_RESPONSES[ERRORS.CONFLICT],
          details: 'Email already in use'
        });

      const parsedPassword = base64ToString(password);

      const newUser = await this.userModel.create({
        name,
        email,
        password: parsedPassword || ''
      });

      return successResponse(res, {
        ...SUCCESS_RESPONSES[SUCCESS.CREATED],
        data: newUser
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: Error | any | unknown) {
      return errorResponse(res, {
        ...ERROR_RESPONSES[ERRORS.INTERNAL_SERVER_ERROR],
        details: error?.message
      });
    }
  }
}
