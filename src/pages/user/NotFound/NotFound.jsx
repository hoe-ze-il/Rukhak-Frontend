import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const flexStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const NotFound = ({ message, btnName, toPage }) => {
  const navigate = useNavigate();
  return (
    <main className="page">
      <Box
        sx={{
          ...flexStyle,
          gap: "1rem",
          justifyContent: "flex-start",
        }}
      >
        <CardMedia
          sx={{
            width: "100%",
            maxWidth: "320px",
            height: "320px",
          }}
          image="../no-data-found.svg"
          title="No Data Found"
        />

        <Box
          sx={{
            ...flexStyle,
            gap: "1rem",
          }}
        >
          <Typography variant="h6">{`${message}`} Not Found!</Typography>
          <Button
            variant="contained"
            color="success"
            onClick={() => navigate(toPage)}
          >
            {`${btnName}`}
          </Button>
        </Box>
      </Box>
    </main>
  );
};

export default NotFound;
