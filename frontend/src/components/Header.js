import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "./helpers/localStorage";

export default function Header() {
  const navigate = useNavigate();
  const { removeItem } = useLocalStorage("group");

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "top",
            bgcolor: "#2b4fff",
            height: "100px",
            color: "#fff",
            // marginTop: "900px", // extra css for test, remove in future
          }}
        >
          <h1
            onClick={() => {
              removeItem();
              navigate("/");
            }}
            style={{ cursor: "pointer" }}
          >
            Bill Splitter
          </h1>
        </Box>
      </Container>
    </>
  );
}
