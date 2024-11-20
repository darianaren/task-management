import { Request, Response } from 'express';
import { TaskModel } from '../models/taskModel';

/**
 * @class TaskController
 *
 * @description
 * This controller handles operations related to task management, such as getting, creating, editing or deleting tasks.
 * It interacts with the TaskModel to perform database operations.
 *
 * @constructor
 * @param {TaskModel} taskModel - Instance of the TaskModel used to interact with the task database.
 */
export class TaskController {
  constructor(private taskModel: TaskModel) {}

  /**
   * Creates a new task for the authenticated user.
   * The task is created with the data sent in the request body and the user ID from the authenticated user.
   *
   * @param {Request} req - The HTTP request object containing the task details in the body.
   * @param {Response} res - The HTTP response object used to send the task creation response.
   *
   * @returns {Promise<void | Response>} The created task data or an error response.
   *
   * @throws {Error} - If an unexpected error occurs during the creating process.
   */
  async createTask(req: Request, res: Response): Promise<void | Response> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { id } = (req as any).user;

    try {
      const newTask = await this.taskModel.create({
        ...req.body,
        userId: id,
        createdAt: new Date().toISOString()
      });

      res.status(201).json(newTask);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Retrieves tasks for the authenticated user based on query parameters.
   * The response includes a list of tasks matching the filters (status, label, dueDate, etc.)
   * and supports pagination.
   *
   * @param {Request} req - The HTTP request object containing query parameters for filtering and pagination.
   * @param {Response} res - The HTTP response object used to send the list of tasks.
   *
   * @returns {Promise<void | Response>} A list of tasks or an error response.
   *
   * @throws {Error} - If an unexpected error occurs during the getting process.
   */
  async getTasks(req: Request, res: Response): Promise<void | Response> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { id } = (req as any).user;

    const { page, limit, status, label, dueDate, orderBy, orderDirection } =
      req.query as {
        page?: string;
        limit?: string;
        status?: string;
        label?: string;
        dueDate?: string;
        orderBy?: 'createdAt' | 'dueDate';
        orderDirection?: 'ASC' | 'DESC';
      };

    try {
      const tasks = await this.taskModel.findByUserId(
        id,
        {
          dueDate,
          orderBy,
          orderDirection,
          labels: label?.split(','),
          statuses: status?.split(',')
        },
        {
          limit: limit ? Number(limit) : 10,
          page: page ? Number(page) : 1
        }
      );

      res.json(tasks);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Deletes a task for the authenticated user.
   * The task is identified by the ID provided in the request body.
   *
   * @param {Request} req - The HTTP request object containing the task ID to delete.
   * @param {Response} res - The HTTP response object used to send the task deletion response.
   *
   * @returns {Promise<void | Response>} A response indicating the success or failure of the deletion.
   *
   * @throws {Error} - If an unexpected error occurs during the deleting process.
   */
  async deleteTask(req: Request, res: Response): Promise<void | Response> {
    const { id } = req.body;

    try {
      await this.taskModel.delete(parseInt(id));
      res.status(204).send();
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Updates an existing task for the authenticated user.
   * The task is updated based on the provided task ID and the update data in the request body.
   *
   * @param {Request} req - The HTTP request object containing the task ID and update data.
   * @param {Response} res - The HTTP response object used to send the updated task data.
   *
   * @returns {Promise<void | Response>} The updated task data or an error response.
   *
   * @throws {Error} - If an unexpected error occurs during the updating process.
   */
  async updateTask(req: Request, res: Response): Promise<void | Response> {
    const { id, ...updateData } = req.body;

    try {
      const updatedTask = await this.taskModel.update(parseInt(id), updateData);
      res.json(updatedTask);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Retrieves metrics for the authenticated user.
   * The metrics may include statistics such as the number of tasks by status or other key performance indicators.
   *
   * @param {Request} req - The HTTP request object containing the user's ID.
   * @param {Response} res - The HTTP response object used to send the metrics data.
   *
   * @returns {Promise<void | Response>} The metrics data or an error response.
   *
   * @throws {Error} - If an unexpected error occurs during the getting process.
   */
  async getMetrics(req: Request, res: Response): Promise<void | Response> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { id } = (req as any).user;

    try {
      const metrics = await this.taskModel.getMetrics(id);
      res.json(metrics);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
