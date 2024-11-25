import React, { useCallback, useState } from "react";

import { Button, CircularProgress, TextField } from "@mui/material";

import {
  ERROR_MESSAGES,
  FORM_MASKS,
  FORM_VALIDATIONS,
  INITIAL_STATE_FORM
} from "./constants";
import styles from "./styles.module.css";

import useForm from "@/hooks/useForm";
import useAlert from "@/hooks/useAlert";
import { authEndpoints } from "@/utils/endpoints";
import { stringToBase64 } from "@/utils/base64Utils";
import { RegisterLayoutProps } from "@/interfaces/ILogin";
import { SEVERITY_ALERT } from "@/constants/severityAlert";
import { RegisterResponse } from "@/interfaces/IAuthProvider";

const RegisterLayout: React.FC<RegisterLayoutProps> = ({ handleLogin }) => {
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

        const response = await (
          await import("@/services/fetchServices")
        ).fetchServices.post<RegisterResponse>({
          body: { ...form, password: stringToBase64(form.password) },
          endpoint: authEndpoints.register
        });

        if (response.success) {
          handleLogin();
          resetForm();
          showAlert(
            "¡Gracias por registrarte! Ya pudes iniciar sesión",
            SEVERITY_ALERT.success
          );
        }
      } catch (error) {
        const typedError = error as { details: string };

        const message =
          ERROR_MESSAGES[typedError.details] || ERROR_MESSAGES.default;

        showAlert(message, SEVERITY_ALERT.error);
      }

      setIsLoading(false);
    },
    [form, handleLogin, resetForm, formValidator, setIsLoading, showAlert]
  );

  return (
    <section className={styles["register-container"]}>
      <h2>Crear cuenta</h2>
      <form className={styles["form-container"]}>
        <TextField
          fullWidth
          name="name"
          type="text"
          label="Nombre"
          variant="outlined"
          value={form.name}
          onBlur={blurValidator}
          onChange={handleChange}
          helperText={errors.name}
          error={Boolean(errors.name)}
        />
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
          disabled={!form.email || !form.password || !form.name || isLoading}
          startIcon={
            isLoading && <CircularProgress size={20} color="inherit" />
          }
        >
          {isLoading ? "Cargando..." : "Registrarse"}
        </Button>
      </form>
      <p>
        ¿Ya tienes cuenta?{" "}
        <span onClick={handleLogin} className={styles.link}>
          Inicia sesión
        </span>
      </p>
    </section>
  );
};

export default RegisterLayout;
