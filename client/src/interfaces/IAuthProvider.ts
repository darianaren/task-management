import { ReactNode } from "react";

export interface RegisterResponse {
  data: {
    id: number;
    name: string;
    email: string;
    labels: Array<string>;
  };
  status: number;
  message: string;
  details: string;
  success: boolean;
}

export interface LoginResponse {
  data: {
    token: string;
  };
  status: number;
  message: string;
  details: string;
  success: boolean;
}

export interface GetUserResponse {
  data: {
    name: string;
    labels: Array<string>;
  };
  status: number;
  message: string;
  details: string;
  success: boolean;
}

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
