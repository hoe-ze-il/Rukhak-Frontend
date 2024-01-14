import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
} from "@/features/api/getProductsSlice";
import { useSelector } from "react-redux";
import { selectCurrentUserId } from "@/features/auth/authSlice";
import { useDeleteReviewMutation } from "@/features/review/reviewSlice";
import styled from "@mui/material/styles/styled";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";

import ProductCarousel from "./ProductCarousel";
import SectionHeader from "@/components/user/SectionHeader";
import SecondaryTopNavigationBar from "@/components/user/SecondaryTopNavigationBar";
import ProductDetailsSkeleton from "@/components/skeleton/ProductDetailsSkeleton";
import TopSection from "./TopSection";
import BuySection from "./BuySection";
import StoreInfoSection from "./StoreInfoSection";
import DescriptionSection from "./DescriptionSection";
import ReviewsSection from "./ReviewsSection";
import CurrentUserReview from "./CurrentUserReview";
import ErrorModal from "@/components/user/ErrorModal";
import { CartContext } from "@/contexts/user/CartContext";
import ConfirmationModal from "./ConfirmAddCart";

const mb2 = { marginBottom: "1rem" };
const p2 = { padding: "1rem" };

const SectionBox = styled(Box)(mb2);

const ProductDetailsPage = () => {
  const { totalQuantityCart, buyNowItems, dispatch, cartItems } = useContext(
    CartContext
  );
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false); // New state
  const location = useLocation();
  const navigate = useNavigate();
  const userId = useSelector(selectCurrentUserId);
  const { productId } = useParams();
  const { isError: isErrorDeleteReview, error: errorDeleteReview } =
    useDeleteReviewMutation()[1];
  const { data: product, isLoading } = useGetProductByIdQuery(productId);
  const reviews = product?.reviews.slice(0, 5);
  const { data: similarProducts } = useGetAllProductsQuery({
    categories: product?.categories[0],
  });

  const [productAdd, setProductAdd] = useState([]);
  console.log(product);

  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    const productToAdd = {
      productId: product._id,
      title: product.title,
      images: product.signedImgCover,
      price: product.unitPrice,
      quantity: quantity,
      seller: product.sellerId,
    };
    setProductAdd(productToAdd)
    // Check if the cart is not empty
    if (cartItems.length > 0) {
      // Check if the current product is from a different store
      const isDifferentStore = cartItems.some(
        (item) => item.seller.id !== productToAdd.seller.id
      );

      // If the current product is from a different store, open the confirmation modal
      if (isDifferentStore) {
        setConfirmationModalOpen(true);
      } else {
        // If the current product is from the same store, simply add it to the cart
        dispatch({ type: "ADD_TO_CART", payload: productToAdd });
      }
    } else {
      // If the cart is empty, simply add the product
      dispatch({ type: "ADD_TO_CART", payload: productToAdd });
    }
  };

  const handleBuyNow = () => {
    dispatch({ type: "CLEAR_BUY_NOW_ITEMS" });

    const productToAdd = {
      productId: product._id,
      title: product.title,
      price: product.unitPrice,
      quantity: quantity,
    };
    console.log(productToAdd);
    localStorage.setItem("buyNow", JSON.stringify(buyNowItems));
    dispatch({ type: "ADD_TO_BUY_NOW", payload: productToAdd });
    navigate("/checkout/buynow");
  };

  useEffect(() => {
    if (product && location.pathname === `/store/${product._id}`) {
      localStorage.removeItem("buyNow");
    }
  }, [product, location]);

  return (
    <>
      {isErrorDeleteReview && (
        <ErrorModal
          error={errorDeleteReview}
          errorTitle="Cannot delete review!"
        />
      )}
      <Box component="main" sx={{ marginBottom: "2.5rem" }}>
        <SecondaryTopNavigationBar
          returnPrevLink={-1}
          rightIcon={
            <Badge color="primary" badgeContent={totalQuantityCart} max={99}>
              <ShoppingCartIcon sx={{ color: "text.primary" }} />
            </Badge>
          }
          rightIconLink="/your-cart"
        />
        {isLoading && (
          <Box sx={p2}>
            <ProductDetailsSkeleton />
          </Box>
        )}
        {product && (
          <Box sx={{ backgroundColor: "background.default" }}>
            <ProductCarousel
              images={[product.signedImgCover, ...product.signedMedia]}
              averageRating={product.averageRating}
            />

            <Box sx={p2}>
              <SectionBox>
                <TopSection
                  unitPrice={product.unitPrice}
                  title={product.title}
                />
              </SectionBox>
              <Divider sx={mb2} />

              <SectionBox>
                <BuySection
                  quantity={quantity}
                  setQuantity={setQuantity}
                  handleAddToCart={handleAddToCart}
                  handleBuyNow={handleBuyNow}
                />
              </SectionBox>
              <Divider sx={mb2} />

              <SectionBox>
                <StoreInfoSection seller={product.sellerId} />
              </SectionBox>
              <Divider sx={mb2} />

              <SectionBox>
                <DescriptionSection description={product.description} />
              </SectionBox>
              <Divider sx={mb2} />

              <SectionBox>
                <ReviewsSection reviews={reviews} productId={productId} />
              </SectionBox>

              <SectionBox id="user-review">
                <CurrentUserReview
                  reviews={reviews}
                  productId={productId}
                  userId={userId}
                />
              </SectionBox>

              <SectionBox>
                <SectionHeader title="similar products" />
                {/* {similarProducts && (
                  // <CardCarousel products={similarProducts?.data} />
                )} */}
              </SectionBox>
            </Box>
          </Box>
        )}
      </Box>
      <ConfirmationModal
        open={isConfirmationModalOpen}
        onClose={() => setConfirmationModalOpen(false)}
        onConfirm={() => {
          dispatch({ type: "CLEAR_CART" });
          dispatch({ type: "ADD_TO_CART", payload: productAdd });
          setConfirmationModalOpen(false);
        }}
        message="Adding a product from a different store will remove the previous product from the cart. Are you sure?"
      />
    </>
  );
};

export default ProductDetailsPage;
