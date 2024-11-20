/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';
import { Database } from 'sqlite';

import { UserModel } from '../models/userModel';
import { UserController } from '../controllers/userController';

export function userRoutes(db: Database): Router {
  const router = Router();

  const userModel = new UserModel(db);
  const userController = new UserController(userModel);

  /**
   * Retrieves the user's profile information, including their name and labels.
   *
   * @param {object} request - The request object containing the user's ID.
   * @param {object} response - The response object.
   *
   * @returns {Promise<object>} - A JSON object containing the user's name and labels.
   * @throws {Error} - If an error occurs while retrieving the user information.
   */
  router.get('/', userController.getUser.bind(userController) as any);

  return router;
}
