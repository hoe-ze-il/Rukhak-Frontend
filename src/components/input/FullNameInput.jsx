import useAuth from "@/hooks/auth/useAuth";
import TextField from "@mui/material/TextField";
import { useState } from "react";

function FullNameInput({ curFullname }) {
  const { fullname, setFullname, fullnameFocus, setFullnameFocus } = useAuth();

  const [nameStartChange, setNameStartChange] = useState(false);

  return (
    <TextField
      label="Full-name"
      fullWidth
      name="full-name"
      value={nameStartChange ? fullname : curFullname ? curFullname : fullname}
      onFocus={() => {
        setNameStartChange(true),
          !nameStartChange && curFullname && setFullname(curFullname);
      }}
      onBlur={() => {
        setFullnameFocus(false), setFullname(fullname);
      }}
      onChange={(e) => setFullname(e.target.value)}
      error={!fullname && !fullnameFocus ? true : false}
      helperText={!fullname && !fullnameFocus && "Full name is required."}
    />
  );
}

export default FullNameInput;
