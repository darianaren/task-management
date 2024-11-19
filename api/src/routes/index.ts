import { Request, Response, Router } from 'express';

import authRoutes from './authRoutes';
import usersRoutes from './userRoutes';
import tasksRoutes from './taskRoutes';

const router = Router();

function home(_req: Request, res: Response): void | Response {
  res.status(200).send('Welcome to the api of the to-do list!');
}

router
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  .get('/', home as any)
  .use('/auth', authRoutes)
  .use('/users', usersRoutes)
  .use('/tasks', tasksRoutes);

module.exports = router;
