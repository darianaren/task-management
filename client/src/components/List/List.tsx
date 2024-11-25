"use client";

import React, { useCallback } from "react";

import { Box, CircularProgress, Pagination, Stack } from "@mui/material";

import TaskCard from "../TaskCard/TaskCard";

import styles from "./styles.module.css";

import { TaskListProps } from "@/interfaces/ITask";

const List: React.FC<TaskListProps> = ({
  tasks,
  page,
  setPage,
  isLoading,
  totalPages,
  handleUpdateTask,
  handleDeleteTask
}) => {
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleRemove = useCallback(
    (id: number) => () => {
      const confirm = window.confirm(
        "La tarea será eliminada. ¿Desea continuar?"
      );
      if (confirm) {
        handleDeleteTask(id);
      }
    },
    [handleDeleteTask]
  );

  const handleUpdate = useCallback(
    (id: number) => (status: "pending" | "completed" | "in-progress") => {
      handleUpdateTask(id, status);
    },
    [handleUpdateTask]
  );

  if (isLoading)
    return (
      <Stack className={styles["loading-container"]}>
        <CircularProgress color="secondary" size="3rem" />;
      </Stack>
    );

  return (
    <Box component="section">
      <Box component="ul" className={styles["list-container"]}>
        {tasks.map(({ id, ...task }) => (
          <TaskCard
            key={id}
            {...task}
            handleRemove={handleRemove(id)}
            handleUpdate={handleUpdate(id)}
          />
        ))}
      </Box>
      {totalPages > 1 ? (
        <Pagination
          page={page}
          color="primary"
          count={totalPages}
          onChange={handleChange}
          sx={{ marginTop: "1.5rem" }}
        />
      ) : null}
    </Box>
  );
};

export default List;
