"use client";

import React, { useState } from "react";

import { Snackbar, Alert } from "@mui/material";

import {
  AlertProviderProps,
  CloseFunction,
  showAlertFunction
} from "@/interfaces/IAlertProvider";
import {
  SEVERITY_ALERT,
  SEVERITY_ALERT_VALUE
} from "@/constants/severityAlert";
import AlertContext from "@/context/AlertContext";

function AlertProvider({ children }: AlertProviderProps) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState(SEVERITY_ALERT.info);

  const showAlert: showAlertFunction = (message, severity) => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  const handleClose: CloseFunction = () => {
    setOpen(false);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          sx={{ width: "100%" }}
          severity={
            SEVERITY_ALERT_VALUE[severity] as
              | "info"
              | "error"
              | "warning"
              | "success"
          }
        >
          {message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
}

export default AlertProvider;
