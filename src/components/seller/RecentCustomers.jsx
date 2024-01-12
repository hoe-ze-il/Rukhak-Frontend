// RecentCustomers.jsx
import React from "react";
import { Typography, Card, CardContent, List, ListItem, ListItemText } from "@mui/material";

const RecentCustomers = () => {
  // Replace the following with actual data or API calls
  const recentCustomers = [
    { id: 1, name: "Customer A" },
    { id: 2, name: "Customer B" },
    { id: 3, name: "Customer C" },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Recent Customers
        </Typography>
        <List>
          {recentCustomers.map((customer) => (
            <ListItem key={customer.id}>
              <ListItemText primary={customer.name} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default RecentCustomers;
