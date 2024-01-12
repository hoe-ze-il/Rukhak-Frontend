import Skeleton from "@mui/material/Skeleton";
import Card from "@mui/material/Card";

function BigCardSkeleton() {
  return (
    <Card
      sx={{
        maxWidth: 576,
        minWidth: 200,
        width: "100%",
        backgroundColor: "inherit",
        boxShadow: "none",
        justifySelf: "center",
      }}
    >
      <Skeleton
        sx={{ height: 200, width: "100%" }}
        animation="wave"
        variant="rectangular"
      />
    </Card>
  );
}

export default BigCardSkeleton;
