import axios from "axios";
import dayjs from "dayjs";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";

import Comments from "./Comments";
import CommentForm from "./CommentForm";

const hoverBlue = {
  ":hover": { color: "skyblue" },
  cursor: "pointer",
};

const TempPost = () => {
  const [post, setPost] = useState();

  useEffect(() => {
    const getPost = async () => {
      const data = await axios.get(
        "http://localhost:3000/api/v1/community/658a94fd4f4ed3928a7fd9ad"
      );

      setPost(data.data.data);
    };

    getPost();
  }, []);

  return (
    <>
      {post && (
        <Box sx={{ backgroundColor: "backgorund.default" }}>
          {/* Post */}
          <Box sx={{ padding: "1rem" }}>
            <h3>{post.title}</h3>
            <span>{dayjs(post.createdAt).format("YYYY-MM-DD")}</span>
            <p>{post.content}</p>
            <Box sx={{ aspectRatio: "4/3", padding: "0.5rem 0" }}>
              <img
                src="https://c4.wallpaperflare.com/wallpaper/104/725/147/vaporwave-palm-trees-render-swimming-pool-digital-art-hd-wallpaper-preview.jpg"
                alt=""
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                margin: "1rem 0",
              }}
            >
              |<Box sx={hoverBlue}>Like</Box> |<Box sx={hoverBlue}>Comment</Box>{" "}
              |<Box sx={hoverBlue}>Share</Box>|
            </Box>
            <hr />
          </Box>

          {/* input comment */}
          <Box sx={{ marginBottom: "2rem" }}>
            <CommentForm />
          </Box>

          {/* comments */}
          <Comments />
        </Box>
      )}
    </>
  );
};

export default TempPost;
