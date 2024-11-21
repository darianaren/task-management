/* eslint-disable @typescript-eslint/no-explicit-any */
import { Database } from 'sqlite';

import { UserModel } from '../../models/userModel';
import { hashPassword } from '../../utils/bcryptUtils';

jest.mock('../../utils/bcryptUtils', () => ({
  hashPassword: jest.fn()
}));

describe('UserModel', () => {
  let dbMock: jest.Mocked<Database>;
  let userModel: UserModel;

  beforeEach(() => {
    dbMock = {
      get: jest.fn(),
      run: jest.fn()
    } as any;
    userModel = new UserModel(dbMock);
  });

  describe('create', () => {
    it('should create a user successfully', async () => {
      const newUser = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123'
      };

      const passwordHash = 'hashedPassword';
      (hashPassword as jest.Mock).mockResolvedValue(passwordHash);
      dbMock.get.mockResolvedValue(null);

      (dbMock.run as jest.Mock).mockResolvedValue({ lastID: 1 });

      const result = await userModel.create(newUser);

      expect(dbMock.get).toHaveBeenCalledWith(
        'SELECT * FROM users WHERE email = ?',
        [newUser.email]
      );
      expect(hashPassword).toHaveBeenCalledWith(newUser.password);
      expect(result).toEqual({
        name: newUser.name,
        email: newUser.email,
        id: 1,
        labels: ['Trabajo', 'Personal', 'Urgente']
      });
    });

    it('should throw an error if email is already in use', async () => {
      const newUser = {
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        password: 'password123'
      };

      dbMock.get.mockResolvedValue({});

      await expect(userModel.create(newUser)).rejects.toEqual({
        status: 409,
        message: 'Conflict',
        details: 'Email already in use'
      });
    });
  });

  describe('findById', () => {
    it('should return a user when found by id', async () => {
      const userId = 1;
      const mockUser = {
        id: userId,
        name: 'John Doe',
        email: 'john.doe@example.com',
        passwordHash: 'hashedPassword',
        labels: JSON.stringify(['Trabajo', 'Urgente'])
      };

      dbMock.get.mockResolvedValue(mockUser);

      const result = await userModel.findById(userId);

      expect(dbMock.get).toHaveBeenCalledWith(
        'SELECT * FROM users WHERE id = ?',
        [userId]
      );
      expect(result).toEqual({
        id: userId,
        name: mockUser.name,
        email: mockUser.email,
        labels: ['Trabajo', 'Urgente']
      });
    });

    it('should return null when user is not found', async () => {
      const userId = 101;
      dbMock.get.mockResolvedValue(null);

      const result = await userModel.findById(userId);

      expect(dbMock.get).toHaveBeenCalledWith(
        'SELECT * FROM users WHERE id = ?',
        [userId]
      );
      expect(result).toBeNull();
    });
  });

  describe('findByEmail', () => {
    it('should return a user when found by email', async () => {
      const email = 'john.doe@example.com';
      const mockUser = {
        id: 1,
        name: 'John Doe',
        email,
        passwordHash: 'hashedPassword',
        labels: JSON.stringify(['Trabajo', 'Urgente'])
      };

      dbMock.get.mockResolvedValue(mockUser);

      const result = await userModel.findByEmail(email);

      expect(dbMock.get).toHaveBeenCalledWith(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );
      expect(result).toEqual({
        id: mockUser.id,
        name: mockUser.name,
        email: mockUser.email,
        labels: ['Trabajo', 'Urgente']
      });
    });

    it('should return null when user is not found by email', async () => {
      const email = 'nonexistent@example.com';
      dbMock.get.mockResolvedValue(null);

      const result = await userModel.findByEmail(email);

      expect(dbMock.get).toHaveBeenCalledWith(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );
      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update user data successfully', async () => {
      const userId = 1;
      const updates = { name: 'John Updated' };

      (dbMock.run as jest.Mock).mockResolvedValue({});

      await userModel.update(userId, updates);

      expect(dbMock.run).toHaveBeenCalledWith(
        'UPDATE users SET name = ? WHERE id = ?',
        ['John Updated', userId]
      );
    });
  });
});
