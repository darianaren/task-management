/**
 * @class CustomError
 * @extends Error
 *
 * @description
 * Represents a custom error class that extends the built-in `Error` class in JavaScript.
 * Adds an optional `details` property for additional error information.
 */
export class CustomError extends Error {
  details: string;

  /**
   * Creates an instance of CustomError.
   *
   * @param {string} message - The error message.
   * @param {string} [details] - Optional additional details about the error. Defaults to the error message if not provided.
   */
  constructor(message: string, details?: string) {
    super(message);
    this.details = details || message;

    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
