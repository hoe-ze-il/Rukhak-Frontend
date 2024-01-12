// MapboxComponent.js
import React from "react";
import ReactMapGl, { Marker } from "react-map-gl";
import Box from "@mui/material/Box";
import "mapbox-gl/dist/mapbox-gl.css";
import { Button, Typography } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const MapboxComponent = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const lat = parseFloat(urlParams.get("lat")) || 0;
  const lon = parseFloat(urlParams.get("lon")) || 0;

  console.log(lat, lon);
  const mapBoxToken = import.meta.env.VITE_MAPBOX_TOKEN;
  const mapBoxStyle = import.meta.env.VITE_MAPBOX_STYLES;

  return (
    <Box height={"100vh"} position="relative">
      <ReactMapGl
        mapboxAccessToken={mapBoxToken}
        initialViewState={{
          longitude: lon,
          latitude: lat,
          zoom: 15,
        }}
        mapStyle={mapBoxStyle}
      >
        {/* Marker for the given latitude and longitude */}
        <Marker latitude={lat} longitude={lon} />

        {/* Button to go back */}
        <div style={{ position: "absolute", top: 10, left: 10 }}>
          <Button onClick={() => window.history.back()}>
            <KeyboardBackspaceIcon sx={{ marginRight: ".5rem" }} />
            <Typography>Go back</Typography>
          </Button>
        </div>
      </ReactMapGl>
    </Box>
  );
};

export default MapboxComponent;
