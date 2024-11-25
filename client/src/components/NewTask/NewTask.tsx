"use client";

import React, { useState } from "react";

import {
  Autocomplete,
  Box,
  Button,
  Chip,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@mui/material";

import styles from "./styles.module.css";

import { NewTaskProps, Task } from "@/interfaces/ITask";
import { ChangeSelectFunction } from "@/interfaces/IFormHook";

const NewTask: React.FC<NewTaskProps> = ({
  isLoading,
  newTaskForm,
  labelOptions,
  handleAddTask,
  handleAddLabel
}) => {
  const [labels, setLabels] = useState<Array<string>>([]);

  const { form, errors, resetForm, handleChange, blurValidator } = newTaskForm;

  /**
   * Adds a new label to the list and updates the state if successful.
   * @returns {Promise<void>} Resolves when the label is added.
   */
  const addLabel = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ): Promise<void> => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();

      const response: boolean = await handleAddLabel(form.label);

      if (response) {
        setLabels((prevLabels) => {
          if (!prevLabels.length) {
            return [form.label];
          }

          if (prevLabels.includes(form.label)) {
            return prevLabels;
          }

          return [...prevLabels, form.label];
        });
      }
    }
  };

  /**
   * Submits the form data, creating a new task if successful.
   * @param event - The button click event triggering the submission.
   * @returns {Promise<void>} Resolves when the task is created.
   */
  const handleSubmit = async (
    event: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    event.preventDefault();

    const response = await handleAddTask({
      labels,
      title: form.title,
      status: form.status,
      dueDate: form.dueDate,
      description: form.description
    } as Task);

    if (response) {
      resetForm();
      setLabels([]);
    }
  };

  return (
    <Box component="form" className={styles["new-task-container"]}>
      <h2>✨ Nueva Tarea</h2>
      <FormControl fullWidth>
        <InputLabel id="simple-select-status">Estado</InputLabel>
        <Select
          name="status"
          label="Estado"
          value={form.status}
          id="demo-simple-select"
          onChange={handleChange as ChangeSelectFunction}
          labelId="simple-select-status"
          sx={{ maxHeight: "50vh" }}
        >
          <MenuItem value="pending">Pendiente</MenuItem>
          <MenuItem value="in-progress">En Progreso</MenuItem>
          <MenuItem value="completed">Completado</MenuItem>
        </Select>
      </FormControl>

      <Autocomplete
        freeSolo
        multiple
        id="tags-outlined"
        options={labelOptions}
        value={labels}
        onChange={(_, newValue) => setLabels(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            name="label"
            label="Etiquetas"
            variant="outlined"
            value={form.label}
            onKeyDown={addLabel}
            onChange={handleChange}
            placeholder="Escribe o selecciona"
          />
        )}
        renderTags={(value: readonly string[], getTagProps) =>
          value.map((option: string, index: number) => {
            const { key, ...tagProps } = getTagProps({ index });
            return (
              <Chip variant="outlined" label={option} key={key} {...tagProps} />
            );
          })
        }
      />

      <InputLabel id="due-date">Fecha de entrega</InputLabel>
      <TextField
        type="date"
        id="due-date"
        name="dueDate"
        variant="outlined"
        value={form.dueDate}
        onBlur={blurValidator}
        onChange={handleChange}
        helperText={errors.dueDate}
        error={Boolean(errors.dueDate)}
        inputProps={{
          min: new Date().toISOString().split("T")[0]
        }}
      />

      <TextField
        id="title"
        type="text"
        name="title"
        label="Título"
        value={form.title}
        variant="outlined"
        onBlur={blurValidator}
        onChange={handleChange}
        helperText={errors.title}
        error={Boolean(errors.title)}
      />

      <TextField
        rows={4}
        multiline
        type="text"
        id="description"
        name="description"
        variant="outlined"
        label="Descripción"
        onBlur={blurValidator}
        onChange={handleChange}
        value={form.description}
        helperText={errors.description}
        error={Boolean(errors.description)}
      />

      <Button
        fullWidth
        color="primary"
        variant="contained"
        onClick={handleSubmit}
        disabled={
          !form.title ||
          !form.status ||
          !form.dueDate ||
          !labels.length ||
          !form.description ||
          isLoading
        }
        startIcon={isLoading && <CircularProgress size={20} color="inherit" />}
      >
        {isLoading ? "Cargando..." : "Agregar"}
      </Button>
    </Box>
  );
};

export default NewTask;
