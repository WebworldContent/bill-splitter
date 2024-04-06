import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Container } from "@mui/material";
import PaymentForm from "../components/forms/Payment";

export default function PaymentSplit() {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "top",
        alignItems: "top",
        flexDirection: "column",
        height: '100vh'
      }}
    >
      <Header />
      <PaymentForm />
      <Footer />
    </Container>
  );
}
