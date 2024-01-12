import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Gallery from "./Gallery";
import UserCard from "./UserCard";
import { useReactPostMutation } from "@/features/api/post.api";
import { useSelector } from "react-redux";
import { selectCurrentUserId } from "@/features/auth/authSlice";
import PostCardFooter from "./PostCardFooter";

const PostCard = ({ post }) => {
  const reactCount = new Map(Object.entries(post.reactions));
  const userId = useSelector((state) => selectCurrentUserId(state));
  const [toggleReaction] = useReactPostMutation();
  const [liked, setLiked] = useState(reactCount.get(userId));

  useEffect(() => {}, [post]);
  const handleReaction = async (e) => {
    setLiked((prevLiked) => !prevLiked);
    toggleReaction({ postId: post._id, userId });
  };

  // Truncate title and content
  const truncatedTitle =
    post.title.length > 30 ? post.title.substring(0, 30) + "..." : post.title;
  const truncatedContent =
    post.content.length > 80
      ? post.content.substring(0, 80) + "..."
      : post.content;

  return (
    <Card sx={{ backgroundColor: "white", borderRadius: "12px" }}>
      <UserCard author={post.author} postId={post._id} />
      <CardContent sx={{ padding: 0 }}>
        <Gallery media={post.media} />
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ padding: "0.5rem 1rem 0 1rem" }}
        >
          {truncatedTitle}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ padding: "0 1rem" }}
        >
          {truncatedContent}
        </Typography>
      </CardContent>
      <PostCardFooter
        postId={post._id}
        isReact={liked}
        reactCount={reactCount.size}
        handleReaction={handleReaction}
        commentCounts={post.commentCounts}
      />
    </Card>
  );
};

export default PostCard;
