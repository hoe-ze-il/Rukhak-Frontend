import { useContext, useState } from "react";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { useDeleteReviewMutation } from "@/features/review/reviewSlice";
import {
  selectCurrentUserId,
  selectCurrentUserRole,
} from "@/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { ReviewContext } from "@/contexts/user/ReviewContext";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Rating from "@mui/material/Rating";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import MoreVertIcon from "@mui/icons-material/MoreVert";

const flexCenter = { display: "flex", alignItems: "center" };
const secondaryText = { color: "text.secondary" };

const ReviewItem = ({ reviewItem, productId }) => {
  const deleteReview = useDeleteReviewMutation()[0];
  const userRole = useSelector(selectCurrentUserRole);
  const userId = useSelector(selectCurrentUserId);

  const { setReviewData } = useContext(ReviewContext);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteReview = () => {
    deleteReview({ reviewId: reviewItem.id, productId });
    handleClose();
  };

  const handleSelectReview = () => {
    setReviewData(reviewItem);
    navigate(`edit-review`);
    handleClose();
  };

  const {
    review,
    rating,
    createdAt,
    userId: { firstName: userName, id },
  } = reviewItem;

  return (
    <Box
      sx={{
        padding: "0.75rem 0",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      {/* Username & rating */}
      <Box
        sx={{
          ...flexCenter,
          marginBottom: "0.625rem",
        }}
      >
        {/* Username */}
        <Typography
          variant="caption"
          fontWeight="medium"
          sx={{ color: "text.secondary", flex: 1 }}
        >
          {userName}
        </Typography>
        {/* Stars */}
        <Box sx={{ ...flexCenter, gap: "0.5rem" }}>
          <Rating size="small" name="read-only" value={rating} readOnly />
        </Box>
        <Box sx={{ position: "relative" }}>
          <IconButton
            sx={{ padding: 0, marginLeft: "1rem" }}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          {userRole == "admin" || userId == id ? (
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={() => handleSelectReview()}>Edit</MenuItem>
              <MenuItem onClick={handleDeleteReview}>Delete</MenuItem>
            </Menu>
          ) : (
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Report</MenuItem>
            </Menu>
          )}
        </Box>
      </Box>

      {/* Review */}
      <Box sx={{ marginBottom: "0.625rem" }}>
        <Typography variant="body2" sx={secondaryText}>
          {review}
        </Typography>
      </Box>
      <Typography
        variant="caption"
        textAlign="right"
        sx={{ ...secondaryText, display: "block" }}
      >
        {dayjs(createdAt).format("YYYY-MM-DD")}
      </Typography>
    </Box>
  );
};

export default ReviewItem;
