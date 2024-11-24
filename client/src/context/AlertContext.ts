"use client";

import { createContext } from "react";

import { AlertContextType } from "@/interfaces/IAlertProvider";

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export default AlertContext;
