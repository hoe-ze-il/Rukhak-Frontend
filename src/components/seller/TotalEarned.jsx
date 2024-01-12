import React from "react";
import { Box, Typography } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const TotalEarning = ({ totalEarning }) => {
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
      <AttachMoneyIcon fontSize="large" color="primary" />
      <Box marginLeft="10px">
        <Typography variant="h6">Total Earning</Typography>
        <Typography variant="h4">{`$${totalEarning}`}</Typography>
      </Box>
    </Box>
  );
};

export default TotalEarning;
