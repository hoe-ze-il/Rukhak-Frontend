import PayPalButton from "@/components/user/PaypalButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useContext } from "react";
import { CartContext } from "@/contexts/user/CartContext";
import SecondaryTopNavigationBar from "@/components/user/SecondaryTopNavigationBar";

function PayPalCheckout() {
  const { buyNowItems } = useContext(CartContext);
  const { cartItems } = useContext(CartContext);

  const itemsToPay = buyNowItems.length > 0 ? buyNowItems : cartItems;
  console.log("buy", buyNowItems);
  console.log("cart", cartItems);
  console.log("itemtopay", itemsToPay);
 
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <SecondaryTopNavigationBar returnPrevLink={-1} label="Payment" />
      <Box margin={3}>
        <Typography margin={1}>
          Pay with PayPal, Debit, or Credit Card
        </Typography>
        <Box
          sx={{
            textAlign: "center",
          }}
        >
          <PayPalButton orderItems={itemsToPay} />
        </Box>
      </Box>
    </Box>
  );
}

export default PayPalCheckout;
