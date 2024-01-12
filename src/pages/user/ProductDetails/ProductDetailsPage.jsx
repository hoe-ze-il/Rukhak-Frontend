import { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
} from "@/features/api/getProductsSlice";
import { useSelector } from "react-redux";
import { selectCurrentUserId } from "@/features/auth/authSlice";
import { useDeleteReviewMutation } from "@/features/review/reviewSlice";

// MUI components
import styled from "@mui/material/styles/styled";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

// MUI icons
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// Internal components
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
import Badge from "@mui/material/Badge";

const mb2 = { marginBottom: "1rem" };
const p2 = { padding: "1rem" };

const SectionBox = styled(Box)(mb2);

const ProductDetailsPage = () => {
  const { totalQuantityCart, buyNowItems, dispatch } = useContext(CartContext);
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

  console.log(product);

  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    const productToAdd = {
      productId: product._id,
      title: product.title,
      images: product.signedImgCover,
      price: product.unitPrice,
      quantity: quantity,
    };
    console.log(productToAdd);
    dispatch({ type: "ADD_TO_CART", payload: productToAdd });
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
        {/* Top Bar */}
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
            {/* Product Carousel */}
            <ProductCarousel
              images={[product.signedImgCover, ...product.signedMedia]}
              averageRating={product.averageRating}
            />

            {/* Details wrapper */}
            <Box sx={p2}>
              {/* Top section */}
              <SectionBox>
                <TopSection
                  unitPrice={product.unitPrice}
                  title={product.title}
                />
              </SectionBox>
              <Divider sx={mb2} />

              {/* Buy section */}
              <SectionBox>
                <BuySection
                  quantity={quantity}
                  setQuantity={setQuantity}
                  handleAddToCart={handleAddToCart}
                  handleBuyNow={handleBuyNow}
                />
              </SectionBox>
              <Divider sx={mb2} />

              {/* Info section */}
              <SectionBox>
                <StoreInfoSection seller={product.sellerId} />
              </SectionBox>
              <Divider sx={mb2} />

              {/* Description section */}
              <SectionBox>
                <DescriptionSection description={product.description} />
              </SectionBox>
              <Divider sx={mb2} />

              {/* Reviews section */}
              <SectionBox>
                <ReviewsSection reviews={reviews} productId={productId} />
              </SectionBox>

              {/* Current user review or create review button */}
              <SectionBox id="user-review">
                <CurrentUserReview
                  reviews={reviews}
                  productId={productId}
                  userId={userId}
                />
              </SectionBox>

              {/* Similar Product section */}
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
    </>
  );
};

export default ProductDetailsPage;
