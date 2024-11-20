/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, Router } from 'express';
import { Database } from 'sqlite';

import { authRoutes } from './authRoutes';
import { userRoutes } from './userRoutes';
import { taskRoutes } from './taskRoutes';
import authMiddleware from '../middlewares/authMiddleware';

function home(_req: Request, res: Response): void | Response {
  res.status(200).send('Welcome to the api of the to-do list!');
}

export function initializeRoutes(db: Database): Router {
  const router = Router();
  router
    .get('/', home as any)
    .use('/auth', authRoutes(db))
    .use('/labels', authMiddleware as any, userRoutes(db))
    .use('/users', authMiddleware as any, userRoutes(db))
    .use('/tasks', authMiddleware as any, taskRoutes(db));

  return router;
}
