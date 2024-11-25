"use client";

import React, { useCallback, useState } from "react";

import dynamic from "next/dynamic";

import styles from "./styles.module.css";

import { ToggleRegisterFunction } from "@/interfaces/ILogin";
import {
  LAYOUT_DIRECTION,
  LAYOUT_DIRECTION_VALUE
} from "@/layouts/LoginAsideLayout/constants";

const RegisterLayout = dynamic(
  () => import("@/layouts/RegisterLayout/RegisterLayout")
);
const LoginAsideLayout = dynamic(
  () => import("@/layouts/LoginAsideLayout/LoginAsideLayout")
);
const LoginLayout = dynamic(() => import("@/layouts/LoginLayout/LoginLayout"));

export default function Login() {
  const [registeredUser, setRegisteredUser] = useState(true);

  const layoutDirection = registeredUser
    ? LAYOUT_DIRECTION.left
    : LAYOUT_DIRECTION.right;

  const toggleRegister: ToggleRegisterFunction = useCallback(
    () => setRegisteredUser((prev) => !prev),
    []
  );

  return (
    <div
      className={`${styles["main-container"]} ${styles[LAYOUT_DIRECTION_VALUE[layoutDirection]]}`}
    >
      <RegisterLayout handleLogin={toggleRegister} />
      <LoginAsideLayout direction={layoutDirection} />
      <LoginLayout handleRegister={toggleRegister} />
    </div>
  );
}
