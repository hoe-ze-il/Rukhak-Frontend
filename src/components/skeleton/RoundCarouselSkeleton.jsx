import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Skeleton from "@mui/material/Skeleton";

function RoundCarouselSkeleton() {
  const skeletonCards = Array.from({ length: 5 }, (_, index) => (
    <Card
      key={index}
      sx={{
        my: 2,
        boxShadow: "none",
        borderRadius: "none",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      <Skeleton animation="wave" variant="circular" width={48} height={48} />
      <Skeleton animation="wave" variant="rectangle" width={48} height={10} />
    </Card>
  ));

  return (
    <Box
      sx={{
        maxWidth: 425,
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {skeletonCards}
    </Box>
  );
}

export default RoundCarouselSkeleton;
