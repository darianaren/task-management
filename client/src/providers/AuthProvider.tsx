"use client";

import React, { useCallback } from "react";

import { useRouter } from "next/navigation";

import {
  AuthProviderProps,
  GetUserResponse,
  LoginFunction,
  LoginResponse,
  LogoutFunction
} from "@/interfaces/IAuthProvider";
import AuthContext from "@/context/AuthContext";
import { CustomError } from "@/utils/customError";
import { stringToBase64 } from "@/utils/base64Utils";
import { authEndpoints, usersEndpoints } from "@/utils/endpoints";
import { setItem } from "@/utils/localStorage";

function AuthProvider({ children }: AuthProviderProps) {
  const { push } = useRouter();

  const cookieName = process.env.NEXT_PUBLIC_TOKEN_NAME || "userToken";

  /**
   * Logs in the user with the provided email and password.
   *
   * @async
   * @function login
   *
   * @param {UserCredentials} userCredentials - The credentials for login.
   *
   * @throws {Error} If either `email` or `password` is missing.
   * @throws {Error} If there is an error during the login process.
   *
   * @returns {Promise<void>} Resolves when the login is successful and the session is set.
   */
  const login: LoginFunction = useCallback(
    async ({ email, password }) => {
      if (!email) throw new CustomError("Missing email");

      if (!password) throw new CustomError("Missing password");

      const response = await (
        await import("@/services/fetchServices")
      ).fetchServices.post<LoginResponse>({
        body: { email, password: stringToBase64(password) },
        endpoint: authEndpoints.login
      });

      if (response.success) {
        const userToken = response.data?.token;

        (await import("@/utils/cookies")).setCookie({
          name: cookieName,
          value: userToken
        });

        const userData = await (
          await import("@/services/fetchServices")
        ).fetchServices.get<GetUserResponse>({
          headers: { Authorization: `Bearer ${userToken}` },
          endpoint: usersEndpoints.get
        });

        setItem("userData", userData.data);

        push("/");
      }
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
  const logout: LogoutFunction = useCallback(async () => {
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
