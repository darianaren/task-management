import { Request, Response, NextFunction } from 'express';

import { verifyToken } from '../../utils/jwtUtils';
import authMiddleware from '../../middlewares/authMiddleware';
import { ERROR_RESPONSES, ERRORS } from '../../constants/errorResponses';

jest.mock('../../utils/jwtUtils');

describe('authMiddleware', () => {
  const mockRes: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  };
  const mockReq: Partial<Request> = {
    header: jest.fn()
  };
  const mockNext: NextFunction = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call next() when a valid token is provided', () => {
    const mockToken = 'validToken';
    const mockDecoded = { id: 1, email: 'test@example.com' };

    (mockReq.header as jest.Mock).mockReturnValue(`Bearer ${mockToken}`);
    (verifyToken as jest.Mock).mockReturnValue(mockDecoded);

    authMiddleware(mockReq as Request, mockRes as Response, mockNext);

    expect(mockNext).toHaveBeenCalledTimes(1);
    expect(mockReq).toHaveProperty('user', {
      id: mockDecoded.id,
      email: mockDecoded.email
    });
  });

  it('should return a 401 error if the token is missing', () => {
    (mockReq.header as jest.Mock).mockReturnValue(undefined);

    authMiddleware(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      ...ERROR_RESPONSES[ERRORS.UNAUTHORIZED],
      details: 'Missing token',
      success: false
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should return a 401 error if the token is invalid', () => {
    const mockToken = 'invalidToken';
    const mockError = new Error('Invalid token');

    (mockReq.header as jest.Mock).mockReturnValue(`Bearer ${mockToken}`);
    (verifyToken as jest.Mock).mockImplementation(() => {
      throw mockError;
    });

    authMiddleware(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      ...ERROR_RESPONSES[ERRORS.UNAUTHORIZED],
      details: 'Invalid token.',
      data: { error: mockError },
      success: false
    });
    expect(mockNext).not.toHaveBeenCalled();
  });
});
