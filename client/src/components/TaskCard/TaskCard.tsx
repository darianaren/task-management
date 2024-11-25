"use client";

import React from "react";

import { Paper, Skeleton } from "@mui/material";

import styles from "./styles.module.css";

const TaskCard = ({ label = "", number = 0, isLoading = false }) => {
  return (
    <Paper elevation={3} className={styles.card}>
      {isLoading ? (
        <Skeleton variant="rounded" width={60} height={30} />
      ) : (
        <p style={{ fontSize: "1.5rem" }}>{number}</p>
      )}
      <p>
        <b>{label}</b>
      </p>
    </Paper>
  );
};

export default TaskCard;
