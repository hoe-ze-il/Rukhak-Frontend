import React from "react";
import LinearProgress from "@mui/material/LinearProgress";

const LinearProgressWithCustomCircles = ({ value }) => {
  const labelStyle = {
    position: "absolute",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    marginTop: "20px", // Set margin-top to 16px
  };

  return (
    <div style={{ position: "relative", marginBottom: "30px" }}>
      <LinearProgress
        variant="determinate"
        value={value}
        style={{
          width: "75%", // Set the width to 75%

          top: "50%",
          left: "50%",
          transform: "translate(-50%, -90%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "13%",
          transform: "translate(-50%, -90%)",
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          background: "blue",
        }}
      >
        <div style={labelStyle}>pending</div>
      </div>

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "38%",
          transform: "translate(-50%, -90%)",
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          background: "blue",
        }}
      >
        <div style={labelStyle}>confirm</div>
      </div>

      <div
        style={{
          position: "absolute",
          top: "100%",
          left: "63%",
          transform: "translate(-50%, -110%)",
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          background: "blue",
        }}
      >
        <div style={labelStyle}>shipping</div>
      </div>

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "88%",
          transform: "translate(-50%, -90%)",
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          background: "blue",
        }}
      >
        <div style={labelStyle}>delivery</div>
      </div>
    </div>
  );
};

export default LinearProgressWithCustomCircles;
