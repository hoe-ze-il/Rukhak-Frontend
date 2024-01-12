import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import WidgetsSharpIcon from "@mui/icons-material/WidgetsSharp";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";

const style = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};
const NewPostTab = () => {
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        ...style,
        width: "100%",
        padding: "0.5rem 1rem",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <Box sx={style}>
        <IconButton onClick={() => navigate("/")}>
          <WidgetsSharpIcon fontSize="medium" />
        </IconButton>
        <Typography variant="h6">Community</Typography>
      </Box>
    </Card>
  );
};
export default NewPostTab;
