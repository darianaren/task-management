/**
 * Converts a Base64-encoded string to a plain text string.
 *
 * @param {string | undefined} base64 - The Base64-encoded string to decode.
 * @returns {string | undefined} The decoded plain text string, or `undefined` if the input is falsy.
 */
export const base64ToString = (base64?: string): string | undefined => {
  return base64 ? Buffer.from(base64, 'base64').toString() : undefined;
};

/**
 * Converts a plain text string to a Base64-encoded string.
 *
 * @param {string | undefined} str - The plain text string to encode.
 * @returns {string | undefined} The Base64-encoded string, or `undefined` if the input is falsy.
 */
export const stringToBase64 = (str?: string): string | undefined => {
  return str ? Buffer.from(str).toString('base64') : undefined;
};
