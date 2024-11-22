import { Request, Response } from 'express';

import { UserModel } from '../../models/userModel';
import { generateToken } from '../../utils/jwtUtils';
import { comparePassword } from '../../utils/bcryptUtils';
import { AuthController } from '../../controllers/authController';
import { ERROR_RESPONSES, ERRORS } from '../../constants/errorResponses';
import { SUCCESS, SUCCESS_RESPONSES } from '../../constants/sucessResponse';
import { base64ToString } from '../../utils/base64Utils';

jest.mock('../../utils/jwtUtils');
jest.mock('../../utils/bcryptUtils');
jest.mock('../../utils/base64Utils');

describe('AuthController', () => {
  let authController: AuthController;
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
    labels: ['label1'],
    email: 'test@example.com',
    passwordHash: 'hashedPassword'
  };
  const plainPassword = 'mySecretPassword';

  beforeEach(() => {
    mockUserModel = {
      findByEmail: jest.fn(),
      create: jest.fn()
    } as unknown as jest.Mocked<UserModel>;

    authController = new AuthController(mockUserModel);

    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should return error if user is not found', async () => {
      mockUserModel.findByEmail.mockResolvedValue(null);
      mockReq.body = { email: userTest.email, password: 'password123' };

      await authController.login(mockReq as Request, mockRes as Response);

      expect(mockRes.json).toHaveBeenCalledWith({
        ...ERROR_RESPONSES[ERRORS.NOT_FOUND],
        details: 'User not found',
        success: false
      });
    });

    it('should return error if password is invalid', async () => {
      mockUserModel.findByEmail.mockResolvedValue(userTest);
      (comparePassword as jest.Mock).mockResolvedValue(false);

      mockReq.body = { email: userTest.email, password: 'password123' };

      await authController.login(mockReq as Request, mockRes as Response);

      expect(mockRes.json).toHaveBeenCalledWith({
        ...ERROR_RESPONSES[ERRORS.UNAUTHORIZED],
        details: 'Invalid password',
        success: false
      });
    });

    it('should return a token if login is successful', async () => {
      mockUserModel.findByEmail.mockResolvedValue(userTest);
      (comparePassword as jest.Mock).mockResolvedValue(true);
      (generateToken as jest.Mock).mockReturnValue('fakeToken');

      mockReq.body = { email: userTest.email, password: plainPassword };

      await authController.login(mockReq as Request, mockRes as Response);

      expect(mockRes.json).toHaveBeenCalledWith({
        ...SUCCESS_RESPONSES[SUCCESS.OK],
        data: { token: 'fakeToken' },
        success: true
      });
    });

    it('should handle unexpected errors', async () => {
      mockUserModel.findByEmail.mockRejectedValue(new Error('Database error'));

      await authController.login(mockReq as Request, mockRes as Response);

      expect(mockRes.json).toHaveBeenCalledWith({
        ...ERROR_RESPONSES[ERRORS.INTERNAL_SERVER_ERROR],
        details: 'Database error',
        success: false
      });
    });
  });

  describe('register', () => {
    it('should return error if email is already in use', async () => {
      mockUserModel.findByEmail.mockResolvedValue(userTest);
      mockReq.body = {
        name: userTest.name,
        email: userTest.email,
        password: plainPassword
      };

      await authController.register(mockReq as Request, mockRes as Response);

      expect(mockRes.json).toHaveBeenCalledWith({
        ...ERROR_RESPONSES[ERRORS.CONFLICT],
        details: 'Email already in use',
        success: false
      });
    });

    it('should create a new user and return success response', async () => {
      mockUserModel.findByEmail.mockResolvedValue(null);
      (base64ToString as jest.Mock).mockReturnValue('parsedPassword');
      mockUserModel.create.mockResolvedValue({
        id: userTest.id,
        name: userTest.name,
        email: userTest.email
      });

      mockReq.body = {
        name: userTest.name,
        email: userTest.email,
        password: plainPassword
      };

      await authController.register(mockReq as Request, mockRes as Response);

      expect(mockRes.json).toHaveBeenCalledWith({
        ...SUCCESS_RESPONSES[SUCCESS.CREATED],
        data: { id: userTest.id, name: userTest.name, email: userTest.email },
        success: true
      });
    });

    it('should handle unexpected errors during registration', async () => {
      mockUserModel.findByEmail.mockRejectedValue(new Error('Database error'));

      await authController.register(mockReq as Request, mockRes as Response);

      expect(mockRes.json).toHaveBeenCalledWith({
        ...ERROR_RESPONSES[ERRORS.INTERNAL_SERVER_ERROR],
        details: 'Database error',
        success: false
      });
    });
  });
});
