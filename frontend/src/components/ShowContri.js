import React, { useEffect, useState } from "react";
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
import { getPaymentInfo } from "../services/payment";
import useLocalStorage from "./helpers/localStorage";
import { useMatch, useNavigate } from "react-router-dom";

export default function ShowContri() {
  const { getItem } = useLocalStorage("group");
  const [splitInfo, setSplitInfo] = useState({});
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const match = useMatch("show-contri/:groupId");
  const hasGroupId = match?.params?.groupId;
  const { id } = getItem("group");

  useEffect(() => {
    const fetchData = async (id) => {
      try {
        const {
          data: { data: fetchedData },
        } = await getPaymentInfo(id);
        if (fetchedData) {
          const { expenses, currency } = fetchedData[0];
          delete fetchedData[0].expenses;
          delete fetchedData[0].currency;
          delete fetchedData[0]._id; 
          const group = fetchedData[0];
          const groupName = Object.keys(group);
          setSplitInfo({
            groupName,
            members: fetchedData[0][groupName],
            expenses,
            currency,
          });
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (id || hasGroupId) {
      const dataId = id || hasGroupId
      fetchData(dataId);
    }
  }, [getItem, hasGroupId, id]);

  const handleShareBill = async () => {
    const generatedURI = `${window.location.href}/${id}`
    try {
      setCopied(false);
      await navigator.clipboard.writeText(generatedURI);
      setCopied(true);
    } catch (error) {
      console.error('Error while copying', error);
    }
  };

  console.log(splitInfo);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box component="form" sx={{ bgcolor: "#ebedf7", height: "100%" }}>
          <Stack spacing={5} direction="column" sx={{ margin: 1 }}>
            <div style={{ textAlign: "center", fontFamily: "sans-serif" }}>
              <h2>{splitInfo.groupName}</h2>
            </div>
            <Stack
              direction="row"
              spacing={1}
              style={{ marginTop: 0 }}
              useFlexGap
              flexWrap="wrap"
            >
              {splitInfo.members &&
                splitInfo.members.map((member) => (
                  <Chip key={member} label={member} />
                ))}
            </Stack>
            <Button variant="contained" size="large" onClick={() => navigate("/splitter")}>
              Add Payments
            </Button>

            <TableContainer>
              <Table aria-label="simple table">
                <TableBody>
                  {splitInfo.expenses?.length > 0 &&
                    splitInfo.expenses.map((data) => (
                      <TableRow
                        key={data._id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <h2 style={{ marginBottom: "-5px" }}>
                            {data.paymentOf}
                          </h2>
                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <p
                              style={{ margin: "5px", marginLeft: "0px" }}
                            ><b>{`${data.payingMember} paid:`}</b></p>
                            {Object.keys(data.members).map((member) => (
                              <p key={member} style={{ margin: "5px" }}>
                                {member}
                              </p>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell align="right">{`${data.amount} ₹`}</TableCell>
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
                  {splitInfo.expenses?.length > 0 && splitInfo.expenses.map((data) => (
                    <React.Fragment key={data._id}>
                    {Object.keys(data.members).map(member => (<TableRow
                      key={member}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {`${member} => ${data.payingMember}`}
                      </TableCell>
                      <TableCell align="right">{data.members[member]}</TableCell>
                    </TableRow>))}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Button variant="contained" size="large" onClick={handleShareBill} color={copied ? "success" : "primary"}>
              {copied ? "Copied" : "Share Bill"}
            </Button>
          </Stack>
        </Box>
      </Container>
    </>
  );
}
