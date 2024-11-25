"use client";

import React from "react";

import { Card, CardContent, CardHeader, Chip, Collapse } from "@mui/material";

import { STATUS_AVATAR } from "./constants";

const TaskCard = ({ title, dueDate, labels, description, status }) => {
  return (
    <Card sx={{ width: "100%" }} component="li">
      <CardHeader
        sx={{
          ".MuiCardHeader-title": {
            fontSize: "1rem",
            fontWeight: "bold"
          }
        }}
        avatar={
          <p style={{ fontSize: "2rem", lineHeight: 0 }}>
            {STATUS_AVATAR[status]}
          </p>
        }
        action={<p>{dueDate}</p>}
        title={title}
        subheader={
          <Chip
            label={labels[0]}
            color="secondary"
            size="small"
            sx={{ color: "#ffffff" }}
          />
        }
      />
      <Collapse in={false} timeout="auto" unmountOnExit>
        <CardContent>
          <h3>Descripción:</h3>
          <p>{description}</p>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default TaskCard;
