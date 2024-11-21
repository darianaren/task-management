import { Database } from 'sqlite';
import { Task } from '../interfaces/ITask';

/**
 * @class TaskModel
 *
 * @description
 * Represents the model for interacting with the `tasks` table in the database.
 * This class provides methods to create, find, update, delete, and retrieve metrics for tasks.
 *
 * @constructor
 * @param {Database} db - The SQLite database instance.
 * @description Initializes the TaskModel with the provided database instance.
 */
export class TaskModel {
  constructor(private db: Database) {}

  /**
   * Creates a new task in the database and returns the task data including the generated `id`.
   *
   * @param {Task} task - The task data to be created.
   * @param {number} task.userId - The ID of the user the task belongs to.
   * @param {string} task.title - The title of the task.
   * @param {string} task.description - A detailed description of the task.
   * @param {string} task.dueDate - The due date of the task (format: 'YYYY-MM-DD').
   * @param {string} task.createdAt - The timestamp of when the task was created (format: 'YYYY-MM-DD HH:mm:ss').
   * @param {'pending' | 'completed' | 'in-progress'} task.status - The current status of the task.
   * @param {string[]} task.labels - Labels associated with the task.
   *
   * @returns {Promise<Partial<Task>>} The created task data with an assigned `id`.
   *
   * @throws {Error} Throws an error if there is an issue creating the task in the database.
   */
  async create(task: Partial<Task>): Promise<Partial<Task>> {
    const result = await this.db.run(
      `INSERT INTO tasks (userId, title, description, dueDate, createdAt, status, labels) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        task.userId,
        task.title,
        task.description,
        task.dueDate,
        task.createdAt,
        task.status,
        JSON.stringify(task.labels)
      ]
    );

    return { ...task, id: result.lastID };
  }

  /**
   * Finds tasks by user ID with optional filters and pagination.
   * Fetches tasks for a user with optional filters such as labels, statuses, and pagination.
   *
   * @param {number} userId - The ID of the user whose tasks are being fetched.
   * @param {Object} filters - The filters to apply when fetching tasks.
   * @param {string[]} [filters.labels] - An array of labels to filter tasks by.
   * @param {string[]} [filters.statuses] - An array of statuses to filter tasks by (e.g., 'pending', 'completed').
   * @param {string} [filters.dueDate] - The due date to filter tasks by (format: 'YYYY-MM-DD').
   * @param {'createdAt' | 'dueDate'} [filters.orderBy] - The field by which to order tasks.
   * @param {'ASC' | 'DESC'} [filters.orderDirection] - The direction to order tasks (ascending or descending).
   * @param {Object} pagination - Pagination options.
   * @param {number} pagination.limit - The number of tasks to return per page.
   * @param {number} pagination.page - The current page of tasks.
   *
   * @returns {Promise<Task[]>} An array of tasks that match the provided filters and pagination.
   *
   * @throws {Error} Throws an error if there is an issue querying the database.
   */
  async findByUserId(
    userId: number,
    filters = {} as {
      labels?: string[];
      statuses?: string[];
      dueDate?: string; // format 'YYYY-MM-DD'
      orderBy?: 'createdAt' | 'dueDate';
      orderDirection?: 'ASC' | 'DESC';
    },
    pagination = { limit: 10, page: 1 }
  ): Promise<Task[]> {
    const offset = (pagination.page - 1) * pagination.limit;

    const {
      orderBy,
      orderDirection = 'ASC',
      dueDate,
      statuses,
      labels
    } = filters;

    let query = `SELECT * FROM tasks WHERE userId = ?`;

    const queryParams: (string | number)[] = [userId];

    if (dueDate) {
      query += ` AND dueDate = ?`;
      queryParams.push(dueDate);
    }

    if (statuses && statuses.length > 0) {
      query += ` AND status IN (${statuses.map(() => '?').join(', ')})`;
      queryParams.push(...statuses);
    }

    if (labels && labels.length > 0) {
      query += ` AND labels LIKE ?`;
      queryParams.push(`%${labels.join('%')}%`);
    }

    if (orderBy) {
      query += ` ORDER BY ${orderBy} ${orderDirection}`;
    }

    query += ` LIMIT ? OFFSET ?`;
    queryParams.push(pagination.limit, offset);

    const rows = await this.db.all(query, queryParams);

    return rows.map((row) => ({ ...row, labels: JSON.parse(row.labels) }));
  }

  /**
   * Updates an existing task in the database.
   *
   * @param {number} taskId - The ID of the task to be updated.
   * @param {Partial<Task>} updates - The task fields to update.
   *
   * @returns {Promise<void>} Resolves when the task has been updated.
   *
   * @throws {Error} Throws an error if there is an issue updating the task in the database.
   */
  async update(taskId: number, updates: Partial<Task>): Promise<void> {
    const fields = Object.keys(updates)
      .map((key) => `${key} = ?`)
      .join(', ');

    const values = Object.values(updates);

    await this.db.run(`UPDATE tasks SET ${fields} WHERE id = ?`, [
      ...values,
      taskId
    ]);
  }

  /**
   * Deletes a task from the database.
   *
   * @param {number} taskId - The ID of the task to be deleted.
   *
   * @returns {Promise<void>} Resolves when the task has been deleted.
   *
   * @throws {Error} Throws an error if there is an issue deleting the task in the database.
   * @description Deletes a task from the database based on the provided task ID.
   */
  async delete(taskId: number): Promise<void> {
    await this.db.run(`DELETE FROM tasks WHERE id = ?`, [taskId]);
  }

  /**
   * Retrieves task metrics for a user.
   *
   * @param {number} userId - The ID of the user to get task metrics for.
   *
   * @returns {Promise<{ total: number; pending: number; completed: number; inProgress: number }>} The metrics for the user's tasks, including the total number of tasks, and counts for each status (pending, completed, in-progress).
   *
   * @throws {Error} Throws an error if there is an issue querying the database.
   * @description Retrieves metrics for a user's tasks, including the total number of tasks and their status breakdown.
   */
  async getMetrics(userId: number): Promise<{
    total: number;
    pending: number;
    completed: number;
    inProgress: number;
  }> {
    const rows = await this.db.all(
      `SELECT status, COUNT(*) as count FROM tasks WHERE userId = ? GROUP BY status`,
      [userId]
    );
    const metrics = { total: 0, pending: 0, completed: 0, inProgress: 0 };
    rows.forEach((row) => {
      metrics.total += row.count;
      if (row.status === 'pending') metrics.pending = row.count;
      if (row.status === 'completed') metrics.completed = row.count;
      if (row.status === 'in-progress') metrics.inProgress = row.count;
    });
    return metrics;
  }
}
