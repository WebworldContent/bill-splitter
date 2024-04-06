import React from "react";
import Header from "../components/Header";
import GroupForm from "../components/forms/Group";
import Footer from "../components/Footer";
import { Container } from "@mui/material";

export default function CreateGroup() {
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
      <GroupForm />
      <Footer />
    </Container>
  );
}
