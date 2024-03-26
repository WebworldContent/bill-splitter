import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Button, Chip, Stack } from "@mui/material";
import SplitterForm from "./Splitter";

export default function PaymentForm() {
  const paymentForm = () => (
    <Stack spacing={6} direction="column" sx={{ margin: 1 }}>
      <div style={{ textAlign: "center", fontFamily: "sans-serif" }}>
        <h2>{"Trip"}</h2>
      </div>
      <Stack direction="row" spacing={1} style={{ marginTop: 0 }} useFlexGap flexWrap="wrap">
        <Chip label="Person1" />
        <Chip label="Person2" />
      </Stack>
      <Button variant="outlined" size="large">
        Add a Payment
      </Button>
    </Stack>
  );

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box
          component="form"
          sx={{ bgcolor: "#ebedf7", height: "500px" }}
        >
          <SplitterForm />
        </Box>
      </Container>
    </>
  );
}
