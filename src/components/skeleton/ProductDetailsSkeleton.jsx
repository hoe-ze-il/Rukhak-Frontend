import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import BigCardSkeleton from "./BigCardSkeleton";
import DescriptionSkeleton from "./DescriptionSkeleton";
import ReviewSkeleton from "./ReviewSkeleton";
import ProductListSkeleton from "./ProductListSkeleton";

function ProductDetailsSkeleton() {
  return (
    <>
      <Stack
        spacing={4}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "none",
        }}
        mb={"2rem"}
      >
        <BigCardSkeleton />
        {/* Title */}
        <DescriptionSkeleton />

        {/* Product quantities */}
        <Box
          display={"flex"}
          alignItems={"center"}
          gap={"1rem"}
          sx={{ width: "100%" }}
        >
          <Skeleton
            variant="rounded"
            width={100}
            height={20}
            animation="wave"
          />
          <Skeleton
            variant="rounded"
            width={"30%"}
            height={40}
            animation="wave"
          />
        </Box>

        {/* Buy and Cart buttons */}
        <Stack spacing={1} sx={{ width: "100%", justifySelf: "center" }}>
          <Skeleton
            variant="rounded"
            width={"100%"}
            height={48}
            animation="wave"
          />
          <Skeleton
            variant="rounded"
            width={"100%"}
            height={48}
            animation="wave"
          />
        </Stack>

        {/* Description */}
        <DescriptionSkeleton />

        {/* Review */}
        <ReviewSkeleton />
        <ReviewSkeleton />
      </Stack>
      {/* Recommand products */}
      <ProductListSkeleton numberOfCards={2} />
    </>
  );
}

export default ProductDetailsSkeleton;
