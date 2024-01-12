import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate, useLocation } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";

function SettingLineBreak({ section, isDeliveryAddress }) {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      {section && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "16px",
            padding: "0 16px",
          }}
        >
          <Typography variant="body1" fontWeight="500">
            {section}
          </Typography>
          {isDeliveryAddress && (
            <AddCircleIcon
              sx={{ color: "primary.main" }}
              fontSize="medium"
              onClick={() => {
                navigate("/setting/create-address", {
                  state: { from: location },
                  replace: true,
                });
              }}
            />
          )}
        </Box>
      )}
      <Box
        sx={{ width: "100%", border: "1px solid #C2C9BD", opacity: "0.5" }}
      ></Box>
    </>
  );
}

export default SettingLineBreak;
