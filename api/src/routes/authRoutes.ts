/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';

import { UserModel } from '../models/userModel';
import { connectDB } from '../config/database';
import { AuthController } from '../controllers/authController';

const router = Router();

async function initialize() {
  const db = await connectDB();
  const userModel = new UserModel(db);
  const authController = new AuthController(userModel);

  router.post('/login', authController.login as any);
}

initialize().catch((error) => {
  console.error('Error initializing the app:', error);
});

export default router;
