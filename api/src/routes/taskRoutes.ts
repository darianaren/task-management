/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';

import { connectDB } from '../config/database';
import { TaskModel } from '../models/taskModel';
import authMiddleware from '../middlewares/authMiddleware';
import { TaskController } from '../controllers/taskController';

const router = Router();

async function initialize() {
  const db = await connectDB();
  const taskModel = new TaskModel(db);
  const taskController = new TaskController(taskModel);

  router.get('/', authMiddleware as any, taskController.getTasks as any);

  router.get(
    '/metrics',
    authMiddleware as any,
    taskController.getMetrics as any
  );

  router.post('/', authMiddleware as any, taskController.createTask as any);

  router.put('/', authMiddleware as any, taskController.updateTask as any);

  router.delete('/', authMiddleware as any, taskController.deleteTask as any);
}

initialize().catch((error) => {
  console.error('Error initializing the app:', error);
});

export default router;
