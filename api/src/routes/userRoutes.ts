/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';
import { Database } from 'sqlite';

import { UserModel } from '../models/userModel';
import { UserController } from '../controllers/userController';

export function userRoutes(db: Database): Router {
  const router = Router();

  const userModel = new UserModel(db);
  const userController = new UserController(userModel);

  router.get('/', userController.getUser.bind(userController) as any);

  return router;
}
