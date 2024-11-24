/* eslint-disable no-unused-vars */
import { ReactNode } from "react";

export interface AlertProviderProps {
  children: ReactNode;
}

export interface showAlertFunction {
  (message: string, severity: symbol): void;
}

export interface CloseFunction {
  (): void;
}

export interface AlertContextType {
  showAlert: showAlertFunction;
}
