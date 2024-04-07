import React, { useState } from "react";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { addPaymentInfo } from "../../services/payment";
import useLocalStorage from "../helpers/localStorage";
import { addExpenses } from "../../services/group";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const defaultInfo = {
  payingMember: "",
  paymentOf: "",
  amount: 0,
};

export default function SplitterForm({ group }) {
  const [paymentInfo, setPaymentInfo] = useState(defaultInfo);
  const [splitAmong, setSplitAmong] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const { getItem } = useLocalStorage("group");
  const navigate = useNavigate();

  const checkError = () => {
    const errors = {};

    if (!!paymentInfo.paymentOf) {
      if (!(/^[a-zA-Z\s]+$/.test(paymentInfo.paymentOf))) {
        errors["paymentOf"] = "error: only characters allowed";
      }
    } else {
      errors["paymentOf"] = "error: cannot be empty";
    }

    if (!paymentInfo.payingMember) {
      errors["payingMember"] = "error: no payer selected";
    }

    if (paymentInfo.amount === 0) {
      errors["amount"] = "error: cannot be zero";
    }

    const isError = Object.keys(errors).length > 0;

    if (!isError) {
      setError({});
    }

    return { isError, errors };
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    setPaymentInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { isError, errors } = checkError();
    setError(errors);
    if (isError) return;

    setIsLoading(true);
    const totalAmount = paymentInfo.amount;
    const eachShare = (totalAmount / Object.keys(splitAmong).length).toFixed(2);
    Object.keys(splitAmong).forEach((each) => {
      splitAmong[each] = eachShare;
    });
    setPaymentInfo((prev) => ({ ...prev, members: splitAmong }));
    try {
      const { id: groupId } = getItem("group");
      const {
        data: {
          data: { paymentId },
        },
      } = await addPaymentInfo({ ...paymentInfo, members: splitAmong });

      await addExpenses(paymentId, groupId);
      navigate("/show-contri");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckbox = (event) => {
    const { checked, name } = event.target;
    if (checked) {
      setSplitAmong((prev) => ({ ...prev, [name]: 0 }));
    }
  };

  return (
    <Stack spacing={5} direction="column" sx={{ margin: 1 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Payer Person</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={paymentInfo.payingMember}
          name="payingMember"
          label="Payer Person"
          error={!!error.payingMember}
          helpText={error.payingMember}
          onChange={onChange}
        >
          {group.members.map((person) => (
            <MenuItem key={person} value={person}>
              {person}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        id="outlined-basic"
        label="Payment of"
        placeholder="Restaurent bill"
        name="paymentOf"
        value={paymentInfo.paymentOf}
        variant="outlined"
        onChange={onChange}
        error={!!error.paymentOf}
        helperText={error.paymentOf}
        required
      />
      <TextField
        id="outlined-basic"
        label="Price"
        type="number"
        name="amount"
        value={paymentInfo.amount}
        error={!!error.amount}
        helperText={error.amount}
        onChange={onChange}
        variant="outlined"
        required
      />
      <Stack
        spacing={1}
        direction="row"
        sx={{ margin: 1 }}
        useFlexGap
        flexWrap="wrap"
      >
        <h3>Split between:</h3>
        {group.members.map((member) => (
          <FormControlLabel
            control={<Checkbox key={member} name={member} onChange={handleCheckbox} />}
            label={member}
          />
        ))}
      </Stack>
      <Button
        variant="contained"
        size="large"
        onClick={handleSubmit}
        disabled={isLoading || Object.keys(splitAmong).length === 0}
      >
        {isLoading ? <CircularProgress /> : "Save"}
      </Button>
    </Stack>
  );
}
