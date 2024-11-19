import bcrypt from 'bcrypt';

/**
 * Hashes a password securely using bcrypt.
 * @param password - The plain text password to hash.
 * @returns A promise that resolves to the hashed password.
 */
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10; // Adjust as needed for security vs performance
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
};

/**
 * Compares a plain text password with a hashed password.
 * @param password - The plain text password to compare.
 * @param hash - The hashed password to compare against.
 * @returns A promise that resolves to `true` if the passwords match, or `false` otherwise.
 */
export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  const match = await bcrypt.compare(password, hash);
  return match;
};
