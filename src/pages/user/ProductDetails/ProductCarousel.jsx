import { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

// MUI components
import styled from "@mui/material/styles/styled";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// MUI icons
import StarIcon from "@mui/icons-material/Star";

const StyledChip = styled(Chip)(({ theme }) => ({
  position: "absolute",
  zIndex: 1,
  bottom: 0,
  margin: "1rem",
  color: theme.palette.grey[900],
  backgroundColor: theme.palette.background.default,
  opacity: "80%",
}));

const ProductCarousel = ({ images, averageRating }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const chipSettings = {
    size: "small",
    variant: "filled",
  };

  const sliderSettings = {
    speed: 500,
    Infinity: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (index) => setCurrentIndex(index),
    arrows: false,
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Slider {...sliderSettings}>
        {images.map((image, index) => (
          <Box
            key={index}
            sx={{
              aspectRatio: "4/3",
            }}
          >
            <img src={image} alt={`Product ${index + 1}`} />
          </Box>
        ))}
      </Slider>

      <Box>
        <StyledChip
          {...chipSettings}
          label={
            <Typography variant="caption">
              {currentIndex + 1} / {images.length}
            </Typography>
          }
        />
        <StyledChip
          {...chipSettings}
          label={
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
              }}
            >
              <Typography variant="caption">{averageRating}</Typography>
              <StarIcon fontSize="small" sx={{ color: "warning.light" }} />
            </Box>
          }
          sx={{ right: 0 }}
        />
      </Box>
    </Box>
  );
};

export default ProductCarousel;
