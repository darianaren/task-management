import { Request, Response } from 'express';
import { UserModel } from '../models/userModel';

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
    const { label } = req.body as { label?: string };
    try {
      if (!label || label.trim().length === 0) {
        return res
          .status(400)
          .json({ error: 'Label is required and cannot be empty.' });
      }

      const formattedLabel =
        label.charAt(0).toUpperCase() + label.slice(1).toLowerCase();

      const user = await this.userModel.findById(id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      if (user.labels.includes(formattedLabel)) {
        return res.status(400).json({ error: 'Label already exists' });
      }

      user.labels.push(formattedLabel);

      await this.userModel.update(id, { labels: user.labels });

      res
        .status(200)
        .json({ message: 'Label added successfully', labels: user.labels });
    } catch (error) {
      console.error('Error creating label:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
