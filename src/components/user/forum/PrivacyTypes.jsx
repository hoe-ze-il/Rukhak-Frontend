import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function PrivacySelector() {
  const [type, setType] = React.useState("public");

  const handleChange = (event) => {
    setType(event.target.value);
  };

  return (
    <FormControl variant="standard" sx={{ minWidth: 80 }}>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={type}
        onChange={handleChange}
        label="type"
        sx={{ fontSize: "12px" }}
      >
        <MenuItem value={"public"}>Public</MenuItem>
        <MenuItem value={"private"}>Private</MenuItem>
        <MenuItem value={"restricted"}>Restricted</MenuItem>
      </Select>
    </FormControl>
  );
}
