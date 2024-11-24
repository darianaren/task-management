"use client";

import React, { useCallback, useState } from "react";

import { Button, CircularProgress, TextField } from "@mui/material";

import {
  ERROR_MESSAGES,
  FORM_MASKS,
  FORM_VALIDATIONS,
  INITIAL_STATE_FORM
} from "./constants";

import useForm from "@/hooks/useForm";
import useAuth from "@/hooks/useAuth";
import useAlert from "@/hooks/useAlert";
import { LoginLayoutProps } from "@/interfaces/ILogin";
import { SEVERITY_ALERT } from "@/constants/severityAlert";

const LoginLayout: React.FC<LoginLayoutProps> = ({ handleRegister }) => {
  const { login } = useAuth();
  const { showAlert } = useAlert();

  const [isLoading, setIsLoading] = useState(false);

  const {
    form,
    errors,
    resetForm,
    handleChange,
    formValidator,
    blurValidator
  } = useForm({
    applyMask: FORM_MASKS,
    validateForm: FORM_VALIDATIONS,
    initialForm: INITIAL_STATE_FORM
  });

  const handleSubmit = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      try {
        event.preventDefault();

        setIsLoading(true);
        formValidator();

        await login({ email: form.email, password: form.password });

        resetForm();
      } catch (error) {
        const typedError = error as { details: string };

        const message =
          ERROR_MESSAGES[typedError.details] || ERROR_MESSAGES.default;

        showAlert(message, SEVERITY_ALERT.error);
      }

      setIsLoading(false);
    },
    [login, form, resetForm, formValidator, setIsLoading, showAlert]
  );

  return (
    <section>
      <h2>Iniciar Sesión</h2>
      <form>
        <TextField
          fullWidth
          name="email"
          type="email"
          variant="outlined"
          value={form.email}
          onBlur={blurValidator}
          onChange={handleChange}
          helperText={errors.email}
          label="Correo electrónico"
          error={Boolean(errors.email)}
        />
        <TextField
          fullWidth
          name="password"
          type="password"
          label="Contraseña"
          variant="outlined"
          value={form.password}
          onBlur={blurValidator}
          onChange={handleChange}
          helperText={errors.password}
          error={Boolean(errors.password)}
        />

        <Button
          fullWidth
          color="primary"
          variant="contained"
          onClick={handleSubmit}
          disabled={!form.email || !form.password || isLoading}
          startIcon={
            isLoading && <CircularProgress size={20} color="inherit" />
          }
        >
          {isLoading ? "Cargando..." : "Ingresar"}
        </Button>
      </form>
      <p>
        ¿Aún no tienes cuenta? <span onClick={handleRegister}>Registrate</span>
      </p>
    </section>
  );
};

export default LoginLayout;
