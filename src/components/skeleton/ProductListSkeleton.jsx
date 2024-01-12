import Box from "@mui/material/Box";
import CardSkeleton from "./CardSkeleton";
import Stack from "@mui/material/Stack";

function ProductListSkeleton({ numberOfCards }) {
  const cardArray = Array.from({ length: numberOfCards }, (_, index) => (
    <CardSkeleton key={index} />
  ));

  return (
    <>
      <Box
        sx={{
          width: "100vw",
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          px: "1rem",
        }}
      >
        {cardArray}
      </Box>
    </>
  );
}

export default ProductListSkeleton;
