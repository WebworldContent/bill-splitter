import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export default function Footer() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box
          sx={{
            bgcolor: "#516df5",
            height: "150px",
            color: "#fff",
            textAlign: "center",
          }}
        >
          <h2>All rights reserved by maker.</h2>
          <p>@ 2024</p>
        </Box>
      </Container>
    </>
  );
}
