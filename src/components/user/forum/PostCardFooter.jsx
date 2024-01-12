import Box from "@mui/material/Box";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";

const PostCardFooter = ({
  postId,
  isReact,
  reactCount,
  handleReaction,
  commentCounts,
}) => {
  const navigate = useNavigate();

  return (
    <CardActions>
      <Box>
        <IconButton
          aria-label="love"
          onClick={handleReaction}
          color={isReact ? "error" : "default"}
        >
          {isReact ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
        </IconButton>
        <span>{reactCount}</span>
      </Box>

      <Box>
        <IconButton onClick={() => navigate(`/${postId}/comments`)}>
          <ChatBubbleOutlineOutlinedIcon />
        </IconButton>
        <span>{commentCounts}</span>
      </Box>
      <Box>
        <IconButton aria-label="option">
          <ShareIcon />
        </IconButton>
      </Box>
    </CardActions>
  );
};

export default PostCardFooter;
