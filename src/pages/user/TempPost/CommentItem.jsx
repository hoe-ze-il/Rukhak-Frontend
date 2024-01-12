import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { selectCurrentUserId } from "@/features/auth/authSlice";
import { useSelector } from "react-redux";
import {
  useDeleteCommentMutation,
  useEditCommentMutation,
  useReactCommentMutation,
} from "@/features/comment/commentSlice";
import DeleteCommentModal from "./DeleteCommentModal";
import Loading from "@/components/admin/product/Loading";
import CommentItemAvatar from "./CommentItemAvatar";
import CommentItemContent from "./CommentItemContent";
import CommentItemMenu from "./CommentItemMenu";
import CommentItemFooter from "./CommentItemFooter";
import CommentItemMedia from "./CommentItemMedia";
import EditCommentModal from "./EditCommentModal";
import Box from "@mui/material/Box";

const dispalyFlex = { display: "flex" };

const CommentItem = ({ comment, children, setMentionUser }) => {
  const [reactions, setReactions] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { postId = "658a94fd4f4ed3928a7fd9ad", commentId } = useParams();
  const userId = useSelector(selectCurrentUserId);
  const [deleteComment, { isLoading: deleteLoading }] =
    useDeleteCommentMutation();
  const [editComment, { isLoading: editLoading }] = useEditCommentMutation();
  const reactComment = useReactCommentMutation()[0];

  useEffect(() => {
    setReactions({ ...comment?.reactions });
  }, [comment]);

  const isReacted = reactions[userId];

  const handleReplyClick = () => {
    if (commentId) {
      setMentionUser({
        mention: `@${comment.author.firstName}_${comment.author.lastName}`,
        id: comment._id,
      });
      return;
    }

    navigate(comment?.parent ?? comment._id);
  };

  const handleClickDeleteComment = () => {
    setAnchorEl(null);
    setIsOpen(true);
  };

  const handleDeleteComment = () => {
    deleteComment({ postId, commentId: comment._id });
    setIsOpen(false);
  };

  const handleReactComment = () => {
    // update comment reaction immediately without waiting for API request succeed
    const updatedReactions = { ...reactions };
    if (isReacted) {
      delete updatedReactions[userId];
    } else {
      updatedReactions[userId] = true;
    }
    setReactions(updatedReactions);

    // Make reaction API request
    reactComment({ postId, commentId: comment._id });
  };

  return (
    <Box
      sx={{
        ...dispalyFlex,
        gap: "0.75rem",
        backgroundColor: "background.default",
      }}
      component="div"
      id={comment._id}
    >
      {/* Avatar */}
      <CommentItemAvatar comment={comment} />
      {/* Comment content */}
      <Box sx={{ flex: 1 }}>
        {/* comment body */}
        <Box
          sx={{
            ...dispalyFlex,
            justifyContent: "space-between",
            gap: "0.5rem",
          }}
        >
          <CommentItemContent comment={comment} />

          {/* menu   */}
          <CommentItemMenu
            comment={comment}
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            handleClickDeleteComment={handleClickDeleteComment}
            setIsEditing={setIsEditing}
          />
        </Box>
        {/* comment media */}
        <CommentItemMedia comment={comment} />
        {/* comment footer */}
        <CommentItemFooter
          comment={comment}
          handleReactComment={handleReactComment}
          isReacted={isReacted}
          reactions={reactions}
          handleReplyClick={handleReplyClick}
        />
        {/* comment reply */}
        <>{children}</>
      </Box>
      {/* Confirm delete comment modal */}
      <DeleteCommentModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleDeleteComment={handleDeleteComment}
      />
      {/* loading */}
      {(deleteLoading || editLoading) && <Loading />}
      {/* edit modal */}
      {isEditing && (
        <EditCommentModal
          isEditing={isEditing}
          editComment={editComment}
          setIsEditing={setIsEditing}
          comment={comment}
        />
      )}
    </Box>
  );
};

export default CommentItem;
