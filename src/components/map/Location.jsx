// AddLocation.jsx
import React from "react";
import Box from "@mui/material/Box";
import mapImage from "@/assets/mapImage.png";
import { useNavigate } from "react-router-dom";

function Location({ lat, lon }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/map?lat=${lat}&lon=${lon}`);
  };

  return (
    <Box
      onClick={handleClick}
      sx={{
        height: "auto",
        borderRadius: "8px",
        background: "white",
        backgroundColor: "background.paper",
        cursor: "pointer",
      }}
    >
      <Box>
        <Box
          component="img"
          src={mapImage}
          alt="map-image"
          sx={{
            objectFit: "cover",
            width: "100%",
            height: "200px",
            borderRadius: "12px",
          }}
        />
      </Box>
    </Box>
  );
}

export default Location;
