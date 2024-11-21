import { base64ToString, stringToBase64 } from '../../utils/base64Utils';

describe('Base64 Utility functions', () => {
  describe('base64ToString', () => {
    it('should decode a Base64 string to plain text', () => {
      const base64 = 'SGVsbG8gd29ybGQ=';
      const result = base64ToString(base64);
      expect(result).toBe('Hello world');
    });

    it('should return undefined for falsy values', () => {
      expect(base64ToString(undefined)).toBeUndefined();
      expect(base64ToString('')).toBeUndefined();
    });
  });

  describe('stringToBase64', () => {
    it('should encode a plain text string to Base64', () => {
      const str = 'Hello world';
      const result = stringToBase64(str);
      expect(result).toBe('SGVsbG8gd29ybGQ=');
    });

    it('should return undefined for falsy values', () => {
      expect(stringToBase64(undefined)).toBeUndefined();
      expect(stringToBase64('')).toBeUndefined();
    });
  });
});
