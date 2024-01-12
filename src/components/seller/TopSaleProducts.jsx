import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import { useGetProductQuery } from "@/features/seller/sellerProductSlice";
const TopSaleProducts = () => {
  const { data: products } = useGetProductQuery();
  const [topProducts, setTopProducts] = useState([]);
  useEffect(() => {
    if (products) {
      console.log(products.entities);
      const sortedProducts = Object.values(products.entities)
        .sort((a, b) => b.soldAmount - a.soldAmount)
        .slice(0, 5);

      setTopProducts(sortedProducts);
    }
  }, [products]);
  // Assuming 'soldAmount' is a property in each product object

  return (
    <Card
      style={{
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2) ",
        borderRadius: "20px",
      }}
    >
      <CardContent
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography>
          <strong>Top 5 products Sales</strong>
        </Typography>
      </CardContent>
      <TableContainer
        component={Paper}
        style={{ overflow: "auto", maxHeight: "335px" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Sold</TableCell>
              <TableCell>img</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.soldAmount}</TableCell>
                <TableCell>
                  <img
                    src={product.imgCover}
                    alt={product.title}
                    style={{ width: 50, height: 50 }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default TopSaleProducts;
