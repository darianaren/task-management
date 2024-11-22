import { Request, Response, NextFunction } from 'express';
import validateBodyMiddleware from '../../middlewares/validateBodyMiddleware';
import { ERROR_RESPONSES, ERRORS } from '../../constants/errorResponses';
import { TYPES_MASKS, TYPES_VALIDATIONS } from '../../constants/validations';

describe('validateBodyMiddleware', () => {
  const mockRes: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  };
  const mockReq: Partial<Request> = {
    header: jest.fn()
  };
  const mockNext: NextFunction = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call next() if no validation errors occur', () => {
    const middleware = validateBodyMiddleware([
      {
        name: 'email',
        required: true,
        type: 'string',
        format: TYPES_VALIDATIONS.email
      }
    ]);

    mockReq.body = { email: 'test@example.com' };

    middleware(mockReq as Request, mockRes as Response, mockNext);

    expect(mockNext).toHaveBeenCalled();
  });

  it('should return an error if a required field is missing', () => {
    const middleware = validateBodyMiddleware([
      { name: 'email', required: true }
    ]);

    mockReq.body = {};

    middleware(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.json).toHaveBeenCalledWith({
      ...ERROR_RESPONSES[ERRORS.BAD_REQUEST],
      details: 'The field email is required.',
      success: false
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should return an error if the field type is incorrect', () => {
    const middleware = validateBodyMiddleware([
      { name: 'age', required: true, type: 'number' }
    ]);

    mockReq.body = { age: 'not-a-number' };

    middleware(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.json).toHaveBeenCalledWith({
      ...ERROR_RESPONSES[ERRORS.BAD_REQUEST],
      details: 'The field age must be of type number.',
      success: false
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should return an error if the field format is invalid', () => {
    const middleware = validateBodyMiddleware([
      {
        name: 'email',
        required: true,
        type: 'string',
        format: TYPES_VALIDATIONS.email
      }
    ]);

    mockReq.body = { email: 'invalid-email' };

    middleware(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.json).toHaveBeenCalledWith({
      ...ERROR_RESPONSES[ERRORS.BAD_REQUEST],
      details: 'The field email must be a valid format.',
      success: false
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should return an error if the field value is below the minimum', () => {
    const middleware = validateBodyMiddleware([
      { name: 'age', required: true, type: 'number', min: 18 }
    ]);

    mockReq.body = { age: 16 };

    middleware(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.json).toHaveBeenCalledWith({
      ...ERROR_RESPONSES[ERRORS.BAD_REQUEST],
      details: 'The field age must be at least 18.',
      success: false
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should apply a mask if specified', () => {
    const middleware = validateBodyMiddleware([
      {
        name: 'username',
        required: true,
        type: 'string',
        applyMask: TYPES_MASKS.upper
      }
    ]);

    mockReq.body = { username: 'lowercase' };

    middleware(mockReq as Request, mockRes as Response, mockNext);

    expect(mockReq.body.username).toBe('LOWERCASE');
    expect(mockNext).toHaveBeenCalled();
  });

  it('should return an error if the field value exceeds the maximum', () => {
    const middleware = validateBodyMiddleware([
      { name: 'username', required: true, type: 'string', max: 5 }
    ]);

    mockReq.body = { username: 'toolong' };

    middleware(mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.json).toHaveBeenCalledWith({
      ...ERROR_RESPONSES[ERRORS.BAD_REQUEST],
      details: 'The field username must not exceed 5.',
      success: false
    });
    expect(mockNext).not.toHaveBeenCalled();
  });
});
