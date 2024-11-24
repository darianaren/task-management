"use client";

import React, { useCallback, useState } from "react";

import styles from "./styles.module.css";

import LoginLayout from "@/layouts/LoginLayout/LoginLayout";
import { ToggleRegisterFunction } from "@/interfaces/ILogin";
import RegisterLayout from "@/layouts/RegisterLayout/RegisterLayout";
import { LAYOUT_DIRECTION } from "@/layouts/LoginAsideLayout/constants";
import LoginAsideLayout from "@/layouts/LoginAsideLayout/LoginAsideLayout";

export default function Login() {
  const [registeredUser, setRegisteredUser] = useState(true);

  const toggleRegister: ToggleRegisterFunction = useCallback(
    () => setRegisteredUser((prev) => !prev),
    []
  );

  return (
    <div className={styles["main-container"]}>
      <RegisterLayout handleLogin={toggleRegister} />
      <LoginAsideLayout
        direction={
          registeredUser ? LAYOUT_DIRECTION.left : LAYOUT_DIRECTION.right
        }
      />
      <LoginLayout handleRegister={toggleRegister} />
    </div>
  );
}
