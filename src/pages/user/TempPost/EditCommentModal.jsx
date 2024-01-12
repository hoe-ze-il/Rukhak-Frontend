import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const EditCommentModal = ({
  isEditing,
  setIsEditing,
  editComment,
  comment,
}) => {
  const [content, setContent] = useState();
  const { postId = "658a94fd4f4ed3928a7fd9ad" } = useParams();

  useEffect(() => {
    setContent(comment.content);
  }, []);

  const handleEditComment = () => {
    const commentData = {
      commentId: comment._id,
      content,
      postId,
    };
    if (commentData.content !== comment.content) editComment(commentData);
    setIsEditing(false);
  };

  return (
    <Modal
      open={isEditing}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      onClose={() => setIsEditing(false)}
    >
      <Box>
        <Box
          sx={{
            borderRadius: "0.5rem",
            margin: "1rem",
            backgroundColor: "background.paper",
            padding: "2rem",
          }}
        >
          <Box
            sx={{
              width: "auto",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "0.5rem",
            }}
          >
            <Typography id="modal-title" variant="h6" component="h2">
              Edit Comment
            </Typography>
          </Box>
          <TextField
            multiline
            minRows={4}
            maxRows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Box sx={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
            <Button
              fullWidth
              variant="text"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
            <Button
              fullWidth
              variant="contained"
              disabled={content ? false : true}
              onClick={handleEditComment}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditCommentModal;
