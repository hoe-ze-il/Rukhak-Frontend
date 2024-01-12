import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

import MainTopNavigationBar from "./MainTopNavigationBar";
import BottomNavigationBar from "./BottomNavigationBar";
import { useEffect } from "react";

import Box from "@mui/material/Box";

function GeneralPageLayout() {
  const location = useLocation();
  const isCartPage = location.pathname.includes("/your-cart");
  const isCheckout = location.pathname.includes("/checkout");
  const isProductDetails = location.pathname.includes("/store/");
  const isPayPal = location.pathname.includes("/paypal");

  const isTempPost = location.pathname.includes("/temp-post");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      {!isCartPage &&
        !isCheckout &&
        !isProductDetails &&
        !isTempPost &&
        !isPayPal && <MainTopNavigationBar />}
      <Box component="main" sx={{ minHeight: "100vh" }}>
        <Outlet />
      </Box>
      {!isCartPage && !isCheckout && !isTempPost && !isPayPal && (
        <BottomNavigationBar />
      )}
    </>
  );
}

export default GeneralPageLayout;
