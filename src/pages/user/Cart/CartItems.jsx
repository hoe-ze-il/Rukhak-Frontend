import { useContext, useState, useEffect } from "react";
import { CartContext } from "@/contexts/user/CartContext";
import { useNavigate } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import Dialong from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";

import CartBottomBar from "@/components/user/CartBottomBar";

function CartItems() {
  const { cartItems, totalQuantityCart, dispatch } = useContext(CartContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [productIdToRemove, setProductIdToRemove] = useState(null);
  console.log(cartItems);

  const onCheckout = () => {
    if (countItem > 0) navigate("/checkout/cart");
    dispatch({ type: "CLEAR_BUY_NOW_ITEMS" });
  };

  const countItem = cartItems.length;

  const handleRemove = (productId) => {
    setProductIdToRemove(productId);
    setOpen(true);
  };

  const confirmRemove = (productId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { productId } });
    setOpen(false);
  };

  const handleIncrement = (productId) => {
    dispatch({ type: "INCREMENT_QUANTITY", payload: { productId } });
  };

  const handleDecrement = (productId) => {
    dispatch({ type: "DECREMENT_QUANTITY", payload: { productId } });
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    localStorage.setItem(
      "totalQuantityCart",
      JSON.stringify(totalQuantityCart)
    );
  }, [cartItems, totalQuantityCart]);
  console.log(cartItems)
  return (
    <Box sx={{ minHeight: "100vh", marginBottom: "20%" }}>
      <Grid container spacing={3} padding={2}>
        {cartItems.map((product) => (
          <Grid item xs={12} key={product.productId}>
            <Card sx={{ padding: "0.5rem" }} elevation={2}>
              <Button
                onClick={() => handleRemove(product.productId)}
                sx={{ color: "black" }}
              >
                <CloseIcon /> Remove
              </Button>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: "0 8px",
                  }}
                  onClick={() => navigate(`/store/${product.productId}`)}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={product.images}
                    alt={product.name}
                    sx={{
                      width: 72,
                      height: 72,
                      borderRadius: 1,
                    }}
                  />
                  <CardContent
                    sx={{ padding: "0 !important", marginLeft: "1rem" }}
                  >
                    <Typography gutterBottom variant="body1">
                      {product.title}
                    </Typography>
                    <Typography
                      color="text.secondary"
                      sx={{ fontWeight: "Medium" }}
                    >
                      $ {product.price}
                    </Typography>
                  </CardContent>
                </Box>

                {/* button */}
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <IconButton
                    variant="outlined"
                    sx={{
                      backgroundColor: "grey.400",
                      ":hover": { backgroundColor: "grey.400" },
                      borderRadius: "0.25rem 0.25rem 0 0",
                      width: 24,
                      height: 24,
                    }}
                    onClick={() => handleIncrement(product.productId)}
                  >
                    <AddIcon />
                  </IconButton>
                  <Box
                    sx={{
                      border: "1px solid",
                      borderColor: "grey.400",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {product.quantity}
                  </Box>
                  <IconButton
                    variant="outlined"
                    sx={{
                      backgroundColor: "grey.400",
                      ":hover": { backgroundColor: "grey.400" },
                      borderRadius: "0 0 0.25rem 0.25rem",
                      width: 24,
                      height: 24,
                    }}
                    onClick={() => handleDecrement(product.productId)}
                  >
                    <RemoveIcon />
                  </IconButton>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
        <Dialong
          open={productIdToRemove !== null}
          onClose={() => setProductIdToRemove(null)}
        >
          <DialogTitle>{"Confirm Removal"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to remove this product from the cart?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setProductIdToRemove(null)}>No</Button>
            <Button
              onClick={() => {
                confirmRemove(productIdToRemove);
                setProductIdToRemove(null);
              }}
            >
              Yes
            </Button>
          </DialogActions>
        </Dialong>
      </Grid>
      <Box>
        <CartBottomBar
          totalPrice={cartItems
            .reduce((total, item) => total + item.price * item.quantity, 0)
            .toFixed(2)}
          buttonText={`Checkout(${countItem})`}
          onClick={onCheckout}
        />
      </Box>
    </Box>
  );
}

export default CartItems;
