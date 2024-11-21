/* eslint-disable @typescript-eslint/no-explicit-any */
import { comparePassword, hashPassword } from '../../utils/bcryptUtils';

describe('Utility functions', () => {
  describe('hashPassword', () => {
    it('should return undefined for an empty password', async () => {
      const plainPassword = '';
      const result = await hashPassword(plainPassword);

      expect(result).toBeUndefined();
    });

    it('should return a hashed password', async () => {
      const plainPassword = 'mySecretPassword';

      const hashedPassword = await hashPassword(plainPassword);

      const result = plainPassword !== hashedPassword;
      expect(result).toBe(true);
    });
  });

  describe('comparePassword', () => {
    it('should return true if passwords match', async () => {
      const plainPassword = 'mySecretPassword';
      const hashedPassword = (await hashPassword(plainPassword)) || '';

      const result = await comparePassword(plainPassword, hashedPassword);
      expect(result).toBe(true);
    });

    it('should return false if the hashed password is undefined', async () => {
      const hashedPassword = undefined;
      const plainPassword = 'mySecretPassword';
      const cloneComparePassword = comparePassword as any;

      const result = await cloneComparePassword(plainPassword, hashedPassword);

      expect(result).toBe(false);
    });

    it('should return false if the hashed password is incorrect', async () => {
      const hashedPassword = 'invalidPassword';
      const plainPassword = 'mySecretPassword';

      const result = await comparePassword(plainPassword, hashedPassword);

      expect(result).toBe(false);
    });
  });
});
