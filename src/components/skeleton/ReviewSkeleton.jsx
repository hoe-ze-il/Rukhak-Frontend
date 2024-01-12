import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

function ReviewSkeleton() {
  return (
    <>
      <Stack spacing={1} sx={{ width: "100%", justifySelf: "center" }}>
        <Box
          display={"flex"}
          alignItems={"center"}
          gap={"1rem"}
          sx={{ width: "100%" }}
        >
          <Skeleton
            variant="circular"
            width={40}
            height={40}
            animation="wave"
          />
          <Skeleton
            variant="rounded"
            width={100}
            height={20}
            animation="wave"
          />
        </Box>
        <Skeleton
          variant="rounded"
          width={"50%"}
          height={20}
          animation="wave"
        />
        <Skeleton
          variant="rounded"
          width={"100%"}
          height={20}
          animation="wave"
        />
        <Skeleton
          variant="rounded"
          width={"100%"}
          height={20}
          animation="wave"
        />
      </Stack>
    </>
  );
}

export default ReviewSkeleton;
