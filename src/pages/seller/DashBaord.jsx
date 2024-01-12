import React, { useState, useEffect } from "react";
import { Container, Typography, Box, LinearProgress } from "@mui/material";
import DashboardChart from "@/components/seller/ColumnChart";
import PieChart from "@/components/seller/PieChart";
import LineChart from "@/components/seller/LineChart";
import TotalEarning from "@/components/seller/TotalEarned";
import TotalSale from "@/components/seller/TotalSales";
import RecentCustomers from "@/components/seller/RecentCustomers";
import RecentOrders from "@/components/seller/RecentOrders";
import TopSaleProducts from "@/components/seller/TopSaleProducts";
import { useGetOrdersQuery } from "@/features/seller/getOrderSliceSeller";
import DonutChart from "@/components/seller/PieChart";
import SaleToday from "@/components/seller/SaleToday";
const Dashboard = () => {
  const { data: orders, isLoading } = useGetOrdersQuery();
  const [totalEarning, setTotalEarning] = useState(0);
  const [order, setOrder] = useState([]);
  useEffect(() => {
    if (orders) {
      
      const order = orders?.data?.docs;

      if (order) {
        const filteredOrders = order.filter(
          (order) =>
            order.shipping.status !== "pending" &&
            order.shipping.status !== "cancelled"
        );
        const totalPriceArray = filteredOrders.map((order) => {
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
        setTotalEarning(totalSum.toFixed(2));
      }
    }
    setOrder(order);
  }, [orders]);

  const orderResults = orders?.data?.results || [];

  return (
    <Container sx={{ height: "100vh", overflow: "auto", padding: "20px" }}>
      <Typography variant="h4" gutterBottom sx={{ marginTop: "20px" }}>
        Dashboard
      </Typography>

      {isLoading && <LinearProgress color="primary" />}

      <Box
        display="flex"
        justifyContent="space-evenly"
        gap={2}
        sx={{ marginBottom: "20px", marginTop: "10px" }}
      >
        <TotalSale totalOrders={orderResults} />
        <TotalEarning totalEarning={totalEarning} />
        <SaleToday />
      </Box>

      <Box display="flex" justifyContent="space-between">
        <Box width="70%">
          <LineChart />
        </Box>
        <Box
          width="25%"
          height="0"
          sx={{
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2) ",
            borderRadius: "20px",
          }}
        >
          <DonutChart orders={order} />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <Box width="70%">
          <RecentOrders />
        </Box>
        <Box
          sx={{
            width: "25%",
          }}
        >
          <TopSaleProducts />
        </Box>
      </Box>
    </Container>
  );
};

export default Dashboard;
