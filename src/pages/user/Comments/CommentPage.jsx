import { useGetAllCommentsQuery } from "@/features/comment/commentSlice";
import { useParams } from "react-router-dom";

import CommentItem from "../TempPost/CommentItem";
import Box from "@mui/material/Box";
import CommentForm from "../TempPost/CommentForm";
import { useState } from "react";

const CommentPage = () => {
  const [mentionUser, setMentionUser] = useState();

  const {
    commentId,
    // postId
  } = useParams();
  const { data: comments } = useGetAllCommentsQuery("658a94fd4f4ed3928a7fd9ad");
  const selectedComment = comments?.filter(
    (comment) => comment._id === commentId
  );

  return (
    <>
      <Box sx={{ minHeight: "95vh" }}>
        {selectedComment && (
          <Box>
            {selectedComment?.map((comment) => (
              <Box sx={{ padding: "0.5rem 1rem" }} key={comment._id}>
                <CommentItem comment={comment} setMentionUser={setMentionUser}>
                  {comment.replies?.map((reply) => (
                    <CommentItem
                      comment={reply}
                      key={reply._id}
                      setMentionUser={setMentionUser}
                    />
                  ))}
                </CommentItem>
              </Box>
            ))}
          </Box>
        )}
      </Box>
      <Box sx={{ position: "sticky", bottom: "1rem" }}>
        <CommentForm
          mentionUser={mentionUser}
          setMentionUser={setMentionUser}
        />
      </Box>
    </>
  );
};

export default CommentPage;
