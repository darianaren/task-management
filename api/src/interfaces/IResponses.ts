/**
 * @interface ResponseOptions
 *
 * @description
 * Represents the structure of a response object in the system. It includes
 * the status code, message, associated data, and optional additional details.
 *
 * @type {number} [code] - The HTTP status code to be returned in the response.
 * - Default is `200` if not provided.
 * - Common codes: `200` (success), `400` (bad request), `404` (not found), `500` (internal server error).
 *
 * @type {object} [data] - The data to be included in the response body.
 * - This could be user information, task details, etc.
 *
 * @type {string} [message] - A brief message describing the result of the request.
 * - For example: `"Request successful"`, `"User not found"`.
 * - Default is a generic message based on the status code.
 *
 * @type {string} [details] - Optional detailed explanation of the result or error.
 * - Could include additional information, such as validation errors or reasons for failure.
 * - Useful for debugging or providing more context.
 */
export interface ResponseOptions {
  code?: number;
  data?: object;
  message?: string;
  details?: string;
}
