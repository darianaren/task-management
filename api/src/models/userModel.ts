import { Database } from 'sqlite';

import { User } from '../interfaces/IUser';
import { hashPassword } from '../utils/bcryptUtils';
import { ERROR_RESPONSES, ERRORS } from '../constants/errorResponses';

const defaultLabels = Object.freeze(['Trabajo', 'Personal', 'Urgente']);

/**
 * @class UserModel
 *
 * @description
 * Represents the model for interacting with the `users` table in the database.
 * This class provides methods to create, find, and update user records.
 *
 * @constructor
 * @param {Database} db - The SQLite database instance.
 * @description Initializes the UserModel with the provided database instance.
 */
export class UserModel {
  constructor(private db: Database) {}

  /**
   * Creates a new user in the database and returns the user data excluding the password hash.
   *
   * @param {Object} user - The user data to be created.
   * @param {string} user.name - The name of the user.
   * @param {string} user.email - The email address of the user.
   * @param {string} user.password - The password of the user.
   *
   * @returns {Promise<Partial<User>>} The created user data, excluding sensitive information like password.
   *
   * @throws {Error} If the email is already in use.
   *   - **Status 409**: "Email already in use"
   */
  async create(user: {
    name: string;
    email: string;
    password: string;
  }): Promise<Partial<User>> {
    const existingUser = await this.db.get(
      `SELECT * FROM users WHERE email = ?`,
      [user.email]
    );

    if (existingUser) {
      throw {
        ...ERROR_RESPONSES[ERRORS.CONFLICT],
        details: 'Email already in use'
      };
    }

    const passwordHash = await hashPassword(user.password);

    const result = await this.db.run(
      `INSERT INTO users (name, email, passwordHash, labels) VALUES (?, ?, ?, ?)`,
      [user.name, user.email, passwordHash, JSON.stringify(defaultLabels)]
    );

    return {
      name: user.name,
      email: user.email,
      id: result.lastID,
      labels: [...defaultLabels]
    };
  }

  /**
   * Finds a user by their ID.
   * Fetches a user by their ID from the database.
   *
   * @param {number} id - The ID of the user to be fetched.
   *
   * @returns {Promise<User | null>} The user data if found, otherwise null.
   */
  async findById(id: number): Promise<User | null> {
    const row = await this.db.get(`SELECT * FROM users WHERE id = ?`, [id]);

    if (!row) return null;

    const data = { ...row, labels: JSON.parse(row.labels) };
    delete data.passwordHash;

    return data;
  }

  /**
   * Finds a user by their email address.
   * Fetches a user by their email from the database.
   *
   * @param {string} email - The email of the user to be fetched.
   *
   * @returns {Promise<User | null>} The user data if found, otherwise null.
   */
  async findByEmail(email: string): Promise<User | null> {
    const row = await this.db.get(`SELECT * FROM users WHERE email = ?`, [
      email
    ]);

    if (!row) return null;

    const data = { ...row, labels: JSON.parse(row.labels) };

    return data;
  }

  /**
   * Updates a user's information in the database.
   * Updates the specified fields of a user in the database.
   *
   * @param {number} userId - The ID of the user to be updated.
   * @param {Partial<User>} updates - The fields to be updated.
   *
   * @returns {Promise<void>} A promise indicating the operation's completion.
   */
  async update(userId: number, updates: Partial<User>): Promise<void> {
    const fields = Object.keys(updates)
      .map((key) => `${key} = ?`)
      .join(', ');

    const values = Object.values(updates).map((value) =>
      Array.isArray(value) ? JSON.stringify(value) : value
    );

    await this.db.run(`UPDATE users SET ${fields} WHERE id = ?`, [
      ...values,
      userId
    ]);
  }
}
