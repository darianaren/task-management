/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';
import { Database } from 'sqlite';

import { TaskModel } from '../models/taskModel';
import { TaskController } from '../controllers/taskController';

export function taskRoutes(db: Database): Router {
  const router = Router();

  const taskModel = new TaskModel(db);
  const taskController = new TaskController(taskModel);

  router.get('/', taskController.getTasks.bind(taskController) as any);

  router.get('/metrics', taskController.getMetrics.bind(taskController) as any);

  router.post('/', taskController.createTask.bind(taskController) as any);

  router.put('/', taskController.updateTask.bind(taskController) as any);

  router.delete('/', taskController.deleteTask.bind(taskController) as any);

  return router;
}
