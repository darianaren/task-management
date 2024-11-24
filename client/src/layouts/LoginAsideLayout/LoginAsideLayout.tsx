import React from "react";

import styles from "./styles.module.css";

const LoginAsideLayout = () => {
  return (
    <section className={styles["aside-container"]}>
      <h2>¡Bienvenido!</h2>
      <p>
        Para mantenerte en contacto con nosotros, inicia sesión con tus
        credenciales.
      </p>
    </section>
  );
};

export default LoginAsideLayout;
