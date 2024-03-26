import React from "react";
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

export default function SplitterForm() {
  return (
    <Stack spacing={5} direction="column" sx={{ margin: 1 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Payer Person</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={""}
          label="Payer Person"
          onChange={() => {}}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <TextField
        id="outlined-basic"
        label="Payment of"
        variant="outlined"
        required
      />
      <TextField
        id="outlined-basic"
        label="Price"
        variant="outlined"
        required
      />
      <Stack spacing={1} direction="row" sx={{ margin: 1 }} useFlexGap flexWrap="wrap">
        <FormControlLabel control={<Checkbox />} label="Persion1" />
        <FormControlLabel control={<Checkbox />} label="Persion2" />
        <FormControlLabel control={<Checkbox />} label="Persion3" />
      </Stack>
      <Button variant="contained" size="large">
        Save
      </Button>
    </Stack>
  );
}
