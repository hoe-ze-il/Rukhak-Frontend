import CommentItem from "./CommentItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useGetAllCommentsQuery } from "@/features/comment/commentSlice";

const Comments = () => {
  const navigate = useNavigate();
  const { data: comments } = useGetAllCommentsQuery("658a94fd4f4ed3928a7fd9ad");

  return (
    <>
      {comments && (
        <Box>
          {comments?.map((comment) => (
            <Box sx={{ padding: "0.5rem 1rem" }} key={comment._id}>
              <CommentItem comment={comment}>
                {comments.length > 2
                  ? comment.replies
                      ?.slice(0, 1)
                      .map((reply) => (
                        <CommentItem comment={reply} key={reply._id} />
                      ))
                  : comment.replies?.map((reply) => (
                      <CommentItem comment={reply} key={reply._id} />
                    ))}
                {comments.length > 2 && comment.replies?.length > 1 && (
                  <Typography
                    variant="subtitle2"
                    sx={{
                      ":hover": {
                        textDecoration: "underline",
                        cursor: "pointer",
                      },
                    }}
                    onClick={() => navigate(comment._id)}
                  >
                    View more replies
                  </Typography>
                )}
              </CommentItem>
            </Box>
          ))}
        </Box>
      )}
    </>
  );
};

export default Comments;
