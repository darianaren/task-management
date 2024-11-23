/**
 * Sets a cookie with the specified name and value.
 *
 * This function creates a cookie with the provided name and value, and includes some security measures
 * such as using the `secure` flag based on the environment (production or not) and setting the `samesite` attribute
 * to `strict` to improve security.
 *
 * @param {Object} params - The object containing the cookie name and value.
 * @param {string} params.name - The name of the cookie to be set.
 * @param {string} params.value - The value to be assigned to the cookie.
 * @returns {void}
 */
export const setCookie = ({ name, value }) => {
  if (!value) return;

  const SECURE = process.env.NEXT_PUBLIC_IS_ENVIRONMENT_PRODUCTION || false;
  document.cookie = `${name}=${value}; path=/; samesite=strict; secure=${SECURE}`;
};

/**
 * Deletes a cookie with the specified name.
 *
 * This function deletes the cookie by setting its expiration date to a past date, which removes it
 * from the user's browser. It also sets the `samesite` attribute to `strict` to ensure that the cookie
 * is deleted safely across different browsing contexts.
 *
 * @param {string} name - The name of the cookie to be deleted.
 * @returns {void}
 */
export const deleteCookie = (name) => {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; samesite=strict`;
};
