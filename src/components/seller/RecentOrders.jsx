// RecentOrders.jsx
import React from "react";
import {
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "@/features/seller/getOrderSliceSeller";

const RecentOrders = () => {
  const { data: orders } = useGetOrdersQuery();
  const paginatedOrders = [...(orders?.data?.docs || [])].reverse();

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
    <Card style={{  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2) ",borderRadius:"20px"}}>
      <CardContent
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          
        }}
      >
        <Typography variant="h6" gutterBottom>
          Recent Orders
        </Typography>
        <Link to="/seller/orders" style={{ textDecoration: "none" }}>
          <Button variant="outlined" color="primary">
            View All
          </Button>
        </Link>
      </CardContent>
      <TableContainer
        component={Paper}
        style={{ maxHeight: "400px", overflow: "auto" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Payment</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedOrders.slice(0, 5).map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order.shipping?.address?.fullname}</TableCell>
                <TableCell>
                  {order.title.map((item) => (
                    <div key={item}>{item}</div>
                  ))}
                </TableCell>
                <TableCell>
                  {order.Orders.map((item) => (
                    <div key={item._id}>
                      ${(item.itemPrice * item.quantity).toFixed(2)}
                      <br />
                    </div>
                  ))}
                </TableCell>
                <TableCell>{order.paymentMethod}</TableCell>
                <TableCell>
                  <Typography
                    variant="body"
                    sx={{
                      ...(order.shipping.status &&
                        statusStyles[order.shipping.status.toLowerCase()]), // Check if order.status is defined
                      padding: "4px 8px 6px",
                      borderRadius: "20px",
                      color: "white",
                    }}
                  >
                    {order.shipping.status}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default RecentOrders;
