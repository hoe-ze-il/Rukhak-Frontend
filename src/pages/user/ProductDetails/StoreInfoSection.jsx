import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const StoreInfoSection = ({ seller }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "0.5rem",
      }}
    >
      <Typography
        variant="subtitle2"
        textTransform="capitalize"
        sx={{ color: "text.primary" }}
      >
        sold by:
      </Typography>

      <Typography
        onClick={() => navigate("/shop")}
        variant="body2"
        sx={{ color: "info.main", marginRight: "4rem" }}
      >
        {seller?.storeName ?? "Rukhak Shop"}
      </Typography>
    </Box>
  );
};

export default StoreInfoSection;
