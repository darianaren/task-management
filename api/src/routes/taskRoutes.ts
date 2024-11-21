/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';
import { Database } from 'sqlite';

import { TaskModel } from '../models/taskModel';
import { TaskController } from '../controllers/taskController';
import validateBodyMiddleware from '../middlewares/validateBodyMiddleware';
import {
  CREATE_TASK_VALIDATIONS,
  DELETE_TASK_VALIDATIONS,
  UPDATE_TASK_VALIDATIONS
} from '../constants/validations/task';

export function taskRoutes(db: Database): Router {
  const router = Router();

  const taskModel = new TaskModel(db);
  const taskController = new TaskController(taskModel);

  /**
   * Retrieves tasks for a user, optionally filtered by various criteria, and paginated.
   *
   * @param {object} request.query - The query parameters for filtering and pagination.
   * @param {object} response - The response object.
   * @property {string} [request.query.page] - The page number for pagination (default is 1).
   * @property {string} [request.query.limit] - The number of tasks to retrieve per page (default is 10).
   * @property {string} [request.query.status] - The status of the tasks to filter by (`pending`, `completed`, `in-progress`).
   * @property {string} [request.query.label] - The label to filter tasks by.
   * @property {string} [request.query.dueDate] - The due date to filter tasks by (format `YYYY-MM-DD`).
   * @property {'createdAt' | 'dueDate'} [request.query.orderBy] - The field to order the tasks by.
   * @property {'ASC' | 'DESC'} [request.query.orderDirection] - The direction to order the tasks (`ASC` or `DESC`).
   *
   * @returns {Promise<object[]>} - An array of tasks matching the specified criteria.
   * @throws {Error} - If an error occurs while fetching tasks.
   */
  router.get('/', taskController.getTasks.bind(taskController) as any);

  /**
   * Retrieves the task metrics for a user, including the total number of tasks and the number of tasks in each status.
   *
   * @param {object} request - The request object.
   * @param {object} response - The response object.
   *
   * @returns {Promise<object>} - A JSON object containing the task metrics for the user:
   *   - total: Total number of tasks.
   *   - pending: Number of tasks with `pending` status.
   *   - completed: Number of tasks with `completed` status.
   *   - inProgress: Number of tasks with `in-progress` status.
   * @throws {Error} - If an error occurs while fetching the metrics.
   */
  router.get('/metrics', taskController.getMetrics.bind(taskController) as any);

  /**
   * Creates a new task for the user.
   *
   * @param {object} request.body - The body object containing the task details.
   * @param {object} response - The response object.
   * @property {string} request.body.title - The title of the task.
   * @property {string} request.body.description - A description of the task.
   * @property {string} request.body.dueDate - The due date for the task (format `YYYY-MM-DD`).
   * @property {string} request.body.status - The status of the task (`pending`, `completed`, `in-progress`).
   * @property {string[]} request.body.labels - The labels associated with the task.
   *
   * @returns {Promise<object>} - A JSON object containing the newly created task, including its `id`.
   * @throws {Error} - If an error occurs while creating the task.
   */
  router.post(
    '/',
    validateBodyMiddleware(CREATE_TASK_VALIDATIONS) as any,
    taskController.createTask.bind(taskController) as any
  );

  /**
   * Updates an existing task.
   *
   * @param {object} request.body - The body object containing the updated task data.
   * @param {object} response - The response object.
   * @property {number} request.body.id - The ID of the task to be updated.
   * @property {string} [request.body.title] - The updated title of the task.
   * @property {string} [request.body.description] - The updated description of the task.
   * @property {string} [request.body.dueDate] - The updated due date of the task (format `YYYY-MM-DD`).
   * @property {string} [request.body.status] - The updated status of the task (`pending`, `completed`, `in-progress`).
   * @property {string[]} [request.body.labels] - The updated labels associated with the task.
   *
   * @returns {Promise<object>} - A JSON object containing the updated task.
   * @throws {Error} - If an error occurs while updating the task.
   */
  router.put(
    '/',
    validateBodyMiddleware(UPDATE_TASK_VALIDATIONS) as any,
    taskController.updateTask.bind(taskController) as any
  );

  /**
   * Deletes a task by its ID.
   *
   * @param {object} request.body - The body object containing the task ID to be deleted.
   * @param {object} response - The response object.
   * @property {number} request.body.id - The ID of the task to be deleted.
   *
   * @returns {Promise<void>} - A successful response with no content.
   * @throws {Error} - If an error occurs while deleting the task.
   */
  router.delete(
    '/',
    validateBodyMiddleware(DELETE_TASK_VALIDATIONS) as any,
    taskController.deleteTask.bind(taskController) as any
  );

  return router;
}
