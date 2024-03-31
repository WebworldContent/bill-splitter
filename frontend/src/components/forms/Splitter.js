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

const defaultInfo = {
  payingMember: "",
  paymentOf: "",
  amount: 0,
};

export default function SplitterForm({ group }) {
  const [paymentInfo, setPaymentInfo] = useState(defaultInfo);

  const onChange = (event) => {
    const { name, value } = event.target;
    setPaymentInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    return;
  }

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
        {group.members
          .filter((member) => member !== paymentInfo.payingMember)
          .map((member) => (
            <FormControlLabel control={<Checkbox />} label={member} />
          ))}
      </Stack>
      <Button variant="contained" size="large" onClick={handleSubmit}>
        Save
      </Button>
    </Stack>
  );
}
