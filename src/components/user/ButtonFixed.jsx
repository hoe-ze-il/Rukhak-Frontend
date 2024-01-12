import Box from "@mui/material/Box";
import ButtonGeneral from "./ButtonGeneral";
import { useNavigate } from "react-router-dom";

function ButtonFixed({ text, textCancel, onClick }) {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        position: "fixed",
        height: "100px",
        width: "100%",
        bottom: "0",
        transform: "translatY(-50%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "16px",
        backgroundColor: "#fff",
        zIndex: "100",
        borderRadius: "24px 24px 0 0",
        boxShadow: "0px 0px 10px rgba(5, 2, 0.1, 0.1)",
        padding: "0 20px",
      }}
    >
      <ButtonGeneral
        text={textCancel}
        onClick={() => navigate(-1)}
        fullWidth="100%"
        buttonBGColor="gray"
        buttonHover="#666666"
        variant="outlined"
      />
      <ButtonGeneral text={text} onClick={onClick} fullWidth="100%" />
    </Box>
  );
}

export default ButtonFixed;
