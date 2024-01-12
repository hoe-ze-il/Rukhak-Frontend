import Skeleton from "@mui/material/Skeleton";
import Card from "@mui/material/Card";
import RoundCarouselSkeleton from "./RoundCarouselSkeleton";
import Stack from "@mui/material/Stack";
import BigCardSkeleton from "./BigCardSkeleton";
import ProductListSkeleton from "./ProductListSkeleton";

function LandingPageSkeleton() {
  return (
    <>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {/* Big card */}
        <BigCardSkeleton />

        {/* Round categories with subtitle */}
        <RoundCarouselSkeleton />

        {/* Scanning and Store buttons */}
        <Card
          sx={{
            width: "100%",
            minWidth: 140,
            boxShadow: "none",
            display: "flex",
            justifyContent: "space-around",
            gap: "0.5rem",
            pb: "1rem",
          }}
        >
          <Skeleton
            sx={{ height: 160, width: "100%", maxWidth: 200 }}
            animation="wave"
            variant="rectangular"
          />
          <Skeleton
            sx={{ height: 160, width: "100%", maxWidth: 200 }}
            animation="wave"
            variant="rectangular"
          />
        </Card>

        {/* Recommend product */}
      </Stack>
      <ProductListSkeleton numberOfCards={2} />
    </>
  );
}

export default LandingPageSkeleton;
