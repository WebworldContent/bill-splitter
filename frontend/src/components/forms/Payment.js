import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Button, Chip, Stack } from "@mui/material";
import SplitterForm from "./Splitter";
import useLocalStorage from "../helpers/localStorage";
import { getGroup } from "../../services/group";
import CircularProgress from '@mui/material/CircularProgress';

export default function PaymentForm() {
  const { getItem } = useLocalStorage("group");
  const [group, setGroup] = useState({});
  const [showPayment, setShowPayment] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchGroup = async (id) => {
      setIsLoading(true);
      try {
        const {
          data: { data: incomingData },
        } = await getGroup(id);
        // const { _id, currency } = incomingData; //uncomment to use data
        delete incomingData._id;
        delete incomingData.currency;
        setGroup({
          groupName: Object.keys(incomingData)[0],
          members: incomingData[Object.keys(incomingData)[0]],
        });
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    const { id } = getItem("group");

    if (id) {
      fetchGroup(id);
    }
  }, [getItem]);

  console.log(group);

  const paymentForm = () => (
    <Stack spacing={6} direction="column" sx={{ margin: 1 }}>
      <div style={{ textAlign: "center", fontFamily: "sans-serif" }}>
        <h2>{group.groupName}</h2>
      </div>
      <Stack
        direction="row"
        spacing={1}
        style={{ marginTop: 0 }}
        useFlexGap
        flexWrap="wrap"
      >
        {Object.keys(group).length > 0 &&
          group.members.map((person) => <Chip key={person} label={person} />)}
      </Stack>
      <Button
        variant="outlined"
        size="large"
        onClick={() => setShowPayment(true)}
      >
        Add a Payment
      </Button>
    </Stack>
  );

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>
        ) : (
          <Box component="form" sx={{ bgcolor: "#ebedf7", height: "100%" }}>
            {!showPayment ? paymentForm() : <SplitterForm group={group} />}
          </Box>
        )}
      </Container>
    </>
  );
}
