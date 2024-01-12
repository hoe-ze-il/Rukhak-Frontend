// SaleToday.js
import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import ChartIcon from "@mui/icons-material/InsertChartOutlined";
import { useGetOrdersQuery } from "@/features/seller/getOrderSliceSeller";

const SaleToday = () => {
  const [saleToday, setSaleToday] = useState(0);
  const { data: orders } = useGetOrdersQuery();

  useEffect(() => {
    if (orders) {
      const today = new Date();
      const formattedDate = today.toISOString().split("T")[0];
      const todayOrders = orders.data.docs.filter((order) => {
        return (
          order.shipping.status !== "pending" &&
          order.shipping.status !== "cancelled" &&
          new Date(order.createAt).toISOString().split("T")[0] === formattedDate
        );
      });
      const totalPriceArray = todayOrders.map((order) => {
        const orderItem = order.Orders[0];
        if (orderItem && orderItem.itemPrice && orderItem.quantity) {
          return orderItem.itemPrice * orderItem.quantity;
        } else {
          return 0;
        }
      });

      const totalSum = totalPriceArray.reduce(
        (acc, totalPrice) => acc + totalPrice,
        0
      );

      setSaleToday(totalSum.toFixed(2));
    }
  }, [orders]);

  return (
    <div
      style={{
        width: "100%",
        padding: "20px",
        marginBottom: "20px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
        borderRadius: "20px",
      }}
    >
      <Typography variant="h6" gutterBottom>
        <ChartIcon fontSize="small" /> Sale Today
      </Typography>
      <Typography variant="h4">{`$${saleToday}`}</Typography>
    </div>
  );
};

export default SaleToday;
