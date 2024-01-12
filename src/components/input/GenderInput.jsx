import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import useAuth from "@/hooks/auth/useAuth";

function GenderInput() {
  const { gender, setGender, genderFocus, setGenderFocus } = useAuth();
  return (
    <FormControl fullWidth>
      <InputLabel>Gender</InputLabel>
      <Select
        label="Gender"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        onBlur={() => setGenderFocus(false)}
        error={!gender && !genderFocus ? true : false}
      >
        <MenuItem value={"male"}>Male</MenuItem>
        <MenuItem value={"female"}>Female</MenuItem>
        <MenuItem value={"hide"}>Hide</MenuItem>
      </Select>
    </FormControl>
  );
}

export default GenderInput;
