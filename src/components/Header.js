import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export default function Header() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: "#2b4fff",
            height: "100px",
            color: "#fff",
          }}
        >
          <h1>Bill Splitter</h1>
        </Box>
      </Container>
    </>
  );
}
