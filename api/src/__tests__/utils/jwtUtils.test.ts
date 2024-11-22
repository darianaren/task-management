import { generateToken, verifyToken } from '../../utils/jwtUtils';

describe('JWT Utility Functions', () => {
  describe('generateToken', () => {
    it('should return a string', () => {
      const payload = { id: 1, username: 'testuser' };

      const token = generateToken(payload);

      expect(typeof token).toBe('string');
    });
  });

  describe('verifyToken', () => {
    it('should generate a token that encodes the correct payload', () => {
      const payload = { id: 1, username: 'testuser' };

      const token = generateToken(payload);

      const decoded = verifyToken(token);

      expect(decoded).toMatchObject(payload);
    });
  });
});
