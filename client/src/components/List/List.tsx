"use client";

import React, { useState, useCallback } from "react";

import {
  Box,
  CircularProgress,
  Pagination,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from "@mui/material";

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
  const [open, setOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleOpenDialog = (id: number) => {
    setTaskToDelete(id);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setTaskToDelete(null);
  };

  const confirmDelete = () => {
    if (taskToDelete !== null) {
      handleDeleteTask(taskToDelete);
    }
    handleCloseDialog();
  };

  const handleRemove = useCallback(
    (id: number) => () => {
      handleOpenDialog(id);
    },
    []
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
        <CircularProgress color="secondary" size="3rem" />
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

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          ¿Estás seguro de que deseas eliminar esta tarea?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={confirmDelete} color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default List;
