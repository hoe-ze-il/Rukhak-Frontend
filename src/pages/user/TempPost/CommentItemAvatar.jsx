import Avatar from "@mui/material/Avatar";

const CommentItemAvatar = ({ comment }) => {
  return (
    <Avatar sx={{ width: "2rem", height: "2rem" }}>
      {comment.author.firstName.slice(0, 1).toUpperCase()}
    </Avatar>
  );
};

export default CommentItemAvatar;
