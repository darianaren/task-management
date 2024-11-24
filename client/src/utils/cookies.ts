import nookies from "nookies";

/**
 * Sets a cookie with the specified name and value using nookies.
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
export const setCookie = ({
  name,
  value,
  ctx = undefined
}: {
  name: string;
  value: string;
  ctx?: object;
}): void => {
  if (!value) return;

  const isSecure = process.env.NEXT_PUBLIC_IS_PRODUCTION === "true";

  // Set cookie with nookies
  nookies.set(ctx, name, value, {
    path: "/",
    sameSite: "strict",
    secure: isSecure,
    maxAge: 5 * 24 * 60 * 60
  });
};

/**
 * Deletes a cookie with the specified name using nookies.
 *
 * This function deletes the cookie by setting its expiration date to a past date, which removes it
 * from the user's browser. It also sets the `samesite` attribute to `strict` to ensure that the cookie
 * is deleted safely across different browsing contexts.
 *
 * @param {string} name - The name of the cookie to be deleted.
 * @param {Object} ctx - The context for server-side operations (optional).
 * @returns {void}
 */
export const deleteCookie = (name: string, ctx?: object): void => {
  nookies.destroy(ctx, name, {
    path: "/",
    sameSite: "strict"
  });
};

/**
 * Gets the value of a cookie with the specified name using nookies.
 *
 * @param {string} name - The name of the cookie to retrieve.
 * @param {Object} ctx - The context for server-side operations (optional).
 * @returns {string | undefined} - The value of the cookie, or undefined if the cookie is not found.
 */
export const getCookie = (name: string, ctx?: object): string | undefined => {
  const cookies = nookies.get(ctx);
  return cookies[name];
};
