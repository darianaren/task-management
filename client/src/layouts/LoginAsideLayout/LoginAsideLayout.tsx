import React from "react";

import styles from "./styles.module.css";
import { LAYOUT_DIRECTION_VALUE } from "./constants";

import { LoginAsideLayoutProps } from "@/interfaces/ILogin";

const LoginAsideLayout: React.FC<LoginAsideLayoutProps> = ({ direction }) => {
  return (
    <section
      className={`${styles["aside-container"]} ${styles[LAYOUT_DIRECTION_VALUE[direction]]}`}
    >
      <h1>¡Bienvenido!</h1>
      <p>
        Para mantenerte en contacto con nosotros, inicia sesión con tus
        credenciales.
      </p>
    </section>
  );
};

export default LoginAsideLayout;
