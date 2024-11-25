import { User } from "./IAuthProvider";

export interface LogoutFunction {
  (): void;
}

export interface NavBarProps {
  user: User;
  handleLogout: LogoutFunction;
}
