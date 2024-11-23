"use client";

import React, { useCallback } from "react";

import { useRouter } from "next/navigation";

import AuthContext from "@/context/AuthContext";
import { authEndpoints } from "@/utils/endpoints";

export function AuthProvider({ children }) {
  const { push } = useRouter();

  const cookieName = process.env.NEXT_PUBLIC_TOKEN_NAME || "userToken";

  /**
   * Logs in the user with the provided email and password.
   *
   * @async
   * @function login
   *
   * @param {Object} params - The parameters for login.
   * @param {string} params.email - The email address of the user.
   * @param {string} params.password - The password of the user.
   *
   * @throws {Error} If either `email` or `password` is missing.
   * @throws {Error} If there is an error during the login process.
   *
   * @returns {Promise<void>} Resolves when the login is successful and the session is set.
   */
  const login = useCallback(
    async (userCredentials) => {
      if (!userCredentials.email) throw new Error("Missing email");
      if (!userCredentials.password) throw new Error("Missing password");

      const response = await (
        await import("@/services/fetchServices")
      ).fetchServices.post({
        body: userCredentials,
        endpoint: authEndpoints.login
      });
      console.log(response);
      // (await import("@/utils/cookies")).setCookie({
      //   name: cookieName,
      //   value: token
      // });

      // push("/");
    },
    [cookieName, push]
  );

  /**
   * Logs out the user by clearing the session state and deleting the user token cookie.
   *
   * This function updates the session state to indicate that the user has logged out, deletes
   * the token stored in the cookies, and redirects the user to the login page.
   *
   * @function logout
   * @returns {void}
   */
  const logout = useCallback(async () => {
    (await import("@/utils/cookies")).deleteCookie(cookieName);

    push("/login");
  }, [cookieName, push]);

  return (
    <AuthContext.Provider value={{ login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
