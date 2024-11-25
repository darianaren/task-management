"use client";

import React, { useRouter } from "next/navigation";
import { Box, Typography, Button } from "@mui/material";

const NotFound = () => {
  const router = useRouter();

  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        textAlign: "center"
      }}
    >
      <Typography variant="h1" color="primary" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" color="textSecondary" gutterBottom>
        Página no encontrada
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        La ruta a la que intentaste acceder no existe.
      </Typography>
      <Button
        color="primary"
        variant="contained"
        sx={{ marginTop: "20px" }}
        onClick={() => router.push("/")}
      >
        Volver al inicio
      </Button>
    </Box>
  );
};

export default NotFound;
