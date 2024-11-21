/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';
import { Database } from 'sqlite';

import { UserModel } from '../models/userModel';
import { LabelController } from '../controllers/labelController';
import validateBodyMiddleware from '../middlewares/validateBodyMiddleware';
import { CREATE_LABEL_VALIDATIONS } from '../constants/validations/label';

const router = Router();

export default router;

export function labelRoutes(db: Database): Router {
  const router = Router();

  const userModel = new UserModel(db);
  const labelController = new LabelController(userModel);

  /**
   * Adds a new label to the user's list of labels.
   *
   * @param {object} request.body - The body object containing the new label.
   * @param {object} response - The response object.
   * @property {string} request.body.label - The label to be added to the user's labels.
   *
   * @returns {Promise<object>} - A JSON object containing the updated list of labels for the user.
   * @throws {Error} - If an error occurs while adding the label (e.g., if the label already exists).
   */
  router.post(
    '/',
    validateBodyMiddleware(CREATE_LABEL_VALIDATIONS) as any,
    labelController.createLabel.bind(labelController) as any
  );

  return router;
}
