import React, { useState, useEffect, useRef, useCallback } from "react";
import { useGetAllPostsQuery } from "@/features/api/post.api";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import ForumHeader from "@/components/user/forum/ForumHeader";
import ForumButtomBar from "@/components/user/forum/ForumButtomBar";
import PostDetail from "./PostDetail";

const PostList = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error, isFetching } = useGetAllPostsQuery({
    page,
  });

  const observer = useRef();

  const lastPostElementRef = useCallback(
    (node) => {
      if (isLoading || !data || data.data.length === 0) return;

      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, data, setPage]
  );

  useEffect(() => {
    setPage(1);
  }, [data]);

  return (
    <Box>
      <ForumHeader />
      {isLoading ? (
        <Box
          minHeight={"100vh"}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Stack minHeight={"100vh"} gap={2} padding={2}>
          {data?.data.map((post, index) => {
            const isLastPost = data.data.length === index + 1;
            return (
              <div key={post._id}>
                <PostDetail post={post} />
                {isLastPost && <span ref={lastPostElementRef} />}
              </div>
            );
          })}
        </Stack>
      )}
      {isFetching ? <CircularProgress /> : null}
      <ForumButtomBar />
    </Box>
  );
};

export default PostList;
