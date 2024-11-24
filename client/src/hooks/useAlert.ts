"use client";

import { useContext } from "react";

import AlertContext from "../context/AlertContext";

function useAlert() {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error("useAlert must be used within a AlertProvider");
  }

  return context;
}

export default useAlert;
