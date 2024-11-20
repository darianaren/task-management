import { Request, Response } from 'express';
import { UserModel } from '../models/userModel';

/**
 * @class UserController
 *
 * @description
 * This controller handles operations related to user management such as retrieving user data and creating new users.
 * It interacts with the UserModel to perform database operations.
 *
 * @constructor
 * @param {UserModel} userModel - Instance of the UserModel used to interact with the user database.
 */
export class UserController {
  constructor(private userModel: UserModel) {}

  /**
   * @function getUser
   *
   * @description
   * Retrieves a user by their unique ID and returns their name and labels.
   * If the user is not found, a 404 error is returned. If an internal error occurs, a 500 error is returned.
   *
   * @param {Request} req - The request object containing the user ID in the user object.
   * @param {Response} res - The response object used to send the result (user data or error) back to the client.
   *
   * @returns {Promise<void | Response>} - A promise that resolves with the user data if found, or an error message.
   *
   * @throws {Error} - If an unexpected error occurs during the retrieval process.
   */
  async getUser(req: Request, res: Response): Promise<void | Response> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { id } = (req as any).user;

    try {
      const user = await this.userModel.findById(parseInt(id));
      if (!user) return res.status(404).json({ error: 'User not found' });

      res.json({ name: user.name, labels: user.labels });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
