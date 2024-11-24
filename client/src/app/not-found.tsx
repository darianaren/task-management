"use client";

import { useRouter } from "next/navigation";
import { Box, Typography, Button } from "@mui/material";

const NotFound = () => {
  const router = useRouter();

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      textAlign="center"
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
        variant="contained"
        color="primary"
        onClick={() => router.push("/")}
        sx={{ marginTop: "20px" }}
      >
        Volver al inicio
      </Button>
    </Box>
  );
};

export default NotFound;
