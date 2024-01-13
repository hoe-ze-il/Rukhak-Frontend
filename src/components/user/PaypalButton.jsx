import { useOrderMutation } from "@/features/order/orderApiSlice";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
import useUser from "@/hooks/user/useUser";
import { CartContext } from "@/contexts/user/CartContext";
import { useContext } from "react";
function PayPalButton({ orderItems }) {
  const { dispatch } = useContext(
    CartContext
  );
  const { curAddress, user } = useUser();
  const navigate = useNavigate();
  const [order, { isLoading }] = useOrderMutation();
  const paypalOptions = {
    currency: "USD",
  };
  const mappedOrderItems = orderItems.map((item) => ({
    productId: item.productId,
    itemPrice: item.price,
    quantity: item.quantity,
    title: item.title,
  }));
  const orderData = {
    userId: user?._id,
    cartItems: mappedOrderItems,
    paymentMethod: "cash_on_delivery" || "credit_card" ,
    isPaid: true,
    shipping: { address: curAddress?._id },
  };


  // Calculate the total amount of products
  const total = orderItems
    .reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0)
    .toFixed(2);

  // Take out the important information to display in the purchase summary
  const items = orderItems.map((item) => {
    return {
      name: item.title,
      unit_amount: {
        currency_code: "USD",
        value: item.price,
      },
      quantity: item.quantity,
    };
  });

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: total,
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: total,
              },
            },
          },
          items: items,
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      // Handle the payment success, e.g., show a success message
      console.log("Payment completed:", orderItems);

      const handlePostOrder = async () => {
        try {
          console.log("button click:", details);
          console.log('Order Data', orderData)
          const response = await order({ ...orderData }).unwrap();
          console.log("respnse", response);
        } catch (err) {
          console.log("error", err);
        }
      };
      if (details?.status === "COMPLETED") {
        handlePostOrder();
        dispatch({ type: "CLEAR_CART" });
        navigate("/order-is-confirmed");
      }

     
    });
  };

  const onError = (err) => {
    // Handle errors, e.g., show an error message to the user
    console.error("PayPal error:", err);
  };

  return (
    <PayPalScriptProvider options={paypalOptions}>
      <PayPalButtons
        style={{
          layout: "vertical",
          shape: "pill",
          label: "paypal",
        }}
        createOrder={createOrder}
        // createOrderBuynow={createOrderBuynow}
        onApprove={onApprove}
        onError={onError}
      />
    </PayPalScriptProvider>
  );
}

export default PayPalButton;
