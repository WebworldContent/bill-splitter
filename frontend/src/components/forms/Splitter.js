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

const defaultInfo = {
  payingMember: "",
  paymentOf: "",
  amount: 0,
};

export default function SplitterForm({ group }) {
  const [paymentInfo, setPaymentInfo] = useState(defaultInfo);
  const [splitAmong, setSplitAmong] = useState({});
  const { getItem } = useLocalStorage("group");
  const navigate = useNavigate();

  const onChange = (event) => {
    const { name, value } = event.target;
    setPaymentInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
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
    }
  };

  const handleCheckbox = (event) => {
    const { checked, name } = event.target;
    if (checked) {
      setSplitAmong((prev) => ({ ...prev, [name]: 0 }));
    }
  };

  console.log(paymentInfo);

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
        required
      />
      <TextField
        id="outlined-basic"
        label="Price"
        type="number"
        name="amount"
        value={paymentInfo.amount}
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
        {group.members
          .map((member) => (
            <FormControlLabel
              control={<Checkbox name={member} onChange={handleCheckbox} />}
              label={member}
            />
          ))}
      </Stack>
      <Button variant="contained" size="large" onClick={handleSubmit}>
        Save
      </Button>
    </Stack>
  );
}
