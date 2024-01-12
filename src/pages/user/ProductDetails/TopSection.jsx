import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const mb1 = { marginBottom: "0.5rem" };

const TopSection = ({ title, unitPrice }) => {
  return (
    <>
      <Box sx={{ ...mb1, display: "flex" }}>
        <Typography variant="h5" sx={{ color: "text.primary" }}>
          ${unitPrice.toFixed(2)}
        </Typography>
      </Box>

      <Box sx={{ ...mb1, marginBottom: "0.5rem" }}>
        <Typography variant="body1" sx={{ color: "text.primary" }}>
          {title}
        </Typography>
      </Box>
    </>
  );
};

export default TopSection;
