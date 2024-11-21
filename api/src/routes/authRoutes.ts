/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';
import { Database } from 'sqlite';

import {
  LOGIN_VALIDATIONS,
  REGISTER_VALIDATIONS
} from '../constants/validations/auth';
import { UserModel } from '../models/userModel';
import { AuthController } from '../controllers/authController';
import validateBodyMiddleware from '../middlewares/validateBodyMiddleware';

const router = Router();

export default router;

export function authRoutes(db: Database): Router {
  const router = Router();

  const userModel = new UserModel(db);
  const authController = new AuthController(userModel);

  /**
   * Authenticates a user and generates a token.
   *
   * @param {object} request.body - The body object containing the user's credentials.
   * @param {object} response - The response object.
   * @property {string} request.body.email - The email of the user.
   * @property {string} request.body.password - The password of the user.
   *
   * @returns {Promise<object>} - A JSON object containing the authentication token.
   * @throws {Error} - If an error occurs during login.
   */
  router.post(
    '/login',
    validateBodyMiddleware(LOGIN_VALIDATIONS) as any,
    authController.login.bind(authController) as any
  );

  /**
   * Registers a new user and returns the created user's data.
   *
   * @param {object} request.body - The body object containing the user's registration details.
   * @param {object} response - The response object.
   * @property {string} request.body.name - The name of the user.
   * @property {string} request.body.email - The email of the user.
   * @property {string} request.body.password - The password of the user.
   *
   * @returns {Promise<object>} - A JSON object containing the new user's details and default labels.
   * @throws {Error} - If an error occurs during registration.
   */
  router.post(
    '/register',
    validateBodyMiddleware(REGISTER_VALIDATIONS) as any,
    authController.register.bind(authController) as any
  );

  return router;
}
