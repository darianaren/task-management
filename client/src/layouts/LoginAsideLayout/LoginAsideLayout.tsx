import React from "react";

import styles from "./styles.module.css";
import { LAYOUT_DIRECTION, LAYOUT_DIRECTION_VALUE } from "./constants";

import { LoginAsideLayoutProps } from "@/interfaces/ILogin";

const LoginAsideLayout: React.FC<LoginAsideLayoutProps> = ({ direction }) => {
  return (
    <section
      className={`${styles["aside-container"]} ${styles[LAYOUT_DIRECTION_VALUE[direction]]}`}
    >
      <h1 style={{ fontSize: "3rem", color: "#fff" }}>¡Bienvenido!</h1>
      <p style={{ fontSize: "1.5rem", fontWeight: 300, color: "#fff" }}>
        {direction === LAYOUT_DIRECTION.left
          ? "Para mantenerte en contacto con nosotros, inicia sesión con tus credenciales."
          : "Ingresa tus datos y comienza a disfrutar de la aplicación."}
      </p>
    </section>
  );
};

export default LoginAsideLayout;
