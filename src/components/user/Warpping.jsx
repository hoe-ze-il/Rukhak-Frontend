import { Box } from "@mui/material";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Warpping = ({ children }) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <Box sx={{ width: "100vw", height: "100vh" }}>{children}</Box>;
};

export default Warpping;
