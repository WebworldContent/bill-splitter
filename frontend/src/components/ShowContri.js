import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {
  Button,
  Chip,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function createData(share, split) {
  return { share, split };
}

export default function ShowContri() {
  const rows = [
    createData("Frozen yoghurt", 159),
    createData("Ice cream sandwich", 237),
  ];

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box component="form" sx={{ bgcolor: "#ebedf7", height: "100%" }}>
          <Stack spacing={5} direction="column" sx={{ margin: 1 }}>
            <div style={{ textAlign: "center", fontFamily: "sans-serif" }}>
              <h2>{"Trip"}</h2>
            </div>
            <Stack
              direction="row"
              spacing={1}
              style={{ marginTop: 0 }}
              useFlexGap
              flexWrap="wrap"
            >
              <Chip label="Person1" />
              <Chip label="Person2" />
            </Stack>
            <Button variant="contained" size="large">
              Add Payments
            </Button>

            <TableContainer>
              <Table aria-label="simple table">
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.share}
                      </TableCell>
                      <TableCell align="right">{row.split}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Liquidation</TableCell>
                    <TableCell align="right">Split Share</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.share}
                      </TableCell>
                      <TableCell align="right">{row.split}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Button variant="contained" size="large">
              Share Bill
            </Button>
          </Stack>
        </Box>
      </Container>
    </>
  );
}
