"use client";

import React, { useCallback, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import {
  AuthProviderProps,
  GetUserResponse,
  LoginFunction,
  LoginResponse,
  LogoutFunction,
  UpdateUserFunction,
  User
} from "@/interfaces/IAuthProvider";
import AuthContext from "@/context/AuthContext";
import { CustomError } from "@/utils/customError";
import { stringToBase64 } from "@/utils/base64Utils";
import { authEndpoints, usersEndpoints } from "@/utils/endpoints";
import { getItem } from "@/utils/localStorage";

const userDefault = Object.freeze({
  name: "Usuario",
  labels: []
});

function AuthProvider({ children }: AuthProviderProps) {
  const { push } = useRouter();
  const [user, setUser] = useState<User>(userDefault);

  const savedUser = getItem("userData", {
    name: "Usuario",
    labels: []
  });

  useEffect(() => {
    if (savedUser?.expired || !savedUser?.value) {
      return setUser(userDefault);
    }
    return setUser(savedUser?.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cookieName = process.env.NEXT_PUBLIC_TOKEN_NAME || "userToken";

  /**
   * Updates the saved user information in local storage.
   *
   * If the user object is not provided, the function will reset the user information
   * to the default values. Otherwise, it saves the updated user information.
   *
   * @param {User} user - The new user information to save.
   * @param {string} user.name - The name of the user.
   * @param {Array<string>} user.labels - An array of labels associated with the user.
   * @returns {Promise<void>}
   */
  const updateUser: UpdateUserFunction = async (user = userDefault) => {
    setUser(user);
    (await import("@/utils/localStorage")).setItem("userData", user);
  };

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

        (await import("@/utils/localStorage")).setItem(
          "userData",
          userData.data
        );
        setUser(userData.data);

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
    (await import("@/utils/localStorage")).removeItem("userData");

    push("/login");
  }, [cookieName, push]);

  return (
    <AuthContext.Provider value={{ user, updateUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
