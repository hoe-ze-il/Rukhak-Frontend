import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const iconButtonStyles = {
  display: "flex",
  alignItems: "center",
  gap: "0.25rem",
  borderRadius: "0.25rem",
};

const CommentItemFooter = ({
  comment,
  handleReactComment,
  isReacted,
  reactions,
  handleReplyClick,
}) => {
  return (
    <Box sx={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
      <IconButton
        size="small"
        sx={iconButtonStyles}
        onClick={handleReactComment}
      >
        {!isReacted ? (
          <FavoriteBorderIcon fontSize="small" />
        ) : (
          <FavoriteIcon fontSize="small" sx={{ color: "red" }} />
        )}
        <Typography variant="caption">
          {Object.getOwnPropertyNames(reactions).length}
        </Typography>
      </IconButton>
      <IconButton sx={iconButtonStyles} onClick={handleReplyClick}>
        <Typography variant="caption">Reply</Typography>
        <Typography variant="caption">{comment.replies?.length}</Typography>
      </IconButton>
    </Box>
  );
};

export default CommentItemFooter;
