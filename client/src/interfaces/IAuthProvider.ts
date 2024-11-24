import { ReactNode } from "react";

export interface UserCredentials {
  email: string;
  password: string;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export interface LoginFunction {
  // eslint-disable-next-line no-unused-vars
  (userCredentials: UserCredentials): Promise<void>;
}

export interface LogoutFunction {
  (): Promise<void>;
}

export interface AuthContextType {
  login: LoginFunction;
  logout: LogoutFunction;
}
