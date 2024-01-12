import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import mapImage from "@/assets/mapImage.png";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import { useNavigate } from "react-router-dom";

function AddLocation({
  title = "Store Location",
  describtion = "Select your store location:",
  type = "create",
  curAddress,
}) {
  const navigate = useNavigate();
  const addressId = curAddress?._id;
  const deliLatitude =
    JSON.parse(localStorage.getItem("deliLatitude")) ||
    curAddress?.pinPoint[0]?.coordinates?.[0];
  const deliLongitude =
    JSON.parse(localStorage.getItem("deliLongitude")) ||
    curAddress?.pinPoint[0]?.coordinates?.[1];
  const storeLongitude = JSON.parse(localStorage.getItem("storeLongitude"));
  const storeLatitude = JSON.parse(localStorage.getItem("storeLatitude"));

  const handleNavigate = () => {
    if (title === "Store Location" && type === "create") {
      navigate("/map/store-location");
    } else if (title === "Delivery Location" && type === "create") {
      navigate("/map/create/delivery-location");
    } else if (title === "Delivery Location" && type === "edit") {
      navigate(`/map/delivery-location/${addressId}`);
    }
  };
  return (
    <Box
      onClick={handleNavigate}
      sx={{
        height: "auto",
        borderRadius: "8px",
        boxShadow: "0px 0px 10px rgba(5, 2, 0.1, 0.1)",
        background: "white",
        overflow: "hidden",
        backgroundColor: "background.paper",
        cursor: "pointer",
      }}
    >
      <Box sx={{ padding: "12px" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">{title}</Typography>

          <Typography
            variant="h5"
            sx={{
              fontSize: "12px",
              color: "primary.main",
              fontWeight: "500",
              borderRadius: "12px",
            }}
          >
            {(storeLongitude && storeLatitude) ||
            (deliLatitude && deliLongitude) ? (
              <Box component="span">
                Added <CheckCircleRoundedIcon fontSize="12px" />
              </Box>
            ) : (
              <Box component="span" sx={{ color: "error.main" }}>
                Required <sup>*</sup>
              </Box>
            )}
          </Typography>
        </Box>
        <Typography variant="body2">{describtion}</Typography>
        <Box
          sx={{
            height: "100%",
            width: "100%",
            marginTop: "8px",
            overflow: "hidden",
            borderRadius: "8px",
          }}
        >
          <Box
            component="img"
            src={mapImage}
            alt="map-image"
            sx={{
              objectFit: "cover",
              width: "100%",
              height: "100px",
              borderRadius: "12px",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default AddLocation;
