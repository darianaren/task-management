/**
 * @interface User
 *
 * @description
 * Represents a user in the system.
 *
 * @type {number} - `id`: Unique identifier for the user.
 * @type {string} - `name`: Full name of the user.
 * @type {string} - `email`: Email address of the user.
 * @type {string[]} - `labels`: Array of labels or categories associated with the user.
 * @type {string} - `passwordHash`: Hashed password for authentication.
 */
export interface User {
  id: number;
  name: string;
  email: string;
  labels: string[];
  passwordHash: string;
}
