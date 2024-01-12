import { useGetPersonalPostQuery } from "@/features/api/post.api";
import PostDetail from "./PostDetail";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import NoContentPage from "../NoContentPage";
const PersonalPost = ({ userId }) => {
  const { data, isLoading, isError, error } = useGetPersonalPostQuery(userId, {
    skip: userId ? false : true,
  });
  if (isLoading) {
    return (
      <Box
        height={"100%"}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <CircularProgress />
      </Box>
    );
  }
  if (data?.data.length === 0) {
    return <NoContentPage context={"post"} />;
  }
  return (
    <>
      <Stack gap={2}>
        {data?.data.map((post) => {
          return <PostDetail post={post} key={post._id} />;
        })}
      </Stack>
    </>
  );
};

export default PersonalPost;
