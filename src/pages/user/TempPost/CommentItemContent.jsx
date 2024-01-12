import dayjs from "dayjs";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const CommentItemContent = ({ comment }) => {
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "flex-end", gap: "0.5rem" }}>
        <Typography variant="subtitle2">
          {comment.author.firstName} {comment.author.lastName}
        </Typography>
        <Typography variant="caption" sx={{ color: "grey.600" }}>
          {dayjs(comment.createdAt).format("YYYY-MM-DD")}
        </Typography>
      </Box>
      <Typography variant="body2" sx={{ overflowWrap: "anywhere" }}>
        {comment.content}
      </Typography>
    </Box>
  );
};

export default CommentItemContent;
