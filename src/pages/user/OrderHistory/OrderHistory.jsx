import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { useGetUserOrderQuery } from '@/features/seller/getOrderSliceSeller';
import Loading from '@/components/admin/product/Loading';
function OrderHistory() {
  const { data,isLoading } = useGetUserOrderQuery();
  if(isLoading){
    return <Loading />
  }
  const orders = data?.data || []; // Ensure orders is an array
  const renderProducts = (products) => {
    const maxProductsToShow = 2;
    const productsToDisplay = products.slice(0, maxProductsToShow);
    return (
      <>
        {productsToDisplay.map((product) => (
          <div key={product.productId._id} style={{ marginRight: '10px', textAlign: 'center' }}>
            <img
              src={product.productId.imgCover} // Adjust the path based on your actual API response structure
              alt={product.productId.title}
              className="product-image"
              style={{ width: '50px', height: '50px', marginBottom: '5px' }}
            />
            <Typography variant="body2" color="textSecondary">
              {product.productId.title}
            </Typography>
          </div>
        ))}
        {products.length > maxProductsToShow && (
          <Typography variant="body2" color="textSecondary" marginTop={1}>
            ...
          </Typography>
        )}
      </>
    );
  };
  return (
    <Grid container spacing={2} justifyContent="center" padding={2}>
      {orders.map((order) => (
        <Grid item key={order._id} xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <div style={{ position: 'relative' }}>
                <Typography variant="subtitle1" color="primary" style={{ position: 'absolute', top: 0, right: 0, padding: '8px' }}>
                  {order.shipping.status}
                </Typography>
                <div className="product-images" style={{ display: 'flex' }}>
                  {renderProducts(order.cartItems)}
                </div>
                <div className="order-details" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '10px' }}>
                  <Typography variant="body2" color="textSecondary">
                    Total Items: {order.cartItems.length}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>
                      Total Price: ${order.totalPrice.toFixed(2)}
                    </strong>
                  </Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
export default OrderHistory;