"use client";

import React from "react";

import Image from "next/image";
import { AppBar, Toolbar } from "@mui/material";
import logoutIcon from "public/icons/logout.svg";

import styles from "./styles.module.css";

import useAuth from "@/hooks/useAuth";

const NavBar = () => {
  const { logout, getUser } = useAuth();
  const user = getUser();
  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          gap: "1rem",
          padding: { xs: "0 1rem", lg: "0 10vw" }
        }}
      >
        <h1>👋🏻 ¡Hola, {user.name}!</h1>
        <Image
          width={25}
          height={25}
          alt="Logout"
          src={logoutIcon}
          onClick={logout}
          className={styles.icon}
        />
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
