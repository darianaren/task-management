"use client";

import { AuthContextType } from "@/interfaces/IAuthProvider";
import { createContext, useContext } from "react";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export default AuthContext;
