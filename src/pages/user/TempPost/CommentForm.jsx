import { useEffect, useRef, useState } from "react";
import { useCreateCommentMutation } from "@/features/comment/commentSlice";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUserId } from "@/features/auth/authSlice";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";

import SendIcon from "@mui/icons-material/Send";
import Image from "@mui/icons-material/Image";
import CancelOutlined from "@mui/icons-material/CancelOutlined";
import Loading from "@/components/admin/product/Loading";

const CommentForm = ({ mentionUser, setMentionUser }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const inputRef = useRef(null);
  const [createComment, { isLoading }] = useCreateCommentMutation();
  const { postId = "658a94fd4f4ed3928a7fd9ad", commentId } = useParams();
  const userId = useSelector(selectCurrentUserId);

  useEffect(() => {
    if (mentionUser) {
      setContent(mentionUser.mention + " ");
      inputRef.current.focus();
    }
  }, [mentionUser]);

  const handleCreateComment = async () => {
    const commentData = new FormData();
    if (image) {
      commentData.append("media", image);
    }
    if (commentId) {
      commentData.append("parent", commentId);
    }
    commentData.append("author", userId);
    commentData.append("postId", postId);
    commentData.append("content", content);

    const res = await createComment(commentData);
    const newComment = res?.data?.data;
    if (res?.data?.status === "success") {
      setTimeout(() => {
        const newCommentId = document.getElementById(newComment._id);
        newCommentId.scrollIntoView({ behavior: "smooth" });
      }, 1200);
    }
    setContent("");
    setImage(null);
    setImagePreview(null);
    if (mentionUser) setMentionUser();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
      setImagePreview(null);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  return (
    <Box
      sx={{
        padding: "0 1rem",
      }}
    >
      <>
        {imagePreview && (
          <Box
            sx={{
              width: "104px",
              marginBottom: "0.5rem",
              position: "relative",
              padding: "0.25rem",
              border: "1px solid",
              borderColor: "grey.400",
            }}
          >
            <CancelOutlined
              sx={{
                position: "absolute",
                right: 0,
                top: 0,
                transform: "translate(50%, -50%)",
                color: "grey.500",
                fontSize: "1rem",
                backgroundColor: "background.default",
                borderRadius: "100px",
              }}
              onClick={handleRemoveImage}
            />
            <img src={imagePreview} alt={image} className="image" />
          </Box>
        )}
      </>

      <FormControl fullWidth size="small" focused={false}>
        <OutlinedInput
          placeholder="Comment"
          sx={{ borderRadius: "0.5rem" }}
          type="text"
          multiline
          maxRows={4}
          value={content}
          inputProps={{ ref: inputRef }}
          onChange={(e) => setContent(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                color="primary"
                disabled={content || image ? false : true}
                onClick={handleCreateComment}
              >
                <SendIcon />
              </IconButton>
            </InputAdornment>
          }
          startAdornment={
            <InputAdornment position="start">
              <IconButton>
                <label htmlFor="image-form" />
                <Input
                  id="image-form"
                  type="file"
                  onChange={handleImageChange}
                  sx={{
                    position: "absolute",
                    opacity: 0,
                    width: "1.5rem",
                    height: "1.5rem",
                  }}
                />
                <Image />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      {isLoading && <Loading />}
    </Box>
  );
};

export default CommentForm;
