/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';

import { UserModel } from '../../models/userModel';
import { LabelController } from '../../controllers/labelController';
import { ERROR_RESPONSES, ERRORS } from '../../constants/errorResponses';
import { SUCCESS, SUCCESS_RESPONSES } from '../../constants/sucessResponse';

jest.mock('../../models/userModel');

describe('LabelController', () => {
  let labelController: LabelController;
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
    labels: [],
    name: 'User Test',
    email: 'test@example.com',
    passwordHash: 'hashedPassword'
  };

  beforeEach(() => {
    mockUserModel = {
      create: jest.fn(),
      update: jest.fn(),
      findById: jest.fn()
    } as unknown as jest.Mocked<UserModel>;

    labelController = new LabelController(mockUserModel);

    (mockReq as any).user = { id: 1 };
    mockReq.body = { label: 'Important' };
    jest.clearAllMocks();
  });

  it('should create a new label successfully', async () => {
    mockUserModel.findById.mockResolvedValueOnce(userTest);
    mockUserModel.update.mockResolvedValueOnce(undefined);

    await labelController.createLabel(mockReq as Request, mockRes as Response);

    expect(mockUserModel.findById).toHaveBeenCalledWith(1);
    expect(mockUserModel.update).toHaveBeenCalledWith(1, {
      labels: ['Important']
    });
    expect(mockRes.json).toHaveBeenCalledWith({
      ...SUCCESS_RESPONSES[SUCCESS.CREATED],
      data: { labels: ['Important'] },
      success: true
    });
  });

  it('should return an error if user is not found', async () => {
    mockUserModel.findById.mockResolvedValueOnce(null);

    await labelController.createLabel(mockReq as Request, mockRes as Response);

    expect(mockUserModel.findById).toHaveBeenCalledWith(1);
    expect(mockRes.json).toHaveBeenCalledWith({
      ...ERROR_RESPONSES[ERRORS.NOT_FOUND],
      details: 'User not found',
      success: false
    });
  });

  it('should return an error if label already exists', async () => {
    mockUserModel.findById.mockResolvedValueOnce(userTest);

    await labelController.createLabel(mockReq as Request, mockRes as Response);

    expect(mockUserModel.findById).toHaveBeenCalledWith(1);
    expect(mockRes.json).toHaveBeenCalledWith({
      ...ERROR_RESPONSES[ERRORS.CONFLICT],
      details: 'Label already exists',
      success: false
    });
  });

  it('should handle unexpected errors gracefully', async () => {
    mockUserModel.findById.mockRejectedValueOnce(new Error('Unexpected error'));

    await labelController.createLabel(mockReq as Request, mockRes as Response);

    expect(mockUserModel.findById).toHaveBeenCalledWith(1);
    expect(mockRes.json).toHaveBeenCalledWith({
      ...ERROR_RESPONSES[ERRORS.INTERNAL_SERVER_ERROR],
      details: 'Unexpected error',
      success: false
    });
  });
});
