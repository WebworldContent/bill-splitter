import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Button, Chip, Stack, TextField } from "@mui/material";

export default function GroupForm() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box component="form" sx={{ bgcolor: "#ebedf7", height: "500px" }}>
          <Stack spacing={5} direction="column" sx={{ margin: 1 }}>
            <TextField
              id="outlined-basic"
              label="Group Name"
              variant="outlined"
              required
            />
            <Stack spacing={2} direction="row">
              <TextField
                id="outlined-basic"
                label="Members"
                variant="outlined"
                required
              />
              <Button variant="contained">
                Add
              </Button>
            </Stack>
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
              <Chip label="Person1" />
              <Chip label="Person2" />
            </Stack>
            <TextField
              id="outlined-basic"
              label="Country Currency"
              defaultValue="IN(Indian)"
              variant="outlined"
              disabled
            />
            <Button
              variant="contained"
              size="large"
            >
              Create Group
            </Button>
          </Stack>
        </Box>
      </Container>
    </>
  );
}
