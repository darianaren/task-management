import jwt, { SignOptions, JwtPayload } from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';
const TOKEN_EXPIRATION = '5d';

/**
 * Generates a JWT for a given payload.
 * @param payload - The data to encode in the token.
 * @param options - Additional JWT signing options.
 * @returns A string representing the signed JWT.
 */
export const generateToken = (
  payload: object,
  options?: SignOptions
): string => {
  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: TOKEN_EXPIRATION,
    ...options
  });
  return token;
};

/**
 * Verifies a JWT and decodes its payload.
 * @param token - The JWT to verify.
 * @returns The decoded payload if the token is valid.
 * @throws If the token is invalid or expired.
 */
export const verifyToken = (token: string): JwtPayload | string => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded;
  } catch (error) {
    console.log(error);
    throw new Error('Invalid or expired token');
  }
};
