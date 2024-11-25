/* eslint-disable @typescript-eslint/no-explicit-any */
import { Database } from 'sqlite';

import { TaskModel } from '../../models/taskModel';
import { Task } from '../../interfaces/ITask';

jest.mock('sqlite');

describe('TaskModel', () => {
  let dbMock: jest.Mocked<Database>;
  let taskModel: TaskModel;

  beforeEach(() => {
    dbMock = {
      run: jest.fn(),
      all: jest.fn(),
      get: jest.fn()
    } as any;
    taskModel = new TaskModel(dbMock);
  });

  describe('create', () => {
    it('should create a task and return the task with an id', async () => {
      const task: Partial<Task> = {
        userId: 1,
        title: 'New Task',
        status: 'pending',
        dueDate: '2024-12-01',
        labels: ['label1', 'label2'],
        createdAt: '2024-11-21 12:00:00',
        description: 'Task Description'
      };

      const mockResult = { lastID: 1 };
      (dbMock.run as jest.Mock).mockResolvedValue(mockResult);

      const result = await taskModel.create(task);

      expect(result).toEqual({ ...task, id: mockResult.lastID });
    });
  });

  describe('findByUserId', () => {
    it('should fetch tasks by userId with optional filters', async () => {
      const userId = 1;
      const filters = {
        labels: ['label1'],
        statuses: ['pending'],
        orderBy: 'dueDate',
        orderDirection: 'ASC'
      } as {
        dueDate?: string;
        labels?: string[];
        statuses?: string[];
        orderBy?: 'createdAt' | 'dueDate';
        orderDirection?: 'ASC' | 'DESC';
      };
      const pagination = { limit: 10, page: 1 };

      const mockRows = [
        {
          id: 1,
          userId: 1,
          title: 'Task 1',
          description: 'Description 1',
          dueDate: '2024-12-01',
          createdAt: '2024-11-21 12:00:00',
          status: 'pending',
          labels: '["label1"]'
        }
      ];

      dbMock.all.mockResolvedValue(mockRows);
      dbMock.get.mockResolvedValue({ total: 1 });

      const result = await taskModel.findByUserId(userId, filters, pagination);

      expect(result).toEqual({
        tasks: mockRows.map((row) => ({
          ...row,
          labels: JSON.parse(row.labels)
        })),
        totalPages: 1
      });
    });
  });

  describe('update', () => {
    it('should update a task by taskId', async () => {
      const taskId = 1;
      const updates = { status: 'completed' } as {
        status: 'pending' | 'completed' | 'in-progress';
      };

      (dbMock.run as jest.Mock).mockResolvedValue({});

      await taskModel.update(taskId, updates);
    });
  });

  describe('delete', () => {
    it('should delete a task by taskId', async () => {
      const taskId = 1;

      (dbMock.run as jest.Mock).mockResolvedValue({});

      await taskModel.delete(taskId);

      expect(dbMock.run).toHaveBeenCalledWith(
        'DELETE FROM tasks WHERE id = ?',
        [taskId]
      );
    });
  });

  describe('getMetrics', () => {
    it('should return task metrics for a user', async () => {
      const userId = 1;

      const mockRows = [
        { status: 'pending', count: 3 },
        { status: 'completed', count: 5 }
      ];

      dbMock.all.mockResolvedValue(mockRows);

      const result = await taskModel.getMetrics(userId);

      expect(result).toEqual({
        total: 8,
        pending: 3,
        completed: 5,
        inProgress: 0
      });
    });
  });
});
