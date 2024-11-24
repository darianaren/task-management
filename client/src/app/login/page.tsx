import React from "react";

import styles from "./styles.module.css";

import LoginLayout from "@/layouts/LoginLayout/LoginLayout";
import RegisterLayout from "@/layouts/RegisterLayout/RegisterLayout";
import LoginAsideLayout from "@/layouts/LoginAsideLayout/LoginAsideLayout";

export default function Login() {
  return (
    <div className={styles["main-container"]}>
      <RegisterLayout />
      <LoginAsideLayout />
      <LoginLayout />
    </div>
  );
}
