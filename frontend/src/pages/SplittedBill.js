import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Container } from "@mui/material";
import ShowContri from "../components/ShowContri";

export default function SplitterBill() {
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
      <ShowContri />
      <Footer />
    </Container>
  );
}
