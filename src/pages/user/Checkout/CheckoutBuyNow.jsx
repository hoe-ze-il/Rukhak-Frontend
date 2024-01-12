import { useContext, useEffect } from "react";

import Checkout from "@/components/user/Checkout";
import { CartContext } from "@/contexts/user/CartContext";

function CheckoutBuyNow() {
  const { buyNowItems } = useContext(CartContext);

  useEffect(() => {
    localStorage.setItem("buyNow", JSON.stringify(buyNowItems));
  }, [buyNowItems]);

  return (
    <>
    <Checkout itemToOrder={buyNowItems} fromCart={false} />
    </>
  );
}

export default CheckoutBuyNow;