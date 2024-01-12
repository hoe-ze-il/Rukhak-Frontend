import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const lineContainer = {
  display: "flex",
  marginTop: "32px",
  alignItems: "center",
  justifyContent: "space-between",
};

const lineStyle = {
  backgroundColor: "#c6c7c1",
  width: "100%",
  height: "1px",
};

function LineBreak() {
  return (
    <Box sx={lineContainer}>
      <Box sx={lineStyle}></Box>
      <Typography variant="body1" margin="0 16px 0 16px">
        or
      </Typography>
      <Box sx={lineStyle}></Box>
    </Box>
  );
}

export default LineBreak;
