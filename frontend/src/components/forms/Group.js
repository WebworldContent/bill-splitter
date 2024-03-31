import React, { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Button, Chip, Stack, TextField } from "@mui/material";
import { addGroup } from "../../services/group";

export default function GroupForm() {
  const [group, setGroup] = useState({});
  const [member, setMember] = useState([]);
  const [memberName, setMemberName] = useState("");
  const [groupName, setGroupName] = useState("");

  const handleCreateGroup = async () => {
    const filterName = groupName.trim();
    const groupInfo = { [filterName]: [...member], currency: "IN" }
    setGroup(groupInfo);
    try {
      await addGroup(groupInfo);
    } catch (error) {
      console.error(error);
    }
  };

  const onAddMember = () => {
    setMember((prev) => [...prev, memberName]);
    setMemberName("");
  };

  console.log(group);

  return (
    <Container maxWidth="sm">
      <Box component="form" sx={{ bgcolor: "#ebedf7", height: "100%" }}>
        <Stack spacing={5} direction="column" sx={{ margin: 1 }}>
          <TextField
            id="outlined-basic"
            label="Group Name"
            name="group"
            variant="outlined"
            value={groupName}
            onChange={(event) => setGroupName(event.target.value)}
            required
          />
          <Stack spacing={2} direction="row">
            <TextField
              id="outlined-basic"
              label="Members"
              variant="outlined"
              value={memberName}
              onChange={(event) => setMemberName(event.target.value)}
              required
            />
            <Button variant="contained" onClick={onAddMember}>
              Add
            </Button>
          </Stack>
          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
            {member.length > 0 &&
              member.map((personName) => (
                <Chip key={personName} label={personName} />
              ))}
          </Stack>
          <TextField
            id="outlined-basic"
            label="Country Currency"
            defaultValue="IN(Indian)"
            variant="outlined"
            value="IN"
            disabled
          />
          <Button variant="contained" size="large" onClick={handleCreateGroup}>
            Create Group
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
