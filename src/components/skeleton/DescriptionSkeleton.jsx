import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

function DescriptionSkeleton() {
  return (
    <>
      <Stack spacing={1} sx={{ width: "100%" }}>
        <Skeleton variant="rounded" width={100} height={20} animation="wave" />
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
        <Skeleton
          variant="rounded"
          width={"75%"}
          height={20}
          animation="wave"
        />
      </Stack>
    </>
  );
}

export default DescriptionSkeleton;
