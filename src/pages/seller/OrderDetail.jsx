import React, { useState } from "react";
import { Box, Button, Typography, Divider } from "@mui/material";
import dayjs from "dayjs";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Loading from "@/components/admin/product/Loading";
import { useGetOrderQuery } from "@/features/seller/getOrderSliceSeller";
import { Link, useParams } from "react-router-dom";
import Location from "@/components/map/Location";
import ConfirmationPopup from "@/components/seller/ConfirmationPopup";
import { useUpdateOrderMutation } from "@/features/seller/getOrderSliceSeller";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const OrderDetail = () => {
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState(null);
  const [stock, SetStock] = useState(false);
  const { id } = useParams();
  const { data: order, error, isLoading } = useGetOrderQuery(id);
  const [updateOrder, { isLoading: isLoadingStatus }] =
    useUpdateOrderMutation();
  if (isLoading || isLoadingStatus) {
    return <Loading />;
  }

  if (error) {
    return <div>Error loading order details</div>;
  }

  const handleConfirmation = (action) => {
    setConfirmationAction(action);
    setConfirmationOpen(true);
  };

  const handleConfirmAction = async () => {
    try {
      const orderId = id; // Replace with the actual order ID
      let status = "";
      if (confirmationAction === "approved") {
        status = "approved";
      } else if (confirmationAction === "cancelled") {
        status = "cancelled";
      } else if (confirmationAction === "shipped") {
        status = "shipped";
      } else if (confirmationAction === "delivered") {
        status = "delivered";
      }
      const data = {
        shipping: {
          address: order.data.shipping.address._id,
          status: status,
        },
      };

      // Call the mutation
      const { error } = await updateOrder({ orderId, data });
      if (error) {
        SetStock(true);
        toast.error("Not Enough Stock !");
        console.log("multa", error);
      } else {
        console.log("Order updated successfully");
      }
      // Handle success
    } catch (error) {
      console.error("Error updating order:", error);
    }

    setConfirmationOpen(false);
  };
  console.log(order);
  const lat = order.data.shipping?.address?.pinPoint[0].coordinates[0];
  const lon = order.data.shipping?.address?.pinPoint[0].coordinates[1];
  const buttonStyle = {
    width: "50%",
    height: "40px",
    marginRight: order.data.shipping.status === "shipped" ? "30px" : "0",
  };
  const statusStyles = {
    pending: {
      backgroundColor: "#FFC43D",
    },
    approved: {
      backgroundColor: "#B191FF",
    },
    cancelled: {
      backgroundColor: "#EF476F",
    },
    shipped: {
      backgroundColor: "#118AB2",
    },
    delivered: {
      backgroundColor: "#06D6A0",
    },
  };

  return (
    <Box className="order-detail overflow-a" sx={{ margin: "0 20px" }}>
      {stock && <ToastContainer />}
      <Box className="px-10-pc back-button">
        <Button onClick={() => window.history.back()}>
          <KeyboardBackspaceIcon sx={{ marginRight: ".5rem" }} />
          <Typography>Go back</Typography>
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <Typography variant="h4">Order Details</Typography>
        <Box sx={{ display: "flex", marginTop: "20px", gap: "8px" }}>
          <Typography sx={{ marginTop: "6px" }}>Status:</Typography>
          <Typography
            variant="body"
            sx={{
              ...statusStyles[order.data.shipping.status.toLowerCase()],
              padding: "4px 8px 6px",
              borderRadius: "14px",
              color: "white",
            }}
          >
            {order.data.shipping.status}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: "20px" }}>
        <Box
          sx={{
            flex: "1",
            border: "1px solid",
            borderRadius: "10px",
            padding: "20px",
          }}
        >
          <Typography variant="h5">Items</Typography>
          <Box>
            {order.data.cartItems.map((cartItem, index) => (
              <React.Fragment key={index}>
                <Box
                  sx={{
                    display: "flex",
                    gap: "1rem",
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <Box
                    sx={{
                      aspectRatio: "4/3",
                      minWidth: "100px",
                      maxWidth: "100px",
                    }}
                  >
                    <img
                      src={cartItem.productId.imgCover}
                      alt={cartItem.imageAlt}
                    />
                  </Box>
                  <Box sx={{ flex: "1" }}>
                    <Typography variant="body2" fontWeight="bold">
                      <Link
                        className="product-links"
                        to={`/seller/products/${cartItem.productId._id}`}
                      >
                        {cartItem.productId.title}
                      </Link>
                    </Typography>
                    <Typography variant="body2">
                      Category:{" "}
                      {cartItem.productId.categories
                        ?.map((item) => item)
                        .join(" ")}
                    </Typography>
                    <Typography
                      variant="body2"
                      fontWeight="medium"
                      marginTop={2}
                    >
                      Quantity: {cartItem.quantity}
                    </Typography>
                  </Box>
                  <div>
                    <Box sx={{ marginBottom: "1rem" }}>
                      <Typography variant="body2">Price/Unit:</Typography>
                      <Typography variant="body2">{`$${cartItem.itemPrice}/${cartItem.productId.unit}`}</Typography>
                    </Box>
                    <Typography variant="body2" fontWeight="bold">
                      {`Total: $${(
                        cartItem.quantity * cartItem.itemPrice
                      ).toFixed(2)}`}
                    </Typography>
                  </div>
                  <Divider sx={{ marginTop: "1rem", display: "block" }} />
                </Box>
                <hr />
              </React.Fragment>
            ))}
          </Box>

          {/* Buyer information section */}
          <Box>
            <Typography variant="h5">Buyer Information</Typography>
            <Typography variant="subtitle1">
              Name: {order.data.userId.firstName}
            </Typography>
            <Typography variant="subtitle2">
              Phone number: {order.data.shipping?.address?.phoneNumber}
            </Typography>
            <Typography variant="subtitle2">
              Email: {order.data.userId.email}
            </Typography>
            <Typography variant="subtitle2" sx={{ marginBottom: "10px" }}>
              Delivery Address:{" "}
            </Typography>
            <Location lat={lat} lon={lon} />
          </Box>
        </Box>

        <Box
          sx={{
            flex: "0 0 35%",
            border: "1px solid",
            borderRadius: "10px",
            padding: "20px",
            maxHeight: "300px",
            overflow: "auto",
          }}
        >
          {/* Order summary section */}
          <Typography variant="h5">Order Summary</Typography>
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body">Subtotal:</Typography>
              <Typography variant="body">${order.data.totalPrice}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body">Shipping Charge: </Typography>
              <Typography variant="body">
                ${order.data.shippingPrice}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body">Discount:</Typography>
              <Typography variant="body">$0.00</Typography>
            </Box>
            <hr />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              <Typography variant="h6">Total: </Typography>
              <Typography variant="body">${order.data.totalPrice}</Typography>
            </Box>

            <hr />
            <Typography variant="body2">
              Order Date: {dayjs(order.data.createAt).format("YYYY-MM-DD")}
            </Typography>
            <Typography variant="body2">
              Approve Date: {dayjs(order.data.createAt).format("YYYY-MM-DD")}
            </Typography>
          </Box>

          {/* Action buttons */}
          <Box
            sx={{
              gap: "10px",
              display: "flex",
              justifyContent: "space-between",
              marginTop: "15px",
            }}
          >
            {order.data.shipping.status === "pending" && (
              <>
                <Button
                  variant="contained"
                  sx={{ ...buttonStyle, backgroundColor: "#06D6A0" }}
                  onClick={() => handleConfirmation("approved")}
                >
                  Accept
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  sx={{ ...buttonStyle, backgroundColor: "#EF476F" }}
                  onClick={() => handleConfirmation("cancelled")}
                >
                  Decline
                </Button>
              </>
            )}
            {order.data.shipping.status === "approved" && (
              <>
                <Button
                  variant="contained"
                  color="success"
                  sx={buttonStyle}
                  onClick={() => handleConfirmation("delivered")}
                >
                  Delivery
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  sx={buttonStyle}
                  onClick={() => handleConfirmation("shipped")}
                >
                  Shipping
                </Button>
              </>
            )}
            {order.data.shipping.status === "shipped" && (
              <Button
                variant="contained"
                color="success"
                sx={buttonStyle}
                onClick={() => handleConfirmation("delivered")}
              >
                Delivered
              </Button>
            )}
            {order.data.shipping.status === "delivered" && (
              <Button variant="contained" color="info" sx={buttonStyle}>
                Completed
              </Button>
            )}
          </Box>
          <ConfirmationPopup
            open={isConfirmationOpen}
            onClose={() => setConfirmationOpen(false)}
            onConfirm={handleConfirmAction}
            title={`Are you sure ${confirmationAction}?`}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default OrderDetail;
