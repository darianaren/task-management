/* eslint-disable no-unused-vars */

export interface ToggleRegisterFunction {
  (): void;
}

export interface LoginLayoutProps {
  handleRegister: ToggleRegisterFunction;
}

export interface RegisterLayoutProps {
  handleLogin: ToggleRegisterFunction;
}

export interface LoginAsideLayoutProps {
  direction: symbol;
}
