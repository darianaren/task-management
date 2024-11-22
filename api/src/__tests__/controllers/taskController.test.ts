/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
// import { UserModel } from '../../models/userModel';
import { TaskModel } from '../../models/taskModel';
import { TaskController } from '../../controllers/taskController';
import { SUCCESS, SUCCESS_RESPONSES } from '../../constants/sucessResponse';
import { ERROR_RESPONSES, ERRORS } from '../../constants/errorResponses';
import { Task } from '../../interfaces/ITask';

describe('TaskController', () => {
  let taskController: TaskController;
  // let mockUserModel: jest.Mocked<UserModel>;
  let mockTaskModel: jest.Mocked<TaskModel>;
  const mockRes: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  };
  const mockReq: Partial<Request> = {
    query: {},
    header: jest.fn()
  };

  const taskTest: Partial<Task> = {
    id: 1,
    labels: ['Work'],
    status: 'pending',
    title: 'Test Task',
    dueDate: '2025-01-15',
    description: 'Task description'
  };

  beforeEach(() => {
    // mockUserModel = {
    //   findByEmail: jest.fn(),
    //   create: jest.fn()
    // } as unknown as jest.Mocked<UserModel>;

    mockTaskModel = {
      create: jest.fn(),
      findByUserId: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
      getMetrics: jest.fn()
    } as unknown as jest.Mocked<TaskModel>;

    taskController = new TaskController(mockTaskModel);
    (mockReq as any).user = { id: 10 };

    jest.clearAllMocks();
  });

  describe('createTask', () => {
    it('should create a new task and return success', async () => {
      mockReq.body = taskTest;
      mockTaskModel.create.mockResolvedValue(taskTest);

      await taskController.createTask(mockReq as Request, mockRes as Response);

      expect(mockTaskModel.create).toHaveBeenCalledWith({
        ...mockReq.body,
        createdAt: expect.any(String),
        userId: (mockReq as any).user.id
      });
      expect(mockRes.json).toHaveBeenCalledWith({
        ...SUCCESS_RESPONSES[SUCCESS.CREATED],
        data: taskTest,
        success: true
      });
    });

    it('should handle errors during task creation', async () => {
      const error = new Error('Database error');
      mockTaskModel.create.mockRejectedValue(error);

      await taskController.createTask(mockReq as Request, mockRes as Response);

      expect(mockRes.json).toHaveBeenCalledWith({
        ...ERROR_RESPONSES[ERRORS.INTERNAL_SERVER_ERROR],
        details: error.message,
        success: false
      });
    });
  });

  describe('getTasks', () => {
    it('should retrieve tasks successfully', async () => {
      const userTasks = [
        { ...taskTest, createdAt: '2024-11-21', userId: 10 } as Task
      ];
      mockTaskModel.findByUserId.mockResolvedValue(userTasks);

      await taskController.getTasks(mockReq as Request, mockRes as Response);

      expect(mockTaskModel.findByUserId).toHaveBeenCalledWith(
        (mockReq as any).user.id,
        {
          dueDate: undefined,
          orderBy: undefined,
          orderDirection: undefined,
          labels: undefined,
          statuses: undefined
        },
        { limit: 10, page: 1 }
      );
      expect(mockRes.json).toHaveBeenCalledWith({
        ...SUCCESS_RESPONSES[SUCCESS.OK],
        data: userTasks,
        success: true
      });
    });

    it('should handle errors during task retrieval', async () => {
      const error = new Error('Database error');
      mockTaskModel.findByUserId.mockRejectedValue(error);

      await taskController.getTasks(mockReq as Request, mockRes as Response);

      expect(mockRes.json).toHaveBeenCalledWith({
        ...ERROR_RESPONSES[ERRORS.INTERNAL_SERVER_ERROR],
        details: error.message,
        success: false
      });
    });
  });

  describe('deleteTask', () => {
    it('should delete a task successfully', async () => {
      mockReq.body = { id: 1 };

      await taskController.deleteTask(mockReq as Request, mockRes as Response);

      expect(mockTaskModel.delete).toHaveBeenCalledWith(1);
      expect(mockRes.json).toHaveBeenCalledWith({
        ...SUCCESS_RESPONSES[SUCCESS.NO_CONTENT],
        success: true
      });
    });

    it('should handle errors during task deletion', async () => {
      const error = new Error('Database error');
      mockTaskModel.delete.mockRejectedValue(error);
      mockReq.body = { id: 1 };

      await taskController.deleteTask(mockReq as Request, mockRes as Response);

      expect(mockRes.json).toHaveBeenCalledWith({
        ...ERROR_RESPONSES[ERRORS.INTERNAL_SERVER_ERROR],
        details: error.message,
        success: false
      });
    });
  });

  describe('updateTask', () => {
    it('should update a task successfully', async () => {
      mockReq.body = { id: 1, title: 'Updated Task' };

      await taskController.updateTask(mockReq as Request, mockRes as Response);

      expect(mockTaskModel.update).toHaveBeenCalledWith(1, {
        title: 'Updated Task'
      });
      expect(mockRes.json).toHaveBeenCalledWith({
        ...SUCCESS_RESPONSES[SUCCESS.NO_CONTENT],
        success: true
      });
    });

    it('should handle errors during task update', async () => {
      const error = new Error('Database error');
      mockTaskModel.update.mockRejectedValue(error);
      mockReq.body = { id: 1, title: 'Updated Task' };

      await taskController.updateTask(mockReq as Request, mockRes as Response);

      expect(mockRes.json).toHaveBeenCalledWith({
        ...ERROR_RESPONSES[ERRORS.INTERNAL_SERVER_ERROR],
        details: error.message,
        success: false
      });
    });
  });

  describe('getMetrics', () => {
    it('should retrieve metrics successfully', async () => {
      const metrics = { total: 9, pending: 2, completed: 6, inProgress: 1 };
      mockTaskModel.getMetrics.mockResolvedValue(metrics);

      await taskController.getMetrics(mockReq as Request, mockRes as Response);

      expect(mockTaskModel.getMetrics).toHaveBeenCalledWith(
        (mockReq as any).user.id
      );
      expect(mockRes.json).toHaveBeenCalledWith({
        ...SUCCESS_RESPONSES[SUCCESS.OK],
        data: metrics,
        success: true
      });
    });

    it('should handle errors during metrics retrieval', async () => {
      const error = new Error('Database error');
      mockTaskModel.getMetrics.mockRejectedValue(error);

      await taskController.getMetrics(mockReq as Request, mockRes as Response);

      expect(mockRes.json).toHaveBeenCalledWith({
        ...ERROR_RESPONSES[ERRORS.INTERNAL_SERVER_ERROR],
        details: error.message,
        success: false
      });
    });
  });
});
