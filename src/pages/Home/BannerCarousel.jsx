import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/core";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

const BannerCarousel = ({ imgs }) => {
  return (
    <Box component="main">
      <Box
        sx={{
          maxHeight: "400px",
          overflow: "hidden",
          marginTop: "1rem",
        }}
      >
        <Splide
          options={{
            pauseOnFocus: true,
            pauseOnHover: true,
            arrows: false,
            padding: "1rem",
            type: "loop",
            gap: 20,
            heightRatio: "0.7",
            autoplay: true,
            interval: 3000,
            pagination: false,
          }}
        >
          {imgs.map((img, index) => (
            <SplideSlide key={index}>
              <Card sx={{ boxShadow: "none" }}>
                <img src={img} alt="..." />
              </Card>
            </SplideSlide>
          ))}
        </Splide>
      </Box>
    </Box>
  );
};

export default BannerCarousel;
