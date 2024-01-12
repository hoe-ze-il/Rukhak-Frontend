import ReactMapGl, { Marker, GeolocateControl } from "react-map-gl";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "@/hooks/auth/useAuth";
import "mapbox-gl/dist/mapbox-gl.css";

import Box from "@mui/material/Box";
import ButtonFixed from "../user/ButtonFixed";
import SearchLocation from "./SearchLocation";
import useUser from "@/hooks/user/useUser";
import { useEffect } from "react";

const mapBoxToken = import.meta.env.VITE_MAPBOX_TOKEN;
const mapBoxStyle = import.meta.env.VITE_MAPBOX_STYLES;

function Map({ isStoreAddress, isDeliveryAddress }) {
  const { addressId } = useParams();
  const { latLon, setLatLon } = useAuth();
  const { handleGetCurDeliAddress } = useUser();
  const curDeliAddress = handleGetCurDeliAddress(addressId);

  const navigate = useNavigate();
  const latitude = latLon[0];
  const longitude = latLon[1];

  useEffect(() => {
    const handleSetLatLon = () => {
      const deliLat =
        JSON.parse(localStorage.getItem("deliLatitude")) ||
        curDeliAddress?.pinPoint[0].coordinates[0];

      const deliLon =
        JSON.parse(localStorage.getItem("deliLongitude")) ||
        curDeliAddress?.pinPoint[0].coordinates[1];

      setLatLon([deliLat, deliLon]);
    };
    if (curDeliAddress) {
      handleSetLatLon();
    }
  }, []);

  const onMapClick = (event) => {
    setLatLon([event.lngLat.lat, event.lngLat.lng]);
  };

  const handleSaveStoreClick = () => {
    localStorage.setItem("storeLatitude", JSON.stringify(latitude));
    localStorage.setItem("storeLongitude", JSON.stringify(longitude));
    navigate(-1);
  };

  const handleSaveDeliveryAddress = () => {
    localStorage.setItem("deliLatitude", JSON.stringify(latitude));
    localStorage.setItem("deliLongitude", JSON.stringify(longitude));
    navigate(-1);
  };

  return (
    <>
      <Box height={"100vh"} position="relative">
        <ReactMapGl
          mapboxAccessToken={mapBoxToken}
          initialViewState={{
            latitude: latitude,
            longitude: longitude,
            zoom: 6,
          }}
          mapStyle={mapBoxStyle}
          onClick={onMapClick}
          onGeolocate={(e) =>
            setLatLon([e.coords.latitude, e.coords.longitude])
          }
        >
          <Marker latitude={latitude} longitude={longitude} />
          <GeolocateControl
            positionOptions={{ enableHighAccuracy: true }}
            fitBoundsOptions={{ zoom: 16 }}
            showAccuracyCircle={false}
            showUserHeading
            position="top-left"
            trackUserLocation={true}
            onGeolocate={(e) =>
              setLatLon([e.coords.latitude, e.coords.longitude])
            }
          />
          <SearchLocation />
        </ReactMapGl>

        <ButtonFixed
          text="Save"
          textCancel="cancel"
          onClick={
            isStoreAddress
              ? handleSaveStoreClick
              : isDeliveryAddress
              ? handleSaveDeliveryAddress
              : null
          }
        />
      </Box>
    </>
  );
}

export default Map;
