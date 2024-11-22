/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';

import { UserModel } from '../../models/userModel';
import { UserController } from '../../controllers/userController';
import { ERROR_RESPONSES, ERRORS } from '../../constants/errorResponses';
import { SUCCESS, SUCCESS_RESPONSES } from '../../constants/sucessResponse';

jest.mock('../../models/userModel');

describe('UserController', () => {
  let userController: UserController;
  let mockUserModel: jest.Mocked<UserModel>;

  const mockRes: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  };
  const mockReq: Partial<Request> = {
    header: jest.fn()
  };

  const userTest = {
    id: 1,
    name: 'User Test',
    email: 'test@example.com',
    labels: ['Important', 'Work'],
    passwordHash: 'hashedPassword'
  };

  beforeEach(() => {
    mockUserModel = {
      create: jest.fn(),
      update: jest.fn(),
      findById: jest.fn()
    } as unknown as jest.Mocked<UserModel>;

    userController = new UserController(mockUserModel);

    (mockReq as any).user = { id: 1 };

    jest.clearAllMocks();
  });

  it('should retrieve user data successfully', async () => {
    mockUserModel.findById.mockResolvedValueOnce(userTest);

    await userController.getUser(mockReq as Request, mockRes as Response);

    expect(mockUserModel.findById).toHaveBeenCalledWith(1);
    expect(mockRes.json).toHaveBeenCalledWith({
      ...SUCCESS_RESPONSES[SUCCESS.OK],
      data: { name: userTest.name, labels: userTest.labels },
      success: true
    });
  });

  it('should return an error if user is not found', async () => {
    mockUserModel.findById.mockResolvedValueOnce(null);

    await userController.getUser(mockReq as Request, mockRes as Response);

    expect(mockUserModel.findById).toHaveBeenCalledWith(1);
    expect(mockRes.json).toHaveBeenCalledWith({
      ...ERROR_RESPONSES[ERRORS.NOT_FOUND],
      details: 'User not found',
      success: false
    });
  });

  it('should handle unexpected errors gracefully', async () => {
    mockUserModel.findById.mockRejectedValueOnce(new Error('Unexpected error'));

    await userController.getUser(mockReq as Request, mockRes as Response);

    expect(mockUserModel.findById).toHaveBeenCalledWith(1);
    expect(mockRes.json).toHaveBeenCalledWith({
      ...ERROR_RESPONSES[ERRORS.INTERNAL_SERVER_ERROR],
      details: 'Unexpected error',
      success: false
    });
  });
});
