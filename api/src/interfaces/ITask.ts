/**
 * @interface Task
 *
 * @description
 * Represents a task in the system.
 *
 * @type {number} - `id`: Unique identifier.
 * @type {string} - `title`: The title or summary of the task.
 * @type {number} - `userId`: ID of the user to whom the task belongs.
 * @type {string} - `dueDate`: The deadline for completing the task.
 * @type {string[]} - `labels`: Array of associated labels or categories.
 * @type {string} - `createdAt`: Timestamp when the task was created.
 * @type {string} - `description`: A detailed explanation of the task.
 * @type {'pending' | 'completed' | 'in-progress'} - `status`: Current state of the task.
 * - `pending`: The task has not been started.
 * - `completed`: The task has been finished.
 * - `in-progress`: The task is actively being worked on.
 */
export interface Task {
  id: number;
  title: string;
  userId: number;
  dueDate: string;
  labels: string[];
  createdAt: string;
  description: string;
  status: 'pending' | 'completed' | 'in-progress';
}
