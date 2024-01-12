import { useContext, useEffect } from "react";

import Checkout from "@/components/user/Checkout";
import { CartContext } from "@/contexts/user/CartContext";
import { useLocation } from "react-router-dom";

function CheckoutCart() {
  const { cartItems, dispatch } = useContext(CartContext);
  const location = useLocation();

  useEffect(() => {
    if(location.pathname === "/order-is-confirmed") {
      dispatch({type: "CLEAR_ADD_TO_CART_ITEMS"})
    }
  })

  return (
    <>
    <Checkout itemToOrder={cartItems} fromCart={true} />
    </>
  );
}

export default CheckoutCart;