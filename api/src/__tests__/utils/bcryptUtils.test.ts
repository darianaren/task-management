/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from 'bcrypt';

import { comparePassword, hashPassword } from '../../utils/bcryptUtils';

describe('Utility functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  describe('hashPassword', () => {
    test('should return undefined for an empty password', async () => {
      const plainPassword = '';
      const result = await hashPassword(plainPassword);

      expect(result).toBeUndefined();
    });

    test('should return a hashed password', async () => {
      const hashMock = jest.spyOn(bcrypt, 'hash');
      const plainPassword = 'mySecretPassword';
      const hashedPassword = 'hashedPassword';

      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);

      const result = await hashPassword(plainPassword);

      expect(result).toBe(hashedPassword);

      hashMock.mockRestore();
    });
  });

  describe('comparePassword', () => {
    test('should return true if passwords match', async () => {
      const plainPassword = 'mySecretPassword';
      const hashedPassword = (await hashPassword(plainPassword)) || '';

      const result = await comparePassword(plainPassword, hashedPassword);
      expect(result).toBe(true);
    });

    test('should return false if the hashed password is undefined', async () => {
      const hashedPassword = undefined;
      const plainPassword = 'mySecretPassword';
      const cloneComparePassword = comparePassword as any;

      const result = await cloneComparePassword(plainPassword, hashedPassword);

      expect(result).toBe(false);
    });

    test('should return false if the hashed password is incorrect', async () => {
      const hashedPassword = 'invalidPassword';
      const plainPassword = 'mySecretPassword';

      const result = await comparePassword(plainPassword, hashedPassword);

      expect(result).toBe(false);
    });
  });
});