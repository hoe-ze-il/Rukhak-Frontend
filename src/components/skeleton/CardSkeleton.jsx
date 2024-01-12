import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

function CardSkeleton() {
  return (
    <>
      <Card
        sx={{
          maxWidth: "420px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "inherit",
          boxShadow: "none",
          justifySelf: "center",
        }}
      >
        <Skeleton
          sx={{ height: 160, width: "100%" }}
          animation="wave"
          variant="rectangular"
        />
        <CardContent
          sx={{
            p: "8px 0",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "0.5rem",
          }}
        >
          {["100%", "100%", "75%"].map((width, index) => (
            <Skeleton
              key={index}
              animation="wave"
              height={14}
              width={width}
              variant="rounded"
            />
          ))}

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            {["35%", "50%"].map((width, index) => (
              <Skeleton
                key={index}
                animation="wave"
                height={16}
                width={width}
              />
            ))}
          </Box>
        </CardContent>
      </Card>
    </>
  );
}

export default CardSkeleton;
