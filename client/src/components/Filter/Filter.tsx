"use client";

import React from "react";

import Image from "next/image";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  Menu,
  MenuItem,
  Select,
  TextField
} from "@mui/material";
import filterIcon from "public/icons/filter.svg";

import styles from "./styles.module.css";

import { FilterProps } from "@/interfaces/IFilter";
import { ORDER_BY_OPTIONS, STATUS_OPTIONS } from "@/app/constants";
import { ChangeSelectFunction } from "@/interfaces/IFormHook";

const Filter: React.FC<FilterProps> = ({
  label,
  search,
  status,
  dueDate,
  orderBy,
  labelOptions,
  handleChangeFilter,
  handleResetFilters
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const resetFilters = () => {
    handleResetFilters();
    handleCloseMenu();
  };

  return (
    <Box component="form" className={styles["filters-container"]}>
      <TextField
        id="search"
        type="search"
        name="title"
        value={search}
        variant="outlined"
        className={styles.input}
        label="Buscar por título"
        onChange={handleChangeFilter}
      />
      <div>
        <Image
          width={40}
          height={40}
          alt="Filter"
          src={filterIcon}
          onClick={handleOpenMenu}
          className={styles.icon}
        />
        <Menu
          keepMounted
          id="menu-filters"
          anchorEl={anchorEl}
          sx={{ mt: "45px" }}
          onClose={handleCloseMenu}
          open={Boolean(anchorEl)}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
        >
          <form className={styles["menu-filters"]}>
            <InputLabel id="simple-select-order-by">Ordenar por</InputLabel>
            <Select
              name="orderBy"
              label="Estado"
              value={orderBy}
              id="simple-select-order-by"
              labelId="simple-select-order-by"
              onChange={handleChangeFilter as ChangeSelectFunction<string>}
              sx={{ maxHeight: "50vh" }}
            >
              {ORDER_BY_OPTIONS.map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>

            <InputLabel id="due-date">Fecha de entrega</InputLabel>
            <TextField
              type="date"
              name="dueDate"
              id="due-date"
              value={dueDate}
              variant="outlined"
              onChange={handleChangeFilter}
            />

            <FormControl fullWidth>
              <InputLabel id="multiple-select-status">Estados</InputLabel>
              <Select
                multiple
                name="status"
                value={status}
                label="Estados"
                labelId="multiple-select-status"
                onChange={handleChangeFilter as ChangeSelectFunction<string[]>}
                renderValue={(selected: Array<string>) => selected.join(", ")}
              >
                {STATUS_OPTIONS.map((option) => (
                  <MenuItem key={option} value={option}>
                    <Checkbox checked={status.indexOf(option as never) > -1} />
                    <ListItemText primary={option} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="multiple-select-labels">Etiquetas</InputLabel>
              <Select
                multiple
                name="label"
                value={label}
                label="Etiquetas"
                labelId="multiple-select-labels"
                onChange={handleChangeFilter as ChangeSelectFunction<string[]>}
                renderValue={(selected: Array<string>) => selected.join(", ")}
              >
                {labelOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    <Checkbox checked={label.indexOf(option as never) > -1} />
                    <ListItemText primary={option} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button onClick={resetFilters}>Limpiar</Button>
          </form>
        </Menu>
      </div>
    </Box>
  );
};

export default Filter;
