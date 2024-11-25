"use client";

import React from "react";

import { Box } from "@mui/material";

import TaskCard from "../TaskCard/TaskCard";

import styles from "./styles.module.css";

import { MetricsProps } from "@/interfaces/IMetrics";

const Metrics: React.FC<MetricsProps> = ({
  total = 0,
  pending = 0,
  completed = 0,
  inProgress = 0,
  isLoading = false
}) => {
  const cards = Object.freeze([
    {
      id: "total",
      label: "📝 Total",
      number: total
    },
    {
      id: "completed",
      label: "✅ Completadas",
      number: completed
    },
    {
      id: "pending",
      label: "⏳ Pendientes",
      number: pending
    },
    {
      id: "inProgress",
      label: "💼 En progreso",
      number: inProgress
    }
  ]);
  return (
    <Box component="section" className={styles["metrics-container"]}>
      {cards.map(({ id, label, number }) => (
        <TaskCard
          key={id}
          label={label}
          number={number}
          isLoading={isLoading}
        />
      ))}
    </Box>
  );
};

export default Metrics;
