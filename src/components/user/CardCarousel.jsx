import { useParams } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/core";

// MUI compnents
import Box from "@mui/material/Box";

// Internal components
import ProductCard from "./ProductCard";

const CardCarousel = ({ products }) => {
  const { productId } = useParams();

  const uniqueProducts = products
    ?.slice(0, 10)
    .filter((product) => product._id !== productId);

  return (
    <Splide
      options={{
        arrows: false,
        gap: "0.5rem",
        heightRatio: "0.9",
        pagination: false,
        height: "256px",
        type: "slide",
        drag: "free",
        focus: "center",
        perPage: 3,
        breakpoints: {
          640: {
            perPage: 2,
            gap: ".7rem",
            height: "256px",
          },
          320: {
            autoplay: true,
            interval: 3000,
            perPage: 1,
            gap: ".7rem",
            height: "256px",
          },
        },
      }}
    >
      {uniqueProducts?.map((product) => (
        <SplideSlide key={product._id}>
          <ProductCard product={product} />
          {/* <Box sx={{ height: "100%", padding: "0.25rem 0" }}>
          </Box> */}
        </SplideSlide>
      ))}
    </Splide>
  );
};

export default CardCarousel;
