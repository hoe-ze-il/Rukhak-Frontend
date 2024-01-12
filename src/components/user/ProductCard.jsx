import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";

import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";

const ProductCard = ({ product }) => {
  const { title, unitPrice, averageRating, soldAmount, imgCover, _id } =
    product;

  const navigate = useNavigate();

  // Truncate the title to 24 characters with an ellipsis
  const textWrap = 24;
  const truncatedtitle =
    title.length > textWrap ? `${title.slice(0, textWrap)}...` : title;

  const formatUnitPrice = unitPrice.toLocaleString();

  return (
    <Card
      sx={{
        maxWidth: "420px",
        minWidth:"150px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        "&:hover": { backgroundColor: "#ddd" },
        transition: "100ms ease-in-out",
      }}
      onClick={() => navigate(`/store/${_id}`)}
    >
      {/* Card Image */}
      <CardMedia
        sx={{ width: "100%", height: "140px" }}
        image={imgCover ? imgCover : "../error-404.svg"}
        title={imgCover}
      />
      <CardContent
        sx={{
          padding: "8px !important",
          flex: "1 1 auto", // Allow CardContent to grow to fill the available space
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "0.5rem",
        }}
      >
        {/* Title */}
        <Typography variant="body2" color="text.primary">
          {truncatedtitle}
        </Typography>

        {/* Price */}
        <Typography variant="body1">${formatUnitPrice}</Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Average Rating */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              columnGap: "0.25rem",
            }}
          >
            <StarIcon fontSize="small" sx={{ color: "#F4B266" }} />
            <Typography variant="caption" lineHeight={"normal"}>
              {averageRating.toFixed(2)}
            </Typography>
          </Box>

          {/* Sold Amount */}
          {soldAmount > 0 && (
            <Typography variant="caption" lineHeight={"normal"}>
              {soldAmount} solds
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
