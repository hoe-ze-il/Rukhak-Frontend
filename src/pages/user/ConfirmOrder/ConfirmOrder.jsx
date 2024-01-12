import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button, CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useUser from "@/hooks/user/useUser";

function ConfirmOrder() {
  const navigate = useNavigate();
  // const { curAddress } = useUser();
  const { curAddress } = useUser();

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Typography
        variant="h5"
        noWrap
        component="div"
        margin={1}
        sx={{
          flexGrow: 1,
          alignSelf: "center",
          fontFamily: "lemon",
          color: "primary.dark",
        }}
      >
        RUKHAK
      </Typography>

      <Box
        marginTop={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box marginBottom={2} sx={{ height: "64px", width: "64px" }}>
          <CardMedia component="img" image="./confirm-img.png" />
        </Box>
        <Box
          marginBottom={5}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <Typography variant="body">
            Hey <strong>{curAddress?.fullname}</strong>,
          </Typography>
          <Typography variant="h6">Your Order is Confirmed!</Typography>
          <Typography>{`We\u0027ll send you an order confirmation email`}</Typography>
          <Typography>as soon as your orders are placed.</Typography>
        </Box>
        <Box>
          <Button
            variant="contained"
            sx={{
              width: "100%",
              borderRadius: "100px",
            }}
            onClick={() => navigate("/")}
          >
            Thank You!
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ConfirmOrder;
