/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';

import { connectDB } from '../config/database';
import { UserModel } from '../models/userModel';
import authMiddleware from '../middlewares/authMiddleware';
import { UserController } from '../controllers/userController';

const router = Router();

async function initialize() {
  const db = await connectDB();
  const userModel = new UserModel(db);
  const userController = new UserController(userModel);

  router.get('/', authMiddleware as any, userController.getUser as any);

  router.post('/', userController.createUser as any);
}

initialize().catch((error) => {
  console.error('Error initializing the app:', error);
});

export default router;
