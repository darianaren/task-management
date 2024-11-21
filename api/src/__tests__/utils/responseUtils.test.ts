/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponseOptions } from '../../interfaces/IResponses';
import { ERROR_RESPONSES, ERRORS } from '../../constants/errorResponses';
import { SUCCESS, SUCCESS_RESPONSES } from '../../constants/sucessResponse';
import { errorResponse, successResponse } from '../../utils/responseUtils';

describe('Response Utilities', () => {
  const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  } as any;

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('successResponse', () => {
    it('should send a default success response if no options are provided', () => {
      successResponse(mockRes, {});
      expect(mockRes.status).toHaveBeenCalledWith(
        SUCCESS_RESPONSES[SUCCESS.OK].status
      );
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        data: undefined,
        status: SUCCESS_RESPONSES[SUCCESS.OK].status,
        details: undefined,
        message: SUCCESS_RESPONSES[SUCCESS.OK].message
      });
    });

    it('should send a success response with custom options', () => {
      const options: ResponseOptions = {
        status: 201,
        data: { id: 1 },
        details: 'Extra details',
        message: 'Created successfully'
      };

      successResponse(mockRes, options);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        ...options
      });
    });
  });

  describe('errorResponse', () => {
    it('should send a default error response if no options are provided', () => {
      errorResponse(mockRes, {});
      expect(mockRes.status).toHaveBeenCalledWith(
        ERROR_RESPONSES[ERRORS.INTERNAL_SERVER_ERROR].status
      );
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        data: undefined,
        status: ERROR_RESPONSES[ERRORS.INTERNAL_SERVER_ERROR].status,
        details: undefined,
        message: ERROR_RESPONSES[ERRORS.INTERNAL_SERVER_ERROR].message
      });
    });

    it('should send an error response with custom options', () => {
      const options: ResponseOptions = {
        status: 404,
        message: 'Resource not found',
        data: { resource: 'User' },
        details: 'Check the user ID'
      };

      errorResponse(mockRes, options);
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        ...options
      });
    });
  });
});
