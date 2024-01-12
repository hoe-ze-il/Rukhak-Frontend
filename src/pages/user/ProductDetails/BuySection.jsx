import styled from "@mui/material/styles/styled";

import SectionHeader from "@/components/user/SectionHeader";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useContext, useEffect } from "react";
import { CartContext } from "@/contexts/user/CartContext";

const flex = { display: "flex" };
const roundSm = { borderRadius: "0.25rem" };
const bgGrey = { backgroundColor: "grey.300" };

const StyledButton = styled(Button)(({ theme }) => ({
  display: "block",
  borderRadius: "100px",
  color: theme.palette.text.primary,
}));

const buttonSetting = {
  variant: "contained",
  size: "large",
  fullWidth: true,
};

const BuySection = ({
  quantity,
  setQuantity,
  handleAddToCart,
  handleBuyNow,
}) => {
  const { cartItems, totalQuantityCart } = useContext(CartContext);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    localStorage.setItem(
      "totalQuantityCart",
      JSON.stringify(totalQuantityCart)
    );
  }, [cartItems, totalQuantityCart]);

  return (
    <>
      <SectionHeader title="in stocks" />
      <Box
        sx={{
          ...flex,
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <Typography variant="body1" sx={{ color: "text.primary" }}>
          Quantity:
        </Typography>
        <Box
          sx={{
            ...flex,
            ...roundSm,
            gap: "0.25rem",
            marginBottom: "0.75rem",
          }}
        >
          <IconButton
            aria-label="remove"
            sx={{
              ...roundSm,
              ...bgGrey,
              ":hover": bgGrey,
            }}
            onClick={() =>
              quantity > 1 ? setQuantity(quantity - 1) : setQuantity(quantity)
            }
          >
            <RemoveIcon />
          </IconButton>
          <TextField
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            size="small"
            sx={{
              maxWidth: "4rem",
              padding: 0,
              backgroundColor: "#fff",
            }}
            type="number"
          />
          <IconButton
            aria-label="add"
            sx={{
              ...bgGrey,
              ...roundSm,
              ":hover": bgGrey,
            }}
            onClick={() => setQuantity(quantity + 1)}
          >
            <AddIcon />
          </IconButton>
        </Box>
      </Box>
      <StyledButton
        {...buttonSetting}
        sx={{
          marginBottom: "0.5rem",
          ":hover": { backgroundColor: "primary.main" },
          color: "background.default",
        }}
        onClick={handleBuyNow}
      >
        buy now
      </StyledButton>
      <StyledButton
        {...buttonSetting}
        color="secondary"
        onClick={handleAddToCart}
        sx={{
          ":hover": { backgroundColor: "secondary.main" },
        }}
      >
        add to cart
      </StyledButton>
    </>
  );
};

export default BuySection;
