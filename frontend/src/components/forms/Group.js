import React, { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Button, Chip, Stack, TextField } from "@mui/material";
import { addGroup } from "../../services/group";
import useLocalStorage from "../helpers/localStorage";
import { useNavigate } from "react-router-dom";

export default function GroupForm() {
  const [group, setGroup] = useState({});
  const [member, setMember] = useState([]);
  const [memberName, setMemberName] = useState("");
  const [groupName, setGroupName] = useState("");
  const { setItem } = useLocalStorage("group");
  const navigate = useNavigate();

  const handleCreateGroup = async () => {
    const filterName = groupName.trim();
    const groupInfo = { [filterName]: [...member], currency: "IN" };
    setGroup(groupInfo);
    try {
      const {
        data: {
          data: { groupId },
        },
      } = await addGroup(groupInfo);
      console.log(groupId);
      if (groupId) {
        setItem({ id: groupId });
      }
      navigate("/splitter");
    } catch (error) {
      console.error(error);
    }
  };

  const processExistingName = (names) => {
    const indxVal =
      parseInt(names[names.length - 1].split("-")[1] || "0", 10) + 1;
    const updatedName = `${names[names.length - 1].split("-")[0]}-${indxVal}`;
    return updatedName;
  };

  const onAddMember = () => {
    const regex = new RegExp(`^${memberName}(-\\d+)?$`);
    const nameExist = member.filter((person) => regex.test(person));
    let updatedName = memberName;
    if (nameExist.length > 0) {
      updatedName = processExistingName(nameExist);
    }
    setMember((prev) => [...prev, updatedName]);
    setMemberName("");
  };

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
            <Button variant="contained" onClick={onAddMember} disabled={!memberName.length > 0}>
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
            variant="outlined"
            value="IN"
            disabled
          />
          <Button variant="contained" size="large" onClick={handleCreateGroup} disabled={!member.length > 0}>
            Create Group
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
