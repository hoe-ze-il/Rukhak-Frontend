import React from "react";
import { Box, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const TotalSale = ({ totalOrders }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{
        width: "100%",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
        padding: "20px",
        borderRadius: "20px",
        marginBottom: "20px", // Add margin bottom for gap
      }}
    >
      <ShoppingCartIcon fontSize="large" color="primary" />
      <Box marginLeft="10px">
        <Typography variant="h6">Total Orders</Typography>
        <Typography variant="h4">{totalOrders}</Typography>
      </Box>
    </Box>
  );
};

export default TotalSale;
