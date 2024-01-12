import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import propTypes from "prop-types";

function CartBottomBar({ totalPrice, buttonText, onClick }) {
  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          position: "fixed",
          padding: "1rem",
          bottom: 0,
          borderTopLeftRadius: "1rem",
          borderTopRightRadius: "1rem",
          backgroundColor: "background.default",
          boxShadow:
            "0px 1px 2px 0px rgba(0, 0, 0, 0.30), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="body1">Total Price:</Typography>
          <Typography variant="h6"> $ {totalPrice}</Typography>
        </Box>
        <Button
          variant="contained"
          color="success"
          sx={{
            width: "100%",
            borderRadius: "100px",
          }}
          onClick={onClick}
        >
          {buttonText}
        </Button>
      </Box>
    </Box>
  );
}

CartBottomBar.propTypes = {
  totalPrice: propTypes.oneOfType([propTypes.number, propTypes.string]).isRequired,
  buttonText: propTypes.string.isRequired,
  onClick: propTypes.func.isRequired,
};

export default CartBottomBar;
