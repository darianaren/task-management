"use client";

import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  Chip,
  Collapse,
  Menu,
  MenuItem
} from "@mui/material";
import Image from "next/image";
import removeIcon from "public/icons/remove.svg";

import styles from "./styles.module.css";
import { STATUS_AVATAR } from "./constants";

import { TaskCardProps } from "@/interfaces/ITask";

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  dueDate,
  labels = [],
  description,
  handleRemove,
  handleUpdate,
  status = "pending"
}) => {
  const [isOpenDescription, setIsOpenDescription] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const toggleDescription = (): void => setIsOpenDescription((prev) => !prev);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleUpdateStatus = (
    event: React.MouseEvent<HTMLElement>,
    status: "pending" | "completed" | "in-progress"
  ): void => {
    event.stopPropagation();
    handleUpdate(status);
    setAnchorEl(null);
  };

  return (
    <Card
      component="li"
      onClick={toggleDescription}
      sx={{ width: "100%", cursor: "pointer" }}
    >
      <CardHeader
        title={title}
        action={
          <div className={styles["action-container"]}>
            <p>{dueDate}</p>
            <Image
              width={20}
              height={20}
              alt="remove"
              src={removeIcon}
              onClick={handleRemove}
              className={styles.icon}
            />
          </div>
        }
        sx={{
          ".MuiCardHeader-title": {
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: "bold"
          }
        }}
        avatar={
          <p
            style={{ cursor: "pointer", fontSize: "2rem", lineHeight: 0 }}
            onClick={handleOpenMenu}
          >
            {STATUS_AVATAR[status]}
          </p>
        }
        subheader={
          <section className={styles["chip-container"]}>
            {labels.map((label: string) => (
              <Chip
                key={label}
                size="small"
                label={label}
                className={styles.chip}
              />
            ))}
          </section>
        }
      />
      <Menu
        sx={{ mt: "20px" }}
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={(e) => handleUpdateStatus(e, "pending")}>
          ⏳ Pendiente
        </MenuItem>
        <MenuItem onClick={(e) => handleUpdateStatus(e, "in-progress")}>
          💼 En Progreso
        </MenuItem>
        <MenuItem onClick={(e) => handleUpdateStatus(e, "completed")}>
          ✅ Completado
        </MenuItem>
      </Menu>
      <Collapse in={isOpenDescription} timeout="auto" unmountOnExit>
        <CardContent>
          <h3>Descripción:</h3>
          <p>{description}</p>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default TaskCard;
