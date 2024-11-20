/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';
import { Database } from 'sqlite';

import { UserModel } from '../models/userModel';
import { AuthController } from '../controllers/authController';

const router = Router();

export default router;

export function authRoutes(db: Database): Router {
  const router = Router();

  const userModel = new UserModel(db);
  const authController = new AuthController(userModel);

  router.post('/login', authController.login.bind(authController) as any);

  router.post('/register', authController.register.bind(authController) as any);

  return router;
}
