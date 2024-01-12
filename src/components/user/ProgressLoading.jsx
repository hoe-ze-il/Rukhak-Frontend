import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const ProgressLoading = () => {
  return (
    <Box
      sx={{
        m: "1rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <CircularProgress color="success" />
    </Box>
  );
};

export default ProgressLoading;
