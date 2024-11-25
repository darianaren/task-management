import { Request, Response } from 'express';

import { UserModel } from '../models/userModel';
import { ERROR_RESPONSES, ERRORS } from '../constants/errorResponses';
import { errorResponse, successResponse } from '../utils/responseUtils';
import { SUCCESS, SUCCESS_RESPONSES } from '../constants/sucessResponse';

/**
 * @class LabelController
 *
 * @description
 * This controller handles operations related to labels of the taskss.
 * It interacts with the UserModel to perform database operations.
 *
 * @constructor
 * @param {UserModel} userModel - Instance of the UserModel used to interact with the task database.
 */
export class LabelController {
  constructor(private userModel: UserModel) {}

  /**
   * Creates a new label for the authenticated user.
   * The label is created with the data sent in the request body and the user ID of the authenticated user.
   *
   * @param {Request} req - The HTTP request object containing the task ID and update data.
   * @param {Response} res - The HTTP response object used to send the updated task data.
   *
   * @returns {Promise<void | Response>} The updated task data or an error response.
   *
   * @throws {Error} - If an unexpected error occurs during the updating process.
   */
  async createLabel(req: Request, res: Response): Promise<void | Response> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { id } = (req as any).user;
    const { label } = req.body as { label: string };

    try {
      const user = await this.userModel.findById(id);
      if (!user)
        return errorResponse(res, {
          ...ERROR_RESPONSES[ERRORS.NOT_FOUND],
          details: 'User not found'
        });

      if (user.labels.includes(label))
        return errorResponse(res, {
          ...ERROR_RESPONSES[ERRORS.CONFLICT],
          details: 'Label already exists'
        });

      user.labels.push(label);

      await this.userModel.update(id, { labels: user.labels });

      return successResponse(res, {
        ...SUCCESS_RESPONSES[SUCCESS.CREATED],
        data: { labels: user.labels }
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: Error | any | unknown) {
      return errorResponse(res, {
        ...ERROR_RESPONSES[ERRORS.INTERNAL_SERVER_ERROR],
        details: error?.message
      });
    }
  }
}
