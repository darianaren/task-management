"use client";

import { createContext } from "react";

import { AuthContextType } from "@/interfaces/IAuthProvider";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
