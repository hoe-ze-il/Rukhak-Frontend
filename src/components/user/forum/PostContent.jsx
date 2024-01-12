import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
const PostContent = () => {
  return (
    <Stack gap={0.5}>
      <TextField
        id="standard-multiline-static"
        placeholder="Title"
        fullWidth
        variant="outlined"
        sx={{ border: "none", "& fieldset": { border: "none" } }}
      />
      <TextField
        id="standard-multiline-static"
        placeholder="Content"
        fullWidth
        multiline
        variant="outlined"
        sx={{ border: "none", "& fieldset": { border: "none" } }}
      />
    </Stack>
  );
};
export default PostContent;
